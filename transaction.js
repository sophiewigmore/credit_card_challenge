var readlineSync = require('readline-sync');


var doTransaction = function transaction(creditCard) {
    var transactionInput = readlineSync.question("Transaction: Please enter amount (no dollar sign)"+
    " and day in cycle you are doing transaction (between 0 and 30) separated by only a comma" +
    "\n (ex: 1000,0):\n");
    if(transactionInput.split(",").length != 2) {
        console.log("Invalid input. try again");
        doTransaction(creditCard);
    }
    var transactionAmount = parseInt(transactionInput.split(",")[0]);
    var transactionDay = parseInt(transactionInput.split(",")[1]);

    if(checkAmountIsAllowed(creditCard, transactionAmount)) {
        if(checkIfValidDay(creditCard, transactionDay)) {
            var transactionObject = { amount : transactionAmount,
                                      dayOfTransaction: transactionDay };
            creditCard.transactions.push(transactionObject);
            creditCard.outstanding += transactionAmount;
            if(creditCard.dayCounter < transactionDay) {
                creditCard.dayCounter = transactionDay;
            }
            console.log("\nTransaction Approved\n")
        }
        else {
            console.log("\nTransaction Denied because invalid day of transaction\n")
        }
    }
    else {
        console.log("\nTransaction Denied because of transaction exceeds limit\n")
    }

    return creditCard;
}


function checkAmountIsAllowed(creditCard, amount) {
    const amountAllowed = creditCard.credit_limit - creditCard.outstanding;
    if(amount <= amountAllowed) {
        return true;
    }
    else {
        return false;
    }
}
function checkIfValidDay(creditCard, day) {
    if(day >= 0 && day <= 30) {
        return true;
    }
    else {
        return false;
    }
}


module.exports = doTransaction;