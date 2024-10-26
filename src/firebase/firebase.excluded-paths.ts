const EXCLUDED_PATHS: string[] = [
  'GET /',
  'GET /about',
  'GET /health',
  'POST /auth/sign-up',
  'POST /auth/sign-in',
  'POST /auth/reset-password',
  'POST /auth/send-email-verification',
  'GET /tag',
];

export { EXCLUDED_PATHS };
