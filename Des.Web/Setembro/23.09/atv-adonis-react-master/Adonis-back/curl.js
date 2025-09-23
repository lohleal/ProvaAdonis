// =======================================================
// =======================================================
// CRUD DE CURSOS
// Create
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome": "Técnico em Mecânica", "duracao": 4}' \
  http://localhost:3333/cursos

// Read
curl http://localhost:3333/cursos
curl http://localhost:3333/cursos/1

// Update
curl -X PUT http://localhost:3333/cursos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Técnico em Meio Ambiente", "duracao": 4}'

// Delete
curl -X DELETE http://localhost:3333/cursos/3

// =======================================================
// =======================================================
// CRUD DE DISCIPLINAS
// Create
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome": "Química I", "carga": 2, "curso_id": 1}' \
  http://localhost:3333/disciplinas

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome": "Matemática Computacional", "carga": 3, "curso_id": 2}' \
  http://localhost:3333/disciplinas

// Read
curl http://localhost:3333/disciplinas
curl http://localhost:3333/disciplinas/1

// Update
curl -X PUT http://localhost:3333/disciplinas/6 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Artes II", "carga": 3, "curso_id": 1}'

// Delete
curl -X DELETE http://localhost:3333/disciplinas/6

// =======================================================
// =======================================================
// CRUD DE ALUNOS
// Create
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome": "Amarildo dos Santos", "curso_id": 1}' \
  http://localhost:3333/alunos

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"nome": "Bianca Oiiveira", "curso_id": 2}' \
  http://localhost:3333/alunos

// Read
curl http://localhost:3333/alunos
curl http://localhost:3333/alunos/1

// Update
curl -X PUT http://localhost:3333/alunos/6 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Mauro Rodrigues", "curso_id": 1}'

// Delete
curl -X DELETE http://localhost:3333/alunos/6

// =======================================================
// =======================================================
// REGISTRO DE MATRÍCULAS
// Create
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"disciplina_id": 1, "aluno_id": 1}' \
  http://localhost:3333/matriculas

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"disciplina_id": 3, "aluno_id": 2}' \
  http://localhost:3333/matriculas

// Read
curl http://localhost:3333/matriculas

// Delete
curl -X DELETE http://localhost:3333/matriculas/1/1/
