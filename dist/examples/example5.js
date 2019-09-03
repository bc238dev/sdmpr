"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This example demonstrates the camel and snake case conversions.
const __1 = require("..");
const log = (msg, obj) => {
    console.log(msg, JSON.stringify(obj, null, 2));
};
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
};
log("Data1->", data1);
// Fastest and easiest way to change case style to camel or snake naming conventions!
const data2 = __1.SimpleDataMapper.changeCase(data1, __1.CaseStyle.CAMEL);
const data3 = __1.SimpleDataMapper.changeCase(data2, __1.CaseStyle.SNAKE);
log("Data2->", data2);
log("Data3->", data3);
const data4 = __1.SimpleDataMapper.create()
    .mapToCamelCase({ keep: ["some_comments"] }) // You can keep some field names
    .transform(data1);
const data5 = __1.SimpleDataMapper.create()
    .mapToCamelCase({ keep: ["some_comments"], keepChildNodes: true }) // You can also keep the child names
    .transform(data1);
// This example is the most detailed transformation that demonstrates all features including
// reports in the SimpleDataMapper. Please notice that we don't have "abc" and "middle_name" fields
// in the data, so they will show up as "skipped" under "transformation" and "uncollected" under
// "collection" respectively in the reports section, because they wouldn't be found as field names.
const data6 = __1.SimpleDataMapper.create()
    .collect(["first_name", "last_name", "middle_name"], "full_name") // Collecting fields to construct "full_name"
    .map("first_name", "user.known_names.first_name")
    .map("last_name", "user.known_names.last_name")
    .map("age", "user.age")
    .map("all_addresses")
    .map("abc", "xyz") // No 'abc' field in the data!
    .mapToCamelCase({ keep: ["full_name"] }) // Will transform all except "full_name" to camel case!
    .report(true)
    .transform(data1);
log("Data4->", data4);
log("Data5->", data5);
log("Data6->", data6);
/*
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
 */ 
