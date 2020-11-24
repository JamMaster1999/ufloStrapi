module.exports = ({env}) => ({
  "host": "localhost",
  "port": 1337,
  "autoReload": {
    "enabled": true
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    },
  }
});
