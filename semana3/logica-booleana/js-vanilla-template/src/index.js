// Exercícios de interpretação
// Exercício 1

const bool1 = true
const bool2 = false
const bool3 = !bool2

let resultado = bool1 && bool2 && bool3
console.log("a. ", resultado)
// a. false

resultado = (bool2 || bool1) && !bool3
console.log("b. ", resultado)
// b. false

resultado = !resultado && (bool1 || bool1)
console.log("c. ", resultado)
// c. true

resultado = (resultado && (!bool1 || bool2)) && !bool3
console.log("d. ", resultado)
// d. false

console.log("e. ", typeof resultado)
// e. boolean


// Exercício 2

let array
console.log('I. ', array)
// I. undefined

array = null
console.log('II. ', array)
// II. null

array = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
console.log('III. ', array.length)
// III. 11

let i = 0
console.log('IV. ', array[i], " e ", array[i+1])
// IV. 3 e 4

array[i+1] = 19
const valor = array[i+6]
console.log('V. ', array[i+1], " e ", valor)
// V. 19 e 9

i+=1
array[i] = array[i-1]
console.log('VI. ', array[i])
// VI. 3

i = array.length - 1
array[i] = array[i-3]
const resultadoC = array[i]%array[1]
console.log('VII. ', resultadoC)
// VII. 1

// a. O que é `array` e como se declara em `JS`?
// Array é um conjunto de elementos (numbers, strings etc.) e é declarado entre [ ]
// (const ou let array = [x, y, z])

// b. Qual o index inicial de um `array`?
// [0]

// c. Como se determinar o tamanho do `array`?
// array.length

// d. Indique todas as mensagens impressas no console.
// index.js:9 a.  false
// index.js:13 b.  false
// index.js:17 c.  true
// index.js:21 d.  false
// index.js:24 e.  boolean
// index.js:31 I.  undefined
// index.js:34 II.  null
// index.js:38 III.  11
// index.js:41 IV.  3  e  4
// index.js:45 V.  19  e  9
// index.js:49 VI.  3
// index.js:54 VII.  1


// Exercícios de escrita
// Exercício 1

// - Graus Fahrenheit(°F) para Kelvin(K)
// (KELVIN) = (GRAUS_FAHRENHEIT - 32)*5/9 + 273.15

// - Graus Celsius(°C) para Graus Fahrenheit (°C)
// (GRAUS_FAHRENHEIT) = (GRAUS_CELSIUS)*9/5 + 32

// a. Calcule e mostre o valor de 77°F em  K, mostrando a unidade no console também.
let valorK = (77 - 32)*5/9 + 273.15
console.log("a. " + valorK + "°K")

// b. Calcule e mostre o valor de 80°C em °F, mostrando a unidade no console também.
let valorF = 80*9/5 + 32
console.log("b. " + valorF + "°F")

// c. Calcule e mostre o valor de 30°C em °F e K, mostrando as unidades no console também.
let newValorF = 30*9/5 + 32
let newValorK = (newValorF - 32)*5/9 + 273.15
console.log("c. " + newValorF + "°F e " + newValorK + "°K")

// d. Altere o último item para que o usuário insira o valor em graus Celsius que ele deseja converter.
let grausC = prompt("Insira o valor em °C")
let grausF = (grausC)*9/5 + 32
let grausK = (grausF - 32)*5/9 + 273.15
console.log("d. " + grausC + "°C equivale a " + grausF + "°F e " + grausK + "°K")


// Exercício 2

// Faça um programa que faça 5 perguntas para o usuário (pode ser criativo nesta parte). Imprima-as com as respostas no console da seguinte forma:

// 1. Qual o seu endereço?
// 	Resposta: Rua ABC, 123

// 	2. Qual a sua cor favorita?
// 	Resposta: Azul

const pergunta1 = "1. Com quantos anos você descobriu que o logo do Carrefour era um C?"
const resposta1 = "Resposta: " + prompt(pergunta1)

const pergunta2 = "2. O certo é mexerica, tangerina ou bergamota?"
const resposta2 = "Resposta: " + prompt(pergunta2)

