"use client";

import React, { useState, useEffect } from "react";

// Import modular UI components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MantraTicker from "./components/MantraTicker";
import Countdown from "./components/Countdown";
import About from "./components/About";
import Collection from "./components/Collection";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";

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
    
    countdownTitle: "Ganesh Chaturthi 2026 Countdown",
    countdownSubtitle: "Days left for Bappa's arrival!",
    countdownDateLabel: "Starting Monday, 14 September 2026",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMinutes: "Minutes",
    countdownSeconds: "Seconds",
    
    products: {
      m1: { 
        title: "Lalbaugcha Raja Style Grand Idol", 
        size: "3 Feet", 
        price: "₹4,500", 
        priceVal: 4500, 
        badge: "Most Popular",
        sizeGuideDesc: "Excellent choice for housing society common halls, large home temple setups, or decorative entryways.",
        ecoProofDesc: "Handcrafted from natural river silt (Shadu clay). Dissolves completely inside a simple household water tub within 3-4 hours. The fertile clay soil residue can be mixed with your home plants."
      },
      m2: { 
        title: "Dagdusheth Halwai Style Shadu Mati Idol", 
        size: "2 Feet", 
        price: "₹3,500", 
        priceVal: 3500, 
        badge: "100% Eco-Friendly",
        sizeGuideDesc: "Highly recommended for standard apartment prayer areas, living room showcase counters, or medium office spaces.",
        ecoProofDesc: "Crafted out of biodegradable organic clay and painted with non-toxic turmeric and vegetable paints. Visarjan takes about 2 hours in a water bucket."
      },
      m3: { 
        title: "Chintamani Style Grand Ganesha", 
        size: "5 Feet", 
        price: "₹12,500", 
        priceVal: 12500, 
        badge: "Limited Collection",
        sizeGuideDesc: "Grand large-scale design perfect for corporate offices, community pandals, and spacious duplex lobbies.",
        ecoProofDesc: "Constructed with internal bamboo support frames instead of metal wires. Dissolves within 5-6 hours in garden water tanks. Zero ecological footprint."
      },
      m4: { 
        title: "Traditional Siddhivinayak Bal Ganesha", 
        size: "1.5 Feet", 
        price: "₹2,200", 
        priceVal: 2200, 
        badge: "",
        sizeGuideDesc: "Compact size suitable for small home shrines, study tables, children's rooms, or office reception desks.",
        ecoProofDesc: "Pure soil construction without chemical additives. Dissolves rapidly within 1.5 hours in home visarjan setups."
      },
      m5: { 
        title: "Beautiful Peacock Throne Ganesha", 
        size: "3.5 Feet", 
        price: "₹6,800", 
        priceVal: 6800, 
        badge: "",
        sizeGuideDesc: "Stunning ornate design tailored for premium living rooms, celebratory setups, or drawing room displays.",
        ecoProofDesc: "Painted entirely with water-soluble organic pigments. Dissolves safely in water within 4 hours."
      },
      m6: { 
        title: "Vighnaharta Raja Style Clay Idol", 
        size: "4 Feet", 
        price: "₹9,500", 
        priceVal: 9500, 
        badge: "Exquisite Carving",
        sizeGuideDesc: "Magnificent high-detail design perfect for main halls, festive pandals, and premium bungalows.",
        ecoProofDesc: "Features intricate organic hand carving. Dissolves inside water containers in 4.5 hours with zero harmful residue."
      }
    },
    
    announcementPromo: "⚡ Advance Booking Open for 2026! Pay 50% token now to confirm & get 20% Early Discount. Code: BAPPA20",
    verifiedPurchaser: "Verified Purchaser",
    reviewsSub: "Our Happy Devotees",
    reviewsTitle: "What Devotees Say About Us",
    reviewsList: [
      {
        text: "The Lalbaugcha Raja style idol was absolutely stunning. It dissolved completely in our home garden tub in under 3 hours, and we used the water for our plants. Highly recommend their Shadu Mati idols!",
        name: "Aarav Mehta",
        location: "Andheri, Mumbai"
      },
      {
        text: "Amazing safe delivery service! They delivered the Dagdusheth style idol in a completely cushioned box directly to my apartment. Prompt updates on WhatsApp too.",
        name: "Priyanka Joshi",
        location: "Kothrud, Pune"
      },
      {
        text: "Booking online was very seamless. The 50% advance token system is very transparent. Truly chemical-free organic colors and premium finish. Best Ganesha shop!",
        name: "Rohan Deshmukh",
        location: "Thane, Maharashtra"
      }
    ],
    productDetailTitle: "Ganesha Murti Specifications",
    inStock: "Available in Stock (Eco-Friendly)",
    sizeGuideTitle: "Size & Placement Guide",
    ecoProofTitle: "100% Eco-Friendly Visarjan",
    orderOnWhatsapp: "Order on WhatsApp",
    checkoutAdvanceTitle: "50% Advance Token Payment Required",
    checkoutAdvanceDesc: "To secure your Ganesha Idol booking for 2026, you only need to pay 50% token money now. The remaining balance is payable on delivery.",
    deliveryGuarantee: "Guaranteed Safe Punctual Delivery 3 Days Before Chaturthi",
    upiTitle: "Secure UPI / QR Payment Details",
    upiDesc: "Please transfer the 50% booking token amount of ₹{amt} using any UPI App (GPay, PhonePe, Paytm, BHIM) to UPI ID: bappa@upi, or pay using the custom QR code shared on WhatsApp.",
    badgeEcoCertified: "100% Biodegradable",
    
    gallery: {
      img1: "Workshop - Our Idols Being Prepared",
      img2: "Lalbaug Style Ornamentation",
      img3: "Shadu Mati Natural Artwork",
      img4: "Decorated for Installation",
      img5: "Fine Clay Carving Artistry",
      img6: "Safe Transport Service"
    },
    
    faqSub: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqsList: [
      {
        q: "What makes your Ganesha Murtis eco-friendly?",
        a: "Our idols are 100% eco-friendly because they are hand-sculpted from pure Shadu Mati (natural clay) and painted using non-toxic, chemical-free organic pigments and turmeric colors. They dissolve completely in water during home Visarjan within a few hours."
      },
      {
        q: "Do you offer Ganesha Murti online booking and safe home delivery?",
        a: "Yes! You can complete your Ganesha Murti booking online through our storefront. We offer safe and guaranteed doorstep delivery in specialized cushioned vehicles across Mumbai, Pune, Thane, and nearby regions directly to your home or pandal."
      },
      {
        q: "Which direction should the Ganesha Murti face in my home temple?",
        a: "According to Vastu Shastra, placing the Ganesha Idol facing the North direction is highly auspicious, as the North is ruled by Lord Shiva. Alternatively, placing it facing East is also beneficial. Avoid placing the idol facing South."
      },
      {
        q: "What is the difference between Shadu Mati (Clay) and POP (Plaster of Paris) idols?",
        a: "Shadu Mati is natural, biodegradable river clay that dissolves easily in water, nurturing aquatic life. Plaster of Paris (POP) contains harmful chemicals and plaster that do not dissolve in water for years, causing severe aquatic pollution."
      },
      {
        q: "Do you offer customized designs like Lalbaugcha Raja or Dagdusheth style?",
        a: "Yes! We specialize in custom Ganesha statues, including Lalbaugcha Raja style, Dagdusheth Halwai style, Chintamani style, and traditional Bal Ganesha designs. You can request customized heights and colors during booking."
      }
    ]
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
    
    countdownTitle: "गणेश चतुर्थी 2026 उलटी गिनती",
    countdownSubtitle: "बप्पा के आगमन में बचा समय!",
    countdownDateLabel: "सोमवार, 14 सितंबर 2026 से प्रारंभ",
    countdownDays: "दिन",
    countdownHours: "घंटे",
    countdownMinutes: "मिनट",
    countdownSeconds: "सेकंड",
    
    products: {
      m1: { 
        title: "लालबाग राजा स्वरूप भव्य मूर्ती", 
        size: "3 Feet", 
        price: "₹4,500", 
        priceVal: 4500, 
        badge: "सर्वाधिक लोकप्रिय",
        sizeGuideDesc: "हाउसिंग सोसायटी के सामान्य हॉल, बड़े गृह मंदिर या सजावटी प्रवेश द्वारों के लिए सर्वश्रेष्ठ विकल्प।",
        ecoProofDesc: "प्राकृतिक नदी की मिट्टी (शाडू माटी) से निर्मित। घर पर साधारण पानी की बाल्टी या टब में 3-4 घंटे में पूरी तरह घुल जाती है। अवशेष मिट्टी का उपयोग आप घर के पौधों में कर सकते हैं।"
      },
      m2: { 
        title: "दगड़ूशेठ हलवाई स्वरूप शाडू माटी मूर्ती", 
        size: "2 Feet", 
        price: "₹3,500", 
        priceVal: 3500, 
        badge: "100% इको-फ्रेंडली",
        sizeGuideDesc: "फ्लैट्स के पूजा घरों, लिविंग रूम शोकेस काउंटरों या मध्यम आकार के कार्यालयों के लिए अत्यधिक अनुशंसित।",
        ecoProofDesc: "बायोडिग्रेडेबल जैविक मिट्टी से निर्मित और हर्बल हल्दी व वनस्पति रंगों से चित्रित। विसर्जन पानी की बाल्टी में लगभग 2 घंटे में पूरा होता है।"
      },
      m3: { 
        title: "भव्य चिंतामणि स्वरूप गणेश मूर्ती", 
        size: "5 Feet", 
        price: "₹12,500", 
        priceVal: 12500, 
        badge: "सीमित संग्रह",
        sizeGuideDesc: "कॉर्पोरेट कार्यालयों, सार्वजनिक पंडालों और बड़े विला/डुप्लेक्स के मुख्य हॉल के लिए भव्य और आकर्षक डिजाइन।",
        ecoProofDesc: "लोहे के तारों की जगह बांस की आंतरिक संरचना का उपयोग। बगीचे के पानी के टैंकों में 5-6 घंटे के भीतर पूरी तरह घुलनशील।"
      },
      m4: { 
        title: "पारंपरिक सिद्धिविनायक बाल गणेश", 
        size: "1.5 Feet", 
        price: "₹2,200", 
        priceVal: 2200, 
        badge: "",
        sizeGuideDesc: "छोटे गृह मंदिरों, अध्ययन मेज, बच्चों के कमरे या कार्यालय के स्वागत डेस्क के लिए उपयुक्त कॉम्पैक्ट आकार।",
        ecoProofDesc: "बिना किसी रासायनिक मिलावट के शुद्ध प्राकृतिक मिट्टी से तैयार। घर पर विसर्जन करने पर केवल 1.5 घंटे में पानी में विलीन।"
      },
      m5: { 
        title: "सुंदर मयूर आसन गणेश मूर्ती", 
        size: "3.5 Feet", 
        price: "₹6,800", 
        priceVal: 6800, 
        badge: "",
        sizeGuideDesc: "प्रीमियम ड्राइंग रूम या उत्सव की झांकियों के लिए शानदार नक्काशीदार सजावटी मयूर सिंहासन वाली मूर्ति।",
        ecoProofDesc: "पूरी तरह से जैविक रंगों से रंगा हुआ। पानी में लगभग 4 घंटे के भीतर सुरक्षित रूप से विसर्जन संपन्न।"
      },
      m6: { 
        title: "विघ्नहर्ता राजा स्वरूप मिट्टी मूर्ती", 
        size: "4 Feet", 
        price: "₹9,500", 
        priceVal: 9500, 
        badge: "विशिष्ट नक्काशी",
        sizeGuideDesc: "मुख्य हॉल, सामुदायिक पूजा पंडालों और प्रीमियम बंगलों के लिए उत्तम कलाकृति वाली बड़ी मूर्ति।",
        ecoProofDesc: "जटिल बारीक नक्काशी वाली शुद्ध शाडू माटी। 4.5 घंटे में बिना किसी हानिकारक कचरे के विसर्जन।"
      }
    },
    
    announcementPromo: "⚡ एडवांस बुकिंग प्रारंभ! अभी केवल 50% टोकन देकर बुकिंग सुनिश्चित करें और पाएं 20% की विशेष छूट। कोड: BAPPA20",
    verifiedPurchaser: "सत्यापित भक्त",
    reviewsSub: "भक्तों के अनुभव",
    reviewsTitle: "जानिए हमारे ग्राहकों की राय",
    reviewsList: [
      {
        text: "लालबाग राजा स्वरूप की मूर्ति बेहद खूबसूरत और दिव्य थी। घर पर विसर्जन करने पर केवल 3 घंटे में यह पानी में पूरी तरह घुल गई और हमने उस पवित्र मिट्टी के पानी को अपने पौधों में डाल दिया। शत-प्रतिशत इको-फ्रेंडली!",
        name: "आरव मेहता",
        location: "अंधेरी, मुंबई"
      },
      {
        text: "डिलीवरी की बहुत बढ़िया व्यवस्था है! बप्पा की दगडूशेठ मूर्ति को विशेष गद्देदार बॉक्स में मेरे घर तक बिल्कुल सुरक्षित पहुंचाया गया। बुकिंग से लेकर डिलीवरी तक व्हाट्सएप पर लगातार अपडेट मिलते रहे।",
        name: "प्रियंका जोशी",
        location: "कोथरुड, पुणे"
      },
      {
        text: "ऑनलाइन बुकिंग की प्रक्रिया बहुत आसान है। 50% टोकन भुगतान प्रणाली पूरी तरह पारदर्शी है। मूर्ति पर किए गए प्राकृतिक रंग व कारीगरी बहुत उच्च कोटि की है।",
        name: "रोहन देशमुख",
        location: "ठाणे, महाराष्ट्र"
      }
    ],
    productDetailTitle: "गणपति मूर्ति का संपूर्ण विवरण",
    inStock: "स्टॉक में उपलब्ध (इको-फ्रेंडली)",
    sizeGuideTitle: "आकार एवं स्थापना मार्गदर्शिका",
    ecoProofTitle: "100% पर्यावरण-अनुकूल विसर्जन",
    orderOnWhatsapp: "व्हाट्सएप पर ऑर्डर करें",
    checkoutAdvanceTitle: "50% एडवांस टोकन भुगतान नियम",
    checkoutAdvanceDesc: "वर्ष 2026 के लिए अपनी गणेश मूर्ति की बुकिंग सुरक्षित करने के लिए अभी केवल 50% एडवांस टोकन राशि जमा करनी होगी। शेष 50% राशि डिलीवरी के समय देय है।",
    deliveryGuarantee: "गणेश चतुर्थी से 3 दिन पहले घर/पंडाल पर निश्चित सुरक्षित डिलीवरी की गारंटी।",
    upiTitle: "सुरक्षित UPI / QR कोड पेमेंट निर्देश",
    upiDesc: "कृपया 50% बुकिंग टोकन राशि ₹{amt} का भुगतान अपने किसी भी UPI ऐप (GPay, PhonePe, Paytm) से हमारे आधिकारिक UPI ID: bappa@upi पर ट्रांसफर करें, या व्हाट्सएप पर भेजे गए QR कोड को स्कैन करें।",
    badgeEcoCertified: "100% विघटनकारी मिट्टी",
    
    gallery: {
      img1: "निर्माणशाला - हमारी मूर्तियाँ तैयार होते हुए",
      img2: "लालबाग स्वरूप शृंगार",
      img3: "शाडू माटी प्राकृतिक कलाकृति",
      img4: "स्थापना हेतु सुसज्जित",
      img5: "बारीक मिट्टी नक्काशी कला",
      img6: "सुरक्षित ट्रांसपोर्ट सेवा"
    },
    
    faqSub: "एफएक्यू (FAQ)",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqsList: [
      {
        q: "आपकी गणेश मूर्तियां पर्यावरण के अनुकूल (Eco-Friendly) कैसे हैं?",
        a: "हमारी सभी मूर्तियां 100% प्राकृतिक शाडू माटी (नदी की प्राकृतिक मिट्टी) से हाथ द्वारा बनाई जाती हैं और उनमें केवल जैविक व रासायनिक-मुक्त प्राकृतिक रंगों का उपयोग किया जाता है। ये मूर्तियां घर पर विसर्जन करने पर कुछ ही घंटों में पानी में पूरी तरह घुल जाती हैं।"
      },
      {
        q: "क्या आप गणेश मूर्ति की ऑनलाइन बुकिंग और सुरक्षित होम डिलीवरी देते हैं?",
        a: "जी हाँ! आप हमारी वेबसाइट से घर बैठे ही गणपति मूर्ति की ऑनलाइन बुकिंग कर सकते हैं। हम सुरक्षित रूप से विशेष गद्देदार वाहनों में बप्पा को मुंबई, पुणे, ठाणे और आसपास के क्षेत्रों में सीधे आपके घर या पंडाल स्थल पर सुरक्षित रूप से पहुँचाते हैं।"
      },
      {
        q: "वास्तु के अनुसार गणेश मूर्ति को घर में किस दिशा में स्थापित करना चाहिए?",
        a: "वास्तु शास्त्र के अनुसार, गणेश मूर्ति को उत्तर दिशा (North direction) की ओर मुख करके स्थापित करना सर्वश्रेष्ठ माना जाता है क्योंकि उत्तर दिशा भगवान शिव की होती है। इसके अलावा पूर्व दिशा (East) में भी बप्पा की स्थापना की जा सकती है।"
      },
      {
        q: "शाडू माटी (Clay) और पीओपी (Plaster of Paris) मूर्तियों में क्या अंतर है?",
        a: "शाडू माटी पूरी तरह से प्राकृतिक और विसर्जन के अनुकूल है जो विसर्जन के बाद तुरंत मिट्टी बन जाती है। जबकि प्लास्टर ऑफ पेरिस (POP) रासायनिक तत्वों से बनी होती है जो पानी में सालों तक नहीं घुलती और पर्यावरण को प्रदूषित करती है।"
      },
      {
        q: "क्या आपके पास लालबागचा राजा या दगडूशेठ हलवाई शैली की मूर्तियां उपलब्ध हैं?",
        a: "जी हाँ! हमारे पास लालबागचा राजा स्वरूप, दगडूशेठ हलवाई स्वरूप, चिंतामणि और बाल गणेश स्वरूप की विभिन्न इको-फ्रेंडली प्रतिमाएं उपलब्ध हैं। आप बुकिंग के समय मूर्ति के रंग व आसन में भी बदलाव के लिए निर्देश दे सकते हैं।"
      }
    ]
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
      
      <Countdown lang={lang} T={T} />
      
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
      
      <Reviews lang={lang} T={T} />
      
      <FAQ lang={lang} T={T} />
      
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
