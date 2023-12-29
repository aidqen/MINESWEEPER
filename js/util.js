function buildBoard() {
    var board = []
    for (var i = 0 ; i < SIZE.length ; i++) {
        board.push([])
        for (var i = 0 ; i < SIZE.length ; i++) {
            board[i][j] = ' '
        }
    }
    return board
}