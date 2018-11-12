var readlineSync = require('readline-sync');

var creditCard = {
    credit_limit : 0,
    apr : 0,
    dayCounter : -1,
    transactions : [],
    payments : [],
    outstanding : 0
};

var openAcct = function openAccount() {
   var open = readlineSync.question('Do you want to open an account? (type Y or N): ');
   if(open=="Y" || open=="y") {
       console.log("You have chosen to open an account! \nAn Employee will create your card\n");
       return createAccount(true);
   }
   else {
    console.log("You have chosen not to open account!");
    return createAccount(false);
   }
}

function printNewCreditCardData() {
    return ("\n\nCard Created!\nCredit Limit: " + creditCard.credit_limit+
    "\nAPR: " + creditCard.apr + 
    "\nDays til Payment due: " + (30-creditCard.dayCounter) + 
    "\nOutstanding Balance: " + creditCard.outstanding + "\n");
}
function printAllCreditCardData() {
    return ("\n\nYour Credit Card Info: \nCredit Limit: " + creditCard.credit_limit+
    "\nAPR: " + creditCard.apr + 
    "\nDays til Payment due: " + (30-creditCard.dayCounter) + 
    "\nOutstanding Balance: " + creditCard.outstanding +
    "\nTransactions: " + creditCard.transactions + 
    "\nCard Payments: " + creditCard.payments);
}

function createAccount(doOpen) {
    if(doOpen) {
        var cardDets = readlineSync.question(
            '(Employee): Enter the Credit Limit (ex. 2000) and APR (ex. 40) separated by just a comma, or type [default] for the default of $1000 credit limit and 35% APR: ')
       
        if(cardDets=="Defaut" || cardDets=="default") {
            creditCard.credit_limit = 1000;
            creditCard.apr = .35;
            creditCard.dayCounter = 0;
        } else {
            if(cardDets.split(",").length == 2) {
                creditCard.credit_limit = parseInt(cardDets.split(",")[0]);
                creditCard.apr = cardDets.split(",")[1]/100;
                creditCard.dayCounter = 0;
            } else {
                console.log("Incorrect Input for credit data\n");
                console.log("No Card Created");
                return creditCard;
            }
        }
        console.log(printNewCreditCardData());
        return creditCard;    
    } 
    else {
        console.log("No Card Created");
        return creditCard;
    }
}

module.exports = openAcct;
