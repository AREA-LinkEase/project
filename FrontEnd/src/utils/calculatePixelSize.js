export const calculatePixelSize = (percentage) => {
  if (typeof window !== 'undefined') {
    const windowWidth = window.innerWidth;
    return (percentage / 100) * windowWidth;
  }
  return 0;
}
