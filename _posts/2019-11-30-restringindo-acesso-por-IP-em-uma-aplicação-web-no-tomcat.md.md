---
layout: post
title:  "Restringindo acesso por IP em uma aplicação web no Tomcat"
date:   2019-11-30 00:00:00 -0300
tags: java Tomcat
---


Recentemente, precisei configurar uma restrição de acesso a um web service desenvolvido em Java. Na situação, apenas alguns IPs poderíam acessá-lo. Esse tipo de configuração é bem simples quando você vai implantar a aplicação no Tomcat, basta incluir o arquivo context.xml na aplicação, no diretório `/SUA_APPLICACAO/META-INF/context.xml`, com o seguinte conteúdo:

````xml
<?xml version="1.0" encoding="UTF-8"?>
<Context>
  <Valve className="org.apache.catalina.valves.RemoteAddrValve" 
         allow="172\.(16|17)\.\d+\.\d+|127\.0\.0\.1" />
         <!-- 
         A expressão regular acima, dentro de 'allow', 
         permite acesso a esta aplicação apenas a partir dos IPs: 
         - 172.16.x.x  
         - 172.17.x.x
         - 127.0.0.1 (localhost)
         -->
</Context>
````

Se acesso for feito de um IP não permitido, o retorno é um status HTTP 403 (Forbidden).

Caso precise de uma configuração parecida, modifique o atributo allow com os IPs que deseja liberar.

O web service foi implantado em um Tomcat na versão 8.5, mas é provável que funcione em versões anteriores também, embora eu não tenha feito o teste.