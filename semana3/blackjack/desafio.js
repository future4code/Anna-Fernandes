console.log("Bem-vindo ao jogo");

let novaRodada = false;

if (confirm("Quer iniciar uma nova rodada?")) {
   novaRodada = true;
} else {
   novaRodada;
   console.log("O jogo acabou");
}

if (novaRodada) {

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

   for (let elemento of user) {
      cartasUser.push(elemento.texto)
      pontuacaoUser += Number(elemento.valor)
   }

   for (let elemento of comp) {
      cartasComp.push(elemento.texto)
      pontuacaoComp += Number(elemento.valor)
   }

   console.log(`Usuário - cartas: ${cartasUser} - pontuação ${pontuacaoUser}`);
   console.log(`Computador - cartas: ${cartasComp} - pontuação ${pontuacaoComp}`);

   let compra = false;

   if (confirm(`Suas cartas são ${cartasUser}. A carta revelada do computador é ${cartasUser[0]}
   Deseja comprar mais uma?
   `)) {
      console.log("Compra mais uma");
      compra = true;
   } else {
      console.log("não compra");
      compra = false;

      if (pontuacaoUser > pontuacaoComp) {
         console.log("O usuário ganhou!");

         if (confirm(`
         Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
         As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
         Você ganhou!
         
         Quer iniciar uma nova rodada?
         `)) {
            novaRodada = true;
         } else {
            novaRodada = false;
            console.log("O jogo acabou");
         }

      } else if (pontuacaoUser < pontuacaoComp) {
         console.log("O computador ganhou!");

         if (confirm(`
         Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
         As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
         O computador ganhou!
         
         Quer iniciar uma nova rodada?
         `)) {
            novaRodada = true;
         } else {
            novaRodada = false;
            console.log("O jogo acabou");
         }
      } else if (pontuacaoUser === pontuacaoComp) {
         console.log("Empate");

         if (confirm(`
         Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
         As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
         Empate!
         
         Quer iniciar uma nova rodada?
         `)) {
            novaRodada = true;
         } else {
            novaRodada = false;
            console.log("O jogo acabou");
         }
      } else if ((cartasUser[0] === "A") && (cartasComp[0] === "A")) {
         // 8 - Se as duas cartas iniciais do usuário ou do computador forem dois ases (`A`), as cartas devem ser sorteadas novamente.
         console.log("Tente de novo");
         if (confirm(`
         Suas cartas são ${cartasUser}. Sua pontuação '${pontuacaoUser}.
         As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
         Empate!
         
         Você deve iniciar uma nova rodada.
         `)) {
            novaRodada = true;
         } else {
            console.log(`Usuário - cartas: ${cartasUser} - pontuação ${pontuacaoUser}`);
            console.log(`Computador - cartas: ${cartasComp} - pontuação ${pontuacaoComp}`);
            console.log("O jogo acabou");
            if (pontuacaoUser < pontuacaoUser) {
               alert(`
               Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               O computador ganhou!
               `)
            } else if (pontuacaoUser > pontuacaoUser) {
               alert(`
               Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               Você ganhou!
               `)
            } else {
               alert(`
               Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               Empatou!
               `)
            }
            novaRodada = false;
         }
      }
   }

   while (compra) {

      const novacarta = comprarCarta();
      user.push(novacarta);
      cartasUser = [];
      pontuacaoUser = 0;

      for (let elemento of user) {
         cartasUser.push(elemento.texto)
         pontuacaoUser += Number(elemento.valor)
      }

      console.log(cartasUser);
      console.log(pontuacaoUser);

      if (pontuacaoUser <= 21) {

         console.log("Segue comprando");

         if (confirm(`
         Suas cartas são ${cartasUser}. A carta revelada do computador é ${cartasUser[0]}.
         Deseja comprar mais uma carta?
         `)) {
            compra = true;
         } else {
            compra = false;
            console.log("O jogo acabou. Usuário não quis mais cartas.");

            while (pontuacaoComp <= pontuacaoUser) {
               const novacarta = comprarCarta();
               comp.push(novacarta);
               cartasComp = [];
               pontuacaoComp = 0;

               for (let elemento of comp) {
                  cartasComp.push(elemento.texto)
                  pontuacaoComp += Number(elemento.valor)
               }

               console.log(cartasComp);
               console.log(pontuacaoComp);
            }

            if ((pontuacaoUser < pontuacaoComp && pontuacaoComp <= 21) || (pontuacaoUser > pontuacaoComp && pontuacaoUser > 21)) {
               alert(`
               Suas cartas são ${cartasUser}. A sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               O computador ganhou!
               `)
            } else if ((pontuacaoUser > pontuacaoComp && pontuacaoUser <= 21) || (pontuacaoUser < pontuacaoComp && pontuacaoComp > 21)) {
               alert(`
               Suas cartas são ${cartasUser}. A sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               Você ganhou!
               `)
            } else {
               alert(`
               Suas cartas são ${cartasUser}. A sua pontuação é ${pontuacaoUser}.
               As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
               Empatou!
               `)
            }
            break;
         }
      } else {
         compra = false;
         console.log("O jogo acabou. Aguarde a rodada do computador");

         while (pontuacaoComp <= pontuacaoUser) {
            const novacarta = comprarCarta();
            comp.push(novacarta);
            cartasComp = [];
            pontuacaoComp = 0;

            for (let elemento of comp) {
               cartasComp.push(elemento.texto)
               pontuacaoComp += Number(elemento.valor)
            }

            console.log(cartasComp);
            console.log(pontuacaoComp);
         }

         if ((pontuacaoUser < pontuacaoComp && pontuacaoComp <= 21) || (pontuacaoUser > pontuacaoComp && pontuacaoUser > 21)) {
            alert(`
            Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
            As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
            O computador ganhou!
            `)
         } else if ((pontuacaoUser > pontuacaoComp && pontuacaoUser <= 21) || (pontuacaoUser < pontuacaoComp && pontuacaoComp > 21)) {
            alert(`
            Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
            As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
            Você ganhou!
            `)
         } else {
            alert(`
            Suas cartas são ${cartasUser}. Sua pontuação é ${pontuacaoUser}.
            As cartas do computador são ${cartasComp}. A pontuação do computador é ${pontuacaoComp}.
            Empatou!
            `)
         }
      }
   }
}
