

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

$("#deleteRecipe").click(function() {
    $(this).attr("hidden", "");
    $('#deleteRecipeConfirm').removeAttr("hidden");
});

$("#deleteRecipeCancel").click(function() {
    $('#deleteRecipeConfirm').attr("hidden", "");
    $('#deleteRecipe').removeAttr("hidden");
});

$(".deleteComment").click(function() {
    $(this).attr("hidden", "");
    $(this).parent().children().removeAttr("hidden");
});

$(".deleteCommentCancel").click(function() {
    $('.deleteCommentConfirm').attr("hidden", "");
    $('.deleteComment').removeAttr("hidden");
});