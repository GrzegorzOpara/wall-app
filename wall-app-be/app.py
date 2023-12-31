import os
import socket
import datetime
import uuid
import redis
from flask_cors import CORS
from dotenv import load_dotenv

from flask_api import status
from flask import Flask, request, jsonify
 
load_dotenv()

app = Flask(__name__)
CORS(app)

# initiate redis
r = redis.Redis(host=os.getenv('BE_REDIS_HOST'), port=int(os.getenv('BE_REDIS_PORT')), decode_responses=True)

 
@app.route("/")
def get():
   results = {}
   try:
      for key in r.scan_iter("posts:*"):
         results[key] = (r.hgetall(key))  
      print(results)
      response = jsonify(results)
      return response, status.HTTP_200_OK
   except:
      return "error", status.HTTP_400_BAD_REQUEST
 
@app.route("/add", methods=['POST'])
def add():
   data = request.json
   record = {}
   record['backend'] = socket.gethostname()
   record['frontend'] = request.headers.get('origin')
   record['timestamp'] = str(datetime.datetime.now())
   record['message'] = data.get('text')
   try:
      key = 'posts:' + str(uuid.uuid4())
      r.hset(key, mapping=record)
      return "succeed", status.HTTP_200_OK
   except:
      return "error", status.HTTP_400_BAD_REQUEST

if __name__ == "__main__":
   port = int(os.getenv('BE_PORT'))
   host = os.getenv('BE_HOST')
   app.run(debug=True, host=host, port=port)