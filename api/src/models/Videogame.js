const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{4}-\d{2}-\d{2}$/
      }
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "https://cdn.pixabay.com/photo/2023/02/03/05/11/youtube-background-7764170_1280.jpg",
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        max: 5,
        min: 0,
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    short_screenshots: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
  }, { timestamps: false });
};
