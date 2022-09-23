from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    carts = db.relationship('Product', backref='users', lazy=True)
    favorites = db.relationship('Product', secondary=favorites, lazy='subquery',
        backref=db.backref('users', lazy=True))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "favorites": list(map(lambda favorite:favorite.serialize(),self.favorites))
            
            
        }


class Product (db.model): 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String , unique=False, nullable=False)
    description = db.Column(db.String(240) , unique=False, nullable=False)
    price = db.Column(db.integer , unique=False, nullable=False)
    category= db.Column(db.String , unique=False, nullable=True)
    stock =db.Column(db.String , unique=False, nullable=True)
    carts = db.relationship('Cart', backref='products', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "stock": self.stock,

            
        }

class Cart (db.model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.integer , db.ForeignKey('user.id'),
        nullable=False)
    product_id= db.Column(db.integer , db.ForeignKey('product.id'),
        nullable=False)
    amount = db.Column(db.integer , unique=False, nullable=False),

    def serialize(self):
        return {
            "id": self.id,
            "prouct_id": self.product_id,
            "user_id": self.user_id,
            "amount": self.amount,

        }





favorite  = db.Table('favorite',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True)
)
