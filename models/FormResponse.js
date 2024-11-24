const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FormResponse = sequelize.define(
  "FormResponse",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    miningTrade: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    emTrade: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    excavationDepartmentalTrade: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    excavationContractualTrade: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    nameOfEmployee: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    areaOrProject: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    generalQualification: {
      type: DataTypes.INTEGER,
      allowNull: false, // Required field
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false, // Required field
    },
    basicKnowledgeOfFirstAidAndFireFighting: {
      type: DataTypes.INTEGER,
      allowNull: false, // Required field
    },
    oralTest: {
      type: DataTypes.INTEGER,
      allowNull: false, // Required field
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: true, // Automatically calculated, no need to input directly
    },
  },
  {
    timestamps: true, // Will add createdAt and updatedAt columns
    hooks: {
      beforeCreate: (formResponse) => {
        formResponse.totalScore =
          formResponse.generalQualification +
          formResponse.experience +
          formResponse.basicKnowledgeOfFirstAidAndFireFighting +
          formResponse.oralTest;
      },
    },
  }
);

module.exports = FormResponse;
