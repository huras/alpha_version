module.exports = (sequelize, Sequelize) => {
  const EventChoice = sequelize.define('EventChoice', {
    choice: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    // Foreign keys will be added automatically
  });

  EventChoice.associate = function(models) {
    EventChoice.belongsTo(models.Event, { foreignKey: 'EventId', as: 'Event' });
    EventChoice.belongsTo(models.Event, { foreignKey: 'RelatedEventId', as: 'RelatedEvent' });
  };

  return EventChoice;
};
