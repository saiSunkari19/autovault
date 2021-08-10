import { AutonomyClient } from '@autonomysdk/ts-client'
import { ComponentCustomProperties } from '@vue/runtime-core'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    wallet: Object
    client: AutonomyClient
    queryClient: Object
    hasWallet: boolean
    endpoints: Object
  }
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
