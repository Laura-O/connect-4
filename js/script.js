$(document).ready(function() {
    var rows = 6;
    var columns = 7;

    // Set row + column in array
    var currentPosition = [, ];

    // Inner array = column
    var boardPattern = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    // Generate new variable for the state of the board
    var boardState = JSON.parse(JSON.stringify(boardPattern));

    function Player(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.score = 0;
    }

    var player1 = new Player("player1", "Player 1", "red");
    var player2 = new Player("player2", "Player 2", "yellow");

    var curPlayer = player1;

    var startGame = function() {
        generateBoard();
        generateUpper();
    };

    var generateBoard = function() {
        var board = $(".board");
        for (var x = 0; x < columns; x++) {
            var column = $("<div>").addClass("column").attr("id", x);
            for (var y = 0; y < rows; y++) {
                var row = $("<div>").addClass("pos empty").attr("id", `${x}${y}`);
                column.append(row);
            }
            board.append(column);
        }
    };

    // Generate the row above the board
    var generateUpper = function() {
        var up = $(".up");
        for (var i = 0; i < columns; i++) {
            var coin = $("<div>").addClass("pointer").attr("id", i);
            up.append(coin);
        }
    };

    // Show the coins when the player mouseovers over the slots
    $(".up")
        .on("mouseover", ".pointer", function(event) {
            event.stopPropagation();
            $(".pointer").not(this).removeClass(curPlayer.color);
            // Show a gray coin of the slot is full
            if ($(".column").eq(event.target.id).hasClass("blocked")) {
                $(event.target).addClass("gray");
            } else {
                $(event.target).addClass(curPlayer.color);
            }
        })
        .on("mouseout", ".pointer", function(event) {
            event.stopPropagation();
            $(event.target).removeClass().addClass("pointer");
        });

    // Add coin on click
    $(".up").not(".blocked").on("click", ".pointer", function(event) {
        event.preventDefault();
        $(event.target).removeClass().addClass("pointer");
        var empty = $(".column").eq(event.target.id).children(".empty:last");
        if ($(".column").eq(event.target.id).children(".empty").length <= 1) {
            $(".column").eq(event.target.id).addClass("blocked");
        }

        animate(empty, curPlayer);
        makeMove(empty);
    });

    function makeMove(empty) {
        // Get the current position from the attribute
        currentPosition = [
            parseInt($(empty).attr("id").slice(0, 1)),
            parseInt($(empty).attr("id").slice(1, 2))
        ];

        // Update board array
        if (curPlayer == player1) {
            boardState[currentPosition[0]][currentPosition[1]] = 1;
        } else {
            boardState[currentPosition[0]][currentPosition[1]] = 2;
        }

        checkVertical(currentPosition);
        checkHorizontal(currentPosition);
        checkSlash(currentPosition);
        checkBackslash(currentPosition);

        // Change the current player
        curPlayer = curPlayer === player1 ? player2 : player1;
    }

    /*
        All the check functions work in a similar way: they generate an array based on the current
        position and check if there is a streak of >= 4 coins.
        For checkSlash and checkBackslash this array has to be generated in a while-loop, which loops
        on the diagonal axis until the edge of the board is reached.
    */
    function checkVertical(currentPosition) {
        var searchColumn = currentPosition[0];
        var arr = [];
        for (var i = 0; i < boardState[currentPosition[0]].length; i++) {
            arr.push(boardState[searchColumn][i]);
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkHorizontal(currentPosition) {
        // Array position: number of rows, currentrow, -upper row
        var searchRow = currentPosition[1];

        var arr = [];
        for (var i = 0; i < boardState.length; i++) {
            arr.push(boardState[i][searchRow]);
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkSlash(currentPosition) {
        var searchColumn = currentPosition[0];
        var searchRow = currentPosition[1];

        var arr = [];
        while (searchColumn > 0 && searchRow < 5) {
            searchColumn--;
            searchRow++;
        }
        while (searchColumn < columns && searchRow > 0) {
            arr.push(boardState[searchColumn][searchRow]);
            searchColumn++;
            searchRow--;
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkBackslash(currentPosition) {
        var searchColumn = currentPosition[0];
        var searchRow = currentPosition[1];

        var arr = [];
        while (searchColumn > 0 && searchRow > 0) {
            searchColumn--;
            searchRow--;
        }
        while (searchColumn <= columns - 1 && searchRow < rows) {
            arr.push(boardState[searchColumn][searchRow]);
            searchColumn++;
            searchRow++;
        }
        if (arr.length >= 4) {
            checkForWin(arr);
        }
    }

    function checkForWin(arr) {
        var streak = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != 0 & arr[i] === arr[i + 1]) {
                streak++;
            } else {
                streak = 0;
            }
            if (streak >= 3) {
                winner(curPlayer);
                break;
            }
        }
    }

    function winner() {
        $("#" + curPlayer.id + "> .score").html(curPlayer.score + 1);
        curPlayer.score++;
        $(".modal-overlay").hide().delay(500).fadeIn(500);
        $(".modal").delay(500).fadeToggle("slow");
        $(".modal-content").html(curPlayer.name + " has won!");
    }

    $(".x-button").on("click", function() {
        $(".modal").hide();
        $(".modal-overlay").hide();
        continueGame();
    });

    $("#continue").on("click", function() {
        $(".modal").hide();
        $(".modal-overlay").hide();
        continueGame();
    });

    function continueGame() {
        boardState = JSON.parse(JSON.stringify(boardPattern));
        $(".column > .pos").each(function() {
            $(this).removeClass().addClass("pos empty");
        });
    }

    $("#restart").on("click", function() {
        location.reload();
    });

    $(".low-button").on("click", function() {
        location.reload();
    });

    /*  This function animates the falling coins in the slots.
        The empty slots each have a background which is 200% large and has the color of the player
        on one side and white on the other. When the slot is clicked, the background is moved so the coloured
        part becomes visible and is immediately set back.
        The delay for each of the children makes it look like the coin is falling to the bottom. */

    function animate(empty, curPlayer) {
        var delay = 0;
        var kids = empty.parent().children(".empty");

        if (curPlayer.color == "red") {
            kids.toggleClass("empty").addClass("empty-red");
        } else {
            kids.toggleClass("empty").addClass("empty-yellow");
        }

        empty.parent().children().each(function() {
            var $el = $(this);
            setTimeout(function() {
                $el.addClass("show", 1000, "easeInOutQuad").stop().delay(50).queue(function() {
                    $(this).removeClass("show");
                });
            }, delay += 50);
        });

        empty.removeClass("empty");
        setTimeout(function() {
            $(".empty-red").removeClass("empty-red").addClass("empty");
            $(".empty-yellow").removeClass("empty-yellow").addClass("empty");
            empty.removeClass("empty").addClass(curPlayer.color);
        }, kids.length * 50);
    }

    // Key events
    var keyPos = 0;
    $(document).keydown(function(e) {
        e.preventDefault();
        if (e.which == 39) {
            $(".pointer").removeClass(curPlayer.color);
            $(".pointer").eq(keyPos).addClass(curPlayer.color);
            if (keyPos < $(".pointer").length) {
                keyPos++;
            } else {
                keyPos = 0;
            }
        } else if (e.which == 37) {
            if (keyPos == 0) {
                keyPos = $(".pointer").length - 1;
            } else {
                keyPos--;
            }
            $(".pointer").removeClass(curPlayer.color);
            $(".pointer").eq(keyPos - 1).addClass(curPlayer.color);
        } else if (e.which == 32) {
            var empty = $(".column").eq(keyPos - 1).children(".empty:last");
            $(".pointer").removeClass(curPlayer.color);
            animate(empty, curPlayer);
            makeMove(empty);
        }
    });

    startGame();
});