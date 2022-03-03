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
  const testSchool = {
    name: "Kori Sandbox",
    id: 121,
  };

  Cypress.Commands.add("loginAdmin", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = Cypress.env("adminTestUser");
    const adminTestUser = {
      email: "kori+sandbox@circleinapp.com",
      password: Cypress.env("PASSWORD"),
    };
    loginUser(testSchool, adminTestUser, sessionData);
  });

  Cypress.Commands.add("loginUser1", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = Cypress.env("testUser1");
    const testUser1 = {
      email: "kori+cb@circleinapp.com",
      password: Cypress.env("PASSWORD"),
    };
    loginUser(testSchool, testUser1, sessionData);
  });

  Cypress.Commands.add("loginUser2", (sessionData) => {
    // TODO config that should be relied on for github secrets
    // const testUser1 = Cypress.env("testUser2");
    const testUser2 = {
      email: "kori+hs@circleinapp.com",
      password: Cypress.env("PASSWORD"),
    };
    loginUser(testSchool, testUser2, sessionData);
  });

  Cypress.Commands.add("setSessionInLocalStorage", (sessionData) => {
    setSessionInLocalStorage(sessionData);
  });
}
