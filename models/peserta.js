'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  peserta.init({
    nama: DataTypes.STRING,
    telepon: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    los: DataTypes.STRING,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'peserta',
  });
  return peserta;
};