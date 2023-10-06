const canvas = document.querySelector('canvas')
const tickLength = 128
const width = 32
const height = 32

let score = 1;
let direction = 4;
let tempDirection = 4;
let cellSize
let ctx;

class Ghost {
    constructor() {
        
    }
}


document.addEventListener("DOMContentLoaded", () => {
    initializeCanvas();
    initializeGame();
    setInterval(update, tickLength);
});

function initializeCanvas() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    cellSize = roundToTwoDecimalPlaces(canvas.width / columns);
    rows = Math.floor(canvas.height / cellSize);
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}


function initializeGame() {

    initControls();

    function initControls() {

        detectKeyPress();

        let startX, startY;
        //For checking desktop (click) swiping gestures
        canvas.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
        });
        canvas.addEventListener('mouseup', (e) => {
            const endX = e.clientX;
            const endY = e.clientY;
            detectSwipeDirection(startX, startY, endX, endY);
        });

        //For checking mobile (touch) swiping gestures
        canvas.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        canvas.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            detectSwipeDirection(startX, startY, endX, endY);
        });

        function detectSwipeDirection(startX, startY, endX, endY) {
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    updateDirection(4);
                }
                else
                {
                    updateDirection(2);
                }
            }
            else {
                if (deltaY > 0) {
                    updateDirection(3);
                }
                else {
                    updateDirection(1);
                }
            }
        }
    }

    
}

function detectKeyPress() {
    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();

        if (key === "w" || key === "arrowup") {
            updateDirection(1, true);
        } else if (key === "a" || key === "arrowleft") {
            updateDirection(2, true);
        } else if (key === "s" || key === "arrowdown") {
            updateDirection(3, true);
        } else if (key === "d" || key === "arrowright") {
            updateDirection(4, true);
        }
    });
}

function updateDirection(newDirection) {
    if (newDirection !== oppositeDirection(direction)) {
        tempDirection = newDirection;
    }
    return newDirection != direction
}








function render() {

}