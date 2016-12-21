/**
 * Post Image resizing
 *
 * When a post has a post image, we need to resize the containing div to span the entire available area.
 * That way, the image is nicely stretched across the page.
 */
(function ($) {
    if ($(".js-post-image-wrapper").length) {
        var postImageWrapper = $(".js-post-image-wrapper");
        var sidebar = $(".js-sidebar");
        var $window = $(window);

        resizePostImage();        
        window.addEventListener("resize", resizePostImage);
    }

    function resizePostImage() {
            // The "-1" is there because the sidebar width is calculated using percentages. jQuery returns the width as a rounded-down number, so we'll round up manually.
            var sidebarWidth = sidebar.innerWidth() + 1;
            var windowWidth = $window.innerWidth();

            var availableScreenWidth = windowWidth - sidebarWidth;
            postImageWrapper.width(availableScreenWidth);
        }
})($);