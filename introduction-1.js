const addSomethingToUserBackpack = (player, goods) => {
  if (player.backpack.weight + goods.weight > player.backpack.maxWeight) {
    return -1;
  }
  player.backpack.add(goods);
};
