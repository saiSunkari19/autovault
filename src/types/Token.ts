import Long from 'long'

export interface Token {
  creator: string
  id: Long
  denom: string
  displayName: string
  initialSupply: Long
  holders: Long
}
