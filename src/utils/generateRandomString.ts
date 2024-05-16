export function generateRandomString(length = 36) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }

  // Optionally, format the string like a UUID
  if (length === 36) {
    result = [
      result.slice(0, 8),
      result.slice(8, 12),
      result.slice(12, 16),
      result.slice(16, 20),
      result.slice(20, 36),
    ].join("-");
  }

  return result;
}
