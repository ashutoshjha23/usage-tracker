import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Speedometer from "react-d3-speedometer";
import './GaugeDisplay.css';

const GaugeDisplay = () => {
    const [usage, setUsage] = useState({
        cpu: 0,
        gpu: 0,
        cpu_details: { cpu_name: "", cores: 0, threads: 0 },
        gpu_details: { gpu_name: "", memory_total: 0, memory_used: 0, memory_free: 0 },
        memory_details: { total_memory: 0, used_memory: 0, available_memory: 0, memory_percent: 0 },
        cpu_temperature: "Not Available"
    });

    const fetchUsage = async () => {
        try {
            const response = await axios.get('http://localhost:5000/usage');
            setUsage(response.data);
        } catch (error) {
            console.error('Error fetching usage data:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchUsage, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gauge-display">
            <div className="gauge-container">
                <div className="gauge-section">
                    <h2>CPU Usage</h2>
                    <Speedometer
                        maxValue={100}
                        value={usage.cpu}
                        needleColor="white"
                        startColor="#00FF00"
                        endColor="red"
                        segments={1000}
                        textColor="white"
                        needleHeightRatio={0.7}
                        currentValueText={`CPU Usage: ${usage.cpu}%`}
                        ringWidth={20}
                        valueTextFontSize="22px"
                        labelFontSize="14px"
                        customSegmentStops={[0, 20, 40, 60, 80, 100]}
                        forceRender={true}
                        needleTransitionDuration={1500}  
                        needleTransition="easeElastic"  
                    />
                    <p>CPU Name: {usage.cpu_details.cpu_name}</p>
                    <p>Cores: {usage.cpu_details.cores}</p>
                    <p>Threads: {usage.cpu_details.threads}</p>
                    <p>Temperature: {usage.cpu_temperature}°C</p>
                </div>

                <div className="gauge-section">
                    <h2>GPU Usage</h2>
                    <Speedometer
                        maxValue={100}
                        value={usage.gpu}
                        needleColor="white"
                        startColor="#00FF00"
                        endColor="red"
                        segments={1000}
                        textColor="white"
                        needleHeightRatio={0.7}
                        currentValueText={`GPU Usage: ${usage.gpu}%`}
                        ringWidth={20}
                        valueTextFontSize="22px"
                        labelFontSize="14px"
                        customSegmentStops={[0, 20, 40, 60, 80, 100]}
                        forceRender={true}
                        needleTransitionDuration={1500}  
                        needleTransition="easeElastic"  
                    />
                    <p>GPU Name: {usage.gpu_details.gpu_name}</p>
                    <p>Memory Total: {usage.gpu_details.memory_total} MB</p>
                    <p>Memory Used: {usage.gpu_details.memory_used} MB</p>
                    <p>Memory Free: {usage.gpu_details.memory_free} MB</p>
                </div>
            </div>

            <div className="memory-section">
                <h2>Memory Usage</h2>
                <Speedometer
                    maxValue={100}
                    value={usage.memory_details.memory_percent}
                    needleColor="white"
                    startColor="#00FF00"
                    endColor="red"
                    segments={1000}
                    textColor="white"
                    needleHeightRatio={0.7}
                    currentValueText={`Memory Usage: ${usage.memory_details.memory_percent}%`}
                    ringWidth={20}
                    valueTextFontSize="22px"
                    labelFontSize="14px"
                    customSegmentStops={[0, 20, 40, 60, 80, 100]}
                    forceRender={true}
                    needleTransitionDuration={1500}  
                    needleTransition="easeElastic"  
                />
                <p>Total Memory: {(usage.memory_details.total_memory / 1024 / 1024).toFixed(2)} MB</p>
                <p>Used Memory: {(usage.memory_details.used_memory / 1024 / 1024).toFixed(2)} MB</p>
                <p>Available Memory: {(usage.memory_details.available_memory / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
    );
};

export default GaugeDisplay;
