/**
 * Simple Data Mapper
 *
 */
export class SimpleDataMapper {
  private maps: { from: string, to: string, cb?: Function }[] = []
  private reportEnabled = false

  constructor(reportEnabled = false) {
    this.reportEnabled = reportEnabled
  }

  static create(report = false) {
    return new SimpleDataMapper(report)
  }

  map(from: string, to?: string, cb?: Function) {
    to = to ? to : from
    this.maps.push({ from, to, cb })
    return this
  }

  transform(srcData: any) {
    const maps = this.maps
    let transformedData: any = {};
    const transformed = [];
    const skipped = [];

    const getNestedData = (nestedData: any) => {
      const paths = nestedData.split(".")
      let currentData = { ...srcData }
      paths.forEach((p: any) => {
        currentData = currentData && currentData[p]
      })
      return currentData
    }

    maps.forEach(({ from, to, cb }) => {
      const nestedData = getNestedData(from)

      if (nestedData) {
        transformedData[to] = cb ? cb(nestedData) : nestedData
        transformed.push(`${from} -> ${to}`)
      }
      else {
        skipped.push(from)
      }
    })

    return transformedData
  }
}