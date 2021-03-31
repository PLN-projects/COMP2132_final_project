/* 
    Name: Patrick Neil
    Date Created: March 25th 2021
    Description: This is the main Javascript page for my final project
    I chose the dice game option, This page handles all of the logic related 
    to the dice game. It calculates which player won, it makes both the player objects
    and manipulates the DOM accordingly.
*/

//Grabbing output
const play = document.getElementById('play'); // This button will Generate a form making two player objects
const roll = document.getElementById('roll'); // This button will roll make the roll for both players
const player1Output = document.getElementById('player1'); //area for outputting basic player stats
const player2Output = document.getElementById('player2'); //area for outputting basic player stats
const turnCount = document.getElementById('turnCount'); // label for showing the turn count
const winner = document.getElementById('winner_pop-up'); // grab winner pop-up

//Handling name form
const form = document.getElementById('form_pop-up'); // This button will Generate a form making two player objects
const formErrors = document.getElementById('form_errors'); // This button will Generate a form making two player objects
let formName="";

//Global variables
let firstDice = 0;
let secondDice = 0;
let round = 0; // keeps track of turn count

play.addEventListener('click', function(){
    winner.style.display = "none";
    $(`#form_pop-up`).fadeIn();
    form.addEventListener("submit", validateForm); //add event listener for when submit input is used, to run the name validation
});

roll.addEventListener('click', function(){
    //This anonymous function updates related to the DOM, this happens whenever the player presses the roll dice button
    //add to the round if the game is still on this counter is used to show player data

        round += 1;

        player01.rollDice(); //roll dice for player 1
        $(`#Player1_turn${round}`).css("display","block"); // Show player 1s roll on their card
        // grab roll containers dice object (dice 1 or 2) and change it's src and alt attributes to that of the roll value
        $(`#Player1_turn${round} .roll_container .dice1`).attr("src",`images/dice/dice_face_${firstDice}.jpg`); //Change first dice picture
        $(`#Player1_turn${round} .roll_container .dice2`).attr("src",`images/dice/dice_face_${secondDice}.jpg`); //Change second dice picture
        $(`#Player1_turn${round} .roll_container .dice1`).attr("alt",`Dice ${firstDice} picture`); //Change first dice alt
        $(`#Player1_turn${round} .roll_container .dice2`).attr("alt",`Dice ${secondDice} picture`); //Change second dice alt
        player1Output.innerHTML = player01.describeSelf(); //update basic stats

        // Update player 1's roll on the board
        $(`#table_turn1`).css("display","block");
        $(`#table_turn1 .roll_container .dice1`).attr("src",`images/dice/dice_face_${firstDice}.jpg`);
        $(`#table_turn1 .roll_container .dice2`).attr("src",`images/dice/dice_face_${secondDice}.jpg`);
        $(`#table_turn1 .roll_container .dice1`).attr("alt",`Dice ${firstDice} picture`);
        $(`#table_turn1 .roll_container .dice2`).attr("alt",`Dice ${secondDice} picture`);

        // Player 2 Dice update - Card and Table

        player02.rollDice(); //roll dice for player 2
        $(`#Player2_turn${round}`).css("display","block"); // Show player 2s roll on their card
        // grab roll containers dice object (dice 1 or 2) and change it's src and alt attributes to that of the roll value
        $(`#Player2_turn${round} .roll_container .dice1`).attr("src",`images/dice/dice_face_${firstDice}.jpg`); //Change first dice picture
        $(`#Player2_turn${round} .roll_container .dice2`).attr("src",`images/dice/dice_face_${secondDice}.jpg`); //Change second dice picture
        $(`#Player2_turn${round} .roll_container .dice1`).attr("alt",`Dice ${firstDice} picture`); //Change first dice alt
        $(`#Player2_turn${round} .roll_container .dice2`).attr("alt",`Dice ${firstDice} picture`); 

        player2Output.innerHTML = player02.describeSelf(); //update basic stats

        // Update player 2's roll on the board
        $(`#table_turn2`).css("display","block");
        $(`#table_turn2 .roll_container .dice1`).attr("src",`images/dice/dice_face_${firstDice}.jpg`);
        $(`#table_turn2 .roll_container .dice2`).attr("src",`images/dice/dice_face_${secondDice}.jpg`);
        $(`#table_turn2 .roll_container .dice1`).attr("alt",`Dice ${firstDice} picture`);
        $(`#table_turn2 .roll_container .dice2`).attr("alt",`Dice ${secondDice} picture`);

        turnCount.textContent = `Turn Number: ${round}`; // update turn count
    
    if(round == 3){
        validateWinner();
    }
});

