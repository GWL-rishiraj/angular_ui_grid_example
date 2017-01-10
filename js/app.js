var app = angular.module('app', ['ngTouch', 'ui.grid']);
 
app.controller('MainCtrl', ['$scope','$http','uiGridConstants', function ($scope,$http,uiGridConstants) {
 
    $scope.customGridSort = {
        enableSorting: true,
        columnDefs: [
          { field: 'id' },
          { field: 'name' },
          { field: 'username'},
          /*{ field: 'password', },*/
          { field: 'description',enableSorting: false }
        ],
    };

    $scope.customGridFilter = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
          { field: 'id' },
          { field: 'name' },
          { field: 'username'},
          /*{ field: 'password', },*/
            { field: 'description',
                enableSorting: false,
                filter: {
                  term: '1',
                  type: uiGridConstants.filter.SELECT,
                  selectOptions: [ { value: '1', label: 'designer user admin user' }, { value: '2', label: 'manager user developer user' }, { value: '3', label: 'developer user'}, { value: '4', label: 'test user developer user admin user' }, { value: '5', label: 'test user' },{ value: '6', label:'tester user developer user'} ]
                },
                cellFilter: 'mapDescription',
            },
            { field: 'password', filter: {
                                  condition: uiGridConstants.filter.ENDS_WITH,
                                  placeholder: 'ends with'
                                },
            }

        ],
    };

    $http.get("http://192.168.1.38/user_api/").then(function (response) {
        console.log(response.data);
        $scope.myData = response.data.info;
        $scope.customGridSort.data = response.data.info;
        $scope.customGridFilter.data = response.data.info;
    });
/*  $scope.myData = [
    {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
    },
    {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
    },
    {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
    }
];*/
}]);

app.filter('mapDescription', function() {
  var descriptionHash = {
    1: 'designer user admin user',
    2: 'manager user developer user',
    3: 'developer user',
    4: 'test user developer user admin user',
    5: 'test user',
    6: 'tester user developer user'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return descriptionHash[input];
    }
  };
});