'use strict';

const _ = require('lodash');
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// API Settings
const API_KEY = 'd6f8bab96d5740f2bccdc4b3a7c66926';
const BASE_URL = `https://api.football-data.org/v2`;

/**
 * Gets all available Competitions
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getCompetions(req, resp) {
  const url = `${BASE_URL}/competitions/`;
  fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  }).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  }).then((data) => {
    // Filter all Competitions, which are available for Free Tier
    var data = _.filter(data.competitions, d => d.plan == 'TIER_ONE');
    // Add received Timestamp to Response
    data = { received:Date.now(), competitions:data};
    resp.json(data);
  }).catch((err) => {
    console.error('API Error:', err.message);
  });
}

/**
 * Gets all Matches and Results of the Competition
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getMatches(req, resp) {
  // ID of the Competition
  const id = req.params.id
  const url = `${BASE_URL}/competitions/${id}/matches`;
  fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  }).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  }).then((data) => {
    // Add received Timestamp to Response
    data = { received:Date.now(), competitionInfos:data};
    resp.json(data);
  }).catch((err) => {
    console.error('API Error:', err.message);
  });
}

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    console.log(m);
    next();
  });

  // Handle requests for the data
  app.get('/competitions', getCompetions);
  app.get('/competitions/:id/matches', getMatches);

  // Handle requests for static files
  app.use(express.static('app'));

  // Start the server
  return app.listen('8000', () => {
    console.log('Local DevServer Started on port 8000...');
  });
}

startServer();