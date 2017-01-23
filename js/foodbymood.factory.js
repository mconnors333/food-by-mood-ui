(function() {
  angular
    .module('foodByMood')
    .factory('FoodFactory', FoodFactory);

  FoodFactory.$inject = ['$http', '$scope'];
    return {
      getFoods: function(){
        $http.get(`${rootUrl}/foods`)
          .then(function(res){
            $scope.foods = res.data;
            $scope.food = undefined;
          });
        }
      };
})();
