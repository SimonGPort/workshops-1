const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
  dest: __dirname + '/public/images',
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const threads = [];
const passwordsAssoc = {};
const sessions = {};
const users = {};
const h = (element, children) => {
  return (
    '<' +
    element +
    '>' +
    children.join('\n') +
    '</' +
    element.split(' ').shift() +
    '>'
  );
};

const makePage = (username, recipient) => {
  const threadElements = threads.map((post) => {
    const threadCount = threads.filter(
      (thread) => thread.user.username === post.user.username
    ).length;
    return `<div><h2>${post.desc}</h2><img src="${post.imgPath}" /><h4><span style="color:${post.user.color};">${post.user.username}</span> - ${threadCount}</h4></div>`;
  });
  const messageElements = users[username].messages.map((message) => {
    return `<div><h2>${message.content}</h2><h4><span>${message.username}</span></h4></div>`;
  });
  return h('html', [
    h('body', [
      h('h3', [username]),
      h('div', threadElements),
      h('form action="/thread" method="POST" enctype="multipart/form-data"', [
        h('input type="text" name="description"', []),
        h('input type="file" name="thread-image"', []),
        h('input type="submit"', []),
      ]),
      h('h3', ['Change username']),
      h(
        'form action="/set/username" method="POST" enctype="multipart/form-data"',
        [
          h('input type="text" name="username"', []),
          h('input type="submit"', []),
        ]
      ),
      h('h3', ['Change username color']),
      h(
        'form action="/set/color" method="POST" enctype="multipart/form-data"',
        [h('input type="text" name="color"', []), h('input type="submit"', [])]
      ),
      h('h3', ['Send direct message']),
      h(
        'form action="/send-message" method="POST" enctype="multipart/form-data"',
        [
          h(
            `input type="text" name="recipient" value="${recipient || ''}"`,
            []
          ),
          h('input type="text" name="message"', []),
          h('input type="submit"', []),
        ]
      ),
      h('div', messageElements),
    ]),
  ]);
};

app.post('/send-message', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const user = sessions[sessionId];
  const recipient = req.body.recipient;
  users[recipient].messages.push({
    content: req.body.message,
    username: user.username,
  });
  res.send(makePage(user.username, req.body.recipient));
});

app.post('/set/username', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const user = sessions[sessionId];
  const newUsername = req.body.username;
  users[newUsername] = user;
  delete users[user.username];
  passwordsAssoc[newUsername] = passwordsAssoc[user.username];
  delete passwordsAssoc[user.username];
  user.username = newUsername;
  res.send(makePage(user.username));
});

app.post('/set/color', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const user = sessions[sessionId];
  user.color = req.body.color;
  res.send(makePage(user.username));
});

app.post('/thread', upload.single('thread-image'), (req, res) => {
  console.log('creating a new thread', req.body);
  const sessionId = req.cookies.sid;
  const user = sessions[sessionId];
  const file = req.file;
  if (user === undefined) {
    return res.redirect('/');
  }
  threads.push({
    user: user,
    desc: req.body.description,
    imgPath: '/static/' + file.filename,
  });
  res.send(makePage(user.username));
});

app.post('/login', upload.none(), (req, res) => {
  console.log('request to /login', req.body);
  if (passwordsAssoc[req.body.username] !== req.body.password) {
    return res.send('<html><body> invalid username or password </body></html>');
  }
  let sessionId = '' + Math.floor(Math.random() * 1000000);
  sessions[sessionId] = users[req.body.username];
  res.cookie('sid', sessionId);
  res.send(makePage(req.body.username));
});

app.post('/signup', upload.none(), (req, res) => {
  console.log('request to /signup', req.body);
  const username = req.body.username;
  if (passwordsAssoc[username] !== undefined) {
    return res.send('<html><body> Username taken </body></html>');
  }
  passwordsAssoc[username] = req.body.password;
  users[username] = {
    username: username,
    color: 'black',
    messages: [],
  };
  res.send('<html><body> signup successful </body></html>');
});

app.get('/', (req, res) => {
  const sessionId = req.cookies.sid;
  const user = sessions[sessionId];
  if (user === undefined) {
    return res.sendFile(__dirname + '/public/index.html');
  }
  res.send(makePage(user.username));
});

app.use('/static', express.static(__dirname + '/public/images'));

app.listen(4000, () => {
  console.log('server started');
});
