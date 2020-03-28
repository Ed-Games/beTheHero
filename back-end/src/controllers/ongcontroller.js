const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (Request,respose){
        const ongs = await connection('ongs').select('*');
    
        return respose.json(ongs);
    },
    async create(request,response){
        const {name,email,whatsapp,city,uf} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
  
    //console.log(data);
  
    return response.json({id});  
    }
};