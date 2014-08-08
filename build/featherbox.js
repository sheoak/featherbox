/*
 * featherbox.js
 * Copyright (C) 2014 Yannick Huerre <yannick.huerre@gmail.com>
 *
 * Distributed under terms of the MIT license.
 *
 * TODO: add some basic options
 * TODO: close btn
 */
define(['jquery'], function() {
    return {
        box: false,
        mask: false,
        config: {
            fadeDuration: 400,
            closeButton: true,
            selector: '[data-featherbox]'
        },
        // creat callback to open featherbox with link
        // having [data-featherbox] attribute
        init: function(config) {

            var self = this;

            this.configure(config);

            $(document).ready(function() {
                $(self.config.selector).click(function(e) {
                    e.preventDefault();
                    self.open($(this));
                });
            });
        },
        configure: function(config) {
            this.config = $.extend({}, this.config, config);
        },
        // creates box and open link with ajax
        open: function(link) {

            var self = this,
                href = link.attr('href'),
                body = $('body');

            // generates box if needed
            if (this.box === false)
            {
                this.box = $('<div>').addClass('featherbox');
                body.append(this.box);

                /*
                if (this.config.closeButton)
                {
                    var btn = $('<button>').html('×');
                    $('.featherbox').append(btn);
                }
                */
            }

            // creates mask layer if needed
            if ( this.mask === false)
            {
                this.mask = $('<div>').addClass('feathermask');

                body.append(this.mask);

                // close on click over the mask
                this.mask.click(function(e) {
                    self.hide();
                });
            }

            // and then show it
            self.show();

            // open link in featherbox
            $.get(href, function(data) {
                body.removeClass('featherbox-loading');
                self.box.html(data);
            });

        },
        show: function() {
            console.log(this.box);
            $('body').addClass('featherbox-opened featherbox-loading');
            this.box.fadeIn(this.config.fadeDuration);
            this.mask.fadeIn(this.config.fadeDuration);
        },
        hide: function() {
            this.box.fadeOut(this.config.fadeDuration);
            this.mask.fadeOut(this.config.fadeDuration);
            $('body').removeClass('featherbox-opened');
        },
        // destroy box
        close: function() {
            this.mask.remove();
            this.box.remove();
            this.mask = false;
            this.box  = false;
        }
    }
});
