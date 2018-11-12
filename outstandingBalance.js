var readlineSync = require('readline-sync');
var interestCalculator = require('./interest.js')

var seeBalanceDue = function seeOutstandingBalance(creditCard) {
    // Ask what day in the 30 day cycle user wants to check balance for
    var dayToCheck = parseInt(readlineSync.question("\nSee Balance: Please enter the day in cycle you want to see balance for between 0 and 30: \n"));
    var outstanding =0;

    if(dayToCheck<0 || dayToCheck>30) {
        console.log("Invalid day input. try again");
        seeBalanceDue(creditCard);
    }

    if(dayToCheck<30 && dayToCheck>=0) {

        outstanding = getOutstandingOnDay(dayToCheck, creditCard);
        console.log("Outstanding Balance on day " + dayToCheck + ": "+outstanding);
    }
    else if(dayToCheck==30) {
        outstanding = creditCard.outstanding + interestCalculator(creditCard);
        console.log("Outstanding Balance on day" + dayToCheck + ": "+outstanding);
    }

    return creditCard;
}

function getOutstandingOnDay(dayToCheck, creditCard) {
    // first, get the maximum day in cycle that a payment/transaction occurred
    var payments = creditCard.payments;
    var transactions = creditCard.transactions;
    var maxPDay = payments.map(p =>p.dayOfPayment).reduce(function(a, b) {
        return Math.max(a, b);
    });
    var maxTDay = transactions.map(t => t.dayOfTransaction).reduce(function(a, b) {
        return Math.max(a, b);
    });
    var maxDay = Math.max(maxPDay,maxTDay);
    //if the day to check is greater than any of the payments/transacation dates, return current outstanding
    if(dayToCheck >= maxDay) {return creditCard.outstanding;}
    // if day to check only contains a subset of the transactions/payments
    else {
        var amount = 0;
        var transactSum =creditCard.transactions
        .filter(t => {return t.dayOfTransaction <= dayToCheck})
        .map(t2 => {
            return t2.amount ;
        })
        .reduce((a,b) => a+b, 0);

        var paymentSum = creditCard.payments
        .filter(p => p.dayOfPayment <= dayToCheck)
        .map(p2 => {
            return p2.amount ;
        })
        .reduce((a,b) => a+b, 0);
        
        amount = transactSum-paymentSum;
        return amount;
    }

}


module.exports = seeBalanceDue;