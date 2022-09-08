export let data1 = [
    {
        "id": "01",
        "name": "유저 페이지",
        "type": "group",
        "sort": 1,
        "level": 1,
        "route":"/users"
    },
    {
        "id": "02",
        "name": "board",
        "type": "group",
        "sort": 1,
        "level": 1,
    },
    {
        "id": "03",
        "name": "dashBoard",
        "type": "group",
        "sort": 1,
        "level": 1,
        "route":"/dashboard"
    },
    {
        "id":"04",
        "name":"board1",
        "level":2,
        "parentId":"02",
        "route":"/board"
    },
    {
        "id":"05",
        "name":"board2",
        "level":2,
        "parentId":"02",
        "route":"/board"
    },
    {
        "id":"06",
        "name":"board3",
        "level":2,
        "parentId":"02",
        "route":"/board"
    },

    {
        "id": "07",
        "name": "dashBoard1",
        "type": "group",
        "sort": 1,
        "level": 2,
        "parentId":"03",
    },
    {
        "id": "08",
        "name": "dashBoard2",
        "type": "group",
        "sort": 1,
        "level": 2,
        "parentId":"03",
    },
    {
        "id": "09",
        "name": "dashBoard3",
        "type": "group",
        "sort": 1,
        "level": 2,
        "parentId":"03",
    },

    {
        "id": "10",
        "name": "dashBoard1-1",
        "type": "group",
        "sort": 1,
        "level": 3,
        "parentId":"07",
    },
    {
        "id": "11",
        "name": "dashBoard1-2",
        "type": "group",
        "sort": 1,
        "level": 3,
        "parentId":"07",
    },
    {
        "id": "12",
        "name": "dashBoard1-3",
        "type": "group",
        "sort": 1,
        "level": 3,
        "parentId":"07",
    },

]