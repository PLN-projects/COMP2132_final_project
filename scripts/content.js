/* 
    Name: Patrick Neil
    Date Created: March 29th 2021
    Description: This is the page that controls other miscellaneous output for the DOM unrelated
    to the Dice game logic itself. This includes animations within the DOM and animation timers
*/

//I decided to display information in tab form the following is the proccessing how it is displayed.
const $tabs = $('.article_nav a'); //Grab anchor tags from tab nav ul
const $tabActive = $('.article_nav .active'); //grab current active tab
const $tabContent = $('.article_content'); //Grab the content of tab articles

const delay = 1000; //delay of 1 second

//function for displaying active tab
$tabContent.hide(); //Hide the content by default and only show what the user asks for when they click a link
function displayActiveTab(activeTab){
    $tabContent.hide();
    const idValue = activeTab.attr("href");
    $(idValue).slideDown();
}

// prevents the default action of anchor tags and removes and adds the .active class to determine which article content to show
$tabs.click(function(event){
    event.preventDefault()
    $tabs.removeClass("active");
    $(this).addClass("active");
    displayActiveTab($(this));
});


/*
    This for loop is to replace all the dice pictures in the header with random ones on refresh
    Except for the picture of the fuzzy dice (the 4th child)
*/

for(counter = 1; counter <=7; counter++){
    let randomNumber = 1 + Math.floor(Math.random() * 6); //Generate random number
    if(counter != 4){
        //Use counter as the nth child to iterate through the dice pictures and replace them via the randomNumber
        $(`#header_dice_pictures img:nth-Child(${counter})`).attr("src",`images/dice/dice_face_${randomNumber}.jpg`);
        $(`#header_dice_pictures img:nth-Child(${counter})`).attr("alt",`Dice ${randomNumber} picture`);
    }
}



let intervalId;
let minutes = 0; // Re-randomize the header dice every minute
intervalId = setInterval(function(){
    minutes++;
    /*
    This for loop is to replace all the dice pictures in the header with random ones
    every minute. Except for the picture of the fuzzy dice (the 4th child)
    */
    for(counter = 1; counter <=7; counter++){
        let randomNumber = 1 + Math.floor(Math.random() * 6); //Generate random number from 1 - 6
        if(counter != 4){
            //Use counter as the nth child to iterate through the dice pictures and replace them via the randomNumber
            $(`#header_dice_pictures img:nth-Child(${counter})`).attr("src",`images/dice/dice_face_${randomNumber}.jpg`);
            $(`#header_dice_pictures img:nth-Child(${counter})`).attr("alt",`Dice ${randomNumber} picture`);
            //Rotate the dice pictures 1 by 1 every minute
            if(minutes != 4){
                /*
                    Change the CSS for the dice according for each dice from 1 - 6 (the 6th dice is the seventh picture in the header)
                    to create a 360 degree transition animation every minute, Since minute is going up by 1 up to 7 I use it as 
                    a counter instead of making a new one.
                */ 
                $(`#header_dice_pictures img:nth-Child(${minutes})`).css({'transition' : 'all 3s', 'transform' : 'rotate(360deg)'});
            }
            
        }
    }
    if(minutes == 7){
        clearInterval(intervalId); //after 7 minutes clear the interval
    }
}, delay * 60); //Randomize every dice and rotate 1 dice every minute








