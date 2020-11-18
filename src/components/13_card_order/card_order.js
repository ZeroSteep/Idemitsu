
$(function() {
    var select_sort_orders = $('select.select_sort_orders').selectric();
    select_sort_orders.on('change', function() {
        $(this).parents('form').submit();
    });
});
