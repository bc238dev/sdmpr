# Simple Data Mapper

This is a simple data mapper...


### Here is the first example:

```ts

import { SimpleDataMapper } from "../SimpleDataMapper"

const mapper1 = SimpleDataMapper.create()
  .map("first_name", "firstName")
  .map("last_name", "lastName")
  .map("age")
  .map("addresses[0]", "firstAddress")

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

const transformedData1 = mapper1.transform(data1)

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
