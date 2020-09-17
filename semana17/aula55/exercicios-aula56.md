# Aula 56

### Exercício 1

a) Salt é um string aleatória adicionada pelo bcryptjs à senha antes de se criar o hash, Rounds são o cost, o fator relacionado à segurança da senha que pode aumentar o tempo de execução do algoritmo. O valor recomendado é 12, que é garante a segurança sem demorar muito o tempo de execução.

b) Função que criptografa uma string utilizando bcryptjs foi implementada.

c) Função compare do bcryptjs foi criada.

### Exercício 2

a) O do cadastro, pois é preciso criar antes as senhas criptografadas para depois checá-las no login.

b) Endpoint de signup alterado.

c) Endpoint de login alterado.

d) Não pois o endpoint de pegar o perfil do usuário utiliza o token, não a senha criptografada.

### Exercício 3

a) Tabela User alterada para receber um valor de role. 

b) AuthenticationData e Authenticator alterados para representarem o token a partir do role.

c) Cadastro alterado para receber o role.

d) Login alterado para gerar o token com base no role.

### Exercício 4

a) Endpoint /user/profile alterado para barra o acesso não autorizado à informação do usuário.

### Exercício 5

a) Função e endpoint de delete criados.

### Exercício 6

a) Endpoint criado.

### Exercício 7

a) Classe BaseDatabase criada.

b) Função destroyConnection implementada.