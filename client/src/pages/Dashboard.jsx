import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Weight, 
  Leaf,
  ArrowUpRight,
  Trash2,
  Clock,
  TrendingUp,
  Target,
  ChevronRight,
  Recycle,
  LayoutDashboard,
  Gift,
  Activity,
  MapPin,
  History,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  ChevronDown,
  Home,
  Zap,
  Award,
  BarChart3,
  Flame
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Overview');
  const [chartPeriod, setChartPeriod] = useState('W');

  const stats = [
    { label: 'Green Points', value: '2,450', subValue: '+120 today', icon: Trophy, color: '#eab308', bg: 'rgba(234, 179, 8, 0.08)' },
    { label: 'Waste Recycled', value: '12.5', unit: 'kg', subValue: '+2.4kg this week', icon: Weight, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
    { label: 'CO₂ Saved', value: '8.4', unit: 'kg', subValue: 'Top 5% of users', icon: Leaf, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.08)' },
    { label: 'Streak', value: '14', unit: 'days', subValue: 'Personal best!', icon: Flame, color: '#f97316', bg: 'rgba(249, 115, 22, 0.08)' },
  ];

  const recentActivity = [
    { type: 'Plastic Bottle', bin: 'Block V • Bin-A12', time: '2h ago', points: '+10', color: '#3b82f6' },
    { type: 'Glass Bottle', bin: 'Block C • Bin-C04', time: '5h ago', points: '+25', color: '#22c55e' },
    { type: 'Mixed Paper', bin: 'Block B • Bin-B09', time: '1d ago', points: '+15', color: '#eab308' },
    { type: 'E-Waste', bin: 'Block A • Bin-D01', time: '2d ago', points: '+40', color: '#ef4444' },
  ];

  const leaderboard = [
    { name: 'Rahul Sharma', points: '4.2k', rank: 1, color: '#eab308' },
    { name: 'Priya Singh', points: '3.8k', rank: 2, color: '#a1a1aa' },
    { name: 'Amit Kumar', points: '3.6k', rank: 3, color: '#cd7f32' },
  ];

  const chartData = [35, 60, 42, 85, 58, 72, 48];
  const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Home, label: 'Recycle', link: '/' },
    { icon: Gift, label: 'Rewards' },
    { icon: Activity, label: 'Activity' },
    { icon: Trophy, label: 'Leaderboard' },
    { icon: MapPin, label: 'Locations' },
    { icon: History, label: 'History' },
    { icon: Bell, label: 'Alerts' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Support' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <div className="dash-sidebar__logo">
            <Recycle size={22} />
          </div>
          <div>
            <h1 className="dash-sidebar__title">Trash to Treasure</h1>
            <p className="dash-sidebar__sub">Smart Systems</p>
          </div>
        </div>

        <nav className="dash-sidebar__nav">
          {sidebarItems.map((navItem, index) => (
            <a
              key={index}
              href={navItem.link || '#'}
              className={`dash-sidebar__link ${navItem.label === activeNav ? 'dash-sidebar__link--active' : ''}`}
              onClick={(e) => {
                if (navItem.link) {
                  e.preventDefault();
                  navigate(navItem.link);
                } else {
                  e.preventDefault();
                  setActiveNav(navItem.label);
                }
              }}
            >
              <navItem.icon size={18} strokeWidth={navItem.label === activeNav ? 2.5 : 2} />
              <span>{navItem.label}</span>
              {navItem.label === activeNav && <div className="dash-sidebar__dot"></div>}
            </a>
          ))}
        </nav>

        <div className="dash-sidebar__footer">
          <button 
            className="dash-sidebar__logout"
            onClick={() => { localStorage.clear(); window.location.href = '/auth'; }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="dash-main-wrapper">
        {/* Top Header */}
        <header className="dash-header">
          <div className="dash-header__left">
            <h2 className="dash-header__greeting">
              Welcome back, <span className="dash-header__name-accent">{user?.name?.split(' ')[0] || 'User'}</span>
            </h2>
            <p className="dash-header__status">Everything looks great today.</p>
          </div>
          <div className="dash-header__right">
            <div className="dash-header__search">
              <Search size={16} />
              <input type="text" placeholder="Search everything..." />
              <kbd className="dash-header__kbd">⌘K</kbd>
            </div>
            <button className="dash-header__bell">
              <Bell size={20} strokeWidth={2} />
              <span className="dash-header__bell-dot"></span>
            </button>
            <div className="dash-header__divider"></div>
            <button className="dash-header__profile">
              <div className="dash-header__avatar">{user?.name?.[0] || 'U'}</div>
              <div className="dash-header__profile-info">
                <span className="dash-header__profile-name">{user?.name || 'Student'}</span>
                <span className="dash-header__profile-tier">Tier 1</span>
              </div>
              <ChevronDown size={14} className="dash-header__chevron" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dash-content">
          {/* Hero */}
          <motion.div 
            className="dash-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="dash-hero__meta">
              <span className="dash-hero__badge">Active Session</span>
              <span className="dash-hero__sep">•</span>
              <span className="dash-hero__time">Updated 2 mins ago</span>
            </div>
            <h1 className="dash-hero__title">
              Sustainable <span className="dash-hero__title--gradient">Impact.</span>
            </h1>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="dash-stats"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={item} className="dash-stat-card">
                <div className="dash-stat-card__top">
                  <div className="dash-stat-card__icon" style={{ background: stat.bg }}>
                    <stat.icon size={20} color={stat.color} strokeWidth={2} />
                  </div>
                  <div className="dash-stat-card__trend">
                    <TrendingUp size={12} />
                    {stat.subValue.split(' ')[0]}
                  </div>
                </div>
                <p className="dash-stat-card__label">{stat.label}</p>
                <div className="dash-stat-card__value-row">
                  <h3 className="dash-stat-card__value">{stat.value}</h3>
                  {stat.unit && <span className="dash-stat-card__unit">{stat.unit}</span>}
                </div>
                <p className="dash-stat-card__sub">{stat.subValue}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="dash-grid">
            {/* Left Column */}
            <div className="dash-grid__left">
              {/* Rewards CTA */}
              <motion.div 
                className="dash-rewards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="dash-rewards__left">
                  <h4 className="dash-rewards__title">Exclusive Rewards</h4>
                  <p className="dash-rewards__desc">You're just 550 points away from your next premium badge.</p>
                  <div className="dash-rewards__actions">
                    <button className="dash-rewards__btn">Explore Shop</button>
                    <button className="dash-rewards__link">
                      View Milestones <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="dash-rewards__right">
                  <div className="dash-rewards__progress-card">
                    <div className="dash-rewards__progress-top">
                      <div>
                        <p className="dash-rewards__progress-label">Current Progress</p>
                        <p className="dash-rewards__progress-value">82%</p>
                      </div>
                      <Target size={24} className="dash-rewards__progress-icon" />
                    </div>
                    <div className="dash-rewards__progress-track">
                      <motion.div 
                        className="dash-rewards__progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: '82%' }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                  <div className="dash-rewards__glow"></div>
                </div>
              </motion.div>

              {/* Chart */}
              <motion.div 
                className="dash-chart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="dash-chart__header">
                  <div>
                    <h4 className="dash-chart__title">Recycling Analytics</h4>
                    <p className="dash-chart__subtitle">Weekly weight distribution</p>
                  </div>
                  <div className="dash-chart__period-btns">
                    {['W', 'M', 'Y'].map((t) => (
                      <button 
                        key={t} 
                        className={`dash-chart__period-btn ${chartPeriod === t ? 'dash-chart__period-btn--active' : ''}`}
                        onClick={() => setChartPeriod(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="dash-chart__bars">
                  {chartData.map((h, i) => (
                    <div key={i} className="dash-chart__bar-col">
                      <div className="dash-chart__bar-wrapper">
                        <motion.div 
                          className="dash-chart__bar"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="dash-chart__bar-glow"></div>
                        </motion.div>
                        <div className="dash-chart__tooltip">
                          {(h * 0.15).toFixed(1)}kg
                        </div>
                      </div>
                      <span className="dash-chart__bar-label">{chartDays[i]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="dash-grid__right">
              {/* Activity Log */}
              <motion.div 
                className="dash-activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="dash-activity__header">
                  <h4 className="dash-activity__title">Recent Activity</h4>
                  <button className="dash-activity__see-all">See All</button>
                </div>
                <div className="dash-activity__list">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="dash-activity__item">
                      <div className="dash-activity__icon" style={{ borderColor: `${act.color}30` }}>
                        <Trash2 size={16} color={act.color} />
                      </div>
                      <div className="dash-activity__info">
                        <div className="dash-activity__top-row">
                          <p className="dash-activity__type">{act.type}</p>
                          <span className="dash-activity__points" style={{ color: act.color }}>{act.points}</span>
                        </div>
                        <div className="dash-activity__meta">
                          <span><Clock size={10} /> {act.time}</span>
                          <span>•</span>
                          <span>{act.bin}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div 
                className="dash-leaderboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="dash-leaderboard__header">
                  <div className="dash-leaderboard__icon-wrap">
                    <Trophy size={18} color="#eab308" />
                  </div>
                  <h4 className="dash-leaderboard__title">Campus Rank</h4>
                </div>
                <div className="dash-leaderboard__list">
                  {leaderboard.map((u, i) => (
                    <div key={i} className="dash-leaderboard__item">
                      <div className="dash-leaderboard__rank" style={{ color: u.color }}>#{u.rank}</div>
                      <div className="dash-leaderboard__user-avatar">{u.name[0]}</div>
                      <span className="dash-leaderboard__user-name">{u.name}</span>
                      <span className="dash-leaderboard__user-pts">{u.points}</span>
                    </div>
                  ))}
                </div>
                <button className="dash-leaderboard__cta">Join Competitive League</button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
