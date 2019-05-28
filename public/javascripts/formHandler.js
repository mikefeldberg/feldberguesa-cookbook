

$(".addIngredient").click(function () {
    $(".ingredientRow > p:first-child").clone(true).insertBefore(".ingredientRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeIngredient").click(function () {
    console.log('remove')
    $(this).parent().remove();
});

$(".addInstruction").click(function () {
    $(".instructionRow > p:first-child").clone(true).insertBefore(".instructionRow > p:last-child");
    console.log('add')
    return false;
});

$(".removeInstruction").click(function () {
    console.log('remove')
    $(this).parent().remove();
});

$(".editComment").click(function () {
    var deets = $(this);
    console.log(deets);
});

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

$("#star1").click(function () {
    console.log('1 star');
    console.log(this.id)

});

$("#star2").click(function () {
    console.log('2 star');
    console.log(this.id)
});

$("#star3").click(function () {
    console.log('3 star');
    console.log(this.id)
});

$("#star4").click(function () {
    console.log('4 star');
    console.log(this.id)
});

$("#star5").click(function () {
    console.log('5 star');
    console.log(this.id)
});

function recordRating() {

}

// function () {
//     var rating = $(".rating");
//     var handle = $(".toggle-rating");
//     handle.onchange = function (event) {
//         rating.classList.toggle('rating', handle.checked);
//     };
// };