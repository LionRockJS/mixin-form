const { KohanaJS } = require('kohanajs');

KohanaJS.initConfig(new Map([
  ['form', require('./config/form')],
]));
