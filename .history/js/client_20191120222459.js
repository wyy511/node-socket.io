function enterChart (e) {
  if (e.keyCode === 13) {
    sendChart();
  }
}
function sendChart (e) {
  const val = msgEl.value;
  if (!val) return;
  socket.emit('chat', {
    userId,
    name,
    msg: val
  });
  msgEl.value = '';
}