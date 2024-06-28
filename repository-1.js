const playerRepository = {
  getPlayer: async (playerId) => {
    const player = await apis.getPlayer(playerId);
    const carriedPokemons = await apis.getCarriedPokemons(playerId);

    return new Player({ ...player, carriedPokemons });
  }
};
