'use strict';

/* Services */

// Demonstrate how to register services
var TestingMaterials = angular.module('GMODMalaysiaApp.services', []);

// Have to convert promises so that the digest cycle is triggered.
TestingMaterials.factory('fetchOrganisms', ['$q', function($q) {
  return function (serviceDef) {
    var mine = new imjs.Service(serviceDef);
    return $q.when(mine.query({select: ['Gene.id']}))
             .then(makeParallelReqs)
             .then(combineResponses);

    function makeParallelReqs (q) {
      return $q.all([
        q.summarise('organism.name'),
        mine.rows({from: 'Organism', select: ['name', 'taxonId']})
      ]);
    }
    
    function combineResponses (resolved) {
      var res = resolved[0], orgs = resolved[1],
          i = 0, row, orgsByName = {};
      res = Array.isArray(res) && res || res.results;
      while (row = orgs[i++]) { orgsByName[row[0]] = row[1]; }
      return res.map(function (org) {
        return {
          taxonId: orgsByName[org.item],
          name: org.item,
          count: org.count
        };
      });
    }
  };
}]);

TestingMaterials.factory('ListWidgets', function () {
  return require('list-widgets');
});

TestingMaterials.value('version', '0.1');
