module.exports = () => {
  switch (process.env.APP_ENV) {
    case "trooptrack":
      return require("./app.trooptrack.json");
    case "demoapp":
      return require("./app.demoApp.json");
  }
};
