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
})