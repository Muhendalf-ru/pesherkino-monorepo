import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin endpoints for managing users')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('admin/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customCss: `
    /* Глобальные стили */
    body, .swagger-ui, .swagger-ui .wrapper {
      background-color: #0f111a !important;
      color: #e0e0e0 !important;
      font-family: "Inter", "Helvetica", sans-serif;
      transition: background 0.3s, color 0.3s;
    }

    /* Верхняя панель с градиентом */
    .swagger-ui .topbar {
      background: linear-gradient(90deg, #1f1f3a, #3a3a7a) !important;
      border-bottom: 1px solid #333;
      box-shadow: 0 4px 12px rgba(0,0,0,0.7);
    }
    .swagger-ui .topbar a, .swagger-ui .topbar .topbar-wrapper .link {
      color: #ffffff !important;
      font-weight: 600;
    }

    /* Заголовки и ссылки */
    .swagger-ui .info, .swagger-ui .info .base-url, .swagger-ui a {
      color: #81d4fa !important;
      text-decoration: none;
      transition: color 0.2s;
    }
    .swagger-ui a:hover {
      color: #4fc3f7 !important;
    }

    /* Блоки операций с анимацией */
    .swagger-ui .opblock {
      background-color: #1a1a2e !important;
      border: 1px solid #333 !important;
      border-radius: 12px !important;
      margin-bottom: 16px;
      transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
      overflow: hidden;
    }
    .swagger-ui .opblock:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.7);
    }

    /* Заголовки операций */
    .swagger-ui .opblock-summary {
      background-color: #272746 !important;
      color: #fff !important;
      font-weight: 600;
      border-radius: 12px;
      transition: background 0.3s;
    }
    .swagger-ui .opblock-summary:hover {
      background-color: #3f3f8a !important;
    }

    /* Кнопки */
    .swagger-ui .opblock .try-out, 
    .swagger-ui .opblock .execute, 
    .swagger-ui .opblock .authorize {
      background-color: #4fc3f7 !important;
      color: #121212 !important;
      border-radius: 8px !important;
      font-weight: 600;
      transition: background 0.2s, transform 0.2s;
    }
    .swagger-ui .opblock .try-out:hover, 
    .swagger-ui .opblock .execute:hover, 
    .swagger-ui .opblock .authorize:hover {
      background-color: #29b6f6 !important;
      transform: translateY(-1px);
    }

    /* Поля ввода */
    .swagger-ui input, .swagger-ui select, .swagger-ui textarea {
      background-color: #272746 !important;
      color: #e0e0e0 !important;
      border: 1px solid #444 !important;
      border-radius: 8px !important;
      transition: border-color 0.2s, background 0.2s;
    }
    .swagger-ui input:focus, .swagger-ui select:focus, .swagger-ui textarea:focus {
      border-color: #4fc3f7 !important;
      outline: none;
    }

    /* Ответы с анимацией раскрытия */
    .swagger-ui .responses-inner {
      background-color: #1f1f33 !important;
      color: #e0e0e0 !important;
      border-radius: 10px;
      border: 1px solid #333;
      transition: max-height 0.4s ease, background 0.3s;
      overflow: hidden;
    }
    .swagger-ui .opblock .responses-wrapper {
      max-height: 0;
      transition: max-height 0.4s ease;
    }
    .swagger-ui .opblock.opblock-open .responses-wrapper {
      max-height: 1000px; /* плавное раскрытие */
    }

    /* Цветные статусы HTTP */
    .swagger-ui .response-col_status[title^="2"] { color: #4caf50 !important; } /* success */
    .swagger-ui .response-col_status[title^="3"] { color: #ff9800 !important; } /* redirect/warning */
    .swagger-ui .response-col_status[title^="4"] { color: #f44336 !important; } /* client error */
    .swagger-ui .response-col_status[title^="5"] { color: #e91e63 !important; } /* server error */

    /* Код в ответах */
    .swagger-ui .response-col_description, 
    .swagger-ui .response-col_links, 
    .swagger-ui .response-col_schema {
      color: #ffcc80 !important;
    }

    .swagger-ui .scheme-container {
    background-color: #1f1f33 !important;
    }
  `,
    customSiteTitle: 'Admin API - Dark Mode',
  });
}
