import Route from 'ember-route'
import {htmlSafe} from 'ember-string'

export default Route.extend({
  model () {
    const items =
      Array(10000)
        .fill(null)
        .map((_, index) => ({
          index,
          name: Math.random().toString(36).substr(2)
        }))

    const unsafeHtml =
      items
        .map(({index, name}) => `<li>${index}: ${name}</li>`)
        .join('')

    return {
      items,
      html: htmlSafe(unsafeHtml)
    }
  }
})
