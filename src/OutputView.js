import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
    printError(errorMessage) {
        MissionUtils.Console.print(errorMessage);
    },
    printMenu() {
        MissionUtils.Console.print("<주문 메뉴>");
        // ...
    }
    // ...
}
export default OutputView