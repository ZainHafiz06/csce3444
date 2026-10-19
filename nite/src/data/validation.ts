/**
 * A .edu address is NOT required — any syntactically valid email may create an
 * account (gmail, outlook, yahoo, personal domains). Student verification, if
 * it is ever added, is a separate workflow and must not gate registration.
 */
export function isValidEmail(email: string): boolean {
  const value = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function passwordProblem(password: string): string | null {
  if (password.length < 8) return 'Use at least 8 characters.';
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Include at least one letter and one number.';
  }
  return null;
}
