const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Name']
    },
    description: {
        type: String,
        required: [true, 'Please enter Description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter Price'],

        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }    
    ],
    category: [
        {
            type: String,
            required: [true, 'Please enter Category for the pdouct'],
            enum: {
                values: [
                    'Pastas & Noodles',
                    'Desserts',
                    'Seafood',
                    'Chicken',
                    'Beef',
                    'Pork',
                    'Special Orders'
                ],
                message: 'Please select the correct category for the product'
            }
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)