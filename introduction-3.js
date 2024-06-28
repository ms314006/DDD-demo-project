class AddGoodsToUserBackpackPolicy {
  // ...
  get isAllowed() {
    return (
      this.isLessThanBackpackMaxWeight
      && this.isUserCanCarryUp
      && this.isBackpackCanBePutIn
    );
  }
  // ...
}

// 原本的 addSomethingToUserBackpack
const addSomethingToUserBackpack = (player, goods) => {
  if (!new AddGoodsToUserBackpackPolicy(player, goods).isAllowed) {
    return -1;
  }
  player.backpack.add(goods);
};
