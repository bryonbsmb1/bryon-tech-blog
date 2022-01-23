
// added Post and Comment const 
const router = require('express').Router();

const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// switched to now match 

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
          {
              model: User
          },
          {
              model: Comment
          }
      ]
  });

    
    // serialized Data
    
    
    
    const posts = postData.map(post => post.get({ plain: true }));
        
        res.render('homepage', {posts});
    } 
    
    catch (err) {
        
      
      
      res.status(500).json(err);
    }
});


router.get('/post/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User
              }
          ]
      });

      const post = postData.get({ plain: true });
      res.render('update', {post});
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/post-create', withAuth, async (req, res) => {
  res.render('post');
});












router.get('/login', (req, res) => {
  // made change that edirects route if the user is already logged in
  if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
  };
  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try{
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password']},
          include: [{ model: Post}]
      });

      const user = userData.get({ plain: true});

      res.render('dashboard', {
          ...user,
          logged_in: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => res.render('signup'));

module.exports = router;
