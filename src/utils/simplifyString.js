function simplifyString(string, count) {
  return string.length < count ? string : string.slice(0, count).concat('...');
}

export { simplifyString };
