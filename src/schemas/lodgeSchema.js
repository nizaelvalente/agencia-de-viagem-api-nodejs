const mongoose = require('mongoose')

const lodgeSchema = new mongoose.Schema({
    //nome, tipo do quarto, preço, piscina, estrela, refeições, 
    name: { type: String, required: true },
    typeOfRoom: { type: String, enum: ['Suite', 'Quarto'], required: true},
    price: { type: Number, required: true },
    pool: { type: Boolean, default: false },
    quality: { type: Number, enum: [1,2,3,4,5], required: true },
    meals: [{type: String, enum: ['Café', 'Almoço', 'Janta'], required: true}],
    discount: {type: Boolean, default: false},
    discountValue: {type: Number, required: true},
    deleted: {type: Boolean, default: false}
}, { timestamps: true })

mongoose.model('Lodge', lodgeSchema)