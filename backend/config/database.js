const mongoose = require('mongoose')


const connectDatabase = () => {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(con => {
            console.log(`congrats naka connect kana sa mongodb ${con.connection.host}`)
        })
}

module.exports = connectDatabase