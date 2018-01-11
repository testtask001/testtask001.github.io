$(function() {
    //switch tabs
    $('.js-tabs__link').on("click", function(e) {
        e.preventDefault();
        var $this = $(this),
            $tabActive = $this.attr('href');

        $('.js-tabs__item').removeClass('tabs__item_active');
        $('.js-tabs__link').removeClass('tabs__link_active');
        $($tabActive).addClass('tabs__item_active');
        $($this).addClass('tabs__link_active');
    });



});
