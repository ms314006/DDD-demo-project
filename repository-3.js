const playerRepository = {
  getDiscoveredPokemonCount: async (playerId, pokemonId) => {
    const discoveredPokemons = await apis.discoverNewPokemon(
      playerId,
      pokemonId,
    );

    return discoveredPokemons;
  }
};
