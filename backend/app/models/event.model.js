module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parentEvent: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Events', // refers to the Event model
        key: 'id',
        as: 'parentEvent',
      }
    },
    speakerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Characters', // refers to the Character model
        key: 'id',
        as: 'speaker',
      }
    },
    mugshotId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Characters', // refers to the Character model
        key: 'id',
        as: 'mugshot',
      }
    },
    dialogText: Sequelize.STRING,
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
  Event.associate = function (models) {
    Event.belongsToMany(models.Background, { through: 'EventBackgrounds', as: 'event_backgrounds' });
    Event.belongsToMany(models.Character, { through: 'EventCharacters', as: 'event_characters' });

    Event.hasMany(models.EventChoice, { foreignKey: 'EventId', as: 'childEvents' });
    Event.hasMany(models.EventChoice, { foreignKey: 'RelatedEventId', as: 'parentEvents' });

    Event.belongsTo(models.Scene, { as: 'parentScene' });
    Event.belongsTo(models.Character, { as: 'speaker', foreignKey: 'speakerId' });
    Event.belongsTo(models.Character, { as: 'mugshot', foreignKey: 'mugshotId' });
  };
  return Event;
};