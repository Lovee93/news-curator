Use Gemini API with Google Search grounding feature to create a personalised news-curator.

This code is part of the following workshop: https://tldr.lovee.dev

We deploy this on cloud run and then call the endpoint in Google Application Integration to trigger sending an email with the response from this cloud run app.

Now, since this space is continuously evolving, after I have created this workshop, there have been major changes. And hence to keep up with them I have created different versions in different branches.
Here are 2 main changes:

1. Using Gemini 2+ models with the `@google/generative-ai` package. The implementation for 2.0+ models changes a bit, it cannot accept `googleSearchRetrival` tool, instead uses `googleSearch` tool. Checkout branch: `2.0-plus-models`.
2. Google has introduced a new package `@google/genai` ([still in preview](https://www.npmjs.com/package/@google/genai)), that basically allows us to use both Gemini and Vertex AI using the same package. And has different way of initialisation and usage. Checkout branch: `use-genai-package` to learn more.
