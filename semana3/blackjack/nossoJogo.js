console.log("Bem-vindo ao jogo");

let novaRodada = false;


if (confirm("Quer iniciar uma nova rodada?")) {
   novaRodada = true;
} else {
   novaRodada = false;
   console.log("O jogo acabou");
}


while (novaRodada) {

let user = [];
let comp = [];
   
let cartasUser = [];
let cartasComp = [];
   
let pontuacaoUser = 0;
let pontuacaoComp = 0;   

const carta1 = comprarCarta();
const carta2 = comprarCarta();

const carta3 = comprarCarta();
const carta4 = comprarCarta();

user.push(carta1, carta2);
comp.push(carta3, carta4);

for( let elemento of user ) {
   cartasUser.push(elemento.texto)
   pontuacaoUser += Number(elemento.valor)
}

for( let elemento of comp ) {
   cartasComp.push(elemento.texto)
   pontuacaoComp += Number(elemento.valor)
}


console.log(`Você - cartas: ${cartasUser} - pontuação ${pontuacaoUser}`);
console.log(`Computador - cartas: ${cartasComp} - pontuação ${pontuacaoComp}`);

   if (pontuacaoUser > pontuacaoComp) {
      console.log("O usuário ganhou!");

      if (confirm(`
      Você - cartas: ${cartasUser}
      Computador - cartas: ${cartasComp}
      Você ganhou!
      
      Quer iniciar uma nova rodada?
      `)) {
         novaRodada = true;
      } else {
         novaRodada = false;
         console.log("O jogo acabou");
         break;
      }

   } else if (pontuacaoUser < pontuacaoComp) {
      console.log("O computador ganhou!");

      if (confirm(`
      Você - cartas: ${cartasUser}
      Computador - cartas: ${cartasComp}
      O computador ganhou!
      
      Quer iniciar uma nova rodada?
      `)) {
         novaRodada = true;
      } else {
         novaRodada = false;
         console.log("O jogo acabou");
         break;
      }
   } else {
      console.log("Empate");

      if (confirm(`
      Você - cartas: ${cartasUser}
      Computador - cartas: ${cartasComp}
      Empate!
      
      Quer iniciar uma nova rodada?
      `)) {
         novaRodada = true;
      } else {
         novaRodada = false;
         console.log("O jogo acabou");
         break;
      }
   }
}