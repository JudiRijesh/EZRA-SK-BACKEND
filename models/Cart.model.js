
const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    userId: 
    {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
   },
   services: [
    {
      name: String,
      description: String,
      time: {
        type: String,
        default: "09:00" 
      }
    }
  ],
    createdAt: 
    { 
    type: Date,
    default: Date.now },
})


const Cart = model("Cart",cartSchema)

module.exports = Cart
