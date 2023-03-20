const items = {
  10: "Jollof Rice",
  11: "Fried Rice",
  12: "White Rice",
  13: "Beef",
  14: "Chicken",
  15: "Fried fish",
  16: "Beans",
  17: "Plantain",
  18: "Noodles",
  19: "Sharwama",
  20: "Coke",
};

const welcomeMsg = `Select 1 to Place an order
                    Select 97 to see current order
                    Select 98 to see order history
                    Select 99 to checkout order
                    Select 0 to cancel order`;

const orderMsg = [
                `Select 97 to see current order
                Select 99 to checkout order
                Select 0 to cancel order` ,

                `Order cancelled successfully
                To start a new order,
                Select 1 to check list of items available`,

                `You have no current order
                To start a new order,
                Select 1 to check list of items available`,

                `You have no order history!!!
                Select 1 to check list of items available`,

                `Order successfully checked out
                Select 1 to make new orders`,

                `You have no current order to cancel
                To start a new order,
                Select 1 to check list of items available`,

                `Seems you entered a wrong input:\n` + welcomeMsg,

                `Good day, pls kindly check the following menu to make order`
];

export { items, welcomeMsg, orderMsg };
