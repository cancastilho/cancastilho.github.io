import Ember from 'ember';
const{
    $
} = Ember;

export default Ember.Route.extend({

    model(params) {
        let gist = this.store.peekRecord('gist', params.id);
        return Ember.RSVP.hash({
            gist: gist,
            // conteudo: $.get(gist.get('arquivo_raw_url')),
            gistMarkdownJson: $.ajax({
                url:`https://gist.github.com/cancastilho/${gist.id}.json`,
                dataType: 'jsonp'
            })
        });
    },

    setupController(controller, model) {
        controller.set('gist', model.gist);
        controller.set('conteudo', model.conteudo);
        controller.set('gistMarkdownJson', model.gistMarkdownJson.div);
    }


});
