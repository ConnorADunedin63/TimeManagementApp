import {isWeekday, isWeekend} from '../../logic/scheduleDays.js'

describe("isWeekdays", () => {
    it("should return true when Monday to Friday are selected.", () => {
        const days = [false, true, true, true, true, true, false];
        expect(isWeekday(days)).toBe(true);
    });

    it("should return false when only some weekdays are selected.", () => {
        const days = [false, true, false, true, false, false, false];
        expect(isWeekday(days)).toBe(false);
    });

    it("should return false when no days are selected.", () => {
        const days = [false, false, false, false, false, false, false];
        expect(isWeekday(days)).toBe(false);
    });

    it("should return false when weekends are selected.", () => {
        const saturdaySelected = [false, false, false, false, false, false, true];
        const sundaySelected = [true, false, false, false, false, false, false];
        const weekendSelected = [true, false, false, false, false, false, true];
        expect(isWeekday(saturdaySelected)).toBe(false);
        expect(isWeekday(sundaySelected)).toBe(false);
        expect(isWeekday(weekendSelected)).toBe(false);
    });
})