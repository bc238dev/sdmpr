import { expect } from "chai"
import { ICaseStyleOptions } from "./../src/CaseStyle";
import { SimpleDataMapper } from "../src/SimpleDataMapper"
import { CaseStyle } from "../src/CaseStyle"
import sdmpr from "../src/"

describe("SimpleDataMapper", () => {
  it("Should create mapper", () => {
    const mapper1 = SimpleDataMapper.create()

    mapper1.map("hello", "world")

    const data1 = { hello: "Hello there" }
    const data2 = mapper1.transform(data1)

    expect(data2.world).exist
    expect(data2.world).to.equal("Hello there")
  })

  it("Should map multiple fields", () => {
    const mapper1 = SimpleDataMapper.create()

    mapper1.map("first_name", "firstName")
    mapper1.map("last_name", "lastName")
    mapper1.map("age")

    const data1 = { first_name: "Evo", last_name: "Zumo", age: 16 }
    const data2 = mapper1.transform(data1)

    expect(data2.firstName).to.equal("Evo")
    expect(data2.lastName).to.equal("Zumo")
    expect(data2.age).to.equal(16)
  })

  it("Should map to CamelCase", () => {
    const mapper1 = SimpleDataMapper.create()

    mapper1.mapToCamelCase()

    const data1 = { first_name: "Evo", last_name: "Zumo", age: 16 }
    const data2 = mapper1.transform(data1)

    expect(data2.firstName).to.equal("Evo")
    expect(data2.lastName).to.equal("Zumo")
    expect(data2.age).to.equal(16)
  })

  it("Should map to SnakeCase", () => {
    const mapper1 = SimpleDataMapper.create()

    mapper1.mapToSnakeCase()

    const data1 = { firstName: "Evo", lastName: "Zumo", age: 16 }
    const data2 = mapper1.transform(data1)

    expect(data2.first_name).to.equal("Evo")
    expect(data2.last_name).to.equal("Zumo")
    expect(data2.age).to.equal(16)
  })

  it("Should map to CamelCase in one step", () => {
    const data1 = { first_name: "Evo", last_name: "Zumo", age: 16 }
    const data2 = SimpleDataMapper.toCamelCase(data1)

    expect(data2.firstName).to.equal("Evo")
    expect(data2.lastName).to.equal("Zumo")
    expect(data2.age).to.equal(16)
  })

  it("Should map to SnakeCase in one step", () => {
    const data1 = { firstName: "Evo", lastName: "Zumo", age: 16 }
    const data2 = SimpleDataMapper.toSnakeCase(data1)

    expect(data2.first_name).to.equal("Evo")
    expect(data2.last_name).to.equal("Zumo")
    expect(data2.age).to.equal(16)
  })

  it("Should map to all lower case in one step", () => {
    const data1 = { firstName: "Evo", lastName: "Zumo", age: 16, address: { streetName: "Main Str" } }
    const data2 = SimpleDataMapper.toLowerCase(data1)

    expect(data2.firstname).to.equal("Evo")
    expect(data2.lastname).to.equal("Zumo")
    expect(data2.address.streetname).to.equal("Main Str")
    expect(data2.age).to.equal(16)
  })

  it("Should map to all upper case in one step", () => {
    const data1 = { firstName: "Evo", lastName: "Zumo", age: 16, address: { streetName: "Main Str" } }
    const data2 = SimpleDataMapper.toUpperCase(data1)

    expect(data2.FIRSTNAME).to.equal("Evo")
    expect(data2.LASTNAME).to.equal("Zumo")
    expect(data2.ADDRESS.STREETNAME).to.equal("Main Str")
    expect(data2.AGE).to.equal(16)
  })

  it("Should map to snake case using changeCase", () => {
    const data1 = { firstName: "Evo", lastName: "Zumo", age: 16, address: { streetName: "Main Str" } }
    const data2 = SimpleDataMapper.changeCase(data1, CaseStyle.SNAKE)

    expect(data2.first_name).to.equal("Evo")
    expect(data2.last_name).to.equal("Zumo")
    expect(data2.address.street_name).to.equal("Main Str")
    expect(data2.age).to.equal(16)
  })

  it("Should map to camel case using changeCase with options", () => {
    const data1 = { first_name: "Evo", last_name: "Zumo", age: 16, main_address: { street_name: "Main Str" } }
    const data2 = SimpleDataMapper.changeCase(data1, CaseStyle.CAMEL, { keep: ["main_address"], keepChildNodes: true })

    expect(data2.firstName).to.equal("Evo")
    expect(data2.lastName).to.equal("Zumo")
    expect(data2.main_address.street_name).to.equal("Main Str")
    expect(data2.age).to.equal(16)
  })
})

describe("sdmpr", () => {
  it("Should create mapper using sdmpr", () => {
    const mapper1 = sdmpr.create()

    mapper1.map("hello", "sdmpr")

    const data1 = { hello: "Hello sdmpr" }
    const data2 = mapper1.transform(data1)

    expect(data2.sdmpr).exist
    expect(data2.sdmpr).to.equal("Hello sdmpr")
  })

  it("Should map to camel case using toCamelCase", () => {
    const data1 = { first_name: "Pixie", last_name: "Dorry", age: 3.14 }
    const data2 = sdmpr.toCamelCase(data1)

    expect(data2.firstName).to.equal("Pixie")
    expect(data2.lastName).to.equal("Dorry")
  })
})