import Ember from 'ember';

var GistView = Ember.Component.extend({

    gist: Ember.computed('params.[]', function() {
        return this.get('params')[0];
    }),

    didRender() {
        this._super(...arguments);
        // let linkEmbeddedGist = `https://gist.github.com/${this.gist.id}.js`;

        // //Gambiarra para buscar gist renderizado
        // var oldDocumentoWrite = document.write;
        // document.write = function(node){
        //     Ember.$("#gist-div").html(node);
        // };
        // Ember.$.getScript(linkEmbeddedGist,function( data, textStatus, jqxhr ) {
        //     document.write = oldDocumentoWrite;
        // });

    }

});

export default GistView;
