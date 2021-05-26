const express = require('express');
const Blog = require('./../models/blog');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

// API for returning all the blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: 'desc' });
    res.send({ blogs: blogs });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get('/edit/:id', async (req, res) => {
  let blog = null;
  try {
    const idValidation = isValidObjectId(req.params.id);
    if (idValidation) {
      blog = await Blog.findOne({ _id: req.params.id.trim() });
    }

    if (!idValidation || blog == null)
      return res.send({
        error: 'Blog Not Found',
      });
    res.send({ blog: blog, error: null });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog == null)
      return res.send({
        error: 'Blog Not Found',
      });

    res.send({ blog: blog });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

router.post(
  '/',
  async (req, res, next) => {
    req.blog = new Blog();
    //console.log(req.headers);
    next();
  },
  saveArticleAndRedirect('new')
);

router.put(
  '/:id',
  async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id.trim());
    // console.log('sucess');
    next();
  },
  saveArticleAndRedirect('edit')
);

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.send({
    message: 'success',
  });
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    //console.log(req.body);
    let blog = req.blog;
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.markdown = req.body.markdown;
    blog.createdAt = new Date();

    try {
      blog = await blog.save();
      //console.log(blog);
      res.send({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.send({
        error: 'error Try Again',
      });
    }
  };
}

module.exports = router;
