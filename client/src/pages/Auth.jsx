import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, RefreshCw, Weight, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ erpId: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        setIsLogin(true);
        setFormData({ erpId: '', password: '', name: '' });
        alert('Account created successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Ambient Glow Effects */}
      <div className="auth-glow auth-glow--top"></div>
      <div className="auth-glow auth-glow--bottom"></div>

      <div className="auth-layout">
        {/* Left Side: Branding */}
        <motion.div 
          className="auth-branding"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="auth-badge">
            <span className="auth-badge__dot"></span>
            NEXT-GEN WASTE TECH : TRASH TO TREASURE 1.0
          </div>

          <h1 className="auth-title">
            Trash to<br />
            <span className="auth-title--dim">Treasure.</span>
          </h1>

          <p className="auth-subtitle">
            Harness the power of advanced IoT to transform waste management 
            with precision. Detect, weigh, categorize and earn rewards — 
            making sustainability effortless and rewarding.
          </p>

          <div className="auth-features">
            <motion.div 
              className="auth-feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="auth-feature-card__icon">
                <Weight size={16} />
              </div>
              <div>
                <h4 className="auth-feature-card__title">SMART WEIGHT SENSING</h4>
                <p className="auth-feature-card__desc">
                  Get tailored waste categorization & weight measurements in milliseconds.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="auth-feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <div className="auth-feature-card__icon">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="auth-feature-card__title">SECURE & PRIVATE</h4>
                <p className="auth-feature-card__desc">
                  Your data is protected by industry-leading security.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Auth Form */}
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="auth-form__heading">WELCOME BACK.</h2>
          <p className="auth-form__subheading">
            Sign in to continue your recycling journey.
          </p>

          {/* Toggle Tabs */}
          <div className="auth-toggle">
            <button 
              className={`auth-toggle__btn ${isLogin ? 'auth-toggle__btn--active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              SIGN IN
            </button>
            <button 
              className={`auth-toggle__btn ${!isLogin ? 'auth-toggle__btn--active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="auth-input-wrapper"
                >
                  <div className="auth-input-group">
                    <User className="auth-input-group__icon" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="auth-input-group">
              <Mail className="auth-input-group__icon" size={18} />
              <input
                type="text"
                placeholder="ERP ID"
                required
                value={formData.erpId}
                onChange={(e) => setFormData({ ...formData, erpId: e.target.value })}
              />
            </div>

            <div className="auth-input-group">
              <Lock className="auth-input-group__icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                type="button" 
                className="auth-input-group__eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {isLogin && (
              <div className="auth-forgot">
                <button type="button" className="auth-forgot__link">
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <RefreshCw className="auth-spinner" size={18} />
              ) : (
                <>
                  {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>Want to use Google instead?</span>
            </div>

            <div className="auth-google-row">
              <button type="button" className="auth-google-btn">
                <RefreshCw size={14} className="auth-google-btn__icon" />
                Flip to Google
              </button>
            </div>

            <p className="auth-switch-text">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="auth-switch-text__link"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>

          {error && (
            <motion.div 
              className="auth-error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
