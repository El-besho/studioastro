'use server';
/**
 * @fileoverview This file initializes and configures the Genkit AI library.
 * It sets up the necessary plugins and exports a global `ai` object that can be used
 * throughout the application to interact with generative models.
 */

import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// Initialize Genkit with the Google AI plugin.
// This allows the application to use Google's generative models like Gemini.
export const ai = genkit({
  plugins: [
    googleAI({
      // The API key for Google AI services is retrieved from environment variables.
      // It's important to set this in your .env.local file.
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  // Log all AI interactions to the console for debugging purposes.
  // In a production environment, you might want to set this to 'warn' or 'error'.
  logLevel: 'debug',
  // Enable native Javascript Functions as Tools
  enableTracing: true,
});
