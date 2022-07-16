import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('gateway')
    .setDescription('build a gateway by nestjs')
    .setVersion('1')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};
