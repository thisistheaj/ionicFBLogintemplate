angular.module('starter.controllers', ['firebase', 'starter.services'])

  .controller('DashCtrl', function($scope) {

  })

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };

  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope, Auth, $state) {
    $scope.settings = {
      enableFriends: true
    };

    $scope.logout = function() {
      Auth.$unauth();
      $state.go('login');
    };
  })

  .controller("LoginCtrl", function($scope, Auth, $state) {

    $scope.login = function() {
      Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
        // User successfully logged in
      }).catch(function(error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthPopup("facebook").then(function(authData) {
            // User successfully logged in. We can log to the console
            // since we’re using a popup here
            console.log(authData);
            //$scope.authData = authData; // This will display the user's name in our view
          });
        } else {
          // Another error occurred
          console.log(error);
        }
      });
    };

    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
        $scope.authData = null;
      } else {
        console.log("Logged in as", authData.uid);
        $state.go('tab.dash');
      }
      $scope.authData = authData; // This will display the user's name in our view
    });

  });
