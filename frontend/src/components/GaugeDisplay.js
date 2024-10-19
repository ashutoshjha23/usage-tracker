import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Speedometer from "react-d3-speedometer";

const GaugeDisplay = () => {
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
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
            <div>
                <h2>CPU Usage</h2>
                <Speedometer
                    maxValue={100}
                    value={usage.cpu}
                    needleColor="white"  
                    startColor="#00FF00" 
                    endColor="#FF0000"   
                    segments={5}
                    textColor="white"     
                    needleHeight={30}
                    needleTransitionDuration={400}
                    needleTransition="easeElastic"
                    segmentsColor={["#00FF00", "#FFFF00", "#FFFF00", "#FFA500", "#FF0000"]} 
                />
            </div>
            <div>
                <h2>GPU Usage</h2>
                <Speedometer
                    maxValue={100}
                    value={usage.gpu}
                    needleColor="white"  
                    startColor="#00FF00"
                    endColor="#FF0000"   
                    segments={5}
                    textColor="white"     
                    needleHeight={30}
                    needleTransitionDuration={400}
                    needleTransition="easeElastic"
                    segmentsColor={["#00FF00", "#FFFF00", "#FFFF00", "#FFA500", "#FF0000"]} 
                />
            </div>
        </div>
    );
};

export default GaugeDisplay;
