const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const axios = require("axios");

exports.findResearchTopics = catchAsync(async (req, res, next) => {
  const { topic, year, field, region, start } = req.body;

  if (!topic) {
    return next(new AppError("Topic is required.", 400));
  }

  const activity = `Search: "${topic}" | Year: ${year || "Any"} | Field: ${
    field || "Any"
  } | Region: ${region || "Any"}`;

  // Construct query parameters for SerpApi
  const params = {
    engine: "google_scholar",
    q: topic + `${field ? " in " + field : ""}`,
    as_ylo: year ? year.split("-")[0] : undefined,
    as_yhi: year ? year.split("-")[1] : undefined,
    hl: "en", // Default to English if no region provided
    api_key: process.env.SERP_API_PRIVATE_KEY, // Store API key in .env
    start: start || 0,
  };

  try {
    const response = await axios.get("https://serpapi.com/search", { params });

    // Return data to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    return next(new AppError("Failed to fetch research topics.", 500));
  }
});

exports.generateResearchTopics = catchAsync(async (req, res, next) => {
  const { discipline } = req.query;

  if (!discipline) {
    return res.status(400).json({ error: "Discipline is required." });
  }
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/gpt4",
    headers: {
      "x-rapidapi-key": process.env["X_RAPID_API_KEY"],
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      messages: [
        {
          role: "user",
          content: `Generate a list of academic research topics related to the discipline "${discipline}".`,
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);

    const suggestions = response.data.result
      .trim()
      .split("\n")
      .slice(1)
      .filter((topic) => topic);

    res.json({ topics: suggestions });
  } catch (error) {
    console.log(error);
    next(
      new AppError("Failed to generate topics. Please try again later.", 500)
    );
  }
});
