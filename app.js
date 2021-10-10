var app = angular.module("myApp", ["ngMaterial"]);
app.controller("myCtrl", function ($scope, $mdDialog) {
  $scope.model = [
    { key: "Id1", db: "DB A", name: "Config A", value: "Value A" },
    { key: "Id2", db: "DB B", name: "Config B", value: "Value B" },
  ];
  $scope.showAdvanced = function (ev, model) {
    $mdDialog
      .show({
        controller: DialogController,
        templateUrl: "dialog1.tmpl.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        locals: {
          model: model,
        },
      })
      .then(
        function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        },
        function () {
          $scope.status = "You cancelled the dialog.";
        }
      );
  };
  function DialogController($scope, $mdDialog, model) {
    $scope.model = Object.assign(model);
    $scope.showConfigModel = false;
    $scope.configChange = function () {
      console.log();
      $scope.showConfigModel = true;
      $scope.configModel = $scope.model.filter(
        (m) => m.value == $scope.config
      )[0];
      console.log($scope.configModel);
    };
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }
});
