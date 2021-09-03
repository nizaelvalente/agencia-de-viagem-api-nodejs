const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    class: {type:String, enum: ['economic', 'executive'], required: true},
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    dateOfDeparture: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    price: {type: Number, required: true},
    discount: {type: Boolean, default: false},
    discountValue: {type: Number, required: true},
    deleted: {type: Boolean, default: false}
}, { timestamps: true })

mongoose.model('Ticket', ticketSchema)