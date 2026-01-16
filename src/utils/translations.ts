export interface Translations {
    // Common
    HOME: string;
    SEARCH: string;
    VIEW_ALL: string;
    CALL: string;
    MESSAGE: string;
    VIEW_DETAILS: string;
    POSTED: string;
    DESCRIPTION: string;
    LOCATION: string;
    QUANTITY: string;
    RATE: string;
    QUALITY: string;
    POST_DATE: string;
    AVAILABLE_DATE: string;
    ABOUT_CROP: string;
    NOT_AVAILABLE: string;

    // Drawer
    drawer: {
        HOME: string;
        PROFILE: string;
        FAVORITES: string;
        MY_CROPS: string;
        POST_REQUIREMENT: string;
        VIEW_REQUIREMENT: string;
        CALLS_RECEIVED: string;
        CHAT: string;
        ABOUT_US: string;
        CONTACT_US: string;
        SHARE_APP: string;
        LANGUAGE: string;
        TERMS_CONDITIONS: string;
        LOGOUT: string;
        AGROBIZ: string;
        BUYERS: string;
        FARMERS: string;
        OUR_SERVICES: string;
    };

    // Our Services Page
    OUR_SERVICES_PAGE: {
        TITLE: string;
        COMPANY_NAME: string;
        DESCRIPTION: string;
        SECTIONS: {
            SECTION_1: { TITLE: string; DESC: string; POINTS: string[] };
            SECTION_2: { TITLE: string; DESC: string; POINTS: string[] };
            SECTION_3: { TITLE: string; DESC: string; POINTS: string[] };
            SECTION_4: { TITLE: string; DESC: string; POINTS: string[] };
            SECTION_5: { TITLE: string; DESC: string; POINTS: string[] };
            SECTION_6: { TITLE: string; DESC: string; POINTS: string[] };
        };
        WHY_CHOOSE: {
            TITLE: string;
            POINTS: string[];
        };
        VISION: {
            TITLE: string;
            DESC: string;
        };
    };

    // Home Screen
    POST_REQUIREMENT_TITLE: string;
    POST_REQUIREMENT_SUBTITLE: string;
    POST_REQUIREMENT_BUTTON: string;
    SELL_CROP_TITLE: string;
    SELL_CROP_SUBTITLE: string;
    SELL_CROP_BUTTON: string;
    YOUR_CROPS: string;
    SERVICES_AVAILABLE: string;
    BUYERS_REQUIREMENTS: string;
    NEAR_BY_AGROSHOP: string;
    CATEGORY: string;

    // Requirements
    REQUIREMENTS: string;
    NO_REQUIREMENT: string;
    I_WANT_TO_BUY: string;

    // Buyers
    BUYERS_SEARCH: string;
    BUYERS_EMPTY: string;
    BUYER_NAME: string;
    BUYER_FOLLOW: string;
    BUYER_DEALSIN: string;

    // Farmers
    FARMERS_SEARCH: string;
    FARMERS_EMPTY: string;

    // Favorites
    FAVORITES: string;
    FAV_CROPS: string;
    FAV_FARMER: string;
    FAV_BUYERS: string;

    // Profile
    PROFILE: string;
    EDIT_PROFILE: string;

    // Language
    CHOOSE_LANGUAGE: string;
    CHOOSE_LANGUAGE_SUBTITLE: string;

    // Labels
    CROP_NAME: string;
    TYPE: string;

    // Footer
    FOLLOW_US_SOCIAL_MEDIA: string;
    COME_BE_PART: string;
    INFORMATION: string;
    CONTACT_US: string;
    SUBSCRIBE_NEWSLETTER: string;
    ENTER_EMAIL: string;
    SEND: string;
    FOLLOW_SOCIAL_MEDIA: string;
    TOLL_FREE: string;
    TIMING: string;
    ABOUT_US: string;
    CANCELLATION_POLICY: string;
    GENERAL_TERMS: string;
    GRIEVANCE_POLICY: string;
    RETURN_REFUND_POLICY: string;
    SHIPPING_POLICY: string;
    BLOGS: string;
    CAUTION_NOTICE: string;
    FAQ: string;
    PRIVACY_POLICY: string;
    SITE_MAP: string;
    ALL_RIGHTS_RESERVED: string;
    COMING_SOON: string;
}

