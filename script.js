// Constants for the Tic-Tac-Toe board
const [TOP_LEFT, TOP_MIDDLE, TOP_RIGHT] = [0, 1, 2];
const [MIDDLE_LEFT, MIDDLE_MIDDLE, MIDDLE_RIGHT] = [3, 4, 5];
const [BOTTOM_LEFT, BOTTOM_MIDDLE, BOTTOM_RIGHT] = [6, 7, 8];

// Array of winning patterns
const winPatterns = [
    [TOP_LEFT, TOP_MIDDLE, TOP_RIGHT],
    [MIDDLE_LEFT, MIDDLE_MIDDLE, MIDDLE_RIGHT],
    [BOTTOM_LEFT, BOTTOM_MIDDLE, BOTTOM_RIGHT],
    [TOP_LEFT, MIDDLE_LEFT, BOTTOM_LEFT],
    [TOP_MIDDLE, MIDDLE_MIDDLE, BOTTOM_MIDDLE],
    [TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT],
    [TOP_LEFT, MIDDLE_MIDDLE, BOTTOM_RIGHT],
    [TOP_RIGHT, MIDDLE_MIDDLE, BOTTOM_LEFT]
];

let boxes = document.querySelectorAll(".box");
let turno = true;
let msg_container = document.querySelector(".msg-container");
let winner = document.querySelector("#winner");
let game_container = document.querySelector(".game-container");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let winSound = document.getElementById("win-sound");
let soundEnabled = true;

const resetBtn = () => {
    turno = true;
    enableBoxes();
    hideMessage();
}

const setBoxContent = (box, content, color) => {
    box.innerHTML = content;
    box.style.color = color;
    box.disabled = true;
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerHTML = "";
    });
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const showMessage = (message) => {
    winner.innerHTML = message;
    msg_container.classList.remove("hide");
    game_container.classList.add("hide2");
}

const hideMessage = () => {
    msg_container.classList.add("hide");
    game_container.classList.remove("hide2");
}


function playSound(sound) {
    if (soundEnabled) {
        sound.currentTime = 0;
        sound.play();
    }
}

const checkWinner = () => {
    let winnerFound = false;
    winPatterns.forEach((pattern) => {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showMessage(`Congratulations! The winner is ${pos1}`);
                playSound(winSound)
                disableBoxes();
                winnerFound = true;
            }
        }
    });

    if (!winnerFound) {
        let allBoxesFilled = true;
        boxes.forEach((box) => {
            if (box.innerHTML === "") {
                allBoxesFilled = false;
            }
        });

        if (allBoxesFilled) {
            showMessage("It's a Draw! No winner.");
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            setBoxContent(box, "X", 'rgb(57, 75, 130)');
            turno = false;
        } else {
            setBoxContent(box, "O", "#4b8a42");
            turno = true;
        }
        checkWinner();
    });
});

resetGameBtn.addEventListener("click", resetBtn);
newGameBtn.addEventListener("click", resetBtn);
