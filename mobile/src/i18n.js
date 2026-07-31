// Full UI translations for all four languages.
// Marwari (mr) is Rajasthani in Devanagari — please review/refine as a native speaker.

export const STRINGS = {
  en: {
    tab_dashboard: "Dashboard", tab_scan: "Leaf Scan", tab_trap: "Trap Monitor", tab_agronomist: "Agronomist",
    scan_a_leaf: "Scan a leaf", ask_ai: "Ask AI",

    dash_eyebrow: "🌱 Poly-Guardian · Phase 1",
    greet_morning: "Good morning", greet_afternoon: "Good afternoon", greet_evening: "Good evening",
    greet_name: "{0}, Rakesh ji",
    dash_sub_empty: "Scan your first leaf to get an instant diagnosis and a full prescription.",
    dash_sub_issue: "Your last scan found {0} on {1}. {2} of your {3} scans need action — tap one below.",
    dash_sub_generic: "You've run {0} scans so far. Scan another leaf or ask the Agronomist.",
    stat_total: "Total scans", stat_issues: "Issues found", stat_healthy: "Healthy leaves", stat_week: "This week",
    recent_diagnoses: "Recent diagnoses", recent_diag_sub: "Tap any scan to re-open its prescription", new_scan: "New scan",
    no_scans: "No scans yet — tap “Scan a leaf”.",
    top_issues: "Top issues", top_issues_sub: "Across your scans", no_issues: "No diseases detected yet. 🌿",

    scan_eyebrow: "✨ Leaf Scan · Gemini + Groq",
    scan_title: "Point, shoot, diagnose.",
    scan_subtitle: "Snap a leaf and get the pest/disease, a confidence score, and a full prescription in seconds.",
    drop_title: "Scan a leaf", drop_sub: "Take a photo or choose one — works best on a clear, close leaf",
    take_photo: "Take photo", gallery: "Gallery", diagnose_leaf: "Diagnose leaf", retake: "Retake",
    diagnosing: "Diagnosing your leaf…", diagnosing_sub: "Poly-Guardian AI is looking closely (first scan can take a few seconds)",
    confidence: "Confidence", prescription: "PRESCRIPTION", not_identified: "NOT IDENTIFIED", plant: "PLANT",
    looks_healthy: "Looks healthy 🌿", no_disease: "No disease found", severity_suffix: "severity",
    rx_organic: "Organic remedy", rx_chemical: "Chemical treatment", rx_prevention: "Prevention", rx_warning: "When to get help",
    scan_another: "Scan another leaf",
    recent_scans: "Recent scans", tap_reopen: "Tap to re-open",
    camera_needed: "Camera needed", camera_needed_msg: "Please allow camera access to scan a leaf.", couldnt_diagnose: "Couldn't diagnose",

    trap_badge: "⚙️ PHASE 2 · TRAP-CAMERA KIT", trap_title: "Trap Monitor arrives in Phase 2",
    trap_body: "Automated sticky-trap cameras will live-count whiteflies, thrips and aphids per polyhouse using an on-device model. This screen switches on once the trap-camera hardware kit is installed.",
    use_leafscan: "Use Leaf Scan instead",

    agro_eyebrow: "🤖 Digital Agronomist",
    agro_title: "Ask about your polyhouse.",
    agro_subtitle: "Gen-AI advisor for Rajasthan crops — it knows your live context.",
    hear: "Hear", live_context: "Live context the AI sees", voice_label: "VOICE",
    voice_text: "🔊 Tap “Hear” on a reply to listen.  🎤 Tap the mic on your keyboard to speak your question.",
    composer_placeholder: "Type or use the keyboard mic…",
    ctx_polyhouse: "Polyhouse", ctx_temp: "Temp / Hum", ctx_vpd: "VPD", ctx_toppest: "Top pest", ctx_lastspray: "Last spray",
    greeting: "Namaste 🙏 I'm Poly-Guardian's Digital Agronomist. Ask me anything about your polyhouse — pests, diseases, spraying or climate. Today Polyhouse 2 has a mite risk of 78/100 — want me to explain?",
    suggest_1: "🐛 Lots of whitefly on my capsicum — what should I do?",
    suggest_2: "💧 VPD is 1.9 kPa — should I mist now?",
    suggest_3: "🌹 Why are there black spots on my rose leaves?",

    choose_language: "Choose your language", choose_language_sub: "अपनी भाषा चुनें · Apni bhasha chunein", cancel: "Cancel",
    lang_sub_en: "Answers in English", lang_sub_hinglish: "Hindi in English letters", lang_sub_hi: "Hindi · Devanagari", lang_sub_mr: "Rajasthani · Devanagari",

    just_now: "just now", min_ago: "{0} min ago", h_ago: "{0} h ago", yesterday: "Yesterday", days_ago: "{0} days ago",
  },

  hinglish: {
    tab_dashboard: "Dashboard", tab_scan: "Patti Scan", tab_trap: "Trap", tab_agronomist: "Salahkaar",
    scan_a_leaf: "Patti scan karo", ask_ai: "AI se pooch",

    dash_eyebrow: "🌱 Poly-Guardian · Phase 1",
    greet_morning: "Suprabhat", greet_afternoon: "Namaste", greet_evening: "Shubh sandhya",
    greet_name: "{0}, Rakesh ji",
    dash_sub_empty: "Apni pehli patti scan karo aur turant diagnosis + poora ilaaj pao.",
    dash_sub_issue: "Aapke pichle scan me {1} par {0} mila. Aapke {3} me se {2} scan par dhyan dena zaroori hai — neeche kisi par tap karo.",
    dash_sub_generic: "Aapne ab tak {0} scan kiye hain. Ek aur patti scan karo ya Salahkaar se pooch.",
    stat_total: "Total scan", stat_issues: "Samasya mili", stat_healthy: "Swasth patte", stat_week: "Is hafte",
    recent_diagnoses: "Recent diagnosis", recent_diag_sub: "Kisi bhi scan par tap karke uska ilaaj dobara dekho", new_scan: "Naya scan",
    no_scans: "Abhi koi scan nahi — “Patti scan karo” par tap karo.",
    top_issues: "Mukhya samasyaein", top_issues_sub: "Aapke sab scan me", no_issues: "Abhi koi bimari nahi mili. 🌿",

    scan_eyebrow: "✨ Patti Scan · Gemini + Groq",
    scan_title: "Photo lo, diagnosis pao.",
    scan_subtitle: "Patti ki photo lo aur kuch hi second me keet/bimari, confidence score aur poora ilaaj pao.",
    drop_title: "Patti scan karo", drop_sub: "Photo lo ya chuno — saaf, paas se li patti sabse achhi rehti hai",
    take_photo: "Photo lo", gallery: "Gallery", diagnose_leaf: "Diagnosis karo", retake: "Dobara lo",
    diagnosing: "Aapki patti ki jaanch ho rahi hai…", diagnosing_sub: "Poly-Guardian AI dhyan se dekh raha hai (pehla scan kuch second le sakta hai)",
    confidence: "Confidence", prescription: "ILAAJ", not_identified: "PEHCHAN NAHI HUI", plant: "PAUDHA",
    looks_healthy: "Swasth dikh raha hai 🌿", no_disease: "Koi bimari nahi mili", severity_suffix: "gambhirta",
    rx_organic: "Jaivik ilaaj", rx_chemical: "Rasayanik ilaaj", rx_prevention: "Bachav", rx_warning: "Kab expert se milein",
    scan_another: "Doosri patti scan karo",
    recent_scans: "Recent scan", tap_reopen: "Dobara dekhne ke liye tap karo",
    camera_needed: "Camera chahiye", camera_needed_msg: "Patti scan karne ke liye camera access do.", couldnt_diagnose: "Diagnosis nahi ho saka",

    trap_badge: "⚙️ PHASE 2 · TRAP-CAMERA KIT", trap_title: "Trap Monitor Phase 2 me aayega",
    trap_body: "Automatic sticky-trap camera har polyhouse me whitefly, thrips aur aphid ki ginti karenge. Yeh screen trap-camera hardware kit lagne ke baad chalu hogi.",
    use_leafscan: "Iski jagah Patti Scan use karo",

    agro_eyebrow: "🤖 Digital Agronomist",
    agro_title: "Apne polyhouse ke baare me pooch.",
    agro_subtitle: "Rajasthan ki faslon ke liye Gen-AI salahkaar — yeh aapka live context jaanta hai.",
    hear: "Suno", live_context: "AI jo live jaankari dekhta hai", voice_label: "AWAAZ",
    voice_text: "🔊 Jawab par “Suno” daba ke suno.  🎤 Apne keyboard ka mic daba ke bolo.",
    composer_placeholder: "Likho ya keyboard mic se bolo…",
    ctx_polyhouse: "Polyhouse", ctx_temp: "Taap / Nami", ctx_vpd: "VPD", ctx_toppest: "Mukhya keet", ctx_lastspray: "Pichla spray",
    greeting: "Namaste 🙏 Main hoon Poly-Guardian ka Digital Agronomist. Aap apne polyhouse ke baare me kuch bhi pooch sakte hain. Aaj Polyhouse 2 me mite risk 78/100 hai — chahein to iske baare me batau?",
    suggest_1: "🐛 Whitefly bahut lag rahi hai capsicum me, kya karu?",
    suggest_2: "💧 VPD is 1.9 kPa — should I mist now?",
    suggest_3: "🌹 Rose ke patton par kaale dhabbe kyu ho rahe hain?",

    choose_language: "Apni bhasha chuno", choose_language_sub: "Choose your language · अपनी भाषा चुनें", cancel: "Cancel",
    lang_sub_en: "Answers in English", lang_sub_hinglish: "English akshron me Hindi", lang_sub_hi: "Hindi · Devanagari", lang_sub_mr: "Rajasthani · Devanagari",

    just_now: "abhi", min_ago: "{0} min pehle", h_ago: "{0} ghante pehle", yesterday: "Kal", days_ago: "{0} din pehle",
  },

  hi: {
    tab_dashboard: "डैशबोर्ड", tab_scan: "पत्ती स्कैन", tab_trap: "ट्रैप", tab_agronomist: "सलाहकार",
    scan_a_leaf: "पत्ती स्कैन करें", ask_ai: "AI से पूछें",

    dash_eyebrow: "🌱 पॉली-गार्डियन · फेज़ 1",
    greet_morning: "सुप्रभात", greet_afternoon: "नमस्कार", greet_evening: "शुभ संध्या",
    greet_name: "{0}, राकेश जी",
    dash_sub_empty: "अपनी पहली पत्ती स्कैन करें और तुरंत निदान व पूरा इलाज पाएं।",
    dash_sub_issue: "आपके पिछले स्कैन में {1} पर {0} मिला। आपके {3} में से {2} स्कैन पर ध्यान देना ज़रूरी है — नीचे किसी पर टैप करें।",
    dash_sub_generic: "आपने अब तक {0} स्कैन किए हैं। एक और पत्ती स्कैन करें या सलाहकार से पूछें।",
    stat_total: "कुल स्कैन", stat_issues: "समस्याएँ मिलीं", stat_healthy: "स्वस्थ पत्तियाँ", stat_week: "इस हफ़्ते",
    recent_diagnoses: "हाल के निदान", recent_diag_sub: "किसी भी स्कैन पर टैप करके उसका इलाज फिर देखें", new_scan: "नया स्कैन",
    no_scans: "अभी कोई स्कैन नहीं — “पत्ती स्कैन करें” पर टैप करें।",
    top_issues: "मुख्य समस्याएँ", top_issues_sub: "आपके सभी स्कैन में", no_issues: "अभी कोई बीमारी नहीं मिली। 🌿",

    scan_eyebrow: "✨ पत्ती स्कैन · Gemini + Groq",
    scan_title: "फोटो लो, निदान पाओ।",
    scan_subtitle: "पत्ती की फोटो लें और कुछ ही सेकंड में कीट/बीमारी, कॉन्फिडेंस स्कोर और पूरा इलाज पाएं।",
    drop_title: "पत्ती स्कैन करें", drop_sub: "फोटो लें या चुनें — साफ, पास से ली पत्ती सबसे अच्छी रहती है",
    take_photo: "फोटो लें", gallery: "गैलरी", diagnose_leaf: "निदान करें", retake: "फिर से लें",
    diagnosing: "आपकी पत्ती की जाँच हो रही है…", diagnosing_sub: "पॉली-गार्डियन AI ध्यान से देख रहा है (पहला स्कैन कुछ सेकंड ले सकता है)",
    confidence: "कॉन्फिडेंस", prescription: "इलाज", not_identified: "पहचान नहीं हुई", plant: "पौधा",
    looks_healthy: "स्वस्थ दिख रहा है 🌿", no_disease: "कोई बीमारी नहीं मिली", severity_suffix: "गंभीरता",
    rx_organic: "जैविक उपचार", rx_chemical: "रासायनिक उपचार", rx_prevention: "बचाव", rx_warning: "कब विशेषज्ञ से मिलें",
    scan_another: "दूसरी पत्ती स्कैन करें",
    recent_scans: "हाल के स्कैन", tap_reopen: "फिर देखने के लिए टैप करें",
    camera_needed: "कैमरा चाहिए", camera_needed_msg: "पत्ती स्कैन करने के लिए कैमरा एक्सेस दें।", couldnt_diagnose: "निदान नहीं हो सका",

    trap_badge: "⚙️ फेज़ 2 · ट्रैप-कैमरा किट", trap_title: "ट्रैप मॉनिटर फेज़ 2 में आएगा",
    trap_body: "ऑटोमैटिक स्टिकी-ट्रैप कैमरे हर पॉलीहाउस में सफेद मक्खी, थ्रिप्स और माहू की गिनती करेंगे। यह स्क्रीन ट्रैप-कैमरा हार्डवेयर किट लगने के बाद चालू होगी।",
    use_leafscan: "इसकी जगह पत्ती स्कैन इस्तेमाल करें",

    agro_eyebrow: "🤖 डिजिटल एग्रोनॉमिस्ट",
    agro_title: "अपने पॉलीहाउस के बारे में पूछें।",
    agro_subtitle: "राजस्थान की फसलों के लिए Gen-AI सलाहकार — यह आपका लाइव संदर्भ जानता है।",
    hear: "सुनें", live_context: "AI जो लाइव जानकारी देखता है", voice_label: "आवाज़",
    voice_text: "🔊 जवाब पर “सुनें” दबाकर सुनें।  🎤 अपने कीबोर्ड का माइक दबाकर बोलें।",
    composer_placeholder: "लिखें या कीबोर्ड माइक से बोलें…",
    ctx_polyhouse: "पॉलीहाउस", ctx_temp: "तापमान / नमी", ctx_vpd: "VPD", ctx_toppest: "मुख्य कीट", ctx_lastspray: "पिछला स्प्रे",
    greeting: "नमस्ते 🙏 मैं हूँ पॉली-गार्डियन का डिजिटल एग्रोनॉमिस्ट। आप अपने पॉलीहाउस के बारे में कुछ भी पूछ सकते हैं। आज पॉलीहाउस 2 में माइट रिस्क 78/100 है — चाहें तो इसके बारे में बताऊँ?",
    suggest_1: "🐛 मेरी शिमला मिर्च पर बहुत सफेद मक्खी है — क्या करूँ?",
    suggest_2: "💧 VPD 1.9 kPa है — क्या अभी मिस्टिंग करूँ?",
    suggest_3: "🌹 मेरे गुलाब के पत्तों पर काले धब्बे क्यों हैं?",

    choose_language: "अपनी भाषा चुनें", choose_language_sub: "Choose your language · Apni bhasha chunein", cancel: "रद्द करें",
    lang_sub_en: "अंग्रेज़ी में जवाब", lang_sub_hinglish: "अंग्रेज़ी अक्षरों में हिंदी", lang_sub_hi: "हिंदी · देवनागरी", lang_sub_mr: "राजस्थानी · देवनागरी",

    just_now: "अभी", min_ago: "{0} मिनट पहले", h_ago: "{0} घंटे पहले", yesterday: "कल", days_ago: "{0} दिन पहले",
  },

  mr: {
    tab_dashboard: "डैशबोर्ड", tab_scan: "पत्ती स्कैन", tab_trap: "ट्रैप", tab_agronomist: "सलाहकार",
    scan_a_leaf: "पत्ती स्कैन करो", ask_ai: "AI सूं पूछो",

    dash_eyebrow: "🌱 पॉली-गार्डियन · फेज़ 1",
    greet_morning: "राम राम सा", greet_afternoon: "खम्मा घणी", greet_evening: "खम्मा घणी",
    greet_name: "{0}, राकेश जी",
    dash_sub_empty: "थारी पैली पत्ती स्कैन करो अर तुरंत जांच अर पूरो इलाज पाओ।",
    dash_sub_issue: "थारे पाछले स्कैन में {1} माथै {0} मिल्यो। थारे {3} में सूं {2} स्कैन माथै ध्यान देणो जरूरी है — नीचे कोई एक माथै टैप करो.",
    dash_sub_generic: "थे अबतक {0} स्कैन कर लिया। एक अर पत्ती स्कैन करो या सलाहकार सूं पूछो।",
    stat_total: "कुल स्कैन", stat_issues: "समस्या मिली", stat_healthy: "स्वस्थ पत्ती", stat_week: "इण हफ्ते",
    recent_diagnoses: "हाल की जांच", recent_diag_sub: "कोई भी स्कैन माथै टैप कर’र उणरो इलाज फेर देखो", new_scan: "नयो स्कैन",
    no_scans: "अबे कोई स्कैन कोनी — “पत्ती स्कैन करो” माथै टैप करो.",
    top_issues: "खास समस्या", top_issues_sub: "थारे सगळा स्कैन में", no_issues: "अबे कोई बीमारी कोनी मिली। 🌿",

    scan_eyebrow: "✨ पत्ती स्कैन · Gemini + Groq",
    scan_title: "फोटू लो, जांच पाओ।",
    scan_subtitle: "पत्ती री फोटू लो अर कुछई सेकंड में कीड़ो/बीमारी, कॉन्फिडेंस अर पूरो इलाज पाओ।",
    drop_title: "पत्ती स्कैन करो", drop_sub: "फोटू लो या चुणो — साफ, पास सूं ली पत्ती सबसूं बढ़िया रैवे",
    take_photo: "फोटू लो", gallery: "गैलरी", diagnose_leaf: "जांच करो", retake: "फेर लो",
    diagnosing: "थारी पत्ती री जांच होय री है…", diagnosing_sub: "पॉली-गार्डियन AI ध्यान सूं देख र्यो है (पैलो स्कैन थोड़ो टेम ले सके)",
    confidence: "कॉन्फिडेंस", prescription: "इलाज", not_identified: "पिछाण कोनी हुई", plant: "पौधो",
    looks_healthy: "स्वस्थ दीखै है 🌿", no_disease: "कोई बीमारी कोनी मिली", severity_suffix: "गंभीरता",
    rx_organic: "जैविक इलाज", rx_chemical: "रसायनिक इलाज", rx_prevention: "बचाव", rx_warning: "कद विशेषज्ञ सूं मिलो",
    scan_another: "दूजी पत्ती स्कैन करो",
    recent_scans: "हाल का स्कैन", tap_reopen: "फेर देखण खातर टैप करो",
    camera_needed: "कैमरो चाहिजे", camera_needed_msg: "पत्ती स्कैन करण खातर कैमरा एक्सेस दो.", couldnt_diagnose: "जांच कोनी होई",

    trap_badge: "⚙️ फेज़ 2 · ट्रैप-कैमरा किट", trap_title: "ट्रैप मॉनिटर फेज़ 2 में आसी",
    trap_body: "ऑटोमैटिक स्टिकी-ट्रैप कैमरा हर पॉलीहाउस में सफेद माखी, थ्रिप्स अर माहू री गिणती करसी। ओ स्क्रीन ट्रैप-कैमरा किट लाग्यां पछै चालू होसी।",
    use_leafscan: "इणरी जगै पत्ती स्कैन काम में लो",

    agro_eyebrow: "🤖 डिजिटल एग्रोनॉमिस्ट",
    agro_title: "थारे पॉलीहाउस रे बारे में पूछो।",
    agro_subtitle: "राजस्थान री फसलां खातर Gen-AI सलाहकार — ओ थारो लाइव संदर्भ जाणै है।",
    hear: "सुणो", live_context: "AI जो लाइव जाणकारी देखै है", voice_label: "आवाज",
    voice_text: "🔊 जवाब माथै “सुणो” दबा’र सुणो।  🎤 थारे कीबोर्ड रो माइक दबा’र बोलो।",
    composer_placeholder: "लिखो या कीबोर्ड माइक सूं बोलो…",
    ctx_polyhouse: "पॉलीहाउस", ctx_temp: "ताप / नमी", ctx_vpd: "VPD", ctx_toppest: "खास कीड़ो", ctx_lastspray: "पाछलो स्प्रे",
    greeting: "खम्मा घणी 🙏 म्हैं हूँ पॉली-गार्डियन रो डिजिटल एग्रोनॉमिस्ट। थे थारे पॉलीहाउस रे बारे में कुछ भी पूछ सको। आज पॉलीहाउस 2 में माइट रिस्क 78/100 है — चावो तो बताऊँ?",
    suggest_1: "🐛 म्हारी शिमला मिर्च माथै घणी सफेद माखी है — कांई करूँ?",
    suggest_2: "💧 VPD 1.9 kPa है — कांई अबे मिस्टिंग करूँ?",
    suggest_3: "🌹 म्हारे गुलाब रे पत्तां माथै काळा धब्बा किंया है?",

    choose_language: "थारी भाषा चुणो", choose_language_sub: "Choose your language · Apni bhasha chunein", cancel: "रद्द करो",
    lang_sub_en: "अंग्रेजी में जवाब", lang_sub_hinglish: "अंग्रेजी अक्षरां में हिंदी", lang_sub_hi: "हिंदी · देवनागरी", lang_sub_mr: "राजस्थानी · देवनागरी",

    just_now: "अबार", min_ago: "{0} मिनट पैलां", h_ago: "{0} घंटा पैलां", yesterday: "काल", days_ago: "{0} दिन पैलां",
  },
};

