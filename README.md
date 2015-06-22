arthcamara.com
=========

**Source files of my personal website: www.arthcamara.com**

This is a statically generated website. It's actually just a landing page I built in less than an hour using other open-source tools. See it in action at [my website](www.arthcamara.com).

Feel free to do anything you want with the code :)

##Get Started

How to build the site locally:

1. First of all, you need to have Node and NPM (Node Package Manager, which comes with Node) installed. Just go to http://nodejs.org/ and install it. *You might already have it!*
2. If you haven't done this already, download or clone this repo
```
git clone https://github.com/arthurcamara1/arthcamara.com.git
```
3. Browse to the folder ```cd arthcamara.com``` and run the following command to install the dependencies.
```
npm install
```
You may have to use sudo ```sudo npm install```.

4. You're ready to go. Run the following command to build the site:
```
grunt
```

When you run this command, grunt keeps watching for changes, and rebuilds your entire website whenever you add, delete or change source files. If you don't want this option, run ```grunt build``` instead.

Great job! **Open ```web/index.html``` in your browser and you'll be able to see the page running.**

##Quickly built with these:

The page was quickly built in less than an hour using the following projects:
* [jQuery](http://jquery.com/)
* [simpGrunt](https://github.com/arthurcamara1/simpGrunt)
* [Typed.js](https://github.com/mattboldt/typed.js)
* [simpModal](https://github.com/arthurcamara1/simpModal)
* [simpTooltip](https://github.com/arthurcamara1/simpTooltip)
* [Font Awesome](http://fontawesome.io/)
