import { expect } from "chai"
import { SimpleDataMapper } from "../src/SimpleDataMapper"


describe('SimpleDataMapper', () => {
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
})