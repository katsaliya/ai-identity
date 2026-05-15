import { useEffect, useState, useRef } from "react";
import { LANGUAGES } from "../i18n";
import "./LandingPage.css";

const LANG_ABBR = { en: "EN", es: "ES", zh: "中文", tl: "TL", hi: "हि", ar: "عر" };

const TAGLINES = [
  "Navigate your immigration journey — in your language.",
  "Navega tu camino migratorio — en tu idioma.",
  "用您的语言 — 开启移民之旅。",
  "I-navigate ang iyong immigration journey — sa iyong wika.",
  "अपनी भाषा में — इमिग्रेशन यात्रा नेविगेट करें।",
  "تنقّل في رحلتك الهجرية — بلغتك.",
];

const CONTENT = {
  en: {
    tagline:    "Navigate your immigration journey — in your language.",
    placeholder: "Ask about your immigration form...",
    formsLabel: "Supported USCIS Forms",
    whatLabel:  "WHAT YOU CAN DO",
    loginLabel: "Log In",
    signupLabel: "Sign Up",
    features: [
      { title: "Form Walkthroughs",       desc: "Field-by-field guidance for I-485, I-765, I-821D and more — with common mistakes flagged." },
      { title: "Personalized Checklists", desc: "Answer a few questions and get a checklist of forms, documents, fees, and deadlines for your case." },
      { title: "Legal Aid Resources",     desc: "Matched to your language and case type — verified free legal aid orgs near you." },
    ],
    bullets: [
      "No personal data collected or stored — built on public USCIS documents only.",
      "Supports 6 languages spoken across Bay Area immigrant communities.",
      "Voice input available — type or speak your questions.",
    ],
  },
  es: {
    tagline:    "Navega tu camino migratorio — en tu idioma.",
    placeholder: "Pregunta sobre tu formulario de inmigración...",
    formsLabel: "Formularios USCIS compatibles",
    whatLabel:  "LO QUE PUEDES HACER",
    loginLabel: "Iniciar sesión",
    signupLabel: "Registrarse",
    features: [
      { title: "Guías de formularios",    desc: "Orientación campo por campo para I-485, I-765, I-821D y más — con errores comunes señalados." },
      { title: "Listas personalizadas",   desc: "Responde algunas preguntas y obtén una lista de formularios, documentos, tarifas y plazos para tu caso." },
      { title: "Recursos de ayuda legal", desc: "Ajustado a tu idioma y tipo de caso — organizaciones de ayuda legal gratuita verificadas cerca de ti." },
    ],
    bullets: [
      "No se recopilan ni almacenan datos personales — basado solo en documentos públicos del USCIS.",
      "Compatible con 6 idiomas hablados en comunidades inmigrantes del Área de la Bahía.",
      "Entrada de voz disponible — escribe o habla tus preguntas.",
    ],
  },
  zh: {
    tagline:    "用您的语言 — 开启移民之旅。",
    placeholder: "询问您的移民表格...",
    formsLabel: "支持的 USCIS 表格",
    whatLabel:  "您可以做什么",
    loginLabel: "登录",
    signupLabel: "注册",
    features: [
      { title: "表格指导",     desc: "逐项填写 I-485、I-765、I-821D 等表格的指导——并标注常见错误。" },
      { title: "个性化清单",   desc: "回答几个问题，获取适合您案例的表格、文件、费用和截止日期清单。" },
      { title: "法律援助资源", desc: "根据您的语言和案例类型匹配——经核实的免费法律援助机构。" },
    ],
    bullets: [
      "不收集或存储任何个人数据——仅基于 USCIS 公开文件。",
      "支持湾区移民社区使用的 6 种语言。",
      "语音输入可用——输入或语音提问均可。",
    ],
  },
  tl: {
    tagline:    "I-navigate ang iyong immigration journey — sa iyong wika.",
    placeholder: "Magtanong tungkol sa iyong immigration form...",
    formsLabel: "Mga Sinusuportahang USCIS Form",
    whatLabel:  "ANO ANG MAGAGAWA MO",
    loginLabel: "Mag-login",
    signupLabel: "Mag-sign up",
    features: [
      { title: "Mga Gabay sa Form",             desc: "Gabay sa bawat field para sa I-485, I-765, I-821D at iba pa — na may mga karaniwang pagkakamaling minarkahan." },
      { title: "Personalized na Checklist",     desc: "Sagutin ang ilang tanong at makakuha ng checklist ng mga form, dokumento, bayad, at deadline para sa iyong kaso." },
      { title: "Mga Legal Aid na Mapagkukunan", desc: "Nakaakma sa iyong wika at uri ng kaso — mga na-verify na libreng legal aid org malapit sa iyo." },
    ],
    bullets: [
      "Walang personal na data na kinokolekta o nakaimbak — batay lamang sa mga pampublikong dokumento ng USCIS.",
      "Sumusuporta sa 6 na wika na sinasalita sa mga komunidad ng imigranteng Bay Area.",
      "Available ang voice input — mag-type o magsalita ng iyong mga tanong.",
    ],
  },
  hi: {
    tagline:    "अपनी भाषा में — इमिग्रेशन यात्रा नेविगेट करें।",
    placeholder: "अपने इमिग्रेशन फ़ॉर्म के बारे में पूछें...",
    formsLabel: "समर्थित USCIS फ़ॉर्म",
    whatLabel:  "आप क्या कर सकते हैं",
    loginLabel: "लॉग इन",
    signupLabel: "साइन अप",
    features: [
      { title: "फ़ॉर्म गाइड",        desc: "I-485, I-765, I-821D और अन्य के लिए क्षेत्र-दर-क्षेत्र मार्गदर्शन — सामान्य गलतियों के साथ।" },
      { title: "व्यक्तिगत चेकलिस्ट", desc: "कुछ प्रश्नों के उत्तर दें और अपने मामले के लिए फ़ॉर्म, दस्तावेज़, शुल्क और समयसीमा की सूची प्राप्त करें।" },
      { title: "कानूनी सहायता",      desc: "आपकी भाषा और मामले के प्रकार के अनुसार — आपके पास सत्यापित मुफ़्त कानूनी सहायता संस्थाएं।" },
    ],
    bullets: [
      "कोई व्यक्तिगत डेटा एकत्र या संग्रहीत नहीं — केवल USCIS के सार्वजनिक दस्तावेज़ों पर आधारित।",
      "खाड़ी क्षेत्र के प्रवासी समुदायों में बोली जाने वाली 6 भाषाओं का समर्थन करता है।",
      "वॉयस इनपुट उपलब्ध — अपने प्रश्न टाइप करें या बोलें।",
    ],
  },
  ar: {
    tagline:    "تنقّل في رحلتك الهجرية — بلغتك.",
    placeholder: "اسأل عن نموذج الهجرة الخاص بك...",
    formsLabel: "نماذج USCIS المدعومة",
    whatLabel:  "ما يمكنك فعله",
    loginLabel: "تسجيل الدخول",
    signupLabel: "إنشاء حساب",
    features: [
      { title: "إرشادات النماذج",          desc: "إرشادات حقل بحقل للنماذج I-485 وI-765 وI-821D وغيرها — مع تحديد الأخطاء الشائعة." },
      { title: "قوائم مخصصة",             desc: "أجب على بعض الأسئلة واحصل على قائمة بالنماذج والوثائق والرسوم والمواعيد النهائية لقضيتك." },
      { title: "موارد المساعدة القانونية", desc: "مطابق للغتك ونوع قضيتك — مراكز مساعدة قانونية مجانية موثوقة بالقرب منك." },
    ],
    bullets: [
      "لا يتم جمع أو تخزين أي بيانات شخصية — مبني على وثائق USCIS العامة فقط.",
      "يدعم 6 لغات تتحدث بها مجتمعات المهاجرين في منطقة خليج سان فرانسيسكو.",
      "إدخال صوتي متاح — اكتب أسئلتك أو تحدث بها.",
    ],
  },
};

