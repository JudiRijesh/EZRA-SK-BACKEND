
const {Schema, model} = require('mongoose')

const contactSchema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  phone: {
     type: String, 
     required: true 
    },
  province: { 
    type: String, 
    required: true
 },
  organisation: { 
    type: String, 
    required: true 
}
}, { timestamps: true });

const Contact = model("Contact",contactSchema)

module.exports = Contact
