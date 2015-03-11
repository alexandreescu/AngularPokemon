(function(){
 // THIS JS FILE IS TO HANDLE ALL CONTROLLERS THAT RUN ON THE TEAMS PAGE >>> THERE SHOULD BE NO SHARING OF THESE CONTROLLERS ON OTHER PAGES
 // the first iteration of the teams variable is for testing purposes
 var teams = [{teamname: 'Zephyr', pokes: ['Pikachu', 'Yanma', 'Greninja', 'Dusclops', 'Hoppip', 'Golem']},
              {teamname: 'Blitz', pokes: ['Houndour', 'Nidoran', 'Clefable', 'Turtwig', 'Klefki', 'Rapidash']},
              {teamname: 'Strike', pokes: ['Squirtle', 'Nidoking', 'Crawdaunt', 'Fearow', 'Buizel', 'Tauros']},
              {teamname: 'Agro', pokes: ['Pidgey', 'Rayquaza', 'Onix', 'Machoke', 'Haunter', 'Abra']},
              {teamname: 'Phantom', pokes: ['Krabby', 'Groudon', 'Kyogre', 'Entei', 'Giratina', 'Articuno']},
              {teamname: 'Return', pokes: ['Hoothoot', 'Raikou', 'Suicune', 'Ho-oh', 'Lugia', 'Celebi']},
              {teamname: 'Ferric', pokes: ['Electrike', 'Zapdos', 'Blastoise', 'Bulbasaur', 'Infernape', 'Carbink']},
              {teamname: 'Anthem', pokes: ['Skiploom', 'Diancie', 'Agumon', 'Vileplume', 'Xerneas', 'Zygarde']}];
 //var teams = []; // the teams variable that will be initialized for realsies
 // NOTE: there are 'maxlength' attributes attached to all create/edit inputs, so there should be no worries about retarded styling based on characters
 var team = angular.module('Team', []);
 // THIS CONTROLLER HANDLES CREATING A TEAM [FIRES INTO THE TEAMLISTVIEW CONTROLLER TO UDPATE THE DISPLAY OF TEAMS]
 team.controller('CreateTeam', ['$scope', function($scope){
  $scope.creation = function(){
   this.inputs = document.getElementById("create").getElementsByTagName("input");
   // this amazing chunk of clean and concise code essentially stops from empty fields being submitted
   for(var i = 0; i < this.inputs.length; i++){
    this.inputs[i].entry = document.getElementById("create").getElementsByTagName("input")[i].value; // dynamically creates variables that are each input field
   }
   if(this.inputs[0].entry == ""){
    document.querySelector(".warning").innerHTML = "You need to enter a team name"; //displays primary error if team field is empty
   }
   else{
    if(this.inputs[1].entry == "" || this.inputs[2].entry == "" || this.inputs[3].entry == "" || this.inputs[4].entry == "" || this.inputs[5].entry == "" || this.inputs[6].entry == ""){ //make this better
     document.querySelector(".warning").innerHTML = "You need to fill in all six Pokemon fields"; //secondary error if pokemon fields are empty
    }
    else{
     // the two lines below are pretty not-good but they populate placeholder vars that will be used to create the team object that is unshift() into the array of teams
     var tempname = this.inputs[0].entry;
     var tempteam = [this.inputs[1].entry, this.inputs[2].entry, this.inputs[3].entry, this.inputs[4].entry, this.inputs[5].entry, this.inputs[6].entry]; //make this not so shit
     teams.unshift({teamname: tempname, pokes: tempteam});
     for(var j = 0; j < this.inputs.length; j++){
      document.getElementById("create").getElementsByTagName("input")[j].value = ""; // this resets all fields to empty strings [to allow new form to be made]
     }
     $scope.$emit('update'); // this just fires custom event (this is listened for in the TeamListView controller)
     // NOTE: THIS WORKS FINE HARD-CODED FOR NOW SINCE THERE WILL ONLY BE 7 FIELDS AND THEY MUST ALL BE FILLED TO SUBMIT
     // NOTE: $emit fires upward, $broadcast fires downward (in relation to parent-child node connections)
     document.querySelector(".warning").innerHTML = "You've successfully created a Pokemon team!" // success message once the entire method fires successfully
    }
   }
  }
 }])




 // THIS CONTROLLER HANDLES EDITING A TEAM [FIRES INTO TEAMLISTVIEW CONTROLLER TO UPDATE THE DISPLAY OF TEAMS]
 // NOTE: to fire this controller correctly i've used both ng-change AND ng-model
 //       ng-change will allow the select to see when a change happens (namely which index is selected)
 //       ng-model attaches the ng-change to the controller
 //       EX: console.log($scope.editmodel); would return the name of the option
 //           console.log({select}.selectedIndex); would return the index of the currently selected option
 team.controller('EditTeam', ['$scope', function($scope){ // $scope is to provide event, also links this controller to others at top level
  this.editsets = teams;
  var elem = document.getElementById("editteamslist"), //locates select
      selected = elem ? elem.selectedIndex : 0, // operator that defaults selected option if undefined, courtesy of the LSA
      tempteamname = "", // this and the below variables are placeholder vars
      tempteampokes = [];
  selected = selected === -1 || !selected ? 0 : selected;
  $scope.edition = function(){
   // console.log(teams[elem.selectedIndex].pokes); // just so i know: logs the pokes array in ones of the teams objects in the teams array
   document.querySelector("input[name=editteamtitle]").value = teams[elem.selectedIndex].teamname; // populates teamname input with the selected team's name
   for(var i = 0; i < 6; i++){ // this loop populates the pokemon inputs dynamically instead of that dumb shit in the above controller
    document.querySelector("input[name=editpokemon" + i + "]").value = teams[elem.selectedIndex].pokes[i]; // dynamically increment and paste pokemon in the inputs
   }
   // the hard part maybe: updating the array
   $scope.editRecord = function(event){
    tempteamname = document.querySelector("input[name=editteamtitle]").value; // assigns edited name to placeholder var
    for(var i = 0; i < 6; i++){ // this loop is used to populate the tempteampokes array in the correct format so it can be used to update the teamlistview later
     tempteampokes[i] = document.querySelector("input[name=editpokemon" + i + "]").value;
    }
    // teams[elem.selectedIndex].teamname = document.querySelector("input[name=editteamtitle]").value;
    // for(var i = 0; i < 6; i++){
    //  teams[elem.selectedIndex].pokes[i] = document.querySelector("input[name=editpokemon" + i + "]").value;
    // }
    // NOTE: this commented chunk SHOULD NOT be used, it will also update the teamlistview at the bottom of the page
   }
  }
  $scope.editionSubmit = function(){ // function to actually submit changes, update teamlistview, and reset fields
   teams[elem.selectedIndex].teamname = tempteamname; // this actually changes the teamname value
   for(var i = 0; i < 6; i++){
    teams[elem.selectedIndex].pokes[i] = tempteampokes[i]; // loop to update all pokemon in a teams object
   }
   elem.selectedIndex = null; // this is to reset form by deselecting any option
   inputs = document.getElementById("editteamsfields").getElementsByTagName("input"); // set simple var that is list of inputs in edit form
   for(var j = 0; j < inputs.length; j++){
    inputs[j].value = ""; // this resets all fields to empty strings
   }
  }
  // console.log(document.querySelector("select")); // querySelector/querySelectorAll is jQuery's find()
 }])




// THIS CONTROLLER HANDLES VIEWING THE TEAMS IN THE LOWER DISPLAY AND UPDATES ITSELF
team.controller('TeamsListView', ['$scope', function($scope){ //controller for teams dashboard
   // if(teams.length){
    this.sets = teams;
    // below is used to create the pokemon sets from the teams.pokes arrays
    // NOTE: THIS IS DECLARED ONCE AT THE BEGINNING OF THIS CONTROLLER IN ORDER TO INITIALIZE THE ARRAY
    for(var i = 0; i < teams.length; i++){
     this.sets[i].pokelist = teams[i].pokes.join(", ");
    }
   // }
   $scope.$on('update', function(event){ // this function receives the custom event 'update'
    this.sets = teams;
    // below is used to create the pokemon sets from the teams.pokes arrays
    for(var i = 0; i < teams.length; i++){
     this.sets[i].pokelist = teams[i].pokes.join(", ");
    }
   })
   // above end
  }])
})();