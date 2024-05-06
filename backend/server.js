const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());
//to add frontend path configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'frontend')));

const menu = [
    {
      "id": "coffee",
      "name": "Iced Latte",
      "price": 5.99
    },
    {
      "id": "hcoffee",
      "name": "Hot Latte",
      "price": 4.99
    },
    {
      "id": "matcha",
      "name": "Matcha Latte",
      "price": 5.99
    },
    {
      "id": "tea",
      "name": "Tea",
      "price": 3.99
    },
    {
      "id": "break",
      "name": "Breakfast Sandwich",
      "price": 4.79
    },
    {
      "id": "croissant",
      "name": "Croissant",
      "price": 2.99
    },
    {
      "id": "cake",
      "name": "Mini Bundt Cake",
      "price": 3.99
    },
    {
      "id": "fries",
      "name": "Basket of Fries",
      "price": 5.99
    },
    {
      "id": "pasta",
      "name": "Pasta - Weekly Special",
      "price": 12.79
    },
    {
      "id": "pizza",
      "name": "Personal Pizza",
      "price": 7.99
    },
    {
      "id": "tacos",
      "name": "Tacos - mini",
      "price": 3.99
    }
  ];
//get the front-end menu file
app.get('/',(req, resp)=> {
  resp.sendFile(path.join(__dirname, 'frontend', 'menu.html'))
})
//add the pricing
app.post('/submit', (req, resp)=>{
  const {item, quantity} = req.body;
  const total = parseFloat(item.price) * parseFloat(quantity);
  resp.send('Total: $${total}')
})

app.post('/process-order', (req, resp) => {
  const {items} = req.body;
  let totalAmount = 0;
  let orderDetails = [];

  items.forEach(item => {
    const {food, quantity} = item;

    const itemTotal = food.price * quantity;
    totalAmount += itemTotal;

    orderDetails.push({food, quantity, itemTotal});
    });
    resp.json({totalAmount, orderDetails});
  });
// generate order confimration message
app.get('/order-confirmation', (req, resp) => {
    resp.send('Order confirmed! Thank you for your purchase.');
  });
//call to order confirmation message
app.post('/process-order', (req, resp) => {
  resp.redirect('/order-confirmation');
});

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});