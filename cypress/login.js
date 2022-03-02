function loginUser(school, credentials, inputSessionData) {
  const sessionData = inputSessionData || {};

  cy.request("POST", `${Cypress.env("api")}/auth/login`, {
    email: credentials.email,
    password: credentials.password,
    school_id: school.id,
  }).then((user) => {
    sessionData.TOKEN = user.body.jwt_token;
    sessionData.REFRESH_TOKEN = user.body.refresh_token;
    sessionData.USER_ID = user.body.user_id;
    setSessionInLocalStorage(sessionData);
  });
}

function setSessionInLocalStorage(sessionData) {
  if (sessionData?.TOKEN) {
    window.localStorage.setItem("TOKEN", sessionData.TOKEN);
    window.localStorage.setItem("REFRESH_TOKEN", sessionData.REFRESH_TOKEN);
    window.localStorage.setItem("USER_ID", sessionData.USER_ID);
  }
}

export function addCypressLoginCommands() {
  // TODO config that should be relied on for github secrets
  // const testSchool: TestSchool = process.env.TEST_SCHOOL || Cypress.env('testSchool')
  // Currently working config if not relying on env or secrets
  const testSchool = Cypress.env("TEST_SCHOOL") || {
    name: "Kori Sandbox",
    id: 121,
  };

  Cypress.Commands.add("loginAdmin", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = process.env.ADMIN_TEST_USER || Cypress.env('adminTestUser');
    const adminTestUser = Cypress.env("ADMIN_TEST_USER") || {
      email: "kori+sandbox@circleinapp.com",
      password: "abc123",
    };
    loginUser(testSchool, adminTestUser, sessionData);
  });

  Cypress.Commands.add("loginUser1", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = process.env.TEST_USER_1 || Cypress.env('testUser1');
    const testUser1 = Cypress.env("TEST_USER_1") || {
      email: "kori+cb@circleinapp.com",
      password: "abc123",
    };
    loginUser(testSchool, testUser1, sessionData);
  });

  Cypress.Commands.add("loginUser2", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = process.env.TEST_USER_2 || Cypress.env('testUser2');
    const testUser2 = Cypress.env("TEST_USER_2") || {
      email: "kori+hs@circleinapp.com",
      password: "abc123",
    };
    loginUser(testSchool, testUser2, sessionData);
  });

  Cypress.Commands.add("setSessionInLocalStorage", (sessionData) => {
    setSessionInLocalStorage(sessionData);
  });
}
