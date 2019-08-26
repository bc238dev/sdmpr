// This example demonstrates the reports
import { SimpleDataMapper } from "../SimpleDataMapper"

const log = (msg: string, obj: any) => {
  console.log(msg, JSON.stringify(obj, null, 2))
}
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
const mapper1 = SimpleDataMapper.create(true)
  .map("first_name", "firstName")
  .map("lasname", "lastName") // <- Wrong field name (for demo)!
  .map("age")
  .collect(["first_name", "last_name"], "fullName")

const transformedData1 = mapper1.transform(data1)

log("Data1->", data1)
log("TransformedData1->", transformedData1)

/*
Sample Output:

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
*/