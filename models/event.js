'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    nama: DataTypes.STRING,
    tempat: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    lengthofevent: DataTypes.INTEGER,
    kapasitas: DataTypes.INTEGER,
    keterangan: DataTypes.DATE,
    eventpathfiledesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};