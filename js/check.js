var rows = 6;
var columns = 7;

var board = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

var current;
var previous;
var streak = 0;

function checkHorizontal(board) {
    for (var x = 0; x < rows; x++) {
        if (board[x][3] != 0) {
            for (var y = 0; y < columns; y++) {
                current = board[x][y];
                if (board[x][y] != 0 && current === previous) {
                    streak++;
                } else {
                    streak = 0;
                }
                previous = current;
                if (streak === 3) {
                    console.log("Win!", streak);
                }
            }
        }
    }
}

function checkVertical(board) {
    for (var y = 0; y < columns; y++) {
        if (board[2][y] != 0) {
            console.log(board[2][y]);
        };
    }
}

checkHorizontal(board);
checkVertical(board);

function checkColumn(currentPosition) {
    streak = 0;
    currentColumn = $(".column").eq(currentPosition[0]).children();

    for (var i = 1; i < currentColumn.length; i++) {
        if ($(currentColumn[i]).hasClass(player)) {
            streak = streak + 1;
        } else {
            streak = 0;
        }

        if (streak > 3) {
            console.log("win!");
            break;
        }
    }
}




// var move = function() {
//     var bodyHeight = board.height();
//     var footerOffsetTop = $("#moving").offset().top;
//     var topToBottom = bodyHeight - footerOffsetTop - $("#moving").outerHeight();
//
//     $("#moving").animate({
//         top: topToBottom,
//     }, 3000);
// };