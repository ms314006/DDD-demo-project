const playerRepository = {
  discoverNewPokemon: async (player, pokemon) => (
    apis.discoverNewPokemon(player.id, pokemon.id)
  )
};
