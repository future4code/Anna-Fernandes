# Aula 53

### Exercício 1
a) É uma key que se relaciona a outra tabela.
b) Criada.
c) Aparece a mensagem de errado informando que a foreign key falhou.
d) Deletado.
e) Apresenta um erro dizendo que não é possível deletar um filme referenciado em uma foreign key.

### Exercício 2
a) Ela chama a id de um filme e a id de um ator relacionadas a outras tabela e forma uma nova tabela.
b) Ok.
c) Aparece a mensagem de errado informando que a foreign key falhou.
d) Apresenta um erro dizendo que não é possível deletar um filme referenciado em uma foreign key.

### Exercício 3
a) O ON intersecciona os valores que devem ser iguais.
b) SELECT m.id as movie_id, r.rate as rating FROM Movie m
INNER JOIN Rating r ON m.id = r.movie_id;

### Exercício 4
a) SELECT m.id as movie_id, m.name, r.rate as rating, r.comment as rating_comment FROM Movie m
LEFT JOIN Rating r ON m.id = r.movie_id;
b) SELECT m.id as movie_id, m.name, mc.actor_id FROM Movie m
RIGHT JOIN MovieCast mc ON mc.movie_id = m.id;
c) SELECT AVG(r.rate), m.id, m.name FROM Movie m
LEFT JOIN Rating r ON m.id = r.movie_id
GROUP BY (m.id);

### Exercício 5
a) Porque são primeiro deve-se juntar uma tabela e, depois, a outra.
b) SELECT m.id as movie_id, m.name, a.id as actor_id, a.name FROM Movie m
LEFT JOIN MovieCast mc ON m.id = mc.movie_id
JOIN Actor a ON a.id = mc.actor_id;
c) Ela agrupa as tabelas de filme e de atores e mostra o id e o nome do filme, o nome do ator e seu id.
d) SELECT 
		m.id as movie_id, 
    m.name, 
    a.id as actor_id, 
    a.name, 
    r.rate, 
    r.comment 
FROM Movie m
LEFT JOIN Rating r on r.movie_id = m.id
LEFT JOIN MovieCast mc ON m.id = mc.movie_id
JOIN Actor a ON a.id = mc.actor_id;

### Exercício 6
a) M:N.
b) CREATE TABLE Oscar (
	oscar_id  VARCHAR(255) PRIMARY KEY,
    oscar_category VARCHAR(255) NOT NULL,
    oscar_date DATE NOT NULL
);
CREATE TABLE OscarMovie (
		movie_id VARCHAR(255),
		oscar_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (oscar_id) REFERENCES Oscar(oscar_id)
);
c) Ok.
d) SELECT * FROM Movie
RIGHT JOIN OscarMovie ON Movie.id = oscar_id;