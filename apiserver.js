const config = require('./config/config.js');
const axios = require('axios');
//const ArrayList =[];
axios.get(config.COVID_URL)
     .then(response => {
   
        response.data.forEach(datum=>{
     if(datum.sno !== '11111')   

        {
     console.log(datum.state_name + " is having Positive :" + datum.positive );
        }
        if(datum.sno == '11111')
        console.log( "Totally India is having Positive :" + datum.positive );
     
    })
        
    /*ArrayList.forEach(x=>{
        //console.log(x.state_name);
    
    //console.log(response.data.explanation);
  })
  */
  
 });
