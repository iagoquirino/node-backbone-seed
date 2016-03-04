var PROJECT = PROJECT || {};

(function () {
    'use strict';

    PROJECT.IndexView = Backbone.View.extend({
        tagName: 'section',
        render: function () {
            this.$el.html('TESTE INDEX VIEW');
            return this;
        }
    });

}());
