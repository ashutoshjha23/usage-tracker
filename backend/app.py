from flask import Flask, jsonify
from flask_cors import CORS
import psutil
import threading
import time

app = Flask(__name__)
CORS(app)

usage_data = {
    "cpu": 0,
    "gpu": 0
}

def get_gpu_usage():

    while True:
        usage_data["gpu"] = psutil.cpu_percent() 
        time.sleep(1)

@app.route('/usage', methods=['GET'])
def get_usage():

    try:
        usage_data["cpu"] = psutil.cpu_percent(interval=1)  
    except Exception as e:
        print(f"Error getting CPU usage: {e}")
        usage_data["cpu"] = -1 
    return jsonify(usage_data)

if __name__ == '__main__':

    threading.Thread(target=get_gpu_usage, daemon=True).start()
    app.run(debug=True, host='0.0.0.0', port=5000)
