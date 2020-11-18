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
