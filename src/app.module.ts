import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exceiptionLogger.filter';
// import { ExceptionsLoggerFilter } from './utils/exceiptionLogger.filter';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        // entities: [__dirname + '/../**/*.entity.ts'],
        // entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')]
        synchronize: true,
      }),
    }),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },],
})
export class AppModule { }
