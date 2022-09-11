from flask import Flask,jsonify,render_template,request,send_from_directory
from flask_sqlalchemy import SQLAlchemy
import json
from flask_cors import CORS,cross_origin



app = Flask(__name__, static_folder="../build",static_url_path='')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///3dmodel.db'
db = SQLAlchemy(app)


class threedmodel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    model_url = db.Column(db.String)
    image_url = db.Column(db.String)


  



# @app.route('/')
# def hello():

#     return 'Hello World!'

def model_serializer(item):
    return {
        "id" : item.id,
      "name": item.name,
      "model_url": item.model_url,
      "image_url":item.image_url}

@app.route('/create', methods=['GET', 'POST'])
@cross_origin()
def create():
    data = json.loads(request.data)
    addthreedmodel = threedmodel(name=data['name'],model_url=data['model_url'],image_url=data['image_url'],)
    db.session.add(addthreedmodel)
    db.session.commit()
    return {"204" : "threedmodel added"}


@app.route('/show')
@cross_origin()

def read():
    allmodels = threedmodel.query.all()
    datatosend = jsonify([*map(model_serializer,allmodels)])
   
   
    return datatosend

# @app.route('/delete')

# def delete():
#     threedmodel.query.filter_by(id=2).delete()
#     db.session.commit()
#     return 'delete'

@app.route('/')
@cross_origin()

def serve():
    return send_from_directory(app.static_folder,'index.html')

if __name__ == '__main__':
    app.run()