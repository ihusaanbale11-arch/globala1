// Minimal stub implementations for AI features.
// These are intentionally synchronous and do not import any optional AI packages,
// preventing the dev server from attempting to resolve unavailable dependencies.

export const generateInquiryResponse = async (_inquiryText: string, _clientName: string): Promise<string> => {
  return 'AI feature not available in this environment.';
};

export const analyzeCandidateSuitability = async (_candidateProfile: string, _jobRequirement: string): Promise<string> => {
  return 'AI feature not available in this environment.';
};

