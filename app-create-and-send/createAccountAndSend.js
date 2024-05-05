import * as xrpl from "xrpl";

// *****************************************************************
// ************* Define HTML Form Fields as constants **************
// *****************************************************************
const tn = document.getElementById("tn");
const dn = document.getElementById("dn");
const standbyResultField = document.getElementById("standbyResultField");
const operationalResultField = document.getElementById(
  "operationalResultField"
);
const standbyAccountField = document.getElementById("standbyAccountField");
const standbyPubKeyField = document.getElementById("standbyPubKeyField");
const standbyPrivKeyField = document.getElementById("standbyPrivKeyField");
const standbyBalanceField = document.getElementById("standbyBalanceField");
const standbySeedField = document.getElementById("standbySeedField");
const standbyAmountField = document.getElementById("standbyAmountField");
const standbyDestinationField = document.getElementById(
  "standbyDestinationField"
);
const operationalAccountField = document.getElementById(
  "operationalAccountField"
);
const operationalPubKeyField = document.getElementById(
  "operationalPubKeyField"
);
const operationalPrivKeyField = document.getElementById(
  "operationalPrivKeyField"
);
const operationalSeedField = document.getElementById("operationalSeedField");
const operationalBalanceField = document.getElementById(
  "operationalBalanceField"
);
const operationalAmountField = document.getElementById(
  "operationalAmountField"
);
const operationalDestinationField = document.getElementById(
  "operationalDestinationField"
);
const seeds = document.getElementById("seeds");

const createAccountButton = document.getElementById("createAccountButton");
createAccountButton.addEventListener("click", () => {
  getAccount("standby");
});
const createOperationalAccountButton = document.getElementById(
  "createOperationalAccountButton"
);
createOperationalAccountButton.addEventListener("click", () => {
  getAccount("operational");
});
const sendXrpButton = document.getElementById("sendXrpButton");
sendXrpButton.addEventListener("click", () => {
  sendXRP("operational");
});
const opSendXrpButton = document.getElementById("opSendXrpButton");
opSendXrpButton.addEventListener("click", () => {
  sendXRP("standby");
});
const getAccountsFromSeedsButton = document.getElementById(
  "getAccountsFromSeeds"
);
getAccountsFromSeedsButton.addEventListener("click", () => {
  getAccountsFromSeeds();
});

// *******************************************************
// ************* Get the Preferred Network ***************
// *******************************************************
function getNet() {
  let net;
  if (tn.checked) net = "wss://s.altnet.rippletest.net:51233";
  if (dn.checked) net = "wss://s.devnet.rippletest.net:51233";
  return net;
}

// *******************************************************
// ************* Get Account *****************************
// *******************************************************
async function getAccount(type) {
  const resultField =
    type == "standby" ? standbyResultField : operationalResultField;

  // -----------------------------------Connect to the selected ledger
  const net = getNet();

  const client = new xrpl.Client(net);
  let results = "Connecting to " + net + "....<br/>";
  resultField.innerHTML = results;

  await client.connect();

  results += "\nConnected, funding wallet.<br/>";
  resultField.innerHTML = results;

  // -----------------------------------Create and fund a test account wallet
  // This uses the default faucet for Testnet/Devnet
  const faucetHost = null;
  const amount = "930";
  const myWallet = (await client.fundWallet(null, { amount, faucetHost }))
    .wallet;

  results += "\nGot a wallet.<br/>";
  resultField.innerHTML = results;

  // -----------------------------------Get the current balance.
  const myBalance = await client.getXrpBalance(myWallet.address);

  // ------------------Populate the fields for Standby and Operational accounts
  if (type == "standby") {
    standbyAccountField.innerHTML = myWallet.address;
    standbyPubKeyField.innerHTML = myWallet.publicKey;
    standbyPrivKeyField.innerHTML = myWallet.privateKey;
    standbyBalanceField.innerHTML = myBalance;
    standbySeedField.innerHTML = myWallet.seed;
    results += "\nStandby account created.<br/>";
  } else {
    operationalAccountField.innerHTML = myWallet.address;
    operationalPubKeyField.innerHTML = myWallet.publicKey;
    operationalPrivKeyField.innerHTML = myWallet.privateKey;
    operationalSeedField.innerHTML = myWallet.seed;
    operationalBalanceField.innerHTML = myBalance;
    results += "\nOperational account created.<br/>";
  }
  resultField.innerHTML = results;

  // --------------- Capture the seeds for both accounts for ease of reload.
  seeds.value =
    standbySeedField.innerHTML + "\n" + operationalSeedField.innerHTML;
  client.disconnect();
}

