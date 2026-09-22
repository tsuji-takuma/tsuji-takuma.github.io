/* Scroll reveal is an enhancement; never hide the initial reading position. */
(() => {
  "use strict";

  const targets = [...document.querySelectorAll(".publication-list > li, .history > div, .personal > dl")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pending = new Set();
  const seen = new Set();
  let observer;
  let ready = false;
  let frame = 0;

  const enabled = () => !reducedMotion.matches;

  function show(element, animate = false) {
    observer?.unobserve(element);
    pending.delete(element);
    seen.add(element);
    element.classList.remove("reveal-pending");
    element.classList.toggle("reveal-enter", animate && enabled());
  }

  function showAll() {
    observer?.disconnect();
    for (const element of targets) show(element);
  }

  function hashTarget(hash = window.location.hash) {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  }

  function showDestination(destination) {
    if (!destination || destination === document.body) return;
    for (const element of targets) {
      if (destination.contains(element) || element.contains(destination)) show(element);
    }
  }

  function prepare() {
    observer?.disconnect();
    if (!enabled() || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }
    try {
      observer = new IntersectionObserver(entries => {
        try {
          for (const entry of entries) {
            // The second branch also releases items skipped by a fast scroll.
            if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) show(entry.target, entry.isIntersecting);
          }
        } catch { showAll(); }
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

      showDestination(hashTarget());
      for (const element of targets) {
        // Keep the current viewport and everything already passed readable.
        if (seen.has(element) || element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) {
          show(element);
        } else {
          observer.observe(element);
          pending.add(element);
          element.classList.add("reveal-pending");
        }
      }
    } catch { showAll(); }
  }

  function initialize() {
    if (ready) return;
    ready = true;
    prepare();
  }

  // Wait for normal load/scroll restoration, not a fixed animation delay.
  if (document.readyState === "complete") requestAnimationFrame(initialize);
  else window.addEventListener("load", () => requestAnimationFrame(initialize), { once: true });
  window.addEventListener("pageshow", event => {
    if (event.persisted) showAll();
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) showAll();
  });
  document.addEventListener("animationend", event => {
    if (event.animationName === "reveal-up") event.target.classList.remove("reveal-enter");
  });
  document.addEventListener("focusin", event => {
    for (const element of targets) {
      if (element.contains(event.target)) show(element);
    }
  });
  document.addEventListener("click", event => {
    const link = event.target.closest("a[href^='#']");
    if (link) showDestination(hashTarget(link.hash));
  });
  window.addEventListener("hashchange", () => showDestination(hashTarget()));
  window.addEventListener("beforeprint", showAll);

  // IO need not report an element that jumps from below to above the viewport.
  // This small, frame-throttled fallback only releases already-passed groups.
  window.addEventListener("scroll", () => {
    if (frame || !pending.size) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      for (const element of pending) {
        if (element.getBoundingClientRect().bottom <= 0) show(element);
      }
    });
  }, { passive: true });

})();
