import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [UsersModule , DatabaseModule, AuthModule, AdminModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
