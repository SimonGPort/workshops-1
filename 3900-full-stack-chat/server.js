let express = require('express');
let multer = require('multer');
let upload = multer({
  dest: __dirname + '/build/images'
});
let app = express();
let cookieParser = require('cookie-parser');
app.use(cookieParser());
let reloadMagic = require('./reload-magic.js');
let passwords = {};
let sessions = {};
let directMessages = {};
let chatRooms = {};
reloadMagic(app);

function createMessage(username, message, img = '') {
  return { username, message, img, timestamp: Date.now() };
}

app.use('/', express.static('build'));

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  if (username) {
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/messages', function(req, res) {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId] === undefined) {
    res.status(403);
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  const username = sessions[sessionId];
  const roomName = req.query.roomName;
  res.send(
    JSON.stringify({
      success: true,
      messages: chatRooms[roomName].messages.slice(-20),
      directMessages: directMessages[username]
    })
  );
});

app.get('/chatrooms', function(req, res) {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId] === undefined) {
    res.status(403);
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, chatRooms: chatRooms }));
});

app.post('/create-room', upload.none(), (req, res) => {
  const roomName = req.body.roomName;
  chatRooms[roomName] = { name: roomName, messages: [] };
  res.send(JSON.stringify({ success: true, chatRoom: chatRooms[roomName] }));
});

app.post('/direct-message', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const recipient = req.body.recipient;
  const message = req.body.message;
  directMessages[recipient].push(createMessage(username, message));
  res.send(JSON.stringify({ success: true }));
});

app.post('/clear', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  messages = messages.filter(message => message.username !== username);
  res.send(JSON.stringify({ success: true }));
});

app.post('/kick', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  if (username !== 'admin') {
    return res.send(
      JSON.stringify({ success: false, message: 'Not enough privileges' })
    );
  }
  const usernameToKick = req.body.username;
  const sessionIdToKick = Object.keys(sessions).find(
    sid => sessions[sid] === usernameToKick
  );
  delete sessions[sessionIdToKick];
  res.send(JSON.stringify({ success: true }));
});

app.post('/join', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const roomName = req.body.roomName;
  chatRooms[roomName].messages.push(
    createMessage('System', `${username} has joined`)
  );
  res.send(JSON.stringify({ success: true }));
});

app.post('/newmessage', upload.single('img'), (req, res) => {
  console.log('*** inside new message');
  console.log('body', req.body);
  let sessionId = req.cookies.sid;
  console.log('cookie sid', sessionId);
  let username = sessions[sessionId];
  console.log('username', username);
  let msg = req.body.msg;
  let newMsg = createMessage(
    username,
    msg,
    req.file ? `/images/${req.file.filename}` : ''
  );
  console.log('new message', newMsg);
  chatRooms[req.body.roomName].messages.push(newMsg);
  console.log('updated messages', messages);
  res.send(JSON.stringify({ success: true }));
});

let login = (req, res) => {
  console.log("**** I'm in the login endpoint");
  console.log('this is the parsed body', req.body);
  let username = req.body.username;
  let enteredPassword = req.body.password;
  let expectedPassword = passwords[username];
  console.log('expected password', expectedPassword);
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    let sessionId = generateId();
    console.log('generated id', sessionId);
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
};

app.post('/login', upload.none(), login);

let generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});

app.post('/signup', upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log('this is the body', req.body);
  let username = req.body.username;
  let enteredPassword = req.body.password;
  if (passwords[username] !== undefined) {
    return res.send(
      JSON.stringify({ success: false, message: 'Username taken' })
    );
  }
  passwords[username] = enteredPassword;
  directMessages[username] = [];
  console.log('passwords object', passwords);
  login(req, res);
  // let sessionId = generateId();
  // console.log('generated id', sessionId);
  // sessions[sessionId] = username;
  // res.cookie('sid', sessionId);
  // messages.push({ username: 'System', message: `${username} has joined` });
  // res.send(JSON.stringify({ success: true }));
});

app.all('/*', (req, res, next) => {
  res.sendFile(__dirname + '/build/index.html');
});
app.listen(4000);
