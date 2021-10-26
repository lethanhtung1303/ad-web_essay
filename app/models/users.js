const userList = [];

function userJoin(id, username, room) {
    const user = { id, username, room };
    userList.push(user);
    return user;
}

function getOldUser(id) {
    return userList.find((user) => user.id === id);
}

function getByeUser(id) {
    const index = userList.findIndex((user) => user.id === id);
    if (index !== -1) {
        return userList.splice(index, 1)[0];
    }
}

function getUserInRoom(room) {
    return userList.filter((user) => user.room === room);
}

module.exports = {
    userJoin,
    getOldUser,
    getByeUser,
    getUserInRoom,
};
