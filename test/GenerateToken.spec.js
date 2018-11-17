import { shallowMount } from '@vue/test-utils'
import GenerateToken from '../src/components/GenerateToken.vue'

describe('GenerateToken.vue', () => {
  it('simple test', () => {
    const wrapper = shallowMount(GenerateToken);
    expect(1).not.toBe(0);
  })
})