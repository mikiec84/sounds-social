export const generateCacheKey = method => (root, args) =>
  `${method}${JSON.stringify(root)}`
