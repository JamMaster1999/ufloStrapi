'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
// When you create a new Content Type you will see a new empty controller has been created.
// This is because Strapi builds a generic controller for your models by default and allows
// you to override and extend it in the generated files.
module.exports = {
  // GET /hello
  async index(ctx) {
    return 'Hello World!';
  },
  /*
  The obj parameter is available via ctx.params and the
  options are available via ctx.query in the controller's action.

  query is more like a serialized params

  */
  async testOption(ctx) {
    // console.log('In testOption');
    // console.log('ctx.params', ctx.params);
    // console.log("ctx.request.body", ctx.request.body)
    const tests = await strapi.query('test').find();
    // console.log(tests);
    return tests;
  },
  async testLogin(ctx) {
    // console.log(ctx);

    // First we can get the authorization header from ctx.request.header.authorization
    // This header can contain the JWT token for subsequent requests
    const authorization = ctx.request.header.authorization;
    let token = null;
    if (authorization) {
      const parts = authorization.split(' ');
      if (parts.length > 1) {
        token = parts[1];
      }
    }

    // check the credentials
    // Note: params in used in GET request
    // const params = ctx.params;
    // In Mutation, should use request.body
    const { username, password } = ctx.request.body;

    // console.log(password, username);
    // Hashing the password
    const hasedPassword = await strapi.plugins['users-permissions'].services.user.hashPassword({
      password,
    });
   console.log('hasedPassword', hasedPassword);

    const user = await strapi.query('user', 'users-permissions').findOne({ username });
    // console.log('users', user);

    if (!user) {
      return ctx.send({
        message: 'User does not exist.',
        __typename: 'LoginFailureResponse',
      });
    }


    // Always return token for now
    const validated = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);
    if (!validated) {
      return ctx.send({
        message: 'Incorrect password.',
        __typename: 'LoginFailureResponse',
      });
    }
    // console.log(validate);

    ctx.send({
      token: strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      }),
      username,
      password,
      __typename: 'LoginSuccessResponse',

    });
  }
};