const pergunta3 = "3. O certo é o arroz embaixo do feijão ou o feijão embaixo do arroz?"
const resposta3 = "Resposta: " + prompt(pergunta3)

const pergunta4 = "4. Pizza de estrogonofe: pecado ou heresia?"
const resposta4 = "Resposta: " + prompt(pergunta4)

const pergunta5 = "5. Você coloca purê de batata no cachorro quente ou não mistura carboidratos?"
const resposta5 = "Resposta: " + prompt(pergunta5)

console.log(pergunta1 + "\n" + resposta1 + "\n" + pergunta2 + "\n" + resposta2 + "\n" + pergunta3 + "\n" + resposta3 + "\n" + pergunta4 + "\n" + resposta4 + "\n" + pergunta5 + "\n" + resposta5)

// Exercício 3

// Quilowatt-hora é uma unidade de energia; e é muito utilizada para se determinar o consumo de energia elétrica em residências. Sabe-se que o quilowatt-hora de energia custa R$0.05. Faça um programa que receba a quantidade de quilowatts consumida por uma residência.
// a. Calcule e mostre o valor a ser pago por uma residência que consuma 280 quilowatt-hora;
const custoKwh = 0.05
const custoResidencia = 280 * custoKwh
console.log(custoResidencia)

// b. Altere o programa para receber mais um valor: a porcentagem de desconto. Calcule e mostre o valor a ser pago pela mesma residência acima considerando 15% de desconto.
const custoResidenciaDesconto = (280 * custoKwh) * 0.85
console.log(custoResidenciaDesconto)

// Desafios

// Todos os exercícios aqui são de escrita de código! 

// 1. Um grande problema que o mundo tem atualmente é a quantidade de unidades que existem para representar a mesma coisa. Por exemplo, para representar a Massa de um corpo, podemos usar quilograma (kg), onça (oz) e até libra (lb). Para representar Distâncias, existem metro (m), pés (ft), milha (mi). Até para volumes, há várias opções: litro (l), galão (gal),  xícaras (xic). Dada essa introdução, faça o que se pede:

//     a. Procure uma forma de converter libra (lb) para quilograma (kg) e escreva um programa que converta 20lb para kg. Imprima  a resposta no console da seguinte forma: 
//     `20lb equivalem a X kg`
const kg = 20 / 2.2046
console.log("20lb equivalem a " + kg + "kg")

//     b. Procure uma forma de converter onça (oz) para quilograma (kg) e escreva um programa que converta 10.5oz para kg. Imprima  a resposta no console da seguinte forma: 
//     `10.5oz equivalem a X kg`
const oz = 10.5 * 0.02835
console.log("10.5oz equivalem a " + oz + "kg")

//     c. Procure uma forma de converter milha (mi) para metro (m) e escreva um programa que converta 100mi para m. Imprima  a resposta no console da seguinte forma: 
//     `100mi equivalem a X m`
const metro = 100 * 160934
console.log("100mi equivalem a " + metro + "m")

//     d. Procure uma forma de converter pés (ft) para metro (m) e escreva um programa que converta 50ft para m. Imprima  a resposta no console da seguinte forma: 
//     `50ft equivalem a X m`
const pes = 50 * 0.3048
console.log("50ft equivalem a " + pes + "m")

//     e. Procure uma forma de converter galão (gal) para litro (l) e escreva um programa que converta 103.56gal para litro. Imprima  a resposta no console da seguinte forma: 
//     `103.56gal equivalem a X l`
const litro = 103.56 * 3.78541
console.log("103.5gal equivalem a " + litro + "l")

//     f. Procure uma forma de converter xícara (xic) para litro (l) e escreva um programa que converta 450xic para litro. Imprima  a resposta no console da seguinte forma: 
//     `450 xic equivalem a X l`
const xicLitro = 450 * 0.24
console.log("450 xic equivalem a " + xicLitro + "l")

//     g. Escolha ao menos **um** dos itens anteriores e modifique o programa para que ele peça ao usuário o valor da unidade original antes de converter.
const valorLibra = prompt("Insira o número libras para ver quanto enquiva em quilogramas")
const valorKg = valorLibra / 2.2046

console.log( valorLibra + "lb equivale a " + valorKg + "kg")