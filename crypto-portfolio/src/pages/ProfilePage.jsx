import { useState, useEffect, useRef } from "react";
import "./ProfilePage.css";
import logo from "../img/WalletVerseLogo.png";
import { Navigate, useNavigate } from "react-router-dom";

function ProfilePage() {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@walletverse.com",
        username: "johndoe",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        memberSince: "January 2023",
        bio: "Cryptocurrency enthusiast and long-term investor focused on building a diverse portfolio.",
        avatar:
            "https://ui-avatars.com/api/?name=John+Doe&size=200&background=667eea&color=fff&bold=true",
    });

    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setUser((prevUser) => ({
                ...prevUser,
                avatar: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    }

    const [stats] = useState({
        totalInvested: 25000,
        currentValue: 10000,
        totalTransactions: 147,
        activeDays: 642,
    });

    const [recentActivity] = useState([
        { type: "Buy", asset: "Bitcoin", amount: "0.05 BTC", value: "$2,100", date: "2 hours ago" },
        { type: "Sell", asset: "Ethereum", amount: "0.8 ETH", value: "$1,920", date: "1 day ago" },
        { type: "Buy", asset: "Solana", amount: "25 SOL", value: "$875", date: "3 days ago" },
        { type: "Buy", asset: "Bitcoin", amount: "0.02 BTC", value: "$840", date: "5 days ago" },
    ]);

    const [preferences, setPreferences] = useState({
        notifications: true,
        twoFactor: true
    });

    const handleToggle = (key) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className="profile-page-wrapper">
            <nav className={`profile-navbar ${isVisible ? "profile-navbar-visible" : "profile-navbar-hidden"}`}>
                <div className="profile-navbar-content">
                    <img src={logo} alt="WalletVerse Logo" className="profile-navbar-logo-img"
                        onClick={() => navigate("/dashboard")}
                        style={{ cursor: 'pointer' }} />
                    <div className="profile-navbar-brand"
                        onClick={() => navigate("/dashboard")}
                        style={{ cursor: 'pointer' }}>WalletVerse</div>
                    <div className="profile-navbar-links">
                        <a href="/dashboard" className="profile-nav-link">Dashboard</a>
                        <a href="/portfolio" className="profile-nav-link">Portfolio</a>
                        <a href="#" className="profile-nav-link">Transactions</a>
                        <a href="/profile" className="profile-nav-link profile-nav-link-active">Profile</a>
                    </div>
                </div>
            </nav>

            <div className="profile-page-container">
                <div className="profile-page-header">
                    <h1 className="profile-page-title">Profile Settings</h1>
                    <p className="profile-page-subtitle">Manage your account information and preferences</p>
                </div>

                {/* Stats */}
                <div className="profile-stats-grid">
                    <div className="profile-stat-card profile-stat-card-primary">
                        <div className="profile-stat-label">Total Invested</div>
                        <div className="profile-stat-value">${stats.totalInvested.toLocaleString()}</div>
                    </div>
                    <div className="profile-stat-card">
                        <div className="profile-stat-label">Current Value</div>
                        <div className="profile-stat-value">${stats.currentValue.toLocaleString()}</div>
                    </div>
                    <div className="profile-stat-card">
                        <div className="profile-stat-label">Total Transactions</div>
                        <div className="profile-stat-value">{stats.totalTransactions}</div>
                    </div>
                    <div className="profile-stat-card">
                        <div className="profile-stat-label">Active Days</div>
                        <div className="profile-stat-value">{stats.activeDays}</div>
                    </div>
                </div>

                <div className="profile-content-grid">
                    <div className="profile-left-column">
                        <div className="profile-card profile-user-card">
                            <div className="profile-avatar-section">
                                <img src={previewUrl || user.avatar} alt="Profile" className="profile-avatar-img" />
                                <input type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button className="profile-btn-change-photo"
                                    onClick={() => fileInputRef.current.click()}>
                                    Change Photo
                                </button>
                            </div>
                            <div className="profile-user-info">
                                <h2 className="profile-user-name">{user.name}</h2>
                                <p className="profile-user-username">@{user.username}</p>
                                <p className="profile-user-bio">{user.bio}</p>
                                <div className="profile-user-meta">
                                    <span className="profile-meta-item">Member since {user.memberSince}</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card profile-preferences-card">
                            <h3 className="profile-card-title">Preferences</h3>
                            <div className="profile-preferences-list">
                                <div className="profile-preference-item">
                                    <div className="profile-preference-info">
                                        <div className="profile-preference-label">Email Notifications</div>
                                        <div className="profile-preference-desc">Receive email updates about your account</div>
                                    </div>
                                    <label className="profile-toggle">
                                        <input
                                            type="checkbox"
                                            checked={preferences.notifications}
                                            onChange={() => handleToggle("notifications")}
                                        />
                                        <span className="profile-toggle-slider"></span>
                                    </label>
                                </div>
                                <div className="profile-preference-item">
                                    <div className="profile-preference-info">
                                        <div className="profile-preference-label">Two-Factor Authentication</div>
                                        <div className="profile-preference-desc">Add an extra layer of security</div>
                                    </div>
                                    <label className="profile-toggle">
                                        <input
                                            type="checkbox"
                                            checked={preferences.twoFactor}
                                            onChange={() => handleToggle("twoFactor")}
                                        />
                                        <span className="profile-toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="profile-right-column">
                        <div className="profile-card profile-info-card">
                            <h3 className="profile-card-title">Personal Information</h3>
                            <form className="profile-info-form">
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="profile-form-input"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="profile-form-input"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Username</label>
                                    <input
                                        type="text"
                                        className="profile-form-input"
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="profile-form-input"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Location</label>
                                    <input
                                        type="text"
                                        className="profile-form-input"
                                        value={user.location}
                                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-group">
                                    <label className="profile-form-label">Bio</label>
                                    <textarea
                                        className="profile-form-textarea"
                                        rows="4"
                                        value={user.bio}
                                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                    />
                                </div>
                                <div className="profile-form-actions">
                                    <button type="button" className="profile-btn profile-btn-secondary">Cancel</button>
                                    <button type="submit" className="profile-btn profile-btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>

                        <div className="profile-card profile-activity-card">
                            <h3 className="profile-card-title">Recent Activity</h3>
                            <div className="profile-activity-list">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="profile-activity-item">
                                        <div className="profile-activity-icon" data-type={activity.type.toLowerCase()}>
                                            {activity.type === "Buy" ? "↑" : "↓"}
                                        </div>
                                        <div className="profile-activity-details">
                                            <div className="profile-activity-main">
                                                <span className="profile-activity-type">{activity.type}</span>
                                                <span className="profile-activity-asset">{activity.asset}</span>
                                            </div>
                                            <div className="profile-activity-sub">
                                                {activity.amount} • {activity.value}
                                            </div>
                                        </div>
                                        <div className="profile-activity-date">{activity.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;