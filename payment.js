var readlineSync = require('readline-sync');

var makePayment = function payment(creditCard) {
    var paymentInput = readlineSync.question("Payment: Please enter payment amount (no dollar sign)"+
    " and day in cycle you are doing payment (between 0 and 30) separated by only a comma" +
    "\n (ex: 1000,10):\n");
    if(paymentInput.split(",").length != 2) {
        console.log("Invalid input. try again");
        makePayment(creditCard);
    }
    var paymentAmount = parseInt(paymentInput.split(",")[0]);
    var paymentDay = parseInt(paymentInput.split(",")[1]);

    if(checkPaymentAmount(creditCard, paymentAmount)) {
        if(checkIfValidDay(creditCard, paymentDay)) {
            var paymentObject = { amount : paymentAmount,
                                      dayOfPayment: paymentDay };
            creditCard.payments.push(paymentObject);
            creditCard.outstanding -= paymentAmount;
            if(creditCard.dayCounter < paymentDay) {
                creditCard.dayCounter = paymentDay;
            }
            console.log("\nPayment Complete\n")
        }
        else {
            console.log("\nPayment Denied because invalid day of payment\n");
        }
    }
    else {
        console.log("\nPayment not processed because invalid amount\n");
    }

    return creditCard;
}

// check that payment amount is less than or equal to the outstanding balance
// and that it's also less than or equal to credit card limit
function checkPaymentAmount(creditCard, paymentAmount) {
    if(paymentAmount <= creditCard.outstanding &&
        paymentAmount <= creditCard.credit_limit) {
            return true;
        }
        else {
            return false;
        }
}
// check if payment date is valid - between 0 and 30 and is on same day or after a transaction is made
function checkIfValidDay(creditCard, paymentDay) {
    if(paymentDay >=0 && paymentDay <= 30) {
        transactionDays = creditCard.transactions.map(t => {
            return t.day
        })
        for(var t in transactionDays) {
            if(paymentDay >= t) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    } 
    else {
        return false;
    }
}



module.exports = makePayment;