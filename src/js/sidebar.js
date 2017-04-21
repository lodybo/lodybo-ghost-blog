/**
 * Sidebar
 *
 * The sidebar needs to have a full-page height.
 * So we'll capture the height of the page, and feed that to the sidebar
 */
(function ($) {
    function resizeSidebar() {
        var sidebar = $(".js-sidebar");

        if (window.innerWidth < 800) {
            if (window.innerWidth < 350) {
                if (sidebar.height() != 130) {
                    sidebar.height(130);
                }
            } else {
                if (sidebar.height() != 100) {
                    sidebar.height(100);
                }
            }
            
            return;
        }

        var content = $(".js-content");

        // Only do this, if the content outstretches the window
        // Otherwise, make it the height of the window
        if (content.height() > window.innerHeight) {
            var contentTop = content.offset().top;
            var contentHeight = content.height();

            sidebar.innerHeight(contentTop + contentHeight);
        } else {
            var footer = $(".js-footer");
            var footerHeight = footer.outerHeight(true); // Include margins
            var windowHeight = window.innerHeight;

            sidebar.outerHeight(windowHeight - footerHeight);
        }
    }

    $(document).ready(function () {
        resizeSidebar();
        $(window).resize(resizeSidebar);
    });

    $(window).on("load", resizeSidebar);
})($);