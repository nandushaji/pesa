import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'instashop',
          password: 'instashop_local',
          database: 'pesa',
          entities: [`${__dirname}/../**/entities/**{.ts,.js}`],
          synchronize: true,
          logging: ['error', 'info', 'query'],
          namingStrategy: new SnakeNamingStrategy(),
        }),
      }),
    ],
  })
  export class DatabaseModule {}
  