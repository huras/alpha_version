module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: true
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
    dialogText: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
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
  Event.associate = function (models) {
    Event.belongsToMany(models.Background, { through: 'EventBackground', as: 'event_backgrounds' });
    Event.belongsToMany(models.Character, { through: 'EventCharacter', as: 'event_characters' });

    Event.hasMany(models.EventChoice, { foreignKey: 'EventId', as: 'childChoices' });
    Event.hasMany(models.EventChoice, { foreignKey: 'RelatedEventId', as: 'parentEvents' });    
    
    Event.hasMany(models.Event, { foreignKey: 'parentEvent', as: 'nextEvents' });
    Event.belongsTo(models.Event, { foreignKey: 'parentEvent', as: 'prevEvents' });
    // Define "Brother Events" as events that share the same parent event
    Event.hasMany(models.Event, { foreignKey: 'parentEvent', as: 'brotherEvents' });

    Event.belongsTo(models.Scene, { as: 'parentScene' });
    Event.belongsTo(models.Character, { as: 'speaker', foreignKey: 'speakerId' });
    Event.belongsTo(models.Character, { as: 'mugshot', foreignKey: 'mugshotId' });
  };
  Event.getEventBrothers = async function(eventId) {
    const event = await Event.findByPk(eventId);
    if (!event || !event.parentEvent) return [];

    return Event.findAll({
      where: {
        parentEvent: event.parentEvent,
      }
    });
  };
  return Event;
};