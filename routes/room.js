const express = require('express');
const router = express.Router();

const roomController = require('../app/controllers/RoomController');

router.get('/', roomController.room);

module.exports = router;
