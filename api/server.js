const app = require('../index');
const connectDb = require('../config/config');

let connected = false;

// Vercel (or other hosts that expect a (req, res) handler)
// Ensure DB is connected on first invocation, but do not exit process on failure.
module.exports = async (req, res) => {
    if (!connected) {
        try {
            await connectDb();
            connected = true;
        } catch (err) {
            console.error('DB connection failed in serverless handler:', err);
            res.status(500).send('Database connection error');
            return;
        }
    }

    return app(req, res);
};
