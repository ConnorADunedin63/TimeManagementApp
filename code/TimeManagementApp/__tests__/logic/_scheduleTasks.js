import { addScheduleTask } from '../../logic/scheduleTasks.js';

describe("addScheduleTask should", () => {
    it("return a new JSON array with one object when the array is empty.", () => {
        let currentTasks = [];
        let updatedTasks = addScheduleTask("Test task", "Test description", "01:00", "01:30", currentTasks);

        expect(updatedTasks.length).toBe(1);
        expect(updatedTasks[0].key).toBe("Test task01:00");
        expect(updatedTasks[0].name).toBe("Test task");
        expect(updatedTasks[0].description).toBe("Test description");
        expect(updatedTasks[0].startTime).toBe("01:00");
        expect(updatedTasks[0].endTime).toBe("01:30");
    });

    it("returns a new JSON array with two objects when the array has one element, the new object should be after the previous task.", () => {
        let currentTasks = [
            {
                key: "Test task01:00",
                name: "Test task",
                description: "Test description",
                startTime: "01:00",
                endTime: "01:30"
            }
        ];
        let updatedTasks = addScheduleTask("Test task2", "Test description2", "02:00", "02:30", currentTasks);

        expect(updatedTasks.length).toBe(2);
        expect(updatedTasks[1].key).toBe("Test task202:00");
        expect(updatedTasks[1].name).toBe("Test task2");
        expect(updatedTasks[1].description).toBe("Test description2");
        expect(updatedTasks[1].startTime).toBe("02:00");
        expect(updatedTasks[1].endTime).toBe("02:30");
    });

    it("returns a new JSON array with two objects when the array has one element, the new object should be before the previous task.", () => {
        let currentTasks = [
            {
                key: "Test task02:00",
                name: "Test task",
                description: "Test description",
                startTime: "02:00",
                endTime: "02:30"
            }
        ];
        let updatedTasks = addScheduleTask("Test task2", "Test description2", "01:00", "01:30", currentTasks);

        expect(updatedTasks.length).toBe(2);
        expect(updatedTasks[0].key).toBe("Test task201:00");
        expect(updatedTasks[0].name).toBe("Test task2");
        expect(updatedTasks[0].description).toBe("Test description2");
        expect(updatedTasks[0].startTime).toBe("01:00");
        expect(updatedTasks[0].endTime).toBe("01:30");
    });

    it("returns a new JSON object with three elements, the new element should be in the middle.", () => {
        let currentTasks = [
            {
                key: "Test task09:12",
                name: "Test task",
                description: "Test description",
                startTime: "09:12",
                endTime: "11:00"
            },
            {
                key: "Test task15:00",
                name: "Test task2",
                description: "Test description2",
                startTime: "15:00",
                endTime: "17:30"
            }
        ];
        let updatedTasks = addScheduleTask("Test task3", "Test description3", "13:00", "14:30", currentTasks);

        expect(updatedTasks.length).toBe(3);
        expect(updatedTasks[1].key).toBe("Test task313:00");
        expect(updatedTasks[1].name).toBe("Test task3");
        expect(updatedTasks[1].description).toBe("Test description3");
        expect(updatedTasks[1].startTime).toBe("13:00");
        expect(updatedTasks[1].endTime).toBe("14:30");
    });
});