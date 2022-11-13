
# Query Params

Convierte un objeto a una cadena que puede ser usada como parameteros **GET**



## Installation

Install `@joalvm/query-params` with npm

```bash
  npm install -S @joalvm/query-params
```

## methods

| method                                       | description                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `serialize(encode: boolean = false): string` | Devuelve una cadena con los caracteres codificados, si el parametro pasa a `true` se condificaran los caracteres. |

## Usage/Examples

```ts
import Query from '@joalvm/query-params';

const isProduction = true;
const optionalUrl = 'https://api.domain.com/users/';
const params = {
    schema: ["item_1", "item_2"],
    sort: {
        item_1: "desc",
    },
    paginate: true,
    per_page: 20,
    page: 10,
};

const q = new Query(params, optionalUrl);

q.serialize(isProduction);

```

### Sin codificar

```bash
https://api.domain.com/users?schema[0]=item_1&schema[1]=item_2&sort[item_1]=desc&paginate=true&per_page=20&page=10
```

### Codificado
```bash
https://api.domain.com/users?schema%5B0%5D=item_1&schema%5B1%5D=item_2&sort%5Bitem_1%5D=desc&paginate=true&per_page=20&page=10
```