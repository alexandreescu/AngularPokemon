console.log("poop");
(function(){
 var count = 0;
 var rank = 0;
 var teams = [{teamname: 'Zephyr', pokes: ['Pikachu', 'Yanma', 'Greninja', 'Dusclops', 'Hoppip', 'Golem']},
              {teamname: 'Blitz', pokes: ['Houndour', 'Nidoran', 'Clefable', 'Turtwig', 'Klefki', 'Rapidash']},
              {teamname: 'Strike', pokes: ['Squirtle', 'Nidoking', 'Crawdaunt', 'Fearow', 'Buizel', 'Tauros']},
              {teamname: 'Agro', pokes: ['Pidgey', 'Rayquaza', 'Onix', 'Machoke', 'Haunter', 'Abra']},
              {teamname: 'Phantom', pokes: ['Krabby', 'Groudon', 'Kyogre', 'Entei', 'Giratina', 'Articuno']},
              {teamname: 'Return', pokes: ['Hoothoot', 'Raikou', 'Suicune', 'Ho-oh', 'Lugia', 'Celebi']},
              {teamname: 'Ferric', pokes: ['Electrike', 'Zapdos', 'Blastoise', 'Bulbasaur', 'Infernape', 'Carbink']},
              {teamname: 'Anthem', pokes: ['Skiploom', 'Diancie', 'Agumon', 'Vileplume', 'Xerneas', 'Zygarde']}];
 var main = angular.module('Main', []);
 main.controller('ProfileOverview', ['$scope', function($scope){ //controller for profile dashboard
  // below is to increase rank by 1 until 10, and each click will randomize the "Favorite Team" html
  $scope.randomizeFavoriteTeam = function(){
   window.location.href = "profile/profile.html";
  }
  // above end
  }])
 main.controller('TeamsOverview', ['$scope', function($scope){ //controller for teams dashboard
   this.sets = teams;
   // below is used to create the pokemon sets from the teams.pokes arrays
   for(var i = 0; i < teams.length; i++){
    this.sets[i].pokelist = teams[i].pokes.join(", ");
   }
   // above end
   $scope.editTeams = function(){
    console.log("poopie");
    window.location.href = "teams/teamshome.html";
   }
  }])
})();