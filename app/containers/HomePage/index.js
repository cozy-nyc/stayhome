/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import NewsFeed from 'components/NewsFeed';

export default function HomePage() {
  return (
    <div id="home" className="container">
      <section className="row">
        {/* Line Graph for NYC cases */}
        <div id="NYC-Line-Chart" className="chart col-12 col-md-8" />
        {/* Stats for NYC cases */}
        <div id="NYC-Stats" className="col-6 col-md-4">
          <div>
            <p>NYC Cases: </p>
            <p>Hospitalizations: </p>
            <p>Deaths: </p>
            <p>Bronx cases: </p>
            <p>Brooklyn cases: </p>
            <p>Queens cases: </p>
            <p>Manhattan cases: </p>
            <p>Statan Island cases: </p>
          </div>
          <p id="update-timer"> Updated as of {/* Update data */}</p>
        </div>
      </section>
      <section className="row">
        <NewsFeed />
      </section>
    </div>
  );
}
