var PROJECT = PROJECT || {};

(function () {
    'use strict';

    PROJECT.ApplicationView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            var pageViewName = this.required(options, 'pageView');
            this.params = options;
            this.page = this.instantiatePageView(pageViewName);
            this.header = new PROJECT.HeaderView();
            this.footer = new PROJECT.FooterView();
        },

        render: function () {
            this.$el.html(this.header.render().el)
            .append(this.page.render().el)
            .append(this.footer.render().el);
            return this;
        },

        required: function (options, propertyName) {
            var property = options[propertyName];
            if (_.isEmpty(property)) {
                throw new Error('A "' + propertyName + '" in this application');
            }

            return property;
        },

        instantiatePageView: function (viewName) {
            var View = PROJECT[viewName];
            if(!_.isEmpty(View)){
                return new View(_.pick(this.params, 'viewParams'));
            }else{
                throw new Error('Page view ' + viewName + ' not found.');
            }
        }

    });

}());
