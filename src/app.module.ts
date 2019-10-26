import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [HelloModule.forRootAsync(Promise.resolve('Test User'))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
