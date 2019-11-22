
function enterChat (e) {
  if (e.keyCode === 13) {
    sendChat();
  }
}
function sendChat (e) {
  const msgEl = document.getElementById('msg');
  console.log(msgEl)
  const val = msgEl.value;
  if (!val) return;
  socket.emit('chat', {
    userId,
    name,
    msg: val
  });
  msgEl.value = '';
}