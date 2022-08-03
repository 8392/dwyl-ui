import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Render',
  props: {
    row: Object,
    render: Function
  },

  render () {
    return this.render(this.row)
  }
})
