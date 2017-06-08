import Route from 'ember-route'
import {htmlSafe} from 'ember-string'

export default Route.extend({

  queryParams: {
    count: { refreshModel: true }
  },

  model ({count}) {
    count = this._parseCount(count)

    if (!count) return

    const items = this._produceItems(count)

    return {
      count,
      items,
      html:       this._produceHtml({items, callback: this._produceHtmlItem}),
      styledHtml: this._produceHtml({items, callback: this._produceStyledHtmlItem})
    }
  },



  _parseCount (count) {
    count = parseInt(count, 10)

    if (
      (typeof count !== 'number')
      || isNaN(count)
      || count < 1
    ) {
      this.transitionTo('index', {queryParams: {count: 10000}})
      return
    }

    return count
  },

  _produceItems (count = 10000) {
    return Array(count)
        .fill(null)
        .map((_, index) => ({
          index,
          name: Math.random().toString(36).substr(2)
        }))

  },



  _produceHtml ({items, callback}) {
    const unsafeHtml =
      items
        .map(callback)
        .join('')

    return htmlSafe(unsafeHtml)
  },



  _produceHtmlItem ({index, name}) {
    return `<li>${index}: ${name}</li>`
  },



  _produceStyledHtmlItem ({index, name}) {
    return `
      <li>
        <section class="todoapp">
          <header class="header">
            <h1>${index}: ${name}</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus>
          </header>
          <!-- This section should be hidden by default and shown when there are todos -->
          <section class="main">
            <input class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
              <!-- These are here just to show the structure of the list items -->
              <!-- List items should get the class \`editing\` when editing and \`completed\` when marked as completed -->
              <li class="completed">
                <div class="view">
                  <input class="toggle" type="checkbox" checked>
                  <label>Taste JavaScript</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
              </li>
              <li>
                <div class="view">
                  <input class="toggle" type="checkbox">
                  <label>Buy a unicorn</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
              </li>
            </ul>
          </section>
          <!-- This footer should hidden by default and shown when there are todos -->
          <footer class="footer">
            <!-- This should be \`0 items left\` by default -->
            <span class="todo-count"><strong>0</strong> items left</span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
              <li>
                <a class="selected" href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <!-- Hidden if no completed items are left ↓ -->
            <button class="clear-completed">Clear completed</button>
          </footer>
        </section>
      </li>
    `
  }
})
