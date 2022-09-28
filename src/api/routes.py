"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Cart, favorite
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt, JWTManager


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"
api = Blueprint('api', __name__)
jwt = JWTManager(app)


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]

    return token_in_redis is not None


@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Usuario no existe"}), 401
    access_token = create_access_token(identity=user.id)
    return ({"token": access_token, "user_id": user.id}), 200


@api.route('/singup', methods=['POST'])
def post_sigup():

    valores = request.get_json()
    password = valores.get('password', None)
    email = valores.get('email', None)
    usuario = User.query.filter_by(email=valores.get(
        'email')).first()  # pregunta a base de datos
    if usuario is not None:
        return 'El usuario ya existe', 404

    new_user = User(email=email,
                    password=password, is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 200


@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    serializer = list(map(lambda x: x.serialize(), products))
    return jsonify({"data": serializer}), 200


@api.route("/home", methods=["POST"])
@jwt_required()
def home():

    return jsonify({"id": user.id, "email": user.email}), 200


@api.route('/addtocard', methods=['POST'])
# @jwt_required()
def add_tocard():

    current_user_id = 1  # get_jwt_identity()  #

    data = request.get_json()

    #amount = request.json.get("amount", None)
    #product_id = request.json.get("product_id", None)

    if data['productId'] is None or current_user_id is None:

        return jsonify({"msg": "datos invalidos"}), 524

    product = Product.query.get(data["productId"])
    user = User.query.get(current_user_id)
    product_name = Product.query.get(data["product_name"])
    print(product_name)
    print(user)

    if product is None or user is None:
        return jsonify({"msg": "datos invalidos"}), 521

    cart = Cart(
        user_id=user.id,
        product_id=product.id,
        product_name=product.name,
        amount=1,



    )
    db.session.add(cart)
    db.session.commit()

    if cart.id:

        return jsonify({"message": "El producto se añadio correctamente"}), 200
    return jsonify({"msg": "datos invalidos"}), 520
