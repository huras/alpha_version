module.exports = (sequelize, Sequelize) => {
  const Background = sequelize.define('Background', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    parentBackground: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Backgrounds', // refers to the Event model
        key: 'id',
        as: 'parentPlace',
      }
    },
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
    Background.belongsToMany(models.Event, { through: 'EventBackground', as: 'event_backgrounds' });
    // parentPlace
    Background.belongsTo(models.Background, { as: 'parentPlace', foreignKey: 'parentBackground' });
    Background.hasMany(models.Background, { as: 'childPlaces', foreignKey: 'parentBackground' });
  };
  return Background;
};