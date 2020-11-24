module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://glacial-river-01756.herokuapp.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    },
  },
});
