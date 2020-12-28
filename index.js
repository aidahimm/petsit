const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require ('./models')
const services = require('./services/userService')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//synchronize models with the database
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http:/localhost:${PORT}`);
    });
});

//Routes for everything related to apis
const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);

app.post('/cr', (req, res, next)=> {
    services.createUser()
})

// Testing the Database connection
db.sequelize.authenticate().then(()=> console.log('Connected to Postgres'))
    .catch(err => console.log(err));




