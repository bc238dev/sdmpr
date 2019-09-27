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


Easiest Usage:

const d1 = { first_name: "Pixie", last_name: "Dorry", address: { city: "SD", postal_code: "92101" }}
const d2 = SimpleDataMapper.camelCase(d1)

  // d2-> { firstName: 'Pixie', lastName: 'Dorry', address: { city: 'SD', postalCode: '92101' }}

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
```json
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
```json
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
```json
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
```json
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

**Example 5:** Camel & Snake case conversions.
```ts
const data1 = {
  first_name: "Pixie", last_name: "Dorry", age: 3.14, gender: "F",
  some_comments: [
    { text: "This is the first comment.", created_at: "2019-09-01" },
    { text: "Yet another one!", created_at: "2019-09-02" }
  ],
  mixed_caseStyle: true,
  all_addresses: [
    {
      street: "123 Main Str",
      city_name: "San Diego",
      state_name: "CA",
      postal_code: "92120",
      suite_numbers: [101, 102]
    }
  ]
}

// Fastest and easiest way to change case style to camel or snake naming conventions!
const data2 = SimpleDataMapper.changeCase(data1, CaseStyle.CAMEL)
const data3 = SimpleDataMapper.changeCase(data2, CaseStyle.SNAKE)

```

Sample output:
```json
Data2-> {
  "firstName": "Pixie",
  "lastName": "Dorry",
  "age": 3.14,
  "gender": "F",
  "someComments": [
    {
      "text": "This is the first comment.",
      "createdAt": "2019-09-01"
    },
    {
      "text": "Yet another one!",
      "createdAt": "2019-09-02"
    }
  ],
  "mixedCaseStyle": true,
  "allAddresses": [
    {
      "street": "123 Main Str",
      "cityName": "San Diego",
      "stateName": "CA",
      "postalCode": "92120",
      "suiteNumbers": [
        101,
        102
      ]
    }
  ]
}
Data3-> {
  "first_name": "Pixie",
  "last_name": "Dorry",
  "age": 3.14,
  "gender": "F",
  "some_comments": [
    {
      "text": "This is the first comment.",
      "created_at": "2019-09-01"
    },
    {
      "text": "Yet another one!",
      "created_at": "2019-09-02"
    }
  ],
  "mixed_case_style": true,
  "all_addresses": [
    {
      "street": "123 Main Str",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92120",
      "suite_numbers": [
        101,
        102
      ]
    }
  ]
}
```

More interesting transformation:
```ts
// This example is the most detailed transformation that demonstrates all features including
// reports in the SimpleDataMapper. Please notice that we don't have "abc" and "middle_name" fields
// in the data, so they will show up as "skipped" under "transformation" and "uncollected" under
// "collection" respectively in the reports section, because they wouldn't be found as field names.
const data6 = SimpleDataMapper.create()
  .collect(["first_name", "last_name", "middle_name"], "full_name") // Collecting fields to construct "full_name"
  .map("first_name", "user.known_names.first_name")
  .map("last_name", "user.known_names.last_name")
  .map("age", "user.age")
  .map("all_addresses")
  .map("abc", "xyz") // No 'abc' field in the data!
  .mapToCamelCase({ keep: ["full_name"] }) // Will transform all except "full_name" to camel case!
  .report(true)
  .transform(data1)
```

And, here is the sample output:
```json
Data6-> {
  "user": {
    "knownNames": {
      "firstName": "Pixie",
      "lastName": "Dorry"
    },
    "age": 3.14
  },
  "allAddresses": [
    {
      "street": "123 Main Str",
      "cityName": "San Diego",
      "stateName": "CA",
      "postalCode": "92120",
      "suiteNumbers": [
        101,
        102
      ]
    }
  ],
  "full_name": "Pixie Dorry",
  "__reports__": {
    "transformation": {
      "transformed": [
        "age -> user.age",
        "all_addresses -> all_addresses",
        "first_name -> user.known_names.first_name",
        "last_name -> user.known_names.last_name"
      ],
      "untransformed": [
        "gender",
        "mixed_caseStyle",
        "some_comments"
      ],
      "skipped": [
        "abc"
      ]
    },
    "collection": {
      "collected": [
        "first_name",
        "last_name"
      ],
      "uncollected": [
        "middle_name"
      ]
    }
  }
}
```

For details, take a look at the `example5.ts` file.