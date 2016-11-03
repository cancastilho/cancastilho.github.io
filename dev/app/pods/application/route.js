import Ember from 'ember';

export default Ember.Route.extend({
     currentRouteName() {
          return this.controllerFor('application').get('currentRouteName');
      },    

    actions: {
        loading(transition, originRoute) {
            let controller = this.controllerFor('application');
            controller.set('carregando', true);
            transition.promise.finally(function() {
                controller.set('carregando', false);
            });
        },
        error(error, transition) {
            if (error) {
                return this.transitionTo('error');
            }
        }
    }
});