// Modify DOM with base player Data
function startGame(){
    $(`#form_pop-up`).fadeOut(); // Make the name form disappear
    roll.style.display = "block"; // Make roll dice button appear since the game has started so the user can't keep taking turns
    
    // clear basic player output for new game
    player1Output.innerHTML = "";
    player2Output.innerHTML = "";

    //The CPU name is chosen at random from an Array
    let CPU_Names = ["Steve", "The Pope", "Craig", "Charlotte", "Lilia"];
    let x = Math.floor(Math.random() * CPU_Names.length);

    //Initialize player objects to base values
    player01.name = `${formName}`;
    player02.name = `CPU: ${CPU_Names[x]}`;
    player01.totalScore = 0;
    player02.totalScore = 0;
    player01.turnScore = 0;
    player02.turnScore = 0;

    //use round to make a for loop to delete the previous turn output if it was already created
    for(round = 0; round<=3; round++){
        $(`#Player1_turn${round}`).css("display","none");
        $(`#Player2_turn${round}`).css("display","none");
    }

    /*
        Remove players turns from the table and add the player names to the containers text
        instead of the turn number since that's show in a header above the table
    */
    $(`#table_turn1`).css("display","none");
    $(`#table_turn1 > p`).text(`${player01.name}'s roll`);
    $(`#table_turn2`).css("display","none");
    $(`#table_turn2 > p`).text(`${player02.name}'s roll`);

    //modify DOM with base output using describeSelf()
    player1Output.innerHTML += player01.describeSelf();
    player2Output.innerHTML += player02.describeSelf();

    //set round number to zero and show it
    round = 0;
    turnCount.textContent = `Turn Number: ${round}`
}

function validateForm(event){
    //grabbing form inputs
    const name = document.getElementById("name");
    let errorsExist = false; // boolean flag for if errors are detected
    formErrors.innerHTML = ``; // clear the error messages because so that solved errors will disappear each function call 
    
    //Remove the borders when the function is called, So that if there was a previous error, and it was fixed the border class is removed.
    name.classList.remove("error_border");

    // Checking if the trimmed values of the name fields are = to 0, spaces in between letters count as text
    if(name.value.trim().length == 0){
        formErrors.innerHTML += `<p>Error: Name field has been left empty.</p><p>(Spaces in the end do not count as characters)</p>`;
        name.classList.add("error_border");
        errorsExist = true;
    }
    // I don't want my users to submit overly long names
    else if(name.value.trim().length > 15){
        formErrors.innerHTML += `<p>Error: The Name field must be no more than 15 characters.<p>Please enter a shorter name.</p>`;
        name.classList.add("error_border");
        errorsExist = true;
    }

    if(errorsExist === true){
        event.preventDefault(); //if there's errors prevent submit from closing until the user fixes them
    }
    else{
        event.preventDefault(); // I'm using the form for user input on this page only, I don't want this page to refresh
        formName = name.value; // set my global name for player 1 = to name.value to make it publicly available
        startGame(); //Start the game now that the name is submitted properly
    }
    
}


function validateWinner (){
    roll.style.display = "none"; // Now that the winner is calulated make roll dice button dissapear

    const results = document.getElementById('winner_content'); 
    const close = document.getElementById('btn_close');
    results.innerHTML="";

    // Tell the user the game is over stop, disable the user to roll dice and calculate who won
    if(player01.totalScore > player02.totalScore){
        results.innerHTML += `<h2>${player01.name} wins!</h2><p>Congradulations!</p>`
    }
    else if(player02.totalScore > player01.totalScore){
        results.innerHTML += `<h2>${player02.name} wins...</h2><p>Better luck next time...</p>`
    }
    else{
        results.innerHTML += `<h2>The Game is a tie!</h2><p>press new game to play again!</p>`
    }
    $(`#winner_pop-up`).fadeIn(); //show winner

    //once the popup is shown within the DOM add an event listener to the close button so the user can close it
    close.addEventListener('click', function(){
        $(`#winner_pop-up`).fadeOut(); //show winner; //close popup
    });
}

// Create a class for player, the player will have a Name, totalScore, and a Roll Score
class Player {
    constructor(name, totalScore = 0, turnScore = 0){
        this.name = name;
        this.totalScore = totalScore;
        this.turnScore = turnScore;
    }
}
Player.prototype.describeSelf = function(){
    let description = "";
    description = `<h2>${this.name}</h2><p>The Total Score is: ${this.totalScore}</p> <p>The Score this round is. ${this.turnScore}</p>`;
    return description; //return description to show the output
}
Player.prototype.rollDice = function(){
        // Run Dice logic here the function is called for both players when they roll the dice
        firstDice = 1 + Math.floor(Math.random() * 6); // mimics a dice roll from 1 to 6 (you can't roll 0 on a dice)
        secondDice = 1 + Math.floor(Math.random() * 6);
        
        if(firstDice == 1 || secondDice == 1){
            //if either dice are equal to one no score is added
            this.turnScore = 0;
        }
        else if(firstDice == secondDice){
            this.turnScore = ((firstDice + secondDice) * 2); //if they are the same but no one Multiply score by 2
        }
        else{
            this.turnScore = (firstDice + secondDice);
        }
        this.totalScore += this.turnScore; // add turn score to the players total score
    
};

/*
    create two new player object as global variables so my functions can manipulate
    them. I make them empty and modify the data with all my other functions
*/ 
const player01 = new Player();
const player02 = new Player();