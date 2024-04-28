module.exports = (sequelize, Sequelize) => {
  const Background = sequelize.define('Background', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    image: Sequelize.TEXT,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
    // ... add other fields as needed
  }, {});
  Background.associate = function (models) {
    Background.belongsToMany(models.Event, { through: 'EventBackgrounds' });
  };
  return Background;
};