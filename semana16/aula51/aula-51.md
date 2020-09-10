# Aula 51 - Introdução a SQL

### Exercício 1
a) São utilizadas VARCHAR para indicar o texto com limite de 255 caracteres para id e name, e 6 para gênero, e DATE para indicar que será uma data.
b) SHOW DATABASES mostra os bancos de dados criados, e SHOW TABLES mostra as tabelas criadas.
c) Ao usar o comando SHOW Actor, o programa indica erro de sintaxe.

### Exercício 2
a) Nas duas inserções, aponta que falta o indicador de gênero.
b) O programa indica que a key primária está duplicada, pois já existe uma linha com esse valor na tabela.
c) Falta birth_date e gender.
d) Falta o nome.
e) A data de nascimento não está entre " ".

### Exercício 3
a) SELECT * from Actor WHERE gender = "female".
b) SELECT name, salary from Actor WHERE name = "Tony Ramos".
c) Não retornou nada, pois todos os gêneros foram preenchidos corretamente.
d) SELECT id, name, salary from Actor WHERE salary > 500000 .
e) O programa não reconhece a query "nome", pois ela está esccrita como "name" na estrutura da tabela. Correção: SELECT id, name from Actor WHERE id = "002" .

### Exercício 4
a) SELECT * from Actor
WHERE (name LIKE "A%" OR name LIKE "J%") AND salary > 300000 . A query primeira seleciona todos os dados de Actor, depois busca nomes que comecem com A ou J, usando o termo LIKE e salário maior que 300000
b) SELECT * from Actor
WHERE name NOT LIKE "A%" AND salary > 350000
c) SELECT * from Actor
WHERE name LIKE "%g%" OR name LIKE "%G%"
d) SELECT * from Actor
WHERE (name LIKE "%g%" OR name LIKE "%G%" OR name LIKE "%a%" OR name LIKE "%A%") AND salary BETWEEN 350000 AND 900000


### Exercício 5
a)
CREATE TABLE Movie (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    sinopse VARCHAR (255) NOT NULL,
    debut_date DATE NOT NULL,
    rating FLOAT NOT NULL
)
Criou-se a tabela com a estrutura de id, name e sinopse, como strings, debut, como data e rating como um número que pode não ser inteiro.

b) INSERT INTO Movie (id, name, sinopse, debut_date, rating)
VALUES (
	"001",
    "Se Eu Fosse Você",
	"Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos",
    "2006-01-06",
    7
)

c) INSERT INTO Movie (id, name, sinopse, debut_date, rating)
VALUES (
	"002",
    "Doce de mãe",
	"Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela",
    "2012-12-27",
    10
)

d) INSERT INTO Movie (id, name, sinopse, debut_date, rating)
VALUES (
	"003",
    "Dona Flor e Seus Dois Maridos",
	"Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce.",
    "2007-11-02",
    8
)

e) INSERT INTO Movie (id, name, sinopse, debut_date, rating)
VALUES (
	"004",
    "Bacurau",
	"Pouco após a morte de dona Carmelita, aos 94 anos, os moradores de um pequeno povoado localizado no sertão brasileiro, chamado Bacurau, descobrem que a comunidade não consta mais em qualquer mapa.",
    "2019-08-29",
    9
)

### Exercício 6
a) UPDATE Actor
SET
	name = "Moacyr Franco",
    birth_date = "2020-02-10"
WHERE id = "003"

b) UPDATE Actor
SET
	name = "JULIANA PÃES"
WHERE name = "Juliana Paes"

UPDATE Actor
SET
	name = "Juliana Paes"
WHERE name = "JULIANA PÃES"

c) UPDATE Actor
SET 
	name = "Vera Fischer",
	birth_date = "1951-11-27",
    salary = 0,
    gender = "female"
WHERE id = "005";

d) Não aparece mensage de erro mas aparece 0 mudanças na tabela.

### Exercício 7
a) DELETE FROM Actor
WHERE name = "Fernanda Montenegro"
b) DELETE FROM Actor
WHERE gender = "male" AND salary > 1000000

### Exercício 8
a) A query conta quanto elementos existem em cada grupo definido pelo gênero
b) SELECT id, name FROM Actor
ORDER BY name DESC
c) SELECT * FROM Actor
ORDER BY salary ASC
d) SELECT * FROM Actor
ORDER BY salary DESC
LIMIT 3
e) SELECT AVG(salary), gender FROM Actor
GROUP BY gender

### Exercício 9
a) SELECT MAX(salary) FROM Actor
b) SELECT MIN(salary) FROM Actor
WHERE gender = "female"
c) SELECT COUNT(*) FROM Actor
WHERE gender = "female"
d) SELECT SUM(salary) FROM Actor

### Exercício 10
a) SELECT * FROM Movie
ORDER BY name ASC
b) SELECT * FROM Movie
ORDER BY name DESC
LIMIT 5
c) SELECT * FROM Movie
ORDER BY debut_date DESC
LIMIT 3
d) SELECT * FROM Movie
ORDER BY rating DESC
LIMIT 3

### Exercício 11
a) SELECT * FROM Movie
ORDER BY rating DESC
LIMIT 3
b) SELECT * FROM Movie
WHERE name = "Bacurau"
c) SELECT id, name, sinopse FROM Movie
WHERE rating > 7

### Exercício 12
a) SELECT * FROM Movie
WHERE sinopse LIKE "%vida%"
b) SELECT * FROM Movie
WHERE sinopse LIKE "%termo de busca%" OR name LIKE "%termo de busca%"
c) SELECT * FROM Movie
WHERE debut_date < "2020-09-08"
d) SELECT * FROM Movie
WHERE debut_date < "2020-09-08" AND (sinopse LIKE "%busca%" OR name LIKE "%busca%") AND rating > 7

ou

SELECT * FROM Movie
WHERE debut_date < CURDATE() AND (sinopse LIKE "%busca%" OR name LIKE "%busca%") AND rating > 7

### Exercício 13
a) Delete a coluna salário
b) Altera a coluna gênero para sexo
c) Aumenta o número de caracteres aceitos na coluna gênero
d) ALTER TABLE Actor CHANGE gender gender VARCHAR(100)

### Exercício 14
a) ALTER TABLE Movie ADD playing_limit_date DATE
b) ALTER TABLE Movie CHANGE rating rating FLOAT;
c) UPDATE Movie
SET
	playing_limit_date = "2020-12-31"
WHERE id = "001"
d) Ele não mostra erros, mas apresenta 0 mudanças.

### Exercício 15
a) SELECT COUNT(*) FROM Movie WHERE rating > 7.5;
b) SELECT COUNT(*) FROM Movie WHERE rating > 7.5;
c) SELECT COUNT(*) FROM Movie WHERE debut_date > CURDATE()
d) SELECT MAX(rating) FROM Movie 
e) SELECT MIN(rating) FROM Movie