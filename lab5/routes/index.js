const infoRoutes = require('./information');

const constructorMethod = (app) => {

    app.use('', infoRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};
module.exports = constructorMethod;