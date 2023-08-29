// VARIABLES

var players = [{ name: 'p1', color: 'rgb(255, 0, 0)'} , { name: 'p2', color: 'rgb(0, 0, 255)'}]

var counter = 0;

var table = $('.board tr')
// console.log(table)

var player = null ; 

// FUNCTIONS

function changeColor(row, col, player) {
    // changes the color of a particular cell
    return table.eq(row).find('td').eq(col).find('button').css('background-color', player.color)
}

function returnColor(row, col) {
    // returns the color of a particular cell

    if (row < 0 || col < 0) {
        return
    }

    return table.eq(row).find('td').eq(col).find('button').css('background-color')

}

function getRow(col) {
    // returns the row in which the coin can be inserted , returns "FULL" if the column is not empty.
    for (var row = $(table).length - 1; row > -1; row--) {
        var c = returnColor(row, col);
        // console.log(c)
        if (c === "rgb(128, 128, 128)") {
            return row
        }

    }

    return "FULL"
}

function checkHorizontal(player) {

    for (var row = 0; row < $(table).length; row++) {
        for (var col = 0; col < 4; col++) {

            var one = returnColor(row, col)
            var two = returnColor(row, col + 1)
            var three = returnColor(row, col + 2)
            var four = returnColor(row, col + 3)

            // console.log(one, two , three , four)

            if (one === player.color && one === two && two === three && three === four) {
                return true
            }

        }


    }

    return false

}

function checkVertical(player) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {

            var one = returnColor(row, col)
            var two = returnColor(row + 1, col)
            var three = returnColor(row + 2, col)
            var four = returnColor(row + 3, col)

            // console.log(one, two , three , four)

            if (one === player.color && one === two && two === three && three === four) {
                return true
            }

        }
    }

    return false
}

function checkDiagonal(player) {


    for (var row = 0; row < 6; row++) {

        for (var col = 0; col < 7; col++) {

            // m = -1

            var one = returnColor(row, col)
            var two = returnColor(row + 1, col + 1)
            var three = returnColor(row + 2, col + 2)
            var four = returnColor(row + 3, col + 3)

            // console.log([row,col],[row+1,col+1] , [row+2,col+2] , [row+3,col+3])
            // console.log(one, two , three , four)


            if (one === player.color && one === two && two === three && three === four) {
                return true
            }

            // m = 1

            var two = returnColor(row - 1, col + 1)
            var three = returnColor(row - 2, col + 2)
            var four = returnColor(row - 3, col + 3)

            // console.log([row,col],[row-1,col-1] , [row-2,col-2] , [row-3,col-3])
            // console.log(one, two , three , four)

            if (one === player.color && one === two && two === three && three === four) {
                return true
            }

        }
    }

    return false

}


function check(player) {

    // console.log("HORI = ",checkHorizontal(player))
    // console.log("VERI = ",checkVertical(player))
    // console.log("DIA = " , checkDiagonal(player))

    return (checkHorizontal(player) || checkVertical(player) || checkDiagonal(player))
}

// EVENTS
$('.board').hide()
$('#clear-button').hide()

$('#restart-button').on('click', function () {


    players[0].name = prompt("Enter the name of Player 1 (Red).")
    players[1].name = prompt("Enter the name of Player 2 (Blue).")

    $(this).fadeOut('1000')
    $('h2').slideUp('1000')

    $('.board').fadeIn('1000')
    $('#clear-button').fadeIn('1000')

})


$('#clear-button').on('click', function () {
    $('td button').css('background-color', 'grey')
    $('h1').text("Connect 4 Game")
    counter = 0 


})


$('.board button').on('click', gameLogic)


// LOGIC 

function gameLogic() {

    player = players[counter % 2];

    var col = $(this).closest('td').index()

    // ! change code to get row
    // var row = $(this).closest('tr').index()

    // add gravity
    var row = getRow(col)

    if (row === "FULL") {
        alert("Column Full ! Choose another column.")
        return -1
    }

    // console.log(row,col)
    // $(this).css('background-color', player2.color)
    changeColor(row, col, player)
    if (check(player)) {
        $('h1').text(player.name + " wins !")
        counter = 0 
        return 1


    }

    counter ++ 
    return 0

}
