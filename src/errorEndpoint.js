module.exports = (app) => {
    app.get('/debug-sentry-6', (req, res) => {
        throw new Error('Again.');
    });
};