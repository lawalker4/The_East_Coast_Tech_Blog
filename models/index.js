// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const { post } = require('../controllers/api');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete:"cascade",
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade",
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade",
})
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade",
});

module.exports = {User, Post, Comment};


