const router = require('express').Router();
const sequelize = require('/urcoding/projects/The_East_Coast_Tech_Blog/config/connections');
const { Post, User, Comment } = require('/urcoding/projects/The_East_Coast_Tech_Blog/models');

//get post for homepage
router.get('/', (req, res) => {
    console.log(req.sesson);
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(posts)
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

//for a single post to be made
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
                include: {
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
    
        const post = dbPostData.get ({ plain: true});

        res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
        }); 
      
      module.exports = router;
      