// Returns a translate function bound to the given language.
export function makeT(lang) {
  const dict = STRINGS[lang] || STRINGS.hinglish;
  return (key, ...args) => {
    let v = dict[key];
    if (v == null) v = STRINGS.en[key];
    if (v == null) return key;
    args.forEach((a, i) => { v = v.split(`{${i}}`).join(String(a)); });
    return v;
  };
}

// Crop + disease names. Stored English (for app logic), translated only for display.
// English/Hinglish keep the original term; Hindi/Marwari get a local name.
export const TERMS = {
  // crops
  Tomato: { hi: "टमाटर", mr: "टमाटर" },
  Potato: { hi: "आलू", mr: "आलू" },
  Capsicum: { hi: "शिमला मिर्च", mr: "शिमला मिर्च" },
  Chilli: { hi: "मिर्च", mr: "मिर्ची" },
  Rose: { hi: "गुलाब", mr: "गुलाब" },
  Cucumber: { hi: "खीरा", mr: "ककड़ी" },
  Brinjal: { hi: "बैंगन", mr: "बैंगण" },
  Eggplant: { hi: "बैंगन", mr: "बैंगण" },
  Onion: { hi: "प्याज़", mr: "कांदो" },
  Okra: { hi: "भिंडी", mr: "भिंडी" },
  Grape: { hi: "अंगूर", mr: "अंगूर" },
  Wheat: { hi: "गेहूँ", mr: "गेहूँ" },
  Maize: { hi: "मक्का", mr: "मक्की" },
  Lilium: { hi: "लिली", mr: "लिली" },
  // diseases
  "Powdery Mildew": { hi: "पाउडरी मिल्ड्यू (सफेद फफूंद)", mr: "सफेद फफूंद" },
  "Downy Mildew": { hi: "डाउनी मिल्ड्यू", mr: "डाउनी मिल्ड्यू" },
  "Black Spot": { hi: "काला धब्बा", mr: "काळा धब्बा" },
  "Early Blight": { hi: "अगेती झुलसा", mr: "अगेती झुलसा" },
  "Late Blight": { hi: "पिछेती झुलसा", mr: "पिछेती झुलसा" },
  "Leaf Spot": { hi: "पत्ती धब्बा", mr: "पत्ती धब्बो" },
  "Leaf Curl": { hi: "पत्ती मरोड़", mr: "पत्ती मरोड़" },
  Rust: { hi: "रतुआ (रस्ट)", mr: "रतुआ" },
  Anthracnose: { hi: "एन्थ्रेक्नोज़", mr: "एन्थ्रेक्नोज़" },
  Blight: { hi: "झुलसा", mr: "झुलसा" },
  Wilt: { hi: "उकठा (विल्ट)", mr: "उकठा" },
  "Mosaic Virus": { hi: "मोज़ेक वायरस", mr: "मोज़ेक वायरस" },
  "Leaf Mold": { hi: "पत्ती फफूंद", mr: "पत्ती फफूंद" },
  "Bacterial Spot": { hi: "बैक्टीरियल धब्बा", mr: "बैक्टीरियल धब्बो" },
  Healthy: { hi: "स्वस्थ", mr: "स्वस्थ" },
  Unknown: { hi: "अज्ञात", mr: "अणजाण" },
  // pests
  Whitefly: { hi: "सफेद मक्खी", mr: "सफेद माखी" },
  Thrips: { hi: "थ्रिप्स", mr: "थ्रिप्स" },
  Aphid: { hi: "माहू (एफिड)", mr: "माहू" },
  Aphids: { hi: "माहू (एफिड)", mr: "माहू" },
  Mealybug: { hi: "मिलीबग", mr: "मिलीबग" },
  Mite: { hi: "माइट", mr: "माइट" },
  "Spider Mite": { hi: "मकड़ी माइट", mr: "माकड़ी माइट" },
  "Red Spider Mite": { hi: "लाल मकड़ी माइट", mr: "लाल माकड़ी" },
  "Leaf Miner": { hi: "पत्ती सुरंगक", mr: "पत्ती सुरंगक" },
  Bollworm: { hi: "सुंडी (बॉलवर्म)", mr: "सुंडी" },
  Jassid: { hi: "हरा तेला (जैसिड)", mr: "हरो तेलो" },
  None: { hi: "कोई नहीं", mr: "कोई कोनी" },
};

