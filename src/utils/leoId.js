const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateLeoId() {
  const prefix = "LEO_UTSAV";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return prefix + suffix;
}
