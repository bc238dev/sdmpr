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
const mapper1 = SimpleDataMapper.create()
  .map("first_name", "person.firstName")
  .map("last_name", "person.lastName")
  .map("age", "person.age")
  .map("addresses[0].city_name", "person.address.city")
  .map("addresses[0].postal_code", "person.address.zip")

const transformedData1 = mapper1.transform(data1)

log("Data1->", data1)
log("TransformedData1->", transformedData1)
