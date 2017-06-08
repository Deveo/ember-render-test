import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('multiple')
  this.route('template')
  this.route('html')

  this.route('multiple-styled')
  this.route('template-styled')
  this.route('html-styled')
});

export default Router;
