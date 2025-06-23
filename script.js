document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const prevQuestionBtn = document.getElementById('prev-question-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    const welcomeScreen = document.getElementById('welcome-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultsScreen = document.getElementById('results-screen');

    const questionNumberDisplay = document.getElementById('question-number');
    const totalQuestionsDisplay = document.getElementById('total-questions-display');
    const questionsRemainingDisplay = document.getElementById('questions-remaining');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackText = document.getElementById('feedback');
    const scoreSpan = document.getElementById('score');
    const errorsSpan = document.getElementById('errors');
    const totalQuestionsResults = document.getElementById('total-questions-results');
    const resultsList = document.getElementById('results-list');

    let currentQuestionIndex = 0;
    let userResponses = []; // Stores { userAnswer: string, isCorrect: boolean, answered: boolean }

    // Array de questões baseadas no PDF "DIREITOS_HUMANOS.pdf"
    const questions = [
        {
            question: "Qual a definição de Direitos Humanos, de acordo com o material?",
            options: [
                "Direitos inerentes a cidadãos de países democráticos.",
                "Direitos básicos e liberdades que garantem a dignidade e o valor de cada indivíduo, inerentes a todos os seres humanos, independentemente de raça, sexo, nacionalidade, etnia, idioma, religião ou qualquer outra condição.",
                "Direitos que são concedidos pelo Estado conforme a necessidade.",
                "Direitos aplicáveis somente em situações de guerra ou conflito."
            ],
            correctAnswer: "Direitos básicos e liberdades que garantem a dignidade e o valor de cada indivíduo, inerentes a todos os seres humanos, independentemente de raça, sexo, nacionalidade, etnia, idioma, religião ou qualquer outra condição.",
            source: "Página 3, Conceito de Direitos Humanos "
        },
        {
            question: "Uma das características dos Direitos Humanos é serem 'Inalienáveis'. O que isso significa?",
            options: [
                "Que podem ser retirados ou renunciados em certas condições.",
                "Que pertencem a todos os seres humanos em qualquer lugar do mundo.",
                "Que não podem ser tirados ou renunciados.",
                "Que estão ligados entre si e se reforçam mutuamente."
            ],
            correctAnswer: "Que não podem ser tirados ou renunciados.",
            source: "Página 4, Características dos Direitos Humanos "
        },
        {
            question: "Qual a principal importância dos Direitos Humanos para a sociedade, segundo o material?",
            options: [
                "Garantir a supremacia de um grupo sobre outro.",
                "Impedir a manifestação de pensamentos diferentes.",
                "Proteger a dignidade humana, promover a paz e a justiça, e ser a base para uma sociedade justa e equitativa.",
                "Estabelecer regras rígidas de hierarquia social."
            ],
            correctAnswer: "Proteger a dignidade humana, promover a paz e a justiça, e ser a base para uma sociedade justa e equitativa.",
            source: "Página 5, Importância "
        },
        {
            question: "Em quais antigas civilizações as primeiras noções de direitos individuais podem ser encontradas, com os romanos desenvolvendo um complexo sistema jurídico?",
            options: [
                "Egípcia e Suméria",
                "Grega e Babilônica",
                "Chinesa e Indiana",
                "Grega e Romana"
            ],
            correctAnswer: "Grega e Romana",
            source: "Página 6, As Raízes na Antiguidade "
        },
        {
            question: "No período do Iluminismo, quais filósofos desenvolveram teorias sobre o estado de natureza, o contrato social e os direitos inalienáveis do homem?",
            options: [
                "Platão e Aristóteles",
                "Maquiavel e Bodin",
                "Locke, Rousseau e Montesquieu",
                "Sócrates e Epicuro"
            ],
            correctAnswer: "Locke, Rousseau e Montesquieu",
            source: "Página 8, O Iluminismo "
        },
        {
            question: "Qual documento fundamental foi adotado pela ONU em 1948, no rescaldo da Segunda Guerra Mundial e do Holocausto, para proteger a dignidade e os direitos inerentes a cada pessoa?",
            options: [
                "Convenção de Genebra",
                "Carta das Nações Unidas",
                "Declaração Universal dos Direitos Humanos (DUDH)",
                "Tratado de Versalhes"
            ],
            correctAnswer: "Declaração Universal dos Direitos Humanos (DUDH)",
            source: "Página 9, A Declaração Universal dos Direitos Humanos; Página 47, Histórico e Contexto "
        },
        {
            question: "O conceito de direitos humanos apresenta 'paradoxos'. O que é um paradoxo em termos simples, de acordo com o material?",
            options: [
                "Uma situação simples e facilmente solucionável.",
                "Uma situação que parece contraditória ou absurda, mas que, ao mesmo tempo, contém uma certa verdade.",
                "Um conceito ultrapassado na sociedade contemporânea.",
                "Um sinônimo para ausência de regras."
            ],
            correctAnswer: "Uma situação que parece contraditória ou absurda, mas que, ao mesmo tempo, contém uma certa verdade.",
            source: "Página 10, Paradoxos "
        },
        {
            question: "Qual paradoxo ocorre quando os direitos individuais, como a liberdade de expressão, podem ser limitados em nome de interesses coletivos, como a segurança nacional?",
            options: [
                "Universalidade x Relativismo",
                "Teoria x Prática",
                "Individual x Coletivo",
                "Direitos Negativos x Direitos Positivos"
            ],
            correctAnswer: "Individual x Coletivo",
            source: "Página 11, Paradoxos - Individual x Coletivo "
        },
        {
            question: "Direitos que exigem uma *ação* do Estado (ex: direito à saúde) são classificados como:",
            options: [
                "Direitos Negativos",
                "Direitos Civis",
                "Direitos Positivos",
                "Direitos Inalienáveis"
            ],
            correctAnswer: "Direitos Positivos",
            source: "Página 12, Paradoxos - Direitos Negativos x Direitos Positivos "
        },
        {
            question: "Qual a solução proposta para os paradoxos que envolve a promoção de uma cultura de respeito e tolerância?",
            options: [
                "Fortalecimento das instituições",
                "Cooperação internacional",
                "Educação",
                "Adoção de um único sistema jurídico global"
            ],
            correctAnswer: "Educação",
            source: "Página 14, Possíveis soluções aos paradoxos - Educação "
        },
        {
            question: "No debate 'Universalismo x Culturalismo', o que o relativismo cultural defende?",
            options: [
                "Que os direitos humanos são iguais para todos, independentemente da cultura.",
                "Que o conteúdo dos direitos humanos está relacionado ao sistema político, econômico, cultural, social e moral de uma sociedade.",
                "Que existe um padrão universal de direitos humanos aplicável a todos.",
                "Que a Declaração Universal dos Direitos Humanos é o único guia válido."
            ],
            correctAnswer: "Que o conteúdo dos direitos humanos está relacionado ao sistema político, econômico, cultural, social e moral de uma sociedade.",
            source: "Página 15, Universalismo x Culturalismo "
        },
        {
            question: "Qual a diferença principal entre Direitos Humanos e Direitos Fundamentais, segundo o material?",
            options: [
                "Direitos Humanos são apenas históricos, Direitos Fundamentais são atuais.",
                "Direitos Humanos são normas internacionais, enquanto Direitos Fundamentais são normas constitucionais.",
                "Direitos Humanos são baseados em leis, Direitos Fundamentais em costumes.",
                "Não há diferença, são termos sinônimos."
            ],
            correctAnswer: "Direitos Humanos são normas internacionais, enquanto Direitos Fundamentais são normas constitucionais.",
            source: "Página 18, Direitos Humanos x Direitos Fundamentais "
        },
        {
            question: "Os Direitos Civis e Políticos, como o direito à vida, à liberdade e à igualdade, pertencem a qual 'Geração' dos Direitos Humanos?",
            options: [
                "Primeira geração",
                "Segunda geração",
                "Terceira geração",
                "Quarta geração"
            ],
            correctAnswer: "Primeira geração",
            source: "Página 19, Gerações - Primeira geração "
        },
        {
            question: "Qual o principal órgão do governo federal brasileiro responsável pela formulação, coordenação e execução de políticas públicas na área de direitos humanos?",
            options: [
                "Conselho Nacional de Justiça (CNJ)",
                "Ministério Público Federal (MPF)",
                "Ministério dos Direitos Humanos e da Cidadania (MDHC)",
                "Defensoria Pública da União (DPU)"
            ],
            correctAnswer: "Ministério dos Direitos Humanos e da Cidadania (MDHC)",
            source: "Página 88, Direitos Humanos no Brasil - Órgãos Governamentais "
        },
        {
            question: "A Carta das Nações Unidas, assinada em São Francisco em 1945, estabelece quais dos seguintes propósitos da ONU?",
            options: [
                "Apenas a manutenção da paz e segurança internacional.",
                "Desenvolver relações amistosas entre nações e resolver problemas econômicos, sociais, culturais ou humanitários, e promover o respeito aos direitos humanos.",
                "Apenas a cooperação militar entre os países-membros.",
                "A formação de blocos econômicos regionais."
            ],
            correctAnswer: "Desenvolver relações amistosas entre nações e resolver problemas econômicos, sociais, culturais ou humanitários, e promover o respeito aos direitos humanos.",
            source: "Página 42, Principais Objetivos da Carta das Nações Unidas "
        },
        {
            question: "Qual a relação entre a Declaração Universal dos Direitos Humanos (DUDH) e os Pactos de Nova Iorque?",
            options: [
                "A DUDH é um tratado vinculante, enquanto os Pactos são apenas resoluções.",
                "A DUDH e os Pactos são documentos distintos e não relacionados.",
                "Os Pactos de Nova Iorque complementam a DUDH, sendo tratados que criam obrigações jurídicas para os Estados que os ratificam.",
                "Os Pactos de Nova Iorque foram a base para a criação da DUDH."
            ],
            correctAnswer: "Os Pactos de Nova Iorque complementam a DUDH, sendo tratados que criam obrigações jurídicas para os Estados que os ratificam.",
            source: "Página 46, Importância dos Pactos de Nova Iorque "
        },
        {
            question: "O Estatuto de Roma estabeleceu qual tribunal para julgar indivíduos acusados dos crimes mais graves de interesse da comunidade internacional?",
            options: [
                "Corte Internacional de Justiça (CIJ)",
                "Tribunal Internacional de Haia",
                "Tribunal Penal Internacional (TPI)",
                "Corte Europeia de Direitos Humanos (TEDH)"
            ],
            correctAnswer: "Tribunal Penal Internacional (TPI)",
            source: "Página 56, Estatuto de Roma e o Tribunal Penal Internacional - Criação do TPI "
        },
        {
            question: "Qual dos seguintes crimes NÃO está sob a jurisdição do Tribunal Penal Internacional (TPI)?",
            options: [
                "Crimes de Guerra",
                "Crimes de Trânsito",
                "Genocídio",
                "Crimes contra a Humanidade"
            ],
            correctAnswer: "Crimes de Trânsito",
            source: "Página 56, Estatuto de Roma e o Tribunal Penal Internacional - Crimes de Jurisdição "
        },
        {
            question: "Qual o princípio do TPI que estabelece que ele atua somente quando os tribunais nacionais não podem ou não querem investigar ou julgar os crimes de sua competência?",
            options: [
                "Princípio da Soberania",
                "Princípio da Subsidiariedade",
                "Princípio da Complementaridade",
                "Princípio da Universalidade"
            ],
            correctAnswer: "Princípio da Complementaridade",
            source: "Página 57, Princípio da Complementaridade "
        },
        {
            question: "Qual sistema regional de proteção dos Direitos Humanos é considerado o mais antigo e robusto, permitindo que indivíduos e ONGs apresentem queixas diretamente ao seu Tribunal após esgotarem os recursos internos?",
            options: [
                "Sistema Africano de Direitos Humanos",
                "Sistema Asiático de Direitos Humanos",
                "Sistema Europeu de Direitos Humanos",
                "Sistema Interamericano de Direitos Humanos"
            ],
            correctAnswer: "Sistema Europeu de Direitos Humanos",
            source: "Página 62, Sistema Europeu de Direitos Humanos - Características"
        },
        {
            question: "O Tribunal Europeu de Direitos Humanos (TEDH) tem sua sede em qual cidade?",
            options: [
                "Bruxelas, Bélgica",
                "Genebra, Suíça",
                "Estrasburgo, França",
                "Haia, Holanda"
            ],
            correctAnswer: "Estrasburgo, França",
            source: "Página 63, Tribunal Europeu de Direitos Humanos (TEDH) "
        },
        {
            question: "Qual a principal característica do Sistema Africano de Proteção dos Direitos Humanos, diferentemente do sistema universal, em relação aos direitos?",
            options: [
                "Ênfase exclusiva nos direitos civis e políticos.",
                "Forte ênfase nos direitos dos povos e no dever dos indivíduos para com a comunidade.",
                "Foco apenas na resolução de conflitos entre estados.",
                "Desconsideração dos direitos econômicos e sociais."
            ],
            correctAnswer: "Forte ênfase nos direitos dos povos e no dever dos indivíduos para com a comunidade.",
            source: "Página 69, Sistema Africano de Direitos Humanos - Enfoque Comunitário "
        },
        {
            question: "Por que o sistema asiático de proteção dos Direitos Humanos NÃO possui um tribunal regional formal, como o europeu ou interamericano?",
            options: [
                "Por falta de interesse dos países asiáticos na proteção de direitos humanos.",
                "Devido ao foco exclusivo em mecanismos de diálogo.",
                "Devido à diversidade cultural e política da Ásia e a priorização de outros valores, além de dinâmicas de poder e foco na cooperação internacional.",
                "Porque todos os seus países já são signatários do TPI."
            ],
            correctAnswer: "Devido à diversidade cultural e política da Ásia e a priorização de outros valores, além de dinâmicas de poder e foco na cooperação internacional.",
            source: "Página 77, Contexto Cultural e Político "
        },
        {
            question: "Qual o nome oficial do Pacto de San José da Costa Rica, que é um tratado internacional fundamental para a proteção e promoção dos direitos humanos nas Américas?",
            options: [
                "Convenção Americana sobre Direitos Civis",
                "Carta Interamericana de Direitos Fundamentais",
                "Convenção Americana sobre Direitos Humanos (CADH)",
                "Protocolo de San Salvador"
            ],
            correctAnswer: "Convenção Americana sobre Direitos Humanos (CADH)",
            source: "Página 79, Pacto de San José da Costa Rica "
        },
        {
            question: "Qual caso da Corte Interamericana de Direitos Humanos condenou o Brasil pela demora na demarcação e homologação das terras do Povo Xucuru em Pernambuco?",
            options: [
                "Caso Barrios Altos vs. Peru",
                "Caso Gomes Lund e Outros vs. Brasil",
                "Caso Povo Indígena Xucuru e seus membros vs. Brasil",
                "Caso Damião Ximenes Lopes vs. Brasil"
            ],
            correctAnswer: "Caso Povo Indígena Xucuru e seus membros vs. Brasil",
            source: "Página 86, Direitos dos Povos Indígenas "
        },
        {
            question: "Qual órgão governamental brasileiro é responsável por receber e encaminhar denúncias de violações de direitos humanos, operando o Disque 100 e o Ligue 180?",
            options: [
                "Ministério Público",
                "Defensoria Pública",
                "Ouvidoria Nacional de Direitos Humanos (ONDH)",
                "Conselho Nacional de Direitos Humanos (CNDH)"
            ],
            correctAnswer: "Ouvidoria Nacional de Direitos Humanos (ONDH)",
            source: "Página 88, Direitos Humanos no Brasil - Ouvidoria Nacional de Direitos Humanos (ONDH) "
        }
    ];

    function showScreen(screen) {
        welcomeScreen.style.display = 'none';
        questionScreen.style.display = 'none';
        resultsScreen.style.display = 'none';
        screen.style.display = 'block';
    }

    function initializeQuiz() {
        userResponses = questions.map(() => ({
            userAnswer: null,
            isCorrect: null,
            answered: false,
            userSelectedOptionIndex: null // To remember user's selected option if they navigate back
        }));
        currentQuestionIndex = 0;
        showScreen(questionScreen);
        loadQuestion(currentQuestionIndex);
    }

    function updateNavigationButtons() {
        prevQuestionBtn.style.display = (currentQuestionIndex > 0) ? 'inline-block' : 'none';

        if (currentQuestionIndex === questions.length - 1) { // If it's the last question
            if (userResponses[currentQuestionIndex].answered) { // And it's already answered
                nextQuestionBtn.textContent = 'Ver Resultados';
                nextQuestionBtn.style.display = 'inline-block';
            } else { // If it's the last and NOT answered
                nextQuestionBtn.style.display = 'none';
            }
        } else { // If it's not the last question
            if (userResponses[currentQuestionIndex].answered) { // And the current question is answered
                 nextQuestionBtn.textContent = 'Próximo';
                 nextQuestionBtn.style.display = 'inline-block';
            } else { // If it's not the last and not yet answered
                nextQuestionBtn.style.display = 'none';
            }
        }
    }

    function updateQuestionCounter() {
        questionNumberDisplay.textContent = `Questão ${currentQuestionIndex + 1}`;
        totalQuestionsDisplay.textContent = questions.length;
        const remaining = questions.length - (currentQuestionIndex + 1);
        questionsRemainingDisplay.textContent = `${remaining} ${remaining === 1 ? 'questão' : 'questões'}`;
    }

    function loadQuestion(index) {
        if (index < 0 || index >= questions.length) {
            if (currentQuestionIndex === questions.length && userResponses.every(r => r.answered)) {
                showResults();
            }
            return;
        }

        currentQuestionIndex = index;
        updateQuestionCounter();
        feedbackText.textContent = '';
        feedbackText.classList.remove('correct', 'incorrect');

        const q = questions[currentQuestionIndex];
        const responseState = userResponses[currentQuestionIndex];

        questionText.textContent = q.question;
        optionsContainer.innerHTML = '';

        // Shuffle options only if the question hasn't been answered, otherwise use original order
        const optionsToDisplay = responseState.answered ? q.options : [...q.options].sort(() => Math.random() - 0.5);

        optionsToDisplay.forEach((optionText, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = optionText;
            optionDiv.dataset.optionValue = optionText;
            optionDiv.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionDiv);

            if (responseState.answered) {
                optionDiv.removeEventListener('click', selectOption);
                optionDiv.style.pointerEvents = 'none';

                if (optionText === responseState.userAnswer) {
                    optionDiv.classList.add('selected');
                    if (responseState.isCorrect) {
                        optionDiv.classList.add('correct');
                    } else {
                        optionDiv.classList.add('incorrect');
                    }
                } else if (optionText === q.correctAnswer) {
                    optionDiv.classList.add('correct');
                }
            }
        });

        if (responseState.answered) {
            submitAnswerBtn.style.display = 'none';
            feedbackText.textContent = responseState.isCorrect ? "Correto!" : `Incorreto. A resposta correta era: "${q.correctAnswer}".`;
            feedbackText.classList.add(responseState.isCorrect ? 'correct' : 'incorrect');
        } else {
            submitAnswerBtn.style.display = 'block';
            submitAnswerBtn.disabled = true;
            submitAnswerBtn.style.backgroundColor = '#cccccc';
        }

        updateNavigationButtons();
    }

    function selectOption(event) {
        const selected = document.querySelector('.option.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
        event.target.classList.add('selected');
        submitAnswerBtn.disabled = false;
        submitAnswerBtn.style.backgroundColor = '#007bff';
    }

    function submitAnswer() {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            feedbackText.textContent = "Por favor, selecione uma resposta.";
            feedbackText.classList.remove('correct', 'incorrect');
            return;
        }

        const userAnswer = selectedOption.textContent;
        const q = questions[currentQuestionIndex];
        const isCorrect = (userAnswer === q.correctAnswer);

        userResponses[currentQuestionIndex].userAnswer = userAnswer;
        userResponses[currentQuestionIndex].isCorrect = isCorrect;
        userResponses[currentQuestionIndex].answered = true;
        userResponses[currentQuestionIndex].userSelectedOptionIndex = Array.from(optionsContainer.children).indexOf(selectedOption);

        if (isCorrect) {
            feedbackText.textContent = "Correto!";
            feedbackText.classList.add('correct');
            feedbackText.classList.remove('incorrect');
            selectedOption.classList.add('correct');
        } else {
            feedbackText.textContent = `Incorreto. A resposta correta era: "${q.correctAnswer}".`;
            feedbackText.classList.add('incorrect');
            feedbackText.classList.remove('correct');
            selectedOption.classList.add('incorrect');
            Array.from(optionsContainer.children).forEach(option => {
                if (option.textContent === q.correctAnswer) {
                    option.classList.add('correct');
                }
            });
        }

        Array.from(optionsContainer.children).forEach(option => {
            option.removeEventListener('click', selectOption);
            option.style.pointerEvents = 'none';
        });
        submitAnswerBtn.style.display = 'none';

        updateNavigationButtons();
    }

    function goToPrevQuestion() {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        } else {
            if (userResponses[currentQuestionIndex].answered || userResponses.every(r => r.answered)) {
                showResults();
            }
        }
    }

    function showResults() {
        showScreen(resultsScreen);
        const correctAnswers = userResponses.filter(r => r.isCorrect === true).length;
        const incorrectAnswers = userResponses.filter(r => r.isCorrect === false).length;
        const notAnswered = userResponses.filter(r => r.answered === false).length;

        scoreSpan.textContent = correctAnswers;
        errorsSpan.textContent = incorrectAnswers + notAnswered; // Contabiliza não respondidas como erros para o total
        totalQuestionsResults.textContent = questions.length;
        resultsList.innerHTML = '';

        userResponses.forEach((answer, index) => {
            const listItem = document.createElement('li');
            const questionData = questions[index];
            const isAnswered = answer.answered;
            const userAnswerText = isAnswered ? answer.userAnswer : "Não respondido";

            let resultClass = '';
            if (isAnswered) {
                resultClass = answer.isCorrect ? 'correct' : 'incorrect';
            } else {
                resultClass = 'not-answered'; // Nova classe para não respondidas, se quiser estilizar
            }

            listItem.innerHTML = `
                <strong>Questão ${index + 1}:</strong> ${questionData.question} <br>
                Sua resposta: <span class="${resultClass}">${userAnswerText}</span><br>
                Resposta correta: <span class="correct">${questionData.correctAnswer}</span>
                <p class="source-info">Fonte: ${questionData.source}</p>
            `;
            resultsList.appendChild(listItem);
        });
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        userResponses = [];
        initializeQuiz();
    }

    startQuizBtn.addEventListener('click', initializeQuiz);
    submitAnswerBtn.addEventListener('click', submitAnswer);
    prevQuestionBtn.addEventListener('click', goToPrevQuestion);
    nextQuestionBtn.addEventListener('click', goToNextQuestion);
    restartQuizBtn.addEventListener('click', resetQuiz);

    showScreen(welcomeScreen);
});