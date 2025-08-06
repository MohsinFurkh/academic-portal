// Questions for Data Structures - Stacks
export const stacksQuestions = [
    {
        id: 1,
        question: "What is the principle by which a Stack operates?",
        options: [
            "First In First Out (FIFO)",
            "Last In First Out (LIFO)",
            "First In Last Out (FILO)",
            "Last In Last Out (LILO)"
        ],
        correctAnswer: 1, // Index of the correct answer (0-based)
        explanation: "Stacks follow the Last In First Out (LIFO) principle, meaning the last element added to the stack will be the first one to be removed.",
        difficulty: "easy",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 2,
        question: "Which of the following is NOT a basic operation of a Stack?",
        options: [
            "push()",
            "pop()",
            "peek()",
            "enqueue()"
        ],
        correctAnswer: 3,
        explanation: "enqueue() is an operation of a Queue, not a Stack. The basic operations of a Stack are push(), pop(), and peek().",
        difficulty: "easy",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 3,
        question: "What is the time complexity of push and pop operations in a Stack implemented using an array?",
        options: [
            "O(n) for both",
            "O(1) for push, O(n) for pop",
            "O(1) for both",
            "O(n) for push, O(1) for pop"
        ],
        correctAnswer: 2,
        explanation: "Both push and pop operations in a Stack implemented using an array have O(1) time complexity as they only operate on the top element.",
        difficulty: "medium",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 4,
        question: "Which of the following applications typically uses a Stack data structure?",
        options: [
            "CPU Scheduling",
            "Function Call Management",
            "Print Queue",
            "Breadth-First Search"
        ],
        correctAnswer: 1,
        explanation: "Function Call Management in programming languages uses Stack data structure to manage function calls and their execution context.",
        difficulty: "easy",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 5,
        question: "What is the result of the following operations on an initially empty stack? push(5), push(3), pop(), push(2), push(8), pop(), pop(), push(9)",
        options: [
            "[5, 9]",
            "[9, 2, 8]",
            "[5, 9, 2]",
            "[5, 3, 8]"
        ],
        correctAnswer: 0,
        explanation: "The operations result in the following stack state: push(5) → [5], push(3) → [5,3], pop() → [5], push(2) → [5,2], push(8) → [5,2,8], pop() → [5,2], pop() → [5], push(9) → [5,9]",
        difficulty: "hard",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 6,
        question: "Which data structure is typically used to implement recursion?",
        options: [
            "Queue",
            "Linked List",
            "Stack",
            "Tree"
        ],
        correctAnswer: 2,
        explanation: "Recursion uses the call stack, which is a Stack data structure, to keep track of function calls and their execution context.",
        difficulty: "medium",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 7,
        question: "What is the minimum number of stacks needed to implement a queue?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1,
        explanation: "A queue can be implemented using two stacks. One stack is used for enqueue operation and the other for dequeue operation.",
        difficulty: "hard",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 8,
        question: "Which of the following is a valid sequence of stack operations?",
        options: [
            "push(1), push(2), pop(), pop(), pop()",
            "push(1), pop(), push(2), pop(), pop()",
            "push(1), push(2), push(3), pop(), pop(), pop()",
            "pop(), push(1), pop(), push(2), pop()"
        ],
        correctAnswer: 2,
        explanation: "This is the only sequence where we never try to pop from an empty stack, which would cause an underflow error.",
        difficulty: "medium",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 9,
        question: "What is the main advantage of using a linked list implementation of a stack over an array implementation?",
        options: [
            "Faster access to elements",
            "No need to know the size in advance",
            "Better cache performance",
            "More efficient memory usage"
        ],
        correctAnswer: 1,
        explanation: "The main advantage of using a linked list to implement a stack is that it can grow and shrink dynamically, so we don't need to know or specify the maximum size in advance.",
        difficulty: "medium",
        topic: "stacks",
        subject: "data-structures"
    },
    {
        id: 10,
        question: "Which of the following problems can be efficiently solved using a stack?",
        options: [
            "Finding the shortest path in a graph",
            "Balanced parentheses checking",
            "Sorting a list of numbers",
            "Finding the median of a stream of numbers"
        ],
        correctAnswer: 1,
        explanation: "A stack is commonly used to check for balanced parentheses by pushing opening brackets onto the stack and popping them when a matching closing bracket is encountered.",
        difficulty: "easy",
        topic: "stacks",
        subject: "data-structures"
    }
];

// Questions for Data Structures - Queues
export const queuesQuestions = [
    // Add queue questions here
];

// Questions for Data Structures - Priority Queues
export const priorityQueuesQuestions = [
    // Add priority queue questions here
];

// Questions for Algorithms - Binary Search
export const binarySearchQuestions = [
    // Add binary search questions here
];

// Questions for Algorithms - Quick Sort
export const quickSortQuestions = [
    // Add quick sort questions here
];

// Export all questions in a single object
export default {
    'data-structures': {
        'stacks': stacksQuestions,
        'queues': queuesQuestions,
        'priority-queues': priorityQueuesQuestions
    },
    'algorithms': {
        'binary-search': binarySearchQuestions,
        'quick-sort': quickSortQuestions
    }
};
