const resultRoutes = require('./result');

const constructorMethod = (app) => {
    app.use('/', resultRoutes);

    // app.use('*', (req, res) => {
    //     res.status(404).json({ error: 'Not found' });
    // });
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;