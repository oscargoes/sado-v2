const chalk = require("chalk");

module.exports = {
    name: "err",
    execute(err) {
        console.log(chalk.cyan(`Error occured with DB connection:\n${err}`));
    },
};