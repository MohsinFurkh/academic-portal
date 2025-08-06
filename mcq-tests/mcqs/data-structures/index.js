// Import all data structure questions
import stackQuestions from './linear-data-structures/stacks.js';
import queueQuestions from './linear-data-structures/queues.js';
import priorityQueueQuestions from './other/priority-queues.js';

// Combine all questions
const dataStructuresQuestions = [
    ...stackQuestions,
    ...queueQuestions,
    ...priorityQueueQuestions
];

// Function to get questions by topic
export function getQuestionsByTopic(topic) {
    return dataStructuresQuestions.filter(q => q.topic === topic);
}

// Function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty) {
    return dataStructuresQuestions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
}

// Function to get all questions
export function getAllQuestions() {
    return [...dataStructuresQuestions];
}

export default dataStructuresQuestions;
