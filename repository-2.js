const playerRepository = {
  getDiscoveredPokemonCount: async (playerId) => {
    const discoveredPokemons = await apis.getDiscoveredPokemonsByPlayerId(
      playerId
    );

    return discoveredPokemons.length;
  }
};
