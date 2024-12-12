const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const axios = require("axios");

exports.findResearchTopics = catchAsync(async (req, res, next) => {
  const { topic, year, field, region } = req.body;

  if (!topic) {
    return next(new AppError("Topic is required.", 400));
  }

  const activity = `Search: "${topic}" | Year: ${year || "Any"} | Field: ${
    field || "Any"
  } | Region: ${region || "Any"}`;

  // Construct query parameters for SerpApi
  const params = {
    engine: "google_scholar",
    q: topic,
    as_ylo: year ? year.split("-")[0] : undefined,
    as_yhi: year ? year.split("-")[1] : undefined,
    hl: region || "en", // Default to English if no region provided
    api_key: process.env.SERP_API_PRIVATE_KEY, // Store API key in .env
  };

  try {
    const response = await axios.get("https://serpapi.com/search", { params });

    // Return data to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching from SerpApi:", error);
    return next(new AppError("Failed to fetch research topics.", 500));
  }
});
