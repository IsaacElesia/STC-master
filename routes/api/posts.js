const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Handler = require('../../models/Handler');
const Item = require('../../models/Item');
const Order = require('../../models/Order');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('item', 'item id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, item } = req.body;

    try {
      const handler = await Handler.findById(req.handler.id).select(
        '-password'
      );

      const newPost = new Post({
        text: req.body.text,
        item: req.body.item,
        name: handler.name,
        email: handler.email,
        phone: handler.phone,
        address: handler.address,
        handler: req.handler.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/item
// @desc     Get all posts that belong to an item
// @access   Private
router.get(
  '/item',
  [
    auth,
    [
      check('item', 'item id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const posts = await Post.find({ item: req.body.item }).sort({ date: -1 });

      if (posts.length === 0) {
        return res.status(400).json({ msg: 'This item has no post' });
      }

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'item not found' });
      }

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check handler
    if (post.handler.toString() !== req.handler.id) {
      return res.status(401).json({ msg: 'Handler not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:post_id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:post_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('item', 'Item id is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const handler = await Handler.findById(req.handler.id).select(
        '-password'
      );
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        item: req.body.item,
        name: handler.name,
        email: handler.email,
        phone: handler.phone,
        address: handler.address,
        handler: req.handler.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:post_id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check handler
    if (comment.handler.toString() !== req.handler.id) {
      return res.status(401).json({ msg: 'Handler not authorized' });
    }

    // Remove commemt
    post.comments = post.comments.filter(
      comment => comment.id !== req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
