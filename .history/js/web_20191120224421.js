const msgEl = document.getElementById('msg');
function enterChat (e) {
  if (e.keyCode === 13) {
    sendChat();
  }
}
function sendChat (e) {
  const val = msgEl.value;
  console.log(val)
  if (!val) return;
  socket.emit('chat', {
    userId,
    name,
    msg: val
  });
  msgEl.value = '';
}