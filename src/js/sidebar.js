/**
 * Sidebar
 *
 * The sidebar needs to have a full-page height.
 * So we'll capture the height of the page, and feed that to the sidebar
 */
(function ($) {
    var $document = $(document);
    var sidebar = $(".js-sidebar");

    function resizeSidebar() {
        sidebar.height($document.height());
    }

    resizeSidebar();
    window.addEventListener("resize", resizeSidebar);
})($);