# Aula 55

### Exercício 1

a) É melhor usar string pois amplia o número de opções de ids, podendo acrescentar maiúsculas, minúscula, símbolos etc.

b) Criada classe com método público para gerar id.


### Exercício 2

a) Na primeira parte do código, ele se conecta com um banco, da segunda cria uma função que adiciona um usuário a uma tabela específica do banco.

b)

CREATE TABLE User (<br>
	id VARCHAR(255) PRIMARY KEY, <br>
    name VARCHAR(255) NOT NULL, <br>
    email VARCHAR(255) UNIQUE NOT NULL, <br>
    password VARCHAR(255) NOT NULL <br>
);

c) Criada classe responsável pela criação do usuário.

d) Novo usuári instanciado no index.


### Exercício 3

a) Ela avisa que o process.env.JWT_KEY virá como uma string, não undefinied

b) Criada classe de autenticação e interface.


### Exercício 4

a) Endpoint de método post e path /signup criado.

b) Validação do endpoint de email criada.

c) Validação do endpoint de senha criada. Foi criada também uma validação para não aceitar input name inválido.


### Exercício 5

a) Classe UserDatabase alterada para ter um método que retorna informações do usuário.

b) Função testada e fica <pending>.


### Exercício 6

a) Criado endpoint de login com método POST e path "/login".

b) Validação de email criada.


### Exercício 7

a) Ela tipa que será recebido de jwt.verify. Ela é necessária, pois nosso script do typescript não aceita any implícito, logo, todos os elementos recebidos devem ser tipados.

b) A função foi inserida na classe Authenticator.


### Exercício 8

a) Classe do banco alterada para ter um método que retorna o usuário pelo id.

b) Endpoint para retornar o usuário com método get e path "/user/profile" criado.