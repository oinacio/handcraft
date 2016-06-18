/* global angular */
/* jshint maxlen: 105 */
angular
    .module('app')
    .controller('AddHandcraftCtrl', ['$scope', 'Handcraft', '$state',
                                       function ($scope, Handcraft, $state) {
            $scope.action = 'Add';
            $scope.handcraft = {};

            $scope.submitForm = function () {
                Handcraft
                    .create({
                        name: $scope.handcraft.name,
                        image: $scope.handcraft.image,
                        segment: $scope.handcraft.segment,
                        feedstock: $scope.handcraft.feedstock,
                        category: $scope.handcraft.category,
                        //label: $scope.handcraft.label,
                        price: $scope.handcraft.price,
                        description: $scope.handcraft.description
                    })
                    .$promise
                    .then(function () {
                        $state.go('all-handcraft');
                    });
            };
}])
    .controller('AllHandcraftCtrl', ['$scope', 'Handcraft', '$state', '$stateParams', function (
        $scope, Handcraft, $state, $stateParams) {

        $scope.handcraft = Handcraft.find({});



}])
    .controller('ViewDetailsCtrl', ['$scope', '$q', 'Handcraft', 'Comment', 'Customer', 'Favorite' ,'$rootScope', '$state', '$stateParams',
                                    function ($scope, $q, Handcraft, Comment, Customer, Favorite ,$rootScope, $state, $stateParams) {


            $scope.comment = {
                rating: 5,
                description: '',
                favorite: false
            };

            $scope.hand = {};
            $scope.fav = false;
            $scope.favdisplay = 'Add Favorite';
                                        
            $scope.makeFavorite = function() {
                $scope.fav = !$scope.fav;
                $scope.favdisplay = $scope.fav ? 'Your Favorite' : 'Add Favorite';
                
            };


            

            Handcraft
                .findById({
                    id: $stateParams.id,
                    filter: {
                        include: [
                            {
                                relation: 'comments'

                            },
                            {
                                relation: 'customer'

                            },

                    ]
                    }
                })
                .$promise
                .then(function (data) {
                    $scope.hand = data;

                    /*        console.log('data: ' + JSON.stringify(data)); */

                });


            $scope.submitComment = function () {
                console.log('comment.favorite '+ $scope.comment.favorite);
                Comment
                    .create({
                        rating: $scope.comment.rating,
                        comment: $scope.comment.comment,
                        handcraftId: $stateParams.id,
                        favorite: $scope.comment.favorite
                    })
                    .$promise
                    .then(function () {
                        //   $state.go('all-comments');
                        $scope.comment = {
                            rating: 0,
                            description: '',
                            favorite: $scope.fav
                            
                        };
                    });
            };
                                        

}])


.controller('MyHandcraftsCtrl', ['$scope', 'Handcraft', '$rootScope',
      function($scope, Handcraft, $rootScope) {
    $scope.handcrafts = Handcraft.find({
      filter: {
        where: {
          customerId: $rootScope.currentUser.id
        },
        include: [
          { relation: 'comments'},
          { relation: 'customer'}  
        ]
      }
    });
  }]) 
.controller('MyFavoritesCtrl', ['$scope', 'Comment', '$rootScope',
        function ($scope, Comment, $rootScope) {
            $scope.favorites = Comment.find({

                filter: {
                    where: {
                        publisherId: $rootScope.currentUser.id
                    },
                    include: [
                        'handcraft',
                        'customer'
                    ]
                }
            }); 
            
        }])
.controller('DeleteHandcraftCtrl', ['$scope', 'Handcraft', '$state',
      '$stateParams', function($scope, Handcraft, $state, $stateParams) {
    Handcraft
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('all-handcraft');
      });
  }])
.controller('DeleteFavoriteCtrl', ['$scope', 'Comment', '$state',
      '$stateParams', function($scope, Comment, $state, $stateParams) {
    Comment
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('all-handcraft');
      });
  }])
.controller('EditHandcraftCtrl', ['$scope', 'Handcraft', '$state', '$stateParams',
                                       function ($scope, Handcraft, $state, $stateParams) {
            $scope.action = 'Edit';
            $scope.handcraft = Handcraft.findById({id: $stateParams.id});
    
            
                                           
            $scope.submitForm = function () {
                Handcraft
                    .upsert({id: $stateParams.id},{
                        name: $scope.handcraft.name,
                        image: $scope.handcraft.image,
                        segment: $scope.handcraft.segment,
                        feedstock: $scope.handcraft.feedstock,
                        category: $scope.handcraft.category,
                        description: $scope.handcraft.description
                    })
                    .$promise
                    .then(function () {
                        $state.go('all-handcraft');
                    });
            };
}])
;
