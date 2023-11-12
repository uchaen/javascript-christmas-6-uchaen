import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Check from "./Check.js";
import CheckOfferingMenu from "./CheckOfferingMenu.js";

class App {
  #date; // int 날짜
  #orderedMenu; // 주문한 메뉴 { category:, name:, count: } object의 배열
  #totalOrderAmount; // 총 주문 금액 int
  #gift; // 증정 메뉴 { category:, name:, count: } object의 배열
  #benefit = {}; // 혜택 내역 {이름:금액, } object

  async saveDate() {
    while (true) {
      const inputtedDate = await InputView.readDate();
      const date = await Check.checkDate(inputtedDate);
      if (date instanceof Error) OutputView.printError(date.message);
      else return date;
    }
  }
  async saveMenu() {
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
  async calculateChristmasDdayDiscount(date) {
    if (date <= 25)
      this.#benefit["크리스마스 디데이 할인"] = 1000 + 100 * (date - 1);
  }
  async calculateWeekdayDiscount(orderedMenu) {
    let weekdayDiscount = 0;
    for (const menu of orderedMenu) {
      if (menu.category === "desserts") weekdayDiscount += 2023 * menu.count;
    }
    if (weekdayDiscount > 0) this.#benefit["평일 할인"] = weekdayDiscount;
  }
  async calculateWeekendDiscount(orderedMenu) {
    let weekendDiscount = 0;
    for (const menu of orderedMenu) {
      if (menu.category === "mainDishes") weekendDiscount += 2023 * menu.count;
    }
    if (weekendDiscount > 0) this.#benefit["주말 할인"] = weekendDiscount;
  }
  async calculateSpecialDiscount(date) {
    if (date in [3, 10, 17, 24, 25, 31]) this.#benefit["특별 할인"] = 1000;
  }
  async calculateGiftEvent(gift) {
    let giftEvent = 0;
    for (const menu of gift) {
      const quantity = menu.count;
      const price = await CheckOfferingMenu.findPrice(menu.name);
      giftEvent += price * quantity;
    }
    this.#benefit["증정 이벤트"] = giftEvent;
  }
  async calculateBenefit(date, orderedMenu, gift) {
    await this.calculateChristmasDdayDiscount(date);
    if (date % 7 > 2) await this.calculateWeekdayDiscount(orderedMenu);
    if (date % 7 <= 2) await this.calculateWeekendDiscount(orderedMenu);
    await this.calculateSpecialDiscount(date);
    await this.calculateGiftEvent(gift);
  }
  async run() {
    OutputView.printStartMsg();
    this.#date = await this.saveDate();
    this.#orderedMenu = await this.saveMenu();

    OutputView.printPreviewMsg(this.#date);
    OutputView.printMenu(this.#orderedMenu);

    this.#totalOrderAmount = await this.calculateTotalOrderAmount(
      this.#orderedMenu
    );
    OutputView.printTotalOrderAmount(this.#totalOrderAmount);

    this.#gift = await this.calculateGift(this.#totalOrderAmount);
    OutputView.printGift(this.#gift);

    await this.calculateBenefit(this.#date, this.#orderedMenu, this.#gift);
    OutputView.printBenefit(this.#benefit);
  }
}

export default App;

new App().run();