export function localizeTerm(name, lang) {
  if (!name) return name;
  const e = TERMS[name];
  if (e && e[lang]) return e[lang];
  return name;
}

// Severity labels by sevKey (high/medium/low/none).
const SEV_LABELS = {
  high: { hi: "अधिक", mr: "घणी" },
  medium: { hi: "मध्यम", mr: "मध्यम" },
  low: { hi: "कम", mr: "कम" },
  none: { hi: "कोई नहीं", mr: "कोई कोनी" },
};
export function sevLabel(key, lang, fallback) {
  const e = SEV_LABELS[key];
  return (e && e[lang]) || fallback;
}

// --- Pest Scan (Trap tab) strings, merged into STRINGS above ---
const PEST = {
  en: {
    tab_trap: "Pest Scan",
    pest_eyebrow: "🐛 Pest Scan · Density",
    pest_title: "Count pests, spot the risk.",
    pest_subtitle: "Snap a sticky trap or a leaf with insects — get the pest, an estimated count and the infestation density.",
    pest_drop_title: "Scan for pests",
    pest_drop_sub: "Photograph a sticky trap or an infested leaf",
    pest_scanning: "Counting pests…",
    pest_scanning_sub: "Poly-Guardian AI is examining the photo",
    pest_density_label: "Infestation density",
    pest_count_label: "Estimated count",
    pest_risk_label: "Crops at risk",
    pest_action_label: "What to do now",
    pest_none_title: "No pests spotted",
    pest_scan_another: "Scan again",
    pest_phase2_note: "Phase 2: automated trap cameras will count pests for you 24/7.",
  },
  hinglish: {
    tab_trap: "Pest Scan",
    pest_eyebrow: "🐛 Pest Scan · Density",
    pest_title: "Keet gino, risk pehchano.",
    pest_subtitle: "Sticky trap ya keeton wali patti ki photo lo — keet, anumaan count aur infestation density pao.",
    pest_drop_title: "Keet scan karo",
    pest_drop_sub: "Sticky trap ya keeton wali patti ki photo lo",
    pest_scanning: "Keet gine ja rahe hain…",
    pest_scanning_sub: "Poly-Guardian AI photo dekh raha hai",
    pest_density_label: "Infestation density",
    pest_count_label: "Anumaanit count",
    pest_risk_label: "Khatre me fasal",
    pest_action_label: "Ab kya karein",
    pest_none_title: "Koi keet nahi mila",
    pest_scan_another: "Dobara scan karo",
    pest_phase2_note: "Phase 2: automatic trap camera 24/7 keet ginenge.",
  },
  hi: {
    tab_trap: "कीट स्कैन",
    pest_eyebrow: "🐛 कीट स्कैन · घनत्व",
    pest_title: "कीट गिनें, खतरा पहचानें।",
    pest_subtitle: "स्टिकी ट्रैप या कीटों वाली पत्ती की फोटो लें — कीट, अनुमानित संख्या और संक्रमण घनत्व पाएं।",
    pest_drop_title: "कीट स्कैन करें",
    pest_drop_sub: "स्टिकी ट्रैप या कीटों वाली पत्ती की फोटो लें",
    pest_scanning: "कीट गिने जा रहे हैं…",
    pest_scanning_sub: "पॉली-गार्डियन AI फोटो देख रहा है",
    pest_density_label: "संक्रमण घनत्व",
    pest_count_label: "अनुमानित संख्या",
    pest_risk_label: "खतरे में फसलें",
    pest_action_label: "अब क्या करें",
    pest_none_title: "कोई कीट नहीं मिला",
    pest_scan_another: "फिर स्कैन करें",
    pest_phase2_note: "फेज़ 2: ऑटोमैटिक ट्रैप कैमरे 24/7 कीट गिनेंगे।",
  },
  mr: {
    tab_trap: "कीड़ो स्कैन",
    pest_eyebrow: "🐛 कीड़ो स्कैन · घनत्व",
    pest_title: "कीड़ा गिणो, खतरो पिछाणो।",
    pest_subtitle: "स्टिकी ट्रैप या कीड़ां वाळी पत्ती री फोटू लो — कीड़ो, अंदाजन गिणती अर संक्रमण घनत्व पाओ।",
    pest_drop_title: "कीड़ो स्कैन करो",
    pest_drop_sub: "स्टिकी ट्रैप या कीड़ां वाळी पत्ती री फोटू लो",
    pest_scanning: "कीड़ा गिण्या जा र्या है…",
    pest_scanning_sub: "पॉली-गार्डियन AI फोटू देख र्यो है",
    pest_density_label: "संक्रमण घनत्व",
    pest_count_label: "अंदाजन गिणती",
    pest_risk_label: "खतरे में फसलां",
    pest_action_label: "अबे कांई करो",
    pest_none_title: "कोई कीड़ो कोनी मिल्यो",
    pest_scan_another: "फेर स्कैन करो",
    pest_phase2_note: "फेज़ 2: ऑटोमैटिक ट्रैप कैमरा 24/7 कीड़ा गिणसी।",
  },
};
Object.keys(PEST).forEach((l) => Object.assign(STRINGS[l], PEST[l]));

