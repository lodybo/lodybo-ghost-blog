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
            if (sidebar.height() != 140) {
                sidebar.height(140);
            }
            
            return;
        }

        var content = $(".js-content");

        var contentTop = content.offset().top;
        var contentHeight = content.height();

        sidebar.innerHeight(contentTop + contentHeight);
    }

    $(document).ready(function () {
        resizeSidebar();
        $(window).resize(resizeSidebar);
    });

    $(window).on("load", resizeSidebar);
})($);