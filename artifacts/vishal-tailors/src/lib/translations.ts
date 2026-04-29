export type Language = 'ne' | 'hi' | 'en';

type TranslationDictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: TranslationDictionary = {
  ne: {
    // Core details
    name: "न्यू विशाल टेलर्स",
    owner: "मौलबी मन्सुरी",
    tagline: "सूट स्पेशलिस्ट",
    description: "यहाँ सफारी सूट, पेन्ट, सर्ट, सिवानी, बण्डी तथा लेहंगा/चोली को उत्तम सिलाई उचित मूल्यमा गरिन्छ।",
    fabric: "यहाँ आधुनिक डिजाइनको कपडा हरू पाइन्छ।",
    address: "जानकी चौक-३, जनकपुरधाम, धनुषा, नेपाल",
    
    // Navigation
    nav_craft: "हाम्रो कला",
    nav_garments: "परिधान",
    nav_fabrics: "कपडाहरू",
    nav_visit: "सम्पर्क",
    
    // Sections
    about_title: "मास्टरको बारेमा",
    about_desc: "दशकौं देखि जनकपुरको मुटुमा, मास्टर मौलबी मन्सुरीले मिथिलाको परम्परा र आधुनिक सिलाईलाई जोडेर उत्कृष्ट पहिरन तयार गर्दै आउनुभएको छ। हरेक सिलाईमा श्रद्धा र कला झल्किन्छ।",
    
    garments_title: "हाम्रा परिधानहरू",
    garments_safari: "सफारी सूट",
    garments_sherwani: "शेरवानी",
    garments_lehenga: "लेहंगा र चोली",
    garments_kurta: "कुर्ता-पायजामा",
    garments_pants: "पेन्ट र सर्ट",
    garments_bandi: "बण्डी",
    
    fabrics_title: "उत्कृष्ट कपडाहरू",
    fabrics_desc: "हामी उत्कृष्ट रेसम, सुती, र ऊनका कपडाहरू प्रयोग गर्छौं जसले पहिरनलाई शाही र आरामदायी बनाउँछ।",
    
    visit_title: "हामीलाई भेट्नुहोस्",
    call_now: "अहिले कल गर्नुहोस्",
    get_directions: "बाटो हेर्नुहोस्",
    
    // Error
    error_title: "पृष्ठ भेटिएन",
    error_desc: "तपाईंले खोज्नुभएको पृष्ठ अवस्थित छैन।",
    return_home: "मुख्य पृष्ठमा फर्कनुहोस्",
    
    // Footer
    footer_rights: "सर्वाधिकार सुरक्षित।"
  },
  hi: {
    // Core details
    name: "न्यू विशाल टेलर्स",
    owner: "मौलवी मंसूरी",
    tagline: "सूट स्पेशलिस्ट",
    description: "यहाँ आधुनिक डिजाइन के शर्ट-पेन्ट, सूट, शेरवानी, कुर्ता-पायजामा की सिलाई की जाती है।",
    fabric: "यहाँ आधुनिक डिजाइन के कपड़े उपलब्ध हैं।",
    address: "जानकी चौक-3, जनकपुरधाम, धनुषा, नेपाल",
    
    // Navigation
    nav_craft: "हमारी कला",
    nav_garments: "परिधान",
    nav_fabrics: "कपड़े",
    nav_visit: "संपर्क",
    
    // Sections
    about_title: "मास्टर के बारे में",
    about_desc: "दशकों से जनकपुर के हृदय में, मास्टर मौलवी मंसूरी मिथिला की परंपरा और आधुनिक सिलाई को जोड़कर उत्कृष्ट परिधान तैयार कर रहे हैं। हर सिलाई में श्रद्धा और कला झलकती है।",
    
    garments_title: "हमारे परिधान",
    garments_safari: "सफारी सूट",
    garments_sherwani: "शेरवानी",
    garments_lehenga: "लेहंगा और चोली",
    garments_kurta: "कुर्ता-पायजामा",
    garments_pants: "शर्ट-पेन्ट",
    garments_bandi: "बंडी",
    
    fabrics_title: "उत्कृष्ट कपड़े",
    fabrics_desc: "हम बेहतरीन रेशम, सूती और ऊनी कपड़ों का उपयोग करते हैं जो परिधान को शाही और आरामदायक बनाते हैं।",
    
    visit_title: "हमसे मिलें",
    call_now: "अभी कॉल करें",
    get_directions: "रास्ता देखें",
    
    // Error
    error_title: "पृष्ठ नहीं मिला",
    error_desc: "आपके द्वारा खोजा गया पृष्ठ मौजूद नहीं है।",
    return_home: "मुख्य पृष्ठ पर लौटें",
    
    // Footer
    footer_rights: "सर्वाधिकार सुरक्षित।"
  },
  en: {
    // Core details
    name: "New Vishal Tailors",
    owner: "Maulvi Mansuri",
    tagline: "Suit Specialist",
    description: "We provide high-quality stitching services for suits, shirts, pants, sherwani, kurta-pajama, and lehenga-choli at affordable prices.",
    fabric: "Modern designer fabrics are available.",
    address: "Janaki Chowk-3, Janakpur Dham, Dhanusha, Nepal",
    
    // Navigation
    nav_craft: "Our Craft",
    nav_garments: "Garments",
    nav_fabrics: "Fabrics",
    nav_visit: "Visit Us",
    
    // Sections
    about_title: "About the Master",
    about_desc: "For decades in the heart of Janakpur, Master Maulvi Mansuri has blended Mithila tradition with modern tailoring to craft exquisite garments. Every stitch reflects devotion and artistry.",
    
    garments_title: "Our Garments",
    garments_safari: "Safari Suits",
    garments_sherwani: "Sherwani",
    garments_lehenga: "Lehenga & Choli",
    garments_kurta: "Kurta-Pajama",
    garments_pants: "Shirts & Pants",
    garments_bandi: "Bandi",
    
    fabrics_title: "Exquisite Fabrics",
    fabrics_desc: "We source the finest silks, cottons, and wools to ensure each garment feels as regal as it looks.",
    
    visit_title: "Visit the Atelier",
    call_now: "Call Now",
    get_directions: "Get Directions",
    
    // Error
    error_title: "Page Not Found",
    error_desc: "The page you are looking for does not exist.",
    return_home: "Return Home",
    
    // Footer
    footer_rights: "All rights reserved."
  }
};
