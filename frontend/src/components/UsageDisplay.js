import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsageDisplay = () => {
    const [usage, setUsage] = useState({ cpu: 0, gpu: 0 });

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
        <div>
            <h1>CPU and GPU Usage</h1>
            <p>CPU Usage: {usage.cpu}%</p>
            <p>GPU Usage: {usage.gpu}%</p>
        </div>
    );
};

export default UsageDisplay;
