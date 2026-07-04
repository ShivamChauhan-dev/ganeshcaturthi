"use client";

import React, { useState, useEffect } from "react";

// Import modular UI components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MantraTicker from "./components/MantraTicker";
import About from "./components/About";
import Collection from "./components/Collection";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

// Product Collection ID-based structure
interface MurtiItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  category: "all" | "eco" | "small" | "medium" | "large";
  image: string;
}

// Shopping Cart Item structure
interface CartItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  image: string;
  quantity: number;
  priceVal: number;
}

const MURTI_COLLECTION: MurtiItem[] = [
  { id: "m1", category: "medium", image: "/collection_ganesha_one.png" },
  { id: "m2", category: "eco", image: "/collection_ganesha_two.png" },
  { id: "m3", category: "large", image: "/collection_ganesha_one.png" },
  { id: "m4", category: "small", image: "/collection_ganesha_two.png" },
  { id: "m5", category: "medium", image: "/collection_ganesha_one.png" },
  { id: "m6", category: "large", image: "/collection_ganesha_two.png" }
];

// Price mapping for mathematical calculations
const PRICE_MAP = {
  m1: 4500,
  m2: 3500,
  m3: 12500,
  m4: 2200,
  m5: 6800,
  m6: 9500
};

// Bilingual translation dictionary
const T = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navCollection: "Collection",
    navGallery: "Gallery",
    navServices: "Services",
    navContact: "Contact Us",
    bookNow: "Book Now",
    
    heroBadge: "Ganesh Festival 2026",
    heroTitleHi: "Shree Ganesh",
    heroTitleSub: "Murti Bhandar",
    heroTitleEn: "Ganesh Chaturthi 2026",
    heroDesc: "Bappa's devotion, our tradition. Beautifully sculpted, 100% eco-friendly clay Ganesha idols, crafted with pure devotion.",
    heroCtaPrimary: "Book Your Murti",
    heroCtaSecondary: "View Collection",
    
    aboutSub: "About Us",
    aboutTitle: "Our Identity, Your Devotion",
    aboutDesc: "At Shree Ganesh Murti Bhandar, we have been crafting exceptionally beautiful and divine Ganesha idols for over 25 years. Our main goal is to protect nature while keeping our rich culture and tradition intact. This is why our skilled sculptors craft eco-friendly idols from natural clay (Shadu Mati), which completely dissolve in water after Visarjan. Our outstanding craftsmanship and dedication to quality are the foundations of your trust.",
    
    collectionSub: "Our Collection",
    collectionTitle: "Our Murti Collection",
    filterAll: "All Idols",
    filterEco: "Eco Friendly",
    filterSmall: "Small Size (1-2 Ft)",
    filterMedium: "Medium Size (2-4 Ft)",
    filterLarge: "Large Size (4+ Ft)",
    cardSize: "Size",
    cardPrice: "Price",
    cardBtn: "Add to Cart",
    customOrderBtn: "Order Custom Size",
    
    whySub: "Features",
    whyTitle: "Why Choose Us?",
    whyQualTitle: "Premium Quality",
    whyQualDesc: "Guaranteed attractive and beautiful designs using the finest craftsmanship and strong natural materials.",
    whyEcoTitle: "Eco Friendly",
    whyEcoDesc: "We use only natural clay and organic colors to ensure our aquatic life remains safe.",
    whyDelivTitle: "On-Time Delivery",
    whyDelivDesc: "Our guarantee to deliver idols safely and on time to your home or pandal location.",
    whyPriceTitle: "Fair Pricing",
    whyPriceDesc: "Transparent and fair budget-friendly pricing with high level of sculpting quality.",
    
    gallerySub: "Our Gallery",
    galleryTitle: "Moments & Glances",
    galleryMoreBtn: "Request More Details",
    
    servicesSub: "Our Services",
    servicesTitle: "What Services Do We Provide?",
    srvBookingTitle: "Easy Idol Booking",
    srvBookingDesc: "Book your favorite idol easily online or over the phone from the comfort of your home.",
    srvDelivTitle: "Safe Home Delivery",
    srvDelivDesc: "Our team delivers Bappa safely in specialized vehicles without any damage.",
    srvInstTitle: "Idol Installation Help",
    srvInstDesc: "Complete support in setting up the idol safely in your home or pandal.",
    srvVisarjanTitle: "Eco-Visarjan Guidance",
    srvVisarjanDesc: "Guidance on eco-friendly immersion in artificial ponds or at home in a planter.",
    srvContactBtn: "Contact Us",
    
    footerDesc: "For several years, we have been enhancing the beauty of your homes by crafting beautiful and environment-friendly Ganesha idols. Our aim is to establish a synergy of devotion and environmental protection.",
    footerLinks: "Quick Links",
    footerContact: "Contact Us",
    footerPhoneLabel: "Phone Number",
    footerWhatsappLabel: "WhatsApp Chat",
    footerAddressLabel: "Main Address",
    footerAddressVal: "Shree Ganesh Murti Bhandar, Main Road near Hanuman Temple, Mumbai, Maharashtra",
    footerCopyright: "© 2026 Shree Ganesh Murti Bhandar. All Rights Reserved.",
    footerDevBy: "Designed & Developed: Next.js Traditional Application",
    
    modalTitle: "Checkout Your Order",
    labelName: "Your Name *",
    labelPhone: "Phone Number (WhatsApp) *",
    labelDelivery: "Do you need home delivery? *",
    labelAddress: "Complete Delivery Address *",
    labelNotes: "Special Instructions / Custom Requests (Optional)",
    placeholderName: "Enter full name",
    placeholderPhone: "Enter mobile number",
    placeholderAddress: "Enter street, city, landmark, and pincode",
    placeholderNotes: "Any specific requirements (e.g. colors, throne style, etc.)",
    selectChoose: "Select...",
    deliveryNo: "No, I will pick it up myself",
    deliveryYes: "Yes, deliver to home / pandal",
    submitBtn: "Place Order",
    
    successHeading: "Order Submitted Successfully!",
    successText: "Thank you <strong>{name}</strong>! We have received your order. Our team will contact you shortly on <strong>{phone}</strong> to confirm your order details and token booking payment.",
    successBappa: "|| Ganpati Bappa Morya ||",
    successBtn: "Okay",
    
    cartTitle: "Your Cart",
    cartEmpty: "Your shopping cart is empty.",
    cartSubtotal: "Cart Subtotal",
    checkoutBtn: "Proceed to Checkout",
    wishlistBadge: "Wishlist",
    itemsCount: "items",
    
    checkoutSuccessMsg: "Order Confirmed!",
    orderIdLabel: "Order ID",
    deliveryOptionLabel: "Delivery Mode",
    deliveryOptionSelf: "Self Pickup",
    deliveryOptionHome: "Home Delivery",
    checkoutConfirmText: "Your order details have been saved. Below is your summary receipt:",
    
    products: {
      m1: { title: "Lalbaugcha Raja Style Grand Idol", size: "3 Feet", price: "₹4,500", priceVal: 4500, badge: "Most Popular" },
      m2: { title: "Dagdusheth Halwai Style Shadu Mati Idol", size: "2 Feet", price: "₹3,500", priceVal: 3500, badge: "100% Eco-Friendly" },
      m3: { title: "Chintamani Style Grand Ganesha", size: "5 Feet", price: "₹12,500", priceVal: 12500, badge: "Limited Collection" },
      m4: { title: "Traditional Siddhivinayak Bal Ganesha", size: "1.5 Feet", price: "₹2,200", priceVal: 2200, badge: "" },
      m5: { title: "Beautiful Peacock Throne Ganesha", size: "3.5 Feet", price: "₹6,800", priceVal: 6800, badge: "" },
      m6: { title: "Vighnaharta Raja Style Clay Idol", size: "4 Feet", price: "₹9,500", priceVal: 9500, badge: "Exquisite Carving" }
    },
    
    gallery: {
      img1: "Workshop - Our Idols Being Prepared",
      img2: "Lalbaug Style Ornamentation",
      img3: "Shadu Mati Natural Artwork",
      img4: "Decorated for Installation",
      img5: "Fine Clay Carving Artistry",
      img6: "Safe Transport Service"
    }
  },
  hi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navCollection: "मूर्ति संग्रह",
    navGallery: "गैलरी",
    navServices: "सेवाएँ",
    navContact: "संपर्क करें",
    bookNow: "बुक करें",
    
    heroBadge: "गणेश उत्सव 2026",
    heroTitleHi: "श्री गणेश",
    heroTitleSub: "मूर्ति भंडार",
    heroTitleEn: "Ganesh Chaturthi 2026",
    heroDesc: "बप्पा की भक्ति, हमारी परंपरा। सुंदर, नक्काशीदार एवं 100% पर्यावरण के अनुकूल (Eco-Friendly) मूर्तियों का निर्माण, सच्ची श्रद्धा के साथ।",
    heroCtaPrimary: "मूर्ति बुक करें",
    heroCtaSecondary: "संग्रह देखें",
    
    aboutSub: "हमारे बारे में",
    aboutTitle: "हमारी पहचान, आपकी श्रद्धा",
    aboutDesc: "श्री गणेश मूर्ति भंडार में हम पिछले 25 वर्षों से भी अधिक समय से बप्पा की अति सुंदर एवं दिव्य मूर्तियों का निर्माण कर रहे हैं। हमारा मुख्य उद्देश्य हमारी समृद्ध संस्कृति एवं परंपरा को अक्षुण्ण रखते हुए प्रकृति को सुरक्षित रखना है। इसीलिए हमारे कुशल मूर्तिकार मिट्टी (शाडू माटी) से पर्यावरण के अनुकूल (Eco-Friendly) प्रतिमाओं का निर्माण करते हैं, जो विसर्जन के पश्चात पूरी तरह से विलीन हो जाती हैं। हमारी उत्कृष्ट कारीगरी और अतूट गुणवत्ता ही आपकी सच्ची श्रद्धा का आधार है।",
    
    collectionSub: "हमारा मूर्ति संग्रह",
    collectionTitle: "हमारी मूर्ति संग्रह",
    filterAll: "सभी मूर्तियाँ",
    filterEco: "इको फ्रेंडली",
    filterSmall: "छोटे आकार (1-2 Ft)",
    filterMedium: "मध्यम आकार (2-4 Ft)",
    filterLarge: "बड़े आकार (4+ Ft)",
    cardSize: "आकार",
    cardPrice: "कीमत",
    cardBtn: "कार्ट में जोड़ें",
    customOrderBtn: "विशेष आकार ऑर्डर करें",
    
    whySub: "विशेषताएँ",
    whyTitle: "हमें क्यों चुनें?",
    whyQualTitle: "उत्तम गुणवत्ता",
    whyQualDesc: "बेहतरीन कारीगरी और मजबूत प्राकृतिक सामग्रियों का उपयोग करके आकर्षक और सुंदर डिजाइनों की गारंटी।",
    whyEcoTitle: "पर्यावरण अनुकूल",
    whyEcoDesc: "हम केवल शाडू माटी और प्राकृतिक रंगों का ही प्रयोग करते हैं ताकि हमारे जलीय जीव सुरक्षित रहें।",
    whyDelivTitle: "समय पर डिलीवरी",
    whyDelivDesc: "आपके निवास या पंडाल स्थल पर सुरक्षित एवं निर्धारित समय पर मूर्तियाँ पहुँचाने की हमारी गारंटी।",
    whyPriceTitle: "उचित मूल्य",
    whyPriceDesc: "उच्च स्तर की नक्काशी और गुणवत्ता के साथ बहुत ही पारदर्शी और उचित बजट अनुकूल दरें।",
    
    gallerySub: "हमारी गैलरी",
    galleryTitle: "हमारी झलकियाँ",
    galleryMoreBtn: "अधिक जानकारी प्राप्त करें",
    
    servicesSub: "हमारी सेवाएँ",
    servicesTitle: "हम क्या सेवाएँ देते हैं?",
    srvBookingTitle: "आसान मूर्ति बुकिंग",
    srvBookingDesc: "घर बैठे ही ऑनलाइन या फ़ोन के जरिए अपनी मनपसंद मूर्ति की बुकिंग कर सकते हैं।",
    srvDelivTitle: "सुरक्षित होम डिलीवरी",
    srvDelivDesc: "विशेष वाहनों में हमारी टीम बप्पा को बिना किसी नुकसान के आपके द्वार तक लाती है।",
    srvInstTitle: "मूर्ति स्थापना सेवा",
    srvInstDesc: "पंडालों एवं घरों में मूर्ति की सुंदर एवं सुरक्षित स्थापना में आवश्यक सहयोग प्रदान करना।",
    srvVisarjanTitle: "इको-फ्रेंडली विसर्जन मार्गदर्शन",
    srvVisarjanDesc: "कृत्रिम तालाबों या घर के भीतर ही सुंदर गमले में विसर्जन की व्यवस्था का मार्गदर्शन देना।",
    srvContactBtn: "संपर्क करें",
    
    footerDesc: "विगत कई वर्षों से हम बप्पा की सुंदर एवं पर्यावरण के अनुकूल मूर्तियों का निर्माण करके आपके घरों की शोभा बढ़ा रहे हैं। हमारा उद्देश्य श्रद्धा और पर्यावरण की रक्षा का संगम स्थापित करना है।",
    footerLinks: "त्वरित लिंक्स",
    footerContact: "हमसे संपर्क करें",
    footerPhoneLabel: "फ़ोन नंबर",
    footerWhatsappLabel: "व्हाट्सएप (WhatsApp)",
    footerAddressLabel: "मुख्य पता",
    footerAddressVal: "श्री गणेश मूर्ति भंडार, मेन रोड नियर हनुमान मंदिर, मुंबई, महाराष्ट्र",
    footerCopyright: "© 2026 श्री गणेश मूर्ति भंडार। सभी अधिकार सुरक्षित।",
    footerDevBy: "डिज़ाइन एवं विकसित: Next.js Traditional Application",
    
    modalTitle: "ऑर्डर सबमिट करें",
    labelName: "आपका नाम *",
    labelPhone: "मोबाइल नंबर (WhatsApp) *",
    labelDelivery: "क्या आपको होम डिलीवरी चाहिए? *",
    labelAddress: "डिलीवरी का पूरा पता *",
    labelNotes: "विशेष निर्देश या अन्य विवरण (वैकल्पिक)",
    placeholderName: "पूरा नाम दर्ज करें",
    placeholderPhone: "मोबाइल नंबर दर्ज करें",
    placeholderAddress: "गली, शहर, लैंडमार्क और पिनकोड दर्ज करें",
    placeholderNotes: "कोई विशिष्ट आवश्यकता (जैसे विशेष रंग, आसन आदि)",
    selectChoose: "चुनें...",
    deliveryNo: "नहीं, मैं खुद मूर्ति लेने आऊंगा",
    deliveryYes: "हाँ, पंडाल / निवास स्थल पर डिलीवरी चाहिए",
    submitBtn: "ऑर्डर सबमिट करें",
    
    successHeading: "ऑर्डर सफलतापूर्वक दर्ज हुआ!",
    successText: "धन्यवाद <strong>{name}</strong> जी! हमने आपका ऑर्डर प्राप्त कर लिया है। हमारी टीम जल्द ही आपसे आपके मोबाइल नंबर <strong>{phone}</strong> पर विवरण और बुकिंग राशि (Token money) की पुष्टि के लिए संपर्क करेगी।",
    successBappa: "॥ गणपति बप्पा मोरया ॥",
    successBtn: "ठीक है",
    
    cartTitle: "आपका कार्ट",
    cartEmpty: "आपका शॉपिंग कार्ट खाली है।",
    cartSubtotal: "कार्ट कुल योग",
    checkoutBtn: "चेकआउट करें",
    wishlistBadge: "इच्छा सूची",
    itemsCount: "मूर्तियां",
    
    checkoutSuccessMsg: "ऑर्डर की पुष्टि हो गई है!",
    orderIdLabel: "ऑर्डर आईडी",
    deliveryOptionLabel: "डिलीवरी का प्रकार",
    deliveryOptionSelf: "स्वयं पिकअप (हनुमान मंदिर रोड)",
    deliveryOptionHome: "होम डिलीवरी",
    checkoutConfirmText: "आपके ऑर्डर की जानकारी सहेज ली गई है। आपकी रसीद का विवरण नीचे है:",
    
    products: {
      m1: { title: "लालबाग राजा स्वरूप भव्य मूर्ती", size: "3 Feet", price: "₹4,500", priceVal: 4500, badge: "सर्वाधिक लोकप्रिय" },
      m2: { title: "दगड़ूशेठ हलवाई स्वरूप शाडू माटी मूर्ती", size: "2 Feet", price: "₹3,500", priceVal: 3500, badge: "100% इको-फ्रेंडली" },
      m3: { title: "भव्य चिंतामणि स्वरूप गणेश मूर्ती", size: "5 Feet", price: "₹12,500", priceVal: 12500, badge: "सीमित संग्रह" },
      m4: { title: "पारंपरिक सिद्धिविनायक बाल गणेश", size: "1.5 Feet", price: "₹2,200", priceVal: 2200, badge: "" },
      m5: { title: "सुंदर मयूर आसन गणेश मूर्ती", size: "3.5 Feet", price: "₹6,800", priceVal: 6800, badge: "" },
      m6: { title: "विघ्नहर्ता राजा स्वरूप मिट्टी मूर्ती", size: "4 Feet", price: "₹9,500", priceVal: 9500, badge: "विशिष्ट नक्काशी" }
    },
    
    gallery: {
      img1: "निर्माणशाला - हमारी मूर्तियाँ तैयार होते हुए",
      img2: "लालबाग स्वरूप शृंगार",
      img3: "शाडू माटी प्राकृतिक कलाकृति",
      img4: "स्थापना हेतु सुसज्जित",
      img5: "बारीक मिट्टी नक्काशी कला",
      img6: "सुरक्षित ट्रांसपोर्ट सेवा"
    }
  }
};

