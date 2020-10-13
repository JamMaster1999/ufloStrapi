module.exports = {
  definition: `
    enum TestEnumInput {
      option1
      option2
    }
    type LoginSuccessResponse {
      username: String!
      password: String!
      token: String!
    }
    type LoginFailureResponse {
      message: String!
    }
    union LoginResponse = LoginSuccessResponse | LoginFailureResponse
  `,
  query: `
    testByOption(id: ID, status: TestEnumInput, limit: Int): [Test]!
  `,
  mutation: `
    testLogin(username: String! password: String!): LoginResponse!
  `,
  resolver: {
    Query: {
      testByOption: {
        description: 'Test extending the default CRUD GraphQL actions -- Query',
        resolver: 'application::test.test.testOption',
      },
    },
    Mutation: {
      testLogin: {
        description: 'Test extending the default CRUD GraphQL actions -- Mutation',
        // policies: ['plugins::users-permissions.isAuthenticated', 'isOwner'],
        resolver: 'application::test.test.testLogin',
      },
    },
  },
};
