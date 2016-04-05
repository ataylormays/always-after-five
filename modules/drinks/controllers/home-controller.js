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

		// initialize non-scope variables/functions
		emptyQty = function() {
			var emptyQty = {wholeNum:'',
						mixedNum:'',
						unit:''};

			return emptyQty;
		}

		// initialize scope variables
		$scope.cocktail = {
			drinkName: '',
			equipment: [],
			ingredients: [],
			recipe: []
		};

		$scope.glasses = [
			'rocks',
			'highball',
			'tumbler',
			'martini'
		]

		$scope.units = '';
		$scope.currTool = '';
		$scope.currIngredient = '';
		$scope.currStep = '';
		$scope.qty = emptyQty();
		$scope.currQty = emptyQty();
		$scope.showEquipmentView = false;
		$scope.showEquipmentTxtBox = false;
		$scope.showIngredientView = false;
		$scope.showIngredientTxtBoxes = false;
		$scope.showRecipeView = false;
		$scope.showRecipeTxtBox = false;
		$scope.showQtyDropdown = false;

		$scope.fractions = ['1/8','1/4', '3/8', '1/2', '5/8', '3/4','7/8'];
		$scope.units = [' ', 'part', 'dash', 'oz', 'mL', 'cL']

		$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.readyForReview = function() {
			return $scope.cocktail.ingredients.length > 0 && $scope.cocktail.recipe.length > 0;
		};

		$scope.setShowEquipmentView = function(bool) {
			$scope.showEquipmentView = bool;
		}

		$scope.setShowEquipmentTxtBox = function(bool) {
			$scope.showEquipmentTxtBox = bool;
		}

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

		$scope.toggleQtyDropdown = function() {
			$scope.showQtyDropdown = !$scope.showQtyDropdown;
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

		$scope.addEquipment = function(keyEvent, tool) {
			//when pressing enter of non-empty field
			if (keyEvent.which === 13 && tool != ''){
				$scope.cocktail.equipment.push(tool);
				$scope.currTool = '';
				$scope.setShowEquipmentTxtBox(false);
			}
		};

		$scope.selectQtyComponent = function(event, parent, component, value) {
			// scroll to center 
			var containerId = '#' + parent;
			var eventId = '#' + event.target.id.replace('/', '\\\\/');
			$scope.scrollToCenter(containerId, eventId);

			//add value to currQty
			$scope.currQty[component] = value;
			console.log('currQty[component]:' +$scope.currQty[component]);
		}

		$scope.scrollToCenter = function(containerId, scrollToId) {
			console.log('scrollToCenter triggered on '+scrollToId+ ' with container '+containerId);
			var container = $(containerId);
			var scrollTo = $(scrollToId);
			container.animate({
				scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - container.height()/2 + scrollTo.height()/2
			});
			//$('#wholeNumbers').scrollTop();
		};

		$scope.addQty = function() {
			$scope.qty = $scope.currQty;
			console.log($scope.qty);
			console.log($scope.qty.unit.length);

			// clear currQty, close dropdown
			$scope.currQty = emptyQty();
			$scope.toggleQtyDropdown();

		}

		$scope.addIngredient = function(keyEvent, ingredient) {
			//when pressing enter of non-empty field
			if (keyEvent.which === 13 && ingredient != ''){
				// add ingredient to scope, clear & hide fields
				var newIngredient = makeNewIngredient(ingredient);
				$scope.cocktail.ingredients.push(newIngredient);
				$scope.qty = emptyQty();
				console.log($scope.qty);
				console.log('qty emptied, length: ' + $scope.qty.unit.length);
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

		$scope.range = function(min, max){
			var result = [];
			for(i = min; i <= max; i++){
				result.push(i);
			}
			return result;
		};

		makeNewIngredient = function(ingredient) { 
			var newIngredient = {
				wholeNum: $scope.qty.wholeNum,
				mixedNum: $scope.qty.mixedNum,
				unit: $scope.qty.unit,
				name: ingredient
			};

			return newIngredient;
		};
	});

	app.filter('range', function() {
		return function(input, min, max) {
			min = parseInt(min); //Make string input int
			max = parseInt(max);
			for (var i=min; i<max; i++)
				input.push(i);
			return input;
		};
	});

})();