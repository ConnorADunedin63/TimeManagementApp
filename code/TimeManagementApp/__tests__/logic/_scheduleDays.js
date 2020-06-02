import {isWeekdays, isWeekends, isEveryday} from '../../logic/scheduleDays.js'

describe("isWeekdays", () => {
    it("should return true when Monday to Friday are selected.", () => {
        const days = [false, true, true, true, true, true, false];
        expect(isWeekdays(days)).toBe(true);
    });

    it("should return false when only some weekdays are selected.", () => {
        const days = [false, true, false, true, false, false, false];
        expect(isWeekdays(days)).toBe(false);
    });

    it("should return false when no days are selected.", () => {
        const days = [false, false, false, false, false, false, false];
        expect(isWeekdays(days)).toBe(false);
    });

    it("should return false when weekends are selected.", () => {
        const saturdaySelected = [false, false, false, false, false, false, true];
        const sundaySelected = [true, false, false, false, false, false, false];
        const weekendSelected = [true, false, false, false, false, false, true];
        expect(isWeekdays(saturdaySelected)).toBe(false);
        expect(isWeekdays(sundaySelected)).toBe(false);
        expect(isWeekdays(weekendSelected)).toBe(false);
    });
});

describe("isWeekend", () => {
    it("should return true when Saturday and Sunday are selected.", () => {
        const days = [true, false, false, false, false, false, true];
        expect(isWeekends(days)).toBe(true);
    });

    it("should return false when only one weekend day is selected.", () => {
        const saturdaySelected = [false, false, false, false, false, false, true];
        const sundaySelected = [true, false, false, false, false, false, false];
        expect(isWeekends(saturdaySelected)).toBe(false);
        expect(isWeekends(sundaySelected)).toBe(false);
    });

    it("should return false when no days are selected.", () => {
        const days = [false, false, false, false, false, false, false];
        expect(isWeekends(days)).toBe(false);
    });

    it("should return false when weekdays are selected as well.", () => {
        const days = [true, true, false, false, false, false, true];
        expect(isWeekends(days)).toBe(false);
    });
});

describe("isEveryday", () => {
    it("should be true if every day is selected.", () => {
        const days = [true, true, true, true, true, true, true];
        expect(isEveryday(days)).toBe(true);
    });

    it("should be false if some days are not selected.", () => {
        const days = [false, true, false, true, false, true, false];
        expect(isEveryday(days)).toBe(false);
    });
});