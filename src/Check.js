import OfferingMenu from "./OfferingMenu.js";

const Check = {
  async checkDate(inputtedDate) {
    if (
      isNaN(inputtedDate) ||
      Number(inputtedDate) % 1 !== 0 ||
      Number(inputtedDate) < 1 ||
      Number(inputtedDate) > 31
    )
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  },
  async checkNameOfMenu(inputtedName) {
    // 메뉴판에 없는 메뉴 검증
    for (const category in OfferingMenu) {
      for (const item of OfferingMenu[category]) {
        if (item.name === inputtedName) return; //종료
      }
    }
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  },
  async checkNumberOfMenu(inputtedNumber) {
    // 개수 검증
    if (
      isNaN(inputtedNumber) ||
      Number(inputtedNumber) % 1 !== 0 ||
      Number(inputtedNumber) < 1
    )
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  },
  async checkTotalQuantity(orderedMenu) {
    //최대 20개까지 주문 가능
    let totalQuantity = 0;
    for (const menuItem in orderedMenu) {
      totalQuantity += orderedMenu[menuItem];
    }
    if (totalQuantity > 20)
      throw new Error(
        "[ERROR] 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요."
      );
  },
  async checkDuplication(tmp, orderedMenu) {
    // 중복 검증
    if (tmp in orderedMenu)
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  },
  async checkOnlyBeverages(orderedMenu) {
    // 음료만 시킬 수 없음
    for (const menuItem in orderedMenu) {
      if (
        !OfferingMenu.beverages.some((beverage) => beverage.name === menuItem)
      )
        return;
    }
    throw new Error("[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.");
  },
  async checkMenu(inputtedMenu) {
    let orderedMenu = {};
    const menuItems = inputtedMenu.split(",");
    try {
      await Promise.all(
        menuItems.map(async (tmp) => {
          const tmptmp = tmp.split("-");
          await this.checkNameOfMenu(tmptmp[0]); // 메뉴명 올바른가
          await this.checkDuplication(tmptmp[0], orderedMenu); // 메뉴 중복없는가
          await this.checkNumberOfMenu(tmptmp[1]); // 메뉴 개수 올바른가
          orderedMenu[tmptmp[0]] = Number(tmptmp[1]);
        })
      );
      await this.checkTotalQuantity(orderedMenu); //총 20개 이하인가
      await this.checkOnlyBeverages(orderedMenu); //음료만 시키지 않았는가
      return orderedMenu;
    } catch (e) {
      throw new Error(e);
    }
  },
};
export default Check;
