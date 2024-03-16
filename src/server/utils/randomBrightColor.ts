export function randomBrightColor() {
  // Generate random values for red, green, and blue channels
  const r = Math.floor(Math.random() * 200); // Random value between 0 and 255
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);

  // Convert RGB to hexadecimal color representation
  const color = "#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);

  return color;
}

// Helper function to convert a single RGB value to hexadecimal
function rgbToHex(rgb: number) {
  let hex = rgb.toString(16); // Convert to base 16 (hexadecimal)
  if (hex.length < 2) {
    hex = "0" + hex; // Pad with leading zero if needed
  }

  return hex;
}
