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
});