const PEST_RX = {
  en: { pest_prevention_label: "Precautions to take", pest_pesticide_label: "Preferred pesticide" },
  hinglish: { pest_prevention_label: "Bachav ke tarike", pest_pesticide_label: "Behtar keetnashak" },
  hi: { pest_prevention_label: "बचाव के उपाय", pest_pesticide_label: "पसंदीदा कीटनाशक" },
  mr: { pest_prevention_label: "बचाव रा उपाय", pest_pesticide_label: "बढ़िया कीटनाशक" },
};
Object.keys(PEST_RX).forEach((l) => Object.assign(STRINGS[l], PEST_RX[l]));

// Leaf Scan now also detects pests — merged-scan strings (override scan_subtitle).
const SCAN_MERGE = {
  en: { pest_detected_label: "Pest detected", scan_subtitle: "Snap a leaf and get the disease, any pests, a confidence score, and a full prescription in seconds." },
  hinglish: { pest_detected_label: "Keet mila", scan_subtitle: "Patti ki photo lo aur bimari, keet, confidence score aur poora ilaaj kuch hi second me pao." },
  hi: { pest_detected_label: "कीट मिला", scan_subtitle: "पत्ती की फोटो लें और कुछ ही सेकंड में बीमारी, कीट, कॉन्फिडेंस स्कोर और पूरा इलाज पाएं।" },
  mr: { pest_detected_label: "कीड़ो मिल्यो", scan_subtitle: "पत्ती री फोटू लो अर कुछई सेकंड में बीमारी, कीड़ो, कॉन्फिडेंस अर पूरो इलाज पाओ।" },
};
Object.keys(SCAN_MERGE).forEach((l) => Object.assign(STRINGS[l], SCAN_MERGE[l]));

