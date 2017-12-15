$(document).ready(function() {
    var rows = 6;
    var columns = 7;
    var player = "red";
    var streak;

    // Set row + column in array
    var currentPosition = [, ];

    // Inner array = column
    var board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    var currentColumn;
    var currentRow;


    var generateBoard = function() {
        var board = $(".board");
        for (var x = 0; x < columns; x++) {
            var column = $("<div>").addClass("column").attr("id", x);
            for (var y = 0; y < rows + 1; y++) {
                var row = $("<div>").addClass("pos empty").attr("id", `${x}${y}`);
                column.append(row);
            }
            board.append(column);
        }
        $(".column div:first-child").removeClass("pos empty").addClass("coin hidden");
    };

    var generateUpper = function() {
        var up = $(".up");
        for (var i = 0; i < columns; i++) {
            var coin = $("<div>").addClass("pointer").attr("id", i);
            up.append(coin);
        }
    };

    $(".up").on("click", ".pointer", function(event) {
        event.preventDefault();

        var empty;
        empty = $(".column").eq(event.target.id).children(".empty:last");
        empty.removeClass("empty");
        empty.addClass(player);

        currentPosition = [parseInt($(empty).attr('id').slice(0, 1)), parseInt($(empty).attr('id').slice(1, 2))];

        // Update board array
        if (player == "red") {
            board[currentPosition[0]][currentPosition[1] - 1] = 1;
            player = "blue";
        } else {
            board[currentPosition[0]][currentPosition[1] - 1] = 2;
            player = "red";
        }

        checkVertical(currentPosition);
        checkHorizontal(currentPosition);
        checkSlash(currentPosition);
        checkBackslash(currentPosition);
    });

    generateBoard();
    generateUpper();

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

    function checkVertical(currentPosition) {
        streak = 0;
        for (var i = 0; i < board[currentPosition[0]].length; i++) {
            if (board[currentPosition[0]][i] != 0 & board[currentPosition[0]][i] === board[currentPosition[0]][i + 1]) {
                streak++;
            } else {
                streak = 0;
            }
            if (streak >= 3) {
                console.log("win!");
                break;
            }
        }
    }

    function checkHorizontal(currentPosition) {
        // Array position: number of rows, currentrow, -upper row
        var searchRow = currentPosition[1] - 1;

        var arr = [];
        for (var i = 0; i < board.length; i++) {
            arr.push(board[i][searchRow]);
        }
        checkForWin(arr);
    }

    function checkSlash(currentPosition) {
        var searchColumn = currentPosition[0];
        var searchRow = currentPosition[1] - 1;

        var arr = [];
        while (searchColumn > 0 && searchRow < 5) {
            searchColumn--;
            searchRow++;
        }
        while (searchColumn < columns && searchRow > 0) {
            arr.push(board[searchColumn][searchRow]);
            searchColumn++;
            searchRow--;
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkBackslash(currentPosition) {
        var searchColumn = currentPosition[0];
        var searchRow = currentPosition[1] - 1;

        var arr = [];
        while (searchColumn > 0 && searchRow > 0) {
            searchColumn--;
            searchRow--;
        }
        while (searchColumn <= columns - 1 && searchRow < rows) {
            arr.push(board[searchColumn][searchRow]);
            searchColumn++;
            searchRow++;
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkForWin(arr) {
        streak = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != 0 & arr[i] === arr[i + 1]) {
                streak++;
            } else {
                streak = 0;
            }
            if (streak >= 3) {
                console.log("win!");
                break;
            }
        }
    }
});