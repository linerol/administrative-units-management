import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


import { CreateDepartmentDto } from './dtos/department/create-department.dto';
import { CreateCommuneDto } from './dtos/commune/create-commune.dto';
import { CreateDistrictDto } from './dtos/district/create-district.dtp';

import { UpdateDepartmentDto } from './dtos/department/update-department.dto';
import { UpdateCommuneDto } from './dtos/commune/update-commune.dto';
import { UpdateDistrictDto } from './dtos/district/update-district.dtp';



export interface SwaggerDocumentOptions {
    /**
     * List of modules to include in the specification
     */
    include?: Function[];

    /**
     * Additional, extra models that should be inspected and included in the specification
     */
    extraModels?: Function[];

    /**
     * If `true`, swagger will ignore the global prefix set through `setGlobalPrefix()` method
     */
    ignoreGlobalPrefix?: boolean;

    /**
     * If `true`, swagger will also load routes from the modules imported by `include` modules
     */
    deepScanRoutes?: boolean;

    /**
     * Custom operationIdFactory that will be used to generate the `operationId`
     * based on the `controllerKey` and `methodKey`
     * @default () => controllerKey_methodKey
     */
    operationIdFactory?: (controllerKey: string, methodKey: string) => string;
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cors());

    const config = new DocumentBuilder()
        .setTitle('Adminitratives units management')
        .setDescription('The administrative units management API allows you to create departments, communes and district by sending request on the roads provided.')
        .setVersion('1.0')
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => methodKey
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document);


    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
