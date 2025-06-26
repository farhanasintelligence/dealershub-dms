// PhotoSwipe grid gallery demo
// Requires: jQuery, PhotoSwipe
$(document).ready(function () {
  var $modal = $("#gallery-modal");

  // Open modal
  $("#view-gallery-btn").on("click", function () {
    $modal.addClass("active");
  });

  // Close modal
  $("#gallery-close").on("click", function () {
    $modal.removeClass("active");
  });

  // PhotoSwipe init
  $("#gallery-grid").on("click", "a", function (e) {
    e.preventDefault();
    var items = [];
    $("#gallery-grid a").each(function () {
      var $link = $(this);
      items.push({
        src: $link.attr("href"),
        w: parseInt($link.data("pswp-width")),
        h: parseInt($link.data("pswp-height")),
      });
    });
    var index = $(this).index();
    var pswpElement = document.querySelectorAll(".pswp")[0];
    var options = {
      index: index,
      bgOpacity: 0.85,
      showHideOpacity: true,
    };
    var gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      items,
      options
    );
    gallery.init();
  });
});
