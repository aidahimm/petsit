const express = require('express');

const app = express();

const db = require ('./models');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes for everything related to apis
const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);


// Testing the Database connection
db.sequelize.authenticate().then(()=> console.log('Connected to Postgres'))
    .catch(err => console.log(err));


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http:/localhost:${PORT}`);
    });
});


