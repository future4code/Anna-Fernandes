# Projeto LAMA
## Gerenciamento de shows em três dias (sexta, sábado e domingo)

### 1. Cadastro
    O sistema permite o registro dos usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

### 2. Login
    Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

### 3. Endpoint de registrar banda
    O sistema registra todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. **Somente administradores** podem registrar bandas.

### 4. Endpoint de visualização de detalhes sobre a banda 🖲
    Esse endpoint deve receber o id **ou** o nome da banda e retornar as todas as informações salvas sobre ela.

### 5. Endpoint de adicionar um show a um dia
    Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.

    Caso já exista um show marcado para o dia e o horário em questão, o seu endpoint retorna um erro.

### 6. Endpoint de pegar todos os shows de uma data
    Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.

### 7. Endpoint de criar um ingresso
    O caso de uso desse endpoint é o administrador do sistema querendo criar ingressos para serem vendidos. Para criar, precisa indicar: nome do ingresso, valor, o id do evento e a quantidade de ingressos. No banco, você deve guardar a quantidade de ingressos totais e criar um campo "quantidade de ingressos vendidos" com o valor 0 para guardar esse registro. **Somente administradores** podem registrar ingressos.

### 8. Comprar ingresso
    Deve receber a quantidade de ingressos e o nome. Deve retornar erros específicos para um nome inválido, ingresso não encontrado e quantidade inválida (ou seja se existem menos ingressos disponíveis do que o usuário quer comprar)

### 9.  Adicionar foto
    Você deve criar um endpoint que adiciona uma foto para a galeria de um evento. Elas devem ser armazenadas como links no banco de dados.

### 10. Pegar todas as fotos
    O endpoint receberá o identificador do evento e devolverá todas as fotos deste.

**Bônus:** Crie uma página de Frontend em React e para que o administrador consiga entrar no site e ver todas as fotos que foram tiradas, consumindo o endpoint que você criou. Não precisa fazer o resto do front-end da aplicação, não se preocupe. A forma da página é livre, e você pode criar outro projeto, apartado desse, se preferir, para fazer esse pedacinho.