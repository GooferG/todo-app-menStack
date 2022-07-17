// Declare variables
const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const TodoTask = require('./models/todotask');
require('dotenv').config();

//Set Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log(`Connected to db!`);
});

// GET METHOD
app.get('/', (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render('index.ejs', {
        todoTasks: tasks,
      });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//POST METHOD
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await todoTask.save();
    console.log(todoTask);
    res.redirect('/');
  } catch (err) {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