export default function Home() {
  // Language Switch State - Default English as requested
  const [lang, setLang] = useState<"en" | "hi">("en");
  
  // Mounted State to resolve Next.js SSR hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Mobile Nav Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Category Filtering State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // E-COMMERCE STATES
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    delivery: "no",
    address: "",
    notes: ""
  });
  const [orderId, setOrderId] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // E-commerce handlers
  const addToCart = (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6") => {
    setCart(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, image: MURTI_COLLECTION.find(m => m.id === id)!.image, quantity: 1, priceVal: PRICE_MAP[id] }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6", change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6") => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.priceVal * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Order Submit
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`G-2026-X${randomNum}`);
    setCheckoutSuccess(true);
  };

  // Close order completion dialog and reset cart
  const handleOrderSuccessClose = () => {
    setIsCheckoutOpen(false);
    setCheckoutSuccess(false);
    setCart([]); // Empty cart on successful order placement
    setFormData({
      name: "",
      phone: "",
      delivery: "no",
      address: "",
      notes: ""
    });
  };

  // Filtered Collection
  const filteredMurtis = activeCategory === "all" 
    ? MURTI_COLLECTION 
    : MURTI_COLLECTION.filter(item => item.category === activeCategory);

  return (
    <>
      <Navbar 
        lang={lang}
        setLang={setLang}
        wishlistCount={wishlist.length}
        cartItemsCount={getCartItemsCount()}
        setIsCartOpen={setIsCartOpen}
        setActiveCategory={setActiveCategory}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openBooking={() => setIsCheckoutOpen(true)}
        T={T}
      />
      
      <Hero 
        lang={lang}
        isMounted={isMounted}
        onOpenBooking={() => setIsCheckoutOpen(true)}
        T={T}
      />
      
      <MantraTicker lang={lang} />
      
      <About lang={lang} T={T} />
      
      <Collection 
        lang={lang}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredMurtis={filteredMurtis}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        T={T}
      />
      
      <WhyChooseUs lang={lang} T={T} />
      
      <Gallery lang={lang} T={T} />
      
      <Services lang={lang} T={T} />
      
      <Footer lang={lang} T={T} />
      
      <CartDrawer 
        lang={lang}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        calculateSubtotal={calculateSubtotal}
        getCartItemsCount={getCartItemsCount}
        setIsCheckoutOpen={setIsCheckoutOpen}
        T={T}
      />
      
      <CheckoutModal 
        lang={lang}
        isCheckoutOpen={isCheckoutOpen}
        handleOrderSuccessClose={handleOrderSuccessClose}
        checkoutSuccess={checkoutSuccess}
        handleSubmit={handleCheckoutSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        orderId={orderId}
        cart={cart}
        calculateSubtotal={calculateSubtotal}
        T={T}
      />
    </>
  );
}
