const puppeteer = require('puppeteer');
const fs = require('fs');

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
	// empty details string
	var details = '';

  // create browser, open a tab, and set the window size
  const browser = await puppeteer.launch({ headless: headless });
  const page = await browser.newPage();
  if (headless === false) { await page.setViewport({width: 1200, height: 600}); }

	// open game summary page
  await page.goto('https://gamefaqs.gamespot.com/n64/196694-banjo-kazooie', { waitUntil: 'networkidle0' });

	// get title
	const title = await getElementText(page, '//*[@id="content"]/div/div/header/div/div[2]/h1');
	details += 'Title: ' + title + '\n';

  // get platform
	const platform = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Platform")]/a');
	details += 'Platform: ' + platform + '\n';

  // get developer
	const developer = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Developer")]/a');
	details += 'Developer: ' + developer + '\n';

  // get publisher
	const publisher = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Publisher")]/a');
	details += 'Publisher: ' + publisher + '\n';

	// get release date
	const releaseDate = await getElementText(page, '//div[contains(@class, "pod_gameinfo")]/div[contains(@class, "body")]/ul/li[contains(., "Release")]/a');
	details += 'Release Date: ' + releaseDate + '\n';

	// write details to a file
	fs.writeFile("game-details.txt", details, function(err) {
		if (err) { return console.log(err); }
	    console.log("The file was saved!");
	});

  // close the browser
	await page.waitFor(shortWait);
  await browser.close();
}

run();
