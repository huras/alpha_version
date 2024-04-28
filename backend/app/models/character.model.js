module.exports = (sequelize, Sequelize) => {
  const Character = sequelize.define('Character', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mugshot: Sequelize.TEXT,
    image: Sequelize.TEXT,
    alignment: Sequelize.STRING,
    fullname: Sequelize.STRING,
    family: Sequelize.STRING,
    race: Sequelize.STRING,
    neutral_traits: Sequelize.TEXT,
    negative_traits: Sequelize.TEXT,
    known_characters: Sequelize.TEXT,
    skills: Sequelize.TEXT,
    short_backstory: Sequelize.TEXT,
    age: Sequelize.INTEGER,
    core_memories: Sequelize.TEXT,
    long_term_goals: Sequelize.TEXT,
    physical_appearance: Sequelize.TEXT,
    personality_traits: Sequelize.TEXT,
    beliefs_values: Sequelize.TEXT,
    relationships: Sequelize.TEXT,
    fears_vulnerabilities: Sequelize.TEXT,
    unique_abilities_powers: Sequelize.TEXT,
    hobbies_interests: Sequelize.TEXT,
    quirks_habits: Sequelize.TEXT,
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
  Character.associate = function (models) {

    // Character.belongsToMany(models.Event, { through: 'EventCharacters' });
    Character.hasMany(models.Event, { foreignKey: 'speakerId' });
    Character.hasMany(models.Event, { foreignKey: 'mugshotId' });
  };
  return Character;
};