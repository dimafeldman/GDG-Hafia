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

    // METHOD: handles all activites ajax calls
    var personsAjax = function(actionType, id, name, val, successCallback, errorCallback) {

        actionType      = (actionType != null)                   ? actionType      : 'update';
        successCallback = (typeof successCallback == 'function') ? successCallback : function(){};
        errorCallback   = (typeof errorCallback == 'function')   ? errorCallback   : function(){};

        // set default ajax setting
        var ajaxSettings = {
            type       : 'post',
            url        : '/',
            dataType   : 'json',
            data       : {},
            error      : function(response) {
                console.log('something went wrong');
                errorCallback(response);
            },
            statusCode : {
                200: function(response) {

                    if (response.errors) {
                        console.log(response.errors);
                        errorCallback(response.errors);
                    } else {
                        console.log('all good');
                        successCallback();
                    }
                }
            }
        };

        // set ajax setting according to the actionType
        switch(actionType) {
            case 'add':
                ajaxSettings.type = 'post';
                ajaxSettings.url  = '/persons/add';
                ajaxSettings.data = {
                    name        : name,
                    value       : val
                };
            break;
            case 'update':
                ajaxSettings.type = 'put';
                ajaxSettings.url  = '/persons/update';
                ajaxSettings.data = {
                    person_id : id,
                    name        : name,
                    value       : val
                };
            break;
            case 'delete':
                ajaxSettings.type = 'delete';
                ajaxSettings.url  = '/persons/delete';
                ajaxSettings.data = {
                    preson_id : id
                };
            break;
        }

        $.ajax(ajaxSettings);
    };

    return $scope.personsController = this;
});


