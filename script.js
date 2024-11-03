document.addEventListener('DOMContentLoaded', function gerarTabuleiro(){
    console.log("Tabuleiro gerado!")

    //Criar tabuleiro
    let tabuleiro = document.querySelector(".sudoku-board")

    //Criar as 81 divs
    for(i = 0; i < 81; i++){
    let celula = document.createElement('div')
    celula.className = 'cell'
    celula.id = `cell-${i+1}`
    tabuleiro.appendChild(celula)
    }

    //Verifica qual botão foi apertado para gerar ou limpar as células
    document.getElementById('btn-gerar').addEventListener('click', function() {
        let sudoku = gerarPuzzle()
        imprimirTabuleiro(sudoku)
    })
    document.getElementById('btn-limpar').addEventListener('click', limparPuzzle)

})

//Gerar o tabuleiro do sudoku
function gerarPuzzle(){
    let board = criarTabuleiroVazio()
    fillBoard(board)
    return board
}

//Criar um Array 9x9 com números vazios
function criarTabuleiroVazio(){
    return Array.from({ length: 9 }, () => Array(9).fill(0))
}

//Verificar se um número pode ser colocado na célula
function isValid(board, row, col, num){
    for (let x = 0; x < 9; x++){
        if (board[row][x] === num || board[x][col] === num ||
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)]
            [3 * Math.floor(col / 3) + x % 3] === num){
                return false;
        }
    }
    return true;
}

//Preenche o tabuleiro com números embaralhados, que passem no teste
function fillBoard(board){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(board[row][col] === 0){
                let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
                for(let num of numbers) {
                    if (isValid(board, row, col, num)){
                        board[row][col] = num
                        if(fillBoard(board)){
                            return true
                        }
                        board[row][col] = 0
                    }
                }
                return false
            }
        }
    }
    return true
}

//Embaralha os números do array
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

//mostra o sudoku no console
function imprimirTabuleiro(board) {
    for (let row of board) {
        console.log(row.join(' '))
    }
}

//Limpar os números das células dentro do tabuleiro
function limparPuzzle(){
    for(i = 0; i < 81; i++){
        let celula = document.querySelector(`#cell-${i+1}`)
        celula.textContent = ''
        console.log('tudo limpo')
    }

}