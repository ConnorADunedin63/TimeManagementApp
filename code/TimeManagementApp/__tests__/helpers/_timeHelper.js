import { convertTo12HourFormat, get24HourTime, formatDate, getLongTermGoals, getShortTermGoals, getOngoingGoals, compareTimes } from '../../helpers/timeHelper.js'
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

  it("should be returned for 12PM", () => {
    const date = new Date("2016-05-13 12:10");
    expect(convertTo12HourFormat(date)).toBe("12:10PM");
  });

  it("should return \"N/A\" when passed something that is not a Date object", () => {
    expect(convertTo12HourFormat("This is not a date")).toBe("N/A");
  });

  it("should return \"N/A\" when passed null", () => {
    expect(convertTo12HourFormat(null)).toBe("N/A");
  });
});

describe("24 hour format should", () => {
  it("return the correct 24 hour time when date has a time in the am.", () => {
    const date = new Date("2011-01-01 09:17");
    expect(get24HourTime(date)).toBe("09:17");
  });

  it("return the correct 24 hour time when date has a time in the pm.", () => {
    const date = new Date("2011-01-01 15:07");
    expect(get24HourTime(date)).toBe("15:07");
  })
});

describe("date format", () => {
  it("should return the correct format for dates less than ten", () => {
    const date = new Date("1999-01-01 12:00");
    expect(formatDate(date)).toBe("01/01/1999")
  });

  it("should return the correct format for dates greater than or equal to ten", () => {
    const date = new Date("2017-12-10");
    expect(formatDate(date)).toBe("10/12/2017");
  });

  it("should be N/A when date is not a valid Date object", () => {
    expect(formatDate("This is not a Date object")).toBe("N/A");
  });

  it("should be N/A when date is null", () => {
    expect(formatDate(null)).toBe("N/A");
  });
});

describe("long term goals filter", () => {
    it("should return nothing when there are no goals.", () => {
      const goals = [];
      expect(getLongTermGoals(goals).length).toBe(0);
    });

    it("should return nothing when there is only short term goals.", () => {
      // Constructs dates for the goals
      const goalDate1 = new Date();
      goalDate1.setDate(goalDate1.getDate() + 1);
      const goalDate2 = new Date();
      goalDate2.setDate(goalDate2.getDate() + 2);
      const goalDate3 = new Date();
      goalDate3.setDate(goalDate3.getDate() + 3);

      const goals = [
        {
          name: 'Test Goal 1',
          description: '',
          date: goalDate1
        },
        {
          name: 'Test Goal 2',
          description: '',
          date: goalDate2
        },
        {
          name: 'Test Goal 3',
          description: '',
          date: goalDate3
        }
      ];

      expect(getLongTermGoals(goals).length).toBe(0);
    });

    it("should return one goal when there is one long term goal six months in the future", () => {
      // Constructs dates for the goals
      const goalDate1 = new Date();
      goalDate1.setMonth(goalDate1.getMonth() + 6);
      const goalDate2 = new Date();
      goalDate2.setDate(goalDate2.getDate() + 2);
      const goalDate3 = new Date();
      goalDate3.setDate(goalDate3.getDate() + 3);

      const goals = [
        {
          name: 'Long term goal',
          description: '',
          date: goalDate1
        },
        {
          name: 'Test Goal 2',
          description: '',
          date: goalDate2
        },
        {
          name: 'Test Goal 3',
          description: '',
          date: goalDate3
        }
      ];

      expect(getLongTermGoals(goals).length).toBe(1);
    });

    it("should return one goal when there are twp long term goals six months and a year in the future", () => {
      // Constructs dates for the goals
      const goalDate1 = new Date();
      goalDate1.setMonth(goalDate1.getMonth() + 6);
      const goalDate2 = new Date();
      goalDate2.setFullYear(goalDate2.getFullYear() + 1);
      const goalDate3 = new Date();
      goalDate3.setDate(goalDate3.getDate() + 3);

      const goals = [
        {
          name: 'Long term goal',
          description: '',
          date: goalDate1
        },
        {
          name: 'Test Goal 2',
          description: '',
          date: goalDate2
        },
        {
          name: 'Test Goal 3',
          description: '',
          date: goalDate3
        }
      ];

      expect(getLongTermGoals(goals).length).toBe(2);
    });
});

