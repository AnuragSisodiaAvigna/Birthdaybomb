"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Groups, {
        foreignKey: "group_id",
        as: "groups",
      });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        notEmpty: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_no: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        notEmpty: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "321321321"
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      login_token: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
      timestamps: false,
    }
  );
  return Users;
};
