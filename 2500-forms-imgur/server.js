let express = require('express');
let app = express();
let multer = require('multer');
let upload = multer({
  dest: __dirname + '/uploads/',
});
app.use('/images', express.static(__dirname + '/uploads'));
let posts = [];
let h = (element, children) => {
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
let makePage = () => {
  let postElements = posts.map((post) => {
    let imgElements = post.paths.map((path) => {
      return h('img src="' + path + '" height="100px"', []);
    });
    return h('div', [
      h('h3', [post.title]),
      h('div', imgElements),
      h('p', [post.description]),
    ]);
  });
  return h('html', [
    h('body', [
      h('div', postElements),
      h('form action="/image" method="POST" enctype="multipart/form-data"', [
        h('input type="file" name="funny-images" multiple', []),
        h('input type="text" name="imgUrl"', []),
        h('input type="text" name="title"', []),
        h('input type="text" name="description"', []),
        h('input type="submit"', []),
      ]),
      h('form action="/clear" method="POST"', [
        h('input type="submit" value="Clear posts"', []),
      ]),
    ]),
  ]);
};

app.get('/', (req, res) => {
  console.log('Request to / endpoint');
  res.send(makePage());
});

app.post('/image', upload.array('funny-images'), (req, res) => {
  let files = req.files;
  console.log('uploaded files', files);
  let frontendPaths;
  if (files.length === 0) {
    frontendPaths = [req.body.imgUrl];
  } else {
    frontendPaths = files.map((file) => {
      return '/images/' + file.filename;
    });
  }
  posts.push({
    paths: frontendPaths,
    title: req.body.title,
    description: req.body.description,
  });
  res.send(makePage());
});

app.post('/clear', (req, res) => {
  posts = [];
  res.send(makePage());
});

app.listen(4000, () => {
  console.log('server started');
});
