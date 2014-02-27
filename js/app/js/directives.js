'use strict';

/* Directives */


angular.module('GMODMalaysiaApp.directives', []).
  directive('imTable', function ($q) {

    function link (scope, elm, attrs) {
      $q.when(scope.query)
        .then(function(query) {
          var options = {
              type: 'table',
              service: scope.connection.mine,
              query: query
            };
          jQuery(elm[0]).imWidget(options);
        });
    }
        
    return {
      link: link
    };
  })
  .directive('listEnrichment', function ($q, ListWidgets) {
    return function (scope, elm, attrs) {
      var widgets = new ListWidgets(scope.connection.mine);
      elm.addClass('-im-listwidgets');
      widgets.enrichment(scope.enrichment.name, scope.list.name, elm[0], {});
    };
  })
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
