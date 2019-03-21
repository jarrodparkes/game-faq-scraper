const puppeteer = require('puppeteer');

const longWait = 8000;
const mediumWait = 4000;
const shortWait = 1000;

const headless = false;

async function getElementText(page, query) {
	const element = (await page.$x(query))[0];
  const innerText = await (await element.getProperty('innerText')).jsonValue();
  return innerText;
}

async function run() {
  // create browser, open a tab, and set the window size
  const browser = await puppeteer.launch({ headless: headless });
  const page = await browser.newPage();
  if (headless === false) { await page.setViewport({width: 1200, height: 600}); }

	// open game summary page
  await page.goto('https://gamefaqs.gamespot.com/n64/196694-banjo-kazooie', { waitUntil: 'networkidle0' });

	// get title
	const title = await getElementText(page, '//*[@id="content"]/div/div/header/div/div[2]/h1');
	console.log('Title: ' + title);

  // get platform
	const platform = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Platform")]/a');
	console.log('Platform: ' + platform);

  // get developer
	const developer = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Developer")]/a');
	console.log('Developer: ' + developer);

  // get publisher
	const publisher = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Publisher")]/a');
	console.log('Publisher: ' + publisher);

	// get release date
	const releaseDate = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Release")]/a');
	console.log('Release Date: ' + releaseDate);

  // close the browser
	await page.waitFor(shortWait);
  await browser.close();
}

run();
