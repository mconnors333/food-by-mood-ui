(function(){
  angular
    .module('foodByMood')
    .directive('foodShow', foodShow);

function foodShow() {
    return {
      restrict: 'E',
      template:
         `<div ng-show="food" class="container">
            <div class="food showFoods">
              <h2>{{food.title}}</h2>
              <img src="{{food.photoUrl}}">
              <h5>{{food.prepTime}} minutes to prepare</h5>
              <h5>{{food.cookTime}} minutes to cook</h5>
              <h5>Ingredients: {{food.ingredients}}</h5>
              <h5>{{food.description}}</h5>
              <h5>{{food.instructions}}</h5>
              <h5>What's your mood?  {{food.mood}}</h5>

              <div class="container-votes">
              <p ng-click="voteUp()" class="vote change">+</p>
              <p class="vote">Votes:<br> {{food.votes}}</p>
              <p ng-click="voteDown()" class="vote change">-</p>
              </div>
              <button ng-click="destroyFood(food.title)">Delete this food</button>
            </div>
          </div>

          <div class="container">
            <form ng-show="food" class="food" ng-submit="editFood(food)">
              <h4>Edit Food</h4>
              <label for="title">Title</label><br>
              <input type="text" ng-model="food.title"><br>

              <label for="photoUrl">Photo URL</label><br>
              <input type="text" ng-model="food.photoUrl"><br>

              <label for="prepTime">Prep Time</label><br>
              <input type="text" ng-model="food.prepTime"><br>

              <label for="cookTime">Cook Time</label><br>
              <input type="text" ng-model="food.cookTime"><br>

              <label for="ingredients">Ingredients</label><br>
              <input type="text" ng-model="food.ingredients"><br>

              <label for="description">Description</label><br>
              <input type="text" ng-model="food.description"><br>

              <label for="instructions">Instructions</label><br>
              <input type="text" ng-model="food.instructions"><br>

              <label for="mood">Mood</label><br>
              <select ng-model="food.mood">
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Healthy">Healthy</option>
                <option value="Comfortable">Comfortable</option>
                <option value="Exciting">Excited</option>
                <option value="Scary">Scared</option>
                <option value="Drunk">Drunk</option>
                <option value="Stoned">Stoned</option>
              </select><br>

              <input type="submit" value="Edit Food">
            </form>
          </div>

          <div class="footer">
          <p>Made by <a href="http://matt-connors.com/" target="_blank">Matthew Connors</a>, <a href="https://murphypicard.github.io/" target="_blank">Ara Yaghsizian</a>, and <a href="http://sandypok.com" target="_blank">Sandy Pok</a>.</p>
          </div>`



    };
  }

})();
