import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 10
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0
let score = 0
let scoreNum = document.getElementById('scoreNum');

export function update() {
    addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] =  { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElemenet = document.createElement('div')
        snakeElemenet.style.gridRowStart = segment.y 
        snakeElemenet.style.gridColumnStart = segment.x
        snakeElemenet.classList.add('snake')
        gameBoard.appendChild(snakeElemenet)
    })

}

export function expandSnake(amount) {
    newSegments += amount
    score++;
    scoreNum.innerHTML = score;
    
    
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() { 
    return onSnake(snakeBody[0], { ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y    
}

function addSegments() { 
    for ( let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
}

    newSegments = 0
}

