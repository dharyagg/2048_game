document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    
    let squares = []
    let score = 0

    function createBoard() {
        for (let i=0; i< 16; i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generateTwo()
        generateTwo()
    }
    createBoard()

    function generateTwo(){
        let random = Math.floor(Math.random() * squares.length)
        if (squares[random].innerHTML == 0){
            squares[random].innerHTML = 2
            checkLose()
        }
        else generateTwo()
    }

    //swipe right
    function moveRight(){
        for (let i = 0; i<16; i++){
            if(i%4 == 0 ){ 
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)
                let row = [totalOne,totalTwo,totalThree,totalFour]

                //console.log(row)

                let filteredRow = row.filter(x => x != 0)
                //console.log(filteredRow)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                //console.log(zeros)
                let newRow = zeros.concat(filteredRow)
                //console.log(newRow)

                //insert new row into the squares
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
 
    //swipe left
    function moveLeft(){
        for (let i = 0; i<16; i++){
            if(i%4 == 0 ){ //first column
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)
                let row = [totalOne,totalTwo,totalThree,totalFour]


                let filteredRow = row.filter(x => x != 0)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)
                

                //insert new row into the squares
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    
    function sumRow(){
        for (let i=0; i <15; i++){ //end before index 15 because is has no "right neighbour"
            if(squares[i].innerHTML == squares[i+1].innerHTML){
                let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineNum
                squares[i+1].innerHTML = 0
                score += combineNum
                scoreDisplay.innerHTML = score
            }
        }
    }

    checkWin()

