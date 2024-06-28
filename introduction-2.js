const addSomethingToUserBackpack = (player, goods) => {
  if (
    player.backpack.weight + goods.weight > player.backpack.maxWeight
    && !player.canCarryUp(player.backpack.weight + goods.weight)
    && !player.backpack.canBePutIn(goods)
  ) {
    return -1;
  }
  player.backpack.add(goods);
};
