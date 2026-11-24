// Tab switching via URL hash (#works, #bio, #manifesto). No reload, no tracking.
(function () {
  var views = ["works", "bio", "manifesto"];

  function show() {
    var id = location.hash.slice(1);
    if (views.indexOf(id) === -1) id = "works";
    views.forEach(function (v) {
      document.getElementById(v).hidden = v !== id;
    });
    document.querySelectorAll(".top nav a").forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", function () {
    show();
    // Tabs switch without a reload, so tell GoatCounter about each one.
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: location.pathname + location.hash });
    }
  });
  show();
})();
