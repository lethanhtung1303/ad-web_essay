class RoomController {
    // [GET] /
    room(req, res, next) {
        res.render('./room');
    }
}
module.exports = new RoomController();