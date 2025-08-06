const stackQuestions = [
    {
        question: "Which of the following is LIFO (Last In First Out) data structure?",
        options: [
            "Queue",
            "Stack",
            "Priority Queue",
            "Linked List"
        ],
        correctAnswer: 1,
        explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed.",
        topic: "Stacks",
        difficulty: "Easy"
    },
    {
        question: "What is the time complexity of push and pop operations in a stack?",
        options: [
            "O(1) for both",
            "O(n) for both",
            "O(1) for push, O(n) for pop",
            "O(n) for push, O(1) for pop"
        ],
        correctAnswer: 0,
        explanation: "Both push and pop operations in a stack take constant time O(1) as they only involve adding or removing the top element.",
        topic: "Stacks",
        difficulty: "Easy"
    },
    {
        question: "Which of the following is NOT a valid application of a stack?",
        options: [
            "Function call management",
            "Undo mechanism in text editors",
            "CPU task scheduling",
            "Balancing symbols in code"
        ],
        correctAnswer: 2,
        explanation: "CPU task scheduling typically uses a queue or priority queue, not a stack. Stacks are used for function calls, undo mechanisms, and balancing symbols.",
        topic: "Stacks",
        difficulty: "Medium"
    },
    {
        question: "What is the minimum number of queues needed to implement a stack?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1,
        explanation: "A stack can be implemented using two queues, where one queue is used to store elements and the other is used as a temporary space for operations.",
        topic: "Stacks",
        difficulty: "Hard"
    },
    {
        question: "Which operation is used to access the top element of a stack without removing it?",
        options: [
            "pop()",
            "push()",
            "peek()",
            "top()"
        ],
        correctAnswer: 3,
        explanation: "The top() operation (or peek() in some implementations) is used to access the top element of the stack without removing it.",
        topic: "Stacks",
        difficulty: "Easy"
    }
];

export default stackQuestions;
