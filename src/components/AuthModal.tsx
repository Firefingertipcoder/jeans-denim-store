import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BrandConfig, UserProfile, DenimFit } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  initialMode?: 'login' | 'register';
  onLogin: (user: UserProfile) => void;
  onRegister: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    gender?: 'Men' | 'Women' | 'Unisex';
    favoriteFit?: DenimFit;
  }) => UserProfile | { error: string };
  onShowToast: (message: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  config,
  initialMode = 'login',
  onLogin,
  onRegister,
  onShowToast,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regPhone, setRegPhone] = useState('');
  const [regGender, setRegGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');
  const [regFavoriteFit, setRegFavoriteFit] = useState<DenimFit>('Baggy & Skater');
  
  // UI states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Retrieve registered users from localStorage
    setTimeout(() => {
      try {
        const storedUsersRaw = localStorage.getItem('denim_store_registered_users');
        const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        
        const matched = users.find(
          (u) => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
        );

        if (matched) {
          onLogin(matched);
          onShowToast(`Welcome back, ${matched.name.split(' ')[0]}!`);
          onClose();
        } else {
          // Check if email exists but wrong password
          const emailExists = users.some(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
          if (emailExists) {
            setErrorMessage('Invalid password. Please check your credentials.');
          } else {
            // Auto login for quick test if not in list
            const newUser: UserProfile = {
              id: 'user_' + Date.now(),
              name: loginEmail.split('@')[0].toUpperCase(),
              email: loginEmail.trim(),
              password: loginPassword,
              joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              tier: 'SILVER ARCHIVIST',
              points: 150,
              favoriteFit: 'Baggy & Skater',
              savedAddresses: [],
              orders: []
            };
            const updatedUsers = [...users, newUser];
            localStorage.setItem('denim_store_registered_users', JSON.stringify(updatedUsers));
            onLogin(newUser);
            onShowToast(`Account created & signed in as ${newUser.name}!`);
            onClose();
          }
        }
      } catch (err) {
        setErrorMessage('Failed to sign in. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = onRegister({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        phone: regPhone.trim() || undefined,
        gender: regGender,
        favoriteFit: regFavoriteFit,
      });

      setIsLoading(false);

      if ('error' in result) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('Account created successfully! Signing you in...');
        setTimeout(() => {
          onLogin(result);
          onShowToast(`Welcome to ${config.brandName || 'FREAKINS'}, ${result.name.split(' ')[0]}!`);
          onClose();
        }, 500);
      }
    }, 350);
  };

  const handleOneClickDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 'demo_user_vip',
      name: 'Sujal Dornal',
      email: 'sujaldornal270506@gmail.com',
      phone: '+91 98765 43210',
      gender: 'Men',
      joinedDate: 'Aug 2024',
      tier: 'DENIM VIP ICON',
      points: 850,
      favoriteFit: 'Cargo & Parachute',
      defaultWaistSize: '32x32',
      savedAddresses: [
        {
          fullName: 'Sujal Dornal',
          phone: '+91 98765 43210',
          street: 'Flat 402, Skyline Residency, Link Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400053',
          isDefault: true,
        }
      ],
      orders: [
        {
          id: 'ord_98213',
          orderNumber: 'FRK-2026-98213',
          date: '14 Aug 2026',
          status: 'Delivered',
          total: 3998,
          discount: 500,
          paymentMethod: 'UPI (GPay)',
          trackingNumber: 'DEL-88219412',
          estimatedDelivery: '17 Aug 2026',
          shippingAddress: {
            fullName: 'Sujal Dornal',
            phone: '+91 98765 43210',
            street: 'Flat 402, Skyline Residency, Link Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400053',
          },
          items: [
            {
              productId: 'fk-1',
              productName: 'Baggy Skater Jeans in Raw Indigo',
              size: '32x32',
              colorName: 'Raw Dark Indigo',
              price: 2499,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop',
            },
            {
              productId: 'fk-2',
              productName: 'Tactical Multi-Pocket Denim Cargos',
              size: '32x32',
              colorName: 'Washed Charcoal Grey',
              price: 1999,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
            }
          ]
        }
      ]
    };

    onLogin(demoUser);
    onShowToast(`Signed in as VIP Member (${demoUser.name})!`);
    onClose();
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="auth-modal-container" 
        className="relative w-full max-w-md bg-white border border-gray-100 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Banner */}
        <div className="bg-black text-white p-5 sm:p-6 relative">
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-1.5">
            <span 
              className="text-white text-[9px] font-black uppercase px-2 py-0.5 tracking-widest"
              style={{ backgroundColor: config.primaryColor }}
            >
              MEMBERSHIP CLUB
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {config.brandName || 'FREAKINS'} ARCHIVE
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            {mode === 'login' ? 'SIGN IN TO YOUR ACCOUNT' : 'CREATE YOUR PROFILE'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {mode === 'login' 
              ? 'Access orders, track shipments & redeem exclusive drops.' 
              : 'Join the club to get ₹500 off your first order & free returns.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            id="tab-auth-login"
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest text-center transition-all ${
              mode === 'login'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            SIGN IN
          </button>
          <button
            id="tab-auth-register"
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest text-center transition-all ${
              mode === 'register'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            NEW MEMBER
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Error / Success Alerts */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-[#E11D48] text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => onShowToast('Password reset link sent to your registered email.')}
                    className="text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-wider underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password-input"
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-black rounded-xs"
                  />
                  <span className="text-[11px] font-medium">Remember my session</span>
                </label>
              </div>

              <button
                id="submit-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Fast Demo Login for instant testing */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleOneClickDemoLogin}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center space-x-1.5 border border-gray-200"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-CLICK DEMO LOGIN (VIP ACCOUNT)</span>
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-email-input"
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="alex@domain.com"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-phone-input"
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                  Create Password * (min 4 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-password-input"
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-300 text-xs text-black font-medium focus:bg-white focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Department
                  </label>
                  <select
                    value={regGender}
                    onChange={(e) => setRegGender(e.target.value as any)}
                    className="w-full py-2 px-2 bg-gray-50 border border-gray-300 text-xs text-black font-bold focus:outline-none"
                  >
                    <option value="Men">Men's Fits</option>
                    <option value="Women">Women's Fits</option>
                    <option value="Unisex">Streetwear / All</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Favorite Fit
                  </label>
                  <select
                    value={regFavoriteFit}
                    onChange={(e) => setRegFavoriteFit(e.target.value as any)}
                    className="w-full py-2 px-2 bg-gray-50 border border-gray-300 text-xs text-black font-bold focus:outline-none"
                  >
                    <option value="Baggy & Skater">Baggy & Skater</option>
                    <option value="Cargo & Parachute">Cargo & Parachute</option>
                    <option value="Korean Wide Leg">Korean Wide Leg</option>
                    <option value="Straight">501® Straight</option>
                    <option value="Slim">511™ Slim</option>
                    <option value="Bootcut & Flare">70s Flare</option>
                  </select>
                </div>
              </div>

              <div className="p-2.5 bg-[#F9F9F9] border border-gray-200 text-[10px] text-gray-600 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  By creating an account, you receive <strong>100 Bonus Rewards Points</strong> and unlock early access to new collection drops.
                </span>
              </div>

              <button
                id="submit-register-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'CREATING ACCOUNT...' : 'JOIN FREAKINS ARCHIVE'}</span>
                <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
