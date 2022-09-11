
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os
from flask_cors import CORS,cross_origin

from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__,static_folder='./build',static_url_path='')
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db = SQLAlchemy(app)


class threedmodel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    model_url = db.Column(db.String)
    image_url = db.Column(db.String)


db.create_all()