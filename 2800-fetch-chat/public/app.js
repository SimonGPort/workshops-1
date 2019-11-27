const signupForm = document.getElementById('signup-form');
const signupUsername = document.getElementById('signup-username');
const signupPassword = document.getElementById('signup-password');
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const HTML = `
<h1 id="topic"></h1>
  <ul id="msg-list"></ul>
  <ul id="active-list"></ul>
  <h3>Update topic</h3>
  <form id="topic-form">
    <input type="text" id="topic-input"></input>
    <input type="submit"></input>
  </form>
  <h3>Send message</h3>
  <form id="message-form">
    <input type="text" id="message-input"></input>
    <input type="submit"></input>
  </form>
  <h3>Ignore user</h3>
  <form id="ignore-form">
    <input type="text" id="ignore-input"></input>
    <input type="submit"></input>
  </form>
  <h3>Update username</h3>
  <form id="update-form">
    <input type="text" id="update-input"></input>
    <input type="submit"></input>
  </form>
  <h3>Update color</h3>
  <form id="color-form">
    <select id="color-select">
      <option value="red">Red</option>
      <option value="pink">Pink</option>
      <option value="black">Black</option>
    </select>
    <input type="submit"></input>
  </form>
  <ul id="direct-message-list"></ul>
  <h3>Send direct message</h3>
  <form id="direct-message-form">
    <input type="text" id="direct-message-recipient"></input>
    <input type="text" id="direct-message-input"></input>
    <input type="submit"></input>
  </form>
`;

const fetchAndUpdate = async () => {
  const response = await fetch('/messages');
  const responseBody = await response.text();
  const parsed = JSON.parse(responseBody);
  if (!parsed.success) return alert('Server error');
  const msgListUL = document.getElementById('msg-list');
  msgListUL.innerHTML = '';
  parsed.messages.forEach((message) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color: ${message.color};">${message.user}</span>: ${message.msg}`;
    msgListUL.append(li);
  });
  const topic = document.getElementById('topic');
  topic.textContent = parsed.topic;
  const activeListUL = document.getElementById('active-list');
  activeListUL.innerHTML = '';
  //   const activeUsersMap = {};
  //   parsed.messages
  //     .filter((message) => Date.now() - message.timestamp <= 5000)
  //     .forEach((message) => (activeUsersMap[message.user] = true));

  const activeUsers = parsed.messages.reduce((acc, message) => {
    if (Date.now() - message.timestamp <= 5000) acc[message.user] = true;
    return acc;
  }, {});
  Object.keys(activeUsers).forEach((username) => {
    const li = document.createElement('li');
    li.textContent = username;
    activeListUL.append(li);
  });

  const directMsgListUL = document.getElementById('direct-message-list');
  directMsgListUL.innerHTML = '';
  parsed.directMessages.forEach((message) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color: ${message.color};">${message.user}</span>: ${message.msg}`;
    directMsgListUL.append(li);
  });
};

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('username', signupUsername.value);
  formData.append('password', signupPassword.value);
  const res = await fetch('/signup', {
    method: 'POST',
    body: formData,
  });
  const body = await res.text();
  const parsed = JSON.parse(body);
  console.log(parsed);
  if (parsed.success) {
    alert('Signup successful!');
  } else {
    alert(parsed.message);
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('username', loginUsername.value);
  formData.append('password', loginPassword.value);
  const res = await fetch('/login', {
    method: 'POST',
    body: formData,
  });
  const body = await res.text();
  const parsed = JSON.parse(body);
  console.log(parsed);
  if (parsed.success) {
    document.body.innerHTML = HTML;

    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('message', messageInput.value);
      const res = await fetch('/messages', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        messageInput.value = '';
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    const ignoreForm = document.getElementById('ignore-form');
    const ignoreInput = document.getElementById('ignore-input');

    ignoreForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', ignoreInput.value);
      const res = await fetch('/set/ignore', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        ignoreInput.value = '';
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    const topicForm = document.getElementById('topic-form');
    const topicInput = document.getElementById('topic-input');

    topicForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('topic', topicInput.value);
      const res = await fetch('/set/topic', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        topicInput.value = '';
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    const updateForm = document.getElementById('update-form');
    const updateInput = document.getElementById('update-input');

    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', updateInput.value);
      const res = await fetch('/set/username', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        updateInput.value = '';
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    const colorForm = document.getElementById('color-form');
    const colorSelect = document.getElementById('color-select');

    colorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('color', colorSelect.value);
      const res = await fetch('/set/color', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    const directMessageForm = document.getElementById('direct-message-form');
    const directMessageRecipient = document.getElementById(
      'direct-message-recipient'
    );
    const directMessageInput = document.getElementById('direct-message-input');

    directMessageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('recipient', directMessageRecipient.value);
      formData.append('message', directMessageInput.value);
      const res = await fetch('/direct-message', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
      const body = await res.text();
      const parsed = JSON.parse(body);
      if (parsed.success) {
        fetchAndUpdate();
      } else {
        alert('Server error');
      }
    });

    fetchAndUpdate();
    setInterval(fetchAndUpdate, 500);
  } else {
    alert(parsed.message);
  }
});
