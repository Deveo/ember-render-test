import Controller from 'ember-controller'
import {reads} from 'ember-computed'

export default Controller.extend({

  countUserInput: reads('model.count'),

  actions: {
    updateCount () {
      const count = this.get('countUserInput')
      this.transitionToRoute('index', {queryParams: {count}})
    }
  }
})
