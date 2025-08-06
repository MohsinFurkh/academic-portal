const queueQuestions = [
    {
        question: "Which operation adds an element to the rear of a queue?",
        options: [
            "push()",
            "enqueue()",
            "add()",
            "insert()"
        ],
        correctAnswer: 1,
        explanation: "In a queue, enqueue() is the operation that adds an element to the rear (end) of the queue.",
        topic: "Queues",
        difficulty: "Easy"
    },
    {
        question: "What is the time complexity of enqueue and dequeue operations in a queue?",
        options: [
            "O(1) for both",
            "O(n) for both",
            "O(1) for enqueue, O(n) for dequeue",
            "O(n) for enqueue, O(1) for dequeue"
        ],
        correctAnswer: 0,
        explanation: "In a properly implemented queue, both enqueue (adding to rear) and dequeue (removing from front) operations take constant time O(1).",
        topic: "Queues",
        difficulty: "Easy"
    },
    {
        question: "Which data structure would be most appropriate for implementing a printer queue?",
        options: [
            "Stack",
            "Queue",
            "Priority Queue",
            "Hash Table"
        ],
        correctAnswer: 1,
        explanation: "A queue is ideal for a printer queue as it follows FIFO (First In First Out) order, ensuring documents are printed in the order they are received.",
        topic: "Queues",
        difficulty: "Easy"
    },
    {
        question: "What is the main advantage of a circular queue over a linear queue?",
        options: [
            "Faster enqueue operations",
            "Better memory utilization",
            "Supports random access",
            "No size limitation"
        ],
        correctAnswer: 1,
        explanation: "A circular queue provides better memory utilization as it reuses the empty spaces created after dequeue operations, which would be wasted in a linear queue implementation.",
        topic: "Queues",
        difficulty: "Medium"
    },
    {
        question: "Which of the following operations is NOT typically supported by a double-ended queue (deque)?",
        options: [
            "push_front()",
            "pop_back()",
            "peek_middle()",
            "insert_at()"
        ],
        correctAnswer: 3,
        explanation: "insert_at() is not a standard operation for a deque. Standard deque operations include adding/removing from both ends (push_front, pop_front, push_back, pop_back) and sometimes peeking at the front or back.",
        topic: "Queues",
        difficulty: "Medium"
    }
];

export default queueQuestions;
