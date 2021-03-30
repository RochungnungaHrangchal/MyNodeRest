module.exports = (app)=>{

    const chengrang = require('./controllers/chengrang.controller.js');

    app.post('/chengrang', chengrang.Athar);
    app.get('/chengrang',chengrang.Avaiin);
    

}