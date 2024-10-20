# usage-tracker

This project is a web application that displays real-time CPU and GPU usage using a Python Flask backend and a React frontend. The CPU and GPU metrics are fetched from the system and displayed as interactive speedometers on the web interface.

## Features

- **Real-time Monitoring**: CPU and GPU usage are updated every second.
- **Speedometer Visualization**: Utilization is visualized using speedometers with custom colors.
- **CPU Metrics**: Displays CPU usage percentage, core count, and frequency.
- **GPU Metrics**: Displays GPU usage percentage, total memory, free memory, and used memory.

## Prerequisites

Before running the project, ensure you have the following installed:

- Python 3.x
- Node.js
- Flask
- React
- `psutil` (Python library)
- `GPUtil` (Python library)

## Installation

### Backend (Flask)

1. Clone the repository:

    ```bash
    git clone https://github.com/ashutoshjha23/usage-tracker.git
    cd system-usage
    ```

2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run the Flask backend:

    ```bash
    python app.py
    ```

### Frontend (React)

1. Navigate to the `frontend` folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React frontend:

    ```bash
    npm start
    ```

## Project Structure

```bash
cpu-gpu-usage-monitor/
├── app.py                    # Flask backend serving CPU and GPU usage data
├── requirements.txt           # Backend dependencies (Flask, psutil, GPUtil, etc.)
├── frontend/
│   ├── public/                # Public assets
│   ├── src/
│   │   ├── components/
│   │   │   └── GaugeDisplay.js # Component displaying CPU & GPU usage
│   │   ├── App.js             # Main React app component
│   │   ├── index.js           # React entry point
│   ├── package.json           # Frontend dependencies
├── README.md                  # Project documentation
