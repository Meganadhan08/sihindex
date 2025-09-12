import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Landing Page
    'hero.title': 'Blockchain-Powered Ayurvedic Herb Traceability',
    'hero.subtitle': 'Complete transparency from farm to formulation. Track every Ayurvedic herb through its journey with geo-tagged precision and blockchain security.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // Features
    'features.title': 'Revolutionary Traceability Features',
    'features.subtitle': 'Our blockchain-based system provides unprecedented transparency and authenticity verification for Ayurvedic herbs.',
    'features.geotagged.title': 'Geo-Tagged Collection',
    'features.geotagged.desc': 'Track herbs from exact GPS coordinates of collection points',
    'features.blockchain.title': 'Blockchain Security',
    'features.blockchain.desc': 'Immutable records ensure authenticity and prevent tampering',
    'features.quality.title': 'Quality Assurance',
    'features.quality.desc': 'Lab-verified quality parameters and compliance certifications',
    'features.realtime.title': 'Real-time Tracking',
    'features.realtime.desc': 'Monitor your herbs through every stage of the supply chain',
    
    // Authentication
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.organization': 'Organization',
    'auth.phone': 'Phone Number',
    'auth.selectRole': 'Select Your Role',
    'auth.createAccount': 'Create Account',
    'auth.haveAccount': 'Already have an account?',
    'auth.noAccount': "Don't have an account?",
    'auth.forgotPassword': 'Forgot Password?',
    
    // Roles
    'role.farmer': 'Farmer/Collector',
    'role.farmer.desc': 'Record herb collections with GPS coordinates and environmental data',
    'role.lab': 'Laboratory',
    'role.lab.desc': 'Conduct quality testing and issue compliance certificates',
    'role.processor': 'Processor/Manufacturer',
    'role.processor.desc': 'Process herbs and create final products with batch tracking',
    'role.admin': 'Admin/Supervisor',
    'role.admin.desc': 'Monitor system-wide operations and manage compliance',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Overview',
    'dashboard.newRecord': 'New Record',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.statistics': 'Statistics',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    
    // Footer
    'footer.about': 'About HerbTrace',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.copyright': '© 2025 HerbTrace. Built for Ayurvedic Transparency.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.features': 'विशेषताएं',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.login': 'लॉगिन',
    'nav.signup': 'साइन अप',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉगआउट',
    
    // Landing Page
    'hero.title': 'ब्लॉकचेन-संचालित आयुर्वेदिक जड़ी-बूटी ट्रेसेबिलिटी',
    'hero.subtitle': 'खेत से फॉर्मूलेशन तक पूर्ण पारदर्शिता। जियो-टैग्ड सटीकता और ब्लॉकचेन सुरक्षा के साथ हर आयुर्वेदिक जड़ी-बूटी की यात्रा को ट्रैक करें।',
    'hero.cta.primary': 'शुरू करें',
    'hero.cta.secondary': 'और जानें',
    
    // Features
    'features.title': 'क्रांतिकारी ट्रेसेबिलिटी विशेषताएं',
    'features.subtitle': 'हमारा ब्लॉकचेन-आधारित सिस्टम आयुर्वेदिक जड़ी-बूटियों के लिए अभूतपूर्व पारदर्शिता और प्रामाणिकता सत्यापन प्रदान करता है।',
    'features.geotagged.title': 'जियो-टैग्ड संग्रह',
    'features.geotagged.desc': 'संग्रह बिंदुओं के सटीक GPS निर्देशांक से जड़ी-बूटियों को ट्रैक करें',
    'features.blockchain.title': 'ब्लॉकचेन सुरक्षा',
    'features.blockchain.desc': 'अपरिवर्तनीय रिकॉर्ड प्रामाणिकता सुनिश्चित करते हैं और छेड़छाड़ को रोकते हैं',
    'features.quality.title': 'गुणवत्ता आश्वासन',
    'features.quality.desc': 'प्रयोगशाला-सत्यापित गुणवत्ता पैरामीटर और अनुपालन प्रमाणपत्र',
    'features.realtime.title': 'रियल-टाइम ट्रैकिंग',
    'features.realtime.desc': 'आपूर्ति श्रृंखला के हर चरण में अपनी जड़ी-बूटियों की निगरानी करें',
    
    // Authentication
    'auth.signin': 'साइन इन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.organization': 'संगठन',
    'auth.phone': 'फोन नंबर',
    'auth.selectRole': 'अपनी भूमिका चुनें',
    'auth.createAccount': 'खाता बनाएं',
    'auth.haveAccount': 'पहले से खाता है?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    
    // Roles
    'role.farmer': 'किसान/संग्राहक',
    'role.farmer.desc': 'GPS निर्देशांक और पर्यावरणीय डेटा के साथ जड़ी-बूटी संग्रह रिकॉर्ड करें',
    'role.lab': 'प्रयोगशाला',
    'role.lab.desc': 'गुणवत्ता परीक्षण करें और अनुपालन प्रमाणपत्र जारी करें',
    'role.processor': 'प्रोसेसर/निर्माता',
    'role.processor.desc': 'बैच ट्रैकिंग के साथ जड़ी-बूटियों को प्रोसेस करें और अंतिम उत्पाद बनाएं',
    'role.admin': 'एडमिन/सुपरवाइजर',
    'role.admin.desc': 'सिस्टम-व्यापी संचालन की निगरानी करें और अनुपालन प्रबंधित करें',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत',
    'dashboard.overview': 'अवलोकन',
    'dashboard.newRecord': 'नया रिकॉर्ड',
    'dashboard.recentActivity': 'हाल की गतिविधि',
    'dashboard.statistics': 'आंकड़े',
    
    // Common
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.export': 'निर्यात',
    'common.import': 'आयात',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.download': 'डाउनलोड',
    'common.upload': 'अपलोड',
    
    // Footer
    'footer.about': 'HerbTrace के बारे में',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.contact': 'हमसे संपर्क करें',
    'footer.copyright': '© 2025 HerbTrace। आयुर्वेदिक पारदर्शिता के लिए निर्मित।',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.features': 'அம்சங்கள்',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.contact': 'தொடர்பு',
    'nav.login': 'உள்நுழைவு',
    'nav.signup': 'பதிவு செய்யுங்கள்',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.logout': 'வெளியேறு',
    
    // Landing Page
    'hero.title': 'பிளாக்செயின்-இயங்கும் ஆயுர்வேத மூலிகை கண்காணிப்பு',
    'hero.subtitle': 'பண்ணையிலிருந்து ஃபார்முலேஷன் வரை முழுமையான வெளிப்படைத்தன்மை। ஜியோ-டேக் செய்யப்பட்ட துல்லியம் மற்றும் பிளாக்செயின் பாதுகாப்புடன் ஒவ்வொரு ஆயுர்வேத மூலிகையின் பயணத்தையும் கண்காணிக்கவும்.',
    'hero.cta.primary': 'தொடங்குங்கள்',
    'hero.cta.secondary': 'மேலும் அறிக',
    
    // Features
    'features.title': 'புரட்சிகர கண்காணிப்பு அம்சங்கள்',
    'features.subtitle': 'எங்கள் பிளாக்செயின் அடிப்படையிலான அமைப்பு ஆயுர்வேத மூலிகைகளுக்கு முன்னோடியில்லாத வெளிப்படைத்தன்மை மற்றும் நம்பகத்தன்மை சரிபார்ப்பை வழங்குகிறது.',
    'features.geotagged.title': 'ஜியோ-டேக் செய்யப்பட்ட சேகரிப்பு',
    'features.geotagged.desc': 'சேகரிப்பு புள்ளிகளின் சரியான GPS ஆயத்தொலைவுகளிலிருந்து மூலிகைகளைக் கண்காணிக்கவும்',
    'features.blockchain.title': 'பிளாக்செயின் பாதுகாப்பு',
    'features.blockchain.desc': 'மாற்ற முடியாத பதிவுகள் நம்பகத்தன்மையை உறுதி செய்கின்றன மற்றும் சேதப்படுத்துவதைத் தடுக்கின்றன',
    'features.quality.title': 'தர உத்தரவாதம்',
    'features.quality.desc': 'ஆய்வகம்-சரிபார்க்கப்பட்ட தர அளவுருகள் மற்றும் இணக்க சான்றிதழ்கள்',
    'features.realtime.title': 'நிகழ்நேர கண்காணிப்பு',
    'features.realtime.desc': 'விநியோகச் சங்கிலியின் ஒவ்வொரு கட்டத்திலும் உங்கள் மூலிகைகளைக் கண்காணிக்கவும்',
    
    // Authentication
    'auth.signin': 'உள்நுழைக',
    'auth.signup': 'பதிவு செய்யுங்கள்',
    'auth.email': 'மின்னஞ்சல் முகவரி',
    'auth.password': 'கடவுச்சொல்',
    'auth.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'auth.fullName': 'முழு பெயர்',
    'auth.organization': 'அமைப்பு',
    'auth.phone': 'தொலைபேசி எண்',
    'auth.selectRole': 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்',
    'auth.createAccount': 'கணக்கை உருவாக்கவும்',
    'auth.haveAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.forgotPassword': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    
    // Roles
    'role.farmer': 'விவசாயி/சேகரிப்பாளர்',
    'role.farmer.desc': 'GPS ஆயத்தொலைவுகள் மற்றும் சுற்றுச்சூழல் தரவுகளுடன் மூலிகை சேகரிப்பைப் பதிவு செய்யுங்கள்',
    'role.lab': 'ஆய்வகம்',
    'role.lab.desc': 'தர சோதனை நடத்தி இணக்க சான்றிதழ்களை வழங்கவும்',
    'role.processor': 'செயலாளர்/உற்பத்தியாளர்',
    'role.processor.desc': 'பேட்ச் கண்காணிப்புடன் மூலிகைகளைச் செயலாக்கி இறுதி தயாரிப்புகளை உருவாக்கவும்',
    'role.admin': 'நிர்வாகி/மேற்பார்வையாளர்',
    'role.admin.desc': 'கணினி அளவிலான செயல்பாடுகளைக் கண்காணித்து இணக்கத்தை நிர்வகிக்கவும்',
    
    // Dashboard
    'dashboard.welcome': 'வரவேற்கிறோம்',
    'dashboard.overview': 'கண்ணோட்டம்',
    'dashboard.newRecord': 'புதிய பதிவு',
    'dashboard.recentActivity': 'சமீபத்திய செயல்பாடு',
    'dashboard.statistics': 'புள்ளிவிவரங்கள்',
    
    // Common
    'common.save': 'சேமிக்கவும்',
    'common.cancel': 'ரத்து செய்யவும்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.search': 'தேடவும்',
    'common.filter': 'வடிகட்டி',
    'common.export': 'ஏற்றுமதி',
    'common.import': 'இறக்குமதி',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.view': 'பார்க்கவும்',
    'common.download': 'பதிவிறக்கவும்',
    'common.upload': 'பதிவேற்றவும்',
    
    // Footer
    'footer.about': 'HerbTrace பற்றி',
    'footer.privacy': 'தனியுரிமைக் கொள்கை',
    'footer.terms': 'சேவை விதிமுறைகள்',
    'footer.contact': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    'footer.copyright': '© 2025 HerbTrace. ஆயுர்வேத வெளிப்படைத்தன்மைக்காக கட்டப்பட்டது.',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.features': 'ఫీచర్లు',
    'nav.about': 'మా గురించి',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'లాగిన్',
    'nav.signup': 'సైన్ అప్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.logout': 'లాగ్ అవుట్',
    
    // Landing Page
    'hero.title': 'బ్లాక్‌చెయిన్-శక్తితో కూడిన ఆయుర్వేద మూలికల ట్రేసబిలిటీ',
    'hero.subtitle': 'వ్యవసాయం నుండి ఫార్ములేషన్ వరకు పూర్తి పారదర్శకత. జియో-ట్యాగ్ చేయబడిన ఖచ్చితత్వం మరియు బ్లాక్‌చెయిన్ భద్రతతో ప్రతి ఆయుర్వేద మూలిక యాత్రను ట్రాక్ చేయండి.',
    'hero.cta.primary': 'ప్రారంభించండి',
    'hero.cta.secondary': 'మరింత తెలుసుకోండి',
    
    // Features
    'features.title': 'విప్లవాత్మక ట్రేసబిలిటీ ఫీచర్లు',
    'features.subtitle': 'మా బ్లాక్‌చెయిన్ ఆధారిత వ్యవస్థ ఆయుర్వేద మూలికలకు అపూర్వమైన పారదర్శకత మరియు ప్రామాణికత ధృవీకరణను అందిస్తుంది.',
    'features.geotagged.title': 'జియో-ట్యాగ్ చేయబడిన సేకరణ',
    'features.geotagged.desc': 'సేకరణ పాయింట్ల యొక్క ఖచ్చితమైన GPS కోఆర్డినేట్ల నుండి మూలికలను ట్రాక్ చేయండి',
    'features.blockchain.title': 'బ్లాక్‌చెయిన్ భద్రత',
    'features.blockchain.desc': 'మార్చలేని రికార్డులు ప్రామాణికతను నిర్ధారిస్తాయి మరియు తారుమారుని నిరోధిస్తాయి',
    'features.quality.title': 'నాణ్యత హామీ',
    'features.quality.desc': 'ల్యాబ్-ధృవీకరించబడిన నాణ్యత పారామీటర్లు మరియు సమ్మతి ధృవపత్రాలు',
    'features.realtime.title': 'రియల్-టైమ్ ట్రాకింగ్',
    'features.realtime.desc': 'సప్లై చెయిన్ యొక్క ప్రతి దశలో మీ మూలికలను పర్యవేక్షించండి',
    
    // Authentication
    'auth.signin': 'సైన్ ఇన్',
    'auth.signup': 'సైన్ అప్',
    'auth.email': 'ఇమెయిల్ చిరునామా',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.confirmPassword': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
    'auth.fullName': 'పూర్తి పేరు',
    'auth.organization': 'సంస్థ',
    'auth.phone': 'ఫోన్ నంబర్',
    'auth.selectRole': 'మీ పాత్రను ఎంచుకోండి',
    'auth.createAccount': 'ఖాతా సృష్టించండి',
    'auth.haveAccount': 'ఇప్పటికే ఖాతా ఉందా?',
    'auth.noAccount': 'ఖాతా లేదా?',
    'auth.forgotPassword': 'పాస్‌వర్డ్ మర్చిపోయారా?',
    
    // Roles
    'role.farmer': 'రైతు/సేకరణకర్త',
    'role.farmer.desc': 'GPS కోఆర్డినేట్లు మరియు పర్యావరణ డేటాతో మూలిక సేకరణను రికార్డ్ చేయండి',
    'role.lab': 'ప్రయోగశాల',
    'role.lab.desc': 'నాణ్యత పరీక్షలు నిర్వహించి సమ్మతి ధృవపత్రాలను జారీ చేయండి',
    'role.processor': 'ప్రాసెసర్/తయారీదారు',
    'role.processor.desc': 'బ్యాచ్ ట్రాకింగ్‌తో మూలికలను ప్రాసెస్ చేసి తుది ఉత్పత్తులను సృష్టించండి',
    'role.admin': 'అడ్మిన్/సూపర్‌వైజర్',
    'role.admin.desc': 'సిస్టమ్-వ్యాప్త కార్యకలాపాలను పర్యవేక్షించండి మరియు సమ్మతిని నిర్వహించండి',
    
    // Dashboard
    'dashboard.welcome': 'స్వాగతం',
    'dashboard.overview': 'అవలోకనం',
    'dashboard.newRecord': 'కొత్త రికార్డ్',
    'dashboard.recentActivity': 'ఇటీవలి కార్యకలాపం',
    'dashboard.statistics': 'గణాంకాలు',
    
    // Common
    'common.save': 'సేవ్ చేయండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.submit': 'సమర్పించండి',
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.search': 'వెతకండి',
    'common.filter': 'ఫిల్టర్',
    'common.export': 'ఎగుమతి',
    'common.import': 'దిగుమతి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరించండి',
    'common.view': 'చూడండి',
    'common.download': 'డౌన్‌లోడ్',
    'common.upload': 'అప్‌లోడ్',
    
    // Footer
    'footer.about': 'HerbTrace గురించి',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవా నిబంధనలు',
    'footer.contact': 'మమ్మల్ని సంప్రదించండి',
    'footer.copyright': '© 2025 HerbTrace. ఆయుర్వేద పారదర్శకత కోసం నిర్మించబడింది.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('herbtrace_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('herbtrace_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};