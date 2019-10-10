// This example demonstrates the camel and snake case conversions.
import { CaseStyle, SimpleDataMapper } from ".."

console.log("--- Demo of all Case Styles ---")

const log = (msg: string, obj: any) => {
  console.log(msg, JSON.stringify(obj, null, 2))
}

const data1 = {
  first_name: "Pixie", last_name: "Dorry", age: 3.14, gender: "F",
  some_comments: [
    { text: "This is the first comment.", created_at: "2019-09-01" },
    { text: "Yet another one!", created_at: "2019-09-02" }
  ],
  mixed_styleField: true,
  all_addresses: [
    {
      street: "123 Main Str",
      city_name: "San Diego",
      state_name: "CA",
      postal_code: "92101",
      suite_numbers: [101, 102]
    },
    {
      street: "Another Street",
      city_name: "SD",
      state_name: "CA",
      postal_code: "92102",
      suite_numbers: [303]
    }
  ]
}

// Fastest and easiest way to change case styles!
const data2 = SimpleDataMapper.toCamelCase(data1)
const data3 = SimpleDataMapper.toSnakeCase(data1)
const data4 = SimpleDataMapper.toLowerCase(data1)
const data5 = SimpleDataMapper.toUpperCase(data1)

log("Original Data->", data1)
log("Camel Case->", data2)
log("Snake Case->", data3)
log("Lower Case->", data4)
log("Upper Case->", data5)


/*
--- Demo of all Case Styles ---
Original Data-> {
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
  "mixed_styleField": true,
  "all_addresses": [
    {
      "street": "123 Main Str",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92101",
      "suite_numbers": [
        101,
        102
      ]
    },
    {
      "street": "Another Street",
      "city_name": "SD",
      "state_name": "CA",
      "postal_code": "92102",
      "suite_numbers": [
        303
      ]
    }
  ]
}
Camel Case-> {
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
  "mixedStyleField": true,
  "allAddresses": [
    {
      "street": "123 Main Str",
      "cityName": "San Diego",
      "stateName": "CA",
      "postalCode": "92101",
      "suiteNumbers": [
        101,
        102
      ]
    },
    {
      "street": "Another Street",
      "cityName": "SD",
      "stateName": "CA",
      "postalCode": "92102",
      "suiteNumbers": [
        303
      ]
    }
  ]
}
Snake Case-> {
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
  "mixed_style_field": true,
  "all_addresses": [
    {
      "street": "123 Main Str",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92101",
      "suite_numbers": [
        101,
        102
      ]
    },
    {
      "street": "Another Street",
      "city_name": "SD",
      "state_name": "CA",
      "postal_code": "92102",
      "suite_numbers": [
        303
      ]
    }
  ]
}
Lower Case-> {
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
  "mixed_stylefield": true,
  "all_addresses": [
    {
      "street": "123 Main Str",
      "city_name": "San Diego",
      "state_name": "CA",
      "postal_code": "92101",
      "suite_numbers": [
        101,
        102
      ]
    },
    {
      "street": "Another Street",
      "city_name": "SD",
      "state_name": "CA",
      "postal_code": "92102",
      "suite_numbers": [
        303
      ]
    }
  ]
}
Upper Case-> {
  "FIRST_NAME": "Pixie",
  "LAST_NAME": "Dorry",
  "AGE": 3.14,
  "GENDER": "F",
  "SOME_COMMENTS": [
    {
      "TEXT": "This is the first comment.",
      "CREATED_AT": "2019-09-01"
    },
    {
      "TEXT": "Yet another one!",
      "CREATED_AT": "2019-09-02"
    }
  ],
  "MIXED_STYLEFIELD": true,
  "ALL_ADDRESSES": [
    {
      "STREET": "123 Main Str",
      "CITY_NAME": "San Diego",
      "STATE_NAME": "CA",
      "POSTAL_CODE": "92101",
      "SUITE_NUMBERS": [
        101,
        102
      ]
    },
    {
      "STREET": "Another Street",
      "CITY_NAME": "SD",
      "STATE_NAME": "CA",
      "POSTAL_CODE": "92102",
      "SUITE_NUMBERS": [
        303
      ]
    }
  ]
}
 */