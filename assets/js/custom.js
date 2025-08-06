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

    $(document).on('click', '.big-dropdown [data-bs-toggle="tab"]', function (e) {
    e.preventDefault();

    const $button = $(this);
    const $dropdown = $button.closest('.big-dropdown');
    const targetSelector = $button.data('bs-target');

    // Remove 'active' from all tab buttons in this dropdown
    $dropdown.find('[data-bs-toggle="tab"]').removeClass('active').attr('aria-selected', 'false');

    // Set 'active' on clicked tab
    $button.addClass('active').attr('aria-selected', 'true');

    // Hide all tab-panes in this dropdown
    $dropdown.find('.tab-pane').removeClass('active show');

    // Show the targeted tab-pane in this dropdown
    $dropdown.find(targetSelector).addClass('active show');
  });
});
