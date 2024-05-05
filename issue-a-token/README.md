# Issue a Token and use trust lines

> This code demonstrates how to issue a (fungible) token on the XRP Ledger and the usage of trust lines.

## Concepts:

Trust lines are structures in the XRP Ledger for holding fungible tokens. Trust lines enforce the XRP Ledger's rule that you cannot cause someone else to hold a token they don't want.
Each trust line is specific to a given currency code. Two accounts can have any number of trust lines between them for different currency codes, but only one shared trust line for any particular currency code.

The balance on a trust line is negative or positive depending on which side you view it from. The side with the negative balance is called the "issuer" and can control some properties of how those tokens behave. When you send tokens to another account that isn't the issuer, those tokens "ripple" through the issuer and possibly other accounts using the same currency code. This is useful in some cases, but can cause unexpected and undesirable behavior in others. You can use the No Ripple flag on trust lines to prevent those trust lines from rippling.

## Usage:

The code is designed to run in-browser by loading demo.html and watching the console output or in Node.js.

- install the dependencies : `npm install`
- run the script : `npm start`
- or open `demo.html` with `Live server` and check the console
