import { CaseStyle, ICaseStyleOptions } from "./CaseStyle";

/**
 * Simple Data Mapper
 *
 * Transform any data easily from one shape to another.
 *
 */
export class SimpleDataMapper {
  private reportEnabled = false
  private maps: { from: string, to: string, cb?: Function }[] = []
  private collects: { fields: string[], to?: string | Function, cb?: Function }[] = []
  private extras: { fieldName: string, data: any }[] = []
  private caseStyle = CaseStyle.ASIS
  private caseStyleOptions: ICaseStyleOptions | undefined

  constructor(reportEnabled = false) {
    this.init(reportEnabled)
  }

  map(from: string, to?: string, cb?: Function) {
    to = to ? to : from
    this.maps.push({ from, to, cb })
    return this
  }

  collect(fields: string[], to?: string | Function, cb?: Function) {
    if (typeof to === "function") {
      cb = to
      to = undefined
    }
    else {
      to = to ? to : fields.join("_")
    }
    this.collects.push({ fields, to, cb })
    return this
  }

  add(fieldName: string, data: any) {
    this.extras.push({ fieldName, data })
    return this
  }

  /**
   * This will transform source data to the destination.
   *
   * @param  srcData
   */
  transform(srcData: any) {
    const maps = this.maps
    let transformedData: any = {}
    const transformed: string[] = []
    const skipped: string[] = []
    const collected: string[] = []
    const uncollected: string[] = []

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

    const getTargetData = (transformedData: any, to: string) => {
      let target = transformedData
      const fieldNames = to.split(".")
      const lastFieldName = fieldNames[fieldNames.length - 1]

      for (let i = 0; i < fieldNames.length - 1; i++) {
        const fieldName = fieldNames[i]
        target[fieldName] = target[fieldName] ? target[fieldName] : {}
        target = target[fieldName]
      }

      return {
        target,
        lastFieldName
      }
    }

    maps.forEach(({ from, to, cb }) => {
      const nestedData = getNestedData(from)

      if (nestedData) {
        const targetData = getTargetData(transformedData, to)
        targetData.target[targetData.lastFieldName] = cb ? cb(nestedData) : nestedData
        transformed.push(`${from} -> ${to}`)
      }
      else {
        skipped.push(from)
      }
    })

    this.collects.forEach(({ fields, to, cb }) => {
      const vals = fields.reduce((acc: any[], cur: string) => {
        const nestedData = getNestedData(cur)
        if (nestedData) {
          acc.push(nestedData)
          collected.push(cur)
        }
        else {
          uncollected.push(cur)
        }
        return acc
      }, [])

      const info = cb ? cb(vals) : vals.join(" ")
      if (info) {
        if (to && typeof to === "string") {
          const targetData = getTargetData(transformedData, to)
          targetData.target[targetData.lastFieldName] = info
        }
        else {
          transformedData = { ...transformedData, ...info }
        }
      }
    })

    // Add extra data
    this.extras.forEach(extra => {
      let extraData: any = {}
      extraData[extra.fieldName] = extra.data
      transformedData = { ...transformedData, ...extraData }
    })

    if (this.caseStyle != CaseStyle.ASIS) {
      // If transformedData is empty (no mapping applied) then use the srcData here directly!
      if (Object.keys(transformedData).length === 0) {
        transformedData = { ...srcData }
      }

      transformedData = this.doChangeCase(transformedData, this.caseStyle)
    }

    // Show report if enabled
    if (this.reportEnabled) {
      const dataKeys = Object.keys(srcData)
      const untransformed: any[] = []

      dataKeys.forEach(key => {
        const found = this.maps.findIndex(m => m.from === key)

        if (found === -1) {
          if (key !== "__reports__") {
            untransformed.push(key)
          }
        }
      })
      transformed.sort()
      untransformed.sort()
      skipped.sort()
      collected.sort()
      uncollected.sort()

      transformedData.__reports__ = {
        transformation: {
          transformed,
          untransformed,
          skipped,
        },
        collection: {
          collected,
          uncollected
        }
      }
    }

    return transformedData
  }

  reset() {
    this.init()
    return this
  }

  report(enabled: boolean) {
    this.reportEnabled = enabled
    return this
  }

  mapToCamelCase(options?: ICaseStyleOptions) {
    this.caseStyle = CaseStyle.CAMEL
    this.caseStyleOptions = options
    return this
  }

