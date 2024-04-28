import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name : { 
    type: String, 
    required: true 
},
  description : { 
    type: String, 
    required: true 
},
  price : { 
    type: Number, 
    required: true 
},
  color : { 
    type: String 
},
 size : {
    type: String,
    enum : ['S', 'M', 'L', 'XL']
},
 image: { 
    type: String 
},
  quantity: { 
    type: Number, 
    default: 0 
}
});

export default mongoose.model('Product', productSchema);
