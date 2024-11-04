
const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    userId: 
    {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
   },
    items:
    [{ 
    type: Schema.Types.ObjectId, 
    ref: 'CartItem' 
  }],
    createdAt: 
    { 
    type: Date,
    default: Date.now },
})


const Cart = model("Cart",cartSchema)

module.exports = Cart
