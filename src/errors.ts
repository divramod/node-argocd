export class ArgoCDError extends Error {
  constructor(error: string[] | string | null) {
    if (Array.isArray(error)) {
      error = error.join('\n');
    }
    super(`ArgoCDError: ${error && error !== '' ? error : 'Not Found'}`);
  }
}
