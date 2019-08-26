# Simple Data Mapper

Transform any data easily from one shape to another.

## Installation

`$ npm i sdmpr`

## Usage

```js
Common JS
const { SimpleDataMapper } = require("sdmpr")

or

TS
import { SimpleDataMapper } from "sdmpr"

```

## Here are some examples:

**Example 1:** Simple one to one transformation

```ts
const data1 = {
  first_name: "Evo", last_name: "Zumo", age: 16, gender: "M",
  addresses: [
    {
      street: "123 Str",
      city_name: "San Diego",
      state_name: "CA",
      postal_code: "92120"
    },
    {
      street: "Main Str Suite 100",
      city_name: "San Diego",
      state_name: "CA",
      postal_code: "92101"
    }
  ]
}

const transformedData1 = SimpleDataMapper.create()
  .map("first_name", "firstName")
  .map("last_name", "lastName")
  .map("age")
  .map("addresses[0]", "firstAddress")
  .transform(data1)

const log = (msg: string, obj: any) => {
  console.log(msg, JSON.stringify(obj, null, 2))
}

log("Data1->", data1)
log("TransformedData1->", transformedData1)

```

Sample Output:
```
Data1-> {
  "first_name": "Evo",
  "last_name": "Zumo",
  "age": 16,
  "gender": "M",
  "addresses": [
    {
      "street": "123 Str",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92120"
    },
    {
      "street": "Main Str Suite 100",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92101"
    }
  ]
}
TransformedData1-> {
  "firstName": "Evo",
  "lastName": "Zumo",
  "age": 16,
  "firstAddress": {
    "street": "123 Str",
    "city_name": "San Diego",
    "state_name": "CA",
    "postal_code": "92120"
  }
}
```

---

**Example 2:** Callback demo and nested fields in the output.

```ts
const data1 = {
  first_name: "Pixie", last_name: "Dorry", age: 3, gender: "F",
  addresses: [
    {
      street: "123 Str",
      city_name: "San Diego",
      state_name: "CA",
      postal_code: "92120"
    }
  ]
}
const mapper1 = SimpleDataMapper.create()
  .map("first_name", "person.firstName")
  .map("last_name", "person.lastName", (lastName: string) => lastName && lastName.toUpperCase())
  .map("age", "person.age")
  .map("addresses[0].city_name", "person.address.city")
  .map("addresses[0].postal_code", "person.address.zip")

const transformedData1 = mapper1.transform(data1)

log("TransformedData1->", transformedData1)

```

Sample Output:
```
TransformedData1-> {
  "person": {
    "firstName": "Pixie",
    "lastName": "DORRY",
    "age": 3,
    "address": {
      "city": "San Diego",
      "zip": "92120"
    }
  }
}
```

**Example 3:** Using collect method.

```ts
const mapper1 = SimpleDataMapper.create()
  .collect(["first_name", "last_name"], "fullName1")
  .collect(["first_name", "last_name"], (data: any[]) => {
    // You have full control here!
    return {
      fullName2: `${data[0]} ${data[1] && data[1].toUpperCase()}`,
      extra: {
        info: "Just shows that you can add anything if you like!",
        now: new Date()
      }
    }
  })

```

Sample Output:
```
TransformedData1-> {
  "fullName1": "Pixie Dorry",
  "fullName2": "Pixie DORRY",
  "extra": {
    "info": "Just shows that you can add anything if you like!",
    "now": "2019-08-26T06:35:12.397Z"
  }
}
```

**Example 4:** Showing reports.
```ts
const mapper1 = SimpleDataMapper.create(true)
  .map("first_name", "firstName")
  .map("lasname", "lastName") // <- Wrong field name (for demo)!
  .map("age")
  .collect(["first_name", "last_name"], "fullName")
```

Sample Output:
```
TransformedData1-> {
  "firstName": "Pixie",
  "age": 3,
  "fullName": "Pixie Dorry",
  "__reports__": {
    "transformation": {
      "transformed": [
        "age -> age",
        "first_name -> firstName"
      ],
      "untransformed": [
        "addresses",
        "gender",
        "last_name"
      ],
      "skipped": [
        "lasname"
      ]
    },
    "collection": {
      "collected": [
        "first_name",
        "last_name"
      ],
      "uncollected": []
    }
  }
}
```
