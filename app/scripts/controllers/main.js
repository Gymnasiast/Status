angular.module('statusieApp')
    .controller('MainCtrl', function ($scope, Status) {
        'use strict';

        var features;

        Status.load()
            .then(function (data) {
                features = data.features;

                $scope.features = _.clone(features);
                $scope.categories = data.categories;
                $scope.browsers = data.browsers;

            });

        $scope.limit = 0;

        $scope.$on('filtersUpdated', function () {
            var filteredFeatures = _.clone(features);
            //TODO: optimize these iterations, maybe do it over features and apply all rules?
            _.forOwn($scope.filters, function (categoryFilters) {
                if (!Array.isArray(categoryFilters)) {
                    return;
                }
                _.forEach(categoryFilters, function (value) {
                    filteredFeatures = _.reduce(filteredFeatures, value);
                });
            });

            $scope.features = _.sortBy(filteredFeatures, function (feature) {
                return feature.name;
            });

            $scope.limit = $scope.features.length;
        });

        //Animation for info keys
        $('#infoButton').click(function () {
            if ($('.features-keys').css('display') == 'none') {
                $('.features-keys').show(0);
                $('.features-keys').addClass('visible');
            } else {
                $('.features-keys').removeClass('visible');
                setTimeout(function () {
                    $('.features-keys').hide(0);
                }, 300);
            }
        });
    });