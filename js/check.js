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