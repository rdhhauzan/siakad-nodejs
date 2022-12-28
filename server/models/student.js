'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasOne(models.Class, {
        foreignKey: "class"
      })
    }
  }
  Student.init({
    name: DataTypes.STRING,
    class: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    address: DataTypes.TEXT,
    img: DataTypes.TEXT,
    nisn: DataTypes.INTEGER,
    pob: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};