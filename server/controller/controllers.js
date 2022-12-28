const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Building, Class, Student, Teacher, users } = require("../models/index");

class Controller {
  static async registerUser(req, res) {
    try {
      const { email, password, name } = req.body;

      const data = await users.create({ email, password, name });
      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "FIELD_UNCOMPLETE" };
      }

      let findUser = await users.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      const isValidPassword = comparePassword(password, findUser.password);
      if (!isValidPassword) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        email: payload.email,
        id: payload.id,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "USER_NOT_FOUND") {
        res.status(401).json("Invalid Email / Password");
      } else if (error.name === "FIELD_UNCOMPLETE") {
        res.status(402).json("Please Fill All Field!");
      } else {
        console.log(error);
      }
    }
  }

  static async addBuilding(req, res) {
    // ! For img Temporary Use URL, Later Use File
    const { name, desc, img, condition } = req.body;
    if (!name || !desc || !img || !condition) {
      throw { name: "FIELDS_UNCOMPLETE" };
    }
    try {
      let data = await Building.create({ name, desc, img, condition });

      res.status(201).json("Building Add Successfully!");
    } catch (error) {
      if (error.name === "FIELDS_UNCOMPLETE") {
        res.status(401).json("Please Fill all the Fields!");
      } else {
        res.status(400).json(error);
      }
    }
  }

  static async getAllBuilding(req, res) {
    try {
      let data = await Building.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteBuilding(req, res) {
    let { buildingId } = req.params;
    try {
      let findBuilding = await Building.findOne({
        where: {
          id: buildingId,
        },
      });
      if (!findBuilding) {
        throw { name: "BUILDING_NOT_FOUND" };
      }

      await Building.destroy({ where: { id: buildingId } });
      res
        .status(200)
        .json(`Building with Name ${findBuilding.name} Remove Successfully`);
    } catch (error) {
      if (error.name === "BUILDING_NOT_FOUND") {
        res.status(403).json(`Building with id ${buildingId} not Found!`);
      } else {
        console.log(error);
      }
    }
  }

  static async editBuilding(req, res) {
    let { buildingId } = req.params;
    const { name, desc, img, condition } = req.body;
    try {
      let data = await Building.update(
        { name, desc, img, condition },
        { where: { id: buildingId } }
      );

      res.status(200).json(`Building with id ${buildingId} Updated!`);
    } catch (error) {
      console.log(error);
    }
  }

  static async detailBuilding(req, res) {
    let { buildingId } = req.params;
    try {
      let data = await Building.findOne({ where: { id: buildingId } });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