describe("short term filter", () => {
  it("should return an empty array when there are no goals", () => {
    const goals = [];
    expect(getShortTermGoals(goals).length).toBe(0);
  });

  it("should return an empty array when there are only long term or ongoing goals", () => {
    const goalDate1 = new Date();
    goalDate1.setFullYear(goalDate1.getFullYear() + 1);
    const goalDate2 = "N/A";
    const goalDate3 = new Date();
    goalDate3.setFullYear(goalDate3.getFullYear() + 5);

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getShortTermGoals(goals).length).toBe(0);
  });

  it("should return one goal when there is a single short term goal.", () => {
    const goalDate1 = new Date();
    goalDate1.setFullYear(goalDate1.getFullYear() + 1);
    const goalDate2 = "N/A";
    const goalDate3 = new Date();
    goalDate3.setDate(goalDate3.getDate() + 1);

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getShortTermGoals(goals).length).toBe(1);
  });

  it("should return two goals when there are two short term goals.", () => {
    const goalDate1 = new Date();
    goalDate1.setMinutes(goalDate1.getMinutes() + 1);
    const goalDate2 = "N/A";
    const goalDate3 = new Date();
    goalDate3.setDate(goalDate3.getDate() + 1);

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getShortTermGoals(goals).length).toBe(2);
  });
});

describe("ongoing goals filter", () => {
  it("should return an empty array when there are no goals", () => {
    const goals = [];
    expect(getOngoingGoals(goals).length).toBe(0);
  });

  it("should return an empty array when there are only long or short term goals", () => {
    const goalDate1 = new Date();
    goalDate1.setFullYear(goalDate1.getFullYear() + 1);
    const goalDate2 = new Date();
    goalDate2.setDate(goalDate2.getDate() + 1);
    const goalDate3 = new Date();
    goalDate3.setFullYear(goalDate3.getFullYear() + 5);

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getOngoingGoals(goals).length).toBe(0);
  });

  it("should return one goal when there is a single ongoing goal.", () => {
    const goalDate1 = new Date();
    goalDate1.setFullYear(goalDate1.getFullYear() + 1);
    const goalDate2 = "N/A";
    const goalDate3 = new Date();
    goalDate3.setDate(goalDate3.getDate() + 1);

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getOngoingGoals(goals).length).toBe(1);
  });

  it("should return two goals when there are two ongoing goals.", () => {
    const goalDate1 = new Date();
    goalDate1.setMinutes(goalDate1.getMinutes() + 1);
    const goalDate2 = "N/A";
    const goalDate3 = "N/A";

    const goals = [
      {
        name: 'Test Goal 1',
        description: '',
        date: goalDate1
      },
      {
        name: 'Test Goal 2',
        description: '',
        date: goalDate2
      },
      {
        name: 'Test Goal 3',
        description: '',
        date: goalDate3
      }
    ];

    expect(getOngoingGoals(goals).length).toBe(2);
  });
});

describe("compareTimes function should", () => {
  it("correctly return the correct integer when both times have different hours.", () => {
    let time1 = "01:13";
    let time2 = "13:13";
    expect(compareTimes(time1, time2)).toBe(1);

    time1 = "12:21";
    time2 = "09:10";
    expect(compareTimes(time1, time2)).toBe(-1);
  });

  it("correctly return the correct integer when both time have the same hours but different minutes.", () => {
    let time1 = "09:01";
    let time2 = "09:30";
    expect(compareTimes(time1, time2)).toBe(1)

    time1 = "13:13";
    time2 = "13:05";
    expect(compareTimes(time1, time2)).toBe(-1);
  });

  it("correctly return the correct integer when both times are the same.", () => {
    let time1 = "08:25";
    expect(compareTimes(time1, time1)).toBe(0);
  });
});