// Digital Twin strings.
const TWIN = {
  en: {
    tab_twin: "Twin", twin_eyebrow: "🛰️ Live · Simulated", twin_title: "Digital Twin",
    twin_subtitle: "A live virtual model of your polyhouses — climate, risk and pests, updating in real time.",
    twin_temp: "Temp", twin_humidity: "Humidity", twin_mite: "Mite risk", twin_fungal: "Fungal risk", twin_thrips: "Thrips pressure",
    twin_alerts: "Live alerts", twin_no_alerts: "All zones look healthy right now. 🌿", twin_node: "Node",
    twin_sim_note: "Simulated live data — the real LoRaWAN sensors plug into this same twin in Phase 2.",
    twin_action_mite: "Apply localized biological control", twin_action_fungal: "Increase ventilation now", twin_action_thrips: "Check the sticky traps",
  },
  hinglish: {
    tab_twin: "Twin", twin_eyebrow: "🛰️ Live · Simulated", twin_title: "Digital Twin",
    twin_subtitle: "Aapke polyhouse ka live virtual model — climate, risk aur keet, real time me update hote hue.",
    twin_temp: "Taap", twin_humidity: "Nami", twin_mite: "Mite risk", twin_fungal: "Fungal risk", twin_thrips: "Thrips pressure",
    twin_alerts: "Live alerts", twin_no_alerts: "Abhi sab zones theek lag rahe hain. 🌿", twin_node: "Node",
    twin_sim_note: "Simulated live data — asli LoRaWAN sensor Phase 2 me isi twin se jud jayenge.",
    twin_action_mite: "Localized biological control lagayein", twin_action_fungal: "Abhi ventilation badhayein", twin_action_thrips: "Sticky trap check karein",
  },
  hi: {
    tab_twin: "ट्विन", twin_eyebrow: "🛰️ लाइव · सिमुलेटेड", twin_title: "डिजिटल ट्विन",
    twin_subtitle: "आपके पॉलीहाउस का लाइव वर्चुअल मॉडल — जलवायु, जोखिम और कीट, रियल-टाइम में अपडेट होते हुए।",
    twin_temp: "तापमान", twin_humidity: "नमी", twin_mite: "माइट जोखिम", twin_fungal: "फंगल जोखिम", twin_thrips: "थ्रिप्स दबाव",
    twin_alerts: "लाइव अलर्ट", twin_no_alerts: "अभी सभी ज़ोन स्वस्थ लग रहे हैं। 🌿", twin_node: "नोड",
    twin_sim_note: "सिमुलेटेड लाइव डेटा — असली LoRaWAN सेंसर फेज़ 2 में इसी ट्विन से जुड़ेंगे।",
    twin_action_mite: "स्थानीय जैविक नियंत्रण लगाएं", twin_action_fungal: "अभी वेंटिलेशन बढ़ाएं", twin_action_thrips: "स्टिकी ट्रैप जांचें",
  },
  mr: {
    tab_twin: "ट्विन", twin_eyebrow: "🛰️ लाइव · सिमुलेटेड", twin_title: "डिजिटल ट्विन",
    twin_subtitle: "थारे पॉलीहाउस रो लाइव वर्चुअल मॉडल — जलवायु, खतरो अर कीड़ा, रियल-टाइम में अपडेट होय र्या।",
    twin_temp: "ताप", twin_humidity: "नमी", twin_mite: "माइट खतरो", twin_fungal: "फंगल खतरो", twin_thrips: "थ्रिप्स दबाव",
    twin_alerts: "लाइव अलर्ट", twin_no_alerts: "अबे सगळा ज़ोन ठीक दीख र्या। 🌿", twin_node: "नोड",
    twin_sim_note: "सिमुलेटेड लाइव डेटा — असली LoRaWAN सेंसर फेज़ 2 में इणी ट्विन सूं जुड़सी।",
    twin_action_mite: "स्थानीय जैविक नियंत्रण लगाओ", twin_action_fungal: "अबे वेंटिलेशन बढ़ाओ", twin_action_thrips: "स्टिकी ट्रैप जांचो",
  },
};
Object.keys(TWIN).forEach((l) => Object.assign(STRINGS[l], TWIN[l]));

