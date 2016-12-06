app.controller('profileCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$window', '$timeout', '$rootScope', '$compile', '$aside', '$animate', '$q', '$modal', 'Upload', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $window, $timeout, $rootScope, $compile, $aside, $animate, $q, $modal, Upload) {
    //console.log("welcome", $routeParams.cid);


    $scope.c = $routeParams.cid;
	$scope.showComplianceSection = false;
	
	$scope.changingFieldArray = [];
	$scope.changingFinalData = [];
	
	$scope.timelineData = [];
	$scope.position = 'left';
	
	
	if($rootScope.complianceActive)
		{
				var personalClassContent = angular.element( document.querySelector( '#personalClass' ) );
				personalClassContent.removeClass('active');
//				$animate.removeClass(personalClassContent, 'active');
				var personaldetailsContent = angular.element( document.querySelector( '#personal-details' ) );
				personaldetailsContent.removeClass('active');
//				$animate.removeClass(personaldetailsContent, 'active');
			
				var complianceClassContent = angular.element( document.querySelector( '#complianceClass' ) );
				complianceClassContent.addClass('active');
//				$animate.addClass(complianceClassContent, 'active');
				var complianceContent = angular.element( document.querySelector( '#compliance' ) );
				complianceContent.addClass('active'); 
//				$animate.addClass(complianceContent, 'active');
		}
	
//check permission if compliance or not
	if (($rootScope.staffRole == 'superadmin') || ($rootScope.staffRole == 'compliance'))
		{
			console.log('congrats, you have the compliance permission');
			$scope.showComplianceSection = true;
		}
	
	var editingProfileButtonsTPL = $aside({
        scope: $scope,
        template: '../bookings/editingProfileButtonsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	//approve button
	var approveRedFlagsTpl = $aside({
        scope: $scope,
        template: '../bookings/approveRedFlagsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var invoiceTPL = $aside({
        scope: $scope,
        template: '../bookings/invoiceTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addFlightTPL = $aside({
        scope: $scope,
        template: '../bookings/addFlightTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
		
	var addInsuranceTPL = $aside({
        scope: $scope,
        template: '../bookings/addInsuranceTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	
	var addAccommodationTPL = $aside({
        scope: $scope,
        template: '../bookings/addAccommodationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addTransferTPL = $aside({
        scope: $scope,
        template: '../bookings/addTransferTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addAddonTPL = $aside({
        scope: $scope,
        template: '../bookings/addAddonTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });

	var addCharityTPL = $aside({
        scope: $scope,
        template: '../bookings/addCharityTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addVoucherTPL = $aside({
        scope: $scope,
        template: '../bookings/addVoucherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
		
	var addOtherChargesTPL = $aside({
        scope: $scope,
        template: '../bookings/addOtherChargesTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addNewTripTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/addNewTripTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var editTripTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/editTripTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	$scope.tripTableNodata = false;
	$scope.flightTableNodata = false;
	$scope.insuranceTableNodata = false;
	$scope.accommodationTableNodata = false;
	$scope.transferTableNodata = false;
	$scope.addonTableNodata = false;
	$scope.charityTableNodata = false;
	$scope.travelVoucherTableNodata = false;
	$scope.otherChargesTableNodata = false;
	
 	findFileRecords();
	
    findprofile();
    function findprofile() {
        $http.get('/findProfile?cid=' + $routeParams.cid).success(function (data) {

			
            console.log(data[0]);
            $scope.profile = data[0];
            var email = data[0].email;
            
            //add tc details html
            if ($scope.profile.tc_details == '')
                {
                    $scope.showTC = false;
                }
            else{
                $scope.showTC = true;
                var tcDetails = angular.element(document.querySelector('#tcDetails'));
                tcDetails.append($scope.profile.tc_details);
            }
            
			getFlightsList();
            getInsuranceList();
			getAccommodationList();
			getTransferList();
			getAddonList();
			getCharityList();
			getVoucherList();
			getOtherChargesList();
            //find red notifications
			
				//find all approve status for this customer
			$scope.ApproveMedication = false;
			$scope.ApproveAge = false;
			$scope.ApproveSubject = false;
			$scope.ApproveDrink_driving_convictions = false;
			$scope.ApproveCriminal_convictions = false;
			$scope.ApproveDriving_offences = false;
			$scope.ApproveHealth_conditions = false;
			$scope.ApproveIllicit = false;
			$scope.ApproveDietary = false;
			$scope.ApprovePromotion = false;
			$scope.ApproveTransactionNO = false;
			$scope.ApproveConsultant_guarantee = false;
			$scope.ApproveComments = false;
			
			findApprove('approve').then(function(d) {
    			console.log('test all approve number for this customer', d.length);
				for (var i=0; i<d.length; i++)
					{
						if (d[i].field_name == 'medication')
							{
								$scope.ApproveMedication = true;
							}
						if (d[i].field_name == 'age')
							{
								$scope.ApproveAge = true;
							}
						if (d[i].field_name == 'subject')
							{
								$scope.ApproveSubject = true;
							}
						if (d[i].field_name == 'drink_driving_convictions')
							{
								$scope.ApproveDrink_driving_convictions = true;
							}
						if (d[i].field_name == 'criminal_convictions')
							{
								$scope.ApproveCriminal_convictions = true;
							}
						if (d[i].field_name == 'driving_offences')
							{
								$scope.ApproveDriving_offences = true;
							}
						if (d[i].field_name == 'health_conditions')
							{
								$scope.ApproveHealth_conditions = true;
							}
						if (d[i].field_name == 'illicit')
							{
								$scope.ApproveIllicit = true;
							}
						if (d[i].field_name == 'dietary')
							{
								$scope.ApproveDietary = true;
							}
						if (d[i].field_name == 'promotion')
							{
								$scope.ApprovePromotion = true;
							}
						if (d[i].field_name == 'transactionNO')
							{
								$scope.ApproveTransactionNO = true;
							}
						if (d[i].field_name == 'consultant_guarantee')
							{
								$scope.ApproveConsultant_guarantee = true;
							}
						if (d[i].field_name == 'comments')
							{
								$scope.ApproveComments = true;
							}
					}
				
				
			
				//start set notification
		    $scope.personalNotification = 0;
            $scope.hidePersonalNotification = true;
			var ageIcon = angular.element(document.querySelector('#ageIcon'));
            if ((parseInt($scope.profile.age) < 18) || (parseInt($scope.profile.age) > 30))
                {
                    if ($scope.ApproveAge)
						{
							$scope.checkagered = false;
							ageIcon.empty();
							ageIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkagered = true;
								$scope.personalNotification = $scope.personalNotification + 1;
                    			$scope.hidePersonalNotification = false;
								ageIcon.empty();							
								var ageIconString = '<span ng-mouseover="changeIcon(1)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var ageIconStringCompiled = $compile(ageIconString)($scope);		
								ageIcon.append(ageIconStringCompiled);	
							}
					

                }else
					{
						ageIcon.empty();
						ageIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
            
            $scope.tripNotification = 0;
            $scope.hideTripNotification = true;
			var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
			if ($scope.profile.subject == '')
                {
                    if ($scope.ApproveSubject)
						{
							$scope.checksubjectred = false;
							subjectIcon.empty();
							subjectIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checksubjectred = true;
                    			$scope.tripNotification = $scope.tripNotification + 1;
                    			$scope.hideTripNotification = false;
								subjectIcon.empty();															
								var subjectIconString = '<span ng-mouseover="changeIcon(2)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
								subjectIcon.append(subjectIconStringCompiled);	
							}
					
                }else
					{
						subjectIcon.empty();
						subjectIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
          
            $scope.otherNotification = 0;
            $scope.hideOtherNotification = true;
			var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
            if ($scope.profile.drink_driving_convictions == 'Yes')
                {
                    if ($scope.ApproveDrink_driving_convictions)
						{
							$scope.checkDrinkDriveRed = false;
							drinkDrivingIcon.empty();
							drinkDrivingIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkDrinkDriveRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								drinkDrivingIcon.empty();													
								var drinkDrivingIconString = '<span ng-mouseover="changeIcon(3)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);	
							}
				
                }else
					{
						drinkDrivingIcon.empty();
						drinkDrivingIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
            if ($scope.profile.criminal_convictions == 'Yes')
                {
                    if ($scope.ApproveCriminal_convictions)
						{
							$scope.checkCriminalRed = false;
							criminalIcon.empty();
							criminalIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkCriminalRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								criminalIcon.empty();						
								var criminalIconString = '<span ng-mouseover="changeIcon(4)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
								criminalIcon.append(criminalIconStringCompiled);
							}
                }else
					{
						criminalIcon.empty();
						criminalIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
            if ($scope.profile.driving_offences == 'Yes')
                {
                    if ($scope.ApproveDriving_offences)
						{
							$scope.checkDrivingOffencesRed = false;
							drivingOffencesIcon.empty();
							drivingOffencesIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkDrivingOffencesRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								drivingOffencesIcon.empty();
								var drivingOffencesIconString = '<span ng-mouseover="changeIcon(5)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
								drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
							}
					
                }else
					{
						drivingOffencesIcon.empty();
						drivingOffencesIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
            if ($scope.profile.medication == 'Yes')
                {
                    
					if ($scope.ApproveMedication)
						{
							console.log('this customer is approved for medication issuie');
							$scope.checkMedicationRed = false;
							medicationIcon.empty();
							medicationIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkMedicationRed = true;
								$scope.otherNotification = $scope.otherNotification + 1;
								$scope.hideOtherNotification = false;
								medicationIcon.empty();
								var medicationIconString = '<span ng-mouseover="changeIcon(6)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
								medicationIcon.append(medicationIconStringCompiled);
							}

                }else
					{
						medicationIcon.empty();
						medicationIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var healthIcon = angular.element(document.querySelector('#healthIcon'));
            if ($scope.profile.health_conditions == 'Yes')
                {
                    if ($scope.ApproveHealth_conditions)
						{
							$scope.checkMentalRed = false;
							healthIcon.empty();
							healthIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkMentalRed = true;
								$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								healthIcon.empty();
								var healthIconString = '<span ng-mouseover="changeIcon(7)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var healthIconStringCompiled = $compile(healthIconString)($scope);		
								healthIcon.append(healthIconStringCompiled);
							}
					
                }else
					{
						healthIcon.empty();
						healthIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
            if ($scope.profile.illicit != 'Never')
                {
                    if ($scope.ApproveIllicit)
						{
							$scope.checkIllicitRed = false;
							illicitIcon.empty();
							illicitIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkIllicitRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								illicitIcon.empty();
								var illicitIconString = '<span ng-mouseover="changeIcon(8)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
								illicitIcon.append(illicitIconStringCompiled);
							}
					
                }else
					{
						illicitIcon.empty();
						illicitIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
            if ($scope.profile.dietary == 'Yes')
                {
                    if ($scope.ApproveDietary)
						{
							$scope.checkDietaryRed = false;
							dietaryIcon.empty();
							dietaryIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkDietaryRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								dietaryIcon.empty();
								var dietaryIconString = '<span ng-mouseover="changeIcon(9)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
								dietaryIcon.append(dietaryIconStringCompiled);
							}
						
                }else
					{
						dietaryIcon.empty();
						dietaryIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
            
			$scope.paymentNotification = 0;
            $scope.hidePaymentNotification = true;
			var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
			if ($scope.profile.promotion == '')
                {
                     if ($scope.ApprovePromotion)
						 {
							$scope.checkpromotionred = false;
							promotionIcon.empty();
							promotionIcon.append('<i class="md md-done green icon-color"></i>');
						 }else
							 {
								$scope.checkpromotionred = true;
								$scope.paymentNotification = $scope.paymentNotification + 1;
                    			$scope.hidePaymentNotification = false;
								promotionIcon.empty();
								var promotionIconString = '<span ng-mouseover="changeIcon(10)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
								promotionIcon.append(promotionIconStringCompiled);
							 }
						
                }else
					{
						promotionIcon.empty();
						promotionIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
			if ($scope.profile.transactionNO == '')
                {
                     if ($scope.ApproveTransactionNO)
						 {
							$scope.checktransactionNOred = false;
							transactionIcon.empty();
							transactionIcon.append('<i class="md md-done green icon-color"></i>');
						 }else
							 {
								$scope.checktransactionNOred = true;
                    			$scope.paymentNotification = $scope.paymentNotification + 1;
                    			$scope.hidePaymentNotification = false;
								transactionIcon.empty();
								var transactionIconString = '<span ng-mouseover="changeIcon(11)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
								transactionIcon.append(transactionIconStringCompiled);	 
							 }

                }else
					{
						transactionIcon.empty();
						transactionIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
            $scope.surveyNotification = 0;
            $scope.hideSurveyNotification = true;
			var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
            if ($scope.profile.consultant_guarantee == 'Yes')
                {
                    if ($scope.ApproveConsultant_guarantee)
						{
							$scope.checkConsultantGuaranteeRed = false;
							consultantGuaranteeIcon.empty();
							consultantGuaranteeIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkConsultantGuaranteeRed = true;
                    			$scope.surveyNotification = $scope.surveyNotification + 1;
								$scope.hideSurveyNotification = false;
								consultantGuaranteeIcon.empty();
								var consultantGuaranteeIconString = '<span ng-mouseover="changeIcon(12)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);				
								consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
							}

                }else
					{
						consultantGuaranteeIcon.empty();
						consultantGuaranteeIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
            if ($scope.profile.comments != '')
                {
                    if ($scope.ApproveComments)
						{
							$scope.checkCommentsRed = false;
							commentsIcon.empty();
							commentsIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkCommentsRed = true;
								$scope.surveyNotification = $scope.surveyNotification + 1;
                    			$scope.hideSurveyNotification = false;
								commentsIcon.empty();
								var commentsIconString = '<span ng-mouseover="changeIcon(13)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var commentsIconStringCompiled = $compile(commentsIconString)($scope);				
								commentsIcon.append(commentsIconStringCompiled);
							}
                }else
					{
						commentsIcon.empty();
						commentsIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
				
				
			$scope.changeIcon = function(no) {
                console.log('change icon ');

				if (no == 1)
					{
						var ageIcon = angular.element(document.querySelector('#ageIcon'));
						ageIcon.empty();
					
						var ageIconString = '<span ng-mouseleave="changeIconBack(1)" ng-click="approveIt(1)"><i class="md md-done red icon-color"></i></span>';
						var ageIconStringCompiled = $compile(ageIconString)($scope);		
						ageIcon.append(ageIconStringCompiled);
						
					}else if (no == 2)
						{		
							var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
							subjectIcon.empty();
							
							var subjectIconString = '<span ng-mouseleave="changeIconBack(2)" ng-click="approveIt(2)"><i class="md md-done red icon-color"></i></span>';
							var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
							subjectIcon.append(subjectIconStringCompiled);
						}else if (no == 3)
							{
								
								var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
								drinkDrivingIcon.empty();
								
								var drinkDrivingIconString = '<span ng-mouseleave="changeIconBack(3)" ng-click="approveIt(3)"><i class="md md-done red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);
								
							}else if (no == 4)
								{
									
									var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
									criminalIcon.empty();
									
									var criminalIconString = '<span ng-mouseleave="changeIconBack(4)" ng-click="approveIt(4)"><i class="md md-done red icon-color"></i></span>';
									var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
									criminalIcon.append(criminalIconStringCompiled);
								}else if (no == 5)
									{
										
										var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
										drivingOffencesIcon.empty();
										
										var drivingOffencesIconString = '<span ng-mouseleave="changeIconBack(5)" ng-click="approveIt(5)"><i class="md md-done red icon-color"></i></span>';
										var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
										drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
									}else if (no == 6)
										{
											
											var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
											medicationIcon.empty();
											
											var medicationIconString = '<span ng-mouseleave="changeIconBack(6)" ng-click="approveIt(6)"><i class="md md-done red icon-color"></i></span>';
											var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
											medicationIcon.append(medicationIconStringCompiled);
										}else if (no == 7)
											{
												
												var healthIcon = angular.element(document.querySelector('#healthIcon'));
												healthIcon.empty();
												
												var healthIconString = '<span ng-mouseleave="changeIconBack(7)" ng-click="approveIt(7)"><i class="md md-done red icon-color"></i></span>';
												var healthIconStringCompiled = $compile(healthIconString)($scope);		
												healthIcon.append(healthIconStringCompiled);
											}else if (no == 8)
												{
													
													var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
													illicitIcon.empty();
													
													var illicitIconString = '<span ng-mouseleave="changeIconBack(8)" ng-click="approveIt(8)"><i class="md md-done red icon-color"></i></span>';
													var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
													illicitIcon.append(illicitIconStringCompiled);
												}else if (no == 9)
													{
														
														var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
														dietaryIcon.empty();
														
														var dietaryIconString = '<span ng-mouseleave="changeIconBack(9)" ng-click="approveIt(9)"><i class="md md-done red icon-color"></i></span>';
														var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
														dietaryIcon.append(dietaryIconStringCompiled);
													}else if (no == 10)
														{
															
															var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
															promotionIcon.empty();
															
															var promotionIconString = '<span ng-mouseleave="changeIconBack(10)" ng-click="approveIt(10)"><i class="md md-done red icon-color"></i></span>';
															var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
															promotionIcon.append(promotionIconStringCompiled);
														}else if (no == 11)
															{
																var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
																transactionIcon.empty();
																
																var transactionIconString = '<span ng-mouseleave="changeIconBack(11)" ng-click="approveIt(11)"><i class="md md-done red icon-color"></i></span>';
																var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
																transactionIcon.append(transactionIconStringCompiled);
															}else if (no == 12)
																{
																	
																	var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
																	consultantGuaranteeIcon.empty();
																	
																	var consultantGuaranteeIconString = '<span ng-mouseleave="changeIconBack(12)" ng-click="approveIt(12)"><i class="md md-done red icon-color"></i></span>';
																	var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);		
																	consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
																}else if (no == 13)
																	{
																		var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
																		commentsIcon.empty();
																		
																		var commentsIconString = '<span ng-mouseleave="changeIconBack(13)" ng-click="approveIt(13)"><i class="md md-done red icon-color"></i></span>';
																		var commentsIconStringCompiled = $compile(commentsIconString)($scope);		
																		commentsIcon.append(commentsIconStringCompiled);
																	}
				
				
            };
				
			$scope.changeIconBack = function(no) {
                console.log('change icon back');
				
				if (no == 1)
					{
						var ageIcon = angular.element(document.querySelector('#ageIcon'));
						ageIcon.empty();
						var ageIconString = '<span ng-mouseover="changeIcon(1)"><i class="fa fa-exclamation red icon-color"></i></span>';
						var ageIconStringCompiled = $compile(ageIconString)($scope);		
						ageIcon.append(ageIconStringCompiled);
						
					}else if (no == 2)
						{				
							var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
							subjectIcon.empty();
							var subjectIconString = '<span ng-mouseover="changeIcon(2)"><i class="fa fa-exclamation red icon-color"></i></span>';
							var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
							subjectIcon.append(subjectIconStringCompiled);	
						}else if (no == 3)
							{
								
								var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
								drinkDrivingIcon.empty();
								var drinkDrivingIconString = '<span ng-mouseover="changeIcon(3)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);
							}else if (no == 4)
								{
									
									var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
									criminalIcon.empty();
									var criminalIconString = '<span ng-mouseover="changeIcon(4)"><i class="fa fa-exclamation red icon-color"></i></span>';
									var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
									criminalIcon.append(criminalIconStringCompiled);
								}else if (no == 5)
									{
										
										var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
										drivingOffencesIcon.empty();
										var drivingOffencesIconString = '<span ng-mouseover="changeIcon(5)"><i class="fa fa-exclamation red icon-color"></i></span>';
										var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
										drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
									}else if (no == 6)
										{
											
											var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
											medicationIcon.empty();
											var medicationIconString = '<span ng-mouseover="changeIcon(6)"><i class="fa fa-exclamation red icon-color"></i></span>';
											var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
											medicationIcon.append(medicationIconStringCompiled);
										}else if (no == 7)
											{
												
												var healthIcon = angular.element(document.querySelector('#healthIcon'));
												healthIcon.empty();
												var healthIconString = '<span ng-mouseover="changeIcon(7)"><i class="fa fa-exclamation red icon-color"></i></span>';
												var healthIconStringCompiled = $compile(healthIconString)($scope);		
												healthIcon.append(healthIconStringCompiled);
											}else if (no == 8)
												{
													
													var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
													illicitIcon.empty();
													var illicitIconString = '<span ng-mouseover="changeIcon(8)"><i class="fa fa-exclamation red icon-color"></i></span>';
													var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
													illicitIcon.append(illicitIconStringCompiled);
												}else if (no == 9)
													{
														
														var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
														dietaryIcon.empty();
														var dietaryIconString = '<span ng-mouseover="changeIcon(9)"><i class="fa fa-exclamation red icon-color"></i></span>';
														var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
														dietaryIcon.append(dietaryIconStringCompiled);
													}else if (no == 10)
														{
															
															var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
															promotionIcon.empty();
															var promotionIconString = '<span ng-mouseover="changeIcon(10)"><i class="fa fa-exclamation red icon-color"></i></span>';
															var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
															promotionIcon.append(promotionIconStringCompiled);
														}else if (no == 11)
															{
																var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
																transactionIcon.empty();
																var transactionIconString = '<span ng-mouseover="changeIcon(11)"><i class="fa fa-exclamation red icon-color"></i></span>';
																var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
																transactionIcon.append(transactionIconStringCompiled);
															}else if (no == 12)
																{
																	
																	var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
																	consultantGuaranteeIcon.empty();
																	var consultantGuaranteeIconString = '<span ng-mouseover="changeIcon(12)"><i class="fa fa-exclamation red icon-color"></i></span>';
																	var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);		
																	consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
																}else if (no == 13)
																	{
																		
																		var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
																		commentsIcon.empty();
																		var commentsIconString = '<span ng-mouseover="changeIcon(13)"><i class="fa fa-exclamation red icon-color"></i></span>';
																		var commentsIconStringCompiled = $compile(commentsIconString)($scope);		
																		commentsIcon.append(commentsIconStringCompiled);
																	}
				
            };	
				
				$scope.approveIt = function(p) {
					$scope.fieldname = '';
					
					approveRedFlagsTpl.show();
					
					$scope.p = p;
					console.log('test field', p);
					if (p == 1)
						{
							$scope.fieldname = 'age';
						}else if (p == 2)
							{
								$scope.fieldname = 'subject';
							}else if (p == 3)
								{
									$scope.fieldname = 'drink_driving_convictions';
								}else if (p == 4)
									{
										$scope.fieldname = 'criminal_convictions';
									}else if (p == 5)
										{
											$scope.fieldname = 'driving_offences';
										}else if (p ==6)
											{
												$scope.fieldname = 'medication';
											}else if (p == 7)
												{
													$scope.fieldname = 'health_conditions';
												}else if (p == 8)
													{
														$scope.fieldname = 'illicit';
													}else if (p == 9)
														{
															$scope.fieldname = 'dietary';
														}else if (p == 10)
															{
																$scope.fieldname = 'promotion';
															}else if (p == 11)
																{
																	$scope.fieldname = 'transactionNO';
																}else if (p == 12)
																	{
																		$scope.fieldname = 'consultant_guarantee';
																	}else if (p == 13)
																		{
																			$scope.fieldname = 'comments';
																		}
					
				};
				
				$scope.submitApprove = function() {
					console.log('test field name', $scope.fieldname);
					addNewLog($scope.fieldname, 'NA', 'approve').then(function(data) {
						console.log(data);
						approveRedFlagsTpl.hide();
						
						if ($scope.p == 1)
						{
							$scope.fieldname = 'age';
						}else if ($scope.p == 2)
							{
								$scope.fieldname = 'subject';
							}else if ($scope.p == 3)
								{
									$scope.fieldname = 'drink_driving_convictions';
								}else if ($scope.p == 4)
									{
										$scope.fieldname = 'criminal_convictions';
									}else if ($scope.p == 5)
										{
											$scope.fieldname = 'driving_offences';
										}else if ($scope.p ==6)
											{
												$scope.fieldname = 'medication';
											}else if ($scope.p == 7)
												{
													$scope.fieldname = 'health_conditions';
												}else if ($scope.p == 8)
													{
														$scope.fieldname = 'illicit';
													}else if ($scope.p == 9)
														{
															$scope.fieldname = 'dietary';
														}else if ($scope.p == 10)
															{
																$scope.fieldname = 'promotion';
															}else if ($scope.p == 11)
																{
																	$scope.fieldname = 'transactionNO';
																}else if ($scope.p == 12)
																	{
																		$scope.fieldname = 'consultant_guarantee';
																	}else if ($scope.p == 13)
																		{
																			$scope.fieldname = 'comments';
																		}
						
					});
															
					
				};
				
				$scope.cancelApprove = function() {
					approveRedFlagsTpl.hide();
				};
				
				
				
  			});
			

            
            

            $http.get('/getHubspotData?email=' + email).success(function (data2) {

                if (data2.hs_analytics_source) {
                    $scope.os = data2.hs_analytics_source['value'];
                } else {
                    $scope.os = "NA";
                }

                if (data2.createdate) {
                    $scope.cd = data2.createdate['value'];
                } else {
                    $scope.cd = "NA";
                }




                if (data2.hs_analytics_source_data_1) {
                    $scope.osd = data2.hs_analytics_source_data_1['value'];
                } else {
                    $scope.osd = "NA";
                }

                if (data2.closedate) {
                    $scope.closedate = data2.closedate['value'];
                } else {
                    $scope.closedate = "NA";
                }

                //console.log('ownerid', data2.hubspot_owner_id['value']);
                if (data2.hubspot_owner_id) {
                    var ownerID = data2.hubspot_owner_id['value'];
                    getOwnerName(ownerID);
                } else {
                    $scope.ownerName = "NA";
                }




                function getOwnerName(ownerID) {
                    $http.get('/getOwnerName?ownerID=' + ownerID).success(function (data3) {
                        console.log(data3);
                        if (data3) {
                            $scope.ownerName = data3;
                        } else {
                            $scope.ownerName = "NA";
                        }

                    });
                };



            });
			
//edit contents
			$scope.saveProfileChange = function() {
//                    editingProfileButtonsTPL.hide();
				console.log('saving profile changes starting..');
				$scope.savecontact();
				$scope.savepersonal();
				$scope.savetrip();
				$scope.saveaddons();
				$scope.savetravel();
				$scope.saveother();
				$scope.savepayment();
				$scope.savesurvey();
						
				console.log($scope.changingFieldArray);
				
				for (var i=0; i<$scope.changingFieldArray.length; i++)
					{
						var one = {};
						one.field = $scope.changingFieldArray[i];
						one.value = $scope.profile[one.field];
						one.cid = $routeParams.cid;
						$scope.changingFinalData.push(one);
						
					}
				console.log($scope.changingFinalData);
				var changingFinalDataJSON = JSON.stringify($scope.changingFinalData);     
				$http.post('/updateChangedData?changingFinalDataJSON=' + changingFinalDataJSON).success(function (datar) {
                    console.log(datar);		
					$http.post('/addEditLog?changingFinalDataJSON=' + changingFinalDataJSON + '&cid=' + $routeParams.cid + '&staff=' + $rootScope.name + '&staffid=' + $rootScope.staffID).success(function (datar2) {
                         console.log(datar2);
						editingProfileButtonsTPL.hide();
						$scope.changingFieldArray = [];
						$scope.changingFinalData = [];
						
                      });
					
					
					
                      });
				
            };
			
			$scope.cancelProfileChange = function() {
                editingProfileButtonsTPL.hide();
				console.log('cancel profile changes');
				$scope.view.editableValue = $scope.profile.email;
                $scope.view.editableValue2 = $scope.profile.prefferd_contact_no;
                $scope.view.editableValue3 = $scope.profile.skype;
                $scope.view.editableValue4 = $scope.profile.address;
                $scope.view.editableValue5 = $scope.profile.suburb;
                $scope.view.editableValue6 = $scope.profile.state;
                $scope.view.editableValue7 = $scope.profile.country;
                $scope.view.editableValue8 = $scope.profile.post_code;
                $scope.view.editableValue9 = $scope.profile.first_name;
               	$scope.view.editableValue10 = $scope.profile.last_name;
				
				$scope.viewPersonal.editableValue = $scope.profile.nationality;
                $scope.viewPersonal.editableValue2 = $scope.profile.valid_passport;
                $scope.viewPersonal.editableValue3 = $scope.profile.gender;
                $scope.viewPersonal.editableValue4 = $scope.profile.secondary_contact_no;
                $scope.viewPersonal.editableValue5 = $scope.profile.age;
                $scope.viewPersonal.editableValue6 = $scope.profile.dob;
                $scope.viewPersonal.editableValue7 = $scope.profile.weight;
                $scope.viewPersonal.editableValue8 = $scope.profile.height;
				
				$scope.viewTrip.editableValue = $scope.profile.trip_experience_name; 
                $scope.viewTrip.editableValue2 = $scope.profile.trip_destination;
                $scope.viewTrip.editableValue3 = $scope.profile.trip_code;
                $scope.viewTrip.editableValue4 = $scope.profile.trip_duration;
                $scope.viewTrip.editableValue5 = $scope.profile.trip_price;
				$scope.viewTrip.editableValue6 = $scope.profile.subject;
				
				$scope.viewAddons.editableValue = $scope.profile.addon;
				
				$scope.viewTravel.editableValue = $scope.profile.date_departure;    
                $scope.viewTravel.editableValue2 = $scope.profile.travel_before_exp;
                $scope.viewTravel.editableValue3 = $scope.profile.travel_before_exp_how_long;
                $scope.viewTravel.editableValue4 = $scope.profile.traveL_with_someone;
                $scope.viewTravel.editableValue5 = $scope.profile.traveL_with_someone_who;   
                $scope.viewTravel.editableValue6 = $scope.profile.stay_longer;
				
				$scope.viewOther.editableValue = $scope.profile.emrg_contact_name;     
                $scope.viewOther.editableValue2 = $scope.profile.emrg_contact_relation;
                $scope.viewOther.editableValue3 = $scope.profile.emrg_contact_email;
                $scope.viewOther.editableValue4 = $scope.profile.emrg_contact_number;
                $scope.viewOther.editableValue5 = $scope.profile.drink_driving_convictions;   
                $scope.viewOther.editableValue6 = $scope.profile.drink_driving_convictions_date; 
                $scope.viewOther.editableValue7 = $scope.profile.drink_driving_convictions_bac;
                $scope.viewOther.editableValue8 = $scope.profile.drink_driving_convictions_describe;
                $scope.viewOther.editableValue9 = $scope.profile.criminal_convictions;
                $scope.viewOther.editableValue10 = $scope.profile.criminal_convictions_date;
                $scope.viewOther.editableValue11 = $scope.profile.criminal_convictions_describe;
                $scope.viewOther.editableValue12 = $scope.profile.driving_offences;
                $scope.viewOther.editableValue13 = $scope.profile.driving_offences_date;
                $scope.viewOther.editableValue14 = $scope.profile.driving_offences_describe;
                $scope.viewOther.editableValue15 = $scope.profile.tattoos;
                $scope.viewOther.editableValue16 = $scope.profile.tattoos_describe;
                $scope.viewOther.editableValue17 = $scope.profile.medication;
                $scope.viewOther.editableValue18 = $scope.profile.medication_describe;
                $scope.viewOther.editableValue19 = $scope.profile.health_conditions;
                $scope.viewOther.editableValue20 = $scope.profile.health_conditions_describe;
                $scope.viewOther.editableValue21 = $scope.profile.smoke;
                $scope.viewOther.editableValue22 = $scope.profile.alcohol;
                $scope.viewOther.editableValue23 = $scope.profile.illicit;
                $scope.viewOther.editableValue24 = $scope.profile.dietary;
                $scope.viewOther.editableValue25 = $scope.profile.dietary_describe;
				
				$scope.viewPayment.editableValue = $scope.profile.promotion;     
                $scope.viewPayment.editableValue2 = $scope.profile.transactionNO;
				$scope.viewPayment.editableValue3 = $scope.profile.promotion_detail1;
				$scope.viewPayment.editableValue4 = $scope.profile.promotion_detail2;
				$scope.viewPayment.editableValue5 = $scope.profile.promotion_detail3;
				
				$scope.viewPayment.editableValue6 = $scope.profile.payment_status;
				$scope.viewPayment.editableValue7 = $scope.profile.paid_amount;
				$scope.viewPayment.editableValue8 = $scope.profile.paid_date;
				$scope.viewPayment.editableValue9 = $scope.profile.paid_tc;
				$scope.viewPayment.editableValue10 = $scope.profile.wish_payment_type;
				$scope.viewPayment.editableValue11 = $scope.profile.wish_payment_promotional;
				$scope.viewPayment.editableValue12 = $scope.profile.wish_payment_method;
				$scope.viewPayment.editableValue13 = $scope.profile.wish_payment_amount;
				
				$scope.viewSurvey.editableValue = $scope.profile.hear;     
                $scope.viewSurvey.editableValue2 = $scope.profile.hear_other;
                $scope.viewSurvey.editableValue3 = $scope.profile.friend_name;
                $scope.viewSurvey.editableValue4 = $scope.profile.friend_email;
                $scope.viewSurvey.editableValue5 = $scope.profile.friend_number;   
                $scope.viewSurvey.editableValue6 = $scope.profile.consultant_name;
                $scope.viewSurvey.editableValue7 = $scope.profile.consultant_answer; 
                $scope.viewSurvey.editableValue8 = $scope.profile.consultant_answer_describe; 
                $scope.viewSurvey.editableValue9 = $scope.profile.consultant_guarantee; 
                $scope.viewSurvey.editableValue10 = $scope.profile.consultant_guarantee_describe; 
                $scope.viewSurvey.editableValue11 = $scope.profile.rate;
                $scope.viewSurvey.editableValue12 = $scope.profile.comments;
            };
			
//contact section editing
            $scope.view = {
                editableValue: $scope.profile.email,
                editableValue2: $scope.profile.prefferd_contact_no,
                editableValue3: $scope.profile.skype,
                editableValue4: $scope.profile.address,
                editableValue5: $scope.profile.suburb,
                editableValue6: $scope.profile.state,
                editableValue7: $scope.profile.country,
                editableValue8: $scope.profile.post_code,
                editableValue9: $scope.profile.first_name,
                editableValue10: $scope.profile.last_name,
				id: 'email',
				id2: 'prefferd_contact_no',
				id3: 'skype',
				id4: 'address',
				id5: 'suburb',
				id6: 'state',
				id7: 'country',
				id8: 'post_code',
				id9: 'first_name',
				id10: 'last_name'
            };

			$scope.enableEditorButtons = function(field) {
				
				if($scope.changingFieldArray.indexOf(field) === -1)
					{		
						$scope.changingFieldArray.push(field);
					}
                editingProfileButtonsTPL.show();
            };	

            $scope.savecontact = function() {
                $scope.profile.email = $scope.view.editableValue;
                $scope.profile.prefferd_contact_no = $scope.view.editableValue2;
                $scope.profile.skype = $scope.view.editableValue3;
                $scope.profile.address = $scope.view.editableValue4;
                $scope.profile.suburb = $scope.view.editableValue5;
                $scope.profile.state = $scope.view.editableValue6;
                $scope.profile.country = $scope.view.editableValue7;
                $scope.profile.post_code = $scope.view.editableValue8;
                $scope.profile.first_name = $scope.view.editableValue9;
                $scope.profile.last_name = $scope.view.editableValue10;
                
//                $http.post('/updateProfileContact?cid=' + $routeParams.cid + '&f=' + $scope.profile.first_name + '&l=' + $scope.profile.last_name + '&email=' + $scope.profile.email + '&phone=' + $scope.profile.prefferd_contact_no + '&skype=' + $scope.profile.skype + '&address=' + $scope.profile.address + '&suburb=' + $scope.profile.suburb + '&state=' + $scope.profile.state + '&country=' + $scope.profile.country + '&postcode=' + $scope.profile.post_code).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
			       
//personal section editing
            $scope.viewPersonal = {
                editableValue: $scope.profile.nationality,
                editableValue2: $scope.profile.valid_passport,
                editableValue3: $scope.profile.gender,
                editableValue4: $scope.profile.secondary_contact_no,
                editableValue5: $scope.profile.age,
                editableValue6: $scope.profile.dob,
                editableValue7: $scope.profile.weight,
                editableValue8: $scope.profile.height,
				id: 'nationality',
				id2: 'valid_passport',
				id3: 'gender',
				id4: 'secondary_contact_no',
				id5: 'age',
				id6: 'dob',
				id7: 'weight',
				id8: 'height'
            };

            $scope.savepersonal = function() {
                $scope.profile.nationality = $scope.viewPersonal.editableValue;
                $scope.profile.valid_passport = $scope.viewPersonal.editableValue2;
                $scope.profile.gender = $scope.viewPersonal.editableValue3;
                $scope.profile.secondary_contact_no = $scope.viewPersonal.editableValue4;
                $scope.profile.age = $scope.viewPersonal.editableValue5;
                $scope.profile.dob = $scope.viewPersonal.editableValue6;
                $scope.profile.weight = $scope.viewPersonal.editableValue7;
                $scope.profile.height = $scope.viewPersonal.editableValue8;
                
//                $http.post('/updateProfilePersonal?cid=' + $routeParams.cid + '&nationality=' + $scope.profile.nationality + '&passport=' + $scope.profile.valid_passport + '&gender=' + $scope.profile.gender + '&secondphone=' + $scope.profile.secondary_contact_no + '&age=' + $scope.profile.age + '&dob=' + $scope.profile.dob + '&weight=' + $scope.profile.weight + '&height=' + $scope.profile.height).success(function (data) {
//                         console.log('data updated');  
//                      });

            };

            
//trip section editing
            $scope.viewTrip = {
                editableValue: $scope.profile.trip_experience_name,     
                editableValue2: $scope.profile.trip_destination,
                editableValue3: $scope.profile.trip_code,
                editableValue4: $scope.profile.trip_duration,
                editableValue5: $scope.profile.trip_price,
				editableValue6: $scope.profile.subject,
				id: 'trip_experience_name',
				id2: 'trip_destination',
				id3: 'trip_code',
				id4: 'trip_duration',
				id5: 'trip_price',
				id6: 'subject'
            };

            $scope.savetrip = function() {
                $scope.profile.trip_experience_name = $scope.viewTrip.editableValue;
                $scope.profile.trip_destination = $scope.viewTrip.editableValue2;
                $scope.profile.trip_code = $scope.viewTrip.editableValue3;
                $scope.profile.trip_duration = $scope.viewTrip.editableValue4;
                $scope.profile.trip_price = $scope.viewTrip.editableValue5;
				$scope.profile.subject = $scope.viewTrip.editableValue6;
                
//                $http.post('/updateProfileTrip?cid=' + $routeParams.cid + '&experiencename=' + $scope.profile.trip_experience_name + '&destination=' + $scope.profile.trip_destination + '&code=' + $scope.profile.trip_code + '&duration=' + $scope.profile.trip_duration + '&price=' + $scope.profile.trip_price + '&subject=' + $scope.profile.subject).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
            
            
//add ons section editing
            $scope.viewAddons = {
                editableValue: $scope.profile.addon,
				id: 'addon'
            };

            $scope.saveaddons = function() {
                $scope.profile.addon = $scope.viewAddons.editableValue;
                
//                $http.post('/updateProfileAddons?cid=' + $routeParams.cid + '&addon=' + $scope.profile.addon).success(function (data)                       {
//                         console.log('data updated');  
//                      });

            };
            

//travel section editing
            $scope.viewTravel = {
                editableValue: $scope.profile.date_departure,     
                editableValue2: $scope.profile.travel_before_exp,
                editableValue3: $scope.profile.travel_before_exp_how_long,
                editableValue4: $scope.profile.traveL_with_someone,
                editableValue5: $scope.profile.traveL_with_someone_who,   
                editableValue6: $scope.profile.stay_longer,
				id: 'date_departure',
				id2: 'travel_before_exp',
				id3: 'travel_before_exp_how_long',
				id4: 'traveL_with_someone',
				id5: 'traveL_with_someone_who',
				id6: 'stay_longer'
            };

            $scope.savetravel = function() {
                $scope.profile.date_departure = $scope.viewTravel.editableValue;
                $scope.profile.travel_before_exp = $scope.viewTravel.editableValue2;
                $scope.profile.travel_before_exp_how_long = $scope.viewTravel.editableValue3;
                $scope.profile.traveL_with_someone = $scope.viewTravel.editableValue4;
                $scope.profile.traveL_with_someone_who = $scope.viewTravel.editableValue5;
                $scope.profile.stay_longer = $scope.viewTravel.editableValue6;
                
//                $http.post('/updateProfileTravel?cid=' + $routeParams.cid + '&date_departure=' + $scope.profile.date_departure + '&travel_before_exp=' + $scope.profile.travel_before_exp + '&travel_before_exp_how_long=' + $scope.profile.travel_before_exp_how_long + '&traveL_with_someone=' + $scope.profile.traveL_with_someone + '&traveL_with_someone_who=' + $scope.profile.traveL_with_someone_who + '&stay_longer=' + $scope.profile.stay_longer).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
            
            
 //other section editing
            $scope.viewOther = {
                editableValue: $scope.profile.emrg_contact_name,     
                editableValue2: $scope.profile.emrg_contact_relation,
                editableValue3: $scope.profile.emrg_contact_email,
                editableValue4: $scope.profile.emrg_contact_number,
                editableValue5: $scope.profile.drink_driving_convictions,   
                editableValue6: $scope.profile.drink_driving_convictions_date, 
                editableValue7: $scope.profile.drink_driving_convictions_bac,
                editableValue8: $scope.profile.drink_driving_convictions_describe,
                editableValue9: $scope.profile.criminal_convictions,
                editableValue10: $scope.profile.criminal_convictions_date,
                editableValue11: $scope.profile.criminal_convictions_describe,
                editableValue12: $scope.profile.driving_offences,
                editableValue13: $scope.profile.driving_offences_date,
                editableValue14: $scope.profile.driving_offences_describe,
                editableValue15: $scope.profile.tattoos,
                editableValue16: $scope.profile.tattoos_describe,
                editableValue17: $scope.profile.medication,
                editableValue18: $scope.profile.medication_describe,
                editableValue19: $scope.profile.health_conditions,
                editableValue20: $scope.profile.health_conditions_describe,
                editableValue21: $scope.profile.smoke,
                editableValue22: $scope.profile.alcohol,
                editableValue23: $scope.profile.illicit,
                editableValue24: $scope.profile.dietary,
                editableValue25: $scope.profile.dietary_describe,
				id: 'emrg_contact_name',
				id2: 'emrg_contact_relation',
				id3: 'emrg_contact_email',
				id4: 'emrg_contact_number',
				id5: 'drink_driving_convictions',
				id6: 'drink_driving_convictions_date',
				id7: 'drink_driving_convictions_bac',
				id8: 'drink_driving_convictions_describe',
				id9: 'criminal_convictions',
				id10: 'criminal_convictions_date',
				id11: 'criminal_convictions_describe',
				id12: 'driving_offences',
				id13: 'driving_offences_date',
				id14: 'driving_offences_describe',
				id15: 'tattoos',
				id16: 'tattoos_describe',
				id17: 'medication',
				id18: 'medication_describe',
				id19: 'health_conditions',
				id20: 'health_conditions_describe',
				id21: 'smoke',
				id22: 'alcohol',
				id23: 'illicit',
				id24: 'dietary',
				id25: 'dietary_describe'		
            };

            $scope.saveother = function() {
                $scope.profile.emrg_contact_name = $scope.viewOther.editableValue;
                $scope.profile.emrg_contact_relation = $scope.viewOther.editableValue2;
                $scope.profile.emrg_contact_email = $scope.viewOther.editableValue3;
                $scope.profile.emrg_contact_number = $scope.viewOther.editableValue4;
                $scope.profile.drink_driving_convictions = $scope.viewOther.editableValue5;
                $scope.profile.drink_driving_convictions_date = $scope.viewOther.editableValue6;
                $scope.profile.drink_driving_convictions_bac = $scope.viewOther.editableValue7;
                $scope.profile.drink_driving_convictions_describe = $scope.viewOther.editableValue8;
                $scope.profile.criminal_convictions = $scope.viewOther.editableValue9;
                $scope.profile.criminal_convictions_date = $scope.viewOther.editableValue10;
                $scope.profile.criminal_convictions_describe = $scope.viewOther.editableValue11;
                $scope.profile.driving_offences = $scope.viewOther.editableValue12;
                $scope.profile.driving_offences_date = $scope.viewOther.editableValue13;
                $scope.profile.driving_offences_describe = $scope.viewOther.editableValue14;
                $scope.profile.tattoos = $scope.viewOther.editableValue15;
                $scope.profile.tattoos_describe = $scope.viewOther.editableValue16;
                $scope.profile.medication = $scope.viewOther.editableValue17;
                $scope.profile.medication_describe = $scope.viewOther.editableValue18;
                $scope.profile.health_conditions = $scope.viewOther.editableValue19;
                $scope.profile.health_conditions_describe = $scope.viewOther.editableValue20;
                $scope.profile.smoke = $scope.viewOther.editableValue21;
                $scope.profile.alcohol = $scope.viewOther.editableValue22;
                $scope.profile.illicit = $scope.viewOther.editableValue23;
                $scope.profile.dietary = $scope.viewOther.editableValue24;
                $scope.profile.dietary_describe = $scope.viewOther.editableValue25;
                
//                $http.post('/updateProfileOther?cid=' + $routeParams.cid + '&emrg_contact_name=' + $scope.profile.emrg_contact_name + '&emrg_contact_relation=' + $scope.profile.emrg_contact_relation + '&emrg_contact_email=' + $scope.profile.emrg_contact_email + '&emrg_contact_number=' + $scope.profile.emrg_contact_number + '&drink_driving_convictions=' + $scope.profile.drink_driving_convictions + '&drink_driving_convictions_date=' + $scope.profile.drink_driving_convictions_date + '&drink_driving_convictions_bac=' + $scope.profile.drink_driving_convictions_bac + '&drink_driving_convictions_describe=' + $scope.profile.drink_driving_convictions_describe + '&criminal_convictions=' + $scope.profile.criminal_convictions + '&criminal_convictions_date=' + $scope.profile.criminal_convictions_date + '&criminal_convictions_describe=' + $scope.profile.criminal_convictions_describe + '&driving_offences=' + $scope.profile.driving_offences + '&driving_offences_date=' + $scope.profile.driving_offences_date + '&driving_offences_describe=' + $scope.profile.driving_offences_describe + '&tattoos=' + $scope.profile.tattoos + '&tattoos_describe=' + $scope.profile.tattoos_describe + '&medication=' + $scope.profile.medication + '&medication_describe=' + $scope.profile.medication_describe + '&health_conditions=' + $scope.profile.health_conditions + '&health_conditions_describe=' + $scope.profile.health_conditions_describe + '&smoke=' + $scope.profile.smoke + '&alcohol=' + $scope.profile.alcohol + '&illicit=' + $scope.profile.illicit + '&dietary=' + $scope.profile.dietary + '&dietary_describe=' + $scope.profile.dietary_describe).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
  
            
//payment section editing			
            $scope.viewPayment = {
                editableValue: $scope.profile.promotion,     
                editableValue2: $scope.profile.transactionNO,
				editableValue3: $scope.profile.promotion_detail1,
				editableValue4: $scope.profile.promotion_detail2,
				editableValue5: $scope.profile.promotion_detail3,
				editableValue6: $scope.profile.payment_status,
				editableValue7: $scope.profile.paid_amount,
				editableValue8: $scope.profile.paid_date,
				editableValue9: $scope.profile.paid_tc,
				editableValue10: $scope.profile.wish_payment_type,
				editableValue11: $scope.profile.wish_payment_promotional,
				editableValue12: $scope.profile.wish_payment_method,
				editableValue13: $scope.profile.wish_payment_amount,
				id: 'promotion',
				id2: 'transactionNO',
				id3: 'promotion_detail1',
				id4: 'promotion_detail2',
				id5: 'promotion_detail3',
				id6: 'payment_status',
				id7: 'paid_amount',
				id8: 'paid_date',
				id9: 'paid_tc',
				id10: 'wish_payment_type',
				id11: 'wish_payment_promotional',
				id12: 'wish_payment_method',
				id13: 'wish_payment_amount'

            };

            $scope.savepayment = function() {
                $scope.profile.promotion = $scope.viewPayment.editableValue;
				if($scope.viewPayment.editableValue == 'yes')
					{
						$scope.profile.promotion_detail1 = $scope.viewPayment.editableValue3;
						$scope.profile.promotion_detail2 = $scope.viewPayment.editableValue4;
						$scope.profile.promotion_detail3 = $scope.viewPayment.editableValue5;
					}else
						{
							$scope.profile.promotion_detail1 = '';
							$scope.profile.promotion_detail2 = '';
							$scope.profile.promotion_detail3 = '';
						}

                $scope.profile.transactionNO = $scope.viewPayment.editableValue2;
				
				$scope.profile.payment_status = $scope.viewPayment.editableValue6;
				$scope.profile.paid_amount = $scope.viewPayment.editableValue7;
				$scope.profile.paid_date = $scope.viewPayment.editableValue8;
				$scope.profile.paid_tc = $scope.viewPayment.editableValue9;
				$scope.profile.wish_payment_type = $scope.viewPayment.editableValue10;
				$scope.profile.wish_payment_promotional = $scope.viewPayment.editableValue11;
				$scope.profile.wish_payment_method = $scope.viewPayment.editableValue12;
				$scope.profile.wish_payment_amount = $scope.viewPayment.editableValue13;


//                $http.post('/updateProfilePayment?cid=' + $routeParams.cid + '&promotion=' + $scope.profile.promotion + '&transactionNO=' + $scope.profile.transactionNO + '&promotion_detail1=' + $scope.profile.promotion_detail1 + '&promotion_detail2=' + $scope.profile.promotion_detail2 + '&promotion_detail3=' + $scope.profile.promotion_detail3).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
			
            
//travel survey editing
            $scope.viewSurvey = {
                editableValue: $scope.profile.hear,     
                editableValue2: $scope.profile.hear_other,
                editableValue3: $scope.profile.friend_name,
                editableValue4: $scope.profile.friend_email,
                editableValue5: $scope.profile.friend_number,   
                editableValue6: $scope.profile.consultant_name,
                editableValue7: $scope.profile.consultant_answer, 
                editableValue8: $scope.profile.consultant_answer_describe, 
                editableValue9: $scope.profile.consultant_guarantee, 
                editableValue10: $scope.profile.consultant_guarantee_describe, 
                editableValue11: $scope.profile.rate, 
                editableValue12: $scope.profile.comments,
				id: 'hear',
				id2: 'hear_other',
				id3: 'friend_name',
				id4: 'friend_email',
				id5: 'friend_number',
				id6: 'consultant_name',
				id7: 'consultant_answer',
				id8: 'consultant_answer_describe',
				id9: 'consultant_guarantee',
				id10: 'consultant_guarantee_describe',
				id11: 'rate',
				id12: 'comments'
            };

            $scope.savesurvey = function() {
                $scope.profile.hear = $scope.viewSurvey.editableValue;
                $scope.profile.hear_other = $scope.viewSurvey.editableValue2;
                $scope.profile.friend_name = $scope.viewSurvey.editableValue3;
                $scope.profile.friend_email = $scope.viewSurvey.editableValue4;
                $scope.profile.friend_number = $scope.viewSurvey.editableValue5;
                $scope.profile.consultant_name = $scope.viewSurvey.editableValue6;
                $scope.profile.consultant_answer = $scope.viewSurvey.editableValue7;
                $scope.profile.consultant_answer_describe = $scope.viewSurvey.editableValue8;
                $scope.profile.consultant_guarantee = $scope.viewSurvey.editableValue9;
                $scope.profile.consultant_guarantee_describe = $scope.viewSurvey.editableValue10;
                $scope.profile.rate = $scope.viewSurvey.editableValue11;
                $scope.profile.comments = $scope.viewSurvey.editableValue12;
                
//                $http.post('/updateProfileSurvey?cid=' + $routeParams.cid + '&hear=' + $scope.profile.hear + '&hear_other=' + $scope.profile.hear_other + '&friend_name=' + $scope.profile.friend_name + '&friend_email=' + $scope.profile.friend_email + '&friend_number=' + $scope.profile.friend_number + '&consultant_name=' + $scope.profile.consultant_name + '&consultant_answer=' + $scope.profile.consultant_answer + '&consultant_answer_describe=' + $scope.profile.consultant_answer_describe + '&consultant_guarantee=' + $scope.profile.consultant_guarantee + '&consultant_guarantee_describe=' + $scope.profile.consultant_guarantee_describe + '&rate=' + $scope.profile.rate + '&comments=' + $scope.profile.comments).success(function (data) {
//                         console.log('data updated');  
//                      });

            };

			
			
			//call functions for resume tab
			findResumeProfile($scope.profile.email);
			
			//assign task list
			
							$scope.allTasklists = [
									{	
										name: 'Payment Confirmation',//sales depart
										tid: '1',
										trip: 'general'
									},
									{
										name: 'Payment Reference No',
										tid: '2',
										trip: 'general'
									},
									{
										name: 'Register',
										tid: '3',
										trip: 'general'
									},
									{
										name: 'Promo Confirmation',
										tid: '4',
										trip: 'general'
									},
									{
										name: 'Booking Approval',
										tid: '5',
										trip: 'general'
									},
									{	
										name: 'Trip Subject Added',//admin depart
										tid: '6',
										trip: 'general'
									},
									{
										name: 'Admin Booking Check',
										tid: '7',
										trip: 'general'
									},
									{
										name: 'Added to Zoho',
										tid: '8',
										trip: 'general'
									},
									{
										name: 'Choose a Coordinator',
										tid: '9',
										trip: 'general'
									},
									{
										name: 'Welcome call',//coordination
										tid: '10',
										trip: 'general'
									},
									{
										name: 'Welcome email sent',
										tid: '11',
										trip: 'general'
									},
									{
										name: 'Follow up call every 2 weeks',
										tid: '12',
										trip: 'general'
									},
									{
										name: 'Trip Balance Paid',
										tid: '13',
										trip: 'general'
									},
									{
										name: 'Passport',
										tid: '14',
										trip: 'general'
									},
									{
										name: 'Visa Approved',
										tid: '15',
										trip: 'general'
									},
									{
										name: 'Traveller Profile Submitted online',
										tid: '16',
										trip: 'general'
									},
									{
										name: 'Sent to Travel Department',
										tid: '17',
										trip: 'general'
									},
									{
										name: 'Resume',
										tid: '18',
										trip: 'WH'
									},
									{
										name: 'Photo',
										tid: '19',
										trip: 'WH'
									},
									{
										name: '2 x References',
										tid: '20',
										trip: 'WH'
									},
									{
										name: 'Sent to Destination',
										tid: '21',
										trip: 'WH'
									},
									{
										name: 'Resume',
										tid: '22',
										trip: 'Au Pair'
									},
									{
										name: 'Family Letter',
										tid: '23',
										trip: 'Au Pair'
									},
									{
										name: 'Photo',
										tid: '24',
										trip: 'Au Pair'
									},
									{
										name: 'Personal Profile',
										tid: '25',
										trip: 'Au Pair'
									},
									{
										name: 'Reference',
										tid: '26',
										trip: 'Au Pair'
									},
									{
										name: 'Police Check',
										tid: '27',
										trip: 'Au Pair'
									},
									{
										name: 'Medical Check',
										tid: '28',
										trip: 'Au Pair'
									},
									{
										name: 'First Aid',
										tid: '29',
										trip: 'Au Pair'
									},
									{
										name: 'Sent to Destination',
										tid: '30',
										trip: 'Au Pair'
									},
									{
										name: 'Placement Form',
										tid: '31',
										trip: 'Vol'
									},
									{
										name: 'Resume',
										tid: '32',
										trip: 'Vol'
									},
									{
										name: 'Cover Letter',
										tid: '33',
										trip: 'Vol'
									},
									{
										name: '2 x Photos',
										tid: '34',
										trip: 'Vol'
									},
									{
										name: 'Police Check',
										tid: '35',
										trip: 'Vol'
									},
									{
										name: 'Booking with Partner',
										tid: '36',
										trip: 'Vol'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '37',
										trip: 'Vol'
									},
									{
										name: 'In country follow up',
										tid: '38',
										trip: 'Vol'
									},
									{
										name: 'Resume',
										tid: '39',
										trip: 'Teach'
									},
									{
										name: 'Cover Letter',
										tid: '40',
										trip: 'Teach'
									},
									{
										name: '2 x Photos',
										tid: '41',
										trip: 'Teach'
									},
									{
										name: 'University Transcripts (if applicable)',
										tid: '42',
										trip: 'Teach'
									},
									{
										name: '90 Days prior to departure: Background Check',
										tid: '43',
										trip: 'Teach'
									},
									{
										name: 'Sent information to Partner',
										tid: '44',
										trip: 'Teach'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '45',
										trip: 'Teach'
									},
									{
										name: 'Resume',
										tid: '46',
										trip: 'internship'
									},
									{
										name: 'Cover Letter',
										tid: '47',
										trip: 'internship'
									},
									{
										name: '2 x Photos',
										tid: '48',
										trip: 'internship'
									},
									{
										name: 'Police Check',
										tid: '49',
										trip: 'internship'
									},
									{
										name: 'Sent information to Partner',
										tid: '50',
										trip: 'internship'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '51',
										trip: 'internship'
									},
								];
			
			$scope.salesDepart = [];
			if ($scope.profile.trip_experience_name == 'Working Holiday')
				{
					$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//for sending email, each element change to yes only after confirm clicking, 21
						
					for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'WH'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
					
				}else if ($scope.profile.trip_experience_name == 'Au Pair')
					{
						$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//26
					 	for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Au Pair'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
						
					}else if ($scope.profile.trip_experience_name == 'Teach')
						{
							$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//24
							
							for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Teach'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
							
							
						}else if ($scope.profile.trip_experience_name == 'Volunteer')
							{
								$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//25
								
									for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Vol'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
								
							}else if ($scope.profile.trip_experience_name == 'Internship')
							{
								$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//23
								
									for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'internship'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
								
							}
	
			console.log('test saleDepart array', $scope.salesDepart);
			findAllValues($scope.salesDepart);
			
			
        });
    };
    
    findtravel();
    function findtravel() {
        $http.get('/findtravel?cid=' + $routeParams.cid).success(function (data10) {
                    //console.log(data10);
                    $scope.travelDetails = data10[0];
             });
  };
    
    checkMarketingCID();
    function checkMarketingCID() {

        $http.get('/checkMarketingCID?cid=' + $routeParams.cid).success(function (data) {
            console.log('the lenght is: ', data.length);
            if (data.length == 1) {
                //update
                $scope.button = "Update Database";
                $scope.uploadHubspot = function () {

                    if (($scope.os) && ($scope.cd) && ($scope.ownerName) && ($scope.osd) && ($scope.closedate)) {
                        console.log('test', $scope.ownerName);
                        updateHubspot();
                    } else {
                        console.log("data empty");
                    }


                    function updateHubspot() {
                        $http.post('/updateHubspot?cid=' + $scope.c + '&os=' + $scope.os + '&createdate=' + $scope.cd + '&hsOwner=' + $scope.ownerName + '&campName=' + $scope.osd + '&closeDate=' + $scope.closedate).success(function (data5) {
                            console.log(data5);
                            console.log("data updated");
                        });
                    };

                };

            } else {
                //insert
                $scope.button = "Insert Into Database";
                //insert hubspot data into database
                $scope.uploadHubspot = function () {

                    if (($scope.os) && ($scope.cd) && ($scope.ownerName) && ($scope.osd) && ($scope.closedate)) {
                        console.log('test', $scope.ownerName);
                        insertHubspot();
                    } else {
                        console.log("data empty");
                    }


                    function insertHubspot() {
                        $http.post('/insertHubspot?cid=' + $scope.c + '&os=' + $scope.os + '&createdate=' + $scope.cd + '&hsOwner=' + $scope.ownerName + '&campName=' + $scope.osd + '&closeDate=' + $scope.closedate).success(function (data4) {
                            console.log(data4);
                            console.log("data inserted");
                        });
                    };

                };


            }

        });
    };

	
//task list tab
					
	$scope.status = 'Nothing';
		
	function findAllValues(salesDepart) {
		$http.get('/findAllValues?cid=' + $routeParams.cid).success(function (data) {
			if (data.length > 0)
				{
					$scope.tasklist = [];
					console.log('hey hey', salesDepart[0].name);
					for (var i=0; i<salesDepart.length; i++)
						{
							var onetask = {
								taskName: salesDepart[i].name,
								tid: salesDepart[i].tid,
								value: 'no'
							};
							var lastTaskID = -1; //check if it is the last record
							for (var j=0; j<data.length; j++)
								{
									if (data[j].tid == salesDepart[i].tid)
										{
											
											if (data[j].taskID > lastTaskID)	
												{
													lastTaskID = data[j].taskID;
													onetask = data[j];																										
//													if (data[j].value == 'yes')
//													{
//														$scope.status = data[j].taskName;
//													}
												}
											
											
										}
									
								}
							$scope.tasklist.push(onetask);
							
						}
					//console.log($scope.tasklist);
				}else
					{						                        
						console.log('not this cid');
						$scope.tasklist = [];
					
					for (var i=0; i<salesDepart.length; i++)
						{
							var onetask = {
								taskName: salesDepart[i].name,
								tid: salesDepart[i].tid,
								value: 'no'
							};
							$scope.tasklist.push(onetask);
							
						}
//					console.log($scope.tasklist);
					}
						
			
		
//check status 
     	console.log('test how about tasklist now:', $scope.tasklist);
			for (var t=0; t<$scope.tasklist.length; t++)
				{
					if ($scope.tasklist[t].value == 'yes')
						{
							$scope.status = $scope.tasklist[t].taskName;
							$scope.salesD[t] = 'yes';//important
						}
				}
		console.log('final checking array is here:', $scope.salesD);
								
			

//event here
			
//			$scope.testClick = function(t) {
//				console.log(t.tid);
//				var vid = t.currentTarget.getAttribute("data-tid"); 
//				console.log('vid', vid);
//		};
			
			
			$scope.checkClick = function(tid, index) {
				console.log('repeat check', tid);
				
				var confirmHTML = angular.element(document.querySelector('#t' + index));
				var htmlString = '<button class="btn btn-sm green darken-2 global-button confirm-btn" ng-click="confirmCheckChange('+index+')"><i class="md md-check global-button-icon"></i> </button><button class="btn btn-sm red darken-2 global-button cancel-btn" ng-click="cancelCheckChange('+index+')"><i class="md md-close global-button-icon"></i></button>';
				var htmlStringCompiled = $compile(htmlString)($scope);
        		confirmHTML.append(htmlStringCompiled);
				
				$scope.confirmCheckChange = function(i) {
					
					switch ($scope.tasklist[i].tid)
						{
							case '1':
								{
									console.log('Payment Confirmation confirm click..');
									
									insertIntoDatabase(i);
									
								}
							break;
							case '2':
								{
									console.log('Payment Reference No confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '3':
								{
									console.log('Register confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '4':
								{
									console.log('Promo Confirmation confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '5':
								{
									console.log('Booking Approval confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '6':
								{
									console.log('Trip Subject Added confirm click..');

									insertIntoDatabase(i);
								}
							break;	
							case '7':
								{
									console.log('Admin Booking Check confirm click..');

									insertIntoDatabase(i);
								}
							break;	
							case '8':
								{
									console.log('Added to Zoho confirm click..');
									confirmzohocall(i);//insert into table when success response
									
								}
							break;	
							case '9':
								{
									console.log('Choose Coordinator confirm click..');
									//only can be clicked when all of above has been clicked
									if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.salesD[5] == 'yes') && ($scope.salesD[6] == 'yes') && ($scope.salesD[7] == 'yes'))
									{
										AllocateCoordinatorTpl.show();	
										$scope.addCoordinator = function(selectedCoordinators) {
											console.log('new owner is', selectedCoordinators);
    										$scope.owner = selectedCoordinators.fullname;											
											$http.post('/updateDepStatusAdmin?cid=' + $routeParams.cid + '&owner=' + $scope.owner).success(function (data) {
                         						console.log('dep status updated', data); 
												insertIntoDatabase(i);
												AllocateCoordinatorTpl.hide();
											});	
									};	

											
											
									}else
										{
											$rootScope.startAlert('danger', 'Error', 'Please fullfill all of other task above', 'md md-error');
											var c = angular.element(document.querySelector('#t' + i));
											c.empty();
											$scope.tasklist[i].value = 'no';
										}
								}
							break;	
							case '10':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '11':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '12':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '13':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '14':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '15':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '16':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '17':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '18':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '19':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '20':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '21':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '22':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '23':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '24':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '25':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '26':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '27':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '10':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '28':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '29':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '30':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '31':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '32':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '33':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '34':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '35':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '36':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '37':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '38':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '39':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '40':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '41':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '42':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '43':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '44':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '45':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
						}
							

			};
						
				$scope.cancelCheckChange = function(i) {
					
    				console.log(i);
					
					if ($scope.tasklist[i].value == 'yes')
						{
							$scope.tasklist[i].value = 'no';
						}else
							{	
								$scope.tasklist[i].value = 'yes';
							}
					
					var c = angular.element(document.querySelector('#t' + i));
					c.empty(); 
				};
				
				
			};
				
			
	});
}	
	
function insertIntoDatabase(i) 
	{
									$http.post('/insertOneTask?cid=' + $routeParams.cid + '&taskName=' + $scope.tasklist[i].taskName + '&tid=' + $scope.tasklist[i].tid + '&value=' + $scope.tasklist[i].value + '&user=' + $scope.staffName).success(function (inserteddata)
					{
                        console.log('inserted one task');
						
                        $scope.tasklist[i].time = 'just now';
						$scope.tasklist[i].user = $scope.staffName;
						var c = angular.element(document.querySelector('#t' + i));
						c.empty(); 
						if ($scope.tasklist[i].value == 'yes')
							{
								
								$scope.salesD[i] ='yes';//
								changeProfileStatus(i);
								
								//change dep_status to sales and send email if sales section finished, need to fixed later for other sections
								if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.tasklist[i].tid < 6))
											{
												
											console.log('admin status adding..');
									//old			
//									$http.post('/changeDepStatus?cid=' + $routeParams.cid).success(function (data) {
//                         						console.log('dep status updated', data); 
//												$http.get('/sendSalesLogEmail?lastname=' + $scope.profile.last_name + '&firstname=' + $scope.profile.first_name).success(function (data) {
//                         							console.log('email sending', data);   
//                      								});
//                      						});			
												
										//add new admin status to department table
									$http.post('/addDepStatus?cid=' + $routeParams.cid).success(function (data) {
                         						console.log('dep status added', data); 
												$http.get('/sendSalesLogEmail?lastname=' + $scope.profile.last_name + '&firstname=' + $scope.profile.first_name).success(function (data) {
                         							console.log('email sending', data);   
                      								});
                      						});	
												
												
											}
								//change to admin when sales and admin section all finished
//								if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.salesD[5] == 'yes') && ($scope.salesD[6] == 'yes') && ($scope.salesD[7] == 'yes') && ($scope.salesD[8] == 'yes') && ($scope.tasklist[i].tid < 10) && ($scope.tasklist[i].tid > 5))
//											{
//												$scope.owner = 'test owner here';
//												
//									$http.post('/addDepStatusAdmin?cid=' + $routeParams.cid + '&owner=' + $scope.owner).success(function (data) {
//                         						console.log('dep status updated', data); 
//										});	
//	
//											}
									
										
								
							}
                  });						
									

	};
	
								function changeProfileStatus(i) 
								{
	
									if ($scope.status == 'Nothing')
									{
										$scope.status = $scope.tasklist[i].taskName;
									}else
										{
											for (var r = 0; r < $scope.salesDepart.length; r++)
											{
												if ($scope.salesDepart[r].name == $scope.status)
													{
														if ($scope.salesDepart[r].tid < $scope.tasklist[i].tid)
															{
																$scope.status = $scope.tasklist[i].taskName;
															}
														break;
													}
										
											}
										}

								};	

	
	var AllocateCoordinatorTpl = $aside({
        scope: $scope,
        template: '../bookings/allocateCoordinatorTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	getAllCoordinators();
    function getAllCoordinators() {
        $http.get('/getAllCoordinators').success(function (data) {
			$scope.allCoordinators = data;
			for(var a = 0; a < data.length; a++)
				{
					$scope.allCoordinators[a].fullname = $scope.allCoordinators[a].first_name + ' ' + $scope.allCoordinators[a].last_name; 
				}
			
			
		});
	};
	
//    $scope.test = function () {
//        console.log('test test testtttt');
//        this.$hide(); //$hide hide notification box, scope method
//    };
//    
//        $scope.close = function () {
//        console.log('close test');
//        this.$hide(); //$hide hide notification box, scope method
//    };
    
    $scope.createCustomerpdf = function () {
            $http.get('/createCustomerpdf?cid=' + $routeParams.cid).success(function (data) {
                         console.log(data);  
                             $scope.dd = data;
         //download it                    
        function downloadpdf () {
            var s = $rootScope.remoteURL + '//' + $scope.dd;//'http://localhost:3000/' + $scope.dd;
            $window.open(s, '_blank');//fix later url
        }

        $timeout(downloadpdf, 7000); 
                              
	});

};
	
//show and add notes
	$scope.showNotes = function () {
    	NotesPageTpl.show();
		
			$scope.saveNote = function (newNote) {
				if(newNote != '')
					{
						console.log('test note', newNote);
				$http.post('/saveNewNote?cid=' + $routeParams.cid + '&note=' + newNote + '&staff=' + $scope.staffName).success(function (data) {
                        console.log('success add one note', data);
						var aNote = {
							time: 'just now',
							staff: $scope.staffName,
							text: newNote
						};
						$scope.notesList.push(aNote);
						NotesPageTpl.toggle(); 
						NotesPageTpl.toggle(); 
					
                      });
					}
//				
    			

    		};
		
		
    };
	

	getAllNotes();
	function getAllNotes() {
		$http.get('/getAllNotes?cid=' + $routeParams.cid).success(function (data) {
                        console.log(data);
						$scope.notesList = data;
			
						if(data.length == 0)
							{
								$scope.noteRedFlag = false; 
							}
						else
							{
								$scope.noteRedFlag = true;
							}
                      });
	};
	
	var NotesPageTpl = $aside({
        scope: $scope,
        template: '../bookings/notesTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	
//add payment for this customer
	
	    $scope.data2 = {
        availableOptions: [
            {
                id: 'Paid',
                name: 'Paid'
            },
            {
                id: 'Next',
                name: 'Next'
            },
            {
                id: 'Error',
                name: 'Error'
            },
            {
                id: 'Refund',
                name: 'Refund'
            },
            {
                id: 'Discount',
                name: 'Discount'
            },
            {
                id: 'On Hold',
                name: 'On Hold'
            }
    ],
        selectedOption: {
            id: 'Paid',
            name: 'Paid'
        }
    };
	
	    $scope.data3 = {
        availableOptions: [
            {
                id: 'GBP',
                name: 'GBP'
            },
            {
                id: 'USD',
                name: 'USD'
            },
            {
                id: 'AUD',
                name: 'AUD'
            },
            {
                id: 'CAD',
                name: 'CAD'
            }
    ],
        selectedOption: {
            id: 'AUD',
            name: 'AUD'
        }
    };
    
		$scope.data4 = {
        availableOptions: [
            {
                id: 'Week',
                name: 'Week'
            },
            {
                id: 'Month',
                name: 'Month'
            }
    ],
        selectedOption: {
            id: 'Week',
            name: 'Week'
        }
    };
    checkOffice();
    function checkOffice() {
        $http.get('/checkOffice').success(function (data) {
            if(data == 'canada')
                {
                    $scope.data3.selectedOption.name = 'CAD';
                    $scope.data3.selectedOption.id = 'CAD';
                }
            if(data == 'uk')
                {
                    $scope.data3.selectedOption.name = 'GBP';
                    $scope.data3.selectedOption.id = 'GBP';
                }
            if(data == 'australia')
                {
                    $scope.data3.selectedOption.name = 'AUD';
                    $scope.data3.selectedOption.id = 'AUD';
                }

        });
    };
	
	$scope.addPay = function () {
    	addPaymentTpl.show();
			
    };
	
	
	var addPaymentTpl = $aside({
        scope: $scope,
        template: '../bookings/addPaymentTpl.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	    //{done:false}
    $scope.todoList = [];
	$scope.dis = false; 
	$scope.repeatCheck = 'NO';
	$scope.isDisabled = true;
    $scope.myFunction = function (repeatCheck) {
        if (repeatCheck == 'YES')
            {
                $scope.isDisabled = false;
            }else
                {
                    $scope.isDisabled = true;
                }
    };
	
    
        $scope.todoAdd = function() {
            $scope.dis = true;  
        $scope.todoList.push({done:false});
//        console.log($scope.todoList[0].paymentStatus.name);
        
    };
        $scope.remove = function(index) {
         
        $scope.todoList.splice(index, 1);
            if($scope.todoList.length == 0){
                $scope.dis = false;
            }
    };
	
	
//submit add payment form
	$scope.addpayment = function (paymentDate, paymentAmount, repeatCheck, repeatPeriod, repeatTime) {
			
        console.log('testttttt', $scope.selectedState);
        
        var customerName2 = $scope.profile.first_name + ', ' + $scope.profile.last_name;//for seach
		
        var paymentStatus = $scope.data2.selectedOption.name;
//        var paymentAmount = $scope.paymentAmount;
//        var paymentDate = $scope.paymentDate;
        var currency = $scope.data3.selectedOption.name;
        console.log('1', paymentDate);
                
//          console.log('this is not a test ok?????', data[0].cid);
         if (repeatCheck == 'NO'){
                 $http.post('/addPayment?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name).success(function (data2) {
                        
                if($scope.todoList.length > 0)
                 {
                       console.log('ok, here is the list');       
                      for (i=0; i<$scope.todoList.length; i++)
                          {
                              addtodopayments(i,$routeParams.cid);
                              
                              console.log(i);
                          }
                     
                     
                 }else
                     {
                        //
                       	addPaymentTpl.toggle(); 
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit new payment form.', 'md md-done');
                     }
                                                            
                                                                         
                                                                         
                    });
                  
                    
             
                    }else
                        {

                            if ((!repeatTime) || (!repeatPeriod))
                                {
                                    console.log('another test ok?????');             
                   
                    addPaymentTpl.toggle(); 
                 
                    $rootScope.startAlert('danger', 'Error', 'Well, you must enter the repeat times and period', 'md md-error');
                                }else
                                    {
                                        
                                        if ($scope.data4.selectedOption.name == 'Week')
                                {
                                             $http.post('/addPaymentRepeatweek?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name + '&period=' + repeatPeriod + '&times=' + repeatTime).success(function (data) {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments.', 'md md-done');
                    });
                                                    
                                }else if ($scope.data4.selectedOption.name == 'Month')
                                    {
                                                                                         $http.post('/addPaymentRepeatmonth?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name + '&period=' + repeatPeriod + '&times=' + repeatTime).success(function (data) {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments monthly.', 'md md-done');
                    });
                                                                          
                                    }
                                                                           
                                    }
                            

                        }
                    
                   

              
           
       
    };
	
	
function addtodopayments(i,c) {
       $http.post('/addPayment?customerName2=testNameHere&paymentStatus=' + $scope.todoList[i].paymentStatus.name + '&paymentAmount=' + $scope.todoList[i].paymentAmount + '&paymentDate=' + $scope.todoList[i].paymentDate + '&currency=' + $scope.data3.selectedOption.name + '&cid=' + c + '&staffname=' + $rootScope.name).success(function (data) {
            if (i == ($scope.todoList.length - 1))
                    {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit multiple payments.', 'md md-done');
                        
                        
                    }
           
            $scope.todoList[i].paymentDate = null;
           $scope.todoList[i].paymentAmount = null;
           console.log('one added');
                    });
                
                
                 };	
	
	
	

	
	function confirmzohocall(i) {

                    if ($scope.profile.consultant_name == '')
                        {
                            $rootScope.startAlert('danger', 'Error', 'There is no consultant name for this customer.', 'md md-error');
							var z = angular.element(document.querySelector('#t' + i));
							z.empty();
							$scope.tasklist[i].value = 'no';
                        }else
                            {                                    
                                    var oneContact = 
                                {
                                    "first_name": $scope.profile.first_name,
                                    "last_name": $scope.profile.last_name,
                                    "email": $scope.profile.email,
                                    "prefferd_contact_no": $scope.profile.prefferd_contact_no,
                                    "skype": $scope.profile.skype,
                                    "address": $scope.profile.address,
                                    "suburb": $scope.profile.suburb,
                                    "state": $scope.profile.state,
                                    "country": $scope.profile.country,
                                    "post_code": $scope.profile.post_code,
                                    "nationality": $scope.profile.nationality,
                                    "valid_passport": $scope.profile.valid_passport,
                                    "gender": $scope.profile.gender,
                                    "secondary_contact_no": $scope.profile.secondary_contact_no,
                                    "age": $scope.profile.age,
                                    "dob": $scope.profile.dob,
                                    "weight": $scope.profile.weight,
                                    "height": $scope.profile.height,
                                    "trip_experience_name": $scope.profile.trip_experience_name,
                                    "trip_destination": $scope.profile.trip_destination,
                                    "trip_code": $scope.profile.trip_code,
                                    "trip_duration": $scope.profile.trip_duration,
                                    "trip_price": $scope.profile.trip_price,
									"subject": $scope.profile.subject,
                                    "addon": $scope.profile.addon,
									"date_departure": $scope.profile.date_departure,
                                    "travel_before_exp": $scope.profile.travel_before_exp,
                                    "travel_before_exp_how_long": $scope.profile.travel_before_exp_how_long,
                                    "traveL_with_someone": $scope.profile.traveL_with_someone,
                                    "traveL_with_someone_who": $scope.profile.traveL_with_someone_who,
                                    "stay_longer": $scope.profile.stay_longer,
                                    "emrg_contact_name": $scope.profile.emrg_contact_name,
                                    "emrg_contact_relation": $scope.profile.emrg_contact_relation,
                                    "emrg_contact_email": $scope.profile.emrg_contact_email,
                                    "emrg_contact_number": $scope.profile.emrg_contact_number,
                                    "drink_driving_convictions": $scope.profile.drink_driving_convictions,
                                    "drink_driving_convictions_date": $scope.profile.drink_driving_convictions_date,
                                    "drink_driving_convictions_bac": $scope.profile.drink_driving_convictions_bac,
                                    "drink_driving_convictions_describe": $scope.profile.drink_driving_convictions_describe,
                                    "criminal_convictions": $scope.profile.criminal_convictions,
                                    "criminal_convictions_date": $scope.profile.criminal_convictions_date,
                                    "criminal_convictions_describe": $scope.profile.criminal_convictions_describe,
                                    "driving_offences": $scope.profile.driving_offences,
                                    "driving_offences_date": $scope.profile.driving_offences_date,
                                    "driving_offences_describe": $scope.profile.driving_offences_describe,
                                    "tattoos": $scope.profile.tattoos,
                                    "tattoos_describe": $scope.profile.tattoos_describe,
                                    "medication": $scope.profile.medication,
                                    "medication_describe": $scope.profile.medication_describe,
                                    "health_conditions": $scope.profile.health_conditions,
                                    "health_conditions_describe": $scope.profile.health_conditions_describe,
                                    "smoke": $scope.profile.smoke,
                                    "alcohol": $scope.profile.alcohol,
                                    "illicit": $scope.profile.illicit,
                                    "dietary": $scope.profile.dietary,
                                    "dietary_describe": $scope.profile.dietary_describe,
                                    "hear": $scope.profile.hear,
                                    "hear_other": $scope.profile.hear_other,
                                    "friend_name": $scope.profile.friend_name,
                                    "friend_email": $scope.profile.friend_email,
                                    "friend_number": $scope.profile.friend_number,
                                    "consultant_name": $scope.profile.consultant_name,
                                    "consultant_answer": $scope.profile.consultant_answer,
                                    "consultant_answer_describe": $scope.profile.consultant_answer_describe,
                                    "consultant_guarantee": $scope.profile.consultant_guarantee,
                                    "consultant_guarantee_describe": $scope.profile.consultant_guarantee_describe,
                                    "rate": $scope.profile.rate,
                                    "comments": $scope.profile.comments,
                                    "cid": $routeParams.cid
                                };
                                    
                                console.log(oneContact.first_name);
                                var oneContact2 = JSON.stringify(oneContact);                                
       
                                $http.post('/callzoho?oneContact=' + oneContact2).success(function (datazoho) {
                                    console.log('zoho called', datazoho); 
                                    $scope.showzohoconfirm = false;
									
									if(datazoho == 'success')
										{
										 	$rootScope.startAlert('success', 'Success', 'Well done! You have successfully added this guy into Zoho.', 'md md-done');
											insertIntoDatabase(i);
										}else
											{
										 		$rootScope.startAlert('danger', 'Error', 'Zoho added failed', 'md md-error');
											}
                                });                          

                            }
                

            };
	
//add compliance
	var addComplianceTPL = $aside({
        scope: $scope,
        template: '../bookings/addComplianceTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	$scope.addCompliance = function () {
    	addComplianceTPL.show();
			
    };
	
	$scope.formData = {};
	$scope.submitCompliance = function (formData) {
		
		console.log('ha ha ha', formData);
		
		        if ((!formData.introCheckA) || (!formData.introCheckB) || (!formData.qualificationCheckA) || (!formData.qualificationCheckB) || (!formData.qualificationCheckC) || (!formData.qualificationCheckD) || (!formData.qualificationCheckE) || (!formData.backgroundCheckA) || (!formData.selectionCheckA) || (!formData.selectionCheckB) || (!formData.selectionCheckC) || (!formData.selectionCheckD) || (!formData.selectionCheckE) || (!formData.selectionCheckF) || (!formData.selectionCheckG) || (!formData.costCheckA) || (!formData.costCheckB) || (!formData.costCheckC) || (!formData.costCheckD) || (!formData.costCheckE) || (!formData.costCheckF) || (!formData.costCheckG) || (!formData.urgencyCheckA) || (!formData.urgencyCheckB) || (!formData.urgencyCheckC) || (!formData.urgencyCheckD) || (!formData.urgencyCheckE) || (!formData.othersCheckA) || (!formData.othersCheckB) || (!formData.othersCheckC) || (!formData.othersCheckD) || (!formData.othersCheckE) || (!formData.othersCheckF))
    {
         //didnt select every input radio question
        $rootScope.startAlert('danger', 'Error', 'Please fullfill every question', 'md md-error');
        addComplianceTPL.toggle(); 
		 
    }
    else{
                $scope.redflag = 0;
        $scope.yellowflag = 0;
        if (formData.introCheckB == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.qualificationCheckC == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.qualificationCheckD == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.selectionCheckC == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckD == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckF == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckC == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckD == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.urgencyCheckA == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckB == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckC == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }

		addcompliance();

        function addcompliance() {
            $http.post('/addcompliance?introCheckA=' + formData.introCheckA + '&introCommentsA=' + formData.introCommentsA + '&introCheckB=' + formData.introCheckB + '&introCommentsB=' + formData.introCommentsB + '&qualificationCheckA=' + formData.qualificationCheckA + '&qualificationCommentsA=' + formData.qualificationCommentsA + '&qualificationCheckB=' + formData.qualificationCheckB + '&qualificationCommentsB=' + formData.qualificationCommentsB + '&qualificationCheckC=' + formData.qualificationCheckC + '&qualificationCommentsC=' + formData.qualificationCommentsC + '&qualificationCheckD=' + formData.qualificationCheckD + '&qualificationCommentsD=' + formData.qualificationCommentsD + '&qualificationCheckE=' + formData.qualificationCheckE + '&qualificationCommentsE=' + formData.qualificationCommentsE + '&backgroundCheckA=' + formData.backgroundCheckA + '&backgroundCommentsA=' + formData.backgroundCommentsA + '&selectionCheckA=' + formData.selectionCheckA + '&selectionCommentsA=' + formData.selectionCommentsA + '&selectionCheckB=' + formData.selectionCheckB + '&selectionCommentsB=' + formData.selectionCommentsB + '&selectionCheckC=' + formData.selectionCheckC + '&selectionCommentsC=' + formData.selectionCommentsC + '&selectionCheckD=' + formData.selectionCheckD + '&selectionCommentsD=' + formData.selectionCommentsD + '&selectionCheckE=' + formData.selectionCheckE + '&selectionCommentsE=' + formData.selectionCommentsE + '&selectionCheckF=' + formData.selectionCheckF + '&selectionCommentsF=' + formData.selectionCommentsF + '&selectionCheckG=' + formData.selectionCheckG + '&selectionCommentsG=' + $scope.selectionCommentsG + '&costCheckA=' + $scope.costCheckA + '&costCommentsA=' + formData.costCommentsA + '&costCheckB=' + formData.costCheckB + '&costCommentsB=' + formData.costCommentsB + '&costCheckC=' + formData.costCheckC + '&costCommentsC=' + formData.costCommentsC + '&costCheckD=' + formData.costCheckD + '&costCommentsD=' + formData.costCommentsD + '&costCheckE=' + formData.costCheckE + '&costCommentsE=' + formData.costCommentsE + '&costCheckF=' + formData.costCheckF + '&costCommentsF=' + formData.costCommentsF + '&costCheckG=' + formData.costCheckG + '&costCommentsG=' + formData.costCommentsG + '&urgencyCheckA=' + formData.urgencyCheckA + '&urgencyCommentsA=' + formData.urgencyCommentsA + '&urgencyCheckB=' + formData.urgencyCheckB + '&urgencyCommentsB=' + formData.urgencyCommentsB + '&urgencyCheckC=' + formData.urgencyCheckC + '&urgencyCommentsC=' + formData.urgencyCommentsC + '&urgencyCheckD=' + formData.urgencyCheckD + '&urgencyCommentsD=' + formData.urgencyCommentsD + '&urgencyCheckE=' + formData.urgencyCheckE + '&urgencyCommentsE=' + formData.urgencyCommentsE + '&othersCheckA=' + formData.othersCheckA + '&othersCommentsA=' + formData.othersCommentsA + '&othersCheckB=' + formData.othersCheckB + '&othersCommentsB=' + formData.othersCommentsB + '&othersCheckC=' + formData.othersCheckC + '&othersCommentsC=' + formData.othersCommentsC + '&othersCheckD=' + formData.othersCheckD + '&othersCommentsD=' + formData.othersCommentsD + '&othersCheckE=' + formData.othersCheckE + '&othersCommentsE=' + formData.othersCommentsE + '&othersCheckF=' + formData.othersCheckF + '&othersCommentsF=' + formData.othersCommentsF + '&cid=' + $routeParams.cid + '&yellowflag=' + $scope.yellowflag + '&redflag=' + $scope.redflag + '&staff=' + $rootScope.name).success(function (data) {
              
                                        //successfully submit
       $rootScope.startAlert('success', 'Success', 'Well done! You have successfully submitted a new compliance form.', 'md md-done');
               addComplianceTPL.toggle(); 


            });

        };
        
        
        
    }

	};
	
	
//list compliance
	getComplianceList();
    function getComplianceList() {
        $http.get('/getComplianceList?cid=' + $routeParams.cid).success(function (data) {
            $scope.clist = data;
			if(data.length == 0)
				{
					var nocompliance = angular.element(document.querySelector('#nocompliance'));
//					nocompliance.empty();
					nocompliance.append('<h5>There is no compliance submission for this customer yet.</h5>');
				}
                   
        });  
    };
	
	
//compliance details
	var ComplianceDetailsTPL = $aside({
        scope: $scope,
        template: '../bookings/ComplianceDetailsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	$scope.showComplianceDetails = function (qid) {
		$scope.qidNow = qid;
    	ComplianceDetailsTPL.show();
		getComplianceDetails();	
    };
    
	  
	
    function getComplianceDetails() {
        $http.get('/getComplianceDetails?qid=' + $scope.qidNow).success(function (data) {
            $scope.date = data[0].date;
            $scope.redflagNO = data[0].redflag;
            $scope.yellowflagNO = data[0].yellowflag;

            $scope.introCheckA = data[0].consultant_name_check;
            $scope.introCommentsA = data[0].consultant_name_comments;
            $scope.introCheckB = data[0].company_name_check;
            $scope.introCommentsB = data[0].company_name_comments;
            //console.log($scope.introCommentsA);
            $scope.qualificationCheckA = data[0].age_check;
            $scope.qualificationCommentsA = data[0].age_comments;
            $scope.qualificationCheckB = data[0].citizenship_check;
            $scope.qualificationCommentsB = data[0].citizenship_comments;
            $scope.qualificationCheckC = data[0].driving_offense_check;
            $scope.qualificationCommentsC = data[0].driving_offense_comments;
            $scope.qualificationCheckD = data[0].criminal_convictions_check;
            $scope.qualificationCommentsD = data[0].criminal_convictions_comments;
            $scope.qualificationCheckE = data[0].wh_visa_check;
            $scope.qualificationCommentsE = data[0].wh_visa_comments;
            $scope.backgroundCheckA = data[0].amount_travellers_check;
            $scope.backgroundCommentsA = data[0].amount_travellers_comments;

            $scope.selectionCheckA = data[0].departure_date_check;
            $scope.selectionCommentsA = data[0].departure_date_comments;
            $scope.selectionCheckB = data[0].min_time_check;
            $scope.selectionCommentsB = data[0].min_time_comments;
            $scope.selectionCheckC = data[0].job_placement_check;
            $scope.selectionCommentsC = data[0].job_placement_comments;
            $scope.selectionCheckD = data[0].job_type_check;
            $scope.selectionCommentsD = data[0].job_type_comments;
            $scope.selectionCheckE = data[0].location_check;
            $scope.selectionCommentsE = data[0].location_comments;
            $scope.selectionCheckF = data[0].wage_check;
            $scope.selectionCommentsF = data[0].wage_comments;
            $scope.selectionCheckG = data[0].work_hour_check;
            $scope.selectionCommentsG = data[0].work_hour_comments;

            $scope.costCheckA = data[0].money_save_check;
            $scope.costCommentsA = data[0].money_save_comments;
            $scope.costCheckB = data[0].cost_estimate_check;
            $scope.costCommentsB = data[0].cost_estimate_comments;
            $scope.costCheckC = data[0].program_price_check;
            $scope.costCommentsC = data[0].program_price_comments;
            $scope.costCheckD = data[0].exclusions_check;
            $scope.costCommentsD = data[0].exclusions_comments;
            $scope.costCheckE = data[0].flight_cost_check;
            $scope.costCommentsE = data[0].flight_cost_comments;
            $scope.costCheckF = data[0].visa_cost_check;
            $scope.costCommentsF = data[0].visa_cost_comments;
            $scope.costCheckG = data[0].insurance_cost_check;
            $scope.costCommentsG = data[0].insurance_cost_comments;

            $scope.urgencyCheckA = data[0].remaining_spots_check;
            $scope.urgencyCommentsA = data[0].remaining_spots_comments;
            $scope.urgencyCheckB = data[0].closing_week_check;
            $scope.urgencyCommentsB = data[0].closing_week_comments;
            $scope.urgencyCheckC = data[0].promotion_check;
            $scope.urgencyCommentsC = data[0].promotion_comments;
            $scope.urgencyCheckD = data[0].drop_price_check;
            $scope.urgencyCommentsD = data[0].drop_price_comments;
            $scope.urgencyCheckE = data[0].deposit_refund_check;
            $scope.urgencyCommentsE = data[0].deposit_refund_comments;

            $scope.othersCheckA = data[0].payment_plan_check;
            $scope.othersCommentsA = data[0].payment_plan_comments;
            $scope.othersCheckB = data[0].cooling_period_check;
            $scope.othersCommentsB = data[0].cooling_period_comments;
            $scope.othersCheckC = data[0].working_together_check;
            $scope.othersCommentsC = data[0].working_together_comments;
            $scope.othersCheckD = data[0].tax_return_check;
            $scope.othersCommentsD = data[0].tax_return_comments;
            $scope.othersCheckE = data[0].travell_global_check;
            $scope.othersCommentsE = data[0].travell_global_comments;
            $scope.othersCheckF = data[0].inclusions_check;
            $scope.othersCommentsF = data[0].inclusions_comments;
            //ng-class="{yellowFlag: urgencyyellowflagA}"

            if ($scope.introCheckB == 'no') {
                $scope.introyellowflag = true;
            }
            if ($scope.qualificationCheckC == 'no') {
                $scope.qualificationyellowflagC = true;
            }
            if ($scope.qualificationCheckD == 'no') {
                $scope.qualificationyellowflagD = true;
            }
            if ($scope.selectionCheckC == 'yes') {
                $scope.selectionredflagC = true;
            }
            if ($scope.selectionCheckD == 'yes') {
                $scope.selectionredflagD = true;
            }
            if ($scope.selectionCheckE == 'yes') {
                $scope.selectionredflagE = true;
            }
            if ($scope.selectionCheckF == 'yes') {
                $scope.selectionredflagF = true;
            }
            if ($scope.selectionCheckG == 'yes') {
                $scope.selectionredflagG = true;
            }
            if ($scope.costCheckC == 'no') {
                $scope.costredflagC = true;
            }
            if ($scope.costCheckD == 'no') {
                $scope.costredflagD = true;
            }
            if ($scope.costCheckE == 'yes') {
                $scope.costredflagE = true;
            }
            if ($scope.costCheckG == 'yes') {
                $scope.costredflagG = true;
            }
            if ($scope.urgencyCheckA == 'yes') {
                $scope.urgencyyellowflagA = true;
            }
            if ($scope.urgencyCheckB == 'yes') {
                $scope.urgencyyellowflagB = true;
            }
            if ($scope.urgencyCheckC == 'yes') {
                $scope.urgencyyellowflagC = true;
            }
            if ($scope.urgencyCheckE == 'yes') {
                $scope.urgencyredflagE = true;
            }

        });
    };
	
	
//resume tab above
//******************************************************************************************************************************************
//******************************************************************************************************************************************	
    

    function findResumeProfile(e) {
        $http.get('/findResumeProfile?email=' + e).success(function (data) {
		

            console.log('resume data is', data[0]);
			if (data.length == 1)
				{
					$scope.hideEmptyResume = false;
			$scope.form = data[0];
           	console.log('test photo url here', data[0].photo_url);
            $scope.src = '/' + data[0].photo_url;
            
            //check if file exist locally first, get url response here, success and status 200 if correct url, or error and status 404
            $http.get($scope.src).success(function (data, status) {
                console.log('ac', status);
                
            })
            .error(function(data, status) {
                console.log('bc', status);
                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + $scope.form.photo_url;
                console.log('test photo url here', $scope.src);
            });
			
			
//action status check
			if ($scope.form.action == 'complete')
				{
					$scope.action = 'complete';
				}else
					{
						$scope.action = 'incomplete';
					}
            $scope.actionChange = function() {
                
				console.log($scope.action);
				$http.post('/updateAction?rid=' + $scope.form.r_id + '&action=' + $scope.action).success(function (returnDate) {
                        console.log('action status updated'); 
						$scope.form.modified_date = 'just now';
                      });
				
            };			
           
                //render boxes of html                        
                var myintroduce = angular.element(document.querySelector('#myintroduce'));
                myintroduce.append($scope.form.introduce);
                var myobjective = angular.element(document.querySelector('#myobjective'));
                myobjective.append($scope.form.objective);
                var myskill1 = angular.element(document.querySelector('#myskill1'));
                myskill1.append($scope.form.skill1);
                var mycertificate = angular.element(document.querySelector('#mycertificate'));
                mycertificate.append($scope.form.certificate);
                var mylicense = angular.element(document.querySelector('#mylicense'));
                mylicense.append($scope.form.license);
                var myduty1 = angular.element(document.querySelector('#myduty1'));
                myduty1.append($scope.form.duty1);
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.append($scope.form.duty2);
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.append($scope.form.duty3);
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.append($scope.form.duty4);
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.append($scope.form.duty5);
            
            
            
            
            //edit image
            $scope.viewIMG = {
//                editableValue: $scope.src,
                editorEnabled: false
            };

            $scope.enableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = true;
//                $scope.viewIMG.editableValue = $scope.src;
            };

            $scope.disableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = false;
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
            };

            $scope.saveIMG = function(upload_form) {
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
                
                $scope.disableEditorIMG();
                console.log('avc test');
                var col = 'photo_url';
                var element = 'abctest';
//                update(col, element);
             
                //upload
            if (upload_form.file.$valid && $scope.file) { //check if from is valid
                console.log('hello ');
                upload($scope.file); //call upload function
            }
                           
            function upload(file) {
                console.log('upload test here');
            Upload.upload({
                url: '/uploadpicture', //webAPI exposed to upload the file, different in server, need to change later
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
               console.log('test response after upload', resp.data.error_code);
                if(resp.data.error_code === 1){ //validate success
                   
                     $window.alert('an error occured');
                } else {
//                    $window.alert('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                    console.log(resp.data.filename);
                    
                    $http.post('/savefilename?fn=' + resp.data.filename + '&rid=' + $scope.form.r_id).success(function (data) {
                        console.log('updated file into database successfully');
						$scope.form.modified_date = 'just now';
                        $scope.src = '/' + resp.data.filename;//need to change in server using
                    });
                            
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });            
        };   
                
                
            };
               
            //edit contact
            $scope.enableEditorContact = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.form.fname;
                
                $scope.view2.editorEnabled = true;
                $scope.view2.editableValue = $scope.form.mname;
                
                $scope.view3.editorEnabled = true;
                $scope.view3.editableValue = $scope.form.lname;
                
                $scope.view4.editorEnabled = true;
                $scope.view4.editableValue = $scope.form.email;
                
                $scope.view5.editorEnabled = true;
                $scope.view5.editableValue = $scope.form.phoneno;
                
                $scope.view6.editorEnabled = true;
                $scope.view6.editableValue = $scope.form.skype;
            };
            
                        //edit education
            $scope.enableEditorEducation1 = function() {
               $scope.view10.editorEnabled = true;
                $scope.view10.editableValue = $scope.form.title1;
                $scope.view11.editorEnabled = true;
                $scope.view11.editableValue = $scope.form.institution1;
                $scope.view12.editorEnabled = true;
                $scope.view12.editableValue = $scope.form.educationfrom1;
                 $scope.view13.editorEnabled = true;
                $scope.view13.editableValue = $scope.form.educationto1;
            };
            
            $scope.enableEditorEducation2 = function() {
               $scope.view14.editorEnabled = true;
                $scope.view14.editableValue = $scope.form.title2;
                $scope.view15.editorEnabled = true;
                $scope.view15.editableValue = $scope.form.institution2;
                $scope.view16.editorEnabled = true;
                $scope.view16.editableValue = $scope.form.educationfrom2;
                 $scope.view17.editorEnabled = true;
                $scope.view17.editableValue = $scope.form.educationto2;
            };
            
            $scope.enableEditorEducation3 = function() {
               $scope.view18.editorEnabled = true;
                $scope.view18.editableValue = $scope.form.title3;
                $scope.view19.editorEnabled = true;
                $scope.view19.editableValue = $scope.form.institution3;
                $scope.view20.editorEnabled = true;
                $scope.view20.editableValue = $scope.form.educationfrom3;
                 $scope.view21.editorEnabled = true;
                $scope.view21.editableValue = $scope.form.educationto3;
            };
            

            //edit employment
            $scope.enableEditorEmployment1 = function() {
                $scope.view24.editorEnabled = true;
                $scope.view24.editableValue = $scope.form.jtitle1;
                
                $scope.view25.editorEnabled = true;
                $scope.view25.editableValue = $scope.form.cname1;
                
                $scope.view26.editorEnabled = true;
                $scope.view26.editableValue = $scope.form.cwebsite1;
                
                $scope.view27.editorEnabled = true;
                $scope.view27.editableValue = $scope.form.jfrom1;
                
                $scope.view28.editorEnabled = true;
                $scope.view28.editableValue = $scope.form.jto1;
                
                $scope.view29.editorEnabled = true;
                $scope.view29.editableValue = $scope.form.duty1;
            };
            
            $scope.enableEditorEmployment2 = function() {
                $scope.view30.editorEnabled = true;
                $scope.view30.editableValue = $scope.form.jtitle2;
                
                $scope.view31.editorEnabled = true;
                $scope.view31.editableValue = $scope.form.cname2;
                
                $scope.view32.editorEnabled = true;
                $scope.view32.editableValue = $scope.form.cwebsite2;
                
                $scope.view33.editorEnabled = true;
                $scope.view33.editableValue = $scope.form.jfrom2;
                
                $scope.view34.editorEnabled = true;
                $scope.view34.editableValue = $scope.form.jto2;
                
                $scope.view35.editorEnabled = true;
                $scope.view35.editableValue = $scope.form.duty2;
            };
            
              $scope.enableEditorEmployment3 = function() {
                $scope.view36.editorEnabled = true;
                $scope.view36.editableValue = $scope.form.jtitle3;
                
                $scope.view37.editorEnabled = true;
                $scope.view37.editableValue = $scope.form.cname3;
                
                $scope.view38.editorEnabled = true;
                $scope.view38.editableValue = $scope.form.cwebsite3;
                
                $scope.view39.editorEnabled = true;
                $scope.view39.editableValue = $scope.form.jfrom3;
                
                $scope.view40.editorEnabled = true;
                $scope.view40.editableValue = $scope.form.jto3;
                
                $scope.view41.editorEnabled = true;
                $scope.view41.editableValue = $scope.form.duty3;
            };
            
           $scope.enableEditorEmployment4 = function() {
                $scope.view42.editorEnabled = true;
                $scope.view42.editableValue = $scope.form.jtitle4;
                
                $scope.view43.editorEnabled = true;
                $scope.view43.editableValue = $scope.form.cname4;
                
                $scope.view44.editorEnabled = true;
                $scope.view44.editableValue = $scope.form.cwebsite4;
                
                $scope.view45.editorEnabled = true;
                $scope.view45.editableValue = $scope.form.jfrom4;
                
                $scope.view46.editorEnabled = true;
                $scope.view46.editableValue = $scope.form.jto4;
                
                $scope.view47.editorEnabled = true;
                $scope.view47.editableValue = $scope.form.duty4;
            };
            
              $scope.enableEditorEmployment5 = function() {
                $scope.view48.editorEnabled = true;
                $scope.view48.editableValue = $scope.form.jtitle5;
                
                $scope.view49.editorEnabled = true;
                $scope.view49.editableValue = $scope.form.cname5;
                
                $scope.view50.editorEnabled = true;
                $scope.view50.editableValue = $scope.form.cwebsite5;
                
                $scope.view51.editorEnabled = true;
                $scope.view51.editableValue = $scope.form.jfrom5;
                
                $scope.view52.editorEnabled = true;
                $scope.view52.editableValue = $scope.form.jto5;
                
                $scope.view53.editorEnabled = true;
                $scope.view53.editableValue = $scope.form.duty5;
            };
            
            
            //cancel contact
            $scope.cancelallcontact = function() {
                    $scope.view.editorEnabled = false;
                    $scope.view2.editorEnabled = false;
                    $scope.view3.editorEnabled = false;
                    $scope.view4.editorEnabled = false;
                    $scope.view5.editorEnabled = false;
                    $scope.view6.editorEnabled = false;
            };
            
             //cancel education
            $scope.cancelalleducation1 = function() {
                    $scope.view10.editorEnabled = false;
                    $scope.view11.editorEnabled = false;
                    $scope.view12.editorEnabled = false;
                    $scope.view13.editorEnabled = false;
            };
            
            if(($scope.form.title2) || ($scope.form.institution2) || ($scope.form.educationfrom2) || ($scope.form.educationto2))
                {
                    $scope.cancelalleducation2 = function() {
                        $scope.view14.editorEnabled = false;
                        $scope.view15.editorEnabled = false;
                        $scope.view16.editorEnabled = false;
                        $scope.view17.editorEnabled = false;
                        console.log($scope.form.institution2, 'why');
                    };
                }else
                    {
                        $scope.cancelalleducation2 = function() {
                            $scope.hideEducation2 = true;
                        };
                    }
            
            if(($scope.form.title3) || ($scope.form.institution3) || ($scope.form.educationfrom3) || ($scope.form.educationto3))
                {
                    $scope.cancelalleducation3 = function() {
                        $scope.view18.editorEnabled = false;
                        $scope.view19.editorEnabled = false;
                        $scope.view20.editorEnabled = false;
                        $scope.view21.editorEnabled = false;
                    };
                }else
                    {
                        $scope.cancelalleducation3 = function() {
                            $scope.hideEducation3 = true;
                        };
                    }
            
            //cancel employment
            $scope.cancelallemployment1 = function() {
                $scope.view24.editorEnabled = false;
                $scope.view25.editorEnabled = false;
                $scope.view26.editorEnabled = false;
                $scope.view27.editorEnabled = false;
                $scope.view28.editorEnabled = false;
                $scope.view29.editorEnabled = false;
                    
            };
            
            if (($scope.form.jtitle2) || ($scope.form.cname2) || ($scope.form.cwebsite2) || ($scope.form.jfrom2) || ($scope.form.jto2) || ($scope.form.duty2))
                {
                    $scope.cancelallemployment2 = function() {
                        $scope.view30.editorEnabled = false;
                        $scope.view31.editorEnabled = false;
                        $scope.view32.editorEnabled = false;
                        $scope.view33.editorEnabled = false;
                        $scope.view34.editorEnabled = false;
                        $scope.view35.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment2 = function() {
                            $scope.hideEmployment2 = true;
                        };
                    }
            
                        if (($scope.form.jtitle3) || ($scope.form.cname3) || ($scope.form.cwebsite3) || ($scope.form.jfrom3) || ($scope.form.jto3) || ($scope.form.duty3))
                {
                    $scope.cancelallemployment3 = function() {
                        $scope.view36.editorEnabled = false;
                        $scope.view37.editorEnabled = false;
                        $scope.view38.editorEnabled = false;
                        $scope.view39.editorEnabled = false;
                        $scope.view40.editorEnabled = false;
                        $scope.view41.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment3 = function() {
                            $scope.hideEmployment3 = true;
                        };
                    }
            
                        if (($scope.form.jtitle4) || ($scope.form.cname4) || ($scope.form.cwebsite4) || ($scope.form.jfrom4) || ($scope.form.jto4) || ($scope.form.duty4))
                {
                    $scope.cancelallemployment4 = function() {
                        $scope.view42.editorEnabled = false;
                        $scope.view43.editorEnabled = false;
                        $scope.view44.editorEnabled = false;
                        $scope.view45.editorEnabled = false;
                        $scope.view46.editorEnabled = false;
                        $scope.view47.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment4 = function() {
                            $scope.hideEmployment4 = true;
                        };
                    }
            
                        if (($scope.form.jtitle5) || ($scope.form.cname5) || ($scope.form.cwebsite5) || ($scope.form.jfrom5) || ($scope.form.jto5) || ($scope.form.duty5))
                {
                    $scope.cancelallemployment5 = function() {
                        $scope.view48.editorEnabled = false;
                        $scope.view49.editorEnabled = false;
                        $scope.view50.editorEnabled = false;
                        $scope.view51.editorEnabled = false;
                        $scope.view52.editorEnabled = false;
                        $scope.view53.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment5 = function() {
                            $scope.hideEmployment5 = true;
                        };
                    }
            

            
            //education2
            if((data[0].title2) || (data[0].institution2) || (data[0].educationfrom2) || (data[0].educationto2))
                {
                    $scope.hideEducation2 = false;
                    $scope.showEditorEducation2 = true;
                    $scope.hidewhenadd2 = false;
                }
            else
                {
                    $scope.hideEducation2 = true;
                    $scope.showEditorEducation2 = false;
                     $scope.hidewhenadd2 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEducation2 = function() {
                                
                    $scope.form.title2 = $scope.view14.editableValue;
                $scope.disableEditor14();
                var cola = 'title2';
                var elementa = $scope.form.title2;
                update(cola, elementa);
                    
                 $scope.form.institution2 = $scope.view15.editableValue;
                $scope.disableEditor15();
                var colb = 'institution2';
                var elementb = $scope.form.institution2;
                update(colb, elementb);
                    
                $scope.form.educationfrom2 = $scope.view16.editableValue;
                $scope.disableEditor16();
                var colc = 'educationfrom2';
                var elementc = $scope.form.educationfrom2;
                elementc = formatdate(elementc);
                update(colc, elementc);     
                
                $scope.form.educationto2 = $scope.view17.editableValue;
                $scope.disableEditor17();
                var cold = 'educationto2';
                var elementd = $scope.form.educationto2;
                elementd = formatdate(elementd);
                update(cold, elementd);
            };
            
            //education3
            if((data[0].title3) || (data[0].institution3) || (data[0].educationfrom3) || (data[0].educationto3))
                {
                    $scope.hideEducation3 = false;
                    $scope.showEditorEducation3 = true;
                    $scope.hidewhenadd3 = false;
                }
            else
                {
                    $scope.hideEducation3 = true;
                    $scope.showEditorEducation3 = false;
                     $scope.hidewhenadd3 = true;
                }
            
            $scope.saveallEducation3 = function() {
                 $scope.form.title3 = $scope.view18.editableValue;
                $scope.disableEditor18();
                var cola = 'title3';
                var elementa = $scope.form.title3;
                update(cola, elementa);
                    
                 $scope.form.institution3 = $scope.view19.editableValue;
                $scope.disableEditor19();
                var colb = 'institution3';
                var elementb = $scope.form.institution3;
                update(colb, elementb);
                    
                $scope.form.educationfrom3 = $scope.view20.editableValue;
                $scope.disableEditor20();
                var colc = 'educationfrom3';
                var elementc = $scope.form.educationfrom3;
                elementc = formatdate(elementc);
                update(colc, elementc);     
                
                $scope.form.educationto3 = $scope.view21.editableValue;
                $scope.disableEditor21();
                var cold = 'educationto3';
                var elementd = $scope.form.educationto3;
                elementd = formatdate(elementd);
                update(cold, elementd);
                
            };
            
           //employment2
            if((data[0].jtitle2) || (data[0].cname2) || (data[0].cwebsite2) || (data[0].jfrom2) || (data[0].jto2) || (data[0].duty2))
                {
                    $scope.hideEmployment2 = false;
                    $scope.showEditorEmployment2 = true;
                    $scope.hidewhenaddemployment2 = false;
                }
            else
                {
                    $scope.hideEmployment2 = true;
                    $scope.showEditorEmployment2 = false;
                     $scope.hidewhenaddemployment2 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment2 = function() {
                        $scope.form.jtitle2 = $scope.view30.editableValue;
                        $scope.disableEditor30();
                        var cola = 'jtitle2';
                        var elementa = $scope.form.jtitle2;
                        update(cola, elementa);  
                
                $scope.form.cname2 = $scope.view31.editableValue;
                $scope.disableEditor31();
                var colb = 'cname2';
                var elementb = $scope.form.cname2;
                update(colb, elementb);
                    
                $scope.form.cwebsite2 = $scope.view32.editableValue;
                $scope.disableEditor32();
                var colc = 'cwebsite2';
                var elementc = $scope.form.cwebsite2;
                update(colc, elementc);
                    
                $scope.form.jfrom2 = $scope.view33.editableValue;
                $scope.disableEditor33();
                var cold = 'jfrom2';
                var elementd = $scope.form.jfrom2;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto2 = $scope.view34.editableValue;
                $scope.disableEditor34();
                var cole = 'jto2';
                var elemente = $scope.form.jto2;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty2 = $scope.view35.editableValue;
                $scope.disableEditor35();
                var colf = 'duty2';
                var elementf = $scope.form.duty2;
                update(colf, elementf);
                
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.empty(); //empty div first
                myduty2.append($scope.form.duty2);
            };
            
            //employment3
            if((data[0].jtitle3) || (data[0].cname3) || (data[0].cwebsite3) || (data[0].jfrom3) || (data[0].jto3) || (data[0].duty3))
                {
                    $scope.hideEmployment3 = false;
                    $scope.showEditorEmployment3 = true;
                    $scope.hidewhenaddemployment3 = false;
                }
            else
                {
                    $scope.hideEmployment3 = true;
                    $scope.showEditorEmployment3 = false;
                     $scope.hidewhenaddemployment3 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment3 = function() {
                        
                    $scope.form.jtitle3 = $scope.view36.editableValue;
                        $scope.disableEditor36();
                        var cola = 'jtitle3';
                        var elementa = $scope.form.jtitle3;
                        update(cola, elementa);  
                
                $scope.form.cname3 = $scope.view37.editableValue;
                $scope.disableEditor37();
                var colb = 'cname3';
                var elementb = $scope.form.cname3;
                update(colb, elementb);
                    
                $scope.form.cwebsite3 = $scope.view38.editableValue;
                $scope.disableEditor38();
                var colc = 'cwebsite3';
                var elementc = $scope.form.cwebsite3;
                update(colc, elementc);
                    
                $scope.form.jfrom3 = $scope.view39.editableValue;
                $scope.disableEditor39();
                var cold = 'jfrom3';
                var elementd = $scope.form.jfrom3;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto3 = $scope.view40.editableValue;
                $scope.disableEditor40();
                var cole = 'jto3';
                var elemente = $scope.form.jto3;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty3 = $scope.view41.editableValue;
                $scope.disableEditor41();
                var colf = 'duty3';
                var elementf = $scope.form.duty3;
                update(colf, elementf);
                
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.empty(); //empty div first
                myduty3.append($scope.form.duty3);      
                    
            };
            
            
            //employment4
            if((data[0].jtitle4) || (data[0].cname4) || (data[0].cwebsite4) || (data[0].jfrom4) || (data[0].jto4) || (data[0].duty4))
                {
                    $scope.hideEmployment4 = false;
                    $scope.showEditorEmployment4 = true;
                    $scope.hidewhenaddemployment4 = false;
                }
            else
                {
                    $scope.hideEmployment4 = true;
                    $scope.showEditorEmployment4 = false;
                     $scope.hidewhenaddemployment4 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment4 = function() {
                        $scope.form.jtitle4 = $scope.view42.editableValue;
                        $scope.disableEditor42();
                        var cola = 'jtitle4';
                        var elementa = $scope.form.jtitle4;
                        update(cola, elementa);  
                
                $scope.form.cname4 = $scope.view43.editableValue;
                $scope.disableEditor43();
                var colb = 'cname4';
                var elementb = $scope.form.cname4;
                update(colb, elementb);
                    
                $scope.form.cwebsite4 = $scope.view44.editableValue;
                $scope.disableEditor44();
                var colc = 'cwebsite4';
                var elementc = $scope.form.cwebsite4;
                update(colc, elementc);
                    
                $scope.form.jfrom4 = $scope.view45.editableValue;
                $scope.disableEditor45();
                var cold = 'jfrom4';
                var elementd = $scope.form.jfrom4;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto4 = $scope.view46.editableValue;
                $scope.disableEditor46();
                var cole = 'jto4';
                var elemente = $scope.form.jto4;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty4 = $scope.view47.editableValue;
                $scope.disableEditor47();
                var colf = 'duty4';
                var elementf = $scope.form.duty4;
                update(colf, elementf);
                
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.empty(); //empty div first
                myduty4.append($scope.form.duty4);           
                    
            };
            
            //employment5
            if((data[0].jtitle5) || (data[0].cname5) || (data[0].cwebsite5) || (data[0].jfrom5) || (data[0].jto5) || (data[0].duty5))
                {
                    $scope.hideEmployment5 = false;
                    $scope.showEditorEmployment5 = true;
                    $scope.hidewhenaddemployment5 = false;
                }
            else
                {
                    $scope.hideEmployment5 = true;
                    $scope.showEditorEmployment5 = false;
                     $scope.hidewhenaddemployment5 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment5 = function() {
                        $scope.form.jtitle5 = $scope.view48.editableValue;
                        $scope.disableEditor48();
                        var cola = 'jtitle5';
                        var elementa = $scope.form.jtitle5;
                        update(cola, elementa);  
                
                $scope.form.cname5 = $scope.view49.editableValue;
                $scope.disableEditor49();
                var colb = 'cname5';
                var elementb = $scope.form.cname5;
                update(colb, elementb);
                    
                $scope.form.cwebsite5 = $scope.view50.editableValue;
                $scope.disableEditor50();
                var colc = 'cwebsite5';
                var elementc = $scope.form.cwebsite5;
                update(colc, elementc);
                    
                $scope.form.jfrom5 = $scope.view51.editableValue;
                $scope.disableEditor51();
                var cold = 'jfrom5';
                var elementd = $scope.form.jfrom5;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto5 = $scope.view52.editableValue;
                $scope.disableEditor52();
                var cole = 'jto5';
                var elemente = $scope.form.jto5;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty5 = $scope.view53.editableValue;
                $scope.disableEditor53();
                var colf = 'duty5';
                var elementf = $scope.form.duty5;
                update(colf, elementf);
                
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.empty(); //empty div first
                myduty5.append($scope.form.duty5);           
                     
                  
            };

            $scope.addoneEducation = function() {
                if ($scope.hideEducation2 == true)
                    {
                        $scope.hideEducation2 = false;
                        
                            $scope.view14.editorEnabled = true;
                            $scope.view14.editableValue = $scope.form.title2;
                            $scope.view15.editorEnabled = true;
                            $scope.view15.editableValue = $scope.form.institution2;
                            $scope.view16.editorEnabled = true;
                            $scope.view16.editableValue = $scope.form.educationfrom2;
                            $scope.view17.editorEnabled = true;
                            $scope.view17.editableValue = $scope.form.educationto2;
                        
                    }else if ($scope.hideEducation3 == true)
                        {
                            $scope.hideEducation3 = false;
                            
                            $scope.view18.editorEnabled = true;
                            $scope.view18.editableValue = $scope.form.title3;
                            $scope.view19.editorEnabled = true;
                            $scope.view19.editableValue = $scope.form.institution3;
                            $scope.view20.editorEnabled = true;
                            $scope.view20.editableValue = $scope.form.educationfrom3;
                            $scope.view21.editorEnabled = true;
                            $scope.view21.editableValue = $scope.form.educationto3;
                        }else
                            {
                                console.log('mate, 3 education is enough here');
                            }
            };
            
                $scope.addoneEmployment = function() {
                if ($scope.hideEmployment2 == true)
                    {
                        $scope.hideEmployment2 = false;
                        
                            $scope.view30.editorEnabled = true;
                            $scope.view30.editableValue = $scope.form.jtitle2;
                            $scope.view31.editorEnabled = true;
                            $scope.view31.editableValue = $scope.form.cname2;
                            $scope.view32.editorEnabled = true;
                            $scope.view32.editableValue = $scope.form.cwebsite2;
                            $scope.view33.editorEnabled = true;
                            $scope.view33.editableValue = $scope.form.jfrom2;
                            $scope.view34.editorEnabled = true;
                            $scope.view34.editableValue = $scope.form.jto2;
                            $scope.view35.editorEnabled = true;
                            $scope.view35.editableValue = $scope.form.duty2;
                        
                        
                    }else if ($scope.hideEmployment3 == true)
                        {
                            $scope.hideEmployment3 = false;
                        
                            $scope.view36.editorEnabled = true;
                            $scope.view36.editableValue = $scope.form.jtitle3;
                            $scope.view37.editorEnabled = true;
                            $scope.view37.editableValue = $scope.form.cname3;
                            $scope.view38.editorEnabled = true;
                            $scope.view38.editableValue = $scope.form.cwebsite3;
                            $scope.view39.editorEnabled = true;
                            $scope.view39.editableValue = $scope.form.jfrom3;
                            $scope.view40.editorEnabled = true;
                            $scope.view40.editableValue = $scope.form.jto3;
                            $scope.view41.editorEnabled = true;
                            $scope.view41.editableValue = $scope.form.duty3;
                            
                        }else if ($scope.hideEmployment4 == true)
                            {
                                $scope.hideEmployment4 = false;
                            
                            $scope.view42.editorEnabled = true;
                            $scope.view42.editableValue = $scope.form.jtitle4;
                            $scope.view43.editorEnabled = true;
                            $scope.view43.editableValue = $scope.form.cname4;
                            $scope.view44.editorEnabled = true;
                            $scope.view44.editableValue = $scope.form.cwebsite4;
                            $scope.view45.editorEnabled = true;
                            $scope.view45.editableValue = $scope.form.jfrom4;
                            $scope.view46.editorEnabled = true;
                            $scope.view46.editableValue = $scope.form.jto4;
                            $scope.view47.editorEnabled = true;
                            $scope.view47.editableValue = $scope.form.duty4;
                                
                            }else if ($scope.hideEmployment5 == true)
                                {
                                    $scope.hideEmployment5 = false;
                            
                             $scope.view48.editorEnabled = true;
                            $scope.view48.editableValue = $scope.form.jtitle5;
                            $scope.view49.editorEnabled = true;
                            $scope.view49.editableValue = $scope.form.cname5
                            $scope.view50.editorEnabled = true;
                            $scope.view50.editableValue = $scope.form.cwebsite5;
                            $scope.view51.editorEnabled = true;
                            $scope.view51.editableValue = $scope.form.jfrom5;
                            $scope.view52.editorEnabled = true;
                            $scope.view52.editableValue = $scope.form.jto5;
                            $scope.view53.editorEnabled = true;
                            $scope.view53.editableValue = $scope.form.duty5;
                                    
                                }
                            
            };
            
            //edit text
            $scope.view = {
                editableValue: $scope.form.fname,
                editorEnabled: false
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.form.fname = $scope.view.editableValue;
                $scope.disableEditor();
                console.log('avc test');
                var col = 'fname';
                var element = $scope.form.fname;
                update(col, element);

            };
            
            //edit text2
            $scope.view2 = {
                editableValue: $scope.form.mname,
                editorEnabled: false
            };

            $scope.disableEditor2 = function() {
                $scope.view2.editorEnabled = false;
            };

            $scope.save2 = function() {
                $scope.form.mname = $scope.view2.editableValue;
                $scope.disableEditor2();
                console.log('avc test');
                var col = 'mname';
                var element = $scope.form.mname;
                update(col, element);

            };

            //edit text3
            $scope.view3 = {
                editableValue: $scope.form.lname,
                editorEnabled: false
            };

            $scope.disableEditor3 = function() {
                $scope.view3.editorEnabled = false;
            };

            $scope.save3 = function() {
                $scope.form.lname = $scope.view3.editableValue;
                $scope.disableEditor3();
                console.log('avc test');
                var col = 'lname';
                var element = $scope.form.lname;
                update(col, element);

            };
          
            //edit text4
            $scope.view4 = {
                editableValue: $scope.form.email,
                editorEnabled: false
            };

            $scope.disableEditor4 = function() {
                $scope.view4.editorEnabled = false;
            };

            $scope.save4 = function() {
                $scope.form.email = $scope.view4.editableValue;
                $scope.disableEditor4();
                console.log('avc test');
                var col = 'email';
                var element = $scope.form.email;
                update(col, element);

            };
            
            //edit text5
            $scope.view5 = {
                editableValue: $scope.form.phoneno,
                editorEnabled: false
            };

            $scope.disableEditor5 = function() {
                $scope.view5.editorEnabled = false;
            };

            $scope.save5 = function() {
                $scope.form.phoneno = $scope.view5.editableValue;
                $scope.disableEditor5();
                console.log('avc test');
                var col = 'phoneno';
                var element = $scope.form.phoneno;
                update(col, element);

            };
        
            //edit text6
            $scope.view6 = {
                editableValue: $scope.form.skype,
                editorEnabled: false
            };

            $scope.disableEditor6 = function() {
                $scope.view6.editorEnabled = false;
            };

            $scope.save6 = function() {
                $scope.form.skype = $scope.view6.editableValue;
                $scope.disableEditor6();
                console.log('avc test');
                var col = 'skype';
                var element = $scope.form.skype;
                update(col, element);

            };

            //edit text7
            $scope.view7 = {
                editableValue: $scope.form.introduce,
                editorEnabled: false
            };

            $scope.enableEditor7 = function() {
                $scope.view7.editorEnabled = true;
                $scope.view7.editableValue = $scope.form.introduce;
            };

            $scope.disableEditor7 = function() {
                $scope.view7.editorEnabled = false;
            };

            $scope.save7 = function() {
                $scope.form.introduce =  $scope.view7.editableValue;              
                
                console.log($scope.view7.editableValue);
                $scope.disableEditor7();
                console.log('avc test');
                var col = 'introduce';
                var element = $scope.form.introduce;
                update(col, element);
                
                var myintroduce = angular.element(document.querySelector('#myintroduce'));
                myintroduce.empty(); //empty div first
                myintroduce.append($scope.form.introduce);
            

            };
            
            //edit text8
            $scope.view8 = {
                editableValue: $scope.form.objective,
                editorEnabled: false
            };

            $scope.enableEditor8 = function() {
                $scope.view8.editorEnabled = true;
                $scope.view8.editableValue = $scope.form.objective;
            };

            $scope.disableEditor8 = function() {
                $scope.view8.editorEnabled = false;
            };

            $scope.save8 = function() {
                $scope.form.objective = $scope.view8.editableValue;
                $scope.disableEditor8();
                console.log('avc test');
                var col = 'objective';
                var element = $scope.form.objective;
                update(col, element);
                var myobjective = angular.element(document.querySelector('#myobjective'));
                myobjective.empty(); //empty div first
                myobjective.append($scope.form.objective);

            };
            
            //edit text9
            $scope.view9 = {
                editableValue: $scope.form.skill1,
                editorEnabled: false
            };

            $scope.enableEditor9 = function() {
                $scope.view9.editorEnabled = true;
                $scope.view9.editableValue = $scope.form.skill1;
            };

            $scope.disableEditor9 = function() {
                $scope.view9.editorEnabled = false;
            };

            $scope.save9 = function() {
                $scope.form.skill1 = $scope.view9.editableValue;
                $scope.disableEditor9();
                console.log('avc test');
                var col = 'skill1';
                var element = $scope.form.skill1;
                update(col, element);
                
                var myskill1 = angular.element(document.querySelector('#myskill1'));
                myskill1.empty(); //empty div first
                myskill1.append($scope.form.skill1);

            };
            
            //edit text10
            $scope.view10 = {
                editableValue: $scope.form.title1,
                editorEnabled: false
            };

            $scope.disableEditor10 = function() {
                $scope.view10.editorEnabled = false;
            };

            $scope.save10 = function() {
                $scope.form.title1 = $scope.view10.editableValue;
                $scope.disableEditor10();
                console.log('avc test');
                var col = 'title1';
                var element = $scope.form.title1;
                update(col, element);

            };
            
            //edit text11
            $scope.view11 = {
                editableValue: $scope.form.institution1,
                editorEnabled: false
            };

            $scope.disableEditor11 = function() {
                $scope.view11.editorEnabled = false;
            };

            $scope.save11 = function() {
                $scope.form.institution1 = $scope.view11.editableValue;
                $scope.disableEditor11();
                console.log('avc test');
                var col = 'institution1';
                var element = $scope.form.institution1;
                update(col, element);

            };
            
            //edit text12
            $scope.view12 = {
                editableValue: $scope.form.educationfrom1,
                editorEnabled: false
            };

            $scope.disableEditor12 = function() {
                $scope.view12.editorEnabled = false;
            };

            $scope.save12 = function() {
                $scope.form.educationfrom1 = $scope.view12.editableValue;
                $scope.disableEditor12();
                console.log('avc test');
                var col = 'educationfrom1';
                var element = $scope.form.educationfrom1;

                element = formatdate(element);
                
                console.log(element);
                update(col, element);

            };

            //edit text13
            $scope.view13 = {
                editableValue: $scope.form.educationto1,
                editorEnabled: false
            };

            $scope.disableEditor13 = function() {
                $scope.view13.editorEnabled = false;
            };

            $scope.save13 = function() {
                $scope.form.educationto1 = $scope.view13.editableValue;
                $scope.disableEditor13();
                console.log('avc test');
                var col = 'educationto1';
                var element = $scope.form.educationto1;

                element = formatdate(element);
                
                console.log(element);
                update(col, element);

            };

            //edit text14
            $scope.view14 = {
                editableValue: $scope.form.title2,
                editorEnabled: false
            };

            $scope.disableEditor14 = function() {
                $scope.view14.editorEnabled = false;
            };

            $scope.save14 = function() {
                $scope.form.title2 = $scope.view14.editableValue;
                $scope.disableEditor14();
                console.log('avc test');
                var col = 'title2';
                var element = $scope.form.title2;
                update(col, element);

            };
               
            
            //edit text15
            $scope.view15 = {
                editableValue: $scope.form.institution2,
                editorEnabled: false
            };

            $scope.disableEditor15 = function() {
                $scope.view15.editorEnabled = false;
            };

            $scope.save15 = function() {
                $scope.form.institution2 = $scope.view15.editableValue;
                $scope.disableEditor15();
                console.log('avc test');
                var col = 'institution2';
                var element = $scope.form.institution2;
                update(col, element);

            };

            
            //edit text16

            $scope.view16 = {
                editableValue: $scope.form.educationfrom2,
                editorEnabled: false
            };

            $scope.disableEditor16 = function() {
                $scope.view16.editorEnabled = false;
            };

            $scope.save16 = function() {
                $scope.form.educationfrom2 = $scope.view16.editableValue;
                $scope.disableEditor16();
                console.log('avc test');
                var col = 'educationfrom2';
                var element = $scope.form.educationfrom2;
                element = formatdate(element);
                update(col, element);

            };

            
            //edit text17
            $scope.view17 = {
                editableValue: $scope.form.educationto2,
                editorEnabled: false
            };

            $scope.disableEditor17 = function() {
                $scope.view17.editorEnabled = false;
            };

            $scope.save17 = function() {
                $scope.form.educationto2 = $scope.view17.editableValue;
                $scope.disableEditor17();
                console.log('avc test');
                var col = 'educationto2';
                var element = $scope.form.educationto2;
                element = formatdate(element);
                update(col, element);

            };


            
            //edit text18
            $scope.view18 = {
                editableValue: $scope.form.title3,
                editorEnabled: false
            };
                    
            $scope.disableEditor18 = function() {
                $scope.view18.editorEnabled = false;
            };

            $scope.save18 = function() {
                $scope.form.title3 = $scope.view18.editableValue;
                $scope.disableEditor18();
                console.log('avc test');
                var col = 'title3';
                var element = $scope.form.title3;
                update(col, element);

            };
                
            
            //edit text19

            $scope.view19 = {
                editableValue: $scope.form.institution3,
                editorEnabled: false
            };

            $scope.enableEditor19 = function() {
                $scope.view19.editorEnabled = true;
                $scope.view19.editableValue = $scope.form.institution3;
            };

            $scope.disableEditor19 = function() {
                $scope.view19.editorEnabled = false;
            };

            $scope.save19 = function() {
                $scope.form.institution3 = $scope.view19.editableValue;
                $scope.disableEditor19();
                console.log('avc test');
                var col = 'institution3';
                var element = $scope.form.institution3;
                update(col, element);

            };
            
            //edit text20
            $scope.view20 = {
                editableValue: $scope.form.educationfrom3,
                editorEnabled: false
            };

            $scope.enableEditor20 = function() {
                $scope.view20.editorEnabled = true;
                $scope.view20.editableValue = $scope.form.educationfrom3;
            };

            $scope.disableEditor20 = function() {
                $scope.view20.editorEnabled = false;
            };

            $scope.save20 = function() {
                $scope.form.educationfrom3 = $scope.view20.editableValue;
                $scope.disableEditor20();
                console.log('avc test');
                var col = 'educationfrom3';
                var element = $scope.form.educationfrom3;
                element = formatdate(element);
                update(col, element);

            };
               
            
            //edit text21
            $scope.view21 = {
                editableValue: $scope.form.educationto3,
                editorEnabled: false
            };

            $scope.enableEditor21 = function() {
                $scope.view21.editorEnabled = true;
                $scope.view21.editableValue = $scope.form.educationto3;
            };

            $scope.disableEditor21 = function() {
                $scope.view21.editorEnabled = false;
            };

            $scope.save21 = function() {
                $scope.form.educationto3 = $scope.view21.editableValue;
                $scope.disableEditor21();
                console.log('avc test');
                var col = 'educationto3';
                var element = $scope.form.educationto3;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text22

            $scope.view22 = {
                editableValue: $scope.form.certificate,
                editorEnabled: false
            };

            $scope.enableEditor22 = function() {
                $scope.view22.editorEnabled = true;
                $scope.view22.editableValue = $scope.form.certificate;
            };

            $scope.disableEditor22 = function() {
                $scope.view22.editorEnabled = false;
            };

            $scope.save22 = function() {
                $scope.form.certificate = $scope.view22.editableValue;
                $scope.disableEditor22();
                console.log('avc test');
                var col = 'certificate';
                var element = $scope.form.certificate;
                update(col, element);
                
                var mycertificate = angular.element(document.querySelector('#mycertificate'));
                mycertificate.empty(); //empty div first
                mycertificate.append($scope.form.certificate);

            };
            
            //edit text23
            $scope.view23 = {
                editableValue: $scope.form.license,
                editorEnabled: false
            };

            $scope.enableEditor23 = function() {
                $scope.view23.editorEnabled = true;
                $scope.view23.editableValue = $scope.form.license;
            };

            $scope.disableEditor23 = function() {
                $scope.view23.editorEnabled = false;
            };

            $scope.save23 = function() {
                $scope.form.license = $scope.view23.editableValue;
                $scope.disableEditor23();
                console.log('avc test');
                var col = 'license';
                var element = $scope.form.license;
                update(col, element);
                
                var mylicense = angular.element(document.querySelector('#mylicense'));
                mylicense.empty(); //empty div first
                mylicense.append($scope.form.license);
            };
            
            //edit text24
            $scope.view24 = {
                editableValue: $scope.form.jtitle1,
                editorEnabled: false
            };

            $scope.disableEditor24 = function() {
                $scope.view24.editorEnabled = false;
            };

            $scope.save24 = function() {
                $scope.form.jtitle1 = $scope.view24.editableValue;
                $scope.disableEditor24();
                console.log('avc test');
                var col = 'jtitle1';
                var element = $scope.form.jtitle1;
                update(col, element);

            };
           
            //edit text25
            $scope.view25 = {
                editableValue: $scope.form.cname1,
                editorEnabled: false
            };

            $scope.disableEditor25 = function() {
                $scope.view25.editorEnabled = false;
            };

            $scope.save25 = function() {
                $scope.form.cname1 = $scope.view25.editableValue;
                $scope.disableEditor25();
                console.log('avc test');
                var col = 'cname1';
                var element = $scope.form.cname1;
                update(col, element);

            };
            
            //edit text26
            $scope.view26 = {
                editableValue: $scope.form.cwebsite1,
                editorEnabled: false
            };

            $scope.disableEditor26 = function() {
                $scope.view26.editorEnabled = false;
            };

            $scope.save26 = function() {
                $scope.form.cwebsite1 = $scope.view26.editableValue;
                $scope.disableEditor26();
                console.log('avc test');
                var col = 'cwebsite1';
                var element = $scope.form.cwebsite1;
                update(col, element);

            };
            
            //edit text27
            $scope.view27 = {
                editableValue: $scope.form.jfrom1,
                editorEnabled: false
            };

            $scope.disableEditor27 = function() {
                $scope.view27.editorEnabled = false;
            };

            $scope.save27 = function() {
                $scope.form.jfrom1 = $scope.view27.editableValue;
                $scope.disableEditor27();
                console.log('avc test');
                var col = 'jfrom1';
                var element = $scope.form.jfrom1;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text28
            $scope.view28 = {
                editableValue: $scope.form.jto1,
                editorEnabled: false
            };

            $scope.disableEditor28 = function() {
                $scope.view28.editorEnabled = false;
            };

            $scope.save28 = function() {
                $scope.form.jto1 = $scope.view28.editableValue;
                $scope.disableEditor28();
                console.log('avc test');
                var col = 'jto1';
                var element = $scope.form.jto1;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text29
            $scope.view29 = {
                editableValue: $scope.form.duty1,
                editorEnabled: false
            };

            $scope.disableEditor29 = function() {
                $scope.view29.editorEnabled = false;
            };

            $scope.save29 = function() {
                $scope.form.duty1 = $scope.view29.editableValue;
                $scope.disableEditor29();
                console.log('avc test');
                var col = 'duty1';
                var element = $scope.form.duty1;
                update(col, element);
                
                var myduty1 = angular.element(document.querySelector('#myduty1'));
                myduty1.empty(); //empty div first
                myduty1.append($scope.form.duty1);

            };
            
             //edit text30
            $scope.view30 = {
                editableValue: $scope.form.jtitle2,
                editorEnabled: false
            };

            $scope.enableEditor30 = function() {
                $scope.view30.editorEnabled = true;
                $scope.view30.editableValue = $scope.form.jtitle2;
            };

            $scope.disableEditor30 = function() {
                $scope.view30.editorEnabled = false;
            };

            $scope.save30 = function() {
                $scope.form.jtitle2 = $scope.view30.editableValue;
                $scope.disableEditor30();
                console.log('avc test');
                var col = 'jtitle2';
                var element = $scope.form.jtitle2;
                update(col, element);

            };
            
           //edit text31

            $scope.view31 = {
                editableValue: $scope.form.cname2,
                editorEnabled: false
            };

            $scope.enableEditor31 = function() {
                $scope.view31.editorEnabled = true;
                $scope.view31.editableValue = $scope.form.cname2;
            };

            $scope.disableEditor31 = function() {
                $scope.view31.editorEnabled = false;
            };

            $scope.save31 = function() {
                $scope.form.cname2 = $scope.view31.editableValue;
                $scope.disableEditor31();
                console.log('avc test');
                var col = 'cname2';
                var element = $scope.form.cname2;
                update(col, element);

            };

            

                       
            //edit text32
            $scope.view32 = {
                editableValue: $scope.form.cwebsite2,
                editorEnabled: false
            };

            $scope.enableEditor32 = function() {
                $scope.view32.editorEnabled = true;
                $scope.view32.editableValue = $scope.form.cwebsite2;
            };

            $scope.disableEditor32 = function() {
                $scope.view32.editorEnabled = false;
            };

            $scope.save32 = function() {
                $scope.form.cwebsite2 = $scope.view32.editableValue;
                $scope.disableEditor32();
                console.log('avc test');
                var col = 'cwebsite2';
                var element = $scope.form.cwebsite2;
                update(col, element);

            };
            
    
            
            //edit text33
            $scope.view33 = {
                editableValue: $scope.form.jfrom2,
                editorEnabled: false
            };

            $scope.enableEditor33 = function() {
                $scope.view33.editorEnabled = true;
                $scope.view33.editableValue = $scope.form.jfrom2;
            };

            $scope.disableEditor33 = function() {
                $scope.view33.editorEnabled = false;
            };

            $scope.save33 = function() {
                $scope.form.jfrom2 = $scope.view33.editableValue;
                $scope.disableEditor33();
                console.log('avc test');
                var col = 'jfrom2';
                var element = $scope.form.jfrom2;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text34
            $scope.view34 = {
                editableValue: $scope.form.jto2,
                editorEnabled: false
            };

            $scope.enableEditor34 = function() {
                $scope.view34.editorEnabled = true;
                $scope.view34.editableValue = $scope.form.jto2;
            };

            $scope.disableEditor34 = function() {
                $scope.view34.editorEnabled = false;
            };

            $scope.save34 = function() {
                $scope.form.jto2 = $scope.view34.editableValue;
                $scope.disableEditor34();
                console.log('avc test');
                var col = 'jto2';
                var element = $scope.form.jto2;
                element = formatdate(element);
                update(col, element);

            };
            
                
            
            //edit text35

            $scope.view35 = {
                editableValue: $scope.form.duty2,
                editorEnabled: false
            };

            $scope.enableEditor35 = function() {
                $scope.view35.editorEnabled = true;
                $scope.view35.editableValue = $scope.form.duty2;
            };

            $scope.disableEditor35 = function() {
                $scope.view35.editorEnabled = false;
            };

            $scope.save35 = function() {
                $scope.form.duty2 = $scope.view35.editableValue;
                $scope.disableEditor35();
                console.log('avc test');
                var col = 'duty2';
                var element = $scope.form.duty2;
                update(col, element);
                
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.empty(); //empty div first
                myduty2.append($scope.form.duty2);

            };

           
            
             //edit text36
            $scope.view36 = {
                editableValue: $scope.form.jtitle3,
                editorEnabled: false
            };

            $scope.enableEditor36 = function() {
                $scope.view36.editorEnabled = true;
                $scope.view36.editableValue = $scope.form.jtitle3;
            };

            $scope.disableEditor36 = function() {
                $scope.view36.editorEnabled = false;
            };

            $scope.save36 = function() {
                $scope.form.jtitle3 = $scope.view36.editableValue;
                $scope.disableEditor36();
                console.log('avc test');
                var col = 'jtitle3';
                var element = $scope.form.jtitle3;
                update(col, element);

            };
                
            
           //edit text37
            $scope.view37 = {
                editableValue: $scope.form.cname3,
                editorEnabled: false
            };

            $scope.enableEditor37 = function() {
                $scope.view37.editorEnabled = true;
                $scope.view37.editableValue = $scope.form.cname3;
            };

            $scope.disableEditor37 = function() {
                $scope.view37.editorEnabled = false;
            };

            $scope.save37 = function() {
                $scope.form.cname3 = $scope.view37.editableValue;
                $scope.disableEditor37();
                console.log('avc test');
                var col = 'cname3';
                var element = $scope.form.cname3;
                update(col, element);

            };
               
                       
            //edit text38
            $scope.view38 = {
                editableValue: $scope.form.cwebsite3,
                editorEnabled: false
            };

            $scope.enableEditor38 = function() {
                $scope.view38.editorEnabled = true;
                $scope.view38.editableValue = $scope.form.cwebsite3;
            };

            $scope.disableEditor38 = function() {
                $scope.view38.editorEnabled = false;
            };

            $scope.save38 = function() {
                $scope.form.cwebsite3 = $scope.view38.editableValue;
                $scope.disableEditor38();
                console.log('avc test');
                var col = 'cwebsite3';
                var element = $scope.form.cwebsite3;
                update(col, element);

            };
            $scope.custom38 = true;
            $scope.toggleCustom38 = function() {
               $scope.custom38 = false;
            };
            $scope.toggleCustomb38 = function() {
                $scope.custom38 = true;
            }; 
            
            //edit text39
            $scope.view39 = {
                editableValue: $scope.form.jfrom3,
                editorEnabled: false
            };

            $scope.enableEditor39 = function() {
                $scope.view39.editorEnabled = true;
                $scope.view39.editableValue = $scope.form.jfrom3;
            };

            $scope.disableEditor39 = function() {
                $scope.view39.editorEnabled = false;
            };

            $scope.save39 = function() {
                $scope.form.jfrom3 = $scope.view39.editableValue;
                $scope.disableEditor39();
                console.log('avc test');
                var col = 'jfrom3';
                var element = $scope.form.jfrom3;
                element = formatdate(element);
                update(col, element);

            };

            
                
            //edit text40
            $scope.view40 = {
                editableValue: $scope.form.jto3,
                editorEnabled: false
            };

            $scope.enableEditor40 = function() {
                $scope.view40.editorEnabled = true;
                $scope.view40.editableValue = $scope.form.jto3;
            };

            $scope.disableEditor40 = function() {
                $scope.view40.editorEnabled = false;
            };

            $scope.save40 = function() {
                $scope.form.jto3 = $scope.view40.editableValue;
                $scope.disableEditor40();
                console.log('avc test');
                var col = 'jto3';
                var element = $scope.form.jto3;
                element = formatdate(element);
                update(col, element);

            };
               
            
            //edit text41
            $scope.view41 = {
                editableValue: $scope.form.duty3,
                editorEnabled: false
            };

            $scope.enableEditor41 = function() {
                $scope.view41.editorEnabled = true;
                $scope.view41.editableValue = $scope.form.duty3;
            };

            $scope.disableEditor41 = function() {
                $scope.view41.editorEnabled = false;
            };

            $scope.save41 = function() {
                $scope.form.duty3 = $scope.view41.editableValue;
                $scope.disableEditor41();
                console.log('avc test');
                var col = 'duty3';
                var element = $scope.form.duty3;
                update(col, element);
                
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.empty(); //empty div first
                myduty3.append($scope.form.duty3);

            };
           
            
            
            //edit text42
             $scope.view42 = {
                editableValue: $scope.form.jtitle4,
                editorEnabled: false
            };

            $scope.enableEditor42 = function() {
                $scope.view42.editorEnabled = true;
                $scope.view42.editableValue = $scope.form.jtitle4;
            };

            $scope.disableEditor42 = function() {
                $scope.view42.editorEnabled = false;
            };

            $scope.save42 = function() {
                $scope.form.jtitle4 = $scope.view42.editableValue;
                $scope.disableEditor42();
                console.log('avc test');
                var col = 'jtitle4';
                var element = $scope.form.jtitle4;
                update(col, element);

            };
      
            
           //edit text43
            $scope.view43 = {
                editableValue: $scope.form.cname4,
                editorEnabled: false
            };

            $scope.enableEditor43 = function() {
                $scope.view43.editorEnabled = true;
                $scope.view43.editableValue = $scope.form.cname4;
            };

            $scope.disableEditor43 = function() {
                $scope.view43.editorEnabled = false;
            };

            $scope.save43 = function() {
                $scope.form.cname4 = $scope.view43.editableValue;
                $scope.disableEditor43();
                console.log('avc test');
                var col = 'cname4';
                var element = $scope.form.cname4;
                update(col, element);

            };

                
                       
            //edit text44
            $scope.view44 = {
                editableValue: $scope.form.cwebsite4,
                editorEnabled: false
            };

            $scope.enableEditor44 = function() {
                $scope.view44.editorEnabled = true;
                $scope.view44.editableValue = $scope.form.cwebsite4;
            };

            $scope.disableEditor44 = function() {
                $scope.view44.editorEnabled = false;
            };

            $scope.save44 = function() {
                $scope.form.cwebsite4 = $scope.view44.editableValue;
                $scope.disableEditor44();
                console.log('avc test');
                var col = 'cwebsite4';
                var element = $scope.form.cwebsite4;
                update(col, element);

            };
            
                
            //edit text45
            $scope.view45 = {
                editableValue: $scope.form.jfrom4,
                editorEnabled: false
            };

            $scope.enableEditor45 = function() {
                $scope.view45.editorEnabled = true;
                $scope.view45.editableValue = $scope.form.jfrom4;
            };

            $scope.disableEditor45 = function() {
                $scope.view45.editorEnabled = false;
            };

            $scope.save45 = function() {
                $scope.form.jfrom4 = $scope.view45.editableValue;
                $scope.disableEditor45();
                console.log('avc test');
                var col = 'jfrom4';
                var element = $scope.form.jfrom4;
                element = formatdate(element);
                update(col, element);

            };

            
            //edit text46
            $scope.view46 = {
                editableValue: $scope.form.jto4,
                editorEnabled: false
            };

            $scope.enableEditor46 = function() {
                $scope.view46.editorEnabled = true;
                $scope.view46.editableValue = $scope.form.jto4;
            };

            $scope.disableEditor46 = function() {
                $scope.view46.editorEnabled = false;
            };

            $scope.save46 = function() {
                $scope.form.jto4 = $scope.view46.editableValue;
                $scope.disableEditor46();
                console.log('avc test');
                var col = 'jto4';
                var element = $scope.form.jto4;
                element = formatdate(element);
                update(col, element);

            };

               
            
            //edit text47
            $scope.view47 = {
                editableValue: $scope.form.duty4,
                editorEnabled: false
            };

            $scope.enableEditor47 = function() {
                $scope.view47.editorEnabled = true;
                $scope.view47.editableValue = $scope.form.duty4;
            };

            $scope.disableEditor47 = function() {
                $scope.view47.editorEnabled = false;
            };

            $scope.save47 = function() {
                $scope.form.duty4 = $scope.view47.editableValue;
                $scope.disableEditor47();
                console.log('avc test');
                var col = 'duty4';
                var element = $scope.form.duty4;
                update(col, element);
                
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.empty(); //empty div first
                myduty4.append($scope.form.duty4);

            };

                 
            //edit text48
            $scope.view48 = {
                editableValue: $scope.form.jtitle5,
                editorEnabled: false
            };

            $scope.enableEditor48 = function() {
                $scope.view48.editorEnabled = true;
                $scope.view48.editableValue = $scope.form.jtitle5;
            };

            $scope.disableEditor48 = function() {
                $scope.view48.editorEnabled = false;
            };

            $scope.save48 = function() {
                $scope.form.jtitle5 = $scope.view48.editableValue;
                $scope.disableEditor48();
                console.log('avc test');
                var col = 'jtitle5';
                var element = $scope.form.jtitle5;
                update(col, element);

            };

               
            
           //edit text49
        $scope.view49 = {
                editableValue: $scope.form.cname5,
                editorEnabled: false
            };

            $scope.enableEditor49 = function() {
                $scope.view49.editorEnabled = true;
                $scope.view49.editableValue = $scope.form.cname5;
            };

            $scope.disableEditor49 = function() {
                $scope.view49.editorEnabled = false;
            };

            $scope.save49 = function() {
                $scope.form.cname5 = $scope.view49.editableValue;
                $scope.disableEditor49();
                console.log('avc test');
                var col = 'cname5';
                var element = $scope.form.cname5;
                update(col, element);

            };
            
    
                       
            //edit text50
          $scope.view50 = {
                editableValue: $scope.form.cwebsite5,
                editorEnabled: false
            };

            $scope.enableEditor50 = function() {
                $scope.view50.editorEnabled = true;
                $scope.view50.editableValue = $scope.form.cwebsite5;
            };

            $scope.disableEditor50 = function() {
                $scope.view50.editorEnabled = false;
            };

            $scope.save50 = function() {
                $scope.form.cwebsite5 = $scope.view50.editableValue;
                $scope.disableEditor50();
                console.log('avc test');
                var col = 'cwebsite5';
                var element = $scope.form.cwebsite5;
                update(col, element);

            };

      
            //edit text51
                    $scope.view51 = {
                editableValue: $scope.form.jfrom5,
                editorEnabled: false
            };

            $scope.enableEditor51 = function() {
                $scope.view51.editorEnabled = true;
                $scope.view51.editableValue = $scope.form.jfrom5;
            };

            $scope.disableEditor51 = function() {
                $scope.view51.editorEnabled = false;
            };

            $scope.save51 = function() {
                $scope.form.jfrom5 = $scope.view51.editableValue;
                $scope.disableEditor51();
                console.log('avc test');
                var col = 'jfrom5';
                var element = $scope.form.jfrom5;
                element = formatdate(element);
                update(col, element);

            };
            

            
            //edit text52
                    $scope.view52 = {
                editableValue: $scope.form.jto5,
                editorEnabled: false
            };

            $scope.enableEditor52 = function() {
                $scope.view52.editorEnabled = true;
                $scope.view52.editableValue = $scope.form.jto5;
            };

            $scope.disableEditor52 = function() {
                $scope.view52.editorEnabled = false;
            };

            $scope.save52 = function() {
                $scope.form.jto5 = $scope.view52.editableValue;
                $scope.disableEditor52();
                console.log('avc test');
                var col = 'jto5';
                var element = $scope.form.jto5;
                element = formatdate(element);
                update(col, element);

            };
              
            
            //edit text53
            $scope.view53 = {
                editableValue: $scope.form.duty5,
                editorEnabled: false
            };

            $scope.enableEditor53 = function() {
                $scope.view53.editorEnabled = true;
                $scope.view53.editableValue = $scope.form.duty5;
            };

            $scope.disableEditor53 = function() {
                $scope.view53.editorEnabled = false;
            };

            $scope.save53 = function() {
                $scope.form.duty5 = $scope.view53.editableValue;
                $scope.disableEditor53();
                console.log('avc test');
                var col = 'duty5';
                var element = $scope.form.duty5;
                update(col, element);
                
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.empty(); //empty div first
                myduty5.append($scope.form.duty5);

            };

            
            $scope.createpdf = function() {
                         $http.post('/createpdf?rid=' + $scope.form.r_id + '&url=' + $scope.src).success(function (data) {
                         console.log(data);  
                             $scope.dd = data;
         //download it                    
        function downloadpdf () {
            var s = $rootScope.remoteURL + '/' + $scope.dd;//'http://localhost:3000/' + $scope.dd;
            $window.open(s, '_blank');//fix later url
        }

        $timeout(downloadpdf, 7000); 
     
//          $timeout(function () {
//    downloadpdf(data);
//}, 7000);                   
//                            
                      });
            };
				}else
					{
						console.log('Message: no resume for this customer, or there may be repeat resumes');
						$scope.resumeErrorMessage = 'No Resume yet';
						$scope.hideEmptyResume = true;
					}

            
        });
    };

    function formatdate(element) { 
            
            var array = element.split("-");
                if(array[0] == '01')
                    {
                        element = 'January-' + array[1];
                    }else if (array[0] == '02')
                    {
                        element = 'February-' + array[1];
                    }else if (array[0] == '03')
                    {
                        element = 'March-' + array[1];
                    }else if (array[0] == '04')
                    {
                        element = 'April-' + array[1];
                    }else if (array[0] == '05')
                    {
                        element = 'May-' + array[1];
                    }else if (array[0] == '06')
                    {
                        element = 'June-' + array[1];
                    }else if (array[0] == '07')
                    {
                        element = 'July-' + array[1];
                    }else if (array[0] == '08')
                    {
                        element = 'August-' + array[1];
                    }else if (array[0] == '09')
                    {
                        element = 'September-' + array[1];
                    }else if (array[0] == '10')
                    {
                        element = 'October-' + array[1];
                    }else if (array[0] == '11')
                    {
                        element = 'November-' + array[1];
                    }else if (array[0] == '12')
                    {
                        element = 'December-' + array[1];
                    }
             return element;
     };
    
    
    function update(col, element) { 
         $http.post('/updatecol?rid=' + $scope.form.r_id + '&col=' + col + '&element=' + element).success(function (data) {
			 			$scope.form.modified_date = 'just now';
                         console.log('data updated');   
                      });
     
     }; 	
	
	
	
//download pdf from booking form
	   		$scope.downloadBookingPDF = function() {
                 	var pp = 'http://globalworkandtravel.com/book/upload/' + $scope.profile.first_name + '-' + $scope.profile.last_name + '-' + $routeParams.cid +'.pdf'
            		$window.open(pp, '_blank');
            };
	
	
	
//resume tab ends
//******************************************************************************************************************************************
//******************************************************************************************************************************************
	
//find all logs with some different status parameters for this customer
	    function findApprove(status) {
		 var defer = $q.defer();// deferred contains the promise to be returned
         $http.get('/findApprove?cid=' + $routeParams.cid + '&status=' + status).success(function (data) {
                         defer.resolve(data);// to resolve (fulfill) a promise 
			 			
                      });
     	 return defer.promise; // promise is returned
     }; 
	

	
//add new log such as approve or edit
	function addNewLog(fieldname, value, status) {
		 var defer = $q.defer();// deferred contains the promise to be returned
         $http.post('/addNewLog?cid=' + $routeParams.cid + '&staff=' + $rootScope.name + '&staffid=' + $rootScope.staffID + '&fieldname=' + fieldname + '&value=' + value + '&status=' + status).success(function (data) {
                         defer.resolve(data);// to resolve (fulfill) a promise 
			 			
                      });
     	 return defer.promise; // promise is returned
     }; 

	
//display all logs
	
	 // Pre-fetch an external template populated with a custom scope
  var myModal = $modal({scope: $scope, template: 'modal.html', show: false});
  // Show when some event occurs (use $promise property to ensure the template has been loaded)
  $scope.showModal = function(fieldname) {
	  getLog(fieldname);
  };
	
//get all log data for this field
		function getLog(fieldname) {
         $http.get('/getLog?cid=' + $routeParams.cid + '&fieldname=' + fieldname).success(function (data) {
			 				$scope.loglist = data;
			 				$scope.f = fieldname;
			 			    myModal.$promise.then(myModal.show);
                      });
     }; 

	
//get all payments for this customer from payment table
	     $scope.totalAmountPaid = 0;
		 $scope.totalAmountNext = 0;
		 $scope.totalAmountDiscount = 0;
	getAllPayment();
    function getAllPayment() { 
				$http.get('/getpayment?cid=' + $routeParams.cid).success(function (data) {
                        if (data.length > 0)
                            {
                                $scope.list = data;
								$scope.allPaymentTimeline = data;
								if ($scope.allPaymentTimeline.length == 0)
									{
										getAllNoteTimeline();
									}
								
                                for (i=0; i<data.length; i++)
                                {
                                    if (data[i].paymentStatus == 'Paid')
										{
											$scope.totalAmountPaid = $scope.totalAmountPaid + data[i].paymentAmount;
										}else if (data[i].paymentStatus == 'Next')
											{
												$scope.totalAmountNext = $scope.totalAmountNext + data[i].paymentAmount;
											}else if (data[i].paymentStatus == 'Discount')
												{
													$scope.totalAmountDiscount = $scope.totalAmountDiscount + data[i].paymentAmount;
												}else
													{
														console.log('no need to count this status payment');
													}
									
                                    $scope.list[i].paymentAmount = Number(data[i].paymentAmount).toLocaleString('en');
                                    //add commas between numbers
                                }
                                $scope.currency = data[0].Currency;
                                 
                            }
                        else
                        {
                            $scope.list = {};
                            $scope.totalAmountPaid = 0;
		 					$scope.totalAmountNext = 0;
		 					$scope.totalAmountDiscount = 0;
                        }
//					$scope.position = 'left';
					
					for (j=0; j<$scope.allPaymentTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var text = $scope.allPaymentTimeline[j].paymentAmount + ' ' + $scope.allPaymentTimeline[j].Currency + ' with ' +  $scope.allPaymentTimeline[j].paymentStatus + ' status.';
							var h = 'New Payment Added';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'danger',
								badgeIconClass: 'glyphicon-credit-card',
								heading: h,
								staff: $scope.allPaymentTimeline[j].Staff,
								time: $scope.allPaymentTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							
							if (j == ($scope.allPaymentTimeline.length - 1))
								{
									getAllNoteTimeline();
								}
						}
					
					
					
            });
     
     }; 
	

//time line
    function getAllNoteTimeline() { 
		$http.get('/getAllNoteTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allNoteTimeline = data;
							
				if ($scope.allNoteTimeline.length == 0)
					{
						getAllTaskTimeline();
					}
			
			
					for (j=0; j<$scope.allNoteTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var h = 'New Note Added';
							var one = {
								text: $scope.allNoteTimeline[j].text,
								position: $scope.position,
								badgeClass: 'info',
								badgeIconClass: 'glyphicon-pencil',
								heading: h,
								staff: $scope.allNoteTimeline[j].staff,
								time: $scope.allNoteTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							if (j == ($scope.allNoteTimeline.length - 1))
								{
									getAllTaskTimeline();
								}
						}
					
	});
}; 
	
	function getAllTaskTimeline() { 
		$http.get('/getAllTaskTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allTaskTimeline = data;
			
				if ($scope.allTaskTimeline.length == 0)
					{
						getAllApproveTimeline();
					}
			
			
				for (j=0; j<$scope.allTaskTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var text = '';
							var h = $scope.allTaskTimeline[j].taskName + ' has been done';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'warning',
								badgeIconClass: 'glyphicon-tasks',
								heading: h,
								staff: $scope.allTaskTimeline[j].user,
								time: $scope.allTaskTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							if (j == ($scope.allTaskTimeline.length - 1))
								{
									getAllApproveTimeline();
								}
							
						}
				
					
					
	});
};
	
	
		function getAllApproveTimeline() { 
		$http.get('/getAllApproveTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allApproveTimeline = data;
				for (j=0; j<$scope.allApproveTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var h = $scope.allApproveTimeline[j].field_name + ' has been approved';
							var text = '';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'success',
								badgeIconClass: 'glyphicon-check',
								heading: h,
								staff: $scope.allApproveTimeline[j].staff_name,
								time: $scope.allApproveTimeline[j].date
							};
							$scope.timelineData.push(one);
							
						}
				
					
					
	});
};
	
	
//create travel invoice
$scope.invoice = function() {
	 invoiceTPL.show();    	
};
	
	$scope.data10 = {
        availableOptions: [
            {
                id: 'Paid',
                name: 'Paid'
            },
            {
                id: 'Pending',
                name: 'Pending'
            },
            {
                id: 'Cancelled',
                name: 'Cancelled'
            }
    ],
        selectedOption: {
            id: 'Paid',
            name: 'Paid'
        }
    };
	
	$scope.flightairline = {
        availableOptions: [
            {
                id: 'airline1',
                name: 'airline1'
            },
            {
                id: 'airline2',
                name: 'airline2'
            },
            {
                id: 'airline3',
                name: 'airline3'
            }
    ],
        selectedOption: {
            id: 'airline1',
            name: 'airline1'
        }
    };

	$scope.flightclass = {
        availableOptions: [
            {
                id: 'classA',
                name: 'classA'
            },
            {
                id: 'classB',
                name: 'classB'
            },
            {
                id: 'classC',
                name: 'classC'
            }
    ],
        selectedOption: {
            id: 'classA',
            name: 'classA'
        }
    };
	
	$scope.otherChargesItem = {
        availableOptions: [
            {
                id: 'item1',
                name: 'item1'
            },
            {
                id: 'item2',
                name: 'item2'
            },
            {
                id: 'item3',
                name: 'item3'
            }
    ],
        selectedOption: {
            id: 'item1',
            name: 'item1'
        }
    };
	
	$scope.insuranceCompany = {
        availableOptions: [
            {
                id: 'company1',
                name: 'company1'
            },
            {
                id: 'company2',
                name: 'company2'
            },
            {
                id: 'company3',
                name: 'company3'
            }
    ],
        selectedOption: {
            id: 'company1',
            name: 'company1'
        }
    };
	
	$scope.insurancePlan = {
        availableOptions: [
            {
                id: 'plan1',
                name: 'plan1'
            },
            {
                id: 'plan2',
                name: 'plan2'
            },
            {
                id: 'plan3',
                name: 'plan3'
            }
    ],
        selectedOption: {
            id: 'plan1',
            name: 'plan1'
        }
    };
	
$scope.addFlights = function() {
	addAccommodationTPL.hide();
	addInsuranceTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addFlightTPL.show();    	
};
$scope.addInsurance = function() {
	addAccommodationTPL.hide();
	addFlightTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
 	addInsuranceTPL.show();  
};	
	
$scope.addAccommodation = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
 	addAccommodationTPL.show();  
};

$scope.addTransfer = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addTransferTPL.show();
};
	
$scope.addAddon = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addAddonTPL.show();
};	

$scope.addCharity = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addCharityTPL.show();
};
	
$scope.addVoucher = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addOtherChargesTPL.hide();
	addVoucherTPL.show();
};
	
$scope.addOtherCharges = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.show();
};

//flight
$scope.flightStatus = 'inactive';//
$scope.flightRTN = 'return';//need this for access scope variable in tpl page?? need to be fixed later
	
$scope.saveFlightDetail = function(flightdate, flightQuotedAmount, flightTaxAmount, flightDepartureCity, flightArrivalCity, flightRTN, flightStatus, flightComments) {
	$http.post('/saveFlightDetail?cid=' + $routeParams.cid + '&flightdate=' + flightdate + '&flightairline=' + $scope.flightairline.selectedOption.name + '&flightclass=' + $scope.flightclass.selectedOption.name + '&flightQuotedAmount=' + flightQuotedAmount + '&flightTaxAmount=' + flightTaxAmount + '&flightDepartureCity=' + flightDepartureCity + '&flightArrivalCity=' + flightArrivalCity + '&flightRTN=' + flightRTN + '&flightStatus=' + flightStatus + '&flightComments=' + flightComments).success(function (data) {
		
	$scope.flightTableNodata = false;
		
	//change front end later
	addFlightTPL.hide();
	
							var newFlight = {
								flight_airline: $scope.flightairline.selectedOption.name,
								flight_booking_class: $scope.flightclass.selectedOption.name,
								flight_tentative_departure_date: flightdate,
								flight_quoted_airfare_amount: flightQuotedAmount,
								flight_taxes_amount: flightTaxAmount,
								flight_departure_city: flightDepartureCity,
								flight_arrival_city: flightArrivalCity,
								flight_rtnow: flightRTN,
								flight_comments: flightComments,
								flight_status: flightStatus
							};
							$scope.flightsList.push(newFlight);
	});
}
	
function getFlightsList() { 
		$http.get('/getFlightsList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.flightsList = data;
					if (data.length == 0)
						{
							$scope.flightTableNodata = true;
						}
					
	});
};
	
//insurance
$scope.insuranceData = {};//
$scope.insuranceData.excess = 'no';//
$scope.insuranceData.status = 'inactive';//
$scope.saveInsuranceDetail = function(insuranceData) {
	$http.post('/saveInsuranceDetail?cid=' + $routeParams.cid + '&company=' + $scope.insuranceCompany.selectedOption.name + '&from=' + insuranceData.from + '&to=' + insuranceData.to + '&plan=' + $scope.insurancePlan.selectedOption.name + '&excess=' + insuranceData.excess + '&amount=' + insuranceData.amount + '&comments=' + insuranceData.comments + '&status=' + insuranceData.status).success(function (data) {	
	//change front end later
	addInsuranceTPL.hide();
	$scope.insuranceData = {};
	$scope.insuranceData.excess = 'no';
	$scope.insuranceData.status = 'inactive';
		
	$scope.insuranceTableNodata = false;
	
							var newInsurance = {
								insurance_company: $scope.insuranceCompany.selectedOption.name,
								insurance_from: insuranceData.from,
								insurance_to: insuranceData.to,
								insurance_plan: $scope.insurancePlan.selectedOption.name,
								insurance_excess: insuranceData.excess,
								insurance_amount: insuranceData.amount,
								insurance_comments: insuranceData.comments,
								insurance_status: insuranceData.status
							};
							$scope.insuranceList.push(newInsurance);
	});
}

$scope.hideInsuranceTPL = function() {
	addInsuranceTPL.hide();
	$scope.insuranceData = {};
	$scope.insuranceData.excess = 'no';
	$scope.insuranceData.status = 'inactive';
};

function getInsuranceList() { 
		$http.get('/getInsuranceList?cid=' + $routeParams.cid).success(function (data) {
					if(data.length == 0)
						{
							$scope.insuranceTableNodata = true;
						}
					$scope.insuranceList = data;
					
	});
};
	
//accommodation
$scope.accommodationData = {};
$scope.accommodationData.transfer = 'no';
$scope.accommodationData.status = 'inactive';
	
$scope.saveAccommodationDetail = function(accommodationData) {
	$http.post('/saveAccommodationDetail?cid=' + $routeParams.cid + '&from=' + accommodationData.from + '&to=' + accommodationData.to + '&transfer=' + accommodationData.transfer + '&comments=' + accommodationData.comments + '&detail=' + accommodationData.detail + '&amount=' + accommodationData.amount + '&status=' + accommodationData.status).success(function (data) {	
	//change front end later
	addAccommodationTPL.hide();
	$scope.accommodationData = {};
	$scope.accommodationData.transfer = 'no';
	$scope.accommodationData.status = 'inactive';
		
	$scope.accommodationTableNodata = false;
	
							var newAccommodation = {
								accommodation_from: accommodationData.from,
								accommodation_to: accommodationData.to,
								accommodation_transfer: accommodationData.transfer,
								accommodation_comments: accommodationData.comments,
								additional_accommodation: accommodationData.detail,
								accommodation_amount: accommodationData.amount,
								accommodation_status: accommodationData.status
							};
							$scope.accommodationList.push(newAccommodation);
	});
}

$scope.hideAccommodationTPL = function() {
	addAccommodationTPL.hide();
	$scope.accommodationData = {};
	$scope.accommodationData.transfer = 'no';
	$scope.accommodationData.status = 'inactive';
};
	
function getAccommodationList() { 
		$http.get('/getAccommodationList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.accommodationList = data;
			if(data.length == 0)
				{
					$scope.accommodationTableNodata = true;
				}
					
	});
};

//transfer
$scope.transferData = {};
$scope.transferData.returnow = 'return';
$scope.transferData.status = 'inactive';
	
$scope.saveTransferDetail = function(transferData) {
	$http.post('/saveTransferDetail?cid=' + $routeParams.cid + '&detail=' + transferData.detail + '&amount=' + transferData.amount + '&from=' + transferData.from + '&to=' + transferData.to + '&returnow=' + transferData.rtnow + '&comments=' + transferData.comments + '&status=' + transferData.status).success(function (data) {	
	//change front end later
	addTransferTPL.hide();
	$scope.transferData = {};
	$scope.transferData.returnow = 'return';
	$scope.transferData.status = 'inactive';
	$scope.transferTableNodata = false;
							var newTransfer = {
								additional_transfer: transferData.detail,
								transfer_amount: transferData.amount,
								transfer_from: transferData.from,
								transfer_to: transferData.to,
								transfer_returnow: transferData.rtnow,
								transfer_comments: transferData.comments,
								transfer_status: transferData.status
							};
							$scope.transferList.push(newTransfer);
	});
}

$scope.hideTransferTPL = function() {
	addTransferTPL.hide();
	$scope.transferData = {};
	$scope.transferData.returnow = 'return';
	$scope.transferData.status = 'inactive';
};

function getTransferList() { 
		$http.get('/getTransferList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.transferList = data;
			if(data.length == 0)
				{
					$scope.transferTableNodata = true;
				}
	});
};

//addon
$scope.addonData = {};
$scope.addonData.status = 'inactive';
	
$scope.saveAddonDetail = function(addonData) {
	$http.post('/saveAddonDetail?cid=' + $routeParams.cid + '&supplier=' + addonData.supplier + '&grossAmount=' + addonData.grossAmount + '&tour=' + addonData.tourName + '&nettAmount=' + addonData.nettAmount + '&from=' + addonData.from + '&to=' + addonData.to + '&comments=' + addonData.comments + '&status=' + addonData.status).success(function (data) {	
	//change front end later
	addAddonTPL.hide();
	$scope.addonData = {};
	$scope.addonData.status = 'inactive';
	$scope.addonTableNodata = false;
		
							var newAddon = {
								addon_supplier: addonData.supplier,
								addon_gross_amount: addonData.grossAmount,
								addon_tour_name: addonData.tourName,
								addon_nett_amount: addonData.nettAmount,
								addon_from: addonData.from,
								addon_to: addonData.to,
								addon_comments: addonData.comments,
								addon_status: addonData.status
							};
							$scope.addonList.push(newAddon);
	});
}

$scope.hideAddonTPL = function() {
	addAddonTPL.hide();
	$scope.addonData = {};
	$scope.addonData.status = 'inactive';
};
	
function getAddonList() { 
		$http.get('/getAddonList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.addonList = data;
			if(data.length == 0)
				{
					$scope.addonTableNodata = true;
				}
	});
};

//charity
$scope.charityData = {};
$scope.charityData.status = 'inactive';
	
$scope.saveCharityDetail = function(charityData) {
	$http.post('/saveCharityDetail?cid=' + $routeParams.cid + '&foundation=' + charityData.foundation + '&amount=' + charityData.amount + '&comments=' + charityData.comments + '&status=' + charityData.status).success(function (data) {	
	//change front end later
	addCharityTPL.hide();
	$scope.charityData = {};
	$scope.charityData.status = 'inactive';
	$scope.charityTableNodata = false;
							var newCharity = {
								charity_global_foundation: charityData.foundation,
								charity_amount: charityData.amount,
								charity_comments: charityData.comments,
								charity_status: charityData.status
							};
							$scope.charityList.push(newCharity);
	});
}

$scope.hideCharityTPL = function() {
	addCharityTPL.hide();
	$scope.charityData = {};
	$scope.charityData.status = 'inactive';
};
	
function getCharityList() { 
		$http.get('/getCharityList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.charityList = data;
			if (data.length == 0)
				{
					$scope.charityTableNodata = true;
				}
	});
};

//voucher
$scope.voucherData = {};
$scope.voucherData.status = 'inactive';

$scope.saveVoucherDetail = function(voucherData) {
	$http.post('/saveVoucherDetail?cid=' + $routeParams.cid + '&detail=' + voucherData.detail + '&amount=' + voucherData.amount + '&comments=' + voucherData.comments + '&status=' + voucherData.status).success(function (data) {	
	//change front end later
	addVoucherTPL.hide();
	$scope.voucherData = {};
	$scope.voucherData.status = 'inactive';
	$scope.travelVoucherTableNodata = false;
							var newVoucher = {
								travel_credit_voucher: voucherData.detail,
								travel_voucher_amount: voucherData.amount,
								travel_voucher_comments: voucherData.comments,
								travel_voucher_status: voucherData.status
							};
							$scope.voucherList.push(newVoucher);
	});
}

$scope.hideVoucherTPL = function() {
	addVoucherTPL.hide();
	$scope.voucherData = {};
	$scope.voucherData.status = 'inactive';
};
	
function getVoucherList() { 
		$http.get('/getVoucherList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.voucherList = data;
			if (data.length == 0)
				{
					$scope.travelVoucherTableNodata = true;
				}
	});
};

//other charges
$scope.otherChargesData = {};
$scope.otherChargesData.status = 'inactive';
	
$scope.saveOtherChargesDetail = function(otherChargesData) {
	$http.post('/saveOtherChargesDetail?cid=' + $routeParams.cid + '&item=' + $scope.otherChargesItem.selectedOption.name + '&amount=' + otherChargesData.amount + '&comments=' + otherChargesData.comments + '&status=' + otherChargesData.status).success(function (data) {	
	//change front end later
	addOtherChargesTPL.hide();
	$scope.otherChargesData = {};
	$scope.otherChargesData.status = 'inactive';
	$scope.otherChargesTableNodata = false;
		
							var newOtherCharge = {
								other_charges_item: $scope.otherChargesItem.selectedOption.name,
								other_charges_amount: otherChargesData.amount,
								other_charges_comments: otherChargesData.comments,
								other_charges_status: otherChargesData.status
							};
							$scope.otherChargesList.push(newOtherCharge);
	});
}	

$scope.hideOtherChargesTPL = function() {
	addOtherChargesTPL.hide();
	$scope.otherChargesData = {};
	$scope.otherChargesData.status = 'inactive';
};

function getOtherChargesList() { 
		$http.get('/getOtherChargesList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.otherChargesList = data;
			if (data.length == 0)
				{
					$scope.otherChargesTableNodata = true;
				}
	});
};

//edit flight
	var editFlightTPL = $aside({
        scope: $scope,
        template: '../bookings/editFlightTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editFlight = function(f) {
	editFlightTPL.show();
	$scope.f = f;
	$scope.f.flight_quoted_airfare_amount = parseInt(f.flight_quoted_airfare_amount);
	$scope.f.flight_taxes_amount = parseInt(f.flight_taxes_amount);
	$scope.flightairline.selectedOption.id = f.flight_airline;
	$scope.flightairline.selectedOption.name = f.flight_airline;
	$scope.flightclass.selectedOption.id = f.flight_booking_class;
	$scope.flightclass.selectedOption.name = f.flight_booking_class;
};

$scope.updateFlightDetail = function(f) {
		$http.post('/editFlightDetail?fid=' + f.flight_id + '&flightdate=' + f.flight_tentative_departure_date + '&flightairline=' + $scope.flightairline.selectedOption.name + '&flightclass=' + $scope.flightclass.selectedOption.name + '&flightQuotedAmount=' + f.flight_quoted_airfare_amount + '&flightTaxAmount=' + f.flight_taxes_amount + '&flightDepartureCity=' + f.flight_departure_city + '&flightArrivalCity=' + f.flight_arrival_city + '&flightRTN=' + f.flight_rtnow + '&flightStatus=' + f.flight_status + '&flightComments=' + f.flight_comments).success(function (data) {	
	//change front end later
	editFlightTPL.hide();
	getFlightsList();
		});
};

$scope.hideEditFlightTPL = function() {
	editFlightTPL.hide();
	getFlightsList();	
};

//edit insurance
	var editInsuranceTPL = $aside({
        scope: $scope,
        template: '../bookings/editInsuranceTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });	

$scope.editInsurance = function(i) {
	editInsuranceTPL.show();
	$scope.i = i;
	$scope.i.insurance_amount = parseInt(i.insurance_amount);
	$scope.insuranceCompany.selectedOption.id = i.insurance_company;
	$scope.insuranceCompany.selectedOption.name = i.surance_company;	
	$scope.insurancePlan.selectedOption.id = i.insurance_plan;
	$scope.insurancePlan.selectedOption.name = i.insurance_plan;
};

$scope.updateInsuranceDetail = function(i) {
		$http.post('/updateInsuranceDetail?insuranceid=' + i.insurance_id + '&company=' + $scope.insuranceCompany.selectedOption.name + '&from=' + i.insurance_from + '&to=' + i.insurance_to + '&plan=' + $scope.insurancePlan.selectedOption.name + '&excess=' + i.insurance_excess + '&amount=' + i.insurance_amount + '&comments=' + i.insurance_comments + '&status=' + i.insurance_status).success(function (data) {	
	//change front end later
	editInsuranceTPL.hide();
 	getInsuranceList();
	});
};

$scope.hideEditInsuranceTPL = function() {
	editInsuranceTPL.hide();
	getInsuranceList();	
};
	
//edit accommodation
	var editAccommodationTPL = $aside({
        scope: $scope,
        template: '../bookings/editAccommodationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editAccommodation = function(a) {
	editAccommodationTPL.show();
	$scope.a = a;
	$scope.a.accommodation_amount = parseInt(a.accommodation_amount);
};
		
$scope.hideEditAccommodationTPL = function() {
	editAccommodationTPL.hide();
	getAccommodationList();
};	

$scope.updateAccommodationDetail = function(a) {
		$http.post('/updateAccommodationDetail?accommodationid=' + a.accommodation_id + '&from=' + a.accommodation_from + '&to=' + a.accommodation_to + '&transfer=' + a.accommodation_transfer + '&comments=' + a.accommodation_comments + '&detail=' + a.additional_accommodation + '&amount=' + a.accommodation_amount + '&status=' + a.accommodation_status).success(function (data) {	
	//change front end later
	editAccommodationTPL.hide();
	getAccommodationList();
	});
};

//edit transfer
	var editTransferTPL = $aside({
        scope: $scope,
        template: '../bookings/editTransferTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editTransfer = function(t) {
	editTransferTPL.show();
	$scope.tEdit = t;
	$scope.tEdit.transfer_amount = parseInt(t.transfer_amount);
};

$scope.hideEditTransferTPL = function() {
	editTransferTPL.hide();
	getTransferList();
};	
	
$scope.updateTransferDetail = function(tEdit) {
		$http.post('/updateTransferDetail?transferid=' + tEdit.transfer_id + '&detail=' + tEdit.additional_transfer + '&amount=' + tEdit.transfer_amount + '&from=' + tEdit.transfer_from + '&to=' + tEdit.transfer_to + '&returnow=' + tEdit.transfer_returnow + '&comments=' + tEdit.transfer_comments + '&status=' + tEdit.transfer_status).success(function (data) {	
	//change front end later
	editTransferTPL.hide();
	getTransferList();
	});
};	
	
//edit addon	
	var editAddonTPL = $aside({
        scope: $scope,
        template: '../bookings/editAddonTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editAddon = function(a) {
	editAddonTPL.show();
	$scope.aEdit = a;
	$scope.aEdit.addon_gross_amount = parseInt(a.addon_gross_amount);
	$scope.aEdit.addon_nett_amount = parseInt(a.addon_nett_amount);
};

$scope.hideEditAddonTPL = function() {
	editAddonTPL.hide();
	getAddonList();
};	

	
$scope.updateAddonDetail = function(aEdit) {
		$http.post('/updateAddonDetail?addonid=' + aEdit.addon_id + '&supplier=' + aEdit.addon_supplier + '&grossamount=' + aEdit.addon_gross_amount + '&tour=' + aEdit.addon_tour_name + '&nettamount=' + aEdit.addon_nett_amount + '&from=' + aEdit.addon_from + '&to=' + aEdit.addon_to + '&comments=' + aEdit.addon_comments + '&status=' + aEdit.addon_status).success(function (data) {	
	//change front end later
	editAddonTPL.hide();
	getAddonList();
	});
};

	
//edit charity
	var editCharityTPL = $aside({
        scope: $scope,
        template: '../bookings/editCharityTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editCharity = function(c) {
	editCharityTPL.show();
	$scope.cEdit = c;
	$scope.cEdit.charity_amount = parseInt(c.charity_amount);
};
	
$scope.hideEditCharityTPL = function() {
	editCharityTPL.hide();
	getCharityList();
};
	
$scope.updateCharityDetail = function(cEdit) {
		$http.post('/updateCharityDetail?charityid=' + cEdit.charity_id + '&foundation=' + cEdit.charity_global_foundation + '&amount=' + cEdit.charity_amount + '&comments=' + cEdit.charity_comments + '&status=' + cEdit.charity_status).success(function (data) {	
	//change front end later
	editCharityTPL.hide();
	getCharityList();
	});
};	
	
//edit voucher
	var editVoucherTPL = $aside({
        scope: $scope,
        template: '../bookings/editVoucherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editVoucher = function(v) {
	editVoucherTPL.show();
	$scope.vEdit = v;
	$scope.vEdit.travel_voucher_amount = parseInt(v.travel_voucher_amount);
};	
	
$scope.hideEditVoucherTPL = function() {
	editVoucherTPL.hide();
	getVoucherList();
};
	
$scope.updateVoucherDetail = function(vEdit) {
		$http.post('/updateVoucherDetail?voucherid=' + vEdit.travel_voucher_id + '&detail=' + vEdit.travel_credit_voucher + '&amount=' + vEdit.travel_voucher_amount + '&comments=' + vEdit.travel_voucher_comments + '&status=' + vEdit.travel_voucher_status).success(function (data) {	
	//change front end later
	editVoucherTPL.hide();
	getVoucherList();
	});
};
	
//edit other charges
	var editOtherTPL = $aside({
        scope: $scope,
        template: '../bookings/editOtherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editOther = function(oo) {
	editOtherTPL.show();
	$scope.ooEdit = oo;
	$scope.ooEdit.other_charges_amount = parseInt(oo.other_charges_amount);	
	$scope.otherChargesItem.selectedOption.name = oo.other_charges_item;
	$scope.otherChargesItem.selectedOption.id = oo.other_charges_item; 	
};		

$scope.hideEditOtherChargesTPL = function() {
	editOtherTPL.hide();
	getOtherChargesList();
};
	

$scope.updateOtherChargesDetail = function(ooEdit) {
		$http.post('/updateOtherChargesDetail?otherchargesid=' + ooEdit.other_charges_id + '&item=' + $scope.otherChargesItem.selectedOption.name + '&amount=' + ooEdit.other_charges_amount + '&comments=' + ooEdit.other_charges_comments + '&status=' + ooEdit.other_charges_status).success(function (data) {	
	//change front end later
	editOtherTPL.hide();
	getOtherChargesList();
	});
};	

	//trip section - find, edit, add trip details in trip table
	$scope.tripExperienceList = {
        availableOptions: [
            {
                id: 'Working Holiday',
                name: 'Working Holiday'
            },
            {
                id: 'Volunteer',
                name: 'Volunteer'
            },
            {
                id: 'Au Pair',
                name: 'Au Pair'
            },
			{
                id: 'Teach',
                name: 'Teach'
            },
			{
                id: 'Internship',
                name: 'Internship'
            }
    ],
        selectedOption: {
            id: 'Working Holiday',
            name: 'Working Holiday'
        }
    };
	
	
	$scope.tripExperience = {
        availableOptions: [
            {
                id: 'Working Holiday',
                name: 'Working Holiday'
            },
            {
                id: 'Volunteer',
                name: 'Volunteer'
            },
            {
                id: 'Au Pair',
                name: 'Au Pair'
            },
			{
                id: 'Teach',
                name: 'Teach'
            },
			{
                id: 'Internship',
                name: 'Internship'
            }
    ],
        selectedOption: {
            id: 'Working Holiday',
            name: 'Working Holiday'
        }
    };
	
	
	$scope.tripStatusList = {
        availableOptions: [
            {
                id: 'Pending',
                name: 'Pending'
            },
            {
                id: 'New File',
                name: 'New File'
            },
            {
                id: 'In Progress',
                name: 'In Progress'
            },
			{
                id: 'On Hold',
                name: 'On Hold'
            },
			{
                id: 'Cancelled',
                name: 'Cancelled'
            },
			{
                id: 'Refunded',
                name: 'Refunded'
            },
			{
                id: 'Legal',
                name: 'Legal'
            },
			{
                id: 'Departed',
                name: 'Departed'
            },
			{
                id: 'Rejected',
                name: 'Rejected'
            }
    ],
        selectedOption: {
            id: 'Pending',
            name: 'Pending'
        }
    };
	
    findtrip();
    function findtrip() {
        $http.get('/findtrip?cid=' + $routeParams.cid).success(function (data) {
                    //console.log(data10);
                    $scope.tripList = data;
			if (data.length == 0)
				{
					$scope.tripTableNodata = true;
				}
             });
   	};
	
	$scope.addNewTrip = function() {
		
		addNewTripTPL.show();
	};
	
	$scope.saveNewTrip = function(tripDestination, tripCode, tripDuration, tripPrice) {
			$http.post('/saveNewTrip?tripDestination=' + tripDestination + '&tripCode=' + tripCode + '&tripDuration=' + tripDuration + '&tripPrice=' + tripPrice + '&cid=' + $routeParams.cid + '&tripExperienceName=' + $scope.tripExperienceList.selectedOption.id + '&tripStatus=' + $scope.tripStatusList.selectedOption.id).success(function (data) {	

			addNewTripTPL.hide();
			findtrip();
			$scope.tripTableNodata = false;
		 });
		
	};
	
	$scope.editTrip = function(tl) {
		
		editTripTPL.show();
		$scope.tl = tl;
		$scope.tripExperience.selectedOption.id = $scope.tl.trip_experience_name;
		$scope.tripExperience.selectedOption.name = $scope.tl.trip_experience_name;
		$scope.tripStatusList.selectedOption.id = $scope.tl.trip_status;
		$scope.tripStatusList.selectedOption.name = $scope.tl.trip_status;
	};
	
	$scope.updateTripDetail = function(tl) {
		
		console.log('test tl here', tl);
		$http.post('/updateTripDetail?tripDestination=' + tl.trip_destination + '&tripCode=' + tl.trip_code + '&tripDuration=' + tl.trip_duration + '&tripPrice=' + tl.trip_price + '&tid=' + tl.trip_id + '&tripExperienceName=' + $scope.tripExperience.selectedOption.id + '&tripStatus=' + $scope.tripStatusList.selectedOption.id).success(function (data) 			
		{	

			editTripTPL.hide();
			findtrip();
		 });	
	
		
	};
		
	$scope.hideEditTripDetailTPL = function() {
			editTripTPL.hide();
			findtrip();
	};		
		
	
	$scope.openTravelProfile = function() {
		 $window.open('http://globalworkandtravel.com/travel', '_blank');
	};
	
//upload files
	var uploadFilesTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/uploadFilesTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	$scope.fileTypeList = {
        availableOptions: [
            {
                id: 'resume',
                name: 'Resume'
            },
            {
                id: 'profile',
                name: 'Profile'
            }
    ],
        selectedOption: {
            id: 'resume',
            name: 'Resume'
        }
    };
	$scope.openToUpload = function() {
		 uploadFilesTPL.show();
	};
	
	$scope.uploadfileButton = function(files) {
		console.log('uploading starting..', files);
	 	if (files) { 
			console.log('there is file');
			
			$scope.upload(files);
		}
	};
	
	$scope.upload = function (file) {
		var paremeter = $routeParams.cid + ' ' + $scope.fileTypeList.selectedOption.id;
            Upload.upload({
                url: '/uploadProfileFile?parameter=' + paremeter, 
				method: 'POST',
                data:{file:file} 
            }).then(function (resp) { 
                if(resp.data.error_code === 0){ //validate success
                    console.log(resp.data.filename);
					saveFileurl(resp.data.filename);
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
	
	function saveFileurl(filename) { 
		$http.post('/saveFileurl?filename=' + filename + '&cid=' + $routeParams.cid + '&attachedBy=' + $rootScope.name).success(function (data) {	
			console.log(data);
			uploadFilesTPL.hide();
			findFileRecords();
	});
};
	

    function findFileRecords() {
        $http.get('/findFileRecords?cid=' + $routeParams.cid).success(function (data) {
			
			$scope.fileRecords = data;
		});
    };
	
	
	$scope.createPlacementPDF = function () {
		$http.get('/createPlacementPDF?cid=' + $routeParams.cid + '&fname=' + $scope.profile.first_name + '&mname=' + $scope.profile.middle_name + '&lname=' + $scope.profile.last_name + '&gender=' + $scope.profile.gender + '&dob=' + $scope.profile.dob + '&nationality=' + $scope.profile.nationality + '&tripName=' + $scope.profile.trip_experience_name + '&tripLocation=' + $scope.profile.trip_destination + '&tripCode=' + $scope.profile.trip_code + '&tripStartDate=' + $scope.profile.date_departure + '&phone=' + $scope.profile.prefferd_contact_no + '&email=' + $scope.profile.email + '&address=' + $scope.profile.address + '&suburb=' + $scope.profile.suburb + '&state=' + $scope.profile.state + '&country=' + $scope.profile.country + '&postCode=' + $scope.profile.post_code + '&emergencyName=' + $scope.profile.emrg_contact_name + '&emergencyRelationship=' + $scope.profile.emrg_contact_relation + '&emergencyEmail=' + $scope.profile.emrg_contact_email + '&emergencyPhone=' + $scope.profile.emrg_contact_number + '&healthCondition=' + $scope.profile.health_conditions + '&healthConditionDescribe=' + $scope.profile.health_conditions_describe + '&dietary=' + $scope.profile.dietary + '&dietaryDescribe=' + $scope.profile.dietary_describe).success(function (data) {
              
			 console.log(data);  
             $scope.pfurl = data;
                 
        function downloadPlaceformpdf () {
            var s = $rootScope.remoteURL + '/' + $scope.pfurl;
            $window.open(s, '_blank');
        }

        $timeout(downloadPlaceformpdf, 7000); 
			
	  	});
	
	};
	
}]);
