$(".add").click(function() {
    $("form > div:first-child").clone(true).insertBefore("form > div:nth-last-child(3)");
    console.log('oh, Im working alright')
    return false;
});

$(".remove").click(function() {
    $(this).parent().remove();
});

