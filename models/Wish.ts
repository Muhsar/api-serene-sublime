const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
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
    user_id:{
        type: String
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const Wish = mongoose.model('Wish', WishSchema);
export default Wish;
