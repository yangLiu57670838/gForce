app.controller('resumeformCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$attrs', 'Upload','$window', '$timeout','$rootScope', '$aside', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $attrs, Upload, $window, $timeout, $rootScope, $aside) {
    //console.log("welcome", $routeParams.cid);
// $scope.btnId = 'fname'; 
    
$scope.showSpinner = false;
    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator') || ($scope.staffRole == 'arrivals')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


    $scope.id = $routeParams.id;
	$scope.changingFieldArray = [];
	$scope.changingFinalData = [];
	
	var editingResumeButtonsTPL = $aside({
        scope: $scope,
        template: '../coordination/editingResumeButtonsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });

    findform();
    function findform() {
        $http.get('/findform?rid=' + $routeParams.id).success(function (data) {

            console.log(data[0]);
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
				$http.post('/updateAction?rid=' + $routeParams.id + '&action=' + $scope.action).success(function (returnDate) {
                        console.log('action status updated'); 
						$scope.form.modified_date = 'just now';
                      });
				
            };		
			
	//*************** new functions start from here ********************
			
			$scope.viewContact = {
                editableValue1: $scope.form.fname,
                editableValue2: $scope.form.mname,
				editableValue3: $scope.form.lname,
				editableValue4: $scope.form.email,
				editableValue5: $scope.form.phoneno,
				editableValue6: $scope.form.skype,
				id1: 'fname',
				id2: 'mname',
				id3: 'lname',
				id4: 'email',
				id5: 'phoneno',
				id6: 'skype'
            };

			$scope.viewIntro = {
                editableValue: $scope.form.introduce,
                id: 'introduce'
            };
			
			$scope.viewObjective = {
                editableValue: $scope.form.objective,
                id: 'objective'
            };
			
			$scope.viewSkills = {
                editableValue: $scope.form.skill1,
                id: 'skill1'
            };
			
			$scope.viewEducation = {
                editableValue1: $scope.form.title1,
                editableValue2: $scope.form.institution1,
				editableValue3: $scope.form.educationfrom1,
				editableValue4: $scope.form.educationto1,
				editableValue5: $scope.form.title2,
				editableValue6: $scope.form.institution2,
				editableValue7: $scope.form.educationfrom2,
				editableValue8: $scope.form.educationto2,
				editableValue9: $scope.form.title3,
				editableValue10: $scope.form.institution3,
				editableValue11: $scope.form.educationfrom3,
				editableValue12: $scope.form.educationto3,
				id1: 'title1',
				id2: 'institution1',
				id3: 'educationfrom1',
				id4: 'educationto1',
				id5: 'title2',
				id6: 'institution2',
				id7: 'educationfrom2',
				id8: 'educationto2',
				id9: 'title3',
				id10: 'institution3',
				id11: 'educationfrom3',
				id12: 'educationto3'
            };			

            $scope.viewCertificates = {
                editableValue: $scope.form.certificate,
                id: 'certificate'
            };
			
			$scope.viewLicenses = {
                editableValue: $scope.form.license,
                id: 'license'
            };

			$scope.viewEmployment = {
                editableValue1: $scope.form.jtitle1,
                editableValue2: $scope.form.cname1,
				editableValue3: $scope.form.cwebsite1,
				editableValue4: $scope.form.jfrom1,
				editableValue5: $scope.form.jto1,
				editableValue6: $scope.form.duty1,//
				editableValue7: $scope.form.jtitle2,
                editableValue8: $scope.form.cname2,
				editableValue9: $scope.form.cwebsite2,
				editableValue10: $scope.form.jfrom2,
				editableValue11: $scope.form.jto2,
				editableValue12: $scope.form.duty2,//
				editableValue13: $scope.form.jtitle3,
                editableValue14: $scope.form.cname3,
				editableValue15: $scope.form.cwebsite3,
				editableValue16: $scope.form.jfrom3,
				editableValue17: $scope.form.jto3,
				editableValue18: $scope.form.duty3,//
				editableValue19: $scope.form.jtitle4,
                editableValue20: $scope.form.cname4,
				editableValue21: $scope.form.cwebsite4,
				editableValue22: $scope.form.jfrom4,
				editableValue23: $scope.form.jto4,
				editableValue24: $scope.form.duty4,//
				editableValue25: $scope.form.jtitle5,
                editableValue26: $scope.form.cname5,
				editableValue27: $scope.form.cwebsite5,
				editableValue28: $scope.form.jfrom5,
				editableValue29: $scope.form.jto5,
				editableValue30: $scope.form.duty5,
				id1: 'jtitle1',
				id2: 'cname1',
				id3: 'cwebsite1',
				id4: 'jfrom1',
				id5: 'jto1',
				id6: 'duty1',//
				id7: 'jtitle2',
				id8: 'cname2',
				id9: 'cwebsite2',
				id10: 'jfrom2',
				id11: 'jto2',
				id12: 'duty2',//
				id13: 'jtitle3',
				id14: 'cname3',
				id15: 'cwebsite3',
				id16: 'jfrom3',
				id17: 'jto3',
				id18: 'duty3',//
				id19: 'jtitle4',
				id20: 'cname4',
				id21: 'cwebsite4',
				id22: 'jfrom4',
				id23: 'jto4',
				id24: 'duty4',//
				id25: 'jtitle5',
				id26: 'cname5',
				id27: 'cwebsite5',
				id28: 'jfrom5',
				id29: 'jto5',
				id30: 'duty5'
            };
			

			
			
			
			$scope.enableEditorButtons = function(field) {
				
				if($scope.changingFieldArray.indexOf(field) === -1)
					{		
						$scope.changingFieldArray.push(field);
					}
                editingResumeButtonsTPL.show();
				console.log($scope.changingFieldArray);
            };	
			
			
			$scope.cancelResumeChange = function() {
                editingResumeButtonsTPL.hide();
				console.log('cancel profile changes');
							
				$scope.viewContact.editableValue1 = $scope.form.fname;
				$scope.viewContact.editableValue2 = $scope.form.mname;
				$scope.viewContact.editableValue3 = $scope.form.lname;
				$scope.viewContact.editableValue4 = $scope.form.email;
				$scope.viewContact.editableValue5 = $scope.form.phoneno;
				$scope.viewContact.editableValue6 = $scope.form.skype;
				
				$scope.viewIntro.editableValue = $scope.form.introduce;
				
				$scope.viewObjective.editableValue = $scope.form.objective;
				
				$scope.viewSkills.editableValue = $scope.form.skill1;
				
				$scope.viewEducation.editableValue1 = $scope.form.title1;
				$scope.viewEducation.editableValue2 = $scope.form.institution1;
				$scope.viewEducation.editableValue3 = $scope.form.educationfrom1;
				$scope.viewEducation.editableValue4 = $scope.form.educationto1;
				$scope.viewEducation.editableValue5 = $scope.form.title2;
				$scope.viewEducation.editableValue6 = $scope.form.institution2;
				$scope.viewEducation.editableValue7 = $scope.form.educationfrom2;
				$scope.viewEducation.editableValue8 = $scope.form.educationto2;
				$scope.viewEducation.editableValue9 = $scope.form.title3;
				$scope.viewEducation.editableValue10 = $scope.form.institution3;
				$scope.viewEducation.editableValue11 = $scope.form.educationfrom3;
				$scope.viewEducation.editableValue12 = $scope.form.educationto3;
				
				$scope.viewCertificates.editableValue = $scope.form.certificate;
				
				$scope.viewLicenses.editableValue = $scope.form.license;
				
				$scope.viewEmployment.editableValue1 = $scope.form.jtitle1;
				$scope.viewEmployment.editableValue2 = $scope.form.cname1;
				$scope.viewEmployment.editableValue3 = $scope.form.cwebsite1;
				$scope.viewEmployment.editableValue4 = $scope.form.jfrom1;
				$scope.viewEmployment.editableValue5 = $scope.form.jto1;
				$scope.viewEmployment.editableValue6 = $scope.form.duty1;
				$scope.viewEmployment.editableValue7 = $scope.form.jtitle2;
				$scope.viewEmployment.editableValue8 = $scope.form.cname2;
				$scope.viewEmployment.editableValue9 = $scope.form.cwebsite2;
				$scope.viewEmployment.editableValue10 = $scope.form.jfrom2;
				$scope.viewEmployment.editableValue11 = $scope.form.jto2;
				$scope.viewEmployment.editableValue12 = $scope.form.duty2;	
				$scope.viewEmployment.editableValue13 = $scope.form.jtitle3;
				$scope.viewEmployment.editableValue14 = $scope.form.cname3;
				$scope.viewEmployment.editableValue15 = $scope.form.cwebsite3;
				$scope.viewEmployment.editableValue16 = $scope.form.jfrom3;
				$scope.viewEmployment.editableValue17 = $scope.form.jto3;
				$scope.viewEmployment.editableValue18 = $scope.form.duty3;
				$scope.viewEmployment.editableValue19 = $scope.form.jtitle4;
				$scope.viewEmployment.editableValue20 = $scope.form.cname4;
				$scope.viewEmployment.editableValue21 = $scope.form.cwebsite4;
				$scope.viewEmployment.editableValue22 = $scope.form.jfrom4;
				$scope.viewEmployment.editableValue23 = $scope.form.jto4;
				$scope.viewEmployment.editableValue24 = $scope.form.duty4;
				$scope.viewEmployment.editableValue25 = $scope.form.jtitle5;
				$scope.viewEmployment.editableValue26 = $scope.form.cname5;
				$scope.viewEmployment.editableValue27 = $scope.form.cwebsite5;
				$scope.viewEmployment.editableValue28 = $scope.form.jfrom5;
				$scope.viewEmployment.editableValue29 = $scope.form.jto5;
				$scope.viewEmployment.editableValue30 = $scope.form.duty5;
					
				$scope.changingFieldArray = [];
				$scope.changingFinalData = [];
  
            };
			
			
			$scope.saveResumeChange = function() {
                $scope.showSpinner = true;
				console.log('saving resume changes starting..');
				$scope.saveContact();
				$scope.saveIntro();
				$scope.saveObjective();
				$scope.saveSkills();
				$scope.saveEducation();
				$scope.saveCertificates();
				$scope.saveLicenses();
				$scope.saveEmployment();
						
				console.log($scope.changingFieldArray);
				
				for (var i=0; i<$scope.changingFieldArray.length; i++)
					{
						var one = {};
						one.field = $scope.changingFieldArray[i];
						one.value = $scope.form[one.field];
                        
                        console.log('original value', one.value);
                        one.value = one.value.replace(/&/g, "specialCharacter");//?  
                        one.value = one.value.replace(/%/g, "htmlemtity2");//?
                        one.value = one.value.replace(/#/g, "htmlemtity3");//?
                        
//                        one.value = one.value.replace(/"/g, "");//?
                        
                        console.log('new value', one.value);
       
						one.rid = $routeParams.id;
						$scope.changingFinalData.push(one);
						
					}
				console.log('final object', $scope.changingFinalData);
			
				var changingFinalDataJSON = JSON.stringify($scope.changingFinalData); 
                console.log('json is ', changingFinalDataJSON);
//                //skip some symbols here
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&amp;/g, "12345");//&
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&#34;/g, "123456");//"
//    changingFinalDataJSON = changingFinalDataJSON.replace(/%/g, "1234567");//%
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&lt;/g, "12345678");//<
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&gt;/g, "123456789");//>   
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&#13;/g, "htmlsymboltab");//tab symbol

                
                
                
//        $http({
//          method  : 'POST',
//          url     : '/updateResumeChangedData',
//          data    : changingFinalDataJSON, //??
//          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
//         })
//          .success(function(data) {
//            if (data.errors) {
//              // Showing errors.
//             
//            } else {
//             
//            }
//          });
                
				$http.post('/updateResumeChangedData?changingFinalDataJSON=' + changingFinalDataJSON).success(function (datar) {
                    console.log(datar);	
                    $rootScope.startAlert('success', 'Success', 'Updated Successfully!');
					editingResumeButtonsTPL.hide();
					$scope.changingFieldArray = [];
					$scope.changingFinalData = [];
					$scope.showSpinner = false;
					
					
                      });
				
            };

					
			$scope.saveContact = function() {
                $scope.form.fname = $scope.viewContact.editableValue1;
                $scope.form.mname = $scope.viewContact.editableValue2;
                $scope.form.lname = $scope.viewContact.editableValue3;
                $scope.form.email = $scope.viewContact.editableValue4;
                $scope.form.phoneno = $scope.viewContact.editableValue5;
                $scope.form.skype = $scope.viewContact.editableValue6;
            };
			
			$scope.saveIntro = function() {
                $scope.form.introduce = $scope.viewIntro.editableValue;
            };
			
			$scope.saveObjective = function() {
                $scope.form.objective = $scope.viewObjective.editableValue;
            };
			
			$scope.saveSkills = function() {
                $scope.form.skill1 = $scope.viewSkills.editableValue;
            };
			
			$scope.saveEducation = function() {
                $scope.form.title1 = $scope.viewEducation.editableValue1;
                $scope.form.institution1 = $scope.viewEducation.editableValue2;
                $scope.form.educationfrom1 = $scope.viewEducation.editableValue3;
                $scope.form.educationto1 = $scope.viewEducation.editableValue4;
                $scope.form.title2 = $scope.viewEducation.editableValue5;
                $scope.form.institution2 = $scope.viewEducation.editableValue6;
                $scope.form.educationfrom2 = $scope.viewEducation.editableValue7;
                $scope.form.educationto2 = $scope.viewEducation.editableValue8;
                $scope.form.title3 = $scope.viewEducation.editableValue9;
                $scope.form.institution3 = $scope.viewEducation.editableValue10;
                $scope.form.educationfrom3 = $scope.viewEducation.editableValue11;
                $scope.form.educationto3 = $scope.viewEducation.editableValue12;
            };
			
			$scope.saveCertificates = function() {
                $scope.form.certificate = $scope.viewCertificates.editableValue;
            };
			
			$scope.saveLicenses = function() {
                $scope.form.license = $scope.viewLicenses.editableValue;
            };
			
			$scope.saveEmployment = function() {
                $scope.form.jtitle1 = $scope.viewEmployment.editableValue1;
                $scope.form.cname1 = $scope.viewEmployment.editableValue2;
                $scope.form.cwebsite1 = $scope.viewEmployment.editableValue3;
                $scope.form.jfrom1 = $scope.viewEmployment.editableValue4;
                $scope.form.jto1 = $scope.viewEmployment.editableValue5;
                $scope.form.duty1 = $scope.viewEmployment.editableValue6;
				
                $scope.form.jtitle2 = $scope.viewEmployment.editableValue7;
                $scope.form.cname2 = $scope.viewEmployment.editableValue8;
                $scope.form.cwebsite2 = $scope.viewEmployment.editableValue9;
                $scope.form.jfrom2 = $scope.viewEmployment.editableValue10;
                $scope.form.jto2 = $scope.viewEmployment.editableValue11;
                $scope.form.duty2 = $scope.viewEmployment.editableValue12;
				
				$scope.form.jtitle3 = $scope.viewEmployment.editableValue13;
				$scope.form.cname3 = $scope.viewEmployment.editableValue14;
				$scope.form.cwebsite3 = $scope.viewEmployment.editableValue15;
				$scope.form.jfrom3 = $scope.viewEmployment.editableValue16;
				$scope.form.jto3 = $scope.viewEmployment.editableValue17;
				$scope.form.duty3 = $scope.viewEmployment.editableValue18;
				
				$scope.form.jtitle4 = $scope.viewEmployment.editableValue19;
				$scope.form.cname4 = $scope.viewEmployment.editableValue20;
				$scope.form.cwebsite4 = $scope.viewEmployment.editableValue21;
				$scope.form.jfrom4 = $scope.viewEmployment.editableValue22;
				$scope.form.jto4 = $scope.viewEmployment.editableValue23;
				$scope.form.duty4 = $scope.viewEmployment.editableValue24;
				
				$scope.form.jtitle5 = $scope.viewEmployment.editableValue25;
				$scope.form.cname5 = $scope.viewEmployment.editableValue26;
				$scope.form.cwebsite5 = $scope.viewEmployment.editableValue27;
				$scope.form.jfrom5 = $scope.viewEmployment.editableValue28;
				$scope.form.jto5 = $scope.viewEmployment.editableValue29;
				$scope.form.duty5 = $scope.viewEmployment.editableValue30;
            };

//*************** new functions end here ********************
       
            
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
                    
                    $http.post('/savefilename?fn=' + resp.data.filename + '&rid=' + $routeParams.id).success(function (data) {
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

			
			
             //cancel education
            
            if((!$scope.form.title2) && (!$scope.form.institution2) && (!$scope.form.educationfrom2) && (!$scope.form.educationto2))
                {
					$scope.cancelalleducation2 = function() {
						$scope.hideEducation2 = true;
					};
                }
            
            if((!$scope.form.title3) && (!$scope.form.institution3) && (!$scope.form.educationfrom3) && (!$scope.form.educationto3))
                {
                    $scope.cancelalleducation3 = function() {
						$scope.hideEducation3 = true;
					};
                }
			
            //cancel employment

            if ((!$scope.form.jtitle2) && (!$scope.form.cname2) && (!$scope.form.cwebsite2) && (!$scope.form.jfrom2) && (!$scope.form.jto2) && (!$scope.form.duty2))
                {
                    $scope.cancelallemployment2 = function() {
                            $scope.hideEmployment2 = true;
                        };
                }
            
			
			if ((!$scope.form.jtitle3) && (!$scope.form.cname3) && (!$scope.form.cwebsite3) && (!$scope.form.jfrom3) && (!$scope.form.jto3) && (!$scope.form.duty3))
                {
                    $scope.cancelallemployment3 = function() {
                            $scope.hideEmployment3 = true;
                        };
                }
			
            
			if ((!$scope.form.jtitle4) && (!$scope.form.cname4) && (!$scope.form.cwebsite4) && (!$scope.form.jfrom4) && (!$scope.form.jto4) && (!$scope.form.duty4))
                {
                    $scope.cancelallemployment4 = function() {
                            $scope.hideEmployment4 = true;
                        };
                }
            
                        
			if ((!$scope.form.jtitle5) && (!$scope.form.cname5) && (!$scope.form.cwebsite5) && (!$scope.form.jfrom5) && (!$scope.form.jto5) && (!$scope.form.duty5))
                {
                     $scope.cancelallemployment5 = function() {
                            $scope.hideEmployment5 = true;
                        };
                }

            
            //education2
            if((data[0].title2) || (data[0].institution2) || (data[0].educationfrom2) || (data[0].educationto2))
                {
                    $scope.hideEducation2 = false;
					$scope.hideEC2 = true;
                }
            else
                {
                    $scope.hideEducation2 = true;
					$scope.hideEC2 = false;
                }
            

            
            //education3
            if((data[0].title3) || (data[0].institution3) || (data[0].educationfrom3) || (data[0].educationto3))
                {
                    $scope.hideEducation3 = false;
					$scope.hideEC3 = true;
                }
            else
                {
                    $scope.hideEducation3 = true;
					$scope.hideEC3 = false;
                }
            

            
           //employment2
            if((data[0].jtitle2) || (data[0].cname2) || (data[0].cwebsite2) || (data[0].jfrom2) || (data[0].jto2) || (data[0].duty2))
                {
                    $scope.hideEmployment2 = false;
					$scope.hideEPC2 = true;
                }
            else
                {
                    $scope.hideEmployment2 = true; 
					$scope.hideEPC2 = false;
                }
            

            
            //employment3
            if((data[0].jtitle3) || (data[0].cname3) || (data[0].cwebsite3) || (data[0].jfrom3) || (data[0].jto3) || (data[0].duty3))
                {
                    $scope.hideEmployment3 = false;
					$scope.hideEPC3 = true;
                }
            else
                {
                    $scope.hideEmployment3 = true;
					$scope.hideEPC3 = false;
                }
            
            
            //employment4
            if((data[0].jtitle4) || (data[0].cname4) || (data[0].cwebsite4) || (data[0].jfrom4) || (data[0].jto4) || (data[0].duty4))
                {
                    $scope.hideEmployment4 = false;
					$scope.hideEPC4 = true;
                }
            else
                {
                    $scope.hideEmployment4 = true;
					$scope.hideEPC4 = false;
                }

            
            //employment5
            if((data[0].jtitle5) || (data[0].cname5) || (data[0].cwebsite5) || (data[0].jfrom5) || (data[0].jto5) || (data[0].duty5))
                {
                    $scope.hideEmployment5 = false;
					$scope.hideEPC5 = true;
                }
            else
                {
                    $scope.hideEmployment5 = true;
					$scope.hideEPC5 = false;
                }
            

            $scope.addoneEducation = function() {
                if ($scope.hideEducation2 == true)
                    {
                        $scope.hideEducation2 = false;

                        
                    }else if ($scope.hideEducation3 == true)
                        {
                            $scope.hideEducation3 = false;

                        }else
                            {
                                console.log('mate, 3 education is enough here');
                            }
            };
            
			$scope.addoneEmployment = function() {
                if ($scope.hideEmployment2 == true)
                    {
                        $scope.hideEmployment2 = false;
                         
                    }else if ($scope.hideEmployment3 == true)
                        {
                            $scope.hideEmployment3 = false;
                        
                            
                        }else if ($scope.hideEmployment4 == true)
                            {
                                $scope.hideEmployment4 = false;
                                
                            }else if ($scope.hideEmployment5 == true)
                                {
                                    $scope.hideEmployment5 = false;
                                    
                                }
                            
            };

            
            $scope.createpdf = function() {
                         $http.post('/createpdf?rid=' + $routeParams.id + '&url=' + $scope.src).success(function (data) {
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
    
    
//    function update(col, element) { 
//         $http.post('/updatecol?rid=' + $routeParams.id + '&col=' + col + '&element=' + element).success(function (data) {
//			 			$scope.form.modified_date = 'just now';
//                         console.log('data updated');   
//                      });
//     
//     }; 
	
// $scope.location = {
//        state: "California",
//        city: "San Francisco",
//        neighbourhood: "Alamo Square"
//    };
//   
            
 
	
	
	
	
	
//test $interval
//	$interval(updateTime, 50000);//50 second
//	function updateTime() {
//			 $http.get('/testcall').success(function (data) {
//			 			
//                         console.log('data number is:', data.length);   
//                      });
//		
//		 }; 
	
	



}]);