  mapToSnakeCase(options?: ICaseStyleOptions) {
    this.caseStyle = CaseStyle.SNAKE
    this.caseStyleOptions = options
    return this
  }

  mapToLowerCase(options?: ICaseStyleOptions) {
    this.caseStyle = CaseStyle.LOWER
    this.caseStyleOptions = options
    return this
  }

  mapToUpperCase(options?: ICaseStyleOptions) {
    this.caseStyle = CaseStyle.UPPER
    this.caseStyleOptions = options
    return this
  }

  // --- Static Methods ---

  static create(reportEnabled = false) {
    return new SimpleDataMapper(reportEnabled)
  }

  static changeCase(obj: any, caseStyle: CaseStyle, options?: ICaseStyleOptions) {
    const mapper = SimpleDataMapper.create()
    mapper.caseStyle = caseStyle
    mapper.caseStyleOptions = options

    return mapper.transform(obj)
  }

  static toCamelCase(obj: any, options?: ICaseStyleOptions) {
    return SimpleDataMapper.create().mapToCamelCase(options).transform(obj)
  }

  static toSnakeCase(obj: any, options?: ICaseStyleOptions) {
    return SimpleDataMapper.create().mapToSnakeCase(options).transform(obj)
  }

  static toLowerCase(obj: any, options?: ICaseStyleOptions) {
    return SimpleDataMapper.create().mapToLowerCase(options).transform(obj)
  }

  static toUpperCase(obj: any, options?: ICaseStyleOptions) {
    return SimpleDataMapper.create().mapToUpperCase(options).transform(obj)
  }

  // --- Private Methods ---

  private init(reportEnabled = false) {
    this.reportEnabled = reportEnabled
    this.maps = []
    this.collects = []
    this.extras = []
    this.caseStyle = CaseStyle.ASIS
    return this
  }

  private doChangeCase(obj: any, caseStyle: CaseStyle) {
    const keep = (str: string) => {
      if (this.caseStyleOptions) {
        if (this.caseStyleOptions.keep && this.caseStyleOptions.keep.includes(str))
          return true
      }
      return false
    }
    const keepChildNodes = (str: string) => {
      if (keep(str)) {
        if (this.caseStyleOptions && this.caseStyleOptions.keepChildNodes) {
          return true
        }
      }
      return false
    }
    const toCamelCase = (str: string) => {
      if (keep(str)) return str

      return str.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
          .replace("-", "")
          .replace("_", "")
      })
    }
    const toSnakeCase = (str: string) => {
      if (keep(str)) return str

      return str.split(/(?=[A-Z])/).join("_").toLowerCase()
    }
    const toLowerCase = (str: string) => {
      if (keep(str)) return str

      return str.toLowerCase()
    }
    const toUpperCase = (str: string) => {
      if (keep(str)) return str

      return str.toUpperCase()
    }
    const getBaseFunction = (caseStyle: CaseStyle) => {
      let fn

      switch (caseStyle) {
        case CaseStyle.CAMEL:
          fn = toCamelCase
          break;

        case CaseStyle.SNAKE:
          fn = toSnakeCase
          break;

        case CaseStyle.LOWER:
          fn = toLowerCase
          break;

        case CaseStyle.UPPER:
          fn = toUpperCase
          break;

        default:
          break;
      }

      return fn
    }
    const startProcess = (obj: any, caseStyle: CaseStyle): any => {
      if (typeof obj !== "object") return obj

      const baseFunction = getBaseFunction(caseStyle)

      if (!baseFunction) return

      const fieldNames = Object.keys(obj)

      return fieldNames
        .map(fieldName => {
          const val = obj[fieldName]

          if (!keepChildNodes(fieldName)) {
            if (Array.isArray(val)) {
              return {
                [baseFunction(fieldName)]: val.map(item => {
                  return startProcess(item, caseStyle)
                })
              }
            }
            else if (typeof val === "object") {
              return { [baseFunction(fieldName)]: startProcess(val, caseStyle) }
            }
          }

          return { [baseFunction(fieldName)]: val }
        })
        .reduce((acc, cur) => {
          const key = Object.keys(cur)[0]
          acc[key] = cur[key]
          return acc
        }, {})
    }

    return startProcess(obj, caseStyle)
  }
}