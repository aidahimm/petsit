const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require ('./models')

//Support the form-urlencoded format for the request body
app.use(express.urlencoded({extended: true}));
//Support JSON format for req/res
app.use(express.json());

//synchronize models with the database
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http:/localhost:${PORT}`);
    });
});

//Routes for everything related to apis
//Not to keep this file crowded
const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);

// Testing the Database connection
db.sequelize.authenticate().then(()=> console.log('Connected to Postgres'))
    .catch(err => console.log(err));




