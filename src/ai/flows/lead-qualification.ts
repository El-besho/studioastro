'use server';
/**
 * @fileOverview A lead qualification AI flow for generating context-aware questions.
 *
 * - getLeadQualificationQuestion - A function that generates a clarifying question for a given service.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LeadQualificationInputSchema = z.string().describe("The name of the home service requested by the user.");
const LeadQualificationOutputSchema = z.string().describe("A single, concise, open-ended question in Arabic to ask the user for more details about their request. The question should be specific to the service.");

const leadQualificationPrompt = ai.definePrompt({
  name: 'leadQualificationPrompt',
  input: { schema: LeadQualificationInputSchema },
  output: { schema: LeadQualificationOutputSchema },
  prompt: `You are an expert home services dispatcher in Saudi Arabia. A user has requested a specific service. 
  Your task is to generate ONE clarifying question in Arabic to better understand their needs. 
  The question should be simple, direct, and focused on gathering the most important detail to qualify the lead.

  Service requested: {{{prompt}}}

  Example for 'plumbing': "ما هي المشكلة التي تواجهها بالضبط؟ (مثال: تسريب مياه، انسداد، تركيب جديد)"
  Example for 'AC repair': "ما هو نوع المكيف لديك وما هي المشكلة؟ (مثال: سبليت لا يبرد، شباك يصدر صوتاً)"
  Example for 'electrical services': "ما هي الخدمة الكهربائية التي تحتاجها؟ (مثال: إصلاح عطل، تركيب إضاءة، فحص عام)"
  Example for 'pest control': "ما هو نوع الحشرة التي تريد مكافحتها وأين تظهر بشكل متكرر؟"

  Generate a similar, specific question for the service requested above.
  `,
  config: {
    temperature: 0.5,
  }
});

const leadQualificationFlow = ai.defineFlow(
  {
    name: 'leadQualificationFlow',
    inputSchema: LeadQualificationInputSchema,
    outputSchema: LeadQualificationOutputSchema,
  },
  async (serviceName) => {
    const { output } = await leadQualificationPrompt(serviceName);
    return output || "يرجى وصف المشكلة التي تواجهها بالتفصيل.";
  }
);

export async function getLeadQualificationQuestion(serviceName: string): Promise<string> {
  return leadQualificationFlow(serviceName);
}
