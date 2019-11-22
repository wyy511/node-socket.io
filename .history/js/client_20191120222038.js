export const enterChart = function (e) {
  if (e.keyCode === 13) {
    sendChart();
  }
}
export const sendChart = function (e) {
  const val = msgEl.value;
  if (!val) return;
  socket.emit('chat', {
    userId,
    name,
    msg: val
  });
  msgEl.value = '';
}