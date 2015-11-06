---
layout: post
title: The power of @for loops in Sass
---

A couple of people have asked me how the animations on my website were made. While [I mentioned before that Saffron was used for  fading transitions](http://arthcamara.com/2015/07/08/how-my-website-came-to-life/), I didn't quite get into details on how they were timed correctly.

The animation of the [social buttons](http://codepen.io/arthurcamara1/pen/zvqVQP#0) is an interesting example. All is done is [Sass](http://sass-lang.com/), uing the power of `@for` loops:

![Social Buttons Animation](http://arthcamara.com/public/posts/sassfor/websitesocial.gif)
{: style="text-align: center;" class="spaced"}

<!--more-->

###How the buttons fade in

The Sass code looks similar to this:

{% highlight scss %}
$num-buttons: 5
$speed: 0.6s

.social-icon
  @for $i from 1 through $num-buttons
    &:nth-child(#{$i})
      @include fadeInRight($speed, $i * 0.25s )
{% endhighlight %} 

It basically loops through numbers 1 to 5 (number of buttons), including the correct animation mixin for each button. The mixin `fadeInRight` receives two arguments: `$speed` and `$delay`. The delay for each button is a quarter of a second higher, thus generating the ordered entrance.

The resulting CSS looks more or less like this:

{% highlight css %}
.social-icon:nth-child(1) {
  animation: fadeInRight 0.6s 0.25s forwards;
  /*...*/
}
.social-icon:nth-child(2) {
  animation: fadeInRight 0.6s 0.5s forwards;
  /*...*/
}
.social-icon:nth-child(3) {
  animation: fadeInRight 0.6s 0.75s forwards;
  /*...*/
}
/*...*/
{% endhighlight %} 

The source code is a lot smaller and **more maintainable**, because we can focus on the animation and delays rather than fiddling with raw interval values in CSS or calculate them ourselves. If we decide that all buttons should fade in from a different direction, speed, and delay, we would only change one line.

{% highlight scss %}
$num-buttons: 5
$speed: 0.6s

.social-icon
  @for $i from 1 through $num-buttons
    &:nth-child(#{$i})
      @include fadeInTop($speed/2, $i * 1s )
{% endhighlight %} 


Using `@for` loops, we can also accomplish a lot of other creative solutions. You may notice that the color of each button on mouse hover is transitioning from green to blue.

![Image shows that when hovering, colors fade from green to blue](http://arthcamara.com/public/posts/sassfor/socialicons-hovered.png)
{: style="text-align: center;" class="spaced"}

Of course, I could have picked a color for each icon manually, but that's not as fun. Instead, we can use a similar approach:

{% highlight scss %}
$num-buttons: 5
$color-base: #00B285

.social-icon
  @for $i from 1 through $num-buttons
    &:nth-child(#{$i}):hover
      background-color: adjust-hue( $color-base, $i * 7%)
{% endhighlight %} 

I'm using Sass' built-in `adjust-hue` to gradually change the color to a bluish tone. ([read more about Sass color functions here](https://robots.thoughtbot.com/controlling-color-with-sass-color-functions))

You can find the final code snippet on Codepen: [http://codepen.io/arthurcamara1/pen/zvqVQP#0](http://codepen.io/arthurcamara1/pen/zvqVQP#0)


###And a lot more can be done

When you have a lot more elements, this technique can be quite fun, allowing for very insteresting animations.

![Animated bars](http://arthcamara.com/public/posts/sassfor/bars.gif)
{: style="text-align: center;" class="spaced"}

The idea is the same: we bind color values and transition delays to the element's order `$i`.

[Check out the code snippet on Codepen](http://codepen.io/arthurcamara1/pen/xwVvMe)

But *beware* that this is not the most elegant solution for this kind of animation with so many elements. Frame rate on my Macbook Pro is just above 30fps, while you can probably reach the holy 60fps with SVG or canvas based solutions. Plus, the generated CSS is quite large.

{% highlight css %}
.bar:nth-child(1)   { /*...*/ }
.bar:nth-child(2)   { /*...*/ }
.bar:nth-child(3)   { /*...*/ }
/* .bar:nth-child(...) { ... } */
.bar:nth-child(47)  { /*...*/ }
.bar:nth-child(49)  { /*...*/ }
.bar:nth-child(50)  { /*...*/ }
{% endhighlight %} 

Still, isn't it _awesome_ that we can generate so much code with so little Sass?

###Takeaway

`@for` loops in Sass can make your stylesheets' source code simpler and more maintainable. We can achieve interesting effects and animations with properties that can be iterated and variations that depend on the order of the element, such as delay.
