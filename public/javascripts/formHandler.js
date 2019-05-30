

$(".addIngredient").click(function() {
    $(".ingredientRow > p:first-child").clone(true).insertBefore(".ingredientRow > p:last-child");
    return false;
});

$(".removeIngredient").click(function() {
    $(this).parent().remove();
    return false;
});

$(".addInstruction").click(function() {
    $(".instructionRow > p:first-child").clone(true).insertBefore(".instructionRow > p:last-child");
    return false;
});

$(".removeInstruction").click(function() {
    $(this).parent().remove();
    return false;
});


$(".addEditIngredient").click(function() {
    $(".ingredientRow > p:last-child").clone(true).insertBefore(".ingredientRow > p:last-child");
    return false;
});

$(".removeEditIngredient").click(function() {
    $(this).parent().remove();
});

$(".addEditInstruction").click(function() {
    $(".instructionRow > p:last-child").clone(true).insertBefore(".instructionRow > p:last-child");
    return false;
});

$(".removeEditInstruction").click(function() {
    $(this).parent().remove();
    return false;
});

$(".openDeleteRecipeDialogue").click(function() {
    $(this).attr("disabled", "disabled"); /* This is good */
    $('.deleteRecipeDialogueContainer').removeAttr("hidden"); 
});

$(".deleteRecipeCancel").click(function() {
    $('.deleteRecipeDialogueContainer').attr("hidden", "");
    $('.openDeleteRecipeDialogue').removeAttr("disabled"); /* This is good */
});

// $(".openDeleteCommentDialogue").click(function() {
//     $(this).attr("disabled", "disabled"); /* This is good */
//     $('.deleteCommentDialogueContainer').removeAttr("hidden"); 
// });

$(".deleteCommentCancel").click(function() {
    $('.deleteCommentDialogueContainer').attr("hidden", "");
    $('.openDeleteCommentDialogue').removeAttr("disabled"); /* This is good */
});

$(".openDeleteCommentDialogue").click(function() {
    $(this).attr("disabled", "disabled");
    $(this).parent().children().removeAttr("hidden");
});














$(".deleteCommentCancel").click(function() {
    $('.deleteCommentConfirm').attr("hidden", "");
    $('.deleteComment').removeAttr("hidden");
});