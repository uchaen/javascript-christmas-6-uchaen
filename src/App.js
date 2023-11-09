import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Check from "./Check.js";
import OfferingMenu from "./OfferingMenu.js";

class App {
  #date; // int 날짜
  #orderedMenu; // object

  async saveDate() {
    while (true) {
      const inputtedDate = await InputView.readDate();
      try {
        await Check.checkDate(inputtedDate);
        return Number(inputtedDate);
      } catch (e) {
        OutputView.printError(e);
      }
    }    
  }
  async saveMenu() {
    while (true) {
      const inputtedMenu = await InputView.readMenu();
      try {
        const orderedMenu = await Check.checkMenu(inputtedMenu);
        return orderedMenu;
      } catch (e) {
        OutputView.printError(e);
      }
    }    
  }
  async run() {
    OutputView.printStartMsg();
    this.#date = await this.saveDate();
    this.#orderedMenu = await this.saveMenu();
    console.log(this.#orderedMenu);
    OutputView.printPreviewMsg(this.#date);
  }
}

export default App;

new App().run();
