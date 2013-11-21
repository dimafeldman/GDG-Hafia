var Gdg = angular.module('Gdg', []);

Gdg.clickEventType = 'click'; //#TODO: detect mobile

/**************************************
 * FACTORIES
 **************************************/
Gdg.factory("personsList", function() {

    if (document.persons) {
        return {
            list       : document.persons.list
        }
    }

});

/**************************************
 * DIRECTIVES
 **************************************/



/**************************************
 * CONTROLLER: personsController  *
 **************************************/
Gdg.controller("personsController", function ($scope, personsList) {

    $scope.data = {
        title   : 'Persons list',
        list    : personsList.list,
        orderBy : 'name'
    };

    // Fetch data
    //$scope.presons = $resource('/persons.json');

    return $scope.personsController = this;
});


