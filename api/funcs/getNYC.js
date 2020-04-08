const axios = require('axios');
const csv = require('csvtojson');

const base =
  'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/';

async function getCSVData() {
  let response;
  try {
    response = await axios.get(`${base}boro.csv`);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function parseCSVData(data) {
  const parsedData = await csv().fromString(data);
  return parsedData;
}

const getNYC = async (keys, redis) => {
  const response = await getCSVData();
  const parsedCases = await parseCSVData(response.data);

  // const removeFirstObj = parsedCases.splice(1);
  const string = JSON.stringify(parsedCases);
  redis.set(keys.nyc, string);
};

module.exports = getNYC;
