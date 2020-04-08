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
};
execAll();
setInterval(execAll, config.interval);

const listener = app.listen(config.port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// API endpoints
app.get('/', async (req, res) => {
  const nyc = JSON.parse(await redis.get(keys.nyc));
  console.log(nyc);
  res.send(nyc);
});

app.get('/global/', async (req, res) => {
  const all = JSON.parse(await redis.get(keys.all));
  res.send(all);
});

app.get('/states/', async (req, res) => {
  const states = JSON.parse(await redis.get(keys.states));
  res.send(states);
});
