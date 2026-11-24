// Work pages: swipe left = next work, swipe right = previous.
// Arrow keys do the same on a computer. Uses the Previous / Next links.
(function () {
  function go(rel) {
    var a = document.querySelector('a[rel="' + rel + '"]');
    if (a) location.href = a.href;
  }

  var x0, y0, t0;

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { x0 = null; return; } // ignore pinch-zoom
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
    t0 = Date.now();
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    if (x0 == null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (window.visualViewport && window.visualViewport.scale > 1.05) return; // zoomed in: let the user pan
    if (Date.now() - t0 > 800) return;                     // slow drag, not a swipe
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return; // mostly vertical
    go(dx < 0 ? "next" : "prev");
  }, { passive: true });

  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key === "ArrowRight") go("next");
    if (e.key === "ArrowLeft") go("prev");
  });
})();
