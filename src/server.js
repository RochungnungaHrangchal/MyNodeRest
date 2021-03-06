const express = require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
// Kan configurastion FILE ... 
const dbConfig = require('../config/config.js');

const mongoose = require('mongoose');

const https = require('https');

const filesystem=require('fs');

const helmet=require('helmet');

const { Console } = require('console');

const httpsoptions = {
    key: filesystem.readFileSync("../config/key.pem"),
    cert: filesystem.readFileSync("../config/cert.pem"),
    passphrase:dbConfig.hrangchalsolutions
  };
  

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(bodyparser.json());
app.use(helmet());


mongoose.Promise = global.Promise;
const connectionOptions={ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
// Connecting to the database
mongoose.connect(dbConfig.url,connectionOptions)

.then(() => {console.log("Successfully connected to the database");})
.catch
    (err => 
      {
        console.log('Could not connect to the database. Exiting now...', err);

        process.exit();
      }
    );

app.get("/",(req,res)=>{

    res.json({"Msg":"This is new Message"});
});

/*app.listen(3066,()=>{

    console.log("Server Connected and UP!");
});*/


// Hetah hian kawng kan SIAL ang !

require('../routes/users.route.js')(app);
require('../routes/chengrang.route.js')(app);

// /*  var kanRoute = require('../routes/users.route.js')
// kanRoute(app);*/
// A chung a code nen hian a in ang chiah..  express hi ROUTE nan kan hmang dawn tihna.

const port = 3066;
https.createServer(httpsoptions,app).listen(port,()=>{
    console.log("Server Started Successfully!")
});
