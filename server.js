const dotanv = require('dotenv');
dotanv.config();

const connectDb = require('./config/config');
const app = require('./index');

const PORT = process.env.PORT || 8080;

// For local/dev usage: connect to DB then start Express server.
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running On Port ${PORT}`.bgCyan.white);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to DB:', err);
        process.exit(1);
    });
