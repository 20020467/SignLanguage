export const getImage = (charator) => {
  let img;
  switch (charator) {
    case "T":
      img = require("../assets/T.png");
      break;
    case "ô":
      img = require("../assets/ô.png");
      break;
    case "i":
      img = require("../assets/i.png");
      break;
    case "l":
      img = require("../assets/l.png");
      break;
    case "à":
      img = require("../assets/à.png");
      break;
  }
  return img;
};