// Live-context values per language (labels come from STRINGS).
export const CONTEXT_VALUES = {
  en: ["3 zones · Capsicum, Cucumber, Rose", "34.2°C · 68% RH", "1.9 kPa (mite risk)", "Whitefly · +18% in 24h", "Spinosad · 4 days ago"],
  hinglish: ["3 zones · Capsicum, Cucumber, Rose", "34.2°C · 68% RH", "1.9 kPa (mite risk)", "Whitefly · +18% in 24h", "Spinosad · 4 days ago"],
  hi: ["3 ज़ोन · शिमला मिर्च, खीरा, गुलाब", "34.2°C · 68% नमी", "1.9 kPa (माइट रिस्क)", "सफेद मक्खी · +18% (24 घंटे में)", "Spinosad · 4 दिन पहले"],
  mr: ["3 ज़ोन · शिमला मिर्च, ककड़ी, गुलाब", "34.2°C · 68% नमी", "1.9 kPa (माइट रिस्क)", "सफेद माखी · +18% (24 घंटा में)", "Spinosad · 4 दिन पैलां"],
};

// --- Registration screen strings, merged into STRINGS ---
const REGISTER = {
  en: { reg_title: "Welcome, farmer!", reg_sub: "Tell us a bit about you to get started.", reg_name: "Your name", reg_village: "Village", reg_phone: "Phone number", reg_button: "Get started", reg_name_required: "Please enter your name" },
  hinglish: { reg_title: "Swagat hai, kisan!", reg_sub: "Shuru karne ke liye apne baare me thoda batao.", reg_name: "Aapka naam", reg_village: "Gaon", reg_phone: "Phone number", reg_button: "Shuru karein", reg_name_required: "Kripya apna naam likhein" },
  hi: { reg_title: "स्वागत है, किसान!", reg_sub: "शुरू करने के लिए अपने बारे में थोड़ा बताएं।", reg_name: "आपका नाम", reg_village: "गाँव", reg_phone: "फ़ोन नंबर", reg_button: "शुरू करें", reg_name_required: "कृपया अपना नाम लिखें" },
  mr: { reg_title: "पधारो, किसान!", reg_sub: "शुरू करण खातर थारे बारे में थोड़ो बताओ।", reg_name: "थारो नाम", reg_village: "गांव", reg_phone: "फोन नंबर", reg_button: "शुरू करो", reg_name_required: "किरपा कर’र थारो नाम लिखो" },
};
Object.keys(REGISTER).forEach((l) => Object.assign(STRINGS[l], REGISTER[l]));