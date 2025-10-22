import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CoinDetail.css";

function CoinDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`, { signal: controller.signal });
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <div className="coin-detail-wrapper">
                <div className="coin-detail-container">
                    <div className="coin-detail-loading">
                        <div className="spinner"></div>
                        <p>Loading coin details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="coin-detail-wrapper">
                <div className="coin-detail-container">
                    <div className="coin-detail-error">
                        <h2>Error Loading Data</h2>
                        <p>{error}</p>
                        <button onClick={() => navigate('/dashboard')} className="coin-detail-btn-back">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="coin-detail-wrapper">
                <div className="coin-detail-container">
                    <p>No data available</p>
                </div>
            </div>
        );
    }

    const usd = data.quotes?.USD || {};
    const logo = `https://static.coinpaprika.com/coin/${data.id}/logo.png`;
    const changePercent = usd.percent_change_24h || 0;
    const isPositive = changePercent >= 0;

    return (
        <div className="coin-detail-wrapper">
            <div className="coin-detail-container">
                <button onClick={() => navigate('/dashboard')} className="coin-detail-btn-back">
                    ← Back to Dashboard
                </button>

                <div className="coin-detail-header">
                    <div className="coin-detail-header-left">
                        <img
                            src={logo}
                            alt={data.name}
                            className="coin-detail-logo"
                            onError={(e) => (e.target.style.display = 'none')}
                        />
                        <div className="coin-detail-title-section">
                            <h1 className="coin-detail-title">{data.name}</h1>
                            <span className="coin-detail-symbol">{data.symbol}</span>
                            <span className="coin-detail-rank">Rank #{data.rank}</span>
                        </div>
                    </div>
                    <div className="coin-detail-header-right">
                        <div className="coin-detail-price-section">
                            <div className="coin-detail-price-label">Current Price</div>
                            <div className="coin-detail-price">
                                {usd.price != null ? `$${usd.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : 'N/A'}
                            </div>
                            <div className={`coin-detail-change ${isPositive ? 'positive' : 'negative'}`}>
                                {isPositive ? '▲' : '▼'}
                                {Math.abs(changePercent).toFixed(2)}% (24h)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="coin-detail-stats-grid">
                    <div className="coin-detail-stat-card">
                        <div className="coin-detail-stat-label">Market Cap</div>
                        <div className="coin-detail-stat-value">
                            {usd.market_cap ? `$${(usd.market_cap / 1000000000).toFixed(2)}B` : 'N/A'}
                        </div>
                    </div>
                    <div className="coin-detail-stat-card">
                        <div className="coin-detail-stat-label">Volume 24h</div>
                        <div className="coin-detail-stat-value">
                            {usd.volume_24h ? `$${(usd.volume_24h / 1000000).toFixed(2)}M` : 'N/A'}
                        </div>
                    </div>
                    <div className="coin-detail-stat-card">
                        <div className="coin-detail-stat-label">Circulating Supply</div>
                        <div className="coin-detail-stat-value">
                            {data.circulating_supply ? `${(data.circulating_supply / 1000000).toFixed(2)}M ${data.symbol}` : 'N/A'}
                        </div>
                    </div>
                    <div className="coin-detail-stat-card">
                        <div className="coin-detail-stat-label">Max Supply</div>
                        <div className="coin-detail-stat-value">
                            {data.max_supply ? `${(data.max_supply / 1000000).toFixed(2)}M ${data.symbol}` : 'Unlimited'}
                        </div>
                    </div>
                </div>

                <div className="coin-detail-card">
                    <h2 className="coin-detail-card-title">Price Changes</h2>
                    <div className="coin-detail-changes-grid">
                        <div className="coin-detail-change-item">
                            <span className="coin-detail-change-period">1 Hour</span>
                            <span className={`coin-detail-change-value ${(usd.percent_change_1h || 0) >= 0 ? 'positive' : 'negative'}`}>
                                {(usd.percent_change_1h || 0) >= 0 ? '▲' : '▼'}
                                {Math.abs(usd.percent_change_1h || 0).toFixed(2)}%
                            </span>
                        </div>
                        <div className="coin-detail-change-item">
                            <span className="coin-detail-change-period">24 Hours</span>
                            <span className={`coin-detail-change-value ${(usd.percent_change_24h || 0) >= 0 ? 'positive' : 'negative'}`}>
                                {(usd.percent_change_24h || 0) >= 0 ? '▲' : '▼'}
                                {Math.abs(usd.percent_change_24h || 0).toFixed(2)}%
                            </span>
                        </div>
                        <div className="coin-detail-change-item">
                            <span className="coin-detail-change-period">7 Days</span>
                            <span className={`coin-detail-change-value ${(usd.percent_change_7d || 0) >= 0 ? 'positive' : 'negative'}`}>
                                {(usd.percent_change_7d || 0) >= 0 ? '▲' : '▼'}
                                {Math.abs(usd.percent_change_7d || 0).toFixed(2)}%
                            </span>
                        </div>
                        <div className="coin-detail-change-item">
                            <span className="coin-detail-change-period">30 Days</span>
                            <span className={`coin-detail-change-value ${(usd.percent_change_30d || 0) >= 0 ? 'positive' : 'negative'}`}>
                                {(usd.percent_change_30d || 0) >= 0 ? '▲' : '▼'}
                                {Math.abs(usd.percent_change_30d || 0).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="coin-detail-card">
                    <h2 className="coin-detail-card-title">Additional Information</h2>
                    <div className="coin-detail-info-grid">
                        <div className="coin-detail-info-item">
                            <span className="coin-detail-info-label">All Time High</span>
                            <span className="coin-detail-info-value">
                                {usd.ath_price ? `$${usd.ath_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : 'N/A'}
                            </span>
                        </div>
                        <div className="coin-detail-info-item">
                            <span className="coin-detail-info-label">ATH Date</span>
                            <span className="coin-detail-info-value">
                                {usd.ath_date ? new Date(usd.ath_date).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        <div className="coin-detail-info-item">
                            <span className="coin-detail-info-label">Total Supply</span>
                            <span className="coin-detail-info-value">
                                {data.total_supply ? `${(data.total_supply / 1000000).toFixed(2)}M ${data.symbol}` : 'N/A'}
                            </span>
                        </div>
                        <div className="coin-detail-info-item">
                            <span className="coin-detail-info-label">Beta Value</span>
                            <span className="coin-detail-info-value">
                                {data.beta_value != null ? data.beta_value.toFixed(3) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Links */}
                {data.urls?.website?.[0] && (
                    <div className="coin-detail-card">
                        <h2 className="coin-detail-card-title">Official Links</h2>
                        <div className="coin-detail-links">
                            <a
                                href={data.urls.website[0]}
                                target="_blank"
                                rel="noreferrer"
                                className="coin-detail-link"
                            >
                                🌐 Official Website
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoinDetail;