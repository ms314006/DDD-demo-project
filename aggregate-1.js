class Player {

  #carriedPokemons;
  #id;

  constructor(id, carriedPokemons) {
    this.#id = id;
    this.#carriedPokemons = carriedPokemons;
  }

  addCarriedPokemon(pokemon) {
    if (!new AddCarriedPokemonsPolicy(this).isAllowed) {
      return -1;
    }
    this.carriedPokemons.add(pokemon);
  }

  removeCarriedPokemon(carriedPokemonNo) {
    if (!new RemoveCarriedPokemonsPolicy(this).isAllowed) {
      return -1;
    }

    this.carriedPokemons.remove(carriedPokemonNo);
  }

  changeCarriedPokemon(carriedPokemonNo, pokemon) {
    this.carriedPokemons.change(carriedPokemonNo, pokemon);
  }
}
