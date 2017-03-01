/**
 * Sidebar
 *
 * The sidebar needs to have a full-page height.
 * So we'll capture the height of the page, and feed that to the sidebar
 */
(function ($) {
    function resizeSidebar() {
        var content = $(".js-content");
        var sidebar = $(".js-sidebar");

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