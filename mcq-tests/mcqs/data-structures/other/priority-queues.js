const priorityQueueQuestions = [
    {
        question: "In a priority queue, which element is removed first?",
        options: [
            "The first element added",
            "The last element added",
            "The element with highest priority",
            "A random element"
        ],
        correctAnswer: 2,
        explanation: "In a priority queue, elements are removed based on their priority, with the highest priority element being removed first, regardless of insertion order.",
        topic: "Priority Queues",
        difficulty: "Easy"
    },
    {
        question: "What is the time complexity of inserting an element into a binary heap (used to implement priority queue)?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        correctAnswer: 1,
        explanation: "Inserting an element into a binary heap takes O(log n) time in the worst case, as it may need to bubble up the element to maintain the heap property.",
        topic: "Priority Queues",
        difficulty: "Medium"
    },
    {
        question: "Which of the following is NOT a property of a priority queue?",
        options: [
            "Elements have associated priorities",
            "Element with highest priority is removed first",
            "Elements are processed in FIFO order",
            "Multiple elements can have the same priority"
        ],
        correctAnswer: 2,
        explanation: "Priority queues do not process elements in FIFO order. Elements are processed based on their priority, with the highest priority element being removed first.",
        topic: "Priority Queues",
        difficulty: "Easy"
    },
    {
        question: "What is the time complexity of finding the minimum element in a min-heap?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        correctAnswer: 0,
        explanation: "In a min-heap, the minimum element is always at the root, so finding it takes constant time O(1).",
        topic: "Priority Queues",
        difficulty: "Medium"
    },
    {
        question: "Which data structure is typically used to implement a priority queue?",
        options: [
            "Array",
            "Linked List",
            "Heap",
            "Hash Table"
        ],
        correctAnswer: 2,
        explanation: "Priority queues are typically implemented using a heap data structure (either min-heap or max-heap) as it provides efficient operations for insertion and extraction of the highest priority element.",
        topic: "Priority Queues",
        difficulty: "Easy"
    }
];

export default priorityQueueQuestions;
