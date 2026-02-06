let userscore = 0;
let cmpscore = 0;
let chc = document.querySelectorAll(".userchoice");
let msg = document.querySelector(".message-box");
let user = document.querySelector("#cus");
let cmp = document.querySelector("#robo");
let winSound = new Audio("click.mp3/winner.mp3");
let loseSound = new Audio("click.mp3/loser.mp3");
let drawSound = new Audio("click.mp3/lose.mp3");
const cmp_genchoice = () => {
    //rock,paper,scissor
    const cmp_choice = ["rock", "paper", "scissors"];
    const rndmidx = Math.floor(Math.random() * 3);//since we want to get 0 to 2 so 
    return cmp_choice[rndmidx];
};
const draw_choice = () => {
    console.log("Game is a draw! ")
    msg.style.backgroundColor = "rgb(12, 33, 138)";
    msg.innerText = "Game is a draw! Play Again!";
    drawSound.play();
}
const show_win = (userwin, userchoice, computer_Choice) => {
    if (userwin) {
        msg.style.backgroundColor = "green";
        msg.innerText = `You win, Congratulations! Your ${userchoice} beats ${computer_Choice}`;
        userscore++;
        user.innerText = userscore;
        winSound.play();
        
        // Simple celebration animation
        msg.classList.add('celebrate');
        
        // Remove class after animation
        setTimeout(() => {
            msg.classList.remove('celebrate');
        }, 1000);
    }
    else {
        msg.style.backgroundColor = "red";
        msg.innerText = `You lost!  ${computer_Choice} beats Your ${userchoice}`;
        cmpscore++;
        cmp.innerText = cmpscore;
        loseSound.play();
    }
}
const play = (userchoice) => {
    console.log("userchoice=", userchoice);
    
    // Generate computer choice
    const computer_Choice = cmp_genchoice();
    console.log("cmp choice=", computer_Choice);
    
    // Show computer choice animation
    showComputerChoice(computer_Choice, userchoice);
};

// New function to show computer choice with animation
const showComputerChoice = (computerChoice, userChoice) => {
    const overlay = document.getElementById("overlay");
    const computerChoiceDisplay = document.getElementById("computerChoice");
    const compChoiceText = document.getElementById("compChoiceText");
    
    // Update text
    compChoiceText.innerText = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
    
    // Show overlay and animation
    overlay.classList.add("show");
    computerChoiceDisplay.classList.add("show");
    
    // Hide after 1 seconds and then show result
    setTimeout(() => {
        overlay.classList.remove("show");
        computerChoiceDisplay.classList.remove("show");
        
        // Show game result after animation
        setTimeout(() => {
            determineWinner(userChoice, computerChoice);
        }, 300);
    }, 800);
};

// Separate function to determine winner
const determineWinner = (userchoice, computer_Choice) => {
    if (userchoice === computer_Choice) {
        draw_choice();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = computer_Choice === "paper" ? false : true;
        }
        else if (userchoice === "paper") {
            userwin = computer_Choice === "rock" ? true : false;
        }
        else {
            userwin = computer_Choice === "rock" ? false : true;
        }
        show_win(userwin, userchoice, computer_Choice);
    }
};



console.log(chc);
chc.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        play(userchoice);


    });


})