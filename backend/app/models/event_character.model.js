module.exports = (sequelize, DataTypes) => {
  const EventCharacter = sequelize.define('EventCharacter', {
    EventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    CharacterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Characters',
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

  return EventCharacter;
};
