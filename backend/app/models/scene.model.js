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
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    parentSceneId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Scenes',
        key: 'id'
      }
    },
    parentProjectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
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
    Scene.hasMany(models.Event, { as: 'childScenes', foreignKey: 'parentSceneId' });
    Scene.belongsTo(models.Scene, { as: 'parentScene', foreignKey: 'parentSceneId' });
    Scene.belongsTo(models.Project, { as: 'parentProject', foreignKey: 'parentProjectId' });
  };  
  return Scene;
};