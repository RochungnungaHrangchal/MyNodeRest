const User = require('../models/users.model.js');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
var path = require("path");
const config = require('../config/config.js');
const refreshTokens = [];
// Create, REgister  and Save a new User
exports.Ziahluhna = async (req, res)=>{

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);
   
      // res.send(req.body.email);
   /* if(!req.body.email) {
        return res.status(400).send({
            message: "User || Content can not be empty"
        });
    }*/

    // Create a Node user
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hasPassword,
        user_type_id: req.body.user_type_id
       // title: req.body.title || "NO User ", 
       // content: req.body.content
    });

    // Save Node/USer in the database

    user.save()
    .then(data => {
        let payload = { id: req.body.email, user_type_id: req.body.user_type_id || 0 };
            const token = jwt.sign(payload,"danifilth");// Serret hi auto generate ta ila !!?
            res.status(200).send({ token })
            //res.send(data);
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


/*exports.RefreshToken = async(req,res)=>
{
    const token=req.body;
    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
   
    jwt.verify(token, config.RefreshToken, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = jwt.sign(payload, config.TOKEN_SECRET,{expiresIn:'20m'});

        res.json({
            token
        });
    });

};
*/

exports.login = async (req, res,next) => {

     User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(401).send("Password is wrong !");

                // Create and assign token
                let payload = { id: user._id, user_type_id: user.user_type_id };
                const token = jwt.sign(payload, config.TOKEN_SECRET);//),{expiresIn:'20m'});
                //const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN);
               // refreshTokens.push(refreshToken);

                res.cookie('token',token,{maxAge: 60 * 60000,secure:true,httpOnly:true});
                
               // next();
                res.redirect('auth');

               // res.status(200).header("auth-token", token).send({ "token": token });
                // Kookie-ah store ang!
                //res.redirect('auth');
                
                /* res.cookie('token', token, {
                   // expires: new Date(Date.now() + expiration),
                    secure: false, // set to true if your using https
                    httpOnly: true,
                  });*/
            }
            else {
                res.status(401).send('Invalid Email!');
            }

        }
    })
};



// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.userId
        });
    });

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    
    User.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};

exports.authuseronly = (req, res) => {
   // res.sendFile(path.join(__dirname,'./public/ind.html'));
    res.sendFile('ind.html',{ root: './public' });
   // res.send("Hey,You are authenticated user. So you are authorized to access here.");
};

// Admin users only
exports.adminonly = (req, res) => {
    res.send("Success. Hellow Admin, this route is only for you");
};