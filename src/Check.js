const Check = {
    async checkDate(visitDate) {
        if (
          isNaN(visitDate) ||
          Number(visitDate) % 1 !== 0 ||
          Number(visitDate) < 1 ||
          Number(visitDate) > 31
        )
          throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
      },

}
export default Check