# usage-tracker

This web application monitors your CPU and GPU usage in real-time and displays the data in a visually appealing dashboard with speedometer-style gauges. The backend is built using Python (Flask) and the frontend is built using React. It also provides detailed system information about your CPU and GPU.

## Features

- **Real-time CPU usage monitoring** with core and thread information
- **Real-time GPU usage monitoring**, including memory usage and load
- Speedometer-style gauges to visualize usage
- Responsive and intuitive dashboard interface
- Built with Flask (backend) and React (frontend)

## Technology Stack

- **Backend**: Flask, psutil, GPUtil, threading
- **Frontend**: React, axios, react-d3-speedometer

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for running the React frontend)
- [Python](https://www.python.org/) (for running the Flask backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)
- [GPUtil](https://pypi.org/project/GPUtil/) (for GPU information retrieval)

## Installation

### Backend Setup (Flask + Python)

1. Clone the repository:

    ```bash
    git clone https://github.com/ashutoshjha23/usage-tracker.git
    cd usage-tracker
    ```

2. Create and activate a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # 
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask backend:

    ```bash
    python app.py
    ```

The backend should now be running at `http://localhost:5000`.

### Frontend Setup (React)

1. Navigate to the `frontend` folder:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

The frontend should now be running at `http://localhost:3000`.

## Usage

Once both the backend and frontend are running, open your browser and navigate to `http://localhost:3000`. The page will display real-time CPU and GPU usage with system details such as the CPU name, number of cores/threads, GPU name, memory usage, and more.
