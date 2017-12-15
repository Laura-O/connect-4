$(document).ready(function() {
    var rows = 6;
    var columns = 7;
    var player = "red";
    var streak;

    // Set row + column in array
    var currentPosition = [, ];

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

        currentPosition = [$(empty).attr('id').slice(0, 1), $(empty).attr('id').slice(1, 2)];

        check(board);
        checkColumn(currentPosition);

        if (player == "red") {
            player = "blue";
        } else {
            player = "red";
        }

    });



    generateBoard();
    generateUpper();

    function checkColumn(currentPosition) {
        streak = 0;
        currentColumn = $(".column").eq(currentPosition[0]).children();

        for (var i = 1; i < currentColumn.length; i++) {
            console.log($(currentColumn[i]));
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

    function checkRow(currentPosition) {
        streak = 0;
        //
        // currentRow =
    }


    function check(board) {
        var streak = 0;


        // function checkHorizontal() {
        //     for (i = 0; i < slots.length; i++) {
        //         if (slots[i].classList.contains(curPlayer)) {
        //             counter++
        //             if counter >= 4 {
        //
        //             }
        //         } else {
        //             counter = 0;
        //         }
        //     }
        //
        // }


        function checkHorizontal(board) {
            for (var y = 0; y < rows; y++) {
                if (board[3][y] != 0) {
                    for (var x = 0; x < columns; x++) {
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

        checkHorizontal(board);
    }
});