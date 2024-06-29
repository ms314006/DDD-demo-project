class Player {
  getCarriedPokemon(carriedPokemonNo) {
    return new CarriedPokemon({
      no: carriedPokemonNo,
      id: this.pokemons[carriedPokemonNo].id,
    });
  }
}