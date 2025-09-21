# dev-full-stack-puc-bloco3-front-end

## O que o projeto faz

Este projeto é o front-end de uma aplicação de hábitos sustentáveis, permitindo ao usuário cadastrar, visualizar, editar e excluir hábitos, além de acompanhar gráficos e estatísticas de economia de energia, transporte e alimentação. A interface é construída com React e Material UI, integrando-se a um back-end via API REST.

## Pré-requisitos
- Docker e Docker Compose (opcional, para rodar com Docker)
- Aplicação Auth API
- Aplicação Habits API

## Como rodar com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. No diretório do projeto, execute o comando abaixo para construir e iniciar o container:

```
docker-compose up --build
```

3. O front-end estará disponível em [http://localhost:3000](http://localhost:3000).

Se precisar parar o container, use:
```
docker-compose down
```

Acesse pela URL [http://localhost:3000](http://localhost:3000) no seu navegador.