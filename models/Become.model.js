
const {Schema, model} = require('mongoose')

const becomeSchema = new Schema({
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
  field: { 
    type: String, 
    required: true 
}
}, { timestamps: true });

const Become = model("Become",becomeSchema)

module.exports = Become
