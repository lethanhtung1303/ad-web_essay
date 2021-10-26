const moment = require("moment-timezone");

module.exports = (username, msg) => {
    return {
        username,
        msg,
        time: moment.tz('Asia/Ho_Chi_Minh').format('h:mm A'),
    };
};
