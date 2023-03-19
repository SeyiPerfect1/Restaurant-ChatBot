# Restaurant-ChatBot <hr>

## Introduction
As part of the requirement of graduation from [AltschoolAfrica](https://altschoolafrica.com) School of Engineering's Diploma, this project entails building a restaurant chatbot that will assist customers in placing orders for their preferred meals. The main idea was that customers are expected to send options and the backend would have a chat app that would respond to the options
<hr>

## Base URL
 * [Link to app](https://chat-bot-f5fs.onrender.com/) 
 <hr>

## Description

* ChatBot interface is like a chat interface
* No authentication, but users sessions are stored based on devices
* The following options are available for the users:
   ```
   Select 1 to Place an order
   Select 99 to checkout order
   Select 98 to see order history
   Select 97 to see current order
   Select 0 to cancel order
   ```
* When a customer selects **1**, the bot returns a list of items from the restaurant. Customer is able to select the preferred items from the list using this same   
  number select system and place an order
* When a customer selects **99** out an order, the bot respond with “order placed” and if none the bot respond with “No order to place”. Customer can also see all       option to place a new order
* When a customer selects **98**, the bot returns all placed order
* When a customer selects **97**, the bot returns current order
* When a customer selects **0**, the bot cancel the order if there is 
<hr>

## Local Setup <br>
 * Install NodeJS, MongoDB
 * Clone this repo
   ```
   git clone https://github.com/SeyiPerfect1/Restaurant-ChatBot
   ```
 * Update env with example.env
 * Download all dependecies using
   ```
   npm install
   ```
 * Run the app
   ```
   npm run start
   ```
...

Contributor:
Oluseyi Adeegbe 

