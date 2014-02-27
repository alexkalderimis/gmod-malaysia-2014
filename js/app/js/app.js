'use strict';

// Declare app level module which depends on filters, and services
angular.module('GMODMalaysiaApp', [
  'ngRoute',
  'GMODMalaysiaApp.filters',
  'GMODMalaysiaApp.services',
  'GMODMalaysiaApp.directives',
  'GMODMalaysiaApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/genes', {
    templateUrl: 'partials/genes.html',
    controller: 'GenesCntl'
  });
  $routeProvider.when('/genes/:taxonId', {
    templateUrl: 'partials/genes.html',
    controller: 'GenesCntl'
  });
  $routeProvider.when('/lists', {
    templateUrl: 'partials/lists.html',
    controller: 'ListsCtrl'
  });
  $routeProvider.when('/list/:name', {
    templateUrl: 'partials/list.html',
    controller: 'ListCtrl'
  });
  $routeProvider.when('/organisms', {
    templateUrl: 'partials/organisms.html',
    controller: 'OrganismCtrl'
  });
  $routeProvider.when('/widgets', {
    templateUrl: 'partials/widgets.html',
    controller: 'WidgetsCtrl'
  });
  $routeProvider.when('/enrichment/:list/:widget', {
    templateUrl: 'partials/enrichment.html',
    controller: 'EnrichmentCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/organisms'});
}]);
