import { convertTo12HourFormat } from '../../helpers/timeHelper.js'
/**
  Tests for checking date formatting functions
*/
describe("12 hour format", () => {
  it("should be returned for a morning time", () => {
    const date = new Date("2020-01-01 08:35");
    expect(convertTo12HourFormat(date)).toBe("08:35AM");
  });

  it("should be returned for an afternoon time", () => {
    const date = new Date("2020-06-08 13:14");
    expect(convertTo12HourFormat(date)).toBe("01:14PM");
  });

  it("should be returned for a double digit morning time", () => {
    const date = new Date("2017-02-05 11:30");
    expect(convertTo12HourFormat(date)).toBe("11:30AM");
  });

  it("should be returned for 12AM", () => {
    const date = new Date("2016-05-13 00:10");
    expect(convertTo12HourFormat(date)).toBe("12:10AM");
  });

  it("should return \"N/A\" when passed something that is not a Date object", () => {
    expect(convertTo12HourFormat("This is not a date")).toBe("N/A");
  });

  it("should return \"N/A\" when passed null", () => {
    expect(convertTo12HourFormat(null)).toBe("N/A");
  });
});
