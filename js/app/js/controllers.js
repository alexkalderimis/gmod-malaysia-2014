'use strict';

/* Controllers */

angular.module('GMODMalaysiaApp.controllers', []).
  controller('ListsCtrl', function($scope, $q) {

    $scope.lists = [];
    $scope.head = ['name', 'description', 'type', 'size'];
    $scope.sorting = {
      idx: '0',
      dir: 'asc'
    };

    $scope.selectedCls = function (idx) {
      if ($scope.sorting.idx === String(idx))
        return 'sort-' + $scope.sorting.dir;
    };

    $scope.changeSorting = function (idx) {
      var i = String(idx);
      var s = $scope.sorting;
      if (s.idx === i) {
        $scope.sorting.dir = (s.dir === 'asc') ? 'desc' : 'asc';
      } else {
        $scope.sorting = {
          idx: i,
          dir: 'asc'
        };
      }
    };

    $scope.$watch('connection.mine', onChange);

    function onChange () {
      $q.when($scope.connection.mine.fetchLists())
        .then(function(lists) {
          $scope.lists = lists.filter(function (l) {
            return l.status === 'CURRENT';
          });
        });
    }
  })
  .controller('WidgetsCtrl', function($scope, $q) {
    $scope.selectedList = '';
    $q.when($scope.connection.mine.fetchWidgets()).then(function(ws) {
      $scope.widgets = ws;
    });
    $q.when($scope.connection.mine.fetchLists()).then(function(ls) {
      $scope.lists = ls.filter(function(l) { return l.status === 'CURRENT'});
    });
  })
  .controller('EnrichmentCtrl', function($scope, $routeParams) {
    $scope.list = {name: $routeParams.list};
    $scope.enrichment = {name: $routeParams.widget};
    $scope.connection.mine.fetchWidgetMap().then(function (ws) {
      var w = $scope.enrichment.name;
      $scope.enrichment.title = ws[w].title;
      $scope.enrichment.description = ws[w].description;
    });
  })
  .controller('RootCntl', function($scope) {
    $scope.services = [
      {root: "http://www.flymine.org/query", name: "FlyMine"},
      {root: "http://www.mousemine.org/mousemine", name: "MouseMine"},
      {root: "http://www.yeastgenome.org/yeastmine", name: "YeastMine"}
    ];
    $scope.connection = {
      mine: new imjs.Service($scope.services[0]),
      name: $scope.services[0].name
    };
  })
  .controller('URLCntl', function($scope) {

    $scope.newService = $scope.connection.mine;

    $scope.changeRoot = function () {
      $scope.connection.mine = new imjs.Service($scope.newService);
      $scope.connection.name = $scope.newService.name;
    };

  })
  .controller('ListCtrl', function($scope, $routeParams) {
    $scope.query = $scope.connection.mine.fetchList($routeParams.name).then(function(l) {
      $scope.list = l;
      var query = {
        select: [l.type + '.*'],
        where: [[l.type, 'IN', l.name]]
      };
      $scope.$$phase || $scope.$apply();
      return query;
    });
  })
  .controller('ProteinsCntl', function($scope, $routeParams) {
    /* Stub of Proteins Controller */
  })
  .controller('GenesCntl', function($scope, $routeParams) {
    $scope.query = {select: ['Gene.*']};
    if ($routeParams.taxonId) {
      $scope.query.where = {'organism.taxonId': $routeParams.taxonId};
    }
  })
  .controller('OrganismCtrl', function($scope, fetchOrganisms) {

    $scope.organisms = [];

    $scope.$watch('connection.mine', onChange);
    onChange();

    function onChange () {
      fetchOrganisms($scope.connection.mine).then(function(orgs) {
        $scope.organisms = orgs;
      });
    }

  });
