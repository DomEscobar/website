'use server';

/**
 * @fileOverview Provides an AI-powered tool that suggests improvements to a portfolio's content and design.
 *
 * - suggestPortfolioImprovements - A function that suggests improvements to the portfolio.
 * - SuggestPortfolioImprovementsInput - The input type for the suggestPortfolioImprovements function.
 * - SuggestPortfolioImprovementsOutput - The return type for the suggestPortfolioImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPortfolioImprovementsInputSchema = z.object({
  portfolioContent: z.string().describe('The current content of the portfolio, including text, structure, and any other relevant details.'),
  userEngagementMetrics: z.string().describe('Data on how users are interacting with the portfolio, such as bounce rate, time on page, and conversion rates.'),
  designTrends: z.string().describe('Information on current design trends and best practices in portfolio design.'),
});
export type SuggestPortfolioImprovementsInput = z.infer<typeof SuggestPortfolioImprovementsInputSchema>;

const SuggestPortfolioImprovementsOutputSchema = z.object({
  suggestedImprovements: z.string().describe('A list of suggested improvements to the portfolio content and design.'),
  rationale: z.string().describe('The rationale behind each suggested improvement, explaining why it is expected to improve user engagement or attract more attention.'),
});
export type SuggestPortfolioImprovementsOutput = z.infer<typeof SuggestPortfolioImprovementsOutputSchema>;

export async function suggestPortfolioImprovements(input: SuggestPortfolioImprovementsInput): Promise<SuggestPortfolioImprovementsOutput> {
  return suggestPortfolioImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPortfolioImprovementsPrompt',
  input: {schema: SuggestPortfolioImprovementsInputSchema},
  output: {schema: SuggestPortfolioImprovementsOutputSchema},
  prompt: `You are an AI-powered portfolio improvement tool. Analyze the provided portfolio content, user engagement metrics, and current design trends to suggest improvements to the portfolio's content and design.

Portfolio Content: {{{portfolioContent}}}
User Engagement Metrics: {{{userEngagementMetrics}}}
Design Trends: {{{designTrends}}}

Based on this information, provide a list of suggested improvements and a rationale for each suggestion. Focus on improvements that will attract more attention and improve user engagement.

Output should be in markdown format.
`, // Added markdown format
});

const suggestPortfolioImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestPortfolioImprovementsFlow',
    inputSchema: SuggestPortfolioImprovementsInputSchema,
    outputSchema: SuggestPortfolioImprovementsOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Error in suggestPortfolioImprovementsFlow:', error);
      // Ensure we return a valid structure even in case of an error, or re-throw
      // For now, let's re-throw to make it clear the operation failed.
      throw new Error('Failed to generate portfolio improvements.');
    }
  }
);
