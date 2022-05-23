const SYMBOLS = [
    "Pierre",
    "Feuille",
    "Ciseaux"
];

// Variables to store current plays
var player = 0;
var computer = 0;

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
paragraph.innerText = "Cliquez pour jouer !";
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
    if (computerChoice === playerChoice) return "Egalité !";
    if (computerChoice === 2 && playerChoice === 0) return "Gagné !";
    if (computerChoice === 0 && playerChoice === 2) return "Perdu !";
    if (computerChoice > playerChoice) return "Perdu !";
    return "Gagné !";
}

// Updates the paragraph text depending on the winner
const displayResult = (text) => {
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

            // create a button
            let btn = document.createElement("button");
            // set his text, name, value and image
            btn.innerHTML = "Replay";
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
                paragraph.innerText = "Cliquez pour jouer !";
            });

        }
    })

}

// Get buttons we just created
const buttons = document.querySelectorAll('button');
// Add a click event listener to each one of them
buttons.forEach(button => button.addEventListener("click", (e) => {
    const result = checkWinner(e.currentTarget.value);
    displayResult(result);
}))