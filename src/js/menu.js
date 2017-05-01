(function () {
    var menuBtn = $(".js-menu-icon")[0];
    var closeBtn = $(".js-close")[0];

    var menu = $(".js-navbar");
    var heading = $(".js-blog-heading");

    function showMenu(e) {
        e.preventDefault();

        menu.addClass("open");
        heading.addClass("hidden");
    }

    function hideMenu(e) {
        e.preventDefault();

        menu.removeClass("open");
        heading.removeClass("hidden");
    }

    menuBtn.addEventListener("click", showMenu);
    closeBtn.addEventListener("click", hideMenu);
})();