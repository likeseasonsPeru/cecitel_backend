const fs = require("fs-extra");
const path = require("path");

module.exports = {
  removeImage: async image => {
    try {
      if (Array.isArray(image)){
        image.forEach(async i => {
          await fs.unlink(path.resolve(__dirname, "../assets/imgs/", i));    
        })
      } else {
        await fs.unlink(path.resolve(__dirname, "../assets/imgs/", image));
      }
    } catch (e) {
      console.log("Ocurrio un problema al eliminar la imagen");
      console.log(e);
    }
  },
  removeFile: async file => {
    try {
      //file = image.split(`public/`)[1];
      if (Array.isArray(file)) {
        file.forEach(async f => {
          await fs.unlink(path.resolve(__dirname, "../assets/archivos/", f));
        });
      } else {
        await fs.unlink(path.resolve(__dirname, "../assets/archivos/", file));
      }
    } catch (e) {
      console.log("Ocurrio un problema al eliminar la imagen");
      console.log(e.message);
    }
  }
};
