const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const config = require('./config.json');
const scraper = require('./scraper');

const app = express();

app.use(cors());

// create redis instance :O
const redis = new Redis(config.redis.host, {
  password: config.redis.password,
  port: config.redis.port,
});

const { keys } = config;

const execAll = () => {
  scraper.getAll(keys, redis);
  scraper.getStates(keys, redis);
  scraper.getNYC(keys, redis);
  scraper.nycHistorical(keys, redis);
};
execAll();
setInterval(execAll, config.interval);

const listener = app.listen(config.port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// API endpoints
app.get('/summary/', async (req, res) => {
  const nyc = JSON.parse(await redis.get(keys.nyc));
  res.send(nyc);
});

app.get('/nyc-historical/', async (req, res) => {
  const nycHistorical = JSON.parse(await redis.get(keys.nyc_historical));
  res.send(nycHistorical);
});

app.get('/global/', async (req, res) => {
  const all = JSON.parse(await redis.get(keys.all));
  res.send(all);
});

app.get('/us/', async (req, res) => {
  const states = JSON.parse(await redis.get(keys.states));
  res.send(states);
});
