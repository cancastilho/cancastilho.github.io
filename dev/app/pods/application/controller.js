import Ember from 'ember';

export default Ember.Controller.extend({

	  currentRouteName() {
	      return this.controllerFor('application').get('currentRouteName');
	  }

});
