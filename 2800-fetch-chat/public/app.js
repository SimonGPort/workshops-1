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
  <form action="/set/topic" method="POST" enctype="multipart/form-data">    
    <input type="text" name="topic"></input>    
    <input type="submit"></input>    
  </form>
  <h3>Send message</h3>
  <form id="message-form">    
    <input type="text" id="message-input"></input>    
    <input type="submit"></input>    
  </form>
  <h3>Ignore user</h3>
  <form action="/set/ignore" method="POST" enctype="multipart/form-data">    
    <input type="text" name="username"></input>    
    <input type="submit"></input>    
  </form>
  <h3>Update username</h3>
  <form action="/set/username" method="POST" enctype="multipart/form-data">    
    <input type="text" name="username"></input>    
    <input type="submit"></input>    
  </form>
  <h3>Update color</h3>
  <form action="/set/color" method="POST" enctype="multipart/form-data">    
    <select name="color">
      <option value="red">Red</option>
      <option value="pink">Pink</option>
      <option value="black">Black</option>
    </select>
    <input type="submit"></input>    
  </form>
`;

const fetchAndUpdate = async () => {
  const response = await fetch('/messages');
  const responseBody = await response.text();
  const parsed = JSON.parse(responseBody);
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
  Object.keys(activeUsers).map((username) => {
    const li = document.createElement('li');
    li.textContent = username;
    activeListUL.append(li);
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

    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('message', messageInput.value);
      fetch('/messages', {
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
      });
    });

    fetchAndUpdate();
    setInterval(fetchAndUpdate, 500); // Request new messages every 500ms
  } else {
    alert(parsed.message);
  }
});
