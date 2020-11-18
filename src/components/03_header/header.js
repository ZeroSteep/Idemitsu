$(document).ready(function () {

    //открытие блока с оповещениями---------

            var popap = $('.notifications__last_change_wrapp');

            $('.notifications__new').click(function() {
                if ($(window).width() <= 1366) {
                    if (popap.is(':visible')) {
                        popap.fadeOut();
                        popap.css('top', '80px');
                    } else {
                        popap.fadeIn();
                        popap.css('top', '60px');
                    }
                } else {
                    if (popap.is(':visible')) {
                        popap.fadeOut();
                        popap.css('top', '110px');

                    } else {
                        popap.fadeIn();
                        popap.css('top', '91px');
                    }
                }
                return false;
            });

    // $('.notifications__new').click(function() {
    //     var popap = $('.notifications__last_change_wrapp');
    //     if (popap.is(':visible')) {
    //         popap.fadeOut();
    //         popap.css('top','110px');
    //
    //     }else{
    //         popap.fadeIn();
    //         popap.css('top','91px');
    //     }
    //    return false;
    // });

    jQuery(function($){
        $(document).click(function (e){ // событие клика по веб-документу
            var popap = $('.notifications__last_change_wrapp');            // тут указываем ID элемента
            if (!popap.is(e.target) // если клик был не по нашему блоку
                && popap.has(e.target).length === 0) { // и не по его дочерним элементам
                popap.fadeOut(); // скрываем его
                popap.css('top','100px');

            }
        });
    });
    jQuery(function($){
        $(document).click(function (e){ // событие клика по веб-документу
            var search_result = $('.header__search_result, .header__search_result__new_order');// тут указываем ID элемента
            if (!search_result.is(e.target) // если клик был не по нашему блоку
                && search_result.has(e.target).length === 0) { // и не по его дочерним элементам
                search_result.fadeOut(); // скрываем его

            }
        });
    });


    //----------------------------


    //Кнопка в уведомлениях "Загрузить более ранние уведомления"
    $('.notifications__last_change_wrapp .all_result').on('click', function () {

    });
});