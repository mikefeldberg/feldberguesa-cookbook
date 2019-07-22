$(document).ready(function () {
    $("#newRecipeForm").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            // $(this).next().focus();
            return false;
        }
    });
});

$(document).ready(function () {
    $("#editRecipeForm").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            // $(this).next().focus();
            return false;
        }
    });
});

// $(document).ready(function () {
//     $('.ingredientInput').bind('keypress', function (event) {
//         if (event.which === 13) {
//             console.log('whaaaaaat')
//             var nextItem = $(this).next('.ingredientInput');
//             console.log(nextItem)
//             nextItem.focus();
//         }
//     });
// });

// $(document).ready(function () {
//     $('.instructionInput').bind('keypress', function (event) {
//         if (event.which === 13) {
//             console.log('whaaaaaat')
//             var nextItem = $(this).next('.instructionInput');
//             nextItem.focus();
//         }
//     });
// });

// $(document).ready(function () {
//     $('.addlInfoInput').bind('keypress', function (event) {
//         if (event.which === 13) {
//             console.log('whaaaaaat')
//             var nextItem = $(this).next('.addlInfoInput');
//             nextItem.focus();
//         }
//     });
// });


// $(document).ready(function () {
//     $("#editRecipeForm").keydown(function (event) {
//         if (event.keyCode == 13) {
//             // event.preventDefault();
//             $(this).next().focus();
//             // return false;
//         }
//     });
// });



// $(".prep").keydown(function(event) {
//     if (event.keyCode == 13) {
//         addIngredientRow();
//         return false;
//     }
// })

// $(".instruction").keydown(function(event) {
//     if (event.keyCode == 13) {
//         addInstructionRow();
//         return false;
//     }
// })

// $(".qty, .name").keydown(function(event) {
//     if (event.keyCode == 13) {
//         $(this).next('input').focus();
//         return false;
//     }
// });

function addIngredientRow() {
    $(".ingredientRow > p:first-child").clone(true).insertBefore(".ingredientRow > p:last-child").find(":text").val("");
}

function addInstructionRow() {
    $(".instructionRow > p:first-child").clone(true).insertBefore(".instructionRow > p:last-child").find(":text").val("");
    return false;
}

$(".removeIngredient").click(function () {
    $(this).parent().remove();
    return false;
});

$(".removeInstruction").click(function () {
    $(this).parent().remove();
    return false;
});


// $(".removeEditIngredient").click(function() {
//     $(this).parent().remove();
// });

$(".addNewIngredient").click(function () {
    $(".ingredientRow > p:last-child").clone(true).insertBefore(".ingredientRow > p:last-child").find(":text").val("");
    return false;
});

$(".addNewInstruction").click(function () {
    $(".instructionRow > p:last-child").clone(true).insertBefore(".instructionRow > p:last-child").find(":text").val("");
    return false;
});

$(".addEditIngredient").click(function () {
    $(".ingredientRow > p:last-child").clone(true).insertBefore(".ingredientRow > p:last-child").find(":text").val("");
    return false;
});

$(".addEditInstruction").click(function () {
    $(".instructionRow > p:last-child").clone(true).insertBefore(".instructionRow > p:last-child").find(":text").val("");
    return false;
});

// $(".removeEditInstruction").click(function() {
//     $(this).parent().remove();
//     return false;
// });

$(".openDeleteRecipeDialogue").click(function () {
    $(this).attr("disabled", "disabled"); /* This is good */
    $('.deleteRecipeDialogueContainer').removeAttr("hidden");
});

$(".deleteRecipeCancel").click(function () {
    $('.deleteRecipeDialogueContainer').attr("hidden", "");
    $('.openDeleteRecipeDialogue').removeAttr("disabled"); /* This is good */
});

// $(".openDeleteCommentDialogue").click(function() {
//     $(this).attr("disabled", "disabled"); /* This is good */
//     $('.deleteCommentDialogueContainer').removeAttr("hidden"); 
// });

$(".deleteCommentCancel").click(function () {
    $('.deleteCommentDialogueContainer').attr("hidden", "");
    $('.openDeleteCommentDialogue').removeAttr("disabled"); /* This is good */
});

$(".openDeleteCommentDialogue").click(function () {
    $(this).attr("disabled", "disabled");
    $(this).parent().children().removeAttr("hidden");
});

$(".deleteCommentCancel").click(function () {
    $('.deleteCommentConfirm').attr("hidden", "");
    $('.deleteComment').removeAttr("hidden");
});