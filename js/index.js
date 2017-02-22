//add document ready
$(document).ready(function() {
    //i have one vairable. how many do i really need?
    //----------------------------------------------------------------
    //define four vairables. one for result. one for previous entry. one for operation. one for current entry.
    var answer = 0
    var firstEntry = 0
    var operation = null //will hold operator for use later
    var currentEntry = ''
    // updateScreen(currentEntry)//calling updateScreen here. It will show zero until later code changes it.


    //set event listener for buttons. make sure to use event param.
    //create variable w/n listener that will hold this.html?(why this and not event? this... will depend on how I set up my event listener?)
    $('.buttons').click(function(e) {
        //console.log('buttons')
        var clickedButton = $(e.target).text()
        //create control flow for all possibilities within this event listener
        //if ()clear button possibility
        if (clickedButton === "C") {

            //now clear the things...do I need to clear all the things? Ima clear them all.
            answer = 0
            firstEntry = 0
            operation = null
            currentEntry = ""
        }
        //else if ()use callback function to check if buttons are a number
        //if it is a number check it against current entry. if it's zero make current entry equal to the button pressed. If it's not concat current entry with button pressed.
        else if (isNumber(clickedButton)) {
            //what to do if I want a number more than one digit long?
            if (currentEntry === '') {
                currentEntry = clickedButton
                updateScreen(currentEntry)
            } else {
                currentEntry = currentEntry + clickedButton
                updateScreen(currentEntry)
            }
        }

        //else if () use callback function to check if buttons are operator. if it is store current entry as an integer in previous entry. Then assign operation variable to button pressed. Then set current entry back to an empty string.

        //so if it's not clear and it's NOT a number....then it has to be an operator
        else if (dialOperator(clickedButton)) {
            //turn entry into a number
            firstEntry = parseInt(currentEntry, 10)
            //save current operation
            operation = clickedButton
            //clear current entry
            currentEntry = ''

        } else if (clickedButton === "=") {
            //call operate function on variables that have been set up.
            //this might be a good time to THROW AN ENTRY if current entry is empty.
            currentEntry = calculate(firstEntry, currentEntry, operation)
            //reset operator
            operation = null;
        }
        updateScreen(currentEntry)
    })

}) //end of document ready









//then still inside the same event listener... call a function that will update the screen with current entry



//outside of document ready...really though...
//---------------------------------------------------
//create all callback functions here

//create function to update the screen. figure out how many digits the screen can accept. turn the display value to a string. then use jquery to give the screen that value.(think about how many digits the screen can hold here)

function updateScreen(display) {
    var display = display.toString()
    //this could be the place to limit digits
    $('#screen').text(display)

}


// create function to determine if something passed to it is a number.Should it take the variable it's checking as a param? Yes but later on when it's actually called. Can be a placeholder for now.
function isNumber(value) {
    //double negative time
    return !isNaN(value)
    //will coerce strings to numbers then if it's not...not-a-number...there will be an integer to work with at the end of this.
}


//create funtion to determine if the value passed to it is an operator. Clue: think about the logical operators.

function dialOperator(value) {
    //in the context of this listeners...when this function is called it will only deal with operators so it doesn't need to account for other possibilities.


    return value === '+' || value === '-' || value === 'x' || value === '÷'

}
//create a function that changes the string numbers to variables and then uses the given operator to return the correct arithmatic.
//right now I'm confused about how this will play into the functions I just wrote above.
function calculate(a, b, operation) {
    //use parseInt to convert numbers to integers. second arg for 'decimal numeral system commonly used by humans'
    a = parseInt(a, 10)
    b = parseInt(b, 10)
    //console.log(a, b, operation)
    //conditionals to to math based on given operator
    if (operation === '+') {
        return a + b
    } else if (operation === '-') {
        return a - b
    } else if (operation === 'x') {
        return a * b
    } else if (operation === '÷') {
        return a / b
    }
}
//------------------------------------------------------------
//click the equals button to evaluate expression in the screen

//if expression is in format operand(+|-|x|÷)operand...evaluate and upadate screen

//if the expression isn't in correct format or diving by zero update screen with error message
