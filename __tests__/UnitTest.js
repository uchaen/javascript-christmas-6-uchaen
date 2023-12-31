import Check from "../src/Check.js";
import App from "../src/App.js";
import CheckOfferingMenu from "../src/CheckOfferingMenu.js";

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
      await expect(Check.checkNumberOfMenu(inputs)).rejects.toThrow("[ERROR]");
    }
  );
  test.each(["1", "2"])(
    "checkNumberOfMenu 개수 올바르게 입력했는가",
    async (inputs) => {
      const result = await Check.checkNumberOfMenu(inputs);
      expect(result).toBeUndefined();
    }
  );

  test("checkTotalQuantity 20개 초과 입력하면 error throw되는가", async () => {
    await expect(
      Check.checkTotalQuantity([
        { category: "mainDishes", name: "해산물파스타", count: 10 },
        { category: "beverages", name: "레드와인", count: 10 },
        { category: "beverages", name: "제로콜라", count: 1 },
      ])
    ).rejects.toThrow("[ERROR]");
  });
  test("checkTotalQuantity 총 20개 이하로 입력했는가", async () => {
    const result = await Check.checkTotalQuantity([
      { category: "mainDishes", name: "해산물파스타", count: 10 },
      { category: "beverages", name: "레드와인", count: 5 },
      { category: "beverages", name: "제로콜라", count: 5 },
    ]);
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
      ["해산물파스타-10", "제로콜라-5"],
      [
        { category: "mainDishes", name: "해산물파스타", count: 10 },
        { category: "beverages", name: "제로콜라", count: 5 },
      ]
    );
    expect(result).toBeUndefined();
  });

  test("checkOnlyBeverages 음료만 입력하면 error throw되는가", async () => {
    await expect(
      Check.checkOnlyBeverages([
        { category: "beverages", name: "레드와인", count: 10 },
        { category: "beverages", name: "제로콜라", count: 5 },
      ])
    ).rejects.toThrow("[ERROR]");
  });
  test("checkOnlyBeverages 음료말고 다른메뉴도 입력했는가", async () => {
    const result = await Check.checkOnlyBeverages([
      { category: "mainDishes", name: "해산물파스타", count: 10 },
      { category: "beverages", name: "레드와인", count: 1 },
      { category: "beverages", name: "제로콜라", count: 5 },
    ]);
    expect(result).toBeUndefined();
  });

  test.each([
    "해산물파스타1,샴페인-3",
    "해산물파스타-레드와인,1",
    "해산물파스타-3,,레드와인-1-",
    "샴페인-10, 초코케이크-1",
  ])(
    "checkInputtedMenu 메뉴 입력 형식이 예시와 다르면 error promise return되는가",
    async (inputs) => {
      const result = Check.checkInputtedMenu(inputs);
      expect(result).toBeInstanceOf(Promise);
    }
  );
  test("checkInputtedMenu 메뉴 입력 형식이 예시와 다름 없는가", async () => {
    const result = await Check.checkInputtedMenu(
      "해산물파스타-7,레드와인-1,제로콜라-5"
    );
    expect(result).toEqual([
      { category: "mainDishes", name: "해산물파스타", count: 7 },
      { category: "beverages", name: "레드와인", count: 1 },
      { category: "beverages", name: "제로콜라", count: 5 },
    ]);
  });
});

describe("App.js 유닛 테스트", () => {
  const app = new App();
  const orderedMenu = [
    { category: "desserts", name: "초코케이크", count: 2 },
    { category: "mainDishes", name: "티본스테이크", count: 1 },
    { category: "mainDishes", name: "바비큐립", count: 1 },
    { category: "beverages", name: "제로콜라", count: 1 },
  ];
  const gift = [{ category: "beverages", name: "샴페인", count: 1 }];
  const benefit = {
    "크리스마스 디데이 할인": 1200,
    "평일 할인": 4046,
    "특별 할인": 1000,
    "증정 이벤트": 25000,
  };

  test("calculateTotalOrderAmount 계산한 총주문금액이 올바른가", async () => {
    const result = await app.calculateTotalOrderAmount(orderedMenu);
    expect(result).toEqual(142000);
  });
  test("calculateGift 계산한 증정메뉴가 올바른가", async () => {
    const result = await app.calculateGift(142000);
    expect(result).toEqual(gift);
  });
  test("calculateBenefit 계산한 혜택내역이 올바른가", async () => {
    const result = await app.calculateBenefit(3, orderedMenu, gift);
    expect(result).toEqual(benefit);
  });
  test("calculateTotalBenefitAmount 계산한 총혜택금액이 올바른가", async () => {
    const result = await app.calculateTotalBenefitAmount(benefit);
    expect(result).toEqual(31246);
  });
  test("calculateEstimatedPaymentAmount 계산한 할인 후 예상 결제 금액이 올바른가", async () => {
    const result = await app.calculateEstimatedPaymentAmount(142000, benefit);
    expect(result).toEqual(135754);
  });
  test.each([
    [20000, "산타"],
    [19999, "트리"],
    [10000, "트리"],
    [9999, "별"],
    [5000, "별"],
    [4999, "없음"],
  ])("calculateDecemberEventBadge 계산한 12월 이벤트 배지가 올바른가", async (totalBenefitAmount, expectedBadge) => {
    const result = await app.calculateDecemberEventBadge(totalBenefitAmount);
    expect(result).toBe(expectedBadge);
  });
});

describe("CheckOfferingMenu.js 유닛 테스트", () => {
  test.each([
    "해산물파스타",
    "시저샐러드",
    "아이스크림",
    "샴페인",
    "양송이수프",
  ])("IsNotExistMenu 존재하는 메뉴인가", async (inputs) => {
    const result = await CheckOfferingMenu.IsNotExistMenu(inputs);
    expect(result).toBe(false);
  });
  test.each(["해산물", "샐러드", "초코아이스크림", "와인", "수프"])(
    "IsNotExistMenu 존재하지 않는 메뉴인가",
    async (inputs) => {
      const result = await CheckOfferingMenu.IsNotExistMenu(inputs);
      expect(result).toBe(true);
    }
  );

  test.each([
    ["양송이수프", "appetizers"],
    ["크리스마스파스타", "mainDishes"],
    ["레드와인", "beverages"],
  ])("findCategory 카테고리가 올바른가", async (menuName, expectedCategory) => {
    const result = await CheckOfferingMenu.findCategory(menuName);
    expect(result).toBe(expectedCategory);
  });

  test.each([
    ["양송이수프", 6000],
    ["바비큐립", 54000],
    ["아이스크림", 5000],
  ])("findPrice 가격이 올바른가", async (menuName, expectedPrice) => {
    const result = await CheckOfferingMenu.findPrice(menuName);
    expect(result).toBe(expectedPrice);
  });
});
