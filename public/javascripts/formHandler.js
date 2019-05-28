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