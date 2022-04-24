export function login(context) {
  try {
    const { username } = JSON.parse(context.body);
    return {
      code: "00000000",
      data: {
        username: username,
        loginTime: new Date().valueOf(),
        token: (Math.random() * 1e20).toString(36),
      },
      message: "ok",
    };
  } catch (error) {
    return {
      code: "00000030",
      data: {},
      message: error,
    };
  }
}
