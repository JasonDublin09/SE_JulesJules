const app = require('./app')

const dotenv = require('dotenv')

const connectDatabase = require('./config/database')
    //setting up config file

dotenv.config({ path: `backend/config/config.env` })

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server started  on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
})