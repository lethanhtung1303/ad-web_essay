let socket;
let messageForm;
let roomMessage;
let roomName;
let userList;

window.onload = () => {
    socket = io();
    messageForm = document.getElementById('message-form');
    roomMessage = document.getElementById('room-messages');
    roomName = document.getElementById('room-name');
    userList = document.getElementById('user-list');

    let { inputUserName, choseRoom } = Qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    socket.emit('joinRoom', { inputUserName, choseRoom });

    socket.on('msg', handleMsg);

    socket.on('room', handleRoom);

    messageForm.onsubmit = (e) => {
        e.preventDefault();

        let inputMessage = document.getElementById('inputMessage');

        socket.emit('chatMsg', inputMessage.value);

        inputMessage.value = '';
        inputMessage.focus();
    };
};

function handleMsg(msg) {
    showMsg(msg);
    roomMessage.scrollTop = roomMessage.scrollHeight;
}

function handleRoom({ room, users }) {
    showRoom(room);
    showUser(users);
}

function showMsg(msg) {
    let div = document.createElement('div');
    div.classList.add('box-messages');
    div.innerHTML = `
    <p class="text">
        ${msg.msg}
    </p>
    <p class="info">${msg.username} <span>${msg.time}</span></p>
`;
    document.getElementById('room-messages').appendChild(div);
}

function showRoom(room) {
    roomName.innerText = room;
}

function showUser(users) {
    userList.innerHTML = `
    ${users.map((u) => `<li>${u.username}</li>`).join('')}
`;
}
