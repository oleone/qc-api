/* Exportações de modulos nestjs */
import { Module } from '@nestjs/common';

/* Importações de modulos externos */
import { MongooseModule } from '@nestjs/mongoose';

/* Importações internas */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    ConfigModule,
    /* Mongoose config */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
