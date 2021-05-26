const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const app = express();

mongoose.connect('mongodb+srv://sagar-1234:sagar-1234@cluster0.llf3s.mongodb.net/BlogDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  );
  next();
});
//app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  res.redirect('/blogs');
});
app.use('/blogs', blogRouter);

app.listen(5000);
