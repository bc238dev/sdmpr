export enum CaseStyle {
  ASIS,
  CAMEL,
  SNAKE
}

export interface ICaseStyleOptions {
  keep?: string[]
  keepChildNodes?: boolean
}
