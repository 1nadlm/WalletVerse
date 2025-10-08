import { useState, useEffect } from "react";
import "./DashboardPage.css";
import logo from "../img/WalletVerseLogo.png";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [activeTab, setActiveTab] = useState("top10");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "https://api.coinpaprika.com/v1";

  const navProfile = () => {
    navigate("/profile");
  };

  const navPortfolio = () => {
    navigate("/portfolio");
  };

  const fetchCryptoData = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tickers`);

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      let data = await response.json();

      data = data.filter(coin =>
        coin.rank > 0 &&
        coin.quotes &&
        coin.quotes.USD &&
        coin.quotes.USD.price > 0
      );

      if (category === "top10") {
        data = data
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 10);

      } else if (category === "trending") {
        data = data
          .filter(coin => coin.quotes.USD.volume_24h > 0)
          .sort((a, b) => b.quotes.USD.volume_24h - a.quotes.USD.volume_24h)
          .slice(0, 10);

      } else if (category === "losers") {
        data = data
          .filter(coin => coin.quotes.USD.percent_change_24h !== null && coin.quotes.USD.percent_change_24h < 0)
          .sort((a, b) => a.quotes.USD.percent_change_24h - b.quotes.USD.percent_change_24h)
          .slice(0, 10);
      }

      setCryptoData(data);

    } catch (err) {
      setError(err.message);
      console.error("Erreur détaillée:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData(activeTab);
  }, [activeTab]);

  const formatPrice = (price) => {
    if (!price) return "$0.00";

    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const getCryptoIcon = (symbol) => {
    return `https://static.coinpaprika.com/coin/${symbol.toLowerCase()}/logo.png`;
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar gauche */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="WalletVerse Logo" className="logo" />
        </div>

        {/* Category Navigation */}
        <nav className="sidebar-nav">
          <h3 className="nav-title">Categories</h3>
          {[
            { key: 'top10', label: 'Top 10', icon: '🏆' },
            { key: 'trending', label: 'Trending', icon: '🔥' },
            { key: 'losers', label: 'Losers', icon: '📉' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`sidebar-button ${activeTab === tab.key ? 'active' : ''}`}
            >
              <span className="button-icon">{tab.icon}</span>
              <span className="button-label">{tab.label}</span>
            </button>
          ))}
          <h3 className="nav-title">Quick Access</h3>
          <button onClick={navPortfolio} className="sidebar-button">
            <span className="button-icon">💼</span>
            <span className="button-label">Access Portfolio</span>
          </button>
          <button onClick={navProfile} className="sidebar-button">
            <span className="button-icon">👤</span>
            <span className="button-label">Access Profile</span>
          </button>
        </nav>

        <section className="balance-section">
          <h2 className="balance-title">Your Balance</h2>
          <p className="balance-amount">$10,000.00</p>
          <p className="balance-subtitle">Total Portfolio Value</p>
        </section>

        {/* Additional info could go here */}
        <div className="sidebar-footer">
          <p className="welcome-text">Welcome back! 🚀</p>
        </div>
      </aside>

      {/* Main content area */}
      <main className="main-content">
        {/* Header avec tabs */}
        <header className="content-header">
          <h1 className="page-title">Market Overview</h1>
        </header>

        {/* Table of Coins */}
        <section className="crypto-table-section">
          {loading ? (
            <div className="loading-message">Loading... ⏳</div>
          ) : error ? (
            <div className="error-container">
              <div className="error-message">⚠️ {error}</div>
              <div className="error-hint">
                Impossible de charger les données crypto
              </div>
            </div>
          ) : (
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Coin</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">24h %</th>
                  <th className="text-left">Volume 24h</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((coin) => {
                  if (!coin.quotes || !coin.quotes.USD) {
                    return null;
                  }

                  const usdData = coin.quotes.USD;
                  const changePercent = usdData.percent_change_24h || 0;
                  const price = usdData.price || 0;
                  const volume = usdData.volume_24h || 0;

                  return (
                    <tr key={coin.id}>
                      <td className="rank-cell">{coin.rank}</td>
                      <td>
                        <div className="coin-info">
                          <img
                            src={getCryptoIcon(coin.id)}
                            alt={coin.name}
                            className="coin-icon"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="coin-details">
                            <div className="coin-name">{coin.name}</div>
                            <div className="coin-symbol">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="price-cell text-right">
                        {formatPrice(price)}
                      </td>
                      <td className={`change-cell text-right ${changePercent >= 0 ? 'positive' : 'negative'}`}>
                        {changePercent >= 0 ? '▲' : '▼'}
                        {Math.abs(changePercent).toFixed(2)}%
                      </td>
                      <td className="volume-cell text-right">
                        ${(volume / 1000000).toFixed(2)}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;