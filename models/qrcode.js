'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qrcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qrcode.init({
    peserta_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    qrcode_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'qrcode',
  });
  return qrcode;
};