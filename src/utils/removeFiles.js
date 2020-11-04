const fs = require('fs-extra');
const path = require('path');

module.exports = {
  removeImage: async image => {
    try {
      image = image.split(`public/`)[1];
      await fs.unlink(path.resolve(__dirname, "../assets/imgs/", image));
    } catch (e) {
      console.log("hubo un problema al eliminar la imagen");
      console.log(e)
    }
  },
  removeFile: async file => {
    try {
      file = image.split(`public/`)[1];
      await fs.unlink(path.resolve(__dirname, "../assets/archivos/", file));
    } catch (e) {
      console.log("hubo un problema al eliminar la imagen");
      console.log(e)
    }
  }
};
