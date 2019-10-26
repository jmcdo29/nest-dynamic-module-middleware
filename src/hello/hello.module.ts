import {
  DynamicModule,
  Module,
  NestModule,
  MiddlewareConsumer,
  Logger,
} from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { Request, Response, NextFunction } from 'express';

@Module({
  controllers: [HelloController],
  providers: [Logger, HelloService],
})
export class HelloModule implements NestModule {

  constructor(private readonly logger: Logger) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        this.logger.log('Request made to ' + req.originalUrl);
        next();
      }).forRoutes(HelloController);
  }

  static forRoot(word: string): DynamicModule {
    return {
      module: HelloModule,
      providers: [
        {
          provide: 'HELLO_STRING',
          useValue: word,
        },
      ],
    };
  }

  static forRootAsync(asyncWord: Promise<string>): DynamicModule {
    return {
      module: HelloModule,
      providers: [
        {
          provide: 'HELLO_STRING',
          useFactory: async () => await asyncWord,
        },
      ],
    };
  }
}
