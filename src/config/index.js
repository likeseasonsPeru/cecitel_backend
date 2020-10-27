module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    saltRouds: process.env.SALT_ROUDS,
    jwtSecret: process.env.JWT_SECRET,
    mailName: process.env.MAILNAME,
    mailhost: process.env.MAILHOST,
    mailport: process.env.MAILPORT,
    mailuser: process.env.MAILUSER,
    mailPassword: process.env.MAILPASSWORD,
};