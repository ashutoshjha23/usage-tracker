import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Speedometer from "react-d3-speedometer";

const GaugeDisplay = () => {
    const [usage, setUsage] = useState({
        cpu: 0,
        gpu: 0,
        cpu_details: { cpu_name: "", cores: 0, threads: 0 },
        gpu_details: { gpu_name: "", memory_total: 0, memory_used: 0, memory_free: 0 }
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
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                {/* Cpu*/}
                <div style={{ width: '45%' }}>
                    <h2>CPU Usage</h2>
                    <Speedometer
                        maxValue={100}
                        value={usage.cpu}
                        needleColor="white"
                        startColor="green"
                        endColor="red"
                        segments={5}
                        textColor="white"
                        needleHeightRatio={0.8}
                        currentValueText={`CPU Usage: ${usage.cpu}%`}
                        segmentsColor={["green", "yellow", "yellow", "orange", "red"]}
                    />
                    <p>CPU Name: {usage.cpu_details.cpu_name}</p>
                    <p>Cores: {usage.cpu_details.cores}</p>
                    <p>Threads: {usage.cpu_details.threads}</p>
                </div>
                {/* Gpu */}
                <div style={{ width: '45%' }}>
                    <h2>GPU Usage</h2>
                    <Speedometer
                        maxValue={100}
                        value={usage.gpu}
                        needleColor="white"
                        startColor="green"
                        endColor="red"
                        segments={5}
                        textColor="white"
                        needleHeightRatio={0.8}
                        currentValueText={`GPU Usage: ${usage.gpu}%`}
                        segmentsColor={["green", "yellow", "yellow", "orange", "red"]}
                    />
                    <p>GPU Name: {usage.gpu_details.gpu_name}</p>
                    <p>Memory Total: {usage.gpu_details.memory_total} MB</p>
                    <p>Memory Used: {usage.gpu_details.memory_used} MB</p>
                    <p>Memory Free: {usage.gpu_details.memory_free} MB</p>
                </div>
            </div>
        </div>
    );
};
export default GaugeDisplay;
