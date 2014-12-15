/*!
 * featherbox.js
 * Copyright (C) 2014 sheoak <dev@sheoak.fr>
 * Distributed under terms of the MIT license.
 */
define(['jquery'], function() {
    "use strict";
    return {
        box: false,
        mask: false,
        config: {
            // show / hide effect’s duration
            fadeDuration: 400,
            // display close btn
            closeButton: true,
            // event selector
            selector: '[data-featherbox]',
            // theme
            classname: 'goose'
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
        open: function(link, config) {

            var self = this,
                href = link.attr('href'),
                body = $('body');

            // tmp config
            config = $.extend({}, this.config, config);

            // generates box if needed
            if (this.box === false)
            {
                this.box = $('<div>')
                    .addClass('featherbox ' + config.classname)
                    .appendTo(body);
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

                if (config.closeButton)
                {
                    var btn = $('<button>').html("×")
                                           .attr('data-featherbox-close', "1")
                                           .addClass('featherbox-close')
                                           .click(function() { self.hide(); });

                    self.box.append(btn);
                }
            });

        },
        show: function() {
            $('body').addClass('featherbox-opened featherbox-loading');
            this.box.fadeIn(this.config.fadeDuration);
            this.mask.fadeIn(this.config.fadeDuration);
        },
        hide: function() {
            // TODO: use CSS transition, remove this
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
