const SYMBOLS = [
    "Pierre",
    "Feuille",
    "Ciseaux"
];

// Variables to store current plays
var player = 0;
var computer = 0;
// Variables to store score
var scores = { player: 0, computer: 0, draw: 0, graph: 0 };



// Create a div to store all buttons
const buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttons");
document.body.appendChild(buttonsDiv);

// Create a div to store the result of the game
const resultDiv = document.createElement("div");
resultDiv.classList.add("result");
document.body.appendChild(resultDiv);

// Create a paragraph to display info to the player
let paragraph = document.createElement("p");
paragraph.innerText = "Click to play !";
document.body.appendChild(paragraph);

const createButton = (text, index) => {
    // create a button
    let btn = document.createElement("button");
    // set his text, name, value and image
    btn.innerHTML = text;
    btn.name = `btn${text}`;
    btn.value = index;
    btn.innerHTML = `<img src="${index}.png" />`;
    // add to the DOM
    buttonsDiv.appendChild(btn);
}


// Create as many button as we need
SYMBOLS.forEach(createButton);

// Returns a number between 0 and max value
const getRandomNumber = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

// Determine if the player has won
const checkWinner = (value) => {
    // Pick a random symbol for the computer
    const computerChoice = getRandomNumber(2);
    computer = computerChoice;
    // Get the value from the clicked button
    const playerChoice = parseInt(value);
    player = playerChoice;
    // Compare player and computer plays
    if (computerChoice === playerChoice) return "Draw !";
    if (computerChoice === 2 && playerChoice === 0) return "Win !";
    if (computerChoice === 0 && playerChoice === 2) return "Loss !";
    if (computerChoice > playerChoice) return "Loss !";
    return "Win !";
}

// Updates the paragraph text depending on the winner
const displayResult = (text) => {

    if (document.querySelector(".score")) {
        document.querySelector(".score").remove();
    }

    paragraph.innerText = "";

    resultDiv.style.display = "flex";

    // Delete all childs nodes from resultDiv
    var child = resultDiv.lastElementChild;
    while (child) {
        resultDiv.removeChild(child);
        child = resultDiv.lastElementChild;
    }

    // Hide player buttons div
    gsap.to(buttonsDiv, {
        autoAlpha: 0, onComplete: () => {

            // When the animation is done
            // Change div display to none
            buttonsDiv.style.display = "none";

            // Create 2 images containing player and computer moves
            let img1 = document.createElement("img");
            img1.src = `${player}.png`;
            resultDiv.appendChild(img1);

            let img2 = document.createElement("img");
            img2.src = `${computer}.png`;
            resultDiv.appendChild(img2);

            // Animate in player and computer moves
            gsap.to(img1, { autoAlpha: 1, x: 0 });
            gsap.to(img2, { autoAlpha: 1, x: 0 });

            // Update paragraph text to display current battle result
            paragraph.innerText = text;


            // Score
            createScoreBoard();

            // create a button
            let btn = document.createElement("button");
            // set his text, name, value and image
            btn.innerHTML = '<i class="fa-solid fa-arrow-rotate-right"></i>';
            btn.classList.add("replay");
            // add to the DOM
            document.body.appendChild(btn);

            // When user clicks on the button
            btn.addEventListener("click", () => {
                // Hide result and show player buttons
                resultDiv.style.display = "none";
                buttonsDiv.style.display = "flex";
                gsap.to(buttonsDiv, { autoAlpha: 1 });
                // Hide replay button and update the paragraph text
                btn.remove();
                paragraph.innerText = "Click to play !";
            });

        }
    })

}

const incrementScore = (text) => {
    switch (text) {
        case 'Loss !':
            scores.computer += 1;
            console.log(scores.computer);
            break;
        case 'Win !':
            scores.player += 1;
            break;
        default:
            scores.draw += 1;
    }
}


const createScoreBoard = () => {
    let score = document.createElement("div");
    score.classList.add("score");
    score.innerHTML = `<div><span>${scores.player}W</span> - ${scores.draw}D - <span>${scores.computer}L</span></div>`;

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.classList.add("chart");
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", "25");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.classList.add("pie");
    svg.appendChild(circle);
    score.appendChild(svg);
    document.body.appendChild(score);

    var chart = document.querySelector("circle");
    chart.style.strokeDasharray = `${scores.graph}, 158`;

    setTimeout(() => {
        const total = scores.player + scores.computer;
        const ratio = scores.player / total;
        scores.graph = ratio * 158;
        chart.style.strokeDasharray = `${scores.graph}, 158`;
    }, 200);
}

// Get buttons we just created
const buttons = document.querySelectorAll('button');
// Add a click event listener to each one of them
buttons.forEach(button => button.addEventListener("click", (e) => {
    const result = checkWinner(e.currentTarget.value);
    incrementScore(result);
    displayResult(result);
}))