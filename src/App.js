import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Check from "./Check.js";
import OfferingMenu from "./OfferingMenu.js";
import CheckOfferingMenu from "./CheckOfferingMenu.js";

class App {
  #date; // int 날짜
  #orderedMenu; // 주문한 메뉴 object
  #totalOrderAmount; // 총 주문 금액 int

  async saveDate() {
    while (true) {
      const inputtedDate = await InputView.readDate();
      const date = await Check.checkDate(inputtedDate);
      if (date instanceof Error)
        OutputView.printError(date.message);
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
  }
}

export default App;

new App().run();
