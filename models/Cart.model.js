
const {Schema, model} = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      serviceId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true 
      },
      name: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String 
      },
    },
  ],
}, { timestamps: true });

const Cart = model('Cart', cartSchema);

module.exports = Cart;