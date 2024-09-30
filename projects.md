---
layout: single
title: "Projects"
permalink: /projects/
author_profile: false
---

<h2>My Projects</h2>

<div class="projects-grid">
  {% assign projects = site.projects %}
  {% for project in projects %}
  <div class="project-item">
    <a href="{{ project.url }}">
      <img src="{{ project.header.image }}" alt="{{ project.header.caption }}" class="project-image">
    </a>
    <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
    <p>{{ project.excerpt }}</p>
    <a href="{{ project.url }}" class="btn">Read More</a>
  </div>
  {% endfor %}
</div>
