import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PortfolioPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioPage() {
    const [portfolio] = useState([
        { name: "Bitcoin", symbol: "BTC", amountUSD: 5000, coins: 0.12 },
        { name: "Ethereum", symbol: "ETH", amountUSD: 3000, coins: 1.4 },
        { name: "Solana", symbol: "SOL", amountUSD: 2000, coins: 50 }
    ]);

    const totalValue = portfolio.reduce((sum, c) => sum + c.amountUSD, 0);

    const data = {
        labels: portfolio.map((coin) => coin.name),
        datasets: [
            {
                data: portfolio.map((coin) => coin.amountUSD),
                backgroundColor: ["#f2a900", "#627eea", "#00ff9d"],
                borderWidth: 0,
                hoverOffset: 10
            }
        ]
    };
    const navigate = useNavigate();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    font: { size: 14, family: "'Inter', sans-serif" },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: "circle"
                }
            },
            tooltip: {
                backgroundColor: "rgba(30, 41, 59, 0.95)",
                padding: 16,
                cornerRadius: 8,
                titleFont: { size: 15, weight: "bold" },
                bodyFont: { size: 14 }
            }
        }
    };

    return (
        <div className="portfolio-page">
            <nav className="portfolio-nav">
                <div className="portfolio-nav-content">
                    <div className="portfolio-logo"
                        onClick={() => navigate("/dashboard")}
                        style={{ cursor: 'pointer' }}>WalletVerse</div>
                    <div className="portfolio-links">
                        <a href="/dashboard">Dashboard</a>
                        <a href="#" className="active">Portfolio</a>
                        <a href="#">Transactions</a>
                        <a href="/profile">Profile</a>
                    </div>
                </div>
            </nav>

            <div className="portfolio-main">
                <div className="portfolio-header">
                    <h1>Portfolio Overview</h1>
                    <p>Track and manage your cryptocurrency investments</p>
                </div>

                <div className="portfolio-stats">
                    <div className="portfolio-card gradient">
                        <span>Total Value</span>
                        <h2>${totalValue.toLocaleString()}</h2>
                    </div>
                    <div className="portfolio-card">
                        <span>Total Assets</span>
                        <h2>{portfolio.length}</h2>
                    </div>
                    <div className="portfolio-card">
                        <span>Best Performer</span>
                        <h2>{portfolio[0].symbol}</h2>
                    </div>
                    <div className="portfolio-card">
                        <span>24h Change</span>
                        <h2 className="positive">+5.23%</h2>
                    </div>
                </div>

                <div className="portfolio-grid">
                    <div className="portfolio-chart">
                        <h2>Asset Allocation</h2>
                        <div className="portfolio-chart-inner">
                            <Pie data={data} options={options} />
                        </div>
                    </div>

                    <div className="portfolio-holdings">
                        <h2>Your Holdings</h2>
                        {portfolio.map((coin, i) => {
                            const percentage = ((coin.amountUSD / totalValue) * 100).toFixed(2);
                            const colors = ["#f2a900", "#627eea", "#00ff9d"];
                            return (
                                <div key={i} className="holding-card">
                                    <div className="holding-top">
                                        <div className="holding-info">
                                            <div
                                                className="holding-icon"
                                                style={{
                                                    background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
                                                }}
                                            >
                                                {coin.symbol.charAt(0)}
                                            </div>
                                            <div>
                                                <h3>{coin.name}</h3>
                                                <span>{coin.symbol}</span>
                                            </div>
                                        </div>
                                        <div className="holding-value">
                                            <h4>${coin.amountUSD.toLocaleString()}</h4>
                                            <p>{coin.coins} {coin.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="holding-bar">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${percentage}%`,
                                                background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}dd)`
                                            }}
                                        ></div>
                                        <span style={{ color: colors[i] }}>{percentage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="portfolio-table">
                    <h2>Detailed Holdings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Symbol</th>
                                <th>Holdings</th>
                                <th>Value</th>
                                <th>Allocation</th>
                                <th>24h Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map((coin, i) => {
                                const percentage = ((coin.amountUSD / totalValue) * 100).toFixed(2);
                                const colors = ["#f2a900", "#627eea", "#00ff9d"];
                                const changes = ["+8.45%", "+3.21%", "+12.89%"];
                                return (
                                    <tr key={i}>
                                        <td>
                                            <div className="asset-cell">
                                                <div
                                                    className="asset-icon"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`
                                                    }}
                                                >
                                                    {coin.symbol.charAt(0)}
                                                </div>
                                                {coin.name}
                                            </div>
                                        </td>
                                        <td>{coin.symbol}</td>
                                        <td>{coin.coins} {coin.symbol}</td>
                                        <td>${coin.amountUSD.toLocaleString()}</td>
                                        <td style={{ color: colors[i] }}>{percentage}%</td>
                                        <td className="positive">{changes[i]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PortfolioPage;
