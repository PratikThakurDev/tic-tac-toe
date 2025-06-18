function gameBoard(){
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

function getHumanIput() {
    humanSymbol = "X" ;
    humanSelectedRow = parseInt(prompt('Enter the row you want to select: ')) ;
    humanSelectedColumn = parseInt(prompt('Enter the column you want to select: ')) ;
    return [humanSymbol,humanSelectedRow,humanSelectedColumn] ;
}

function getCompInput(){
    compSymbol = "O" ;
    compSelectedRow = Math.floor(Math.random()*3) ;
    compSelectedColumn = Math.floor(Math.random()*3) ;
    return [compSymbol,compSelectedRow,compSelectedColumn] ;
}
