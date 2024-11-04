const {Schema, model} = require('mongoose')

const cartItemSchema = new Schema({

    name: 
    { 
    type: String,
    required: true
    },
    serviceId: 
    {
    type: String, 
    required: true 
    }, 
    quantity: 
    { 
    type: Number, 
    default: 1 
    },
    cartId: 
    { 
    type: Schema.Types.ObjectId, 
    ref: 'Cart',
    required: true 
},
});

module.exports = mongoose.model('CartItem', cartItemSchema);