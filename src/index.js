require("dotenv").config();
const {
  enviromentsUtils: { validateRequireEnvs }
} = require("./utils");
const requiredEnvs = ["PORT", "MONGO_URI"];

validateRequireEnvs(requiredEnvs);

const { mongoDBHelpers } = require("./helpers");

(async () => {
  await mongoDBHelpers.connect();
  require("./app");
})();

process.on("SIGINT", () => {
  mongoDBHelpers.disconnect().then(connectionState => {
    console.log("Database disconnect, connection state:", connectionState);
    console.log("Closing process");
    process.exit(0);
  });
});
