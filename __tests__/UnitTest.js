import Check from "../src/Check.js";

describe("Check.js 유닛 테스트", () => {
  test.each(["", "1200", "asdf", "3.5", "0", "A"])(
    "checkDate 날짜 올바르지 않게 입력하면 error throw되는가",
    async (inputs) => {
      await expect(Check.checkDate(inputs)).rejects.toThrow("[ERROR]");
    }
  );
  test.each(["1", "31", "10"])(
    "checkDate 날짜 올바르게 입력했는가",
    async (inputs) => {
      const result = await Check.checkDate(inputs);
      expect(result).toBeUndefined();
    }
  );

  test.each(["", " ", "헤산물퍼스터", "A"])(
    "checkNameOfMenu 메뉴판에 없는 메뉴 입력하면 error throw되는가",
    async (inputs) => {
      await expect(Check.checkNameOfMenu(inputs)).rejects.toThrow("[ERROR]");
    }
  );
  test.each(["양송이수프", "샴페인", "크리스마스파스타"])(
    "checkNameOfMenu 메뉴 올바르게 입력했는가",
    async (inputs) => {
      const result = await Check.checkNameOfMenu(inputs);
      expect(result).toBeUndefined();
    }
  );

  test.each(["", "3.5", "0", "A"])(
    "checkNumberOfMenu 개수 올바르지 않게 입력하면 error throw되는가",
    async (inputs) => {
      await expect(Check.checkDate(inputs)).rejects.toThrow("[ERROR]");
    }
  );
  test.each(["1", "2"])(
    "checkNumberOfMenu 개수 올바르게 입력했는가",
    async (inputs) => {
      const result = await Check.checkDate(inputs);
      expect(result).toBeUndefined();
    }
  );

  test("checkTotalQuantity 20개 초과 입력하면 error throw되는가", async () => {
    await expect(
      Check.checkTotalQuantity({ 해산물파스타: 11, 타파스: 5, 샴페인: 5 })
    ).rejects.toThrow("[ERROR]");
  });
  test("checkTotalQuantity 총 20개 이하로 입력했는가", async () => {
    const result = await Check.checkTotalQuantity({
      해산물파스타: 10,
      제로콜라: 5,
      샴페인: 5,
    });
    expect(result).toBeUndefined();
  });

  test("checkDuplication 중복 입력하면 error throw되는가", async () => {
    await expect(
      Check.checkDuplication(["초코케이크-3", "초코케이크-4"], {
        초코케이크: 4,
      })
    ).rejects.toThrow("[ERROR]");
  });
  test("checkDuplication 중복없이 입력했는가", async () => {
    const result = await Check.checkDuplication(
      ["해산물파스타-10", "제로콜라-5", "샴페인-5"],
      { 해산물파스타: 10, 제로콜라: 5, 샴페인: 5 }
    );
    expect(result).toBeUndefined();
  });

  test("checkOnlyBeverages 음료만 입력하면 error throw되는가", async () => {
    await expect(
        Check.checkOnlyBeverages({ 레드와인: 1, 제로콜라: 5, 샴페인: 5 })
      ).rejects.toThrow("[ERROR]");
  });
  test("checkOnlyBeverages 음료말고 다른메뉴도 입력했는가", async () => {
    const result = await Check.checkOnlyBeverages({ 해산물파스타: 11, 타파스: 5, 샴페인: 5 });
    expect(result).toBeUndefined();
  });
});
