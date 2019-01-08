import AppToggleButton from '~/components/AppToggleButton.vue'
import { mount } from '@vue/test-utils'

describe('AppToggleButton', () => {
  let wrapper

  beforeEach(() => {
    // 一度 wrapper を null にして適切に GC されるようにする
    wrapper = null

    // wrapper に vue コンポーネントのマウント結果を代入し使い回す
    wrapper = mount(AppToggleButton)
  })

  test('デフォルト状態で off であるか', () => {
    expect(wrapper.find('p').text()).toBe('off')
  })

  test('ボタンを押すことによって on となるか', () => {
    wrapper.find('button').trigger('click')

    expect(wrapper.find('p').text()).toBe('on')
  })


})
