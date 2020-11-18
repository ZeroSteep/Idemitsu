
$(window).on('load', function () {
    $('.preloader').fadeOut(700);
});
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


// $('#IconDemo').MonthPicker();
$("#IconDemo").MonthPicker({
    i18n: {
        year: "",
        prevYear: "Назад",
        nextYear: "Вперед",
        next12Years: "Следующие 12 лет",
        prev12Years: "Предыдущие 12 лет",
        nextLabel: "Вперед",
        prevLabel: "Назад",
        buttonText: " ",
        jumpYears: "Изменить год",
        backTo: "Вернуться к",
        months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
    }
});



//функция добавления атрибута title для подсказки
$(function(){
    if($('.description_actions__text').length) {
        var titleText = $('.description_actions__text');
        titleText.attr('title', function () {
            return $(this).closest(titleText).text();
        });
        //обрезание длинного текста в блоке ".description_actions__text"
        titleText.dotdotdot({
            height: 28
        });
    }
});

//настройка скролла
$(function(){
    $('.contract_selection__scroll').slimScroll({
        height: '325',
        // width: '600',
        color: 'red',
        alwaysVisible: true,
        wheelStep: 4,
        distance: '3px',
        railOpacity: 0.1
    });
});


$(function() {
    //$(".datepicker").datepicker();
});

//Появление блока выбора периода "от и до" если выбрано "указать вручную"

$(window).ready(function () {
    //преобразование селекта
    // $('.select').each(function(){
    //     // Variables
    //     var $this = $(this),
    //         selectOption = $this.find('option'),
    //         selectedOption = $this.find('option:selected'),
    //         selectOptionLength = selectOption.length,
    //         selectedOption = selectOption.filter(':selected'),
    //         dur = 500;
    //
    //     $this.hide();
    //     // Wrap all in select box
    //     $this.wrap('<div class="select"></div>');
    //     // Style box
    //     $('<div>',{
    //         class: 'select__gap',
    //         text: selectedOption.length?selectedOption.text():'Выбрать'
    //     }).insertAfter($this);
    //
    //     var selectGap = $this.next('.select__gap'),
    //         caret = selectGap.find('.caret');
    //     // Add ul list
    //     $('<ul>',{
    //         class: 'select__list'
    //     }).insertAfter(selectGap);
    //
    //     var selectList = selectGap.next('.select__list');
    //     // Add li - option items
    //     var selectedItem = 0;
    //     for(var i = 0; i < selectOptionLength; i++){
    //
    //         $('<li>',{
    //                 class: 'select__item',
    //                 html: $('<span>',{
    //                     text: selectOption.eq(i).text()
    //                 })
    //             })
    //                 .attr('data-value', selectOption.eq(i).val())
    //                 .appendTo(selectList);
    //     }
    //
    //     // Find all items
    //     var selectItem = selectList.find('li');
    //
    //     selectList.slideUp(0);
    //     selectGap.on('click', function(){
    //         if(!$(this).hasClass('on')){
    //             $(this).addClass('on');
    //             selectList.slideDown(dur);
    //
    //             selectItem.on('click', function(){
    //                 var chooseItem = $(this).data('value');
    //
    //                 $('select').val(chooseItem).attr('selected', 'selected');
    //                 selectGap.text($(this).find('span').text());
    //
    //                 selectList.slideUp(dur);
    //                 selectGap.removeClass('on');
    //             });
    //
    //         } else {
    //             $(this).removeClass('on');
    //             selectList.slideUp(dur);
    //         }
    //     });
    //
    // });

    $(function() {
        var select_period = $('select.select_period').selectric();
        select_period.on('change', function() {
            if($(this).val() !== 'time')
                $(this).parents('form').submit();
        });

        var select_sort = $('select.select_sort').selectric();
        select_sort.on('change', function() {
            $(this).parents('form').submit();
        });
    });
    // //стили для месяцев в календаре ----------------
    // function SelectCalendar() {
    //     $('.ui-datepicker-month').selectric();
    // }
    // setTimeout(SelectCalendar, 5000);

    //-------------------
    $(function () {
        $('.selectric-select_period li').click(function () {
            var $this = $(this);
            if ($this.attr('data-index') === '3' && $this.hasClass('selected')){
                $('#documentslistfilterdatepicker').css({'opacity': '1', 'visibility':'visible'});
            }else {
                $('#documentslistfilterdatepicker').css({'opacity': '0', 'visibility':'hidden'});
            }

        });
    });

    doDocumentsFilter = function(type, obj){

        if(type==='button' || type==='checkbox')
        {
            obj.form.submit();
        }
    };

    $( function() {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        var dateFormat = "dd.mm.yy",
            from = $( "#from" )
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    dateFormat : 'dd.mm.yy'
                })
                .on( "change", function() {
                    to.datepicker( "option", "minDate", getDate( this ) );
                }),
            to = $( "#to" ).datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                dateFormat : 'dd.mm.yy'
            })
                .on( "change", function() {
                    from.datepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );


});



$(function() {
    var select_sort_orders = $('select.select_sort_orders').selectric();
    select_sort_orders.on('change', function() {
        $(this).parents('form').submit();
    });
});




$(document).ready(function(){
    ! function(i) {
        var o, n;
        i(".title_block").on("click", function() {
            o = i(this).parents(".accordion_item"),
                n = o.find(".info"),
                o.hasClass("active_block") ? (o.removeClass("active_block"),
                    n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(),
                    o.siblings(".active_block").removeClass("active_block").children(
                        ".info").stop(!0, !0).slideUp())
        })
    }(jQuery);

});
jQuery(document).ready(function($){
    var API = $(".result_text").dotdotdot({
        ellipsis: "...",
        keep: '.readmore',
        height: 60
    });
    // API.append("<a href='#'>Смотреть</a>");

});
