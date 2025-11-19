const app = require('../index');

// Vercel (or other hosts that expect a (req, res) handler)
// Forward incoming requests to the existing Express app.
module.exports = (req, res) => {
    return app(req, res);
};
