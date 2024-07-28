import React, { Fragment, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import mqtt from 'mqtt';
import styles from "./DashBoard.module.scss";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const DashBoard: React.FC = () => {
    const [temperature, setTemperature] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [gas, setGas] = useState<number>(0);
    const [led, setLed] = useState<string>('off'); // Trạng thái của đèn LED ('on' hoặc 'off')
    // const [buzzer, setBuzzer] = useState<number>(0);
    const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
    const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
    const [humidityHistory, setHumidityHistory] = useState<number[]>([]);
    const [gasHistory, setGasHistory] = useState<number[]>([]);
    const [timestamps, setTimestamps] = useState<string[]>([]);
    const [client, setClient] = useState<mqtt.MqttClient | null>(null);

    useEffect(() => {
        const mqttClient = mqtt.connect('ws://192.168.1.82:9001/mqtt');
        setClient(mqttClient);

        mqttClient.on('connect', () => {
            setConnectionStatus('Connected');
            mqttClient.subscribe('sensor');
        });

        mqttClient.on('message', (topic, message) => {
            try {
                const data = JSON.parse(message.toString());
                const temperatureValue = parseFloat(data.temperature).toFixed(2);
                const humidityValue = parseFloat(data.humidity).toFixed(2);
                const gasValue = parseFloat(data.gas).toFixed(2);
                const ledValue = data.led || 'off';
                // const buzzerValue = data.buzzer || 0;

                setTemperature(parseFloat(temperatureValue));
                setHumidity(parseFloat(humidityValue));
                setGas(parseFloat(gasValue));
                setLed(ledValue);
                // setBuzzer(buzzerValue);

                updateTemperatureHistory(parseFloat(temperatureValue));
                updateHumidityHistory(parseFloat(humidityValue));
                updateGasHistory(parseFloat(gasValue));

                const now = new Date().toLocaleTimeString();
                setTimestamps(prev => [...prev, now]);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

        return () => {
            mqttClient.end();
        };
    }, []);

    const updateTemperatureHistory = (value: number) => {
        setTemperatureHistory(prev => [...prev, value]);
    };

    const updateHumidityHistory = (value: number) => {
        setHumidityHistory(prev => [...prev, value]);
    };

    const updateGasHistory = (value: number) => {
        setGasHistory(prev => [...prev, value]);
    };

    const toggleLed = () => {
        if (client) {
            // Chuyển đổi trạng thái LED từ 'off' sang 'on' hoặc ngược lại
            const newLedState = led === 'off' ? 1 : 0;

            // Gửi tin nhắn qua MQTT với trạng thái LED mới (1 hoặc 0)
            client.publish('client', JSON.stringify({ led: newLedState }));

            // Cập nhật trạng thái LED trong component
            setLed(newLedState === 1 ? 'on' : 'off');
        }
    };

    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                {/* <aside className={styles.sidebar}>
                    <div className={styles.top}>
                        <div className={styles.logo}>
                        </div>
                    </div>
                    <nav className={styles.nav}>
                        <a href="#" className={styles.active}>
                            <h3>Dashboard</h3>
                        </a>
                    </nav>
                </aside> */}
                <main className={styles.mainContent}>
                    <div className={styles.content_container}>
                        <div className={styles.header_content}>
                            <h1>OpenKIT-B</h1>
                        </div>
                        <div className={styles.connection_status}>
                            <h3>Connection Status: <span className={styles.status}>{connectionStatus}</span></h3>
                        </div>
                    </div>
                    <div className={styles.insights}>
                        <div className={styles.insightItem}>
                            <div className={styles.insightContent}>
                                <div className={styles.left}>
                                    <h3>Temperature</h3>
                                    <h1>{temperature.toFixed(2)}°C</h1>
                                </div>
                                <div className={styles.icon} style={{ color: 'red' }}>
                                    <i className="fas fa-thermometer-half"></i> {/* Nhiệt độ */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.insightItem}>
                            <div className={styles.insightContent}>
                                <div className={styles.left}>
                                    <h3>Humidity</h3>
                                    <h1>{humidity.toFixed(2)}%</h1>
                                </div>
                                <div className={styles.icon} style={{ color: 'blue' }}>
                                    <i className="fas fa-tint"></i> {/* Độ ẩm */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.insightItem}>
                            <div className={styles.insightContent}>
                                <div className={styles.left}>
                                    <h3>Gas</h3>
                                    <h1>{gas.toFixed(2)} ppm</h1>
                                </div>
                                <div className={styles.icon} style={{ color: 'green' }}>
                                    <i className="fas fa-gas-pump"></i> {/* Khí gas */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.insightItem}>
                            <div className={styles.insightContent}>
                                <div className={styles.left}>
                                    <h3>LED</h3>
                                    <div className={styles.ledContent}>
                                        <button id="toggleButton" onClick={toggleLed}>
                                            {led === 'off' ? 'Bật' : 'Tắt'}
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={styles.icon}
                                    style={{ color: led === 'off' ? 'yellow' : 'red' }}
                                >
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.histories}>
                        <h2>Historical Charts</h2>
                        <div className={styles.history_charts}>
                            <div className={styles.history_chart_item}>
                                <Plot
                                    data={[
                                        {
                                            x: timestamps,
                                            y: temperatureHistory,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: '#05AD86' },
                                        },
                                    ]}
                                    layout={{ title: 'Temperature History' }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <div className={styles.history_chart_item}>
                                <Plot
                                    data={[
                                        {
                                            x: timestamps,
                                            y: humidityHistory,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: '#05AD86' },
                                        },
                                    ]}
                                    layout={{ title: 'Humidity History' }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <div className={styles.history_chart_item}>
                                <Plot
                                    data={[
                                        {
                                            x: timestamps,
                                            y: gasHistory,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: '#05AD86' },
                                        },
                                    ]}
                                    layout={{ title: 'Gas History' }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.gauges}>
                        <h2>Gauges</h2>
                        <div className={styles.gauge_charts}>
                            <Plot
                                data={[
                                    {
                                        type: 'indicator',
                                        mode: 'gauge+number',
                                        value: temperature,
                                        gauge: {
                                            axis: { range: [0, 100] },
                                            steps: [
                                                { range: [0, 20], color: 'lightgray' },
                                                { range: [20, 40], color: 'lightblue' },
                                                { range: [40, 100], color: 'blue' },
                                            ],
                                            threshold: {
                                                line: { color: 'red', width: 4 },
                                                thickness: 0.75,
                                                value: 40,
                                            },
                                        },
                                    },
                                ]}
                                layout={{ title: 'Temperature Gauge' }}
                                style={{ width: '300px', height: '250px' }}
                            />
                            <Plot
                                data={[
                                    {
                                        type: 'indicator',
                                        mode: 'gauge+number',
                                        value: humidity,
                                        gauge: {
                                            axis: { range: [0, 100] },
                                            steps: [
                                                { range: [0, 40], color: 'lightgray' },
                                                { range: [40, 80], color: 'lightblue' },
                                                { range: [80, 100], color: 'blue' },
                                            ],
                                            threshold: {
                                                line: { color: 'red', width: 4 },
                                                thickness: 0.75,
                                                value: 80,
                                            },
                                        },
                                    },
                                ]}
                                layout={{ title: 'Humidity Gauge' }}
                                style={{ width: '300px', height: '250px' }}
                            />
                            <Plot
                                data={[
                                    {
                                        type: 'indicator',
                                        mode: 'gauge+number',
                                        value: gas,
                                        gauge: {
                                            axis: { range: [0, 900] },
                                            steps: [
                                                { range: [0, 100], color: 'lightgray' },
                                                { range: [100, 300], color: 'lightblue' },
                                                { range: [300, 500], color: 'blue' },
                                            ],
                                            threshold: {
                                                line: { color: 'red', width: 4 },
                                                thickness: 0.75,
                                                value: 300,
                                            },
                                        },
                                    },
                                ]}
                                layout={{ title: 'Gas Gauge' }}
                                style={{ width: '300px', height: '250px' }}
                            />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </Fragment>
    );
};

export default DashBoard;