// *******************************************************
// ********** Get Accounts from Seeds ********************
// *******************************************************

async function getAccountsFromSeeds() {
  // -----------------------------------Connect to the selected ledger
  const net = getNet();
  const client = new xrpl.Client(net);

  let results = "Connecting to " + getNet() + "....<br/>";
  standbyResultField.innerHTML = results;

  await client.connect();
  results += "\nConnected, finding wallets.<br/>";
  standbyResultField.innerHTML = results;

  // -----------------------------------Find the test account wallets
  const lines = seeds.value.split("\n");
  let standbyWallet, operationalWallet;
  try {
    standbyWallet = xrpl.Wallet.fromSeed(lines[0]);
    operationalWallet = xrpl.Wallet.fromSeed(lines[1]);
  } catch (e) {
    results += "Error getting account from seeds<br/>Please enter valid seeds.";
    standbyResultField.innerHTML = results;
    throw e;
  }
  // -----------------------------------Get the current balance.
  const standbyBalance = await client.getXrpBalance(standbyWallet.address);
  const operationalBalance = await client.getXrpBalance(
    operationalWallet.address
  );

  // ------------------Populate the fields for Standby and Operational accounts
  standbyAccountField.innerHTML = standbyWallet.address;
  standbyPubKeyField.innerHTML = standbyWallet.publicKey;
  standbyPrivKeyField.innerHTML = standbyWallet.privateKey;
  standbySeedField.innerHTML = standbyWallet.seed;
  standbyBalanceField.innerHTML = standbyBalance;

  operationalAccountField.innerHTML = operationalWallet.address;
  operationalPubKeyField.innerHTML = operationalWallet.publicKey;
  operationalPrivKeyField.innerHTML = operationalWallet.privateKey;
  operationalSeedField.innerHTML = operationalWallet.seed;
  operationalBalanceField.innerHTML = operationalBalance;

  client.disconnect();
}

// *******************************************************
// ******************** Send XRP *************************
// *******************************************************
async function sendXRP(recipient) {
  // ------------------Determine the origin and recipient infos
  let originResultField, originSeedField, amountField, originBalanceField;
  let recipientsSeedField, recipientField, recipientBalanceField;
  let originWallet, recipientWallet;
  if (recipient == "operational") {
    originResultField = standbyResultField;
    originSeedField = standbySeedField;
    originBalanceField = standbyBalanceField;
    amountField = standbyAmountField;
    recipientField = standbyDestinationField;
    recipientsSeedField = operationalSeedField;
    recipientBalanceField = operationalBalanceField;
  } else if (recipient == "standby") {
    originResultField = operationalResultField;
    originSeedField = operationalSeedField;
    originBalanceField = operationalBalanceField;
    amountField = operationalAmountField;
    recipientField = operationalDestinationField;
    recipientsSeedField = standbySeedField;
    recipientBalanceField = standbyBalanceField;
  } else {
    return;
  }
  // -----------------------------------Connect to the selected ledger
  let results = "Connecting to the selected ledger.<br/>";
  originResultField.innerHTML = results;
  const net = getNet();
  results = "Connecting to " + getNet() + "....<br/>";
  const client = new xrpl.Client(net);
  await client.connect();

  results += "\nConnected. Sending XRP.<br/>";
  originResultField.innerHTML = results;

  // -----------------------------------Find the test account wallets
  originWallet = xrpl.Wallet.fromSeed(originSeedField.innerHTML);
  recipientWallet = xrpl.Wallet.fromSeed(recipientsSeedField.innerHTML);

  results += "\nstandbyWallet.address: = " + originWallet.address + "<br/>";
  originResultField.innerHTML = results;

  // ------------------------------------------------------- Prepare transaction
  // Note that the destination is hard coded.
  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: originWallet.address,
    Amount: xrpl.xrpToDrops(amountField.value),
    Destination: recipientField.value,
  });

  // ------------------------------------------------ Sign prepared instructions
  const signed = originWallet.sign(prepared);

  // -------------------------------------------------------- Submit signed blob
  const tx = await client.submitAndWait(signed.tx_blob);

  // ------------------Populate the fields for Standby and Operational accounts
  results +=
    "<br/>Balance changes: " +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
  originResultField.innerHTML = results;

  originBalanceField.innerHTML = await client.getXrpBalance(
    originWallet.address
  );
  recipientBalanceField.innerHTML = await client.getXrpBalance(
    recipientWallet.address
  );
  client.disconnect();
}
