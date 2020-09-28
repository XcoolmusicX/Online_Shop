const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product_Schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    imgUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

const Product = new mongoose.model('Product', product_Schema)


exports.Product = Product