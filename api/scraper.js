const getAll = require('./funcs/getAll');
const getStates = require('./funcs/getStates');
const getNYC = require('./funcs/getNYC');
const nycHistorical = require('./funcs/nycHistorical');
const jhuLocations = require('./funcs/jhuLocations');
const historical = require('./funcs/historical');

module.exports = {
  getAll,
  getNYC,
  nycHistorical,
  getStates,
  jhuLocations,
  historical,
};
