import Ember from 'ember';

export default Ember.Route.extend({

    model(params){
        let gist = this.store.peekRecord('gist', params.id);
        return Ember.RSVP.hash({
            gist : gist,
            conteudo :  Ember.$.get(gist.get('arquivo_raw_url'))
        });
    },

    setupController(controller, model) {
        controller.set('gist', model.gist);
    	controller.set('conteudo', model.conteudo);
  	}


});
