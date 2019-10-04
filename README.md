## Exemplo

```js
const dictionary = {
  param1: 'Bem vindo, {{ vendor.name }}',
  param2: 'Bem vindo a {{ store.data.name }}, senhor(a) {{ customer }}',
  param3: 10,
  param4: true,
  param5: null,
  param6: undefined,
  param7: 'Hello World',
  param8: '{{variavel1}}, {{variavel2}}',
}

const data = {
  vendor: {
    name: 'Guilherme Bruzzi',
  },
  store: {
    data: {
      address: 'Praia de Botafogo',
      name: 'Loja de Botafogo',
    },
  },
  customer: 'Felippe Nardi',
  variavel1: 'Hello',
  variavel2: 'World',
}

const result = parseDictionary(dictionary, data)

console.log('result = ', result)
// result = {
//   param1: 'Bem vindo, Guilherme Bruzzi',
//   param2: 'Bem vindo a Loja de Botafogo, senhor(a) Felippe Nardi',
//   param3: 10,
//   param7: 'Hello World',
//   param8: 'Hello, World',
// }
```
