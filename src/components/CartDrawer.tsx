import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Check, 
  Tag, 
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, BrandConfig } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: BrandConfig;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  config,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  
  // Checkout Modal State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  if (!isOpen) return null;

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const isFreeShipping = subtotal >= config.freeShippingThreshold || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 149;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountToFreeShipping = Math.max(0, config.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / config.freeShippingThreshold) * 100));

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    if (code === 'FIRST500') {
      const discount = Math.min(500, subtotal);
      setAppliedDiscount({ code: 'FIRST500', amount: discount });
      setCouponCode('');
    } else if (code === 'DENIM15') {
      const discount = Math.round(subtotal * 0.15);
      setAppliedDiscount({ code: 'DENIM15', amount: discount });
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', amount: shippingCost });
      setCouponCode('');
    } else {
      setCouponError('Invalid promo code. Try FIRST500 or DENIM15');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your shipping details.');
      return;
    }

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setOrderPlaced(true);
  };

  const handleFinishOrder = () => {
    setOrderPlaced(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              YOUR DENIM BAG ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button 
            id="close-cart-drawer-btn"
            onClick={onClose} 
            className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-stone-100 p-3 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
            <span className="flex items-center">
              <Truck className="w-3.5 h-3.5 mr-1 text-red-600" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-extrabold">🎉 You've unlocked FREE Express Shipping!</span>
              ) : (
                <span>Add {config.currencySymbol}{amountToFreeShipping.toLocaleString()} more for <strong>FREE Shipping</strong></span>
              )}
            </span>
            <span className="text-[11px] text-stone-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${freeShippingProgress}%`,
                backgroundColor: isFreeShipping ? '#059669' : config.primaryColor 
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="py-3 flex space-x-3 group">
                <img
                  src={item.selectedColor.image}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-xs border border-stone-200 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-black uppercase text-stone-900 leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>
                      <div>Size: <strong className="text-stone-800">{item.selectedSize}</strong></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 rounded-xs bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-black text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price Total */}
                    <div className="text-xs font-black text-stone-900">
                      {config.currencySymbol}{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-sm font-black uppercase text-stone-800">Your bag is empty</h3>
              <p className="text-xs text-stone-500 mt-1">Explore our iconic 501® Straight and slim fits to get started.</p>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-black uppercase tracking-wider rounded-xs hover:bg-stone-800"
              >
                Shop Iconic Denim
              </button>
            </div>
          )}
        </div>

        {/* Promo Code & Summary Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Promo Code Box */}
            <div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. FIRST500)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 text-xs p-2 uppercase font-bold bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-black"
                />
                <button
                  onClick={() => handleApplyCoupon()}
                  className="px-3 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black"
                >
                  Apply
                </button>
              </div>

              {couponError && <p className="text-[11px] text-red-600 mt-1 font-semibold">{couponError}</p>}
              
              {appliedDiscount && (
                <div className="mt-1 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-xs border border-emerald-200">
                  <span className="flex items-center font-bold">
                    <Tag className="w-3 h-3 mr-1" /> Coupon '{appliedDiscount.code}' Applied
                  </span>
                  <span className="font-black">-{config.currencySymbol}{appliedDiscount.amount.toLocaleString()}</span>
                </div>
              )}

              {/* Quick Coupon Suggestions */}
              {!appliedDiscount && (
                <div className="mt-1.5 flex items-center space-x-1.5 text-[10px]">
                  <span className="text-stone-400 font-bold">Quick Codes:</span>
                  <button 
                    onClick={() => handleApplyCoupon('FIRST500')} 
                    className="underline text-stone-700 hover:text-black font-semibold"
                  >
                    FIRST500 (₹500 OFF)
                  </button>
                  <span className="text-stone-300">•</span>
                  <button 
                    onClick={() => handleApplyCoupon('DENIM15')} 
                    className="underline text-stone-700 hover:text-black font-semibold"
                  >
                    DENIM15 (15% OFF)
                  </button>
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{config.currencySymbol}{subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-bold">-{config.currencySymbol}{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : `${config.currencySymbol}${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Amount</span>
                <span>{config.currencySymbol}{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
              style={{ backgroundColor: config.primaryColor }}
            >
              <span>PROCEED TO CHECKOUT • {config.currencySymbol}{grandTotal.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Checkout Modal Simulation */}
        {isCheckingOut && (
          <div className="absolute inset-0 bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-bottom-5 duration-200">
            {!orderPlaced ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="text-sm font-black uppercase text-stone-900">
                      SECURE CHECKOUT
                    </h3>
                    <button type="button" onClick={() => setIsCheckingOut(false)} className="text-stone-400 hover:text-black">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Delivery Address Form */}
                  <div className="mt-4 space-y-2.5 text-xs">
                    <span className="text-[11px] font-black uppercase text-stone-500 block">Shipping Address</span>
                    
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded-xs font-medium"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Mobile Number (10 digits) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded-xs font-medium"
                      required
                    />

                    <textarea
                      placeholder="Flat, House No., Building, Street *"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      rows={2}
                      className="w-full p-2 border border-stone-300 rounded-xs font-medium"
                      required
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City *"
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="p-2 border border-stone-300 rounded-xs font-medium"
                        required
                      />
                      <input
                        type="text"
                        placeholder="PIN Code *"
                        value={customerPincode}
                        onChange={(e) => setCustomerPincode(e.target.value)}
                        className="p-2 border border-stone-300 rounded-xs font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-5 space-y-2 text-xs">
                    <span className="text-[11px] font-black uppercase text-stone-500 block">Select Payment Mode</span>
                    
                    <div className="space-y-1.5">
                      <label className={`flex items-center justify-between p-2.5 border rounded-xs cursor-pointer ${paymentMethod === 'upi' ? 'border-black bg-stone-50 font-bold' : 'border-stone-200'}`}>
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="pay" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                          <Smartphone className="w-4 h-4 text-purple-600" />
                          <span>UPI / Google Pay / PhonePe</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 font-bold">Fastest</span>
                      </label>

                      <label className={`flex items-center justify-between p-2.5 border rounded-xs cursor-pointer ${paymentMethod === 'card' ? 'border-black bg-stone-50 font-bold' : 'border-stone-200'}`}>
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Credit / Debit Card</span>
                        </div>
                      </label>

                      <label className={`flex items-center justify-between p-2.5 border rounded-xs cursor-pointer ${paymentMethod === 'cod' ? 'border-black bg-stone-50 font-bold' : 'border-stone-200'}`}>
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                          <Building className="w-4 h-4 text-amber-700" />
                          <span>Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-200">
                  <div className="flex justify-between text-xs font-bold text-stone-600 mb-2">
                    <span>Payable Total:</span>
                    <span className="text-base font-black text-stone-900">{config.currencySymbol}{grandTotal.toLocaleString()}</span>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    CONFIRM & PLACE ORDER
                  </button>
                </div>
              </form>
            ) : (
              /* Order Placed Success Screen */
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">
                  ORDER CONFIRMED
                </span>
                
                <h3 className="text-xl font-black uppercase text-stone-900 mb-2">
                  Thank You, {customerName || 'Denim Lover'}!
                </h3>
                
                <p className="text-xs text-stone-600 max-w-xs mb-4">
                  Your authentic denim order <strong className="text-black">#LEV-{Math.floor(100000 + Math.random() * 900000)}</strong> has been received and is being prepared for dispatch.
                </p>

                <div className="bg-stone-50 p-3 rounded-xs border border-stone-200 text-left text-xs w-full max-w-xs mb-6 space-y-1 text-stone-700">
                  <div><strong>Ship To:</strong> {customerAddress}, {customerCity} - {customerPincode}</div>
                  <div><strong>Total Paid:</strong> {config.currencySymbol}{grandTotal.toLocaleString()} ({paymentMethod.toUpperCase()})</div>
                  <div><strong>Est. Delivery:</strong> 3-4 Business Days</div>
                </div>

                <button
                  onClick={handleFinishOrder}
                  className="px-6 py-3 bg-stone-900 text-white text-xs font-black uppercase tracking-wider rounded-xs hover:bg-black"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
