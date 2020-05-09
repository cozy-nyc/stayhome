const axios = require('axios');
const csv = require('csvtojson');

const base =
  'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/';

async function getCSVData() {
  let response;

  try {
    response = await axios.get(`${base}case-hosp-death.csv`);

    const parsedHistory = await csv({
      colParser: {
        DATE_OF_INTEREST: 'string',
        NEW_COVID_CASE_COUNT: 'number',
        HOSPITALIZED_CASE_COUNT: 'number',
        DEATH_COUNT: 'number',
      },
    }).fromString(response.data);

    return parsedHistory;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const nycHistorical = async (keys, redis) => {
  const response = await getCSVData();

  const string = JSON.stringify(response);

  redis.set(keys.nyc_historical, string);
};

module.exports = nycHistorical;
