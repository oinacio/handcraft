// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
/* global angular */
angular
    .module('app')
    .controller('AllCommentsController', ['$scope', 'Comment', function ($scope,
        Comment) {
        $scope.comments = Comment.find({
            filter: {
                include: [
                    'handcraft',
                    'customer'
                ]
            }
        });
    }])
    .controller('AddCommentController', ['$scope', 'Handcraft', 'Comment',
        '$state', function ($scope, Handcraft, Comment, $state) {
            $scope.action = 'Add';
            $scope.handcrafts = [];
            $scope.selectedHand;
            $scope.comment = {};
            $scope.isDisabled = false;

            Handcraft
                .find()
                .$promise
                .then(function (handcrafts) {
                    $scope.handcrafts = handcrafts;
                    $scope.selectedHand = $scope.selectedHand || handcrafts[0];
                });

            $scope.submitForm = function () {
                Comment
                    .create({
                        rating: $scope.comment.rating,
                        comment: $scope.comment.comment,
                        handcraftId: $scope.selectedHand.id
                    })
                    .$promise
                    .then(function () {
                        $state.go('all-comments');
                    });
            };
        }])
    .controller('DeleteCommentController', ['$scope', 'Comment', '$state',
        '$stateParams', function ($scope, Comment, $state, $stateParams) {
            Comment
                .deleteById({ id: $stateParams.id })
                .$promise
                .then(function () {
                    $state.go('my-comments');
                });
        }])
    .controller('EditCommentController', ['$scope', '$q', 'Handcraft', 'Comment',
        '$stateParams', '$state', function ($scope, $q, Handcraft, Comment,
            $stateParams, $state) {
            $scope.action = 'Edit';
            $scope.handcrafts = [];
            $scope.selectedHand;
            $scope.comment = {};
            $scope.isDisabled = true;

            $q
                .all([
                    Handcraft.find().$promise,
                    Comment.findById({ id: $stateParams.id }).$promise
                ])
                .then(function (data) {
                    var handcrafts = $scope.handcrafts = data[0];
                    $scope.comment = data[1];
                    $scope.selectedHand;

                    var selectedHandIndex = handcrafts
                        .map(function (handcraft) {
                            return handcraft.id;
                        })
                        .indexOf($scope.comment.handcrarftId);
                    $scope.seletedHand = handcrafts[selectedHandIndex];
                });

            $scope.submitForm = function () {
                $scope.comment.handcraftId = $scope.selectedHand.id;
                $scope.comment
                    .$save()
                    .then(function (comment) {
                        $state.go('all-reviews');
                    });
            };
        }]);
 /*   .controller('MyCommentsController', ['$scope', 'Comment', '$rootScope',
        function ($scope, Comment, $rootScope) {
            $scope.comments = Comment.find({

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
        }]);*/
