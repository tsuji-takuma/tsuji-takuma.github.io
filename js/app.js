/* Japanese HTML remains readable without JavaScript or browser storage. */
(() => {
  "use strict";

  const root = document.documentElement;
  const storageKey = "tsuji-site-language";
  const en = {
    languageLabel: "Display language",
    skip: "Skip to publications",
    name: "Takuma TSUJI",
    alternateName: "辻 拓真",
    affiliation: "Graduate School of Information Science and Technology, Hokkaido University",
    degree: "First-year master’s student",
    lab: "Intelligent Software Lab",
    introResearch: "I research natural language processing in the financial domain.",
    introCollaboration: "I am currently working on a joint research project with Preferred Networks.",
    photoAlt: "Takuma Tsuji playing the guitar",
    contactLabel: "Contact and external profiles",
    socialLabel: "External profiles",
    navLabel: "On this page",
    publications: "Publications & Presentations",
    background: "Background",
    personal: "Qualifications & Interests",
    international: "International Conferences",
    peerReviewed: "Peer-reviewed",
    domestic: "Conferences & Symposia in Japan",
    jsaiTitle: "Error Analysis and Improvement of Cause–Effect Expression Extraction Using Large Language Models",
    nlpTitle: "Improving Large Language Models for Cause–Effect Expression Extraction in Japanese Financial Texts",
    yansTitle: "Toward Improving Causal Relation Extraction with Large Language Models in Japanese Financial Texts",
    authorSelf: "Takuma Tsuji",
    coauthors: ", Masanori Hirano, Kentaro Imajo, Hiroki Sakaji, Itsuki Noda.",
    jsaiVenue: "40th annual meeting of the Japanese Society for Artificial Intelligence",
    nlpVenue: "32nd annual meeting of the Association for Natural Language Processing",
    nlpPoster: "Poster (PDF)",
    yansVenue: "20th symposium for young researchers in natural language processing",
    award: "Encouragement Award",
    awardLink: "YANS2025 award announcement",
    education: "Education",
    experience: "Experience",
    graduateSchool: "Graduate School of Information Science and Technology, Hokkaido University",
    graduateProgram: "Division of Information Science and Technology · Master’s program",
    undergraduateSchool: "School of Engineering, Hokkaido University",
    undergraduateProgram: "Department of Electronics and Information Engineering",
    highSchool: "Sapporo Asahigaoka High School",
    present: "Present",
    employer: "Kurusugawa Computer Inc.",
    job: "Part-time machine learning researcher",
    jobDescription: "I develop LLM agents and evaluate SLAM systems.",
    qualifications: "Qualifications",
    interests: "Interests",
    toeic: "TOEIC L&R Test: 825 (November 2024)",
    hobbies: "Listening to music, playing the guitar, watching baseball, and making soup curry",
    backToTop: "Back to top",
  };

  const translations = [];
  for (const attribute of [null, "aria-label", "alt"]) {
    const dataAttribute = attribute ? `data-i18n-${attribute}` : "data-i18n";
    for (const element of document.querySelectorAll(`[${dataAttribute}]`)) {
      translations.push({
        element,
        attribute,
        key: element.getAttribute(dataAttribute),
        ja: attribute ? element.getAttribute(attribute) : element.textContent,
      });
    }
  }

  function applyLanguage(language) {
    root.lang = language;
    document.title = language === "ja" ? "辻 拓真 | Takuma TSUJI" : "Takuma TSUJI | 辻 拓真";
    for (const { element, attribute, key, ja } of translations) {
      const value = language === "ja" ? ja : (en[key] ?? ja);
      if (attribute) element.setAttribute(attribute, value);
      else element.textContent = value;
    }
    document.querySelector(".roman-name").lang = language === "ja" ? "en" : "ja";
    for (const element of document.querySelectorAll("[data-en-only]")) {
      element.hidden = language !== "en";
    }
    for (const button of document.querySelectorAll("[data-language]")) {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    }
  }

  let language = "ja";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "ja" || saved === "en") language = saved;
  } catch {
    // Storage is optional; language switching still works in this page.
  }
  for (const button of document.querySelectorAll("[data-language]")) {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      applyLanguage(language);
      try { localStorage.setItem(storageKey, language); } catch { /* Optional. */ }
    });
  }
  applyLanguage(language);
  document.querySelector(".site-tools").hidden = false;
})();
