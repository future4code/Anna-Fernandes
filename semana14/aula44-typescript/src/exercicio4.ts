type pokemon = {
	name: string,
    types: string,
	healthPoints: number
}

const pokemon1: pokemon = {
  name: "Charmander",
  types: "Fire",
  healthPoints: 28
}

const pokemon2: pokemon = {
  name: "Bulbasaur",
  types: "Grass/Poison",
  healthPoints: 31
}

const pokemon3: pokemon = {
  name: "Squirtle",
  types: "Water",
  healthPoints: 35
}

// a) tsc exercicio4.ts 
// b) tsc ./src/exercicio4.ts 
// c) tsc
// d) A versão do EcmaScript é a 6, o outDir é "./build" e o rootDir é "./src"