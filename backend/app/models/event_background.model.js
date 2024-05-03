module.exports = (sequelize, DataTypes) => {
  const EventBackground = sequelize.define('EventBackground', {
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    BackgroundId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Backgrounds',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  return EventBackground;
};
