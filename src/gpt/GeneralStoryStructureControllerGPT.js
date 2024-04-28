Level 1 - Low resolution story structure

var sexo_protagonista = 'male';
var age_protagonista = 17;

var prompt = `
Your main purpose is to generate an main arc for a story based on the information provided by the system messages.

Gives the events description in a sequence of points descriptions. The descriptions must be open ended and just mention elements like places, characters. These will be the subarcs that will be further developed in further steps. The crucial part is to have consistency and leave space for a well written story with lots of setups and payoffs further in the story. It must be open ended so no epilogue, more arcs will be generated as needed.

In the first arc it should be in a way to allow the smooth introduction of the protagonist, and first main characters of the team.
The second arc should be an arc that will allow the protagonist to tap into the main magic system of the world developed.


Protagonist: ${sexo_protagonista}, ${age_protagonista} years old. 
Gets teleported from Earth 2023 to a parallel world. 
The main protagonist was looking for a way to be teleported, but it did not happen as he expected, it came as a surprise.
Main theme: Overpowered medieval magical fantasy isekai

Your output must have the structure of the below example: 

\`\`\`
Hunter Exam Arc: This arc introduces the main characters, including Gon Freecss, who seeks to become a Hunter to find his father, Ging. He befriends Leorio, Kurapika, and Killua during the rigorous Hunter Examination. The arc showcases various challenges that test the candidates' abilities, intelligence, and morals.

Zoldyck Family Arc: After the exam, Gon and his friends venture to rescue Killua from his family's estate, the Zoldyck family being renowned assassins. This arc delves into Killua's background and the dynamics of the Zoldyck family.

Heavens Arena Arc: Gon and Killua enter the Heavens Arena, a skyscraper where fighters compete in martial arts tournaments. Here, they learn about Nen, a crucial power system in the series, and face various opponents, enhancing their combat skills.

Yorknew City Arc: Kurapika's quest for revenge against the Phantom Troupe, a notorious group of criminals who massacred his clan, takes center stage. The arc intertwines with Gon and Killua's adventures as they get involved in underground auctions and confrontations with the Troupe.

Greed Island Arc: Gon and Killua enter the Greed Island game, designed by Ging, to find clues about his whereabouts. They encounter unique challenges and enemies in the game, further developing their Nen abilities.

Chimera Ant Arc: This dark and complex arc introduces the Chimera Ants, led by the King, Meruem. The ants pose a grave threat to humanity, leading to intense battles and moral dilemmas. The arc is significant for its character development, especially for Gon and Meruem.

Election Arc: Following the Chimera Ant crisis, the Hunter Association needs a new chairman. The arc focuses on the election process, involving politics and intrigue, and introduces new characters like Pariston Hill and Ging Freecss.

Dark Continent Expedition Arc (Manga Only): The story expands to explore the Dark Continent, a dangerous and unexplored area. The arc introduces new challenges and mysteries, with the Zodiacs, Beyond Netero, and others embarking on an expedition to this unknown territory.
\`\`\`
`;



// ================================================================================

// Level 2 - Upscaling the details of the story

const topics = [
    "Zoldyck Family Arc: After the exam, Gon and his friends venture to rescue Killua from his family's estate, the Zoldyck family being renowned assassins. This arc delves into Killua's background and the dynamics of the Zoldyck family.",
    "Heavens Arena Arc: Gon and Killua enter the Heavens Arena, a skyscraper where fighters compete in martial arts tournaments. Here, they learn about Nen, a crucial power system in the series, and face various opponents, enhancing their combat skills.",    
    "Yorknew City Arc: Kurapika's quest for revenge against the Phantom Troupe, a notorious group of criminals who massacred his clan, takes center stage. The arc intertwines with Gon and Killua's adventures as they get involved in underground auctions and confrontations with the Troupe.",    
    "Greed Island Arc: Gon and Killua enter the Greed Island game, designed by Ging, to find clues about his whereabouts. They encounter unique challenges and enemies in the game, further developing their Nen abilities.",    
    "Chimera Ant Arc: This dark and complex arc introduces the Chimera Ants, led by the King, Meruem. The ants pose a grave threat to humanity, leading to intense battles and moral dilemmas. The arc is significant for its character development, especially for Gon and Meruem.",    
    "Election Arc: Following the Chimera Ant crisis, the Hunter Association needs a new chairman. The arc focuses on the election process, involving politics and intrigue, and introduces new characters like Pariston Hill and Ging Freecss.",    
    "Dark Continent Expedition Arc: The story expands to explore the Dark Continent, a dangerous and unexplored area. The arc introduces new challenges and mysteries, with the Zodiacs, Beyond Netero, and others embarking on an expedition to this unknown territory.",];

const prompt_level2 = `
Based on the example below complete the topics listed next.

Example for topic "Hunter Exam Arc"
\`\`\`
Hunter Exam Arc: This arc introduces the main characters, including Gon Freecss, who seeks to become a Hunter to find his father, Ging. He befriends Leorio, Kurapika, and Killua during the rigorous Hunter Examination. The arc showcases various challenges that test the candidates' abilities, intelligence, and morals.
* [Protagonist] Introduces Gon a boy looking for his father and understanding what it means to be a hunter because his father is one
* [Main character] Introduces Kurapika a revengeful character that wants to kill the Phantom Troupe because they killed his clan
* [Main character] Introduces Leorio a doctor aspired to be a hunter to make money
* [Main character] Introduces Kilua a boy that was raised as an assassin and wants to be a hunter to be free from his family
* [Antagonist characters] Introduces Hisoka a mysterious and shady man, with a cruel and sadistic personality, that is a hunter and wants to fight strong opponents and kill them after they reach their full potential
* Demonstrate the power of the characters and the world, and the power of the hunters
* Demonstrate the power of the examiners
* Demonstrates the personalities of the characters when interacting between themselves and with other characters (allies and foes)
* Each character has a different personality and different goals and motivations for being a hunter
* Each character has a personality that allows to create interesting interactions between them. by conflicting morals or common interests.
\`\`\`

Now complete the topics:

\`\`\`
${topics.join('\n')}
\`\`\`
`;