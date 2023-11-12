import OfferingMenu from "./OfferingMenu.js";

const CheckOfferingMenu = {
  async IsNotExistMenu(menuName) { 
    for (const category in OfferingMenu) {
      for (const item of OfferingMenu[category]) {
        if (item.name === menuName) return false; // 찾으면 종료
      }
    }
    return true;
  },
  async findCategory(menuName) {
    for (const category in OfferingMenu) {
      for (const item of OfferingMenu[category]) {
        if (item.name === menuName) return category; // 찾으면 종료
      }
    }
  },
  async findPrice(menuName) {
    for (const category in OfferingMenu) {
      for (const item of OfferingMenu[category]) {
        if (item.name === menuName) return item.price; // 찾으면 종료
      }
    }
  },
};
export default CheckOfferingMenu;
