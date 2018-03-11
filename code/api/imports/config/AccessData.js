export const webUrl =
  process.env.NODE_ENV === 'development'
    ? {
      host: 'localhost',
      port: '8080',
      path: '/reset-password',
      protocol: 'http',
    }
    : { host: 'sounds-social-dev.surge.sh', port: '', protocol: 'https' }
