from flask import Flask, jsonify
from flask_cors import CORS
import psutil
import GPUtil
import threading
import time
import platform
import subprocess
import logging
import wmi
import pythoncom

app = Flask(__name__)
CORS(app)

usage_data = {
    "cpu": 0,
    "gpu": 0,
    "cpu_details": {},
    "gpu_details": {},
    "memory_details": {},
    "cpu_temperature": "Not Available"
}

logging.basicConfig(level=logging.INFO)

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
    except subprocess.SubprocessError as e:
        logging.error(f"Error getting CPU name: {e}")
    return cpu_info

def get_memory_details():
    memory = psutil.virtual_memory()
    return {
        "total_memory": memory.total,
        "used_memory": memory.used,
        "available_memory": memory.available,
        "memory_percent": memory.percent
    }

def get_cpu_temperature():
    try:
        if platform.system() == "Windows":
            pythoncom.CoInitialize()
            try:
                w = wmi.WMI(namespace="root\\OpenHardwareMonitor")
                temperature_info = w.Sensor()
                for sensor in temperature_info:
                    if sensor.SensorType == 'Temperature' and "CPU" in sensor.Name:
                        pythoncom.CoUninitialize()
                        return sensor.Value
            except wmi.x_wmi as e:
                logging.error("OpenHardwareMonitor not available or not running. Error: %s", e)
                return "OpenHardwareMonitor not running"
            finally:
                pythoncom.CoUninitialize()
        else:
            temps = psutil.sensors_temperatures()
            if "coretemp" in temps:
                return temps["coretemp"][0].current
            elif "cpu_thermal" in temps:
                return temps["cpu_thermal"][0].current
            else:
                return "Temperature sensor not available"
    except Exception as e:
        logging.error(f"Error fetching CPU temperature: {e}")
        return "Error fetching temperature"

def get_active_gpu():
    try:
        gpus = GPUtil.getGPUs()
        if not gpus:
            return {"gpu_name": "No GPU detected", "memory_total": 0, "memory_used": 0, "memory_free": 0, "gpu_load": 0}
        active_gpu = max(gpus, key=lambda gpu: gpu.load)
        return {
            "gpu_name": active_gpu.name,
            "memory_total": active_gpu.memoryTotal,
            "memory_used": active_gpu.memoryUsed,
            "memory_free": active_gpu.memoryFree,
            "gpu_load": active_gpu.load * 100
        }
    except Exception as e:
        logging.error(f"Error fetching GPU info: {e}")
        return {"gpu_name": "Error", "memory_total": 0, "memory_used": 0, "memory_free": 0, "gpu_load": 0}

def monitor_gpu_usage():
    while True:
        usage_data["gpu_details"] = get_active_gpu()
        usage_data["gpu"] = usage_data["gpu_details"].get("gpu_load", 0)
        time.sleep(1)

@app.route('/usage', methods=['GET'])
def get_usage():
    try:
        usage_data["cpu"] = psutil.cpu_percent(interval=2)
        usage_data["cpu_details"] = get_cpu_details()
        usage_data["memory_details"] = get_memory_details()
        usage_data["cpu_temperature"] = get_cpu_temperature()
    except Exception as e:
        logging.error(f"Error getting CPU or memory usage: {e}")
        usage_data["cpu"] = -1
    return jsonify(usage_data)

if __name__ == '__main__':
    gpu_thread = threading.Thread(target=monitor_gpu_usage, daemon=True)
    gpu_thread.start()
    app.run(debug=True, host='0.0.0.0', port=5000)
