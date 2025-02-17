const dataBase = [
    {
        _id: 1,
        name: 'adam',
        birth_date: '09.05.2019',
        tasks: [
            {
                _id: 1,
                task_name: 'brush teeth',
                isDone: false,
                isReccuring: false,
            },
        ],
        upcoming_events: [
            {
                _id: 1,
                event_name: 'football game',
                event_date: '25.5.2025',
            },
        ],
    },
    {
        _id: 2,
        name: 'ollie',
        birth_date: '15.08.2017',
        tasks: [
            {
                _id: 1,
                task_name: 'do homework',
                isDone: true,
                isReccuring: true,
            },
            {
                _id: 2,
                task_name: 'feed the cat',
                isDone: false,
                isReccuring: true,
            },
        ],
        upcoming_events: [
            {
                _id: 1,
                event_name: 'ballet recital',
                event_date: '10.06.2025',
            },
        ],
    },
    {
        _id: 3,
        name: 'jules',
        birth_date: '22.11.2015',
        tasks: [
            {
                _id: 1,
                task_name: 'take out trash',
                isDone: false,
                isReccuring: true,
            },
            {
                _id: 2,
                task_name: 'practice piano',
                isDone: true,
                isReccuring: false,
            },
        ],
        upcoming_events: [
            {
                _id: 1,
                event_name: 'science fair',
                event_date: '18.04.2025',
            },
            {
                _id: 2,
                event_name: 'soccer tournament',
                event_date: '02.07.2025',
            },
        ],
    },
];
