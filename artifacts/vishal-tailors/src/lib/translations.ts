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
    nav_process: "प्रक्रिया",
    nav_visit: "सम्पर्क",

    // About / Master
    about_eyebrow: "मास्टर कारीगर",
    about_title: "मास्टरको बारेमा",
    about_desc: "दशकौं देखि जनकपुरको मुटुमा, मास्टर मौलबी मन्सुरीले मिथिलाको परम्परा र आधुनिक सिलाईलाई जोडेर उत्कृष्ट पहिरन तयार गर्दै आउनुभएको छ। हरेक सिलाईमा श्रद्धा र कला झल्किन्छ।",
    about_quote: "“कपडा त सुई-धागोले जोडिन्छ, तर पहिरन भने मनले बनाइन्छ।”",
    about_stat_years: "वर्षको अनुभव",
    about_stat_garments: "तयार पहिरन",
    about_stat_clients: "खुसी ग्राहक",

    // Owner portrait section
    owner_section_eyebrow: "हाम्रा मालिक",
    owner_section_title: "मौलबी मन्सुरी",
    owner_section_subtitle: "संस्थापक एवम् प्रमुख कारीगर",
    owner_section_desc: "जनकपुरको गल्ली-गल्लीमा परिचित नाम, मौलबी मन्सुरीले आफ्नो जीवन सुई र धागोलाई समर्पित गर्नुभएको छ। उहाँको हातबाट निस्केको हरेक पहिरनले सम्मान र अपनत्वको कथा बोल्छ।",

    // Garments
    garments_eyebrow: "हाम्रो संग्रह",
    garments_title: "हाम्रा परिधानहरू",
    garments_subtitle: "हरेक अवसरका लागि नापमा सिलाइएको पहिरन।",
    garments_safari: "सफारी सूट",
    garments_sherwani: "शेरवानी",
    garments_lehenga: "लेहंगा र चोली",
    garments_kurta: "कुर्ता-पायजामा",
    garments_pants: "पेन्ट र सर्ट",
    garments_bandi: "बण्डी",

    // Fabrics
    fabrics_eyebrow: "कपडाको चयन",
    fabrics_title: "उत्कृष्ट कपडाहरू",
    fabrics_desc: "हामी उत्कृष्ट रेसम, सुती, र ऊनका कपडाहरू प्रयोग गर्छौं जसले पहिरनलाई शाही र आरामदायी बनाउँछ।",
    fabric_silk_title: "बनारसी रेसम",
    fabric_silk_desc: "उत्सव र विवाहका लागि चम्किलो र शाही रेसम।",
    fabric_cotton_title: "शुद्ध सुती",
    fabric_cotton_desc: "दैनिक प्रयोगका लागि सास फेर्ने र आरामदायी कपडा।",
    fabric_wool_title: "उच्च गुणस्तरको ऊन",
    fabric_wool_desc: "जाडोको लागि न्यानो, टिकाउ र संभ्रान्त सूट कपडा।",

    // Process
    process_eyebrow: "हाम्रो विधि",
    process_title: "सिलाईको हाम्रो प्रक्रिया",
    process_subtitle: "नाप लिनेदेखि अन्तिम फिटिङसम्म, हरेक चरणमा परिशुद्धता।",
    process_step1_title: "परामर्श",
    process_step1_desc: "तपाईंको रुचि, अवसर र शैली बुझेर डिजाइनको चयन गर्छौं।",
    process_step2_title: "नाप",
    process_step2_desc: "१८ भन्दा बढी बिन्दुमा हातैले परिशुद्ध नाप लिइन्छ।",
    process_step3_title: "कपडा छनोट",
    process_step3_desc: "उत्कृष्ट रेसम, सुती र ऊनबाट तपाईंको कपडा छनोट गर्छौं।",
    process_step4_title: "सिलाई",
    process_step4_desc: "अनुभवी हातहरूले हरेक धागोमा कला भर्छन्।",
    process_step5_title: "फिटिङ",
    process_step5_desc: "तपाईंको शरीरमा पूर्ण मिल्ने गरी अन्तिम परिमार्जन गरिन्छ।",
    process_step6_title: "सुपुर्दगी",
    process_step6_desc: "हस्तनिर्मित गुणस्तरका साथ तयार पहिरन तपाईंको हातमा।",

    // Testimonials
    testimonials_eyebrow: "ग्राहकका शब्दहरू",
    testimonials_title: "हाम्रा परिवार के भन्छन्",
    testimonial1: "मेरो विवाहको शेरवानी जति सुन्दर थियो, सिलाई पनि त्यतिकै नाप मिल्दो थियो। मौलबी जीको हातमा साँच्चै जादु छ।",
    testimonial1_author: "रामेश्वर साह — विराटनगर",
    testimonial2: "वर्षौं देखि हाम्रो परिवारले यहीँबाट सिलाउँछौं। एकपटक नाप लिएपछि सधैं उत्तम फिट हुन्छ।",
    testimonial2_author: "सुनीता देवी — जनकपुर",
    testimonial3: "सफारी सूटको लागि शहरमा यो भन्दा राम्रो ठाउँ छैन। उचित मूल्य र शाही गुणस्तर।",
    testimonial3_author: "अनिल कुमार — धनुषा",

    // Visit
    visit_eyebrow: "हामीलाई भेट्नुहोस्",
    visit_title: "हाम्रो पसलमा पाल्नुहोस्",
    visit_subtitle: "जनकपुरधामको हृदयमा, तपाईंको स्वागत छ।",
    visit_location: "ठेगाना",
    visit_phone: "फोन",
    visit_hours: "खुल्ने समय",
    hours_weekday: "आइतबार – शुक्रबार",
    hours_weekday_time: "बिहान ९ – बेलुका ८",
    hours_saturday: "शनिबार",
    hours_saturday_time: "बिहान १० – साँझ ६",
    map_title: "हाम्रो स्थान नक्सामा",
    call_now: "अहिले कल गर्नुहोस्",
    get_directions: "बाटो हेर्नुहोस्",

    // Error
    error_title: "पृष्ठ भेटिएन",
    error_desc: "तपाईंले खोज्नुभएको पृष्ठ अवस्थित छैन।",
    return_home: "मुख्य पृष्ठमा फर्कनुहोस्",

    // Footer
    footer_tagline: "जनकपुरको हृदयबाट सिलाइएको परम्परा।",
    footer_explore: "अन्वेषण गर्नुहोस्",
    footer_contact: "सम्पर्क",
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
    nav_process: "प्रक्रिया",
    nav_visit: "संपर्क",

    // About
    about_eyebrow: "मास्टर कारीगर",
    about_title: "मास्टर के बारे में",
    about_desc: "दशकों से जनकपुर के हृदय में, मास्टर मौलवी मंसूरी मिथिला की परंपरा और आधुनिक सिलाई को जोड़कर उत्कृष्ट परिधान तैयार कर रहे हैं। हर सिलाई में श्रद्धा और कला झलकती है।",
    about_quote: "“कपड़े सुई-धागे से जुड़ते हैं, परिधान मन से बनते हैं।”",
    about_stat_years: "वर्षों का अनुभव",
    about_stat_garments: "तैयार परिधान",
    about_stat_clients: "संतुष्ट ग्राहक",

    // Owner portrait
    owner_section_eyebrow: "हमारे मालिक",
    owner_section_title: "मौलवी मंसूरी",
    owner_section_subtitle: "संस्थापक एवं प्रमुख कारीगर",
    owner_section_desc: "जनकपुर की गली-गली में पहचाना नाम, मौलवी मंसूरी ने अपना जीवन सुई और धागे को समर्पित किया है। उनके हाथों से बना हर परिधान सम्मान और अपनेपन की कहानी कहता है।",

    // Garments
    garments_eyebrow: "हमारा संग्रह",
    garments_title: "हमारे परिधान",
    garments_subtitle: "हर अवसर के लिए नाप पर सिले हुए परिधान।",
    garments_safari: "सफारी सूट",
    garments_sherwani: "शेरवानी",
    garments_lehenga: "लेहंगा और चोली",
    garments_kurta: "कुर्ता-पायजामा",
    garments_pants: "शर्ट-पेन्ट",
    garments_bandi: "बंडी",

    // Fabrics
    fabrics_eyebrow: "कपड़े का चयन",
    fabrics_title: "उत्कृष्ट कपड़े",
    fabrics_desc: "हम बेहतरीन रेशम, सूती और ऊनी कपड़ों का उपयोग करते हैं जो परिधान को शाही और आरामदायक बनाते हैं।",
    fabric_silk_title: "बनारसी रेशम",
    fabric_silk_desc: "उत्सव और विवाह के लिए चमकदार और शाही रेशम।",
    fabric_cotton_title: "शुद्ध सूती",
    fabric_cotton_desc: "दैनिक उपयोग के लिए सांस लेने वाला, आरामदायक कपड़ा।",
    fabric_wool_title: "उच्च गुणवत्ता का ऊन",
    fabric_wool_desc: "सर्दी के लिए गर्म, टिकाऊ और संभ्रांत सूट का कपड़ा।",

    // Process
    process_eyebrow: "हमारी विधि",
    process_title: "सिलाई की हमारी प्रक्रिया",
    process_subtitle: "नाप लेने से लेकर अंतिम फिटिंग तक, हर चरण में परिशुद्धता।",
    process_step1_title: "परामर्श",
    process_step1_desc: "आपकी पसंद, अवसर और शैली समझकर डिजाइन का चयन करते हैं।",
    process_step2_title: "नाप",
    process_step2_desc: "18 से अधिक बिंदुओं पर हाथ से सटीक नाप लिया जाता है।",
    process_step3_title: "कपड़े का चुनाव",
    process_step3_desc: "बेहतरीन रेशम, सूती और ऊन से आपका कपड़ा चुनते हैं।",
    process_step4_title: "सिलाई",
    process_step4_desc: "अनुभवी हाथ हर धागे में कला भरते हैं।",
    process_step5_title: "फिटिंग",
    process_step5_desc: "आपके शरीर पर पूरी तरह फिट होने तक अंतिम परिमार्जन।",
    process_step6_title: "सुपुर्दगी",
    process_step6_desc: "हस्तनिर्मित गुणवत्ता के साथ तैयार परिधान आपके हाथों में।",

    // Testimonials
    testimonials_eyebrow: "ग्राहकों के शब्द",
    testimonials_title: "हमारे परिवार क्या कहते हैं",
    testimonial1: "मेरी शादी की शेरवानी जितनी सुंदर थी, सिलाई भी उतनी ही सटीक थी। मौलवी जी के हाथों में सच में जादू है।",
    testimonial1_author: "रामेश्वर साह — विराटनगर",
    testimonial2: "वर्षों से हमारा परिवार यहीं से सिलवाता है। एक बार नाप लेने के बाद हमेशा बेहतरीन फिट होता है।",
    testimonial2_author: "सुनीता देवी — जनकपुर",
    testimonial3: "सफारी सूट के लिए शहर में इससे बेहतर जगह नहीं है। उचित मूल्य और शाही गुणवत्ता।",
    testimonial3_author: "अनिल कुमार — धनुषा",

    // Visit
    visit_eyebrow: "हमसे मिलें",
    visit_title: "हमारे दुकान पर पधारें",
    visit_subtitle: "जनकपुरधाम के हृदय में, आपका स्वागत है।",
    visit_location: "पता",
    visit_phone: "फोन",
    visit_hours: "खुलने का समय",
    hours_weekday: "रविवार – शुक्रवार",
    hours_weekday_time: "सुबह 9 – शाम 8",
    hours_saturday: "शनिवार",
    hours_saturday_time: "सुबह 10 – शाम 6",
    map_title: "नक्शे पर हमारा स्थान",
    call_now: "अभी कॉल करें",
    get_directions: "रास्ता देखें",

    // Error
    error_title: "पृष्ठ नहीं मिला",
    error_desc: "आपके द्वारा खोजा गया पृष्ठ मौजूद नहीं है।",
    return_home: "मुख्य पृष्ठ पर लौटें",

    // Footer
    footer_tagline: "जनकपुर के हृदय से सिली हुई परंपरा।",
    footer_explore: "अन्वेषण",
    footer_contact: "संपर्क",
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
    nav_process: "Process",
    nav_visit: "Visit Us",

    // About
    about_eyebrow: "The Master Craftsman",
    about_title: "About the Master",
    about_desc: "For decades in the heart of Janakpur, Master Maulvi Mansuri has blended Mithila tradition with modern tailoring to craft exquisite garments. Every stitch reflects devotion and artistry.",
    about_quote: "“Cloth is joined by needle and thread, but a garment is woven by the heart.”",
    about_stat_years: "Years of Heritage",
    about_stat_garments: "Garments Crafted",
    about_stat_clients: "Happy Patrons",

    // Owner portrait
    owner_section_eyebrow: "Our Owner",
    owner_section_title: "Maulvi Mansuri",
    owner_section_subtitle: "Founder & Master Tailor",
    owner_section_desc: "A familiar name in every lane of Janakpur, Maulvi Mansuri has devoted his life to needle and thread. Every garment from his hands tells a story of respect, care and craftsmanship.",

    // Garments
    garments_eyebrow: "Our Collection",
    garments_title: "Our Garments",
    garments_subtitle: "Tailored to measure for every occasion you cherish.",
    garments_safari: "Safari Suits",
    garments_sherwani: "Sherwani",
    garments_lehenga: "Lehenga & Choli",
    garments_kurta: "Kurta-Pajama",
    garments_pants: "Shirts & Pants",
    garments_bandi: "Bandi",

    // Fabrics
    fabrics_eyebrow: "Cloth & Selection",
    fabrics_title: "Exquisite Fabrics",
    fabrics_desc: "We source the finest silks, cottons, and wools to ensure each garment feels as regal as it looks.",
    fabric_silk_title: "Banarasi Silk",
    fabric_silk_desc: "Lustrous, regal silk for weddings and ceremonial wear.",
    fabric_cotton_title: "Pure Cotton",
    fabric_cotton_desc: "Breathable, comfortable cotton crafted for everyday elegance.",
    fabric_wool_title: "Fine Wool",
    fabric_wool_desc: "Warm, durable, sophisticated suiting cloth for the cooler months.",

    // Process
    process_eyebrow: "Our Method",
    process_title: "How We Craft Your Garment",
    process_subtitle: "From the first measurement to the final fitting, every step is exact.",
    process_step1_title: "Consultation",
    process_step1_desc: "We listen to your taste, occasion and style to choose the right design.",
    process_step2_title: "Measurement",
    process_step2_desc: "Precise hand measurements taken at over 18 points on the body.",
    process_step3_title: "Fabric Selection",
    process_step3_desc: "Choose your cloth from our curated silks, cottons and wools.",
    process_step4_title: "Stitching",
    process_step4_desc: "Experienced hands sew artistry into every single thread.",
    process_step5_title: "Fitting",
    process_step5_desc: "Final adjustments until the garment fits you perfectly.",
    process_step6_title: "Delivery",
    process_step6_desc: "Your finished, handcrafted garment is delivered into your hands.",

    // Testimonials
    testimonials_eyebrow: "In Their Words",
    testimonials_title: "What Our Family of Patrons Say",
    testimonial1: "My wedding sherwani was as beautiful as it was perfectly fitted. Maulvi ji's hands truly carry magic.",
    testimonial1_author: "Rameshwar Sah — Biratnagar",
    testimonial2: "Our family has been stitching here for years. Once they take your measure, every garment fits flawlessly.",
    testimonial2_author: "Sunita Devi — Janakpur",
    testimonial3: "There is no better place in town for a safari suit. Fair price, royal quality.",
    testimonial3_author: "Anil Kumar — Dhanusha",

    // Visit
    visit_eyebrow: "Come See Us",
    visit_title: "Visit Our Atelier",
    visit_subtitle: "In the heart of Janakpur Dham, you are always welcome.",
    visit_location: "Address",
    visit_phone: "Phone",
    visit_hours: "Opening Hours",
    hours_weekday: "Sunday – Friday",
    hours_weekday_time: "9 AM – 8 PM",
    hours_saturday: "Saturday",
    hours_saturday_time: "10 AM – 6 PM",
    map_title: "Find Us on the Map",
    call_now: "Call Now",
    get_directions: "Get Directions",

    // Error
    error_title: "Page Not Found",
    error_desc: "The page you are looking for does not exist.",
    return_home: "Return Home",

    // Footer
    footer_tagline: "Tradition stitched from the heart of Janakpur.",
    footer_explore: "Explore",
    footer_contact: "Contact",
    footer_rights: "All rights reserved."
  }
};
