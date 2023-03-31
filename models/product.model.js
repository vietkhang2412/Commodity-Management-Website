const { model } = require("mongoose");
var db = require("./db");

const proSchema = db.mongoose.Schema(
  {
    tensanpham: { type: String, require: true },
    anhsanpham: { type: String, require: false },
    theloai: { type: String, require: true },
    mota: { type: String, require: false },
    dongia: { type: Number, require: false },
  },
  { collection: "products" }
);

const catsSchema = db.mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  { collection: "categories" }
);

let proModel = db.mongoose.model("proModel", proSchema);
let catsModel = db.mongoose.model("catsModel", catsSchema);

module.exports = {
  proModel,
  catsModel,
};
