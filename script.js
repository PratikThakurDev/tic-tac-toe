function initialGameBoard(){
    let array = [] ;
    let rows = 3 ;
    let columns = 3 ;
    for (let i = 0; i < rows; i++) {
        array[i]=[] ;
        for (let j = 0; j < columns; j++) {
            array[i][j]='';
        }
    }
    return array ;
}

function getHumanInput() {
    const humanSymbol = "X" ;
    const humanSelectedRow = parseInt(prompt('Enter the row you want to select: ')) ;
    const humanSelectedColumn = parseInt(prompt('Enter the column you want to select: ')) ;
    return [humanSymbol,humanSelectedRow,humanSelectedColumn] ;
}

function getCompInput(){
    const compSymbol = "O" ;
    const compSelectedRow = Math.floor(Math.random()*3) ;
    const compSelectedColumn = Math.floor(Math.random()*3) ;
    return [compSymbol,compSelectedRow,compSelectedColumn] ;
}

function gameFunction() {
    let gameBoard = initialGameBoard() ;
    while(true){
        [input,row,column] = getHumanInput() ;
        if (gameBoard[row][column] === '') {
            gameBoard[row][column] = input ;
            console.log(gameBoard) ;
        }
        else{
            prompt('Its already filled')
            while(true){
                [input,row,column] = getHumanInput() ;
                if (gameBoard[row][column] === '') {
                    gameBoard[row][column] = input ;
                    console.log(gameBoard) ;
                    break
                }
            }
        }

        if(gameBoard[0][0] === "X" && gameBoard[0][1] === "X" && gameBoard[0][2] === "X" ||
            gameBoard[1][0] === "X" && gameBoard[1][1] === "X" && gameBoard[1][2] === "X" ||
            gameBoard[2][0] === "X" && gameBoard[2][1] === "X" && gameBoard[2][2] === "X" ||
            gameBoard[0][0] === "X" && gameBoard[1][0] === "X" && gameBoard[2][0] === "X" ||
            gameBoard[0][1] === "X" && gameBoard[1][1] === "X" && gameBoard[2][1] === "X" ||
            gameBoard[0][2] === "X" && gameBoard[1][2] === "X" && gameBoard[2][2] === "X" ||
            gameBoard[0][0] === "X" && gameBoard[1][1] === "X" && gameBoard[2][2] === "X" ||
            gameBoard[0][2] === "X" && gameBoard[1][1] === "X" && gameBoard[2][0] === "X"
        ){
            console.log("You Won") ;
            break ;
        }

        if(gameBoard[0][0] !== "" && gameBoard[0][1] !== "" && gameBoard[0][2] !== "" &&
            gameBoard[1][0] !== "" && gameBoard[1][1] !== "" && gameBoard[1][2] !== "" &&
            gameBoard[2][0] !== "" && gameBoard[2][1] !== "" && gameBoard[2][2] !== ""
        ){
            console.log('Draw')
            break
        }
    
        [input,row,column] = getCompInput() ;
        if (gameBoard[row][column] === '') {
            gameBoard[row][column] = "O" ;
            console.log(gameBoard) ;
        }
        else{
            while(true){
                [input,row,column] = getCompInput() ;
                if (gameBoard[row][column] === '') {
                    gameBoard[row][column] = "O" ;
                    console.log(gameBoard) ;
                    break ;
                }
            }
        }
        if(gameBoard[0][0] === "O" && gameBoard[0][1] === "O" && gameBoard[0][2] === "O" ||
            gameBoard[1][0] === "O" && gameBoard[1][1] === "O" && gameBoard[1][2] === "O" ||
            gameBoard[2][0] === "O" && gameBoard[2][1] === "O" && gameBoard[2][2] === "O" ||
            gameBoard[0][0] === "O" && gameBoard[1][0] === "O" && gameBoard[2][0] === "O" ||
            gameBoard[0][1] === "O" && gameBoard[1][1] === "O" && gameBoard[2][1] === "O" ||
            gameBoard[0][2] === "O" && gameBoard[1][2] === "O" && gameBoard[2][2] === "O" ||
            gameBoard[0][0] === "O" && gameBoard[1][1] === "O" && gameBoard[2][2] === "O" ||
            gameBoard[0][2] === "O" && gameBoard[1][1] === "O" && gameBoard[2][0] === "O"
        ){
            console.log("You Lost") ;
            break ;
        }
    }
}
gameFunction()