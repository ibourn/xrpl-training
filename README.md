# XRPL Training

> Exploring XRPL during a two-day development training session thanks to [XRP-Commons](https://www.xrpl-commons.org/).  
> _See also: [xrpl-evmSidechain](https://github.com/ibourn/xrpl-evmSidechain)._

## Table of Contents

- [Introduction to XRPL](#introduction-to-xrpl)
- [Key Features](#key-features)
- [Operational Specifics](#operational-specifics)
- [Developing with XRPL](#developing-with-xrpl)
  - [Typical Application Workflow](#typical-application-workflow)
- [Built-in Features](#built-in-features)
  - [Available Functionalities](#available-functionalities)
- [Amendments Underway](#amendments-underway)
- [Content of the Repo](#content-of-the-repo)
- [Resources](#resources)
  - [Documentation](#documentation)
  - [Wallet](#wallet)
  - [Explorers](#explorers)

## Introduction to XRPL

In 2011, David Schwartz, Jed McCaleb, and Arthur Britto, inspired by Bitcoin, aimed to create a superior blockchain that addressed its limitations. They were joined by Chris Larsen, launched the XRP Ledger and started the company NewCoin (renamed OpenCoin, and now Ripple) in 2012. The founders endowed Ripple with 80 billion XRP, the native currency of XRPL, most of which is now in escrow. The XRPL Foundation, established on September 24, 2020, is a nonprofit organization dedicated to supporting the development and adoption of the decentralized XRPL. It was initially funded by donations exceeding $6.5M from Coil, Ripple, and Gatehub.

## Key Features

- **No Mining Required:** All supply is pre-minted. Validators have incentives tied to network security or their own service needs.
- **Consensus Mechanism:** XRPL uses a unique Proof of Association (PoA). There are 120 validators, with 35 on the Unique Node List (UNL). These trusted validators are crucial for consensus and amendment votes. An 80% majority is required for decisions. UNL status requires approval from the independent XRPL Foundation, which assesses validators' capability and reliability to prevent downtime.
- **Performance:** Transactions are fast (3-5 seconds to settle), low-cost ($0.0002 per transaction), and scalable (1,500 transactions per second).
- **Eco-Friendliness:** The energy-efficient design reduces the environmental impact, addressing the long transaction times, high costs, and excessive intermediaries typical in traditional financial systems.

## Operational Specifics

- There are no rewards on XRPL; however, the network uses calibrated fees that increase with load to prevent spam. These fees are burned rather than collected.
- Additionally, the creation of an account requires locking 10 XRP as an "account reserve," a security measure to deter spam by making it costly to create multiple accounts.
- XRPL operates without smart contracts but includes native functionalities.

## Developing with XRPL

Developers interact with XRPL through an API, submitting transactions or queries to change or check the ledger state.

XRPL supports various programming languages including Java, PHP, Go, and JavaScript, and protocols like HTTP and WebSocket. Numerous libraries ease the integration of XRPL into applications.

### Typical Application Workflow

1. **Creating a Client:** Initialize communication with the network.
2. **Connecting to the Network:** Establish an active session with XRPL.
3. **Submitting Transactions or Queries:** Modify the ledger state as needed.
4. **Disconnecting:** Close the session.

## Built-in Features

- **CLOB (Central Limit Order Book):** Manages liquidity efficiently, operational for over 10 years.
- **AMM (Automated Market Maker):** A newer feature complementing CLOB, it helps manage low liquidity situations and facilitates price discovery, giving access to a native DEX for secure peer-to-peer exchanges.
- **Auto Bridging:** Utilizes XRP as an intermediary currency to find the best exchange rate between two assets.
- **Path Finding:** Finds the best route between assets for the final exchange.
- **Rippling:** Describes a process of atomic net settlement between multiple connected parties who have trust lines for the same token. Rippling allows users who hold tokens to send those to each other with the issuer as a passive intermediary, facilitating a passive, two-way exchange order with a 1:1 exchange rate for two tokens with the same currency code but different issuers.

### Available Functionalities

- **Fungible tokens, including stablecoins and NFTs**
- **Multisig:** Enhances security by requiring multiple parties to sign a transaction.
- **Payment Channel:** Batches many small payments into one transaction.
- **Tickets and Checks:** Allow for deferred payments.
- **Memo and Tags:** Include additional information in transactions.
- **Trustlines:** Ensure transactions between specific parties for precise or limited amounts with defined tokens.
- ...and many more.

## Amendments Underway

- **Integration of DID and the EVM Sidechain:** Aiming to expand the functionalities and utility of the XRPL ecosystem.

## Content of the Repo

This repository contains several code examples:

- `app-create-and-send`: A small Vite project for creating accounts and exchanging XRP.
- `create-amm`: A TypeScript project to create and use an AMM, add liquidity, swap, etc.
- `issue-token`: Create a token and establish a trust line.
- `monitor-payments-websocket`: Monitor payments using WebSockets.
- `multisigning`: Use multisig for transactions.
- `secure-signing`: Use off-chain signing.
- `send-a-memo`: Include a memo in a transaction.
- `trade-in-the-dex`: Perform operations with the DEX.

## Resources

Documentation:

- [XRPL Commons](https://www.xrpl-commons.org/)
- [XRPL Documentation](https://xrpl.org/docs/)
- [XRPL JavaScript Library](https://js.xrpl.org/)
- [Code Samples](https://xrpl.org/resources/code-samples#)

Wallet:

- [XUMM App](https://xumm.app/)

Explorers:

- [XRPL Testnet](https://testnet.xrpl.org/)
- [XRPS can](https://xrpscan.com/)
