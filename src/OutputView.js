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
    MissionUtils.Console.print(`${totalOrderAmount.toLocaleString("ko-KR")}원`);
  },
  printGift(gift) {
    MissionUtils.Console.print("\n<증정 메뉴>");
    if (gift) {
      for (const item of gift) {
        MissionUtils.Console.print(`${item.name} ${item.count}개`);
      }
    } else {
      MissionUtils.Console.print(`없음`);
    }
  },
  printBenefit(benefit) {
    MissionUtils.Console.print("\n<혜택 내역>");
    if (benefit) {
      for (const item in benefit) {
        MissionUtils.Console.print(
          `${item}: -${benefit[item].toLocaleString("ko-KR")}원`
        );
      }
    } else {
      MissionUtils.Console.print(`없음`);
    }
  },
  printTotalBenefitAmount(totalBenefitAmount) {
    MissionUtils.Console.print("\n<총혜택 금액>");
    MissionUtils.Console.print(
      `${totalBenefitAmount.toLocaleString("ko-KR")}원`
    );
  },
  printEstimatedPaymentAmount(estimatedPaymentAmount) {
    MissionUtils.Console.print("\n<할인 후 예상 결제 금액>");
    MissionUtils.Console.print(
      `${estimatedPaymentAmount.toLocaleString("ko-KR")}원`
    );
  },
  printDecemberEventBadge(decemberEventBadge) {
    MissionUtils.Console.print("\n<12월 이벤트 배지>");
    MissionUtils.Console.print(decemberEventBadge);
  }
};
export default OutputView;
