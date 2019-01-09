// const Vuex = require('vuex')
// const index = require('../../app/store')
// const { createLocalVue } = require('@vue/test-utils')
// const cloneDeep = require('lodash.clonedeep')

import Vuex from 'vuex'
import store from '~/store/index'
import { createLocalVue} from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('pages/index.vue', () => {
  let wrapper

  // テスト毎にストアをリセット
  beforeEach(() => {
    wrapper = null
    wrapper = mount(IndexPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue
    })
  })

  test('カウンターをクリックした時、カウント値が1加算される', () => {
    expect(wrapper.vm.count).toBe(false)
    store.find('button').trigger('click')
    expect(wrapper.vm.count).toBe(true)
  })
})
