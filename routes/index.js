const homeRouter = require('./home');
const roomRouter = require('./room');

function route(app) {
    app.use('/room', roomRouter);
    app.use('/', homeRouter);
}

module.exports = route;
