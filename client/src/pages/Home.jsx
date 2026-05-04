import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Recycle,
  Weight,
  Leaf,
  ChevronRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import '../styles/Home.css';

const POLYTHENE_COLORS = [
  { 
    name: 'Green', 
    color: '#22c55e', 
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    glow: 'rgba(34, 197, 94, 0.3)',
    label: 'Biodegradable Waste',
    desc: 'Food scraps, garden waste, organic materials'
  },
  { 
    name: 'Yellow', 
    color: '#eab308', 
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
    glow: 'rgba(234, 179, 8, 0.3)',
    label: 'Recyclable Waste',
    desc: 'Paper, cardboard, clean plastics'
  },
  { 
    name: 'Blue', 
    color: '#3b82f6', 
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    glow: 'rgba(59, 130, 246, 0.3)',
    label: 'Dry Waste',
    desc: 'Metal, glass, textiles, multi-layer packaging'
  },
  { 
    name: 'Black', 
    color: '#71717a', 
    gradient: 'linear-gradient(135deg, #52525b, #27272a)',
    glow: 'rgba(113, 113, 122, 0.3)',
    label: 'Non-Recyclable Waste',
    desc: 'Sanitary waste, diapers, hazardous items'
  },
];

const Home = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [placed, setPlaced] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handlePlaceBag = () => {
    setPlaced(true);
    // Simulate processing
    setTimeout(() => {
      // Could connect to hardware / API here
    }, 2000);
  };

  const handleReset = () => {
    setSelectedColor(null);
    setPlaced(false);
  };

  return (
    <div className="home-page">
      {/* Background glows */}
      <div className="home-glow home-glow--1"></div>
      <div className="home-glow home-glow--2"></div>

      {/* 3D Background Model */}
      <div className="home-3d-bg">
        <iframe 
          title="Subway Dustbin" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          src="https://sketchfab.com/models/39a354855bac49ff9a8396acad637dfc/embed?autostart=1&autospin=0.5&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0"
        ></iframe>
      </div>

      {/* Top Nav Bar */}
      <header className="home-header">
        <div className="home-header__brand">
          <div className="home-header__logo">
            <Recycle size={22} />
          </div>
          <div>
            <h1 className="home-header__title">Trash to Treasure</h1>
            <p className="home-header__sub">NSSM Smart Systems</p>
          </div>
        </div>
        <div className="home-header__actions">
          <button className="home-header__nav-btn" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <div className="home-header__user">
            <div className="home-header__avatar">
              {user?.name?.[0] || 'U'}
            </div>
            <span className="home-header__name">{user?.name || 'Student'}</span>
          </div>
          <button 
            className="home-header__logout"
            onClick={() => { localStorage.clear(); window.location.href = '/auth'; }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <motion.div 
          className="home-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="home-hero__badge">
            <Leaf size={14} />
            WASTE CATEGORIZATION
          </div>
          <h2 className="home-hero__title">
            Choose your <span className="home-hero__title--accent">Color</span> of Polythene
          </h2>
          <p className="home-hero__desc">
            Select the color that matches your polythene bag to begin the recycling process.
          </p>
        </motion.div>

        {/* Color Selection Grid */}
        <motion.div 
          className="color-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {POLYTHENE_COLORS.map((item, index) => (
            <motion.button
              key={item.name}
              className={`color-card ${selectedColor?.name === item.name ? 'color-card--selected' : ''}`}
              onClick={() => { setSelectedColor(item); setPlaced(false); }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              style={{
                '--card-color': item.color,
                '--card-glow': item.glow,
              }}
            >
              <div className="color-card__swatch" style={{ background: item.gradient }}>
                {selectedColor?.name === item.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="color-card__check"
                  >
                    <CheckCircle2 size={28} />
                  </motion.div>
                )}
              </div>
              <div className="color-card__info">
                <h3 className="color-card__name">{item.name}</h3>
                <p className="color-card__label">{item.label}</p>
                <p className="color-card__desc">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Place Bag Section — appears after color selection */}
        <AnimatePresence>
          {selectedColor && !placed && (
            <motion.div 
              className="place-section"
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="place-card" style={{ '--card-color': selectedColor.color, '--card-glow': selectedColor.glow }}>
                <div className="place-card__icon" style={{ background: selectedColor.gradient }}>
                  <Package size={32} color="#fff" />
                </div>
                <div className="place-card__content">
                  <h3 className="place-card__title">
                    Place your <span style={{ color: selectedColor.color }}>{selectedColor.name}</span> Polythene Bags
                  </h3>
                  <p className="place-card__desc">
                    You've selected <strong>{selectedColor.label}</strong>. Place your polythene bag on the sensor pad and press the button below.
                  </p>
                  <button className="place-card__btn" onClick={handlePlaceBag} style={{ background: selectedColor.gradient }}>
                    Place Polythene Bag
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Weight Warning Note */}
              <div className="weight-note">
                <div className="weight-note__icon">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="weight-note__title">Weight Limit Notice</p>
                  <p className="weight-note__text">Weight should not exceed <strong>2.5 kgs</strong>. Bags exceeding this limit will be rejected by the system.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {placed && (
            <motion.div 
              className="success-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-card" style={{ '--card-color': selectedColor.color, '--card-glow': selectedColor.glow }}>
                <motion.div 
                  className="success-card__check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  style={{ background: selectedColor.gradient }}
                >
                  <CheckCircle2 size={40} color="#fff" />
                </motion.div>
                <h3 className="success-card__title">Bag Placed Successfully!</h3>
                <p className="success-card__desc">
                  Your <span style={{ color: selectedColor.color }}>{selectedColor.name}</span> polythene bag has been registered. 
                  The system is now weighing and processing your waste.
                </p>
                <div className="success-card__actions">
                  <button className="success-card__btn-primary" onClick={handleReset} style={{ background: selectedColor.gradient }}>
                    <Recycle size={16} />
                    Recycle Another
                  </button>
                  <button className="success-card__btn-secondary" onClick={() => navigate('/dashboard')}>
                    View Dashboard
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
