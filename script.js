document.addEventListener('DOMContentLoaded', function gerarTabuleiro(){
    console.log("Tabuleiro gerado!")

    //Criar tabuleiro
    let tabuleiro = document.querySelector(".sudoku-board")

    //Criar as 81 divs
    for(i = 0; i < 81; i++){
    let celula = document.createElement('div')
    celula.className = 'cell'
    celula.id = `cell-${i+1}`
    celula.setAttribute('data-column', (i % 9 + 1))
    celula.setAttribute('data-row', Math.floor(i / 9) + 1)
    tabuleiro.appendChild(celula)
    }

    //Verifica qual botão foi apertado para gerar ou limpar as células
    document.getElementById('btn-gerar').addEventListener('click', function() {
        let sudoku = gerarPuzzle()
        renderizarTabuleiro(sudoku)
        imprimirTabuleiro(sudoku)
    })
    document.getElementById('btn-limpar').addEventListener('click', limparPuzzle)

    //Itera sobre todas as células e troca o Style para que todos da mesma linha e coluna fiquem 'Iluminados'
    let celula = document.querySelectorAll('.cell')
    celula.forEach((cell, i) => {

        let column = cell.getAttribute('data-column')
        let row = cell.getAttribute('data-row')

        cell.addEventListener('mouseover', function iluminar(){
            document.querySelectorAll(`.cell[data-column="${column}"]`).forEach((c) => {
                c.classList.add('cell-shining')
            })
            document.querySelectorAll(`.cell[data-row="${row}"]`).
            forEach((r) => {
                r.classList.add('cell-shining')
            })
        })
        cell.addEventListener('mouseout', function limpar(){
            document.querySelectorAll(`.cell[data-column="${column}"]`).forEach((c) => {
                c.classList.remove('cell-shining')
            })
            document.querySelectorAll(`.cell[data-row="${row}"]`).
            forEach((r) => {
                r.classList.remove('cell-shining')
            })
        })
        cell.addEventListener('click', function preencherColRow(){
            
        })

    })

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
function imprimirTabuleiro(board){
    for (let row of board) {
        console.log(row.join(' '))
    }
}

//Renderizar o tabuleiro no HTML
function renderizarTabuleiro(board){
    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            let celula = document.querySelector(`#cell-${r * 9 + c + 1}`)
            console.log(board[r][c], celula)
            celula.textContent = board[r][c] !== 0 ? board[r][c] : '';
        }
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