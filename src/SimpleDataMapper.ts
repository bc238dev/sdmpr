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

    const getNestedData = (nestedData: string) => {
      const paths = nestedData.split(".")
      let currentData = { ...srcData }
      paths.forEach((p: string) => {
        if (currentData) {
          // If we have array notation (somearray[n]) then capture groups
          const matches = p.match(/(.*)\[(.*)\]/)
          if (matches) {
            const g1 = matches[1]
            const g2 = matches[2]
            currentData = currentData[g1] ? currentData[g1][g2] : undefined
          }
          else {
            currentData = currentData[p]
          }
        }
      })
      return currentData
    }

    maps.forEach(({ from, to, cb }) => {
      const nestedData = getNestedData(from)

      if (nestedData) {
        let target = transformedData
        const fieldNames = to.split(".")
        const lastFieldName = fieldNames[fieldNames.length - 1]

        for (let i = 0; i < fieldNames.length - 1; i++) {
          const fieldName = fieldNames[i]
          target[fieldName] = target[fieldName] ? target[fieldName] : {}
          target = target[fieldName]
        }

        target[lastFieldName] = cb ? cb(nestedData) : nestedData
        transformed.push(`${from} -> ${to}`)
      }
      else {
        skipped.push(from)
      }
    })

    return transformedData
  }
}