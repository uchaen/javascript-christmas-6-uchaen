import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Check from "./Check.js";
import CheckOfferingMenu from "./CheckOfferingMenu.js";

class App {
  #date = 0; // int 날짜
  #orderedMenu = []; // 주문한 메뉴 { category:, name:, count: } object의 배열
  #totalOrderAmount = 0; // 총 주문 금액 int
  #gift = []; // 증정 메뉴 { category:, name:, count: } object의 배열
  #benefit = {}; // 혜택 내역 {이름:금액, } object
  #totalBenefitAmount = 0; //총혜택 금액 int
  #estimatedPaymentAmount = 0; //할인 후 예상 결제 금액 int
  #decemberEventBadge = ""; // 12월 이벤트 배지 string 없음/별/트리/산타

  async #saveDate() {
    while (true) {
      const inputtedDate = await InputView.readDate();
      try {
        await Check.checkDate(inputtedDate);
        return Number(inputtedDate);
      } catch (e) {
        OutputView.printError(e.message);
      }
    }
  }
  async #saveMenu() {
    while (true) {
      const inputtedMenu = await InputView.readMenu();
      const orderedMenu = await Check.checkInputtedMenu(inputtedMenu);
      if (orderedMenu instanceof Error)
        OutputView.printError(orderedMenu.message);
      else return orderedMenu;
    }
  }
  async calculateTotalOrderAmount(orderedMenu) {
    let totalOrderAmout = 0;
    for (const menu of orderedMenu) {
      const quantity = menu.count;
      const price = await CheckOfferingMenu.findPrice(menu.name);
      totalOrderAmout += price * quantity;
    }
    return totalOrderAmout;
  }
  async calculateGift(totalOrderAmount) {
    if (totalOrderAmount >= 120000)
      return [{ category: "beverages", name: "샴페인", count: 1 }];
  }
  async #calculateWeekdayDiscount(orderedMenu) {
    let weekdayDiscount = 0;
    for (const menu of orderedMenu) {
      if (menu.category === "desserts") weekdayDiscount += 2023 * menu.count;
    }
    return weekdayDiscount;
  }
  async #calculateWeekendDiscount(orderedMenu) {
    let weekendDiscount = 0;
    for (const menu of orderedMenu) {
      if (menu.category === "mainDishes") weekendDiscount += 2023 * menu.count;
    }
    return weekendDiscount;
  }
  async #calculateGiftEvent(gift) {
    let giftEvent = 0;
    for (const menu of gift) {
      const quantity = menu.count;
      const price = await CheckOfferingMenu.findPrice(menu.name);
      giftEvent += price * quantity;
    }
    return giftEvent;
  }
  async calculateBenefit(date, orderedMenu, gift) {
    let benefit = {};
    if (date <= 25) benefit["크리스마스 디데이 할인"] = 1000 + 100 * (date - 1);
    if (date % 7 > 2) {
      const weekdayDiscount = await this.#calculateWeekdayDiscount(orderedMenu);
      if (weekdayDiscount > 0) benefit["평일 할인"] = weekdayDiscount;
    }
    if (date % 7 <= 2) {
      const weekendDiscount = await this.#calculateWeekendDiscount(orderedMenu);
      if (weekendDiscount > 0) benefit["주말 할인"] = weekendDiscount;
    }
    if (date in [3, 10, 17, 24, 25, 31]) benefit["특별 할인"] = 1000;
    if (gift) benefit["증정 이벤트"] = await this.#calculateGiftEvent(gift);
    return benefit;
  }
  async calculateTotalBenefitAmount(benefit) {
    let totalBenefitAmount = 0;
    for (const item in benefit) {
      totalBenefitAmount += benefit[item];
    }
    return totalBenefitAmount;
  }
  async calculateEstimatedPaymentAmount(totalOrderAmount, benefit) {
    let estimatedPaymentAmount = totalOrderAmount;
    for (const item in benefit) {
      if (item !== "증정 이벤트") estimatedPaymentAmount -= benefit[item];
    }
    return estimatedPaymentAmount;
  }
  async calculateDecemberEventBadge(totalBenefitAmount) {
    if (totalBenefitAmount >= 20000) return "산타";
    if (totalBenefitAmount >= 10000) return "트리";
    if (totalBenefitAmount >= 5000) return "별";
    return "없음";
  }
  async #calculatePreview() {
    this.#totalOrderAmount = await this.calculateTotalOrderAmount(
      this.#orderedMenu
    );
    if (this.#totalOrderAmount >= 10000) {
      this.#gift = await this.calculateGift(this.#totalOrderAmount);
      this.#benefit = await this.calculateBenefit(
        this.#date,
        this.#orderedMenu,
        this.#gift
      );
      this.#totalBenefitAmount = await this.calculateTotalBenefitAmount(
        this.#benefit
      );
    } //총주문 금액 10,000원 이상부터 이벤트 적용

    this.#estimatedPaymentAmount = await this.calculateEstimatedPaymentAmount(
      this.#totalOrderAmount,
      this.#benefit
    );
    this.#decemberEventBadge = await this.calculateDecemberEventBadge(
      this.#totalBenefitAmount
    );
  }
  async #printPreview() {
    OutputView.printPreviewMsg(this.#date);
    OutputView.printMenu(this.#orderedMenu);
    OutputView.printTotalOrderAmount(this.#totalOrderAmount);
    OutputView.printGift(this.#gift);
    OutputView.printBenefit(this.#benefit);
    OutputView.printTotalBenefitAmount(this.#totalBenefitAmount);
    OutputView.printEstimatedPaymentAmount(this.#estimatedPaymentAmount);
    OutputView.printDecemberEventBadge(this.#decemberEventBadge);
  }

  async run() {
    OutputView.printStartMsg();
    this.#date = await this.#saveDate();
    this.#orderedMenu = await this.#saveMenu();

    await this.#calculatePreview();
    await this.#printPreview();
  }
}

export default App;

// new App().run();
