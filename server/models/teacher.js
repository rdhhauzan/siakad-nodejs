'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasOne(models.Class, {
        foreignKey: "class"
      })
    }
  }
  Teacher.init({
    name: DataTypes.STRING,
    class: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    pob: DataTypes.STRING,
    address: DataTypes.TEXT,
    phoneNumber: DataTypes.STRING,
    img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};