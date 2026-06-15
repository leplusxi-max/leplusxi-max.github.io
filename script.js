(function () {
  "use strict";

  /* ============ Language switch ============ */
  var LANG_KEY = "site-lang";
  var langToggle = document.getElementById("lang-toggle");

  function applyLang(lang) {
    var els = document.querySelectorAll("[data-zh][data-en]");
    els.forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val !== null) {
        // <title> and elements with only text get textContent;
        // skip if the element holds nested translatable children handled separately.
        if (el.children.length === 0 || el.tagName === "TITLE") {
          el.textContent = val;
        }
      }
    });
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
    if (langToggle) {
      langToggle.textContent = lang === "zh" ? "EN / 中" : "中 / EN";
    }
    localStorage.setItem(LANG_KEY, lang);
  }

  var savedLang = localStorage.getItem(LANG_KEY) || "en";
  applyLang(savedLang);

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var current = localStorage.getItem(LANG_KEY) || "en";
      applyLang(current === "en" ? "zh" : "en");
    });
  }

  /* ============ Theme switch ============ */
  var THEME_KEY = "site-theme";
  var themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var icon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
    if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
    localStorage.setItem(THEME_KEY, theme);
  }

  var prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  var savedTheme = localStorage.getItem(THEME_KEY) || (prefersDark ? "dark" : "light");
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current =
        document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ============ Mobile menu ============ */
  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ============ Reveal on scroll ============ */
  var revealEls = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
