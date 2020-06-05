/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */


// - Dicas Gerais (clique para ver)
//     - As cartas dos jogadores (usuário e computador) podem ser armazenadas em  `array`.
//     - Faça cada etapa com calma! Teste bem; e utilize bastante o site fornecido para se basear

// Resolva esta etapa no arquivo `desafio.js`

// Lembre de comentar o link para o script do `nossoJogo.js` enquanto faz o desafio!

// O desafio consiste em adicionar regras ao jogo, mantendo as originais. Faça na ordem solicitada.

// 8 - Se as duas cartas iniciais do usuário ou do computador forem dois ases (`A`), as cartas devem ser sorteadas novamente.

// 9 - Após o sorteio das 2 cartas para cada jogador, as duas primeiras cartas do usuário continuando sendo reveladas. A primeira carta do computador é revelada, a segunda é oculta por enquanto. Você deve perguntar ao usuário se ele deseja comprar mais uma carta. Veja abaixo:

// ```jsx
// confirm(
// 	"Suas cartas são A♥️ J♣️. A carta revelada do computador é 4♣️." +
// 	"\n"+  // \n faz pular a linha
// 	"Deseja comprar mais uma carta?"
// )

// /*

// Este confirm resulta na mensagem:

// 	Suas cartas são A♥️ J♣️. A carta revelada do computador é 4♣️.
// 	Deseja comprar mais uma carta?

// */
// ```

// 10 - A cada carta comprada pelo usuário, a pontuação dele será somada com o valor da nova carta. Ele poderá comprar cartas até atingir a pontuação de 21 pontos; ou até decidir parar de comprar. Assim que o usuário chegar no limite de pontuação, a mensagem de fim de jogo deve ser mostrada, indicando quem venceu. Veja abaixo, uma sequência possível de mensagens mostradas ao usuário (usando `confirm` e `alert`)

// - Dica

//     Os `confirm` devem ser utilizados quando as mensagem são perguntas. Quando formos só mostrar uma informação ao usuário, vamos utilizar o `alert` (como, por exemplo, ao mostrar quem ganhou o jogo)

//     ```jsx
//     alert(
//     "Suas cartas são 3♣️ J♥️ 5♣️ 4♣️ . Sua pontuação é 22.\n" +
//     "As cartas do computador são Q♠️ K♦️ . A pontuação do computador é 20.\n" +
//     "O computador ganhou!"
//     )
//     ```

// ```jsx
// "Quer iniciar uma nova rodada?"
// /* Responde *ok* */

// "Suas cartas são 3♣️ J♥️. A carta revelada do computador é Q♠️."
// "Deseja comprar mais uma carta?"
// /* Responde *ok* */

// "Suas cartas são 3♣️ J♥️ 5♣️ . A carta revelada do computador é Q♠️." 
// "Deseja comprar mais uma carta?"
// /* Responde *ok* */

// /* Mensagem de fim de jogo */
// "Suas cartas são 3♣️ J♥️ 5♣️ 4♣️ . Sua pontuação é 22."
// "As cartas do computador são Q♠️ K♦️ . A pontuação do computador é 20." 
// "O computador ganhou!"
// ```

// 11 - **Quando** o jogador **parar** de comprar cartas (Ter clicado `cancel` ao receber a pergunta "**Deseja comprar mais uma carta?**") **e** tiver a pontuação **menor** ou igual a 21, inicia-se a rodada do computador. Ele deverá comprar cartas até que sua pontuação seja igual ou superior a do usuário. Veja abaixo, uma sequência possível de mensagens mostradas ao usuário.

// ```jsx
// "Quer iniciar uma nova rodada?"
// /* Responde *ok* */

// "Suas cartas são 2♥️ 6♥️. A carta revelada do computador é J♦️." 
// "Deseja comprar mais uma carta?"
// /* Responde *ok* */

// "Suas cartas são 2♥️ 6♥️ 10♠️ . A carta revelada do computador é J♦️." 
// "Deseja comprar mais uma carta?"
// /* Responde *cancel* */

// /* Mensagem de fim de jogo */
// "Suas cartas são 2♥️ 6♥️ 10♠️ . Sua pontuação é 18." 
// "As cartas do computador são J♦️ 5♣️ 8♣️. A pontuação do computador é 23." 
// "O usuário ganhou!"
// ```

// 12 - Se a pontuação do usuário for maior que 21, ele perde o jogo. Se a pontuação do computador for maior que 21 (e a do usuário não for), o usuário ganha o jogo.  Se as pontuações do usuário e do computador forem iguais, o jogo termina em empate.