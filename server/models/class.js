"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasOne(models.Teacher, {
        foreignKey: "FormTeacher",
      });
      Class.belongsTo(models.Student, {
        foreignKey: "class",
      });
      Class.belongsTo(models.Teacher, {
        foreignKey: "class",
      });
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      FormTeacher: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
