$(function () {
  let $currentDropdown = null;

  // Create and append backdrop once
  const $backdrop = $('<div class="big-dropdown-backdrop"></div>').appendTo(
    "body"
  );

  const isMobile = window.innerWidth < 992;

  $("a[data-target]").on(isMobile ? "click" : "mouseenter", function (e) {
    e.preventDefault();

    // Close others
    $(".big-dropdown").removeClass("open closing");

    // Get the immediate .big-dropdown next to the current link
    const $target = $(this).next(".big-dropdown");
    if (!$target.length) return;

    $target.removeClass("closing").addClass("open");
    $currentDropdown = $target;

    $backdrop.addClass("active");

    if (isMobile && !$target.parent().is("body")) {
      $target.appendTo("body");
    }
  });

  if (!isMobile) {
    $("a[data-target], .big-dropdown").on("mouseleave", function () {
      hoverTimeout = setTimeout(() => {
        if ($currentDropdown) {
          closeDropdown($currentDropdown);
          $currentDropdown = null;
        }
      }, 200); // delay to allow entering the dropdown
    });

    $("a[data-target], .big-dropdown").on("mouseenter", function () {
      clearTimeout(hoverTimeout); // prevent premature close
    });
  }

  $(document).on("click", function (e) {
    if (
      $currentDropdown &&
      !$(e.target).closest(".big-dropdown, [data-target]").length
    ) {
      closeDropdown($currentDropdown);
      $currentDropdown = null;
    }
  });

  $(document).on("click", ".big-dropdown__close", function () {
    closeDropdown($(this).closest(".big-dropdown"));
    $currentDropdown = null;
  });

  function closeDropdown($dropdown) {
    $dropdown.removeClass("open");
    $backdrop.removeClass("active");
    setTimeout(() => {}, 350);
  }

  $(document).on("click", '.big-dropdown [data-bs-toggle="tab"]', function (e) {
    e.preventDefault();

    const $button = $(this);
    const $dropdown = $button.closest(".big-dropdown");
    const targetSelector = $button.data("bs-target");

    // Remove 'active' from all tab buttons in this dropdown
    $dropdown
      .find('[data-bs-toggle="tab"]')
      .removeClass("active")
      .attr("aria-selected", "false");

    // Set 'active' on clicked tab
    $button.addClass("active").attr("aria-selected", "true");

    // Hide all tab-panes in this dropdown
    $dropdown.find(".tab-pane").removeClass("active show");

    // Show the targeted tab-pane in this dropdown
    $dropdown.find(targetSelector).addClass("active show");
  });
});

// window.history.scrollRestoration = "manual";
// window.onload = function () {
//   window.scrollTo(0, 0);
// };

// window.onresize = function () {
//   window.scrollTo(0, 0);
// };

$(window).on("scroll", function () {
  var $title = $(".cards-title");
  var scrollTop = $(window).scrollTop();
  var triggerPoint = $title.offset().top - (8 * 16); // 8rem in px
  var fadeDistance = 200; // px over which scaling and opacity reduce to 0

  console.log(scrollTop, triggerPoint);

  if (scrollTop >= triggerPoint) {
    var distancePast = scrollTop - triggerPoint;
    var progress = Math.min(distancePast / fadeDistance, 1); // clamp 0 → 1

    var scale = 1 - progress; // 1 → 0
    var opacity = 1 - progress; // 1 → 0

    $title.css({
      transform: `scale(${scale})`,
      opacity: opacity
    });

    console.log(
      `DistancePast=${distancePast}, Progress=${progress.toFixed(2)}, Scale=${scale.toFixed(2)}, Opacity=${opacity.toFixed(2)}`
    );
  } else {
    $title.css({ transform: "scale(1)", opacity: 1 });
  }
});

if ($(".sticky-card").length > 0) {
  var baseTop = 7; // starting top in rem
  var increment = 1.5; // increment in rem
  var scaleSpeed = 4500; // lower = faster shrink

  function calculateTriggerPoints() {
    var remSize = parseFloat($("html").css("font-size"));

    $(".sticky-card").each(function (index) {
      var topValue = baseTop + increment * index;
      $(this).css("top", topValue + "rem");

      var triggerPoint =
        $(this).position().top - topValue * remSize - 24;

      $(this).data("triggerPoint", triggerPoint);
    });
  }

  function handleScroll() {
    var scrollTop = $(window).scrollTop();

    $(".sticky-card").each(function () {
      var $card = $(this);
      var triggerPoint = $card.data("triggerPoint");

      if (scrollTop >= triggerPoint) {
        var distancePast = scrollTop - triggerPoint;
        var scale = Math.max(1 - distancePast / scaleSpeed, 0);
        $card.css("transform", `scale(${scale})`);
      } else {
        $card.css("transform", "scale(1)");
      }
    });
  }

  // Initial calculation
  calculateTriggerPoints();
  handleScroll();

  // Recalculate on resize
  // $(window).on("resize", function () {
  //   calculateTriggerPoints();
  //   handleScroll();
  // });

  // // Scroll handler
  // $(window).on("scroll", handleScroll);
}
