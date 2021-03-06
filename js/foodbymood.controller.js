(function(){
  angular
    .module('foodByMood')
    .controller('FoodCtrl', FoodCtrl)
    .controller('MoodCtrl', MoodCtrl);

  FoodCtrl.$inject = ['$http', '$scope', 'FoodFactory'];
  MoodCtrl.$inject = ['$http', '$scope', 'MoodFactory'];

  var rootURL = 'https://food-by-mood.herokuapp.com/api';

  function MoodCtrl($http, $scope, MoodFactory) {

    //index
    $scope.getMoods = function(){
      MoodFactory.get()
        .then(function(res){
          MoodFactory.moods = res.data;
            console.log(MoodFactory.moods);
            $scope.moods = MoodFactory.moods;
            $scope.mood = undefined;
        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };


// SHOW
    $scope.showMood = function(title){
      $http.get(`${rootURL}/moods/${title}`)
        .then(function(res){
          $scope.mood = res.data;
          console.log($scope.mood);
        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };
  }

  function FoodCtrl($http, $scope, FoodFactory) {
    //index
    $scope.getFoods = function(){

      FoodFactory.get()
        .then(function(res){
          FoodFactory.foods = res.data;
            $scope.foods = FoodFactory.foods;
            $scope.food = undefined;
            var e = document.getElementById("mainSelect");
            // moodVal is the Value of the option element selected.

            var moodVal = e.options[e.selectedIndex].value;


            // Set a empty array for the matching moods/foods
            var myArray = [];

            if (moodVal === "All") {

              for (var i = 0; i < $scope.foods.length; i++){
                // if selected option matches a food in all foods then push it into myArray
                  myArray.push($scope.foods[i]);
                }


            } else {

            for (var i = 0; i < $scope.foods.length; i++) {
              // if selected option matches a food in all foods then push it into myArray
              if (moodVal == $scope.foods[i].mood){
                myArray.push($scope.foods[i]);
              }
            }
          }

            //Sort array by vote values
            myArray.sort(function(a, b){
               return b.votes-a.votes;
           });


            // set the scoped foods to the categories.
            $scope.foods = myArray;

        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };

// SHOW
    $scope.showFood = function(title){
      $http.get(`${rootURL}/foods/${title}`)
        .then(function(res){

          $scope.food = res.data;
          $scope.food.vote = false;
          console.log($scope.food);
        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };

    //delete
    $scope.destroyFood = function(title){
      $http.delete(`${rootURL}/foods/${title}`)
        .then(function(res){
          $scope.food = undefined;
          $scope.getFoods();
          console.log($scope.food);
        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };

    //new
    $scope.createFood = function(food){
      food.votes = 0;
      $http.post(`${rootURL}/foods`, food)
        .then(function(res){

          $scope.foods = res.data;
          console.log($scope.foods);
          $scope.getFoods();
        })
        .catch(function(err){
          if(err)console.log(err);
        });
    };

    //edit
    $scope.editFood = function(food){
      $http.put(`${rootURL}/foods`, food)
        .then(function(res){
          // $scope.getFoods(); //Redirect to Index
          $scope.food = res.data;
          console.log($scope.foods);
        })
        .catch(function(err){
          if(err)console.log(err);
        });
      };

      $scope.voteUp = function(){
        if (!$scope.food.vote){
          $scope.food.votes += 1;
          $scope.food.vote = true;
        }

        $scope.editFood($scope.food);
      };

      $scope.voteDown = function(){
        if (!$scope.food.vote){
          $scope.food.votes -= 1;
          $scope.food.vote = true;
        }
        $scope.editFood($scope.food);
      };


    }


})();
