// 使用 entity 和 value object 操作交易的樣子
// 先找出交易雙方的 entity
const playerA = usePlayerByPlayerId(playerAId);
const playerB = usePlayerByPlayerId(playerBId);

// 確認玩家為非封鎖狀態
if (playerA.isBlocked || playerB.isBlocked) {
  return tradeStatusFactory.createPlayerBlockedError(tradeId);
}

// 再一次檢查雙方要交易的東西確實存在於背包
// 就可以將雙方各自要交易給對方的東西從玩家的背包中扣掉
if (
  playerA.backpack.isExist(tradeThingOfPlayerA)
  && playerB.backpack.isExist(tradeThingOfPlayerB)
) {
  playerA.backpack.takeOut(tradeThingOfPlayerA);
  playerB.backpack.takeOut(tradeThingOfPlayerB);
}

// 會有個處理不存在的 Error，這裡先省略

// 該做的判斷都處理完後，再將各自的東西加到對方的背包中
playerA.backpack.add(tradeThingOfPlayerB);
playerB.backpack.add(tradeThingOfPlayerA);
