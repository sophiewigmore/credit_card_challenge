// Calculate interest based on payments/transactions so far on card
function interestCalculator(creditCard) {
    var current = getOutstandingOnDay(0, creditCard);//outstanding balance on opening day
    var currentsDay=0;//set current day to day 0
    var interest=0;

    //calculate interest each day in 30 day cycle, and add to total interest
    for(var i =0; i<=30; i++) {
        var todaysBalance = getOutstandingOnDay(i, creditCard);
        if(todaysBalance!=current) {
            //calculate interest
            interest += (current * (creditCard.apr/365) * (i-currentsDay));
            //move value to regenerate 
            current = todaysBalance;
            currentsDay = i;
        }
        else if(i==30 && todaysBalance==current) {
            interest+=(current * (creditCard.apr/365) * (i-currentsDay));
        }
    }
    return interest;
}

function getOutstandingOnDay(dayToCheck, creditCard) {
    // first, get the maximum day in cycle that a payment/transaction occurred
    var payments = creditCard.payments;
    var transactions = creditCard.transactions;
    var maxPDay =[];
    if(payments.length >0) {
        maxPDay = payments.map(p =>p.dayOfPayment).reduce(function(a, b) {
            return Math.max(a, b);
        });
    }
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

module.exports = interestCalculator;