<h1 align="center">Easy Decorators</h1>
<p align="center">A simple library to create your own Typescript decorators and your mini-frameworks.</p>

<p align="center">
  <img src="https://badgen.net/npm/v/@muryllo/easy-decorators"/>
  <img src="https://badgen.net/npm/dt/@muryllo/easy-decorators"/>
  <img src="https://badgen.net/npm/license/@muryllo/easy-decorators"/>
  <img src="https://badgen.net/npm/types/@muryllo/easy-decorators"/>
  <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

## Getting started into Easy Decorators!

<p align="justify">To use this library and create your decorators, you need to import the library into your code and use a decorator template to build your own decorator. In Easy Decorators there are 4 types of decorator templates: 

  1. Class Decorators; 
  2. Property Decorators; 
  3. Method Decorators;
  4. Parameter Decorators

Each decorator adds metadata that is stored in the instance of the class that can be accessed from the getEasyMetadata function.</p>

## Installation

<p align="center">
  <img src="https://nodei.co/npm/@muryllo/easy-decoradors?downloads=true&downloadRank=true&stars=true" alt="Installation"/>
</p>

<p align="justify">You must run the following terminal command.<p>

```
npm install @muryllo/easy-decorators --save
```

## How to use?

Take a look at the example below and see the practical application of the 4 types of decorators. Console log output shows the metadata attached to the instance of the decorated class.

```ts
import { 
  EasyClassDecorator
} from './decorators';

const MyDecorator = () => EasyClassDecorator('my:key', { /* My metadata */ });

@MyDecorator()
class Sample {

}
```

```ts
import { 
  EasyClassDecorator, 
  EasyMethodDecorator, 
  EasyParameterDecorator, 
  EasyPropertyDecorator, 
  getEasyMetadata 
} from './decorators';

//Creating the decorators using a base decorator.
const WebSockController = (addr: string) => EasyClassDecorator('ws:address', addr);
const WebSockClient     = () => EasyPropertyDecorator('ws:client', {});
const WebSockEvent      = (event: string) => EasyMethodDecorator('ws:event', event);
const WebSockData       = () => EasyParameterDecorator('ws:parameter', {});

@WebSockController('ws://localhost:3000')
class WebSock {

  @WebSockClient()
  public client: any;

  @WebSockEvent('ping')
  onMessage(@WebSockData() data: any){
    this.client.send('pong', {
      pong: data
    });
  }

}

const sock = new WebSock();
let metadata = getEasyMetadata(sock);
console.log(metadata);
```

The code above prints the following result:

```ts
{
  'ws:client': [ { key: 'client', value: {}, type: 'property' } ],
  'ws:parameter': [ { key: 'onMessage', value: {}, index: 0, type: 'method' } ],
  'ws:event': [ { key: 'onMessage', value: 'ping', type: 'method' } ],
  'ws:address': [ { key: null, value: 'ws://localhost:3000', type: 'class' } ]
}
```