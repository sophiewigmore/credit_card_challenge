var readlineSync = require('readline-sync');

var seeBalanceDue = function seeOutstandingBalance(creditCard) {
    // Ask what day in the 30 day cycle user wants to check balance for
    var dayToCheck = parseInt(readlineSync.question("\nSee Balance: Please enter the day in cycle you want to see balance for between 0 and 30: \n"));
    var outstanding =0;

    if(dayToCheck<0 || dayToCheck>30) {
        console.log("Invalid day input. try again");
        seeBalanceDue(creditCard);
    }

    if(dayToCheck<30 && dayToCheck>=0) {
        outstanding=creditCard.outstanding;
        console.log("Outstanding Balance on day" + daytoCheck + ": "+outstanding);
    }
    else if(dayToCheck==30) {
        outstanding = interestCalculator(creditCard);
        console.log("Outstanding Balance on day" + daytoCheck + ": "+outstanding);
    }

    return creditCard;
}


module.exports = seeBalanceDue;