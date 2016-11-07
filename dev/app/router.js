import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('gists', { path: '/gists' });
  this.route('gists.detalhar', { path: '/gists/:id' });
  this.route('sobre');
  this.route('error');
});

export default Router;
