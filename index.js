import express from "express";
import Replicate from "replicate";

const app = express();

app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  const input = {
    cfg: 4.5,
    prompt,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 79,
    negative_prompt: "ugly, distorted",
  };

  const output = await replicate.run("stability-ai/stable-diffusion-3", {
    input,
  });
  console.log(output);

  res.json(output);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
