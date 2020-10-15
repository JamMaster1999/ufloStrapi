module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://api.uc3d.io'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '99e8d6d356cac021401f5a2886357a83')
    },
  },
});
