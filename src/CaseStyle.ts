export enum CaseStyle {
  ASIS,
  CAMEL,
  SNAKE,
  LOWER,
  UPPER
}

export interface ICaseStyleOptions {
  keep?: string[]
  keepChildNodes?: boolean
}
