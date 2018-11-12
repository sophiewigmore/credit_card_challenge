/**
 * Avant Coding Challenge
 * November 2018
 * 
 * Command Line interface, see read me for instructions
 */


var openAcct = require('./createAccount.js');
var makePayment = require('./payment.js');
var doTransaction = require('./transaction.js');
var seeBalanceDue = require('./outstandingBalance.js')
var readlineSync = require('readline-sync');

// Open a new account!
var creditCard = openAcct();
// What action do you want to do on the account?
function askForAction() {
    return readlineSync.question("What would you like to do now? Type the number of the corresponding option: " + 
        "\n1-Make a transaction"+
        "\n2- Make a card payment"+
        "\n3-See outstanding balance for given day:\n\n");
}

function run() {
    // Now what do you want to do?
    if(creditCard.dayCounter != -1) {
        var accountAction = askForAction();
    
        if(accountAction==1) {
            doTransaction(creditCard);
        }
        else if(accountAction==2) {
            makePayment(creditCard);
        }
        else if(accountAction==3) {
            seeBalanceDue(creditCard);
        }
        else {
            console.log("Invalid action code. Try again");
            run();
        }
        var moreActions = readlineSync.question("Is there anything else you want to do? (Y or N): ");
        if(moreActions=="Y" || moreActions=="y") {
            run();
        }
    }//if
}//run

run();
