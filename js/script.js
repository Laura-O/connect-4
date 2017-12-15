$(document).ready(function() {
    var rows = 6;
    var columns = 7;
    var player1 = true;

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

    // var move = function() {
    //     var bodyHeight = board.height();
    //     var footerOffsetTop = $("#moving").offset().top;
    //     var topToBottom = bodyHeight - footerOffsetTop - $("#moving").outerHeight();
    //
    //     $("#moving").animate({
    //         top: topToBottom,
    //     }, 3000);
    // };

    $(".board").on("click", ".pos", function(event) {
        event.preventDefault();
        currentColumn = Number.parseInt(event.target.id.substring(0, 1));
        currentRow = Number.parseInt(event.target.id.substring(1, 2));
        board[currentColumn][currentRow - 1] = 1;
        console.log(board);
        if (player1) {
            $(event.target).addClass("red");
        } else {
            $(event.target).addClass("blue");
        }
        check(board);
        player1 = !player1;
    });

    $(".up").on("click", ".pointer", function(event) {
        event.preventDefault();
        var clickedColumn = event.target.id;
        $("#" + clickedColumn + ".column").addClass("red");
    });

    generateBoard();
    generateUpper();


    function check(board) {
        var current;
        var previous;
        var streak = 0;

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