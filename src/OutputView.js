import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
  printError(errorMessage) {
    MissionUtils.Console.print(errorMessage);
  },
  printStartMsg() {
    MissionUtils.Console.print(
      "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다."
    );
  },
  printPreviewMsg(date) {
    MissionUtils.Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
    );
  },
  printMenu(orderedMenu) {
    MissionUtils.Console.print("\n<주문 메뉴>");
    for (const item of orderedMenu) {
      MissionUtils.Console.print(`${item.name} ${item.count}개`);
    }
  },
  printTotalOrderAmount(totalOrderAmount) {
    MissionUtils.Console.print("\n<할인 전 총주문 금액>");
    MissionUtils.Console.print(`${totalOrderAmount}원`);
  },
  printGift(gift) {
    MissionUtils.Console.print("\n<증정 메뉴>");
    for (const item in gift) {
      MissionUtils.Console.print(`${item} ${gift[item]}개`);
    }
  },
  // ...
};
export default OutputView;
