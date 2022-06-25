---
layout: post
title: "Como configurar o Font Awesome 5 no WordPress 4.8.4?"
date: 2018-01-14 00:00:00 -0300
tags: child-theme fontawesome tema-filho wordpress
---


<p>Primeiramente, se você utiliza algum plugin do wordpress, existe uma chance desse plugin já estar utilizando o Font Awesome. Então antes de tudo, acesse a página principal do seu blog e abra o código fonte do html para verificar se algum plugin carregou o Font Awesome. Se positivo, é só começar a utilizá-lo. Veja abaixo que o plugin AccessPress Social Share já está carregando o Font Awesome:</p>
<p><img width="100%" src="/imagens/html-fontawesome.jpg" alt="Html com fontawesome carregado pelo plugin AccessPress." /></p>
<p>Se esse não for seu caso, será necessário configurá-lo. Se você utiliza um tema padrão do wordpress, como o Twentyfifteen, será necessário primeiro criar um tema filho dele para poder começar a realizar alterações. Isso porque se você alterar diretamente os arquivos do tema twentyfifteen, por exemplo, qualquer atualização que for instalar desse tema irá sobreescrever tudo o que você alterou. Portanto, criaremos um tema filho antes de configurar o FontAwesome para uso.</p>
<p>Neste exemplo, vou criar um tema filho chamado <strong>twentyfifteen-cancastilho</strong> para indicar que esse é um tema derivado do twentyfifteen. Pode ser qualquer nome, mas é boa prática prefixar o nome do seu tema com o nome do tema pai. Para criar o tema basta criar o diretório <strong>$WORPRESS/wp-content/themes/twentyfifteen-cancastilho</strong>. Note que $WORDPRESS deve ser substituído pelo caminho de instalação do seu wordpress. Nesse diretório do novo tema, crie dois arquivos: o arquivo <strong>style.css</strong> e o arquivo <strong>functions.php</strong>.</p>
<p>O arquivo <strong>style.css</strong> deve conter um cabeçalho no formato abaixo para que o wordpress possa incluí-lo em sua lista de temas. Modifique o exemplo abaixo como for apropriado para seu caso, apenas lembre que no campo <strong>Template</strong> você precisa indicar o nome do tema pai.</p>

````css
Theme Name: Twenty Fifteen Cancastilho
Theme URI: http://cancastilho.com.br/blog/wp-content/themes/twentyfifteen-cancastilho/
Description: Tema modificado a partir do tema Twenty Fifteen padrao do wordpress.
Author: Carlos A. N. de C.
Author URI: http://cancastilho.com.br
Template: twentyfifteen
Version: 1.8
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: blog, two-columns, left-sidebar, cancastilho
Text Domain: twenty-fifteen-cancastilho
*/

/* Aqui em baixo você coloca o css customizado do seu tema  */
````
<p>Nesse momento, faça o download do <a href="https://fontawesome.com/">Font Awesome 5</a>, extraia o conteúdo para o diretório <strong>fontawesome-free-5</strong> e copie o conteúdo <strong>./fontawesome-free-5/web-fonts-with-css</strong> para o diretório <strong>$WORPRESS/wp-content/themes/twentyfifteen-cancastilho/fontawesome-free-5/web-fonts-with-css</strong>.</p>
<p>No arquivo <strong>functions.php</strong> inclua o código abaixo. Para mais detalhes consulte a <a href="https://codex.wordpress.org/Child_Themes">documentação</a>:</p>

````php
/* Inclui configuracoes do tema pai */
function my_theme_enqueue_styles() {
  //$parent_style='NOME_DO_TEMA_PAI-style'
  $parent_style='twentyfifteen-style';
  wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
  //wp_enqueue_style('NOME_DO_TEMA_FILHO-style',
  wp_enqueue_style('twentyfifteen-cancastilho-style',
      get_stylesheet_directory_uri() . '/style.css',
      array($parent_style),
      wp_get_theme()->get('Version')
  );
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

/* E aqui está a configuração do fontawesome. */ 
function carregar_font_awesome_5() {
  $url_pro_font_awesome_5 = get_stylesheet_directory_uri() . '/fontawesome-free-5/web-fonts-with-css/css/fontawesome-all.min.css';
  wp_enqueue_style('load-fa5',  $url_pro_font_awesome_5) ;
}
add_action('wp_enqueue_scripts', 'carregar_font_awesome_5');

?>
````
<p>Isso conclui o processo de criação do seu tema filho e configuração do Font Awesome 5 nele. Agora, basta navegar até <strong>http://SEU_SITE/wp-admin/themes.php</strong> e ativar o tema filho criado.</p>
<p>Para testar se a configuração está funcionando, você pode criar uma nova página de teste no blog e incluir um dos <a href="https://fontawesome.com/icons?d=gallery&amp;m=free">ícones</a> do Fonte Awesome 5 como o abaixo:</p>

````html
<i class="fab fa-facebook-messenger"></i>
````

<p>Visualize a página de teste. Se o ícone aparecer corretamente, então a configuração foi bem sucedida. Se não, vai precisar conferir onde deu errado.</p>
