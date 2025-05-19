Use Gemini API with Google Search grounding feature to create a personalised news-curator.

This code is part of the following workshop: https://tldr.lovee.dev

We deploy this on cloud run and then call the endpoint in Google Application Integration to trigger sending an email with the response from this cloud run app.

Now, since this space is continuously evolving, after I have created this workshop, there have been major changes. And hence to keep up with them I have created different versions in different branches.
Here are these changes:

1. The first iteration of this codelab was with [Gemini SDK (now deprecated)](https://www.npmjs.com/package/@google/generative-ai) and used `Gemini-1.5-Flash` model. Checkout branch: `use-gemini-sdk`.
2. The use of Gemini 2+ models with the `@google/generative-ai` package changes a bit, it cannot accept `googleSearchRetrival` tool, instead uses `googleSearch` tool. Checkout branch: `2.0-plus-models`.
3. The new `@google/genai` ([still in preview](https://www.npmjs.com/package/@google/genai)) SDK basically allows us to use both Gemini and Vertex AI using the same package. And has different way of initialisation and usage. Checkout branch: `vertex-implementation`.
