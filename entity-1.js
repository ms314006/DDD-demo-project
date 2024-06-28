class Player {

  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  set name(name) {
    this.#name = name;
  }
}

const player = new Player(1, '神Q');

player.name = '修改過後的名字';
