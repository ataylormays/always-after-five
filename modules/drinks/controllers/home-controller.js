(function() {
	console.log('loaded home-controller.js');

	var app = angular.module('drinks', ['ui.bootstrap', 'focus-if']);
	app.controller('homeController', function($scope, $uibModal){
		$scope.title = "Always After Five";

		$scope.openNewDrinkModal = function(){
			var modalInstance = $uibModal.open({
				templateUrl: '/html/newDrinkModal.html',
				controller: 'newDrinkCtrl',
				size: 'lg'
			});
		};
	});

	app.controller('newDrinkCtrl', function ($scope, $uibModalInstance) {

		// initialize scope variables
		$scope.cocktail = {
			drinkName: '',
			ingredients: [],
			recipe: []
		};

		$scope.qty = '';
		$scope.units = '';
		$scope.currIngredient = '';
		$scope.currStep = '';
		$scope.showIngredientView = false;
		$scope.showIngredientTxtBoxes = false;
		$scope.showRecipeView = false;
		$scope.showRecipeTxtBox = false;

		$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.readyForReview = function() {
			return $scope.cocktail.ingredients.length > 0 && $scope.cocktail.recipe.length > 0;
		};

		$scope.setShowIngredientView = function(bool) {
			$scope.showIngredientView = bool;
		}

		$scope.setShowIngredientTxtBoxes = function(bool) {
			$scope.showIngredientTxtBoxes = bool;
		}

		$scope.setShowRecipeView = function(bool) {
			$scope.showRecipeView = bool;
		}

		$scope.setShowRecipeTxtBox = function(bool) {
			$scope.showRecipeTxtBox = bool;
		}

		$scope.setDrinkName = function(keyEvent, drinkName) {
			//when pressing enter of non-empty field
			if (keyEvent.which === 13 && drinkName != ''){
		  		$scope.cocktail.drinkName = drinkName;

		  		//show ingredient view
		  		$scope.setShowIngredientView(true);

				// blur field
				var target = keyEvent.target;
				target.blur();
			}
		};

		$scope.addIngredient = function(keyEvent, qty, units, ingredient) {
			//when pressing enter of non-empty field
			if (keyEvent.which === 13 && ingredient != ''){
				// add ingredient to scope, clear & hide fields
				var newIngredient = makeNewIngredient(qty, units, ingredient);
				$scope.cocktail.ingredients.push(newIngredient);
				$scope.qty = '';
				$scope.units = '';
				$scope.currIngredient = '';
				$scope.setShowIngredientTxtBoxes(false);
			}
		};

		$scope.addStep = function(keyEvent, step) {
			//when pressing enter of non-empty field
			if (keyEvent.which === 13 && step != ''){
				$scope.cocktail.recipe.push(step);
				$scope.currStep = '';
				$scope.setShowRecipeTxtBox(false);
			}
		};

		makeNewIngredient = function(qty, units, ingredient) { 
			var newIngredient = {
				qty: qty,
				units: units,
				name: ingredient
			};

			return newIngredient;
		};
	});

})();