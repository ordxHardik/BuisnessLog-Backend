const serverless = require('serverless-http');
const app = require('../index');
const connectDb = require('../config/config');

let cachedHandler = null;

// AWS Lambda handler (ensures DB connected before delegating to serverless-http)
module.exports.handler = async (event, context) => {
    // Try to connect once per warm container
    if (!global.__dbConnected) {
        try {
            await connectDb();
            global.__dbConnected = true;
        } catch (err) {
            console.error('DB connection failed in Lambda handler:', err);
            // Re-throw so Lambda records the failure (do not call process.exit)
            throw err;
        }
    }

    if (!cachedHandler) cachedHandler = serverless(app);
    return cachedHandler(event, context);
};
