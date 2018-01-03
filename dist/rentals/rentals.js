'use strict';

angular.module('rentfinds.rentals', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rentals', {
            templateUrl: 'rentals/rentals.html',
            controller: 'RentalsCtrl'
        }).
        when('/details/:id', {
            templateUrl: 'rentals/details.html',
            controller: 'DetailsCtrl',
        }).
        when('/add', {
            templateUrl: 'rentals/add.html',
            controller: 'RentalsCtrl'
        }).
        when('/edit/:id', {
            templateUrl: 'rentals/edit.html',
            controller: 'EditCtrl'
        })
    }])

    .controller('RentalsCtrl', ['$scope', '$firebaseArray','$location', function($scope, $firebaseArray,$location) {
        refresh();

        $scope.searchRentals = function(){
          var city =$scope.city;


        var ref = new Firebase('https://rent-186c6.firebaseio.com/rentals');
        var query={
          "city":city
        }
        $scope.rentals = $firebaseArray(ref.orderByChild('city').equalTo(city));

        $scope.showLatest=false;
        $scope.showResults=true;
        }
        $scope.addRental = function() {
            if ($scope.title) { var title = $scope.title; } else { var title = null; }
            if ($scope.phone) { var phone = $scope.phone; } else { var phone = null; }
            if ($scope.email) { var email = $scope.email; } else { var email = null; }
            if ($scope.street_address) { var street_address = $scope.street_address; } else { var street_address = null; }
            if ($scope.city) { var city = $scope.city; } else { var title = null; }
            if ($scope.state) { var state = $scope.state; } else { var state = null; }
            if ($scope.zipcode) { var zipcode = $scope.zipcode; } else { var zipcode = null; }
            if ($scope.price) { var price = $scope.price; } else { var price = null; }
            if ($scope.bedrooms) { var bedrooms = $scope.bedrooms; } else { var bedrooms = null; }
            if ($scope.description) { var description = $scope.description; } else { var description = null; }
            if ($scope.image_url) { var image_url = $scope.image_url; } else { var image_url = 'data:image/jpeg;base64,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'; }

            $scope.rentals.$add({
                title: title,
                email: email,
                phone: phone,
                street_address: street_address,
                city: city,
                state: state,
                zipcode: zipcode,
                bedrooms: bedrooms,
                price: price,
                description: description,
                image_url: image_url,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                console.log('Added Record with' + id);
                $scope.msg = "Your Rental has Added to the list";
                clearFields();
            });

        }
        $scope.removeRental=function(rental,id){

           var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+id);
           ref.remove();
           $scope.msg="Rental Removed";
           $location.path('/#rentals');
        }

        function clearFields() {
            console.log("Clearing all Fields");
            $scope.title = "";
            $scope.phone = "";
            $scope.email = "";
            $scope.bedrooms = "";
            $scope.price = "";
            $scope.description = "";
            $scope.street_address = "";
            $scope.zipcode = "";
            $scope.city = "";
            $scope.image_url = "";
            $scope.state = "";

        }
        $scope.refresh = function(){
    refresh();
  }
        function refresh(){

        var ref = new Firebase('https://rent-186c6.firebaseio.com/rentals');
        $scope.rentals =$firebaseArray(ref);
        $scope.showLatest=true;
        $scope.showResults=false;
      }
    }])

    .controller('DetailsCtrl', ['$scope','$firebaseObject','$routeParams',function($scope,$firebaseObject,$routeParams) {
        // Get Id From Url

        $scope.id=$routeParams.id;
        // Get Db instance access
        var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ $scope.id);
        // Get rental data

        var rentalData= $firebaseObject(ref);
        // Binding Data To Scope

        rentalData.$bindTo($scope,"data");
    }])
    .controller('EditCtrl', ['$scope','$routeParams','$firebaseObject',function($scope,$routeParams,$firebaseObject) {
          $scope.id=$routeParams.id;
        // Get Db instance access
        var ref= new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ $scope.id);
        // Get rental data

        var rentalData= $firebaseObject(ref);
        // Binding Data To Scope

        rentalData.$bindTo($scope,"data");


        $scope.editRental=function(rental,id){
          var ref=new Firebase('https://rent-186c6.firebaseio.com/rentals/'+ id);
          $scope.msg="Rental Updatedss";
        }
    }])