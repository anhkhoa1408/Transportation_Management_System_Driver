function convertPackageType(type) {
  switch (type) {
    case 'normal':
      return 'Thông thường';
    case 'explosive':
      return 'Dễ cháy nổ';
    case 'fragile':
      return 'Dễ vỡ';
    case 'smell':
      return 'Có mùi';
  }
}

export { convertPackageType };
