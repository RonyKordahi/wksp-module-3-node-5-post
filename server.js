'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {stock, customers} = require("./data/promo");

const PORT = process.env.PORT || 8000;

//status results
let status = false;
let error = "";

const homepage = (req, res) => {
    res.render("pages/homepage");
}

const addItem = (req, res) => {
    const todoItem = req.body.toDo;
    items.push(todoItem);
    res.render("pages/addItem", {
        items: items
    })
}

const order = (req, res) => {
    const { givenName, surname, order, size, email, address, city, province, postcode, country } = req.body;
    
    if (!givenName || !surname || !order || !size || !email || !address || !city || !province || !postcode || !country) {
        status = "error";
        error = "000"
        res.send({status: status, error: error});
    }

    if (size && stock[order][size] == 0) {
        status = "error";
        error = "450";
        res.send({status: status, error: error});
    }
    
    customers.forEach(customer => {
        if (customer.givenName === givenName && customer.surname === surname || customer.address === address) {
            status = "error";
            error = "550";
            res.send({status: status, error: error});
        }
    })

    if (country !== "Canada") {
        status = "error";
        error = "650";
        res.send({status: status, error: error});
    }

    status = "success";
    res.send({status: status});
}

const confirmation = (req, res) => {
    res.render("pages/order-confirmed")
}

let items = [];

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .set('view engine', 'ejs')

    // endpoints
    .get("/todos", homepage)
    .post("/data", addItem)
    .post("/order", order)
    .get("/order-confirmed", confirmation)
    .get('*', (req, res) => res.send('Dang. 404.'))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));