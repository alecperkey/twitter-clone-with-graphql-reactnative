export const truncateWithEllipses = (text, max) =>
  text.substr(0, max - 1) + (text.length > max ? '...' : '');
