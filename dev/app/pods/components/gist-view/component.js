import Ember from 'ember';

var GistView = Ember.Component.extend({

    gist: Ember.computed('params.[]', function() {
        return this.get('params')[0];
    }),

    didRender() {
        this._super(...arguments);
        let linkEmbeddedGist = `https://gist.github.com/${this.gist.id}.js`;
        Ember.$.get(linkEmbeddedGist, function(conteudo){
            let conteudoAjustado = conteudo.replace("document.write('", "").replace("')","");
            Ember.$('#gist-div').html(conteudoAjustado);
        });
    }

});

export default GistView;
