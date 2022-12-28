const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controller/controllers");
const loginAuth = require("./middlewares/authentication");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/register", Controller.registerUser);
app.post("/users/login", Controller.loginUser);

app.use(loginAuth);
app.get("/building", Controller.getAllBuilding);
app.post("/building/add", Controller.addBuilding);
app.delete("/building/delete/:buildingId", Controller.deleteBuilding);
app.put("/building/edit/:buildingId", Controller.editBuilding);
app.get("/building/detail/:buildingId", Controller.detailBuilding);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
