const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = messageInput.value;
  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  messageInput.value = '';
});

function poll() {
  fetch('http://localhost:3000/poll')
    .then(response => response.json())
    .then(data => {
      messagesDiv.innerHTML = '';
      data.forEach(message => {
        const p = document.createElement('p');
        p.textContent = message.message;
        messagesDiv.appendChild(p);
      });
      poll();
    });
}

poll();
