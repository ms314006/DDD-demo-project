class Player {
  getCarriedPokemon(carriedPokemonNo) {
    return new CarriedPokemon({
      playerId: this.id,
      no: carriedPokemonNo,
      id: this.pokemons[carriedPokemonNo].id,
    });
  }
}