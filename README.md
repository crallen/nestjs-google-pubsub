# nestjs-google-pubsub

Subscribe to Google Cloud PubSub topics using NestJS's EventMessage handlers.

## Installation

```
# NPM
npm install nestjs-google-pubsub

# Yarn
yarn add nestjs-google-pubsub
```

## Usage

The PubSubServer follows the same [microservice convention](https://docs.nestjs.com/microservices/basics) used by other NestJS integrations:

```typescript
import { NestFactory } from '@nestjs/core';
import { PubSubServer } from 'nestjs-google-pubsub';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new PubSubServer({
      projectId: 'my-gcp-project',
      // other PubSub client options
      topics: {
        'my-topic': {
          subscriptionId: 'my-subscription'
        }
      }
    })
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
```

Next, set up a handler somewhere in your app:

```typescript
import { Message } from '@google-cloud/pubsub';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MyController {
  @EventPattern('my-topic')
  async handleMyTopicEvent(data: Message) {
    // business logic
  }
}
```

## Configuration

The PubSubServer constructor takes in an options object that supports all of the same fields that the PubSub client supports. For more information on these options, visit the [PubSub documentation](https://googleapis.dev/nodejs/pubsub/latest/global.html#ClientConfig).

The only required option in the configuration is a map of topic IDs to subscription IDs. To be consistent with how other message queue systems work, the topic ID is specified in the `EventPattern` decorator. For PubSub, we also need the subscription ID. This can be specified in the `topics` field of the configuration object.

```typescript
const app = await NestFactory.createMicroservice(AppModule, {
  strategy: new PubSubServer({
    topics: {
      'my-topic': {
        subscriptionId: 'my-subscription'
      }
    }
  })
});
```