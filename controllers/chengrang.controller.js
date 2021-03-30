const Chengrang = require('../models/chengrang.model.js');

exports.Athar=(req,res)=>{


    if(!req.body.holdername){
        return res.status(400).send({
           message:'Silai a ruak thei lo' 
        });
    }

    const chengrang = new Chengrang({
        uin:req.body.uin,
        holdername:req.body.holdername
    });


    chengrang.save()
              .then(data=>
              {
                  res.send(data);
              })
              .catch(err=>{
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                }); 
              })
};

exports.Avaiin=(req,res)=>{

    Chengrang.find()
             .then(chengrang=>{
                 res.send(chengrang);
             })
             .catch(err=>{
             res.status(404).send({
                 message: err.message || "Theih loh chhan A Dik lo "
             })
             });
};

