const path= require('path');
const express = require('express');
const routes = require('./controllers/');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001

const sequelize = require("./config/connections");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//turn onroutes
app.use(require('./controllers/'));
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log('NOW LISTENING'));
 });


