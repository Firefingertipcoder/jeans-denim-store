import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Sliders, 
  LogOut, 
  Sparkles, 
  Check, 
  Truck, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { BrandConfig, UserProfile, ShippingAddress, DenimFit } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  config: BrandConfig;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onShowToast: (message: string) => void;
  onOpenFitGuide: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  config,
  onUpdateUser,
  onLogout,
  onShowToast,
  onOpenFitGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'preferences'>('orders');

  // Edit Profile form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editGender, setEditGender] = useState(user?.gender || 'Men');
  const [editFavoriteFit, setEditFavoriteFit] = useState<DenimFit>(user?.favoriteFit || 'Baggy & Skater');
  const [editWaistSize, setEditWaistSize] = useState(user?.defaultWaistSize || '32x32');

  // Address modal / form state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrFullName, setNewAddrFullName] = useState(user?.name || '');
  const [newAddrPhone, setNewAddrPhone] = useState(user?.phone || '');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');

  if (!isOpen || !user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: editName.trim() || user.name,
      phone: editPhone.trim() || undefined,
      gender: editGender as any,
      favoriteFit: editFavoriteFit,
      defaultWaistSize: editWaistSize,
    };
    onUpdateUser(updated);
    onShowToast('Profile details updated successfully!');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrCity || !newAddrPincode) {
      alert('Please fill out all address fields.');
      return;
    }

    const newAddress: ShippingAddress = {
      fullName: newAddrFullName || user.name,
      phone: newAddrPhone || user.phone || '',
      street: newAddrStreet,
      city: newAddrCity,
      state: newAddrState || 'Maharashtra',
      pincode: newAddrPincode,
      isDefault: user.savedAddresses.length === 0,
    };

    const updated: UserProfile = {
      ...user,
      savedAddresses: [...user.savedAddresses, newAddress],
    };

    onUpdateUser(updated);
    setIsAddingAddress(false);
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrPincode('');
    onShowToast('New delivery address saved!');
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = user.savedAddresses.filter((_, i) => i !== index);
    const updated: UserProfile = {
      ...user,
      savedAddresses: updatedAddresses,
    };
    onUpdateUser(updated);
    onShowToast('Address removed.');
  };

  const handleSetDefaultAddress = (index: number) => {
    const updatedAddresses = user.savedAddresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    const updated: UserProfile = {
      ...user,
      savedAddresses: updatedAddresses,
    };
    onUpdateUser(updated);
    onShowToast('Default delivery address updated.');
  };

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div id="user-profile-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="user-profile-modal-container" 
        className="relative w-full max-w-2xl bg-white border border-gray-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header */}
        <div className="bg-black text-white p-4 sm:p-6 relative flex-shrink-0">
          <button
            id="close-user-profile-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              {/* Avatar circle */}
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white text-xl font-black border-2 border-white/20 shadow-md flex-shrink-0"
                style={{ backgroundColor: config.primaryColor }}
              >
                {userInitial}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                    {user.name}
                  </h2>
                  <span className="bg-[#CCFF00] text-black text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider">
                    {user.tier || 'MEMBER'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                  <span>Joined {user.joinedDate}</span>
                  <span>•</span>
                  <span className="text-[#CCFF00] font-black">{user.points || 0} Reward Points</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-gray-900 hover:bg-[#E11D48] text-gray-300 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors border border-gray-800 self-start sm:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 flex-shrink-0 overflow-x-auto scrollbar-none">
          <button
            id="tab-user-orders"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({user.orders?.length || 0})</span>
          </button>

          <button
            id="tab-user-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details</span>
          </button>

          <button
            id="tab-user-addresses"
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'addresses'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Addresses ({user.savedAddresses?.length || 0})</span>
          </button>

          <button
            id="tab-user-preferences"
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              activeTab === 'preferences'
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Fit & Sizing</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white space-y-4">
          {/* 1. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                  YOUR RECENT ORDERS & SHIPMENTS
                </h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  15-Day Hassle-Free Returns
                </span>
              </div>

              {user.orders && user.orders.length > 0 ? (
                <div className="space-y-3">
                  {user.orders.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-gray-200 p-4 hover:border-gray-400 transition-colors bg-[#FAFAFA]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Order ID</span>
                          <strong className="font-black text-black">{order.orderNumber}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Placed On</span>
                          <span className="font-bold text-gray-700">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Amount</span>
                          <strong className="font-black text-black">{config.currencySymbol}{order.total.toLocaleString()}</strong>
                        </div>
                        <div>
                          <span 
                            className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest inline-flex items-center space-x-1 ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <Truck className="w-3 h-3" />
                            <span>{order.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Items List in this order */}
                      <div className="py-3 space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-xs">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-12 h-14 object-cover border border-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-black uppercase truncate">{item.productName}</h4>
                              <p className="text-[10px] text-gray-500 font-bold uppercase">
                                Size: {item.size} • Color: {item.colorName} • Qty: {item.quantity}
                              </p>
                              <div className="font-black text-black mt-0.5">
                                {config.currencySymbol}{item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        <span>Payment: {order.paymentMethod}</span>
                        <button 
                          onClick={() => onShowToast(`Tracking #${order.trackingNumber || 'FRK-9821'}: Out for delivery via BlueDart.`)}
                          className="text-black font-black hover:text-[#E11D48] transition-colors underline"
                        >
                          Track Package &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-gray-50 border border-dashed border-gray-200 p-6">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h4 className="text-sm font-black uppercase text-gray-700">No Orders Yet</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    You haven't placed any orders with this account yet. Explore the iconic denim collection!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. PROFILE DETAILS TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                PERSONAL INFORMATION
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-xs text-black font-bold focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Email Address (Immutable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full p-2.5 bg-gray-100 border border-gray-200 text-xs text-gray-500 font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-xs text-black font-bold focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                    Primary Department
                  </label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-xs text-black font-bold focus:outline-none focus:border-black"
                  >
                    <option value="Men">Men's Fits</option>
                    <option value="Women">Women's Fits</option>
                    <option value="Unisex">Streetwear / Unisex</option>
                  </select>
                </div>
              </div>

              {/* Membership Privilege Box */}
              <div className="p-4 bg-black text-white border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#CCFF00] tracking-widest block">
                    TIER STATUS: {user.tier || 'DENIM VIP ICON'}
                  </span>
                  <div className="text-sm font-black uppercase mt-0.5">
                    {user.points || 0} Freakins Reward Points
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    1 Point = ₹1 Discount on future denim drops.
                  </p>
                </div>
                <Award className="w-8 h-8 text-[#CCFF00]" />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-[#CCFF00]" />
                  <span>SAVE CHANGES</span>
                </button>
              </div>
            </form>
          )}

          {/* 3. ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                  SAVED SHIPPING ADDRESSES
                </h3>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-black hover:text-[#E11D48]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="p-4 bg-gray-50 border border-gray-300 space-y-3">
                  <h4 className="text-xs font-black uppercase text-black">New Delivery Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={newAddrFullName}
                      onChange={(e) => setNewAddrFullName(e.target.value)}
                      className="p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Contact Phone *"
                      required
                      value={newAddrPhone}
                      onChange={(e) => setNewAddrPhone(e.target.value)}
                      className="p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="House/Flat No, Street, Landmark *"
                    required
                    value={newAddrStreet}
                    onChange={(e) => setNewAddrStreet(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City *"
                      required
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddrState}
                      onChange={(e) => setNewAddrState(e.target.value)}
                      className="p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      required
                      value={newAddrPincode}
                      onChange={(e) => setNewAddrPincode(e.target.value)}
                      className="p-2 bg-white border border-gray-300 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 text-[10px] font-black uppercase text-gray-500 hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              {user.savedAddresses && user.savedAddresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.savedAddresses.map((addr, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 border relative transition-colors ${
                        addr.isDefault ? 'border-black bg-white shadow-xs' : 'border-gray-200 bg-[#FAFAFA]'
                      }`}
                    >
                      {addr.isDefault && (
                        <span className="absolute top-3 right-3 bg-black text-white text-[8px] font-black uppercase px-1.5 py-0.5 tracking-wider">
                          DEFAULT
                        </span>
                      )}
                      <h5 className="text-xs font-black uppercase text-black">{addr.fullName}</h5>
                      <p className="text-[11px] text-gray-600 mt-1 font-medium leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold mt-1">Phone: {addr.phone}</p>

                      <div className="flex items-center space-x-3 pt-3 mt-2 border-t border-gray-100 text-[10px] font-black uppercase tracking-wider">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(idx)}
                            className="text-black hover:text-[#E11D48]"
                          >
                            Set As Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(idx)}
                          className="text-rose-600 hover:text-rose-800 ml-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-gray-50 border border-dashed border-gray-200 p-4">
                  <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">No saved shipping addresses yet.</p>
                </div>
              )}
            </div>
          )}

          {/* 4. FIT & SIZING PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
                  YOUR SIZING & FIT PROFILE
                </h3>
                <button
                  onClick={onOpenFitGuide}
                  className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] hover:underline"
                >
                  Open Interactive Fit Guide &rarr;
                </button>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                      Preferred Waist & Inseam
                    </label>
                    <select
                      value={editWaistSize}
                      onChange={(e) => setEditWaistSize(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-300 text-xs text-black font-bold focus:outline-none"
                    >
                      {['28x30', '30x30', '30x32', '32x32', '34x32', '36x32', '38x34'].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                      Preferred Denim Fit
                    </label>
                    <select
                      value={editFavoriteFit}
                      onChange={(e) => setEditFavoriteFit(e.target.value as any)}
                      className="w-full p-2 bg-white border border-gray-300 text-xs text-black font-bold focus:outline-none"
                    >
                      <option value="Baggy & Skater">Baggy & Skater</option>
                      <option value="Cargo & Parachute">Cargo & Parachute</option>
                      <option value="Korean Wide Leg">Korean Wide Leg</option>
                      <option value="Straight">501® Straight</option>
                      <option value="Slim">511™ Slim</option>
                      <option value="Bootcut & Flare">70s Flare</option>
                      <option value="Corset & Tops">Corset & Tops</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>

              {/* Personalized recommendation prompt */}
              <div className="p-4 bg-[#FAFAFA] border border-gray-200 flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div className="text-xs text-gray-700">
                  <strong className="block uppercase font-black text-black text-[11px]">Personalized Fit Matching</strong>
                  Based on your preferences, we highlight <strong>{editFavoriteFit}</strong> in size <strong>{editWaistSize}</strong> across catalog filters.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
