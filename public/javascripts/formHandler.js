$("#addRow").click(function() {
    // $("form > p:first-child").clone(true).insertBefore("form > p:last-child(3)");
    // return false;
});

$(".remove").click(function() {
    $(this).parent().remove();
});


function addRow() {
    console.log('yes')
    $("form > p:first-child").clone(true).insertBefore("form > p:nth-last-child(3)");
    return false;
}

function removeRow() {
    $(this).parent().remove();
}

$("#heart").click(function() {
    
});

function editComment() {
    $(".editComment").
}

