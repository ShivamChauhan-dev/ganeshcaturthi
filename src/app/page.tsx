"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Menu, 
  X, 
  Heart, 
  Leaf, 
  Truck, 
  Award, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Calendar, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

// Product Collection ID-based structure
interface MurtiItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  category: "all" | "eco" | "small" | "medium" | "large";
  image: string;
}

const MURTI_COLLECTION: MurtiItem[] = [
  { id: "m1", category: "medium", image: "/collection_ganesha_one.png" },
  { id: "m2", category: "eco", image: "/collection_ganesha_two.png" },
  { id: "m3", category: "large", image: "/collection_ganesha_one.png" },
  { id: "m4", category: "small", image: "/collection_ganesha_two.png" },
  { id: "m5", category: "medium", image: "/collection_ganesha_one.png" },
  { id: "m6", category: "large", image: "/collection_ganesha_two.png" }
];

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
    cardBtn: "Book Now",
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
    
    modalTitle: "Book Your Bappa Idol",
    labelName: "Your Name *",
    labelPhone: "Phone Number (WhatsApp) *",
    labelMurtiType: "Preferred Murti Style *",
    labelSize: "Preferred Size *",
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
    submitBtn: "Submit Booking",
    
    successHeading: "Booking Submitted Successfully!",
    successText: "Thank you {name}! We have recorded your booking. Our team will contact you shortly on your mobile number {phone} for details and token money confirmation.",
    successBappa: "|| Ganpati Bappa Morya ||",
    successBtn: "Okay",
    
    products: {
      m1: { title: "Lalbaugcha Raja Style Grand Idol", size: "3 Feet", price: "₹4,500", badge: "Most Popular" },
      m2: { title: "Dagdusheth Halwai Style Shadu Mati Idol", size: "2 Feet", price: "₹3,500", badge: "100% Eco-Friendly" },
      m3: { title: "Chintamani Style Grand Ganesha", size: "5 Feet", price: "₹12,500", badge: "Limited Collection" },
      m4: { title: "Traditional Siddhivinayak Bal Ganesha", size: "1.5 Feet", price: "₹2,200", badge: "" },
      m5: { title: "Beautiful Peacock Throne Ganesha", size: "3.5 Feet", price: "₹6,800", badge: "" },
      m6: { title: "Vighnaharta Raja Style Clay Idol", size: "4 Feet", price: "₹9,500", badge: "Exquisite Carving" }
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
    cardBtn: "अभी बुक करें",
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
    
    modalTitle: "बप्पा की मूर्ति बुक करें",
    labelName: "आपका नाम *",
    labelPhone: "मोबाइल नंबर (WhatsApp) *",
    labelMurtiType: "पसंदीदा मूर्ती का प्रकार *",
    labelSize: "पसंदीदा आकार *",
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
    submitBtn: "बुकिंग सबमिट करें",
    
    successHeading: "बुकिंग सफलतापूर्वक प्राप्त हुई!",
    successText: "धन्यवाद {name} जी! हमने आपकी बुकिंग दर्ज कर ली है। हमारी टीम जल्द ही आपसे आपके मोबाइल नंबर {phone} पर विवरण और बुकिंग राशि (Token money) की पुष्टि के लिए संपर्क करेगी।",
    successBappa: "॥ गणपति बप्पा मोरया ॥",
    successBtn: "ठीक है",
    
    products: {
      m1: { title: "लालबाग राजा स्वरूप भव्य मूर्ती", size: "3 Feet", price: "₹4,500", badge: "सर्वाधिक लोकप्रिय" },
      m2: { title: "दगड़ूशेठ हलवाई स्वरूप शाडू माटी मूर्ती", size: "2 Feet", price: "₹3,500", badge: "100% इको-फ्रेंडली" },
      m3: { title: "भव्य चिंतामणि स्वरूप गणेश मूर्ती", size: "5 Feet", price: "₹12,500", badge: "सीमित संग्रह" },
      m4: { title: "पारंपरिक सिद्धिविनायक बाल गणेश", size: "1.5 Feet", price: "₹2,200", badge: "" },
      m5: { title: "सुंदर मयूर आसन गणेश मूर्ती", size: "3.5 Feet", price: "₹6,800", badge: "" },
      m6: { title: "विघ्नहर्ता राजा स्वरूप मिट्टी मूर्ती", size: "4 Feet", price: "₹9,500", badge: "विशिष्ट नक्काशी" }
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
  
  // Prevent SSR hydration mismatch for random animation values
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Mobile Nav Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Category Filtering State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Booking Dialog State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedMurti, setSelectedMurti] = useState<{title: string, size: string} | null>(null);
  
  // Form Submission States
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    murtiType: "",
    size: "",
    delivery: "no",
    address: "",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auto-fill form details if user clicked specific murti booking
  useEffect(() => {
    if (selectedMurti) {
      setFormData(prev => ({
        ...prev,
        murtiType: selectedMurti.title,
        size: selectedMurti.size
      }));
    }
  }, [selectedMurti]);

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      // Clean up form states
      setFormData({
        name: "",
        phone: "",
        murtiType: "",
        size: "",
        delivery: "no",
        address: "",
        notes: ""
      });
    }, 4000);
  };

  // Filtered Collection
  const filteredMurtis = activeCategory === "all" 
    ? MURTI_COLLECTION 
    : MURTI_COLLECTION.filter(item => item.category === activeCategory);

  // Trigger Booking Modal
  const openBooking = (murti?: {title: string, size: string}) => {
    if (murti) {
      setSelectedMurti(murti);
    } else {
      setSelectedMurti(null);
    }
    setBookingSuccess(false);
    setIsBookingOpen(true);
  };

  // Dynamic formatting for the success text
  const getSuccessMessage = () => {
    return T[lang].successText
      .replace("{name}", formData.name)
      .replace("{phone}", formData.phone);
  };

  return (
    <>
      {/* HEADER / NAVIGATION */}
      <header className="navbar-wrapper">
        <div className="navbar-container">
          <a href="#home" className="logo-link">
            {/* Elegant SVG Ganesha Outline Logo */}
            <svg viewBox="0 0 100 100" width="45" height="45" fill="none" stroke="#8a1515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M50 12 L55 22 L45 22 Z" strokeWidth="2" fill="#d4af37" />
              <path d="M40 22 L60 22 L50 32 Z" strokeWidth="1.5" />
              <path d="M50 32 Q50 48 50 48" strokeWidth="3" stroke="#d4af37" />
              <path d="M44 38 Q50 41 56 38" stroke="#d4af37" strokeWidth="2" />
              <path d="M50 48 Q40 55 40 68 Q40 78 50 78 Q58 78 58 68 Q58 58 51 54" />
              <path d="M42 35 C28 32 23 48 38 50" />
              <path d="M58 35 C72 32 77 48 62 50" />
              <circle cx="50" cy="78" r="3" fill="#d4af37" stroke="none" />
            </svg>
            <div className="logo-text-wrapper">
              <span className="logo-main-text">{T[lang].heroTitleHi}</span>
              <span className="logo-sub-text">{T[lang].heroTitleSub}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link active">{T[lang].navHome}</a></li>
              <li><a href="#about" className="nav-link">{T[lang].navAbout}</a></li>
              <li><a href="#collection" className="nav-link">{T[lang].navCollection}</a></li>
              <li><a href="#gallery" className="nav-link">{T[lang].navGallery}</a></li>
              <li><a href="#services" className="nav-link">{T[lang].navServices}</a></li>
              <li><a href="#contact" className="nav-link">{T[lang].navContact}</a></li>
            </ul>
          </nav>

          {/* Actions: Switcher & Booking CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => setLang(lang === "en" ? "hi" : "en")} 
              className="lang-switcher-btn"
              aria-label="Switch Language"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {lang === "en" ? "हिन्दी" : "English"}
            </button>

            <button onClick={() => openBooking()} className="nav-cta-btn">
              {T[lang].bookNow}
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="menu-toggle-btn"
            aria-label="Open navigation menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="mobile-nav-close"
          aria-label="Close navigation menu"
        >
          <X size={28} />
        </button>
        <ul className="mobile-nav-links">
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navHome}</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navAbout}</a></li>
          <li><a href="#collection" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navCollection}</a></li>
          <li><a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navGallery}</a></li>
          <li><a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navServices}</a></li>
          <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navContact}</a></li>
        </ul>
        
        {/* Language switcher in mobile drawer */}
        <button 
          onClick={() => {
            setLang(lang === "en" ? "hi" : "en");
            setIsMobileMenuOpen(false);
          }} 
          className="lang-switcher-btn"
          style={{ marginTop: "32px", width: "100%", justifyContent: "center" }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {lang === "en" ? "हिन्दी (Hindi)" : "English (अंग्रेजी)"}
        </button>

        <button 
          onClick={() => {
            setIsMobileMenuOpen(false);
            openBooking();
          }} 
          className="nav-cta-btn mobile-cta-btn"
        >
          {T[lang].bookNow}
        </button>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        {/* Floating Marigold Petals Animation */}
        <div className="hero-bg-flowers">
          {isMounted && Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="hero-flower-petal"
              style={{
                left: `${Math.random() * 95}%`,
                width: `${12 + Math.random() * 20}px`,
                height: `${12 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
                backgroundColor: i % 2 === 0 ? "#ff9800" : "#ffc107",
                borderRadius: "50% 0 50% 50%",
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>

        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={14} className="mr-1" style={{ color: "var(--color-gold)", display: "inline" }} /> {T[lang].heroBadge}
            </span>
            <h1 className="hero-title-hi">{T[lang].heroTitleHi}<br />{T[lang].heroTitleSub}</h1>
            <h2 className="hero-title-en">{T[lang].heroTitleEn}</h2>
            <p className="hero-description">
              {T[lang].heroDesc}
            </p>
            <div className="hero-cta-group">
              <button onClick={() => openBooking()} className="btn-primary">{T[lang].heroCtaPrimary}</button>
              <a href="#collection" className="btn-secondary">{T[lang].heroCtaSecondary}</a>
            </div>
          </div>

          <div className="hero-image-container">
            {/* Empty placeholder to let the background Ganesha outline from hero_bg show through cleanly */}
          </div>
        </div>
      </section>

      {/* RUNNING TICKER MANTRA BANNER */}
      <div className="ticker-banner">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, idx) => (
            <React.Fragment key={idx}>
              <div className="ticker-item">
                <span>{lang === "en" ? "|| Ganpati Bappa Morya ||" : "॥ गणपति बप्पा मोरया ॥"}</span>
                <div className="ticker-dot" />
                <span>{lang === "en" ? "|| Mangal Murti Morya ||" : "॥ मंगल मूर्ति मोरया ॥"}</span>
                <div className="ticker-dot" />
                <span>{lang === "en" ? "|| Shree Siddhivinayak Namo Namah ||" : "॥ श्री सिद्धिविनायक नमो नमः ॥"}</span>
                <div className="ticker-dot" />
                <span>{lang === "en" ? "|| Ashtavinayak Namo Namah ||" : "॥ अष्टविनायक नमो नमः ॥"}</span>
                <div className="ticker-dot" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <section id="about" className="about-section section-container">
        <div className="about-grid">
          <div className="about-text-content">
            <span className="about-subtitle">{T[lang].aboutSub}</span>
            <h2 className="about-title">{T[lang].aboutTitle}</h2>
            <p className="about-description">
              {T[lang].aboutDesc}
            </p>
            <a href="#collection" className="btn-primary">{T[lang].heroCtaSecondary}</a>
          </div>

          <div className="about-img-container">
            <div className="about-img-frame">
              <div className="about-img-inner">
                <Image 
                  src="/about_ganesha.png" 
                  alt="Ganesha Idol inside traditional arch frame" 
                  fill
                  className="about-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section id="collection" className="collection-section">
        <div className="section-container">
          <span className="section-subtitle">{T[lang].collectionSub}</span>
          <h2 className="section-title">{T[lang].collectionTitle}</h2>

          {/* Filtering Chips */}
          <div className="filter-container">
            <button 
              onClick={() => setActiveCategory("all")} 
              className={`filter-chip ${activeCategory === "all" ? "active" : ""}`}
            >
              {T[lang].filterAll}
            </button>
            <button 
              onClick={() => setActiveCategory("eco")} 
              className={`filter-chip ${activeCategory === "eco" ? "active" : ""}`}
            >
              {T[lang].filterEco}
            </button>
            <button 
              onClick={() => setActiveCategory("small")} 
              className={`filter-chip ${activeCategory === "small" ? "active" : ""}`}
            >
              {T[lang].filterSmall}
            </button>
            <button 
              onClick={() => setActiveCategory("medium")} 
              className={`filter-chip ${activeCategory === "medium" ? "active" : ""}`}
            >
              {T[lang].filterMedium}
            </button>
            <button 
              onClick={() => setActiveCategory("large")} 
              className={`filter-chip ${activeCategory === "large" ? "active" : ""}`}
            >
              {T[lang].filterLarge}
            </button>
          </div>

          {/* Collection Grid */}
          <div className="collection-grid">
            {filteredMurtis.map((item) => {
              const details = T[lang].products[item.id];
              return (
                <div key={item.id} className="collection-card">
                  <div className="card-img-wrapper">
                    {details.badge && <span className="card-badge">{details.badge}</span>}
                    <Image 
                      src={item.image} 
                      alt={details.title} 
                      fill
                      className="card-image"
                    />
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{details.title}</h3>
                    <div className="card-details">
                      <span className="card-size">{T[lang].cardSize}: {details.size}</span>
                      <span className="card-price">{details.price}</span>
                    </div>
                    <button 
                      onClick={() => openBooking({ title: details.title, size: details.size })}
                      className="form-submit-btn"
                      style={{ padding: "8px 16px", fontSize: "0.9rem", marginTop: "16px" }}
                    >
                      {T[lang].cardBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="collection-center-cta">
            <button onClick={() => openBooking()} className="btn-primary">{T[lang].customOrderBtn}</button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="why-section section-container">
        <span className="section-subtitle">{T[lang].whySub}</span>
        <h2 className="section-title">{T[lang].whyTitle}</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon-box">
              <Award size={36} />
            </div>
            <h3 className="why-card-title">{T[lang].whyQualTitle}</h3>
            <p className="why-card-desc">
              {T[lang].whyQualDesc}
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Leaf size={36} />
            </div>
            <h3 className="why-card-title">{T[lang].whyEcoTitle}</h3>
            <p className="why-card-desc">
              {T[lang].whyEcoDesc}
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Truck size={36} />
            </div>
            <h3 className="why-card-title">{T[lang].whyDelivTitle}</h3>
            <p className="why-card-desc">
              {T[lang].whyDelivDesc}
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Heart size={36} />
            </div>
            <h3 className="why-card-title">{T[lang].whyPriceTitle}</h3>
            <p className="why-card-desc">
              {T[lang].whyPriceDesc}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="gallery-section section-container">
        <span className="section-subtitle">{T[lang].gallerySub}</span>
        <h2 className="section-title">{T[lang].galleryTitle}</h2>

        <div className="gallery-grid">
          <div className="gallery-item large">
            <Image src="/workshop_sculptor.png" alt="Sculptor work scene" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img1}</span>
            </div>
          </div>
          <div className="gallery-item">
            <Image src="/collection_ganesha_one.png" alt="Decorative idol" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img2}</span>
            </div>
          </div>
          <div className="gallery-item">
            <Image src="/collection_ganesha_two.png" alt="Eco Ganesha statue details" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img3}</span>
            </div>
          </div>
          <div className="gallery-item">
            <Image src="/about_ganesha.png" alt="Ganesh Photo" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img4}</span>
            </div>
          </div>
          <div className="gallery-item">
            <Image src="/collection_ganesha_two.png" alt="Ganesha idol work in progress" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img5}</span>
            </div>
          </div>
          <div className="gallery-item large">
            <Image src="/delivery_ganesha.png" alt="Truck transport" fill className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{T[lang].gallery.img6}</span>
            </div>
          </div>
        </div>

        <div className="collection-center-cta">
          <a href="#contact" className="btn-secondary">{T[lang].galleryMoreBtn}</a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section section-container">
        <div className="services-grid">
          <div>
            <span className="section-subtitle">{T[lang].servicesSub}</span>
            <h2 className="about-title" style={{ textAlign: "left" }}>{T[lang].servicesTitle}</h2>
            
            <div className="services-list">
              <div className="service-item">
                <div className="service-icon-box">
                  <Calendar size={24} />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{T[lang].srvBookingTitle}</h3>
                  <p className="service-desc">{T[lang].srvBookingDesc}</p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon-box">
                  <Truck size={24} />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{T[lang].srvDelivTitle}</h3>
                  <p className="service-desc">{T[lang].srvDelivDesc}</p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon-box">
                  <Sparkles size={24} />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{T[lang].srvInstTitle}</h3>
                  <p className="service-desc">{T[lang].srvInstDesc}</p>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon-box">
                  <Leaf size={24} />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{T[lang].srvVisarjanTitle}</h3>
                  <p className="service-desc">{T[lang].srvVisarjanDesc}</p>
                </div>
              </div>
            </div>

            <button onClick={() => openBooking()} className="btn-primary">{T[lang].srvContactBtn}</button>
          </div>

          <div className="services-img-container">
            <div className="services-graphic-wrapper">
              <Image 
                src="/delivery_ganesha.png" 
                alt="Delivery mini-truck transporting Ganesha idols safely" 
                fill
                className="services-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <div className="section-container" style={{ padding: "0 24px" }}>
          <div className="footer-grid">
            <div className="footer-info">
              <div className="footer-logo">
                <svg viewBox="0 0 100 100" width="40" height="40" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M50 12 L55 22 L45 22 Z" strokeWidth="2" fill="#d4af37" />
                  <path d="M40 22 L60 22 L50 32 Z" strokeWidth="1.5" />
                  <path d="M50 32 Q50 48 50 48" strokeWidth="3" stroke="#fff" />
                  <path d="M50 48 Q40 55 40 68 Q40 78 50 78 Q58 78 58 68 Q58 58 51 54" />
                  <circle cx="50" cy="78" r="3" fill="#fff" stroke="none" />
                </svg>
                <span className="footer-logo-text">{T[lang].heroTitleHi} {T[lang].heroTitleSub}</span>
              </div>
              <p className="footer-desc">
                {T[lang].footerDesc}
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit Instagram">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit Facebook">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Chat on WhatsApp">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="footer-title">{T[lang].footerLinks}</h3>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">{T[lang].navHome}</a></li>
                <li><a href="#about" className="footer-link">{T[lang].navAbout}</a></li>
                <li><a href="#collection" className="footer-link">{T[lang].navCollection}</a></li>
                <li><a href="#gallery" className="footer-link">{T[lang].navGallery}</a></li>
                <li><a href="#services" className="footer-link">{T[lang].navServices}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-title">{T[lang].footerContact}</h3>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <Phone size={20} />
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerPhoneLabel}</p>
                    <a href="tel:+919876543210" style={{ color: "#dfd0c6" }}>+91 98765 43210</a>
                  </div>
                </li>
                <li className="footer-contact-item">
                  <MessageCircle size={20} />
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerWhatsappLabel}</p>
                    <a href="https://wa.me/919876543210?text=Hello" target="_blank" rel="noopener noreferrer" style={{ color: "#dfd0c6" }}>+91 98765 43210</a>
                  </div>
                </li>
                <li className="footer-contact-item">
                  <MapPin size={20} />
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerAddressLabel}</p>
                    <p style={{ color: "#dfd0c6" }}>{T[lang].footerAddressVal}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{T[lang].footerCopyright}</p>
            <p>{T[lang].footerDevBy}</p>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL DIALOG */}
      {isBookingOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{T[lang].modalTitle}</h3>
              <button 
                onClick={() => setIsBookingOpen(false)} 
                className="modal-close-btn"
                aria-label="Close booking modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              {!bookingSuccess ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">{T[lang].labelName}</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder={T[lang].placeholderName} 
                      required 
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{T[lang].labelPhone}</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder={T[lang].placeholderPhone} 
                      required 
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{T[lang].labelMurtiType}</label>
                    <select 
                      name="murtiType" 
                      value={formData.murtiType} 
                      onChange={handleInputChange} 
                      required
                      className="form-select"
                    >
                      <option value="">{T[lang].selectChoose}</option>
                      <option value={T[lang].products.m1.title}>{T[lang].products.m1.title}</option>
                      <option value={T[lang].products.m2.title}>{T[lang].products.m2.title}</option>
                      <option value={T[lang].products.m3.title}>{T[lang].products.m3.title}</option>
                      <option value={T[lang].products.m4.title}>{T[lang].products.m4.title}</option>
                      <option value={T[lang].products.m5.title}>{T[lang].products.m5.title}</option>
                      <option value={T[lang].products.m6.title}>{T[lang].products.m6.title}</option>
                      <option value="Special Custom Design Option">{lang === "en" ? "Other / Custom Style Request" : "अन्य / विशेष स्वरूप ऑर्डर"}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{T[lang].labelSize}</label>
                    <select 
                      name="size" 
                      value={formData.size} 
                      onChange={handleInputChange} 
                      required
                      className="form-select"
                    >
                      <option value="">{T[lang].selectChoose}</option>
                      <option value="1.5 Feet">1.5 Feet {lang === "en" ? "(Small)" : "(छोटा आकार)"}</option>
                      <option value="2 Feet">2 Feet {lang === "en" ? "(Small)" : "(छोटा आकार)"}</option>
                      <option value="3 Feet">3 Feet {lang === "en" ? "(Medium)" : "(मध्यम आकार)"}</option>
                      <option value="3.5 Feet">3.5 Feet {lang === "en" ? "(Medium)" : "(मध्यम आकार)"}</option>
                      <option value="4 Feet">4 Feet {lang === "en" ? "(Large)" : "(बड़ा आकार)"}</option>
                      <option value="5 Feet">5 Feet {lang === "en" ? "(Large)" : "(बड़ा आकार)"}</option>
                      <option value="Custom Size Request">{lang === "en" ? "Other Custom Size" : "अन्य विशेष आकार"}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{T[lang].labelDelivery}</label>
                    <select 
                      name="delivery" 
                      value={formData.delivery} 
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="no">{T[lang].deliveryNo}</option>
                      <option value="yes">{T[lang].deliveryYes}</option>
                    </select>
                  </div>

                  {formData.delivery === "yes" && (
                    <div className="form-group">
                      <label className="form-label">{T[lang].labelAddress}</label>
                      <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder={T[lang].placeholderAddress} 
                        required 
                        className="form-textarea"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">{T[lang].labelNotes}</label>
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      placeholder={T[lang].placeholderNotes} 
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    {T[lang].submitBtn}
                  </button>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-icon-box">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="success-heading">{T[lang].successHeading}</h4>
                  <p className="success-message" dangerouslySetInnerHTML={{ __html: getSuccessMessage() }} />
                  <p style={{ marginTop: "20px", fontWeight: "bold", color: "var(--color-gold-dark)", fontFamily: "var(--font-hindi)", fontSize: "1.2rem" }}>
                    {T[lang].successBappa}
                  </p>
                  <button 
                    onClick={() => setIsBookingOpen(false)} 
                    className="form-submit-btn" 
                    style={{ marginTop: "24px", maxWidth: "200px" }}
                  >
                    {T[lang].successBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
