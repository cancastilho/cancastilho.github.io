import Ember from 'ember';
const{
    $
} = Ember;

export default Ember.Route.extend({

    model(params) {
        return Ember.RSVP.hash({
            gist: $.ajax({
                url: `https://api.github.com/gists/${params.id}`, 
                dataType: 'jsonp'
            }),
            gistMarkdownJson: $.ajax({
                url:`https://gist.github.com/cancastilho/${params.id}.json`,
                dataType: 'jsonp'
            })
        });
    },

    setupController(controller, model) {
        var gist = this.store.normalize('gist',model.gist.data);
        this.store.push(gist);
        var gistObj = this.store.peekRecord('gist', gist.data.id);
        controller.set('gist', gistObj);
        controller.set('gistMarkdownJson', model.gistMarkdownJson.div);
    }


});
