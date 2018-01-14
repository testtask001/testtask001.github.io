$(function() {
    //Scrollbar
    $(window).on("load",function() {
        $(".content").mCustomScrollbar();
    });

    //switch tabs
    $('.js-tabs__link').on("click", function(e) {
        e.preventDefault();
        var $this = $(this),
            $tabActive = $this.attr('href');
        $('.js-tabs__item').removeClass('active');
        $('.js-tabs__link').removeClass('active');
        $($tabActive).addClass('active');
        $($this).addClass('active');
    });

    //hobby
    var $masHobby = storageHobby();
    printHobby($masHobby);
    printValField();

    //add hobby
    $('#addHobby').on('click', function() {
        var $newHobby = $('.js-newHobby').val();
        $newHobby = htmlspecialchars($newHobby);
        if ($newHobby != '') {
            $masHobby.push($newHobby);
            localStorage.setItem("hobby", JSON.stringify($masHobby));
            var $i = $masHobby.length-1;
            $('<a href="#" index="'+ $i +'" class="profile__hobby js-itemHobby">'+ $newHobby +'</a>').fadeIn('slow').prependTo('.js-listHobby');
            $('.js-newHobby').val('');
        }
    });

    //hobby delete
    $('body').on('click', '.js-itemHobby', function () {
        var $this = $(this),
            $indexHobby = $($this).attr('index');
        $($this).remove();
        if($indexHobby) {
            $masHobby.splice($indexHobby, 1);
            localStorage.setItem("hobby", JSON.stringify($masHobby));
            updateIndexHobby();
        }
    });

    //edit fields
    $('.js-field').on('click', function() {
        if (!$('.js-field').hasClass('edit')) {
            var $this = $(this),
                $val = $($this).html();
            $($this).html('<input class="profile__input profile__input_editStyle" id="js-editField" type="text" name="" value="'+ $val +'" placeholder="заполните поле">');
            $('#js-editField').focus();
            $(".js-field#phone #js-editField").mask("+7 (999) 999-99-99");
            $($this).addClass('edit');
        }
    });

    //save field
    $('body').on('focusout', '#js-editField', function () {
        var $val = $('#js-editField').val();
        var $field = $('.js-field.edit').attr("id");
        if ($val != '') {
            $('.js-field.edit').html($val);
            $('.js-field.edit').removeClass('edit');
            localStorage.setItem($field, $val);
        }
    });
});
