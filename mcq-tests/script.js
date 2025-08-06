// Import questions
import { getAllQuestions, getQuestionsByTopic } from './mcqs/data-structures/index.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const topicSelect = document.getElementById('topic-select');
    
    // Available topics
    const topics = [
        { id: 'all', name: 'All Topics' },
        { id: 'stacks', name: 'Stacks' },
        { id: 'queues', name: 'Queues' },
        { id: 'priority-queues', name: 'Priority Queues' }
    ];
    
    // Current quiz questions
    let questions = [];
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const timeEl = document.getElementById('time');
    const scoreEl = document.getElementById('score');
    const correctAnswersEl = document.getElementById('correct-answers');
    const wrongAnswersEl = document.getElementById('wrong-answers');
    const unattemptedEl = document.getElementById('unattempted');
    const reviewContainer = document.getElementById('review-container');

    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = Array(questions.length).fill(null);
    let score = 0;
    let timer;
    let timeLeft = 30 * 60; // 30 minutes in seconds

    // Initialize the quiz
    function initQuiz() {
        // Populate topic select
        topicSelect.innerHTML = '';
        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic.id;
            option.textContent = topic.name;
            topicSelect.appendChild(option);
        });
        
        // Set default questions (all topics)
        questions = getAllQuestions();
        totalQuestionsEl.textContent = questions.length;
        showScreen('start');
        
        // Prevent context menu (right-click)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Prevent keyboard shortcuts (Ctrl+C, Ctrl+A, etc.)
        document.addEventListener('keydown', (e) => {
            // Allow F5, F11, F12, Tab, Escape, and arrow keys
            if ([116, 122, 123, 9, 27, 37, 38, 39, 40].includes(e.keyCode)) {
                return true;
            }
            
            // Allow Alt+Tab
            if (e.altKey && e.keyCode === 9) {
                return true;
            }
            
            // Prevent Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (e.ctrlKey && [65, 67, 73, 74, 86, 88].includes(e.keyCode) || 
                e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) {
                e.preventDefault();
                return false;
            }
        });
    }

    // Toggle fullscreen mode
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    }

    // Show a specific screen
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        if (screen === 'start') {
            startScreen.classList.add('active');
            // Exit fullscreen when returning to start screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        } else if (screen === 'quiz') {
            quizScreen.classList.add('active');
            // Enter fullscreen when starting the quiz
            toggleFullScreen();
            loadQuestion();
            startTimer();
        } else if (screen === 'result') {
            resultScreen.classList.add('active');
            showResults();
        }
    }

    // Load the current question
    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (userAnswers[currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    }

    // Handle option selection
    function selectOption(optionIndex) {
        // Remove selected class from all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        event.target.classList.add('selected');
        
        // Save the answer
        userAnswers[currentQuestionIndex] = optionIndex;
    }

    // Navigation functions
    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    }

    function goToPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    // Timer functions
    function startTimer() {
        updateTimerDisplay();
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Calculate and display results
    function calculateResults() {
        let correct = 0;
        let wrong = 0;
        let unattempted = 0;
        
        userAnswers.forEach((answer, index) => {
            if (answer === null) {
                unattempted++;
            } else if (answer === questions[index].correctAnswer) {
                correct++;
            } else {
                wrong++;
            }
        });
        
        // Calculate score (1 for correct, -0.25 for wrong, 0 for unattempted)
        score = Math.max(0, correct - (wrong * 0.25));
        
        return { correct, wrong, unattempted };
    }

    function showResults() {
        const { correct, wrong, unattempted } = calculateResults();
        
        // Update score display
        scoreEl.textContent = score.toFixed(2);
        correctAnswersEl.textContent = correct;
        wrongAnswersEl.textContent = wrong;
        unattemptedEl.textContent = unattempted;
        
        // Show review of answers
        reviewContainer.innerHTML = '';
        questions.forEach((question, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            const questionEl = document.createElement('div');
            questionEl.className = 'review-question';
            questionEl.textContent = `${index + 1}. ${question.question}`;
            
            const answerEl = document.createElement('div');
            answerEl.className = 'review-answer';
            
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (userAnswer === null) {
                answerEl.innerHTML = `You did not attempt this question.`;
            } else {
                answerEl.innerHTML = `Your answer: ${question.options[userAnswer]}`;
                if (!isCorrect) {
                    answerEl.innerHTML += `<br><span class="review-correct">Correct answer: ${question.options[question.correctAnswer]}</span>`;
                }
            }
            
            const explanationEl = document.createElement('div');
            explanationEl.className = 'review-explanation';
            explanationEl.textContent = question.explanation;
            
            reviewItem.appendChild(questionEl);
            reviewItem.appendChild(answerEl);
            reviewItem.appendChild(explanationEl);
            
            reviewContainer.appendChild(reviewItem);
        });
    }

    // Submit the quiz
    function submitQuiz() {
        clearInterval(timer);
        showScreen('result');
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        // Get selected topic
        const selectedTopic = topicSelect.value;
        
        // Filter questions by topic if not 'all'
        if (selectedTopic === 'all') {
            questions = getAllQuestions();
        } else {
            // Map topic ID to actual topic name
            const topicMap = {
                'stacks': 'Stacks',
                'queues': 'Queues',
                'priority-queues': 'Priority Queues'
            };
            questions = getQuestionsByTopic(topicMap[selectedTopic]);
        }
        
        // Shuffle questions
        questions = shuffleArray(questions);
        
        // Reset quiz state
        currentQuestionIndex = 0;
        userAnswers = Array(questions.length).fill(null);
        timeLeft = 30 * 60; // Reset to 30 minutes
        totalQuestionsEl.textContent = questions.length;
        showScreen('quiz');
    });
    
    // Helper function to shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    
    submitBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to submit the quiz?')) {
            submitQuiz();
        }
    });
    
    restartBtn.addEventListener('click', () => {
        showScreen('start');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (quizScreen.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
                goToPrevQuestion();
            } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
                goToNextQuestion();
            } else if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                if (optionIndex < questions[currentQuestionIndex].options.length) {
                    const options = document.querySelectorAll('.option');
                    if (options[optionIndex]) {
                        options[optionIndex].click();
                    }
                }
            }
        }
    });

    // Initialize the quiz
    initQuiz();
});
