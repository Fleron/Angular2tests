/**
 * Created by fleron on 2016-12-26.
 */
/**
 * Created by fleron on 2016-12-26.
 */
(function(){

    'use strict';

    angular
        .module('formlyApp')
        .factory('nationswork', nationswork);

    function nationswork() {

        function getWorkList() {
            return [
                {
                    "name": "Klubbverkare",
                    "value":"27"
                },
                {
                    "name":"Heltidare",
                    "value":"35"
                },
                {
                    "name":"Stipendiesekreterare",
                    "value":"7"
                },
                {
                    "name":"något",
                    "value":"new_brunswick"
                },
            ];
        }

        return {
            getWorkList: getWorkList
        }
    }
})();