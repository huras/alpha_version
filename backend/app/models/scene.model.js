module.exports = (sequelize, Sequelize) => {
  const Scene = sequelize.define('Scene', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
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
  Scene.associate = function (models) {
    Scene.hasMany(models.Event, { as: 'childEvents', foreignKey: 'parentSceneId' });
  };  
  return Scene;
};