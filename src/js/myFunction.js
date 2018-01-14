function storageHobby() {
    var $locMasHobby = new Array();
    //получаем массив hobby из localStorage (если существует)
    if (localStorage.getItem("hobby")) {
        $locMasHobby = JSON.parse(localStorage.getItem("hobby"));

        if($locMasHobby.length == 0) {
            $locMasHobby = ['музыка', 'компьютеры', 'радио'];
            //записываем измененный массив в localStorage
            localStorage.setItem("hobby", JSON.stringify($locMasHobby));
        }
    }
    return $locMasHobby;
}

function storageGetField($field) {
    var $val;
    if(!localStorage.getItem($field)) {//value default
        switch ($field) {
            case "name":
                $val = "Виталя Гора";
                break;
            case "city":
                $val ="г. Нижние Шахты";
                break;
            case "status":
                $val ="холост";
                break;
            case "phone":
                $val ="+7 (440) 554-32-12";
                break;
            case "email":
                $val ="vitalya@gora.ru";
                break;
        }
        localStorage.setItem($field, $val);
    }
    else {//value localStorage
        $val = localStorage.getItem($field)
    }
    return $val;
}

function updateIndexHobby() {
    var count = $('.js-itemHobby').length;
    $('.js-itemHobby').each(function(i,elem) {
        $(this).attr('index',count-i-1);
    });
}

function printHobby($locMasHobby) {
    $('.js-listHobby').html('');
    for (var i = 0; i < $locMasHobby.length; i++) {
        $('<a href="#" index="'+ i +'" class="profile__hobby js-itemHobby">'+ $locMasHobby[i] +'</a>').fadeIn('slow').prependTo('.js-listHobby');
    }
}

function printValField() {
    $('.js-field').each(function(i,elem) {
        var $field = $(this).attr('id'),
            $val = storageGetField($field);
        $(this).html($val);
    });
}

function htmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/"/g, "'");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "<");
        str = str.replace(/>/g, ">");
    }
    return str;
}
