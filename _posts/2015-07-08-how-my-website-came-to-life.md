---
layout: post
title: How this website was quickly developed
---

This is my very first post on my new blog. I've been planning on having a technical blog for a while, and now I finally have a place where I can write and publish articles, and share interesting discoveries with whomever stumbles upon [my page](http://arthurcamara.me) .

When I decided to replace my [previous page](http://arthurcamara.me/previous/) with this new version, I knew that I wanted to *accomplish a few things*:

1. The page should be super simple, with minimalistic design.
2. I should develop it in a few hours: ideally, two.
<!--more-->
3. I wanted to share contacts and basic info,
4. I wanted to have a blog.
5. It should be simple to update content and functionalities.
6. It should work well on all devices.
7. It should be open source.

With all that in mind, I thought of various approaches and decided to go with the static site generator **[Jekyll](http://jekyllrb.com/)**.

---

###Getting started

You can start your site by simply running the following:

{% highlight bash %}  
gem install jekyll
jekyll new mysite
cd mysite
jekyll serve
{% endhighlight %}  

The site will be up and running on `127.0.0.1:4000`. You can simply modify settings and CSS to get a decent site in shape.


###Modifying Jekyll's default project

Though I had an out-of-the-box version running, I quickly realized I wanted to spice up my tools a bit in order to code quickly and structure my project better.

For assets management (images, javascript and stylesheets) and pipeline, I installed **[Jekyll Assets](https://github.com/jekyll-assets/jekyll-assets)**. Jekyll Assets takes care of assets digesting, caching, filepaths and makes it all a lot simpler.

It will place an image, for instance, in the correct dist path, write the markup and even take care of caching (the image in the `_site` folder will be renamed to a safe filename such as `image-b764d4990c3ca0bea23f6c401eceb788.png`).

All I had to do was to install the Ruby Gem `jekyll-assets` and add the following to `_plugins/ext.rb`:

{% highlight ruby %} 
require "jekyll-assets"
{% endhighlight %}  

I also wanted to code styles using [Sass/SCSS](http://sass-lang.com/). Jekyll Assets makes it easy to include the preprocessor in the build pipeline. I installed `sass` and included the correct configuration to my [`_config.xml`](https://github.com/arthurcamara1/arthurcamara.me/blob/master/_config.xml).

{% highlight yaml %} 
assets:
  css_compressor: sass
{% endhighlight %}  

####Additional libraries

[Bourbon](http://bourbon.io) can be  extremely useful when it comes to Sass. It is a lightweight library that includes useful Sass mixins like `prefixer()` and `transition()`. We can rely on Bourbon to provide good implementation of commonly used patterns, cross-browser compatible styles, vendor prefixes and much more. It also makes writing code a lot faster. Plus, an inherent advantage of using a Sass library, instead of a vanilla CSS one (like the default Bootstrap stylesheet), is that only features we actually use will end up in the post-processed CSS file, optimizing its size.

Another useful library I used was [Saffron](https://github.com/colindresj/saffron): a collection of mixins that help creating simple CSS3 animations. Though it is not so well documented, it is well structure, which makes it simple to [navigate through the source](https://github.com/colindresj/saffron/tree/master/app/assets/stylesheets/entrances) and use their mixins.

####Instalation should be reproducible

In order to easily reproduce those steps, I included those plugins and libraries in a [`Gemfile`](https://github.com/arthurcamara1/arthurcamara.me/blob/master/Gemfile). Installing became as simple as running:

{% highlight bash %} 
bundle install
{% endhighlight %}  


###With the basic environment setup ready, it's time to develop

After having the basic setup, things went pretty smooth and straightforward. I was able to quickly develop and deploy my site.

I already had mocks for both mobile and desktop versions, so I simply worked on coding the markup and stylesheets.

<p class='image-paragraph'>
{% image blog/2015-07-08-website.png alt="Desktop version" %}
</p>

<p class='image-paragraph'>
{% image blog/2015-07-08-website-phone.jpg alt="Mobile version" %}
</p>

In fact, most of the time was spent fine tuning the animation and styles, and making sure the website remained responsive. I probably spent an equal amount of time (or longer) writing this blog post.

Finally, I decided to add Disqus comments to the blog, and try some basic cross-browser testing with [Browserstack](https://www.browserstack.com), just to make sure it renders fine in most browsers.


###Feel free to grab the code

If you'd like to clone the project, visit [the repo on GitHub](https://github.com/arthurcamara1/arthurcamara.me) and follow the instructions.

---

###Future work

With a basic page in place, I can keep working on the blog and adding new features gradually. Things I plan to add soon:

- About page, with a bit of my background, experience and education
- Travel page, with pictures of places I've been to
- Maybe a special place to feature side projects

Thanks for visiting the blog, and feel free to leave comments or suggestions below.
