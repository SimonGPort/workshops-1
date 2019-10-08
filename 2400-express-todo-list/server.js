let express = require('express');
let app = express();
let multer = require('multer');
let upload = multer();
let lists = [{ title: 'Untitled list', todos: [] }];
let listIndex = 0;
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

let createOptionList = () => {
  return lists.map((list, idx) => {
    return h(`option value="${idx}" ${listIndex === idx ? 'selected' : ''}`, [
      list.title,
    ]);
  });
};

let makePage = () => {
  let currentList = lists[listIndex];
  let lified = currentList.todos.map((item) => {
    return h('li class="todo-element"', [item]);
  });
  return h('html', [
    h('head', [h('link href="/static/styles.css" rel="stylesheet"', [])]),
    h('body', [
      h('h1', ['Please enter your todos']),
      h('h3', [currentList.title]),
      h('form action="/title" method="POST" enctype="multipart/form-data"', [
        h('input type="text" name="title"', []),
        h('input type="submit"', []),
      ]),
      h('ul', lified),
      h('form action="/item" method="POST" enctype="multipart/form-data"', [
        h('input type="text" name="todo"', []),
        h('input type="submit"', []),
      ]),
      h('form action="/clear" method="POST" enctype="multipart/form-data"', [
        h('input type="submit" value="Clear"', []),
      ]),
      h('form action="/create" method="POST" enctype="multipart/form-data"', [
        h('input type="submit" value="Create list"', []),
      ]),
      lists.length > 1
        ? h('div', [
            h(
              'form action="/select-list" method="POST" enctype="multipart/form-data"',
              [
                h('select name="index"', createOptionList()),
                h('input type="submit" value="Select list"', []),
              ]
            ),
            h(
              'form action="/delete-list" method="POST" enctype="multipart/form-data"',
              [
                h('select name="index"', createOptionList()),
                h('input type="submit" value="Delete list"', []),
              ]
            ),
          ])
        : '',
    ]),
  ]);
};

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send(makePage());
});

app.post('/title', upload.none(), (req, res) => {
  let title = req.body.title;
  lists[listIndex].title = title;
  res.send(makePage());
});

app.post('/item', upload.none(), (req, res) => {
  let newTodo = req.body.todo;
  lists[listIndex].todos.push(newTodo);
  res.send(makePage());
});

app.post('/clear', (req, res) => {
  lists[listIndex].todos = [];
  res.send(makePage());
});

app.post('/create', (req, res) => {
  lists.push({ title: 'Untitled list', todos: [] });
  res.send(makePage());
});

app.post('/select-list', upload.none(), (req, res) => {
  listIndex = Number(req.body.index);
  res.send(makePage());
});

app.post('/delete-list', upload.none(), (req, res) => {
  let index = Number(req.body.index);
  lists.splice(index, 1);
  if (listIndex === index) listIndex = 0;
  res.send(makePage());
});

app.listen(4000, () => {
  console.log('the server has started');
});
