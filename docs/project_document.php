
Visual Novel Maker Powered by ChatGPT-4

Descrição Geral do Aplicativo:
    O "Visual Novel Maker powered by ChatGPT-4" é um aplicativo de criação de histórias interativas onde o protagonista é o próprio usuário. O aplicativo é projetado para entender progressivamente:
        Preferências e Aversões: Aprende o que o usuário gosta e desgosta ao longo da experiência.
        Histórico de Ações: Registra as atividades passadas do usuário e as ações ainda não realizadas.
        Desejos e Necessidades: Identifica as necessidades e desejos do usuário para moldar a narrativa adequadamente.
        Evita Criação de Mary Sue: Cuida para não criar uma narrativa onde o protagonista é perfeito e sem desafios reais.

    Funcionalidades Principais:
        Memória e Continuidade:
            Registro de Personagens: Mantém uma lista de personagens que aparecem na história.
            Registro de Locais: Recorda os locais visitados ou mencionados anteriormente.
            Registro de Eventos Passados: Armazena eventos importantes que ocorreram na narrativa para garantir a continuidade.
            Geração Dinâmica de Conteúdo:

        Controle de Temperatura Narrativa: Usa um parâmetro de "temperatura" para dosar a introdução de novos eventos, assegurando que a história permaneça emocionante sem ser previsível ou monótona.
            Introdução de Elementos Conexos: Insere elementos na história que estão relacionados com eventos, personagens ou locais passados, visando desenvolver um novo clímax de forma orgânica.

        Mecânica de Decisão Baseada em Dados:
            Rolagem de Dados: 
                Ao tomar uma decisão, a ação do usuário é dividida em partes significativas, e um dado de 20 faces (d20) é rolado para determinar o resultado de cada parte.
            Desenvolvimento da História Baseado em Resultados:
                A narrativa é ajustada com base nos resultados dos dados, garantindo que os desenvolvimentos sejam tanto significativos quanto surpreendentes.

    Objetivo do Sistema
        Gerar Narrativas Coerentes e Cativantes: 
            Assegurar que as histórias geradas sejam consistentes e interessantes, mantendo o engajamento do usuário ao longo do tempo.

    Esta estrutura oferece ao usuário uma experiência de narrativa personalizada e envolvente, permitindo que ele influencie diretamente o curso da história enquanto o sistema garante que todas as peças se encaixem de maneira lógica e emocionante.


User Stories:
    MVC
        Epic: Story Creation
            As a user, I want to start a new story so that I can enjoy a fresh and personalized narrative journey.
            As a user, I want to choose different genres and themes for my stories to suit my mood and preferences.
            As a user, I want to input key character traits and backgrounds to see characters that reflect my choices.

        Epic: Interactive Storytelling
            As a user, I want the app to remember my past choices to ensure continuity and a coherent storyline.
            As a user, I want to make decisions at key story points to influence the narrative direction and outcomes.
            As a user, I want the app to introduce unexpected but related plot twists based on my past actions to keep the story engaging.
            As a user, I want to see the consequences of my actions reflected in future interactions and events to feel the impact of my choices.
        
        Epic: User Experience and Feedback
            As a user, I want to be able to save my progress in the story to continue from where I left off.
            As a user, I want to be able to provide feedback on stories to help improve future narratives.
            As a user, I want to adjust the "temperature" settings of the story to control the pace and intensity of dramatic developments.

    Extra
        Epic: Personalization
            As a user, I want to customize the appearance of the text and background in the app to suit my visual preferences for a more comfortable reading experience.

        Epic: Account Management
            As a new user, I want to be able to create an account so that I can save my stories and settings.
            As a returning user, I want to log in to my account to resume my stories and access my saved data.
            As a user, I want to be able to reset my password in case I forget it to regain access to my account.
            As a user, I want to update my profile settings to customize my narrative experience based on my preferences.

        Epic: Community and Sharing
            As a user, I want to share my story outcomes with friends or on social media to discuss and compare different paths and endings.
            As a user, I want to participate in community challenges where I can write parts of a story collaboratively with others.
-----------------

The user can interact with a specific chat gpt that is like the (wizard) helper on building the story.
After talking to it, the user can make it generate new pieces of story and modify currently existing blocks.

