---
layout: default
---

### Posts

{% for post in site.posts %}
{{ post.date | date: "%d/%m/%Y" }}  <a href="{{ post.url }}">{{ post.title }}</a> <br />
{% endfor %}

