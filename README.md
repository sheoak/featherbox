#Featherbox

Featherbox is a very lightweight and responsive lightbox in HTML/CSS3/JS.
It uses no image and only a simple CSS to position itself. The loader is made
with CSS and can be replace by your own styles.

Javascript is only use to create the box and show/hide it.
Featherbox only works with content loaded with ajax, it’s not made to show
images in a lightbox ; however your could use the same CSS to do so.


# How it works

The init() method will start observing links having attribute
**data-featherbox** — by default — and will open the link in the href attribute
in the box.

# Responsive

When the screen gets too small, the box takes the full page.


# Dependencies

The code is based on [Requirejs](http://requirejs.org/) and jQuery.
You will need requirejs to make it works.


# Installation

Your jquery resource must be named "jquery" as recommanded by requirejs.
Copy files in your js lib directory (where you most likely put jquery.js)

Include the CSS in the head section (additionnaly you can use SASS sources to
include it in your own SASS files).

Call the javascript in your loader :

    require(['featherbox/featherbox'], function (fb) {
        fb.init();
    });

You can pass some configuration :

    require(['featherbox/featherbox'], function (fb) {
        fb.init({
            fadeDuration: 1000,     // fade duration for showing/hiding the box
            selector: '[data-box]', // selector for the observer
            closeButton: false      // remove default close button
        });
    });

You might want to implement your own observer, and skip the init method:

    require(['jquery', 'featherbox/featherbox'], function (fb) {

        fb.configure({
            fadeDuration: 1000,     // fade duration for showing/hiding the box
            selector: '[data-box]', // selector for the observer
            closeButton: false      // remove default close button
        });

        $(document).ready(function() {

            $('body').on('click', '[data-myattribute]', function(e) {

                fb.open($(this));

            });

        });
    });


The the example file for more details.

