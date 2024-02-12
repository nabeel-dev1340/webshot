const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, url) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    // Navigate to the specified URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Take a screenshot
    const screenshotBuffer = await page.screenshot();

    // Close the browser
    await browser.close();

    // Set response headers
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${encodeURIComponent("screenshot.png")}`
    );

    // Send the screenshot as the response
    res.send(screenshotBuffer);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
