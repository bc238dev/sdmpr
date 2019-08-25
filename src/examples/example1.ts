import { SimpleDataMapper } from "../SimpleDataMapper"

const mapper1 = SimpleDataMapper.create()
  .map("first_name", "firstName")
  .map("last_name", "lastName")
  .map("ages")

const data1 = { first_name: "Evo", last_name: "Zumo", age: 16 }
const data2 = mapper1.transform(data1)

const log = (msg: string, obj: any) => {
  console.log(msg, JSON.stringify(obj, null, 2))
}

log("Data1->", data1)
log("Data2->", data2)