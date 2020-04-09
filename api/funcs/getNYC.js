const axios = require('axios');
const csv = require('csvtojson');

const base =
  'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/';

async function getCSVData() {
  let boroResponse;
  let summaryResponse;
  try {
    boroResponse = await axios.get(`${base}boro.csv`);
    summaryResponse = await axios.get(`${base}summary.csv`);

    console.log(summaryResponse.data);

    const parsedBoroCases = await csv({
      colParser: {
        BOROUGH_GROUP: 'string',
        COVID_CASE_COUNT: 'number',
        COVID_CASE_RATE: 'number',
      },
    }).fromString(boroResponse.data);

    const parsedSummary = await parseWeirdCSVData(summaryResponse.data);

    return { parsedBoroCases, parsedSummary };
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function parseWeirdCSVData(data) {
  const raw = data.split('\n');
  // for (let i = 0; i < raw.length; i++) {}
  console.log(raw);
  return raw;
}

const getNYC = async (keys, redis) => {
  const { parsedBoroCases, parsedSummary } = await getCSVData();
  // const parsedBoroCases = await parseCSVData(boroResponse.data);
  // const parsedSummary = await parseCSVData(summaryResponse.data);

  const parsedData = parsedBoroCases.concat(parsedSummary);
  const string = JSON.stringify(parsedData);
  // console.log(parsedData);
  redis.set(keys.nyc, string);
};

module.exports = getNYC;
