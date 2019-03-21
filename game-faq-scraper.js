const puppeteer = require('puppeteer');
const request = require ("request");

const longWait = 8000;
const mediumWait = 4000;
const shortWait = 1000;

const headless = true;

async function run() {
  // create browser, open a tab, and set the window size
  const browser = await puppeteer.launch({ headless: headless });
  const page = await browser.newPage();
  if (headless === false) { await page.setViewport({width: 1200, height: 600}); }

	// start here!
}

run();
