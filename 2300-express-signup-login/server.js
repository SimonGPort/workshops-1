let express = require('express');
let app = express();
let multer = require('multer');
let upload = multer();
let passwordsAssoc = {};
let attempts = {};
app.use('/', express.static(__dirname + '/public'));

app.post('/signup', upload.none(), (req, res) => {
  console.log('/signup hit', req.body);
  let username = req.body.username;
  let password = req.body.password;
  if (passwordsAssoc[username] !== undefined) {
    return res.send('<html><body> Username taken </body></html>');
  }
  passwordsAssoc[username] = password;
  attempts[username] = 0;
  res.send('<html><body> signup successful </body></html>');
});

let loginForm = `
<html><body>
<div>
Invalid username or password <a href="/">Go to home</a>
<form action="/login" method="POST" enctype="multipart/form-data">        
    <div>Username</div>        
    <input type="text" name="username"></input>        
    <div>Password</div>        
    <input type="text" name="password"></input>        
    <input type="submit" value="log me in!"></input>        
</form>  
</div>
</body></html>
`;

app.post('/login', upload.none(), (req, res) => {
  console.log('/login hit', req.body);
  let username = req.body.username;
  let passwordGiven = req.body.password;
  let expectedPassword = passwordsAssoc[username];
  attempts[username]++;
  if (attempts[username] >= 3) {
    return res.send('<html><body> Account disabled </body></html>');
  }
  if (expectedPassword !== passwordGiven) {
    res.send(loginForm);
    return;
  }
  attempts[username] = 0;
  res.send('<html><body> login successful </body></html>');
});
app.listen(4000, () => {
  console.log('server started');
});
