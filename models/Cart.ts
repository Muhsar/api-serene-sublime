const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product_id:{
        type: String
    },
    title:{
        type: String
    },
    price:{
        type: String
    },
    description:{
        type: String
    },
    category:{
        type: String
    },
    image:{
        type: String
    },
    amount:{
        type: String
    },
    user_id:{
        type: String
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
