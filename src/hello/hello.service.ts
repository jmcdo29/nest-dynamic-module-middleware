import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HelloService {

  constructor(@Inject('HELLO_STRING') private readonly helloWord: string) {}

  sayHello(): string {
    return `Hello ${this.helloWord}!`;
  }
}
