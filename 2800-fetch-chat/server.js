const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
app.use(cookieParser());
const passwordsAssoc = {};
const sessions = {};
const messages = [];
const colors = {};
const ignored = {};
const directMessages = {};
let topic = '';

// const users = {};
// { bob: { username: 'bob', color: 'red', ignored: []}}

app.use('/static', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/messages', upload.none(), (req, res) => {
  const username = sessions[req.cookies.sid];

  // const user = sessions[req.cookies.sid];
  // { username: 'bob', color: 'red' }

  console.log('POST messages body', req.body);
  const newMessage = {
    user: username,
    msg: req.body.message,
    color: colors[username],
    timestamp: Date.now(),
  };

  // const newMessage = {
  //   user: user,
  //   msg: req.body.message,
  // };

  messages.push(newMessage);
  res.send(JSON.stringify({ success: true }));
});

app.post('/direct-message', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const recipient = req.body.recipient;
  directMessages[recipient].push({
    user: username,
    msg: req.body.message,
    color: colors[username],
    timestamp: Date.now(),
  });
  res.send(JSON.stringify({ success: true }));
});

app.get('/messages', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  console.log('Sending back the messages');
  const filteredMessages = messages.filter(
    (message) => !ignored[username].includes(message.user)
  );
  res.send(
    JSON.stringify({
      success: true,
      messages: filteredMessages,
      topic,
      directMessages: directMessages[username],
    })
  );
});

app.post('/set/username', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const currentUsername = sessions[sessionId];
  const newUsername = req.body.username;
  if (passwordsAssoc[newUsername] !== undefined) {
    return res.send('<html><body> Username taken </body></html>');
  }
  passwordsAssoc[newUsername] = passwordsAssoc[currentUsername];
  delete passwordsAssoc[currentUsername];
  sessions[sessionId] = newUsername;
  messages.forEach((message) => {
    if (message.user === currentUsername) message.user = newUsername;
  });
  ignored[newUsername] = ignored[currentUsername];
  delete ignored[currentUsername];
  colors[newUsername] = colors[currentUsername];
  delete colors[currentUsername];
  directMessages[newUsername] = directMessages[currentUsername];
  delete directMessages[currentUsername];
  res.send(JSON.stringify({ success: true }));
});

app.post('/set/color', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  // const user = sessions[req.cookies.sid];
  const color = req.body.color;
  colors[username] = color;
  // user.color = color;
  messages.forEach((message) => {
    if (message.user === username) message.color = color;
  });
  res.send(JSON.stringify({ success: true }));
});

app.post('/set/ignore', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const annoyingUser = req.body.username;
  ignored[username].push(annoyingUser);
  res.send(JSON.stringify({ success: true }));
});

app.post('/set/topic', upload.none(), (req, res) => {
  topic = req.body.topic;
  res.send(JSON.stringify({ success: true }));
});

app.post('/signup', upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (passwordsAssoc[username] !== undefined) {
    return res.send(
      JSON.stringify({ success: false, message: 'Username taken' })
    );
  }
  passwordsAssoc[username] = password;
  colors[username] = 'black';
  ignored[username] = [];
  directMessages[username] = [];
  res.send(JSON.stringify({ success: true }));
});

app.post('/login', upload.none(), (req, res) => {
  let username = req.body.username;
  let passwordGiven = req.body.password;
  let expectedPassword = passwordsAssoc[username];
  if (expectedPassword !== passwordGiven) {
    return res.send(
      JSON.stringify({
        success: false,
        message: 'Invalid username or password',
      })
    );
  }
  let sid = Math.floor(Math.random() * 10000000);
  sessions[sid] = username;
  res.cookie('sid', sid);
  res.send(JSON.stringify({ success: true }));
});
app.listen(4000);
