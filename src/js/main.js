$(function() {

	//create sentences
	var sentences = ["My name is Arthur.",
					 "I write ^1000 code.",
				     "I live in Stockholm, Sweden."];

	var random_sentences = ["I listen to good music.",
							"Traveling is my passion.",
							"I google. ^1500 Quite often.",
							"I can spend hours reading Wikipedia.",
							"I believe the world is getting better.",
							"I love being a web developer.",
							"I try to learn something new everyday.",
							"I still get amazed with the simplest things.",
							"Genetic Programming = Awesomeness.",
							"I'm passionate about Responsive Design.",
							"JavaScript is my favorite language atm.",
							"Backbone, jQuery, D3, AngularJS, and Grunt are some of tools I actively use.",
							"favs = ['JavaScript', 'CSS', 'PHP', 'Python', 'Ruby', 'SQL', 'MongoDB'];",
							"My best advice: transparency.",
							"Skydiving is on my bucket list.",
							"I'm 24.",
							"Mobile-first web development is fun!",
							"I read HackerNews and Codrops.",
							"Mom, I love you.",
							"I have a BS Computer Science  ",
							"Open source projects bring happiness.",
							"I push to GitHub.",
							"When I was 12, I wrote my first program."];

	//shuffle random and merge to initial set
	random_sentences = shuffle(random_sentences);
	$.merge(sentences, random_sentences);
	
	//start typing
	$("#text").typed({
	    strings: sentences,
	    typeSpeed: 50, 		// typing speed
        backDelay: 2000, 	// pause before backspacing
        loop: true, 		// loop on or off (true or false)
        loopCount: false, 	// number of loops, false = infiniteis done
    });

    if($( window ).width() > 600) {
		$.simpTooltip();
    }


});

//shuffle an array
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};