export const getImage = (charator) => {
  let img;
  switch (charator) {
    case "T":
      img = require("../assets/img/T.png");
      break;
    case "ô":
      img = require("../assets/img/ô.png");
      break;
    case "i":
      img = require("../assets/img/i.png");
      break;
    case "l":
      img = require("../assets/img/l.png");
      break;
    case "à":
      img = require("../assets/img/à.png");
      break;
  }
  return img;
};
