const adjustColorBrightness = (color, percent) => {
    const hex = color.slice(1);
    const num = parseInt(hex, 16);
    let r = (num >> 16) + percent;
    r = Math.min(Math.max(0, r), 255);
    let b = ((num >> 8) & 0x00FF) + percent;
    b = Math.min(Math.max(0, b), 255);
    let g = (num & 0x0000FF) + percent;
    g = Math.min(Math.max(0, g), 255);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
};

export default adjustColorBrightness;