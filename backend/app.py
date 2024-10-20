from flask import Flask, jsonify
from flask_cors import CORS
import psutil
import GPUtil
import threading
import time
import platform
import subprocess

app = Flask(__name__)
CORS(app)

usage_data = {
    "cpu": 0,
    "gpu": 0,
    "cpu_details": "",
    "gpu_details": ""
}

def get_cpu_details():
    cpu_info = {
        "cpu_name": "Unknown CPU",
        "cores": psutil.cpu_count(logical=False),
        "threads": psutil.cpu_count(logical=True)
    }
    
    try:
        if platform.system() == "Windows":
            cpu_info["cpu_name"] = platform.processor()
            
        elif platform.system() == "Linux":
            command = "cat /proc/cpuinfo | grep 'model name' | head -1"
            cpu_name = subprocess.check_output(command, shell=True).decode().strip().split(': ')[1]
            cpu_info["cpu_name"] = cpu_name
        
        elif platform.system() == "Darwin":
            command = "sysctl -n machdep.cpu.brand_string"
            cpu_name = subprocess.check_output(command, shell=True).decode().strip()
            cpu_info["cpu_name"] = cpu_name
        
    except Exception as e:
        print(f"Error getting CPU name: {e}")
    
    return cpu_info

def get_active_gpu():
    gpus = GPUtil.getGPUs()
    
    if not gpus:
        return {"gpu_name": "No GPU detected", "memory_total": 0, "memory_used": 0, "memory_free": 0}
    
    active_gpu = max(gpus, key=lambda gpu: gpu.load)  # Get the GPU with the highest load
    return {
        "gpu_name": active_gpu.name,
        "memory_total": active_gpu.memoryTotal,
        "memory_used": active_gpu.memoryUsed,
        "memory_free": active_gpu.memoryFree,
        "gpu_load": active_gpu.load * 100  # Convert to percentage
    }

def get_gpu_usage():
    while True:
        active_gpu = get_active_gpu()
        usage_data["gpu"] = active_gpu["gpu_load"]  # Update GPU usage
        time.sleep(1)

@app.route('/usage', methods=['GET'])
def get_usage():
    try:
        # Get CPU usage and details
        usage_data["cpu"] = psutil.cpu_percent(interval=1)
        usage_data["cpu_details"] = get_cpu_details()

        # Get active GPU details
        usage_data["gpu_details"] = get_active_gpu()
        
    except Exception as e:
        print(f"Error getting system usage: {e}")
        usage_data["cpu"] = -1  # Return -1 in case of error
    
    return jsonify(usage_data)

if __name__ == '__main__':
    threading.Thread(target=get_gpu_usage, daemon=True).start()
    app.run(debug=True, host='0.0.0.0', port=5000)
