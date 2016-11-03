import DS from 'ember-data';
import Ember from 'ember';
const {
    attr,
} = DS;

const { 
    computed
} = Ember;

export default DS.Model.extend({
    owner: attr(),

    url: attr('string'),
    forks_url: attr('string'),
    commits_url: attr('string'),
    git_pull_url: attr('string'),
    git_push_url: attr('string'),
    html_url: attr('string'),
    files: attr(),
    //files: {
    //     jpa-java.md: {
    //         filename: "jpa-java.md",
    //         type: "text/plain",
    //         language: "Markdown",
    //         raw_url: "https://gist.githubusercontent.com/cancastilho/a217ce017b68a33b0c9d35b96402def1/raw/a4d4af690ace6f3c901b8ae1730b116523c074b5/jpa-java.md",
    //         size: 131
    //     }
    // },
    public: attr('boolean'),
    created_at: attr('string'),
    updated_at: attr('string'),
    description: attr('string'),
    comments: attr('number'),
    user: attr(),
    comments_url: attr('string'),
    truncated: attr('boolean'),

    criadoEm: computed('created_at', {
        get(){
            let d = this.get('created_at').split('T')[0].split('-');
            return `${d[2]}/${d[1]}/${d[0]}`;
        }
    }),

    criadoEmHora: computed('created_at', {
        get(){
            let d = this.get('created_at').split('T')[1].replace('Z',"").split(":");
            let ajusteFusoHorario = 2;
            return `${d[0] - ajusteFusoHorario}:${d[1]}:${d[2]}`;
        }
    }),

    arquivo: computed('files', {
        get(){
            let files = this.get('files');
            for (let prop in files) {
                if (files.hasOwnProperty(prop)) {
                    return prop;
                }
            }
        }
    }),

    arquivo_raw_url: computed('arquivo', {
        get(){
            let arquivo = this.get('arquivo');
            let files = this.get('files');
            return files[arquivo].raw_url;
        }
    }),

    arquivo_language: computed('arquivo', {
        get(){
            let arquivo = this.get('arquivo');
            let files = this.get('files');
            return files[arquivo].language;
        }
    }),

    e_arquivo_markdown: computed('arquivo',{
        get(){
            let simOuNao = this.get('arquivo_language') === 'Markdown';
            return simOuNao;
        }
    })



    // conteudo: computed('arquivo_raw_url', function(){
    //     return Ember.$.get(this.get('arquivo_raw_url'));
    // })
});
