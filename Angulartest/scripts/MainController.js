(function() {

    'use strict';

    angular
        .module('formlyApp')
        .controller('MainController', MainController);

    function MainController(province) {

        var vm = this;

        // The model object that we reference
        // on the <formly-form> element in index.html
        vm.rental = {};


        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the <formly-form> element
        vm.rentalFields = [
            {
                key: 'full_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Name',
                    placeholder: 'Enter your Name',
                    required: true
                }
            },
            {
                key: 'ssn',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'SSN',
                    placeholder: 'Enter your personal number',
                    required: true
                }
            },
            {
                key: 'tel',
                type: 'input',
                templateOptions: {
                    label: 'Tel',
                    placeholder: 'Enter your telephone number',
                    required: true
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true
                }
            },
            {
                key: 'inskriven_sen',
                type: 'input',
                templateOptions: {
                    label: 'Inskriven i värmlands nation sedan VT/HT: ',
                    placeholder: 'Example HT16',
                    required: true
                }
            },
            {
                key: 'has_points',
                type: 'checkbox',
                templateOptions: {
                    label: 'Do you have points you wold like to register?',
                }
            },
            {
                key: 'HP_taken',
                type: 'input',
                templateOptions: {
                    label: 'Total HP taken at Uppsala University while member of Värmlands Nation.' +
                    ' If none has been received then leave this field empty.',
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.has_points'
            },
            {
                key: 'HP_intyg',
                type: 'input',
                templateOptions: {
                    type:'file',
                    label: 'Upload your intyg of your HP that you have stated in previous field.'
                },
                hideExpression: '!model.HP_taken'
            },
            {
                key: 'quarters_months',
                type: 'input',
                templateOptions: {
                    label: 'Total points received from living in Värmlands Nations housing.' +
                    ' 1 point for each month. If none has been received then leave this field empty.',
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.has_points'
            },
            {
                key: 'Nations_points',
                type: 'input',
                templateOptions: {
                    label: 'Total points received from assignments for Värmlands Nation.' +
                    ' 1 point for each month. If none has been received then leave this field empty.',
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.has_points'
            },
            /*{
                key: 'nationswork',
                type: 'multiselect',
                templateOptions: {
                    label: 'Total points received from assignments for Värmlands Nation.' +
                    ' 1 point for each month. If none has been received then leave this field empty.',
                    options: nationswork.getWorkList()
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.Nations_points'
            },*/
            {
                key: 'medsokande',
                type: 'checkbox',
                templateOptions: {
                    label: 'Do you search with a partner?',
                },
            },
            {
                key: 'medsokande.namn',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Name of partner.'
                },
                hideExpression: '!model.medsokande'
            },
            {
                key: 'medsokande.email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email of partner.'
                },
                hideExpression: '!model.medsokande'
            },
            {
                key: 'medsokande.ssn',
                type: 'input',
                templateOptions: {
                    label: 'ID of partner.'
                },
                hideExpression: '!model.medsokande'
            },
            {
                key: 'medsokande.tel',
                type: 'input',
                templateOptions: {
                    label: 'telephone number of partner.'
                },
                hideExpression: '!model.medsokande'
            },
            {
                key: 'rackarbo',
                type: 'checkbox',
                templateOptions: {
                    label: '1:a Rackarbo',
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.email'
            },
            {
                key: 'under25',
                type: 'checkbox',
                templateOptions: {
                    label: 'Are you under 25?',
                },
                // Hide this field if we don't have
                // any valid input in the email field
                hideExpression: '!model.email'
            },
            {
                key: 'province',
                type: 'select',
                templateOptions: {
                    label: 'Province/Territory',
                    // Call our province service to get a list
                    // of provinces and territories
                    options: province.getProvinces()
                },
                hideExpression: '!model.email'
            },
            {
                key: 'license',
                type: 'input',
                templateOptions: {
                    label: 'Driver\'s License Number',
                    placeholder: 'Enter your drivers license number'
                },
                hideExpression: '!model.province',
                validators: {
                    // Custom validator to check whether the driver's license
                    // number that the user enters is valid or not
                    driversLicense: function($viewValue, $modelValue, scope) {
                        var value = $modelValue || $viewValue;
                        if(value) {
                            // call the validateDriversLicense function
                            // which either returns true or false
                            // depending on whether the entry is valid
                            return validateDriversLicence(value)
                        }
                    }
                },
                expressionProperties: {
                    // We currently only have a driver's license pattern for Ontario
                    // so we need to disable this field if we've picked a province/territory
                    // other than Ontario
                    'templateOptions.disabled': function($viewValue, $modelValue, scope) {
                        if(scope.model.province === 'ontario') {
                            return false;
                        }
                        return true;
                    }
                }
            },
            {
                key: 'insurance',
                type: 'input',
                templateOptions: {
                    label: 'Insurance Policy Number',
                    placeholder: 'Enter your insurance policy number'
                },
                hideExpression: '!model.under25 || !model.province',
            }

        ];

        // Tests the input based on a helpful regular expression
        // gratefully borrowed from jQuery.formance by Omar Shammas
        // https://github.com/omarshammas/jquery.formance
        function validateDriversLicence(value) {
            return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
        }

    }

})();