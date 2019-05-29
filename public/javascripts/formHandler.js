

$(".addIngredient").click(function() {
    $(".ingredientRow > p:first-child").clone(true).insertBefore(".ingredientRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeIngredient").click(function() {
    console.log('remove')
    $(this).parent().remove();
});

$(".addInstruction").click(function() {
    $(".instructionRow > p:first-child").clone(true).insertBefore(".instructionRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeInstruction").click(function() {
    console.log('remove')
    $(this).parent().remove();
});

$(".addEditIngredient").click(function() {
    $(".ingredientRow > p:first-child").clone(true).insertBefore(".ingredientRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeEditIngredient").click(function() {
    console.log('remove')
    $(this).parent().remove();
});

$(".addEditInstruction").click(function() {
    $(".instructionRow > p:first-child").clone(true).insertBefore(".instructionRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeEditInstruction").click(function() {
    console.log('remove')
    $(this).parent().remove();
});

$(".editComment").click(function() {
    
    // ----------------------------------------THIS WORKS----------------------------------------
    // $(this).parent().parent().prev().children(0).children(6).val($(this).data("comment-body"))
    // ----------------------------------------THIS WORKS----------------------------------------

    console.log($(this).parent().parent().prev())
    // [""0""].children[""0""][6].form.childNodes[14].innerText
    // console.log($(this).parent().parent().prev().children(0).children(6).childNodes())
    // $(this).parent().parent().prev().children(0).children(6).val('GAH')
    $(this).parent().parent().prev().children(0).children(6).val('Exit')

    // $(this).parent().parent().prev().$("#addCommentForm").val($(this).data("comment-body"))

    // $(this).parent().addClass("updating")
    // $(this).parent().clone(true).insertBefore(".updating")


});

// function() {
//     var rating = $(".rating");
//     var handle = $(".toggle-rating");
//     handle.onchange = function(event) {
//         rating.classList.toggle('rating', handle.checked);
//     };
// };


// function editComment(un, pw) {
//     var form = document.createElement("form");
//     var element1 = document.createElement("input"); 
//     var element2 = document.createElement("input");  

//     form.method = "POST";
//     form.action = "login.php";   

//     element1.value=un;
//     element1.name="un";
//     form.appendChild(element1);  

//     element2.value=pw;
//     element2.name="pw";
//     form.appendChild(element2);

//     document.body.appendChild(form);

//     form.submit();
// }