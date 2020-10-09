module.exports = {
  validateRequireEnvs: requireEnvs => {
    for (let requierEnv of requireEnvs) {
      if (!process.env[requierEnv]) {
        throw new Error(`${requierEnv} must be defined on the .env file`);
      }
    }
  }
};
