import React from 'react';
import GaugeDisplay from './components/GaugeDisplay';
import './styles.css';

const App = () => {
    return (
        <div className="App">
            <h1>System Usage Monitor</h1>
            <GaugeDisplay />
        </div>
    );
};

export default App;