const FEATURE_ICONS = [
  <svg key="fw" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <line x1="8" y1="8"  x2="16" y2="8"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="pc" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 9l2 2 4-4"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 15l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="la" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M21 20c0-2.761-1.791-5-4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
];

const FORM_PILLS = [
  { label: "I-485 Green Card" },
  { label: "I-765 Work Auth" },
  { label: "I-821D DACA" },
  { label: "I-130" },
  { label: "I-90" },
  { label: "More coming soon", dim: true },
];

function SplitTagline({ text }) {
  const idx = text.indexOf("—");
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx + 1)}
      <span className="tagline-em">{text.slice(idx + 1)}</span>
    </>
  );
}

const LOGO_IN    = 700;
const PER_LANG   = 480;
const LANG_COUNT = TAGLINES.length;
const CONTENT_AT = LOGO_IN + LANG_COUNT * PER_LANG;

export default function LandingPage({
  onStartChat, onLogin, onSignup,
  language, onLanguageChange,
  isRecording, transcript, interimTranscript, onMicToggle,
}) {
  const [logoIn,        setLogoIn]        = useState(false);
  const [subtitleShown, setSubtitleShown] = useState(false);
  const [taglineIdx,    setTaglineIdx]    = useState(0);
  const [contentIn,     setContentIn]     = useState(false);
  const [inputText,     setInputText]     = useState("");
  const [langFading,    setLangFading]    = useState(false);
  const [displayLang,   setDisplayLang]   = useState(language);
  const lastTranscriptRef = useRef("");

  // Intro sequence
  useEffect(() => {
    const t = [];
    t.push(setTimeout(() => setLogoIn(true), 16));
    t.push(setTimeout(() => setSubtitleShown(true), LOGO_IN));
    for (let i = 1; i < LANG_COUNT; i++) {
      t.push(setTimeout(() => setTaglineIdx(i), LOGO_IN + i * PER_LANG));
    }
    t.push(setTimeout(() => { setTaglineIdx(0); setContentIn(true); }, CONTENT_AT));
    return () => t.forEach(clearTimeout);
  }, []);

  // Live mic transcript fills input
  useEffect(() => {
    if (isRecording) setInputText(interimTranscript || "");
  }, [interimTranscript, isRecording]);

  // Final Whisper transcript fills input
  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      setInputText(transcript);
    }
  }, [transcript]);

  // Language switch with fade animation
  function handleLanguageSwitch(code) {
    if (code === displayLang || !contentIn) {
      onLanguageChange(code);
      setDisplayLang(code);
      return;
    }
    setLangFading(true);
    onLanguageChange(code);
    setTimeout(() => {
      setDisplayLang(code);
      setLangFading(false);
    }, 180);
  }

  function handleSubmit() {
    const msg = inputText.trim();
    if (!msg) return;
    setInputText("");
    lastTranscriptRef.current = "";
    onStartChat(msg);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const c = CONTENT[displayLang] ?? CONTENT.en;

  return (
    <div className="landing">

      {/* ── Header: language pills + auth buttons ──────────────────── */}
      <div className={`landing-header ${contentIn ? "el-in" : ""}`} style={{ "--d": "0ms" }}>
        <div className="header-langs">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`header-lang-btn ${displayLang === l.code ? "header-lang-btn--active" : ""}`}
              onClick={() => handleLanguageSwitch(l.code)}
            >
              {LANG_ABBR[l.code]}
            </button>
          ))}
        </div>
        <div className="header-auth">
          <button className="auth-pill auth-pill--login" onClick={onLogin}>
            {c.loginLabel}
          </button>
          <button className="auth-pill auth-pill--signup" onClick={onSignup}>
            {c.signupLabel}
          </button>
        </div>
      </div>

      {/* ── Two-column body ──────────────────────────────────────── */}
      <div className={`landing-inner${langFading ? " lang-fading" : ""}`}>
        <div className="landing-left">

          {/* Badge */}
          <div className={`landing-badge ${contentIn ? "el-in" : ""}`} style={{ "--d": "0ms" }}>
            <span className="badge-dot" />
            FREE · NO ACCOUNT REQUIRED · BAY AREA &amp; BEYOND
          </div>

          {/* Logo */}
          <h1 className={`landing-logo ${logoIn ? "landing-logo--in" : ""}`}>AIdentity</h1>

          {/* Cycling tagline */}
          <p
            key={taglineIdx}
            className={`landing-tagline ${subtitleShown ? "landing-tagline--shown" : ""}`}
          >
            {contentIn ? <SplitTagline text={c.tagline} /> : TAGLINES[taglineIdx]}
          </p>

          {/* Input bar */}
          <div className={`landing-input-wrap ${contentIn ? "el-in" : ""}`} style={{ "--d": "120ms" }}>
            <textarea
              className="landing-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={c.placeholder}
              rows={1}
            />
            <button
              className={`landing-btn landing-mic${isRecording ? " recording" : ""}`}
              onClick={onMicToggle}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              🎙️
            </button>
            <button
              className="landing-btn landing-send"
              onClick={handleSubmit}
              disabled={!inputText.trim()}
              aria-label="Send"
            >
              ➤
            </button>
          </div>

        </div>

        {/* Right column */}
        <div className={`landing-right ${contentIn ? "el-in" : ""}`} style={{ "--d": "300ms" }}>
          <p className="what-label">{c.whatLabel}</p>
          <div className="feature-cards">
            {c.features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{FEATURE_ICONS[i]}</div>
                <div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form pills — below feature cards */}
          <div className="forms-section">
            <span className="forms-label">{c.formsLabel}</span>
            <div className="form-pills">
              {FORM_PILLS.map(({ label, dim }) => (
                <span key={label} className={`form-pill${dim ? " form-pill--dim" : ""}`}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className={`landing-footer ${contentIn ? "el-in" : ""}`} style={{ "--d": "400ms" }}>
        <div className="footer-bullets">
          {c.bullets.map((text) => (
            <div key={text} className="footer-bullet">
              <span className="footer-dot" /><p>{text}</p>
            </div>
          ))}
        </div>
        <p className="landing-disclaimer">
          *AIdentity is not a law firm and does not provide legal advice. This tool is designed
          to help you understand immigration documents and forms — always consult a licensed
          immigration attorney for decisions that affect your case.
        </p>
      </footer>
    </div>
  );
}
