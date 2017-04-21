/**
 * Post Image resizing
 *
 * When a post has a post image, we need to resize the containing div to span the entire available area.
 * That way, the image is nicely stretched across the page.
 */
(function ($) {
    $(window).on("load", function () {
        if ($(".js-post-image-wrapper").length) {   
            $(window).resize(resizePostImage);
            resizePostImage();
        }
    });
    
    function resizePostImage() {
        var postImageWrapper = $(".js-post-image-wrapper");
        var navbar = $(".js-navbar");
        var $window = $(window);

        if ($window.width() < 800) {
            postImageWrapper.width($window.width());
            return;
        }

        // The "+1" is there because the navbar width is calculated using percentages. jQuery returns the width as a rounded-down number, so we'll round up manually.
        var navbarWidth = navbar.innerWidth() + 1;
        var windowWidth = $window.innerWidth();

        var availableScreenWidth = windowWidth - navbarWidth;
        postImageWrapper.width(availableScreenWidth);
    }
})($);