import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./user/user.module";
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: "mysql",                                    
    host: process.env.DB_HOST,                        
    username: process.env.DB_USERNAME,                
    password: process.env.DB_PASSWORD,                
    database: process.env.DB_NAME,                    
    port: parseInt(process.env.DB_PORT || "3306", 10), 
    autoLoadEntities: true,                           
    synchronize: true,
  })],
}) 
 
export class AppModule {}