const translations: Record<string, Translations> = {
    en: {
        HOME: 'Home',
        SEARCH: 'Search',
        VIEW_ALL: 'View All',
        CALL: 'Call',
        MESSAGE: 'Message',
        VIEW_DETAILS: 'View Details',
        POSTED: 'Posted',
        DESCRIPTION: 'Description',
        LOCATION: 'Location',
        QUANTITY: 'Quantity',
        RATE: 'Rate',
        QUALITY: 'Quality',
        POST_DATE: 'Post Date',
        AVAILABLE_DATE: 'Available Date',
        ABOUT_CROP: 'About Crop',
        NOT_AVAILABLE: 'N/A',

        drawer: {
            HOME: 'Home',
            PROFILE: 'Profile',
            FAVORITES: 'Favorites',
            MY_CROPS: 'My Crops',
            POST_REQUIREMENT: 'Post Your Requirement',
            VIEW_REQUIREMENT: 'View Requirement Post',
            CALLS_RECEIVED: 'Calls Received',
            CHAT: 'Chat',
            ABOUT_US: 'About Us',
            CONTACT_US: 'Contact Us',
            SHARE_APP: 'Share App',
            LANGUAGE: 'Language',
            TERMS_CONDITIONS: 'Terms & Conditions',
            LOGOUT: 'Logout',
            AGROBIZ: 'Agrobiz',
            BUYERS: 'Buyers',
            FARMERS: 'Farmers',
            OUR_SERVICES: 'Our Services',
        },

        OUR_SERVICES_PAGE: {
            TITLE: 'Our Services',
            COMPANY_NAME: 'ApnaFarmer Technology Pvt Ltd',
            DESCRIPTION: 'ApnaFarmer Technology Pvt Ltd connects farmers and buyers through a digital, reliable, and transparent platform, helping farmers receive the right value for their produce while enabling buyers to access high-quality agricultural products directly from the source.',
            SECTIONS: {
                SECTION_1: {
                    TITLE: '1. Farmer–Buyer Direct Connect',
                    DESC: 'We directly connect farmers and buyers.',
                    POINTS: ['Farmers list their products independently', 'Buyers contact farmers directly', 'Reduced dependency on middlemen']
                },
                SECTION_2: {
                    TITLE: '2. ApnaFarmer Mobile App',
                    DESC: 'An easy-to-use and farmer-friendly mobile application.',
                    POINTS: ['Farmer profiles and product listings', 'Direct calling and messaging facility', 'Local and regional market exposure']
                },
                SECTION_3: {
                    TITLE: '3. Agriculture Marketplace',
                    DESC: 'A trusted digital marketplace for agricultural inputs.',
                    POINTS: ['Seeds, fertilizers, and pesticides', 'Connection with reliable suppliers', 'One-stop solution for farmers']
                },
                SECTION_4: {
                    TITLE: '4. Market Price & Demand Information',
                    DESC: 'Helping farmers make informed decisions.',
                    POINTS: ['Crop market price updates', 'Demand-based selling planning', 'Better timing for improved returns']
                },
                SECTION_5: {
                    TITLE: '5. Farming Advisory & Support',
                    DESC: 'Guidance for smart and sustainable farming.',
                    POINTS: ['Weather-based advisory', 'Crop productivity improvement tips', 'Focus on reducing losses and increasing production']
                },
                SECTION_6: {
                    TITLE: '6. Value Addition & Farmer Empowerment',
                    DESC: 'Empowering farmers to become agri-entrepreneurs.',
                    POINTS: ['Guidance on processing and value addition', 'Connection with local businesses and MSMEs', 'Opportunities for additional income']
                }
            },
            WHY_CHOOSE: {
                TITLE: 'Why Choose ApnaFarmer?',
                POINTS: ['Farmer-centric digital platform', 'Simple process with local language support', 'Transparent and direct connections', 'Strong focus on increasing farmers’ income']
            },
            VISION: {
                TITLE: 'Our Vision',
                DESC: 'To empower farmers through technology and make Indian agriculture more profitable and self-reliant.'
            }
        },

        POST_REQUIREMENT_TITLE: 'Post Your Requirement',
        POST_REQUIREMENT_SUBTITLE: 'Product Name ___ | Quantity ___',
        POST_REQUIREMENT_BUTTON: 'Post Requirement',
        SELL_CROP_TITLE: 'Sell Your Crop',
        SELL_CROP_SUBTITLE: 'Crop Name ___ | Price ___ | Quantity/Weight ___',
        SELL_CROP_BUTTON: 'Sell Crop',
        YOUR_CROPS: 'Your Crops',
        SERVICES_AVAILABLE: 'Services Available',
        BUYERS_REQUIREMENTS: 'Buyers Requirements',
        NEAR_BY_AGROSHOP: 'Near By AgroShop',
        CATEGORY: 'Category',

        REQUIREMENTS: 'Your Requirements',
        NO_REQUIREMENT: 'No requirement post yet.',
        I_WANT_TO_BUY: 'I want to buy',

        BUYERS_SEARCH: 'Search Buyers',
        BUYERS_EMPTY: 'No Buyers found',
        BUYER_NAME: 'Buyer Name',
        BUYER_FOLLOW: 'Follow',
        BUYER_DEALSIN: 'Deals In',

        FARMERS_SEARCH: 'Search Farmer By Crop Name',
        FARMERS_EMPTY: 'No Farmer Found',

        FAVORITES: 'Favorites',
        FAV_CROPS: 'Favourite Crops',
        FAV_FARMER: 'Favourite Farmer',
        FAV_BUYERS: 'Favourite Buyers',

        PROFILE: 'Profile',
        EDIT_PROFILE: 'Edit Profile',

        CHOOSE_LANGUAGE: 'Choose Your Language',
        CHOOSE_LANGUAGE_SUBTITLE: 'भाषा चुनें',

        CROP_NAME: 'Crop Name',
        TYPE: 'Type',

        FOLLOW_US_SOCIAL_MEDIA: 'Follow Us On Social Media',
        COME_BE_PART: 'Come, be a part of our journey',
        INFORMATION: 'INFORMATION',
        CONTACT_US: 'CONTACT US',
        SUBSCRIBE_NEWSLETTER: 'Subscribe Our Newsletter',
        ENTER_EMAIL: 'Enter your email id',
        SEND: 'Send',
        FOLLOW_SOCIAL_MEDIA: 'Follow on Social Media',
        TOLL_FREE: 'Toll Free Number:',
        TIMING: 'Timing:',
        ABOUT_US: 'About Us',
        CANCELLATION_POLICY: 'Cancellation Policy',
        GENERAL_TERMS: 'General Terms & Conditions',
        GRIEVANCE_POLICY: 'Grievance Redressal Policy',
        RETURN_REFUND_POLICY: 'Return/Refund Policy',
        SHIPPING_POLICY: 'Shipping Policy',
        BLOGS: 'Blogs',
        CAUTION_NOTICE: 'Caution Notice',
        FAQ: 'Faq',
        PRIVACY_POLICY: 'Privacy Policy',
        SITE_MAP: 'Site Map',
        ALL_RIGHTS_RESERVED: '© 2025 Apna Farmer All Rights Reserved.',
        COMING_SOON: 'Coming Soon',
    },
    hi: {
        HOME: 'होम',
        SEARCH: 'खोजें',
        VIEW_ALL: 'सभी देखें',
        CALL: 'कॉल करें',
        MESSAGE: 'संदेश',
        VIEW_DETAILS: 'विवरण देखें',
        POSTED: 'पोस्ट किया गया',
        DESCRIPTION: 'विवरण',
        LOCATION: 'स्थान',
        QUANTITY: 'मात्रा',
        RATE: 'दर',
        QUALITY: 'गुणवत्ता',
        POST_DATE: 'पोस्ट की तारीख',
        AVAILABLE_DATE: 'उपलब्ध तारीख',
        ABOUT_CROP: 'फसल के बारे में',
        NOT_AVAILABLE: 'उपलब्ध नहीं',

        drawer: {
            HOME: 'होम',
            PROFILE: 'प्रोफ़ाइल',
            FAVORITES: 'पसंदीदा',
            MY_CROPS: 'मेरी फसलें',
            POST_REQUIREMENT: 'अपनी आवश्यकता पोस्ट करें',
            VIEW_REQUIREMENT: 'आवश्यकता पोस्ट देखें',
            CALLS_RECEIVED: 'प्राप्त कॉल',
            CHAT: 'चैट',
            ABOUT_US: 'हमारे बारे में',
            CONTACT_US: 'संपर्क करें',
            SHARE_APP: 'ऐप साझा करें',
            LANGUAGE: 'भाषा',
            TERMS_CONDITIONS: 'नियम और शर्तें',
            LOGOUT: 'लॉगआउट',
            AGROBIZ: 'एग्रोबिज़',
            BUYERS: 'खरीदार',
            FARMERS: 'किसान',
            OUR_SERVICES: 'हमारी सेवाएं',
        },

        OUR_SERVICES_PAGE: {
            TITLE: 'हमारी सेवाएं',
            COMPANY_NAME: 'अपना फार्मर टेक्नोलॉजी प्रा. लि.',
            DESCRIPTION: 'अपना फार्मर टेक्नोलॉजी प्रा. लि. एक विश्वसनीय और पारदर्शी डिजिटल प्लेटफॉर्म के माध्यम से किसानों और खरीदारों को जोड़ता है, जिससे किसानों को उनकी उपज का सही मूल्य मिलता है और खरीदारों को सीधे स्रोत से उच्च गुणवत्ता वाले कृषि उत्पाद प्राप्त होते हैं।',
            SECTIONS: {
                SECTION_1: {
                    TITLE: '1. किसान-खरीदार सीधा संपर्क',
                    DESC: 'हम किसानों और खरीदारों को सीधे जोड़ते हैं।',
                    POINTS: ['किसान अपने उत्पादों को स्वतंत्र रूप से सूचीबद्ध करते हैं', 'खरीदार सीधे किसानों से संपर्क करते हैं', 'बिचौलियों पर निर्भरता कम']
                },
                SECTION_2: {
                    TITLE: '2. अपना किसान मोबाइल ऐप',
                    DESC: 'उपयोग में आसान और किसान-अनुकूल मोबाइल एप्लिकेशन।',
                    POINTS: ['किसान प्रोफाइल और उत्पाद लिस्टिंग', 'सीधी कॉल और मैसेजिंग सुविधा', 'स्थानीय और क्षेत्रीय बाजार पहुंच']
                },
                SECTION_3: {
                    TITLE: '3. कृषि बाजार',
                    DESC: 'कृषि आदानों के लिए एक विश्वसनीय डिजिटल बाजार।',
                    POINTS: ['बीज, उर्वरक और कीटनाशक', 'विश्वसनीय आपूर्तिकर्ताओं के साथ जुड़ाव', 'किसानों के लिए वन-स्टॉप समाधान']
                },
                SECTION_4: {
                    TITLE: '4. बाजार भाव और मांग की जानकारी',
                    DESC: 'किसानों को सूचित निर्णय लेने में मदद करना।',
                    POINTS: ['फसल बाजार भाव अपडेट', 'मांग-आधारित बिक्री योजना', 'बेहतर रिटर्न के लिए सही समय']
                },
                SECTION_5: {
                    TITLE: '5. खेती सलाह और सहायता',
                    DESC: 'स्मार्ट और टिकाऊ खेती के लिए मार्गदर्शन।',
                    POINTS: ['मौसम आधारित सलाह', 'फसल उत्पादकता सुधार युक्तियाँ', 'नुकसान कम करने और उत्पादन बढ़ाने पर ध्यान']
                },
                SECTION_6: {
                    TITLE: '6. मूल्य संवर्धन और किसान सशक्तिकरण',
                    DESC: 'किसानों को कृषि-उद्यमी बनने के लिए सशक्त बनाना।',
                    POINTS: ['प्रसंस्करण और मूल्य संवर्धन पर मार्गदर्शन', 'स्थानीय व्यवसायों और MSMEs के साथ जुड़ाव', 'अतिरिक्त आय के अवसर']
                }
            },
            WHY_CHOOSE: {
                TITLE: 'अपना किसान क्यों चुनें?',
                POINTS: ['किसान-केंद्रित डिजिटल मंच', 'स्थानीय भाषा समर्थन के साथ सरल प्रक्रिया', 'पारदर्शी और सीधे संबंध', 'किसानों की आय बढ़ाने पर जोर']
            },
            VISION: {
                TITLE: 'हमारा विजन',
                DESC: 'तकनीक के माध्यम से किसानों को सशक्त बनाना और भारतीय कृषि को अधिक लाभदायक और आत्मनिर्भर बनाना।'
            }
        },

        POST_REQUIREMENT_TITLE: 'अपनी आवश्यकता पोस्ट करें',
        POST_REQUIREMENT_SUBTITLE: 'उत्पाद का नाम ___ | मात्रा ___',
        POST_REQUIREMENT_BUTTON: 'आवश्यकता पोस्ट करें',
        SELL_CROP_TITLE: 'अपनी फसल बेचें',
        SELL_CROP_SUBTITLE: 'फसल का नाम ___ | मूल्य ___ | मात्रा/वजन ___',
        SELL_CROP_BUTTON: 'फसल बेचें',
        YOUR_CROPS: 'आपकी फसलें',
        SERVICES_AVAILABLE: 'उपलब्ध सेवाएं',
        BUYERS_REQUIREMENTS: 'खरीदारों की आवश्यकताएं',
        NEAR_BY_AGROSHOP: 'आस-पास के एग्रोशॉप',
        CATEGORY: 'श्रेणी',

        REQUIREMENTS: 'आपकी आवश्यकताएं',
        NO_REQUIREMENT: 'अभी तक कोई आवश्यकता पोस्ट नहीं की गई।',
        I_WANT_TO_BUY: 'मैं खरीदना चाहता हूं',

        BUYERS_SEARCH: 'खरीदार खोजें',
        BUYERS_EMPTY: 'कोई खरीदार नहीं मिला',
        BUYER_NAME: 'खरीदार का नाम',
        BUYER_FOLLOW: 'फॉलो करें',
        BUYER_DEALSIN: 'व्यापार करता है',

        FARMERS_SEARCH: 'फसल के नाम से किसान खोजें',
        FARMERS_EMPTY: 'कोई किसान नहीं मिला',

        FAVORITES: 'पसंदीदा',
        FAV_CROPS: 'पसंदीदा फसलें',
        FAV_FARMER: 'पसंदीदा किसान',
        FAV_BUYERS: 'पसंदीदा खरीदार',

        PROFILE: 'प्रोफ़ाइल',
        EDIT_PROFILE: 'प्रोफ़ाइल संपादित करें',

        CHOOSE_LANGUAGE: 'अपनी भाषा चुनें',
        CHOOSE_LANGUAGE_SUBTITLE: 'भाषा चुनें',

        CROP_NAME: 'फसल का नाम',
        TYPE: 'प्रकार',

        FOLLOW_US_SOCIAL_MEDIA: 'सोशल मीडिया पर हमें फॉलो करें',
        COME_BE_PART: 'आइए, हमारी यात्रा का हिस्सा बनें',
        INFORMATION: 'जानकारी',
        CONTACT_US: 'संपर्क करें',
        SUBSCRIBE_NEWSLETTER: 'हमारे न्यूज़लेटर की सदस्यता लें',
        ENTER_EMAIL: 'अपना ईमेल आईडी दर्ज करें',
        SEND: 'भेजें',
        FOLLOW_SOCIAL_MEDIA: 'सोशल मीडिया पर फॉलो करें',
        TOLL_FREE: 'टोल फ्री नंबर:',
        TIMING: 'समय:',
        ABOUT_US: 'हमारे बारे में',
        CANCELLATION_POLICY: 'रद्दीकरण नीति',
        GENERAL_TERMS: 'सामान्य नियम और शर्तें',
        GRIEVANCE_POLICY: 'शिकायत निवारण नीति',
        RETURN_REFUND_POLICY: 'वापसी/रिफंड नीति',
        SHIPPING_POLICY: 'शिपिंग नीति',
        BLOGS: 'ब्लॉग',
        CAUTION_NOTICE: 'सावधानी सूचना',
        FAQ: 'अक्सर पूछे जाने वाले प्रश्न',
        PRIVACY_POLICY: 'गोपनीयता नीति',
        SITE_MAP: 'साइट मैप',
        ALL_RIGHTS_RESERVED: '© 2025 अपना किसान सभी अधिकार सुरक्षित।',
        COMING_SOON: 'जल्द आ रहा है',
    },
    ma: {
        HOME: 'होम',
        SEARCH: 'शोधा',
        VIEW_ALL: 'सर्व पहा',
        CALL: 'कॉल करा',
        MESSAGE: 'संदेश',
        VIEW_DETAILS: 'तपशील पहा',
        POSTED: 'पोस्ट केले',
        DESCRIPTION: 'विवरण',
        LOCATION: 'स्थान',
        QUANTITY: 'प्रमाण',
        RATE: 'दर',
        QUALITY: 'गुणवत्ता',
        POST_DATE: 'पोस्ट तारीख',
        AVAILABLE_DATE: 'उपलब्ध तारीख',
        ABOUT_CROP: 'पिकाबद्दल',
        NOT_AVAILABLE: 'उपलब्ध नाही',

        drawer: {
            HOME: 'होम',
            PROFILE: 'प्रोफाइल',
            FAVORITES: 'आवडीचे',
            MY_CROPS: 'माझ्या पिके',
            POST_REQUIREMENT: 'तुमची आवश्यकता पोस्ट करा',
            VIEW_REQUIREMENT: 'आवश्यकता पोस्ट पहा',
            CALLS_RECEIVED: 'मिळालेले कॉल',
            CHAT: 'चॅट',
            ABOUT_US: 'आमच्याबद्दल',
            CONTACT_US: 'संपर्क करा',
            SHARE_APP: 'अॅप शेअर करा',
            LANGUAGE: 'भाषा',
            TERMS_CONDITIONS: 'अटी आणि नियम',
            LOGOUT: 'लॉगआउट',
            AGROBIZ: 'एग्रोबिझ',
            BUYERS: 'खरेदीदार',
            FARMERS: 'शेतकरी',
            OUR_SERVICES: 'आमच्या सेवा',
        },

        OUR_SERVICES_PAGE: {
            TITLE: 'आमच्या सेवा',
            COMPANY_NAME: 'अपना फार्मर टेक्नॉलॉजी प्रा. लि.',
            DESCRIPTION: 'अपना फार्मर टेक्नॉलॉजी प्रा. लि. शेतकरी आणि खरेदीदार यांना डिजिटल, विश्वसनीय आणि पारदर्शक मंचाद्वारे जोडते, ज्यामुळे शेतकऱ्यांना त्यांच्या मालाला योग्य भाव मिळतो आणि खरेदीदारांना थेट स्त्रोताकडून उच्च दर्जाचे कृषी उत्पादने मिळतात.',
            SECTIONS: {
                SECTION_1: {
                    TITLE: '1. शेतकरी-खरेदीदार थेट संपर्क',
                    DESC: 'आम्ही शेतकरी आणि खरेदीदारांना थेट जोडतो.',
                    POINTS: ['शेतकरी स्वतंत्रपणे आपली उत्पादने सूचीबद्ध करतात', 'खरेदीदार थेट शेतकऱ्यांशी संपर्क साधतात', 'मध्यस्थांवर अवलंबून राहणे कमी']
                },
                SECTION_2: {
                    TITLE: '2. अपना फार्मर मोबाइल अॅप',
                    DESC: 'वापरण्यास सोपे आणि शेतकरी-अनुकूल मोबाइल ऍप्लिकेशन.',
                    POINTS: ['शेतकरी प्रोफाइल आणि उत्पादन सूची', 'थेट कॉलिंग आणि मेसेजिंग सुविधा', 'स्थानिक आणि प्रादेशिक बाजार पेठ पोहोच']
                },
                SECTION_3: {
                    TITLE: '3. कृषी बाजार',
                    DESC: 'कृषी निविष्ठांसाठी एक विश्वसनीय डिजिटल बाजारपेठ.',
                    POINTS: ['बियाणे, खते आणि कीटकनाशके', 'विश्वसनीय पुरवठादारांशी जोडणी', 'शेतकऱ्यांसाठी वन-स्टॉप सोल्यूशन']
                },
                SECTION_4: {
                    TITLE: '4. बाजार भाव आणि मागणीची माहिती',
                    DESC: 'शेतकऱ्यांना माहितीपूर्ण निर्णय घेण्यास मदत करणे.',
                    POINTS: ['पीक बाजार भाव अपडेट', 'मागणी-आधारित विक्री नियोजन', 'चांगल्या परताव्यासाठी योग्य वेळ']
                },
                SECTION_5: {
                    TITLE: '5. शेती सल्ला आणि सहाय्य',
                    DESC: 'स्मार्ट आणि शाश्वत शेतीसाठी मार्गदर्शन.',
                    POINTS: ['हवामान आधारित सल्ला', 'पीक उत्पादकता सुधारण्याच्या टिप्स', 'नुकसान कमी करणे आणि उत्पादन वाढवण्यावर भर']
                },
                SECTION_6: {
                    TITLE: '6. मूल्यवर्धन आणि शेतकरी सक्षमीकरण',
                    DESC: 'शेतकऱ्यांना कृषी-उद्योजक बनण्यासाठी सक्षम करणे.',
                    POINTS: ['प्रक्रिया आणि मूल्यवर्धनावर मार्गदर्शन', 'स्थानिक व्यवसाय आणि MSME सोबत जोडणी', 'अतिरिक्त उत्पन्नाच्या संधी']
                }
            },
            WHY_CHOOSE: {
                TITLE: 'अपना फार्मर का निवडावे?',
                POINTS: ['शेतकरी-केंद्रित डिजिटल मंच', 'स्थानिक भाषा समर्थनासह सोपी प्रक्रिया', 'पारदर्शक आणि थेट संबंध', 'शेतकऱ्यांचे उत्पन्न वाढवण्यावर भर']
            },
            VISION: {
                TITLE: 'आमचे व्हिजन',
                DESC: 'तंत्रज्ञानाद्वारे शेतकऱ्यांना सक्षम करणे आणि भारतीय शेती अधिक फायदेशीर आणि स्वावलंबी करणे.'
            }
        },

        POST_REQUIREMENT_TITLE: 'तुमची आवश्यकता पोस्ट करा',
        POST_REQUIREMENT_SUBTITLE: 'उत्पादनाचे नाव ___ | प्रमाण ___',
        POST_REQUIREMENT_BUTTON: 'आवश्यकता पोस्ट करा',
        SELL_CROP_TITLE: 'तुमचे पीक विका',
        SELL_CROP_SUBTITLE: 'पिकाचे नाव ___ | किंमत ___ | प्रमाण/वजन ___',
        SELL_CROP_BUTTON: 'पीक विका',
        YOUR_CROPS: 'तुमची पिके',
        SERVICES_AVAILABLE: 'उपलब्ध सेवा',
        BUYERS_REQUIREMENTS: 'खरेदीदारांच्या आवश्यकता',
        NEAR_BY_AGROSHOP: 'जवळचे एग्रोशॉप',
        CATEGORY: 'श्रेणी',

        REQUIREMENTS: 'तुमच्या आवश्यकता',
        NO_REQUIREMENT: 'अद्याप कोणतीही आवश्यकता पोस्ट केलेली नाही.',
        I_WANT_TO_BUY: 'मला खरेदी करायचे आहे',

        BUYERS_SEARCH: 'खरेदीदार शोधा',
        BUYERS_EMPTY: 'कोणतेही खरेदीदार सापडले नाहीत',
        BUYER_NAME: 'खरेदीदाराचे नाव',
        BUYER_FOLLOW: 'फॉलो करा',
        BUYER_DEALSIN: 'व्यवहार करतो',

        FARMERS_SEARCH: 'पिकाच्या नावाने शेतकरी शोधा',
        FARMERS_EMPTY: 'कोणताही शेतकरी सापडला नाही',

        FAVORITES: 'आवडीचे',
        FAV_CROPS: 'आवडीची पिके',
        FAV_FARMER: 'आवडीचा शेतकरी',
        FAV_BUYERS: 'आवडीचे खरेदीदार',

        PROFILE: 'प्रोफाइल',
        EDIT_PROFILE: 'प्रोफाइल संपादित करा',

        CHOOSE_LANGUAGE: 'तुमची भाषा निवडा',
        CHOOSE_LANGUAGE_SUBTITLE: 'भाषा निवडा',

        CROP_NAME: 'पिकाचे नाव',
        TYPE: 'प्रकार',

        FOLLOW_US_SOCIAL_MEDIA: 'सोशल मीडियावर आम्हाला फॉलो करा',
        COME_BE_PART: 'ये, आमच्या प्रवासाचा भाग व्हा',
        INFORMATION: 'माहिती',
        CONTACT_US: 'संपर्क करा',
        SUBSCRIBE_NEWSLETTER: 'आमच्या न्यूज़लेटरची सदस्यता घ्या',
        ENTER_EMAIL: 'तुमचा ईमेल आयडी प्रविष्ट करा',
        SEND: 'पाठवा',
        FOLLOW_SOCIAL_MEDIA: 'सोशल मीडियावर फॉलो करा',
        TOLL_FREE: 'टोल फ्री नंबर:',
        TIMING: 'वेळ:',
        ABOUT_US: 'आमच्याबद्दल',
        CANCELLATION_POLICY: 'रद्द करण्याची नीति',
        GENERAL_TERMS: 'सामान्य अटी आणि नियम',
        GRIEVANCE_POLICY: 'तक्रार निवारण नीति',
        RETURN_REFUND_POLICY: 'परतावा/रिफंड नीति',
        SHIPPING_POLICY: 'शिपिंग नीति',
        BLOGS: 'ब्लॉग',
        CAUTION_NOTICE: 'सावधानता सूचना',
        FAQ: 'नेहमी विचारले जाणारे प्रश्न',
        PRIVACY_POLICY: 'गोपनीयता नीति',
        SITE_MAP: 'साइट नकाशा',
        ALL_RIGHTS_RESERVED: '© 2025 अपना किसान सर्व हक्क सुरक्षित।',
        COMING_SOON: 'लवकरच येत आहे',
    },
    gu: {
        HOME: 'હોમ',
        SEARCH: 'શોધો',
        VIEW_ALL: 'બધું જુઓ',
        CALL: 'કૉલ કરો',
        MESSAGE: 'સંદેશ',
        VIEW_DETAILS: 'વિગતો જુઓ',
        POSTED: 'પોસ્ટ કર્યું',
        DESCRIPTION: 'વર્ણન',
        LOCATION: 'સ્થાન',
        QUANTITY: 'જથ્થો',
        RATE: 'દર',
        QUALITY: 'ગુણવત્તા',
        POST_DATE: 'પોસ્ટ તારીખ',
        AVAILABLE_DATE: 'ઉપલબ્ધ તારીખ',
        ABOUT_CROP: 'પાક વિશે',
        NOT_AVAILABLE: 'ઉપલબ્ધ નથી',

        drawer: {
            HOME: 'હોમ',
            PROFILE: 'પ્રોફાઇલ',
            FAVORITES: 'મનપસંદ',
            MY_CROPS: 'મારા પાક',
            POST_REQUIREMENT: 'તમારી જરૂરિયાત પોસ્ટ કરો',
            VIEW_REQUIREMENT: 'જરૂરિયાત પોસ્ટ જુઓ',
            CALLS_RECEIVED: 'પ્રાપ્ત કૉલ્સ',
            CHAT: 'ચેટ',
            ABOUT_US: 'અમારા વિશે',
            CONTACT_US: 'સંપર્ક કરો',
            SHARE_APP: 'એપ શેર કરો',
            LANGUAGE: 'ભાષા',
            TERMS_CONDITIONS: 'નિયમો અને શરતો',
            LOGOUT: 'લૉગઆઉટ',
            AGROBIZ: 'એગ્રોબિઝ',
            BUYERS: 'ખરીદદારો',
            FARMERS: 'કૃષકો',
            OUR_SERVICES: 'અમારી સેવાઓ',
        },

        OUR_SERVICES_PAGE: {
            TITLE: 'અમારી સેવાઓ',
            COMPANY_NAME: 'અપના ફાર્મર ટેક્નોલોજી પ્રા. લિ.',
            DESCRIPTION: 'અપના ફાર્મર ટેક્નોલોજી પ્રા. લિ. કૃષકો અને ખરીદદારોને ડિજિટલ, વિશ્વસનીય અને પારદર્શક પ્લેટફોર્મ દ્વારા જોડે છે, જે કૃષકોને તેમના ઉત્પાદનનું યોગ્ય મૂલ્ય પ્રાપ્ત કરવામાં મદદ કરે છે જ્યારે ખરીદદારોને સીધા સ્ત્રોતમાંથી ઉચ્ચ ગુણવત્તાવાળા કૃષિ ઉત્પાદનો મેળવવામાં સક્ષમ બનાવે છે.',
            SECTIONS: {
                SECTION_1: {
                    TITLE: '1. કૃષક-ખરીદદાર સીધો સંપર્ક',
                    DESC: 'અમે કૃષકો અને ખરીદદારોને સીધા જોડીએ છીએ.',
                    POINTS: ['કૃષકો તેમના ઉત્પાદનો સ્વતંત્ર રીતે સૂચિબદ્ધ કરે છે', 'ખરીદદારો કૃષકોનો સીધો સંપર્ક કરે છે', 'મધ્યસ્થીઓ પર નિર્ભરતા ઘટી']
                },
                SECTION_2: {
                    TITLE: '2. અપના ફાર્મર મોબાઇલ એપ',
                    DESC: 'વાપરવા માટે સરળ અને કૃષક-મૈત્રીપૂર્ણ મોબાઇલ એપ્લિકેશન.',
                    POINTS: ['કૃષક પ્રોફાઇલ અને ઉત્પાદન સૂચિ', 'સીધી કૉલિંગ અને મેસેજિંગ સુવિધા', 'સ્થાનિક અને પ્રાદેશિક બજાર એક્સપોઝર']
                },
                SECTION_3: {
                    TITLE: '3. કૃષિ બજાર',
                    DESC: 'કૃષિ ઇનપુટ્સ માટે એક વિશ્વસનીય ડિજિટલ બજાર.',
                    POINTS: ['બિયારણ, ખાતર અને જંતુનાશકો', 'વિશ્વસનીય સપ્લાયર્સ સાથે જોડાણ', 'કૃષકો માટે વન-સ્ટોપ સોલ્યુશન']
                },
                SECTION_4: {
                    TITLE: '4. બજાર ભાવ અને માંગ માહિતી',
                    DESC: 'કૃષકોને માહિતગાર નિર્ણયો લેવામાં મદદ કરે છે.',
                    POINTS: ['પાક બજાર ભાવ અપડેટ્સ', 'માંગ-આધારિત વેચાણ આયોજન', 'સારા વળતર માટે સારો સમય']
                },
                SECTION_5: {
                    TITLE: '5. ખેતી સલાહ અને સહાય',
                    DESC: 'સ્માર્ટ અને ટકાઉ ખેતી માટે માર્ગદર્શન.',
                    POINTS: ['હવામાન આધારિત સલાહ', 'પાક ઉત્પાદકતા સુધારણા ટિપ્સ', 'નુકસાન ઘટાડવા અને ઉત્પાદન વધારવા પર ધ્યાન']
                },
                SECTION_6: {
                    TITLE: '6. મૂલ્ય સંવર્ધન અને કૃષક સશક્તિકરણ',
                    DESC: 'કૃષકોને કૃષિ-ઉદ્યોગસાહસિક બનવા માટે સશક્ત બનાવવું.',
                    POINTS: ['પ્રક્રિયા અને મૂલ્ય સંવર્ધન પર માર્ગદર્શન', 'સ્થાનિક વ્યવસાયો અને MSME સાથે જોડાણ', 'વધારાની આવકની તકો']
                }
            },
            WHY_CHOOSE: {
                TITLE: 'અપના ફાર્મર શા માટે પસંદ કરો?',
                POINTS: ['કૃષક-કેન્દ્રિત ડિજિટલ પ્લેટફોર્મ', 'સ્થાનિક ભાષા સમર્થન સાથે સરળ પ્રક્રિયા', 'પારદર્શક અને સીધા જોડાણો', 'કૃષકોની આવક વધારવા પર મજબૂત ધ્યાન']
            },
            VISION: {
                TITLE: 'અમારું વિઝન',
                DESC: 'ટેક્નોલોજી દ્વારા કૃષકોને સશક્ત બનાવવા અને ભારતીય કૃષિને વધુ નફાકારક અને આત્મનિર્ભર બનાવવી.'
            }
        },

        POST_REQUIREMENT_TITLE: 'તમારી જરૂરિયાત પોસ્ટ કરો',
        POST_REQUIREMENT_SUBTITLE: 'ઉત્પાદનનું નામ ___ | જથ્થો ___',
        POST_REQUIREMENT_BUTTON: 'જરૂરિયાત પોસ્ટ કરો',
        SELL_CROP_TITLE: 'તમારો પાક વેચો',
        SELL_CROP_SUBTITLE: 'પાકનું નામ ___ | કિંમત ___ | જથ્થો/વજન ___',
        SELL_CROP_BUTTON: 'પાક વેચો',
        YOUR_CROPS: 'તમારા પાક',
        SERVICES_AVAILABLE: 'ઉપલબ્ધ સેવાઓ',
        BUYERS_REQUIREMENTS: 'ખરીદદારોની જરૂરિયાતો',
        NEAR_BY_AGROSHOP: 'નજીકના એગ્રોશોપ',
        CATEGORY: 'શ્રેણી',

        REQUIREMENTS: 'તમારી જરૂરિયાતો',
        NO_REQUIREMENT: 'હજુ સુધી કોઈ જરૂરિયાત પોસ્ટ કરવામાં આવી નથી.',
        I_WANT_TO_BUY: 'હું ખરીદવા માંગુ છું',

        BUYERS_SEARCH: 'ખરીદદારો શોધો',
        BUYERS_EMPTY: 'કોઈ ખરીદદાર મળ્યા નથી',
        BUYER_NAME: 'ખરીદદારનું નામ',
        BUYER_FOLLOW: 'અનુસરો',
        BUYER_DEALSIN: 'વ્યવહાર કરે છે',

        FARMERS_SEARCH: 'પાકના નામથી કૃષક શોધો',
        FARMERS_EMPTY: 'કોઈ કૃષક મળ્યો નથી',

        FAVORITES: 'મનપસંદ',
        FAV_CROPS: 'મનપસંદ પાક',
        FAV_FARMER: 'મનપસંદ કૃષક',
        FAV_BUYERS: 'મનપસંદ ખરીદદારો',

        PROFILE: 'પ્રોફાઇલ',
        EDIT_PROFILE: 'પ્રોફાઇલ સંપાદિત કરો',

        CHOOSE_LANGUAGE: 'તમારી ભાષા પસંદ કરો',
        CHOOSE_LANGUAGE_SUBTITLE: 'ભાષા પસંદ કરો',

        CROP_NAME: 'પાકનું નામ',
        TYPE: 'પ્રકાર',

        FOLLOW_US_SOCIAL_MEDIA: 'સોશિયલ મીડિયા પર અમને ફોલો કરો',
        COME_BE_PART: 'આવો, અમારી યાત્રાનો ભાગ બનો',
        INFORMATION: 'માહિતી',
        CONTACT_US: 'અમારો સંપર્ક કરો',
        SUBSCRIBE_NEWSLETTER: 'અમારા ન્યૂઝલેટરની સભ્યતા લો',
        ENTER_EMAIL: 'તમારું ઇમેઇલ આઈડી દાખલ કરો',
        SEND: 'મોકલો',
        FOLLOW_SOCIAL_MEDIA: 'સોશિયલ મીડિયા પર ફોલો કરો',
        TOLL_FREE: 'ટોલ ફ્રી નંબર:',
        TIMING: 'સમય:',
        ABOUT_US: 'અમારા વિશે',
        CANCELLATION_POLICY: 'રદ કરવાની નીતિ',
        GENERAL_TERMS: 'સામાન્ય શરતો અને નિયમો',
        GRIEVANCE_POLICY: 'ફરિયાદ નિવારણ નીતિ',
        RETURN_REFUND_POLICY: 'રિટર્ન/રિફંડ નીતિ',
        SHIPPING_POLICY: 'શિપિંગ નીતિ',
        BLOGS: 'બ્લોગ્સ',
        CAUTION_NOTICE: 'સાવધાની સૂચના',
        FAQ: 'વારંવાર પૂછાતા પ્રશ્નો',
        PRIVACY_POLICY: 'ગોપનીયતા નીતિ',
        SITE_MAP: 'સાઇટ નકશો',
        ALL_RIGHTS_RESERVED: '© 2025 अपना किसान તમામ અધિકારો સુરક્ષિત.',
        COMING_SOON: 'ટૂંક સમયમાં આવી રહ્યું છે',
    },
};

export const getTranslations = (langCode: string): Translations => {
    return translations[langCode] || translations.en;
};

export default translations;
