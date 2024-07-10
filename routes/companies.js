const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const path = require("path");
const Company = require("../model/company");

// router.post("/scrape", async (req, res) => {
//   const { url } = req.body;

//   try {
//     // const [axiosResponse, puppeteerResponse] = await Promise.all([
//     //   axios.get(url),
//     //   (async () => {
//     //     const browser = await puppeteer.launch();
//     //     const page = await browser.newPage();
//     //     await page.goto(url, { waitUntil: "networkidle2" });

//     //     const screenshotPath = `uploads/screenshot_${Date.now()}.png`;
//     //     // await page.screenshot({
//     //     //   path: path.resolve(__dirname, "../", screenshotPath),
//     //     // });

//     //     await browser.close();
//     //     return screenshotPath;
//     //   })(),
//     // ]);

//     const $ = cheerio.load(axiosResponse.data);

//     const companyName = $('meta[property="og:site_name"]').attr("content");
//     const description = $('meta[name="description"]').attr("content") || "";
//     const logoUrl = $("img.logo").first().attr("src") || "";
//     const facebookUrl = $('a[href*="facebook.com"]').attr("href") || "";
//     const linkedinUrl = $('a[href*="linkedin.com"]').attr("href") || "";
//     const twitterUrl = $('a[href*="twitter.com"]').attr("href") || "";
//     const instagramUrl = $('a[href*="instagram.com"]').attr("href") || "";

//     // const screenshotUrl = puppeteerResponse;

//     const newCompany = new Company({
//       companyName,
//       description,
//       logoUrl,
//       facebookUrl,
//       linkedinUrl,
//       twitterUrl,
//       instagramUrl,
//       // screenshotUrl,
//     });

//     await newCompany.save();

//     res
//       .status(200)
//       .json({ message: "Company data scraped and saved successfully!" });
//   } catch (error) {
//     console.error("Error scraping:", error);
//     res.status(500).send("Error scraping data");
//   }
// });

router.post("/scrape", async (req, res) => {
  const { url } = req.body;

  try {
    // Fetch HTML content from the provided URL
    const axiosResponse = await axios.get(url);
    const $ = cheerio.load(axiosResponse.data);

    // Extract company data from the HTML
    const companyName = $('meta[property="og:site_name"]').attr("content");
    const description = $('meta[name="description"]').attr("content") || "";
    const logoUrl = $("img.logo").first().attr("src") || "";
    const facebookUrl = $('a[href*="facebook.com"]').attr("href") || "";
    const linkedinUrl = $('a[href*="linkedin.com"]').attr("href") || "";
    const twitterUrl = $('a[href*="twitter.com"]').attr("href") || "";
    const instagramUrl = $('a[href*="instagram.com"]').attr("href") || "";

    // Create a new Company object using Mongoose model
    const newCompany = new Company({
      companyName,
      description,
      logoUrl,
      facebookUrl,
      linkedinUrl,
      twitterUrl,
      instagramUrl,
    });

    // Save the newCompany object to the database
    await newCompany.save();

    // Respond with success message
    res.status(200).json({ message: "Company data scraped and saved successfully!" });
  } catch (error) {
    console.error("Error scraping:", error);
    res.status(500).send("Error scraping data");
  }
});
router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).send("Error fetching companies");
  }
});

router.delete("/companies", async (req, res) => {
  const { ids } = req.body;
  try {
    await Company.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Companies deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete companies" });
  }
});
router.get("/companies/:_id", async (req, res) => {
  const companyId = req.params._id;
  console.log(companyId, "companyId");
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch company details" });
  }
});




module.exports = router;
