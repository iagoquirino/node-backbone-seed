var PROJECT = PROJECT || {};

(function () {
    'use strict';

    PROJECT.FooterView = Backbone.View.extend({
        footerTemplate: PROJECT.templates.footer,
        tagName:'footer',
        className:'footer',
        render: function () {
            this.$el.html(this.footerTemplate());
            return this;
        }

    });

}());
