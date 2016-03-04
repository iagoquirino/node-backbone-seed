var PROJECT = PROJECT || {};

(function () {
    'use strict';

    PROJECT.HeaderView = Backbone.View.extend({
        headerTemplate: PROJECT.templates.header,
        tagName:'nav',
        className:'navbar navbar-default navbar-fixed-top',
        render: function () {
            this.$el.html(this.headerTemplate());
            return this;
        }

    });

}());
