import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { AutonomyClient } from '@autonomysdk/ts-client'
export interface State {
  wallet: any
  client: AutonomyClient
  queryClient: any
  options: any
  hasWallet: any
  endpoints: any
}

export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    wallet: {},
    client: any,
    queryClient: {},
    options: {},
    hasWallet: false,
    endpoints: {
      rpc: 'localhost:26657',
    },
  },
  mutations: {
    SET_WALLET(state, payload) {
      state.wallet = payload
    },
    SET_CLIENT(state, payload) {
      state.client = payload
    },
    SET_QUERY_CLIENT(state, payload) {
      state.queryClient = payload
    },
    SET_OPTIONS(state, payload) {
      state.options = payload
    },
    HAS_WALLET(state, payload) {
      state.hasWallet = payload
    },
  },
  actions: {
    setWallet({ commit }, wallet) {
      commit('SET_WALLET', wallet)
    },
    setClient({ commit }, client) {
      commit('SET_CLIENT', client)
    },
    setQueryClient({ commit }, queryclient) {
      commit('SET_QUERY_CLIENT', queryclient)
    },
    setOptions({ commit }, options) {
      commit('SET_OPTIONS', options)
    },
    hasWallet({ commit }, payload) {
      commit('HAS_WALLET', payload)
    },
  },
  getters: {
    getWallet(state) {
      return state.wallet
    },
    getClient(state) {
      return state.client
    },
    getQueryClient(state) {
      return state.queryClient
    },
    getOptions(state) {
      return state.options
    },
    hasWallet(state) {
      return state.hasWallet
    },
    getEndPoints(state) {
      return state.endpoints
    },
  },
  modules: {},
})

export function useStore() {
  return baseUseStore(key)
}
