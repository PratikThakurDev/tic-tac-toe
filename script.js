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

