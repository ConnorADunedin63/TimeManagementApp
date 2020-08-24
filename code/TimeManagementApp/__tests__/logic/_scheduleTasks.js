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
});