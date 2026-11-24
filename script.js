// View switching via URL hash. No hash = home (full-screen portrait);
// #bio, #manifesto = tabs. Works live on their own pages (works/*.html).
// No reload, no tracking beyond GoatCounter.
(function () {
  var views = ["home", "bio", "manifesto"];

  function show() {
    var id = location.hash.slice(1);
    if (id === "works") { location.replace("works/rmc-001.html"); return; } // old links
    if (views.indexOf(id) === -1) id = "home";
    views.forEach(function (v) {
      document.getElementById(v).hidden = v !== id;
    });
    document.body.classList.toggle("is-home", id === "home");
    document.querySelectorAll(".top nav a").forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", function () {
    show();
    // Views switch without a reload, so tell GoatCounter about each one.
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: location.pathname + location.hash });
    }
  });
  show();
})();
