const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários - Projeto CICD',
      version: '1.0.0',
      description: 'API REST para gerenciamento de usuários, com autenticação, logs e integração com PostgreSQL. Documentação interativa gerada com Swagger.',
      contact: {
        name: 'Alinne',
        email: 'alinne@email.com',
        url: 'https://github.com/alinne',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Operações relacionadas a usuários',
      },
      {
        name: 'Health',
        description: 'Verificação de status da API',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'Maria Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'maria@email.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
              example: '2025-06-08T18:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
              example: '2025-06-08T18:00:00.000Z'
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Usuário não encontrado'
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        BadRequest: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos com as anotações do Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs; 