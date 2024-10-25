import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Speedometer from "react-d3-speedometer";

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
        <div style={{ backgroundColor: '#121212', color: 'white', padding: '40px', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                {/* CPU Section */}
                <div style={{ width: '45%', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5em' }}>CPU Usage</h2>
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
                        needleTransitionDuration={2000}
                        needleTransition="easeElastic"
                    />
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>CPU Name: {usage.cpu_details.cpu_name}</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Cores: {usage.cpu_details.cores}</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Threads: {usage.cpu_details.threads}</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Temperature: {usage.cpu_temperature}°C</p>
                </div>

                {/* GPU Section */}
                <div style={{ width: '45%', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5em' }}>GPU Usage</h2>
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
                        needleTransitionDuration={2000}
                        needleTransition="easeElastic"
                    />
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>GPU Name: {usage.gpu_details.gpu_name}</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Memory Total: {usage.gpu_details.memory_total} MB</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Memory Used: {usage.gpu_details.memory_used} MB</p>
                    <p style={{ fontSize: '1em', fontWeight: '300' }}>Memory Free: {usage.gpu_details.memory_free} MB</p>
                </div>
            </div>

            {/* Memory Section */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5em' }}>Memory Usage</h2>
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
                    needleTransitionDuration={2000}
                    needleTransition="easeElastic"
                />
                <p style={{ fontSize: '1em', fontWeight: '300' }}>Total Memory: {(usage.memory_details.total_memory / 1024 / 1024).toFixed(2)} MB</p>
                <p style={{ fontSize: '1em', fontWeight: '300' }}>Used Memory: {(usage.memory_details.used_memory / 1024 / 1024).toFixed(2)} MB</p>
                <p style={{ fontSize: '1em', fontWeight: '300' }}>Available Memory: {(usage.memory_details.available_memory / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
    );
};

export default GaugeDisplay;
