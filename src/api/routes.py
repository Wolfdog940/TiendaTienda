"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():

    mail = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first
    if user is None:
        return jsonify({"msg": "Error en las credenciales"})
    access_token = create_access_token(identity=user.id)
    return ({"token": access_token, "user_id": user.id}), 200


@api.route('/sigup', methods=['GET'])
def get_sigup():
    data = request.json()
    user = User.query.filter_by(email=data.get("email")).first()
    if data["email"] not in data or data["password"] not in data:
        return jsonify({"msg": "faltan datos"}), 400

    if user is not None:
        return jsonify({"msg": "el usuario ya existe"})

    new_user = User(
        email=data.get("email"),
        password=data.get("password"),
        is_active=True,
    )

    db.sesion.add(new_user)
    db.sesion.commit()
    return jsonify(new_user.serialize())


@api.route('/addfavorite', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user = User.query.get(data["user_id"])
    if user is None:
        return jsonify({"message": "El usuario no existe"}), 400
    product = Product.query.get(data["product_id"])
    if product is None:
        return jsonify({"message": "El producto no existe"}), 400
    user.favorites.append(product)
    db.session.commit()
    return jsonify({"message": "El producto se añadio correctamente"}), 200
