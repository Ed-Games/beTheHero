const express = require('express');

const ongcontroller = require('./controllers/ongcontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const listincidents = require('./controllers/listincidents');
const sessioncontroller = require('./controllers/sessioncontroller');



const routes = express.Router();

routes.get('/ongs', ongcontroller.index);
routes.post('/ongs', ongcontroller.create);

routes.get('/list',listincidents.index);

routes.post('/session',sessioncontroller.create);

routes.get('/incidents', incidentcontroller.index);
routes.post('/incidents', incidentcontroller.create);
routes.delete('/incidents/:id',incidentcontroller.delete);
  
 
  module.exports = routes;
  