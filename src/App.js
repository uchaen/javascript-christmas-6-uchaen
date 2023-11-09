import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Check from "./Check.js";

class App {
  #date; // int 날짜

  async saveDate() {
    while (true) {
      const visitDate = await InputView.readDate();
      try {
        await Check.checkDate(visitDate);
        return Number(visitDate);
      } catch (e) {
        OutputView.printError(e);
      }
    }    
  }
  async run() {
    this.#date = await this.saveDate();
  }
}

export default App;

new App().run();
