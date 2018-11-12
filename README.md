Sophie Wigmore
Avant Credit Card Coding Challenge
11/12/18

This project was completed in Node.js.
Inside the credit_card_challenge/ directory from the command line, run the program using:

<b> node src.js </b>

This will run the project.
It will ask if you want to create an account, type "Y" if you want to proceed.
Next, it will ask for the credit card's limit and apr as a percent, entered with  a comma separating it (ex. 1000,35). Alternatively, you can type the word default and it will default a new card with an $1000 limit and 35% apr.
If you type gibberish here, it will cancel the account opening.
If you type correctly formatted input, it will display the new credit card details.
Next, the user will be prompted to do an action of some kind. The options are:

1-Make a transaction
2- Make a card payment
3-See outstanding balance for given day
4-See all credit card data

And you select one by intering the corresponding number.

1. Transaction - enter the amount of the transaction(no dollar sign), and the day of the transaction (0-30) separated by a comma only. If the transaction amount is too much for the credit limit-outstanding balance, or if they day entered is invalid the transaction will be declined.

2. Card Payment - enter the amount of the payment(no dollar sign). and the day of the transaction (0-30) separated by a comma only. If the payment amount doesn't make sense (i.e the amount is greater than the outstanding balance or credit limit) or the day of payment is invaid, the payment won't be processed.

3. Outstanding balance for given day - enter the day number you wwant to see the current outstanding balance for. If the day = 30, it will contain the accumulated interest, and if the day is less than 30 it will be the sum of all of the transactions up through the entered day minus the payments up to the entered day.

4. All account data - this will return the following:
    - Credit Limit
    - APR (as a decimal)
    - Outstanding Balance (on day of latest transaction or payment)
    - Day of last payment or transaction (day the outstanding balance above corresponds to)
    - List of Transactions (amount and day)
    - List of Card Payments (amount and day)

If you have any questions, email wigmore.s@husky.neu.edu






