// Write your JavaScript code here!
// NOTE: req = request, res = response
window.addEventListener("load", () => {
   let fuelReady  = false;
   let cargoReady = false;
   let fieldCheck;

   // TODO: Why does "this" get added to "fetch"? (OK to get rid of "this")
   fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then((res) => {
      res.json().then((json) => {
         let index = Math.floor(Math.random() * json.length);
         console.log(json[index].name);   // not sure why this keeps adding "this"

         // TODO: Try doing this DOM style later!
         // TODO: Why is VSCode adding "this" to "document"! (So annoying!)
         // BACKTICKS FTW!
         document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `;
      });
   });

   document.querySelector("form").addEventListener("submit", (event) =>{
      event.preventDefault();

      // Inputs
      let pilotName   = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel   = document.querySelector("input[name=fuelLevel]");
      let cargoMass   = document.querySelector("input[name=cargoMass]");
      
      // Outputs
      let pilotStatus   = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus    = document.getElementById("fuelStatus");
      let cargoStatus   = document.getElementById("cargoStatus");

      // Other stuff
      let faultyItems  = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");

      // Update status
      // Problem: after clicking submit, and typing again, pilotStatus is "null"?
      pilotStatus.innerText   = `Pilot ${pilotName.value} Ready`;
      copilotStatus.innerText = `Co-Pilot ${copilotName.value} Ready`;
      fuelStatus.innerText    = `Fuel Level high enough for launch`;
      cargoStatus.innerText   = `Cargo Level high enough for launch`;

      // Update our booleans
      fieldCheck = true;
      cargoReady = false;
      fuelReady  = false; 
      
      // Validate!
      // NOTE: HTML5 has a required attribute
      // TODO: Might need to do an Array.from()
      // What happens here?
      // Instead of doing a boolean test on each value, I chose to have a some test each value
      // some gives us a function to use instead of ||
      if([pilotName,copilotName,fuelLevel,cargoMass].some(field => field.value.trim() === "")){
         window.alert("All fields are required!");
         fieldCheck = false;
      }
      // TODO: Add placeholders?
      // pilotname and copiolot can't be numbers
      // You know what could fix this? REGEXP!
      // You know what, let's just do this instead.
      if(typeof String(pilotName.value) !== "string" && !isNaN(pilotName.value)){
         // regexp
         window.alert("Please enter a name in the Pilot field");
         fieldCheck = false;
      }
      if(typeof String(copilotName.value) !== "string" && !isNaN(copilotName.value)){
         // regexp
         window.alert("Please enter a name in the Co-Pilot field");
         fieldCheck = false;
      }
      if(typeof Number(fuelLevel.value)   !== "number" || isNaN(Number(fuelLevel.value))){
         window.alert("Please enter a number in the Fuel Level field");
         fieldCheck = false;
      }
      if(typeof Number(cargoMass.value)   !== "number" || isNaN(Number(cargoMass.value))){
         window.alert("Please enter a number in the Cargo Mass field");
         fieldCheck = false;
      }
      if(!fieldCheck){
         return;  // get out of this event
      }

      if(Number(fuelLevel.value) < 10000){
         // We are no go for launch. Somebody forgot gas!
         faultyItems.style.setProperty("visibility","visible");
         faultyItems.innerHTML = `There is not enough fuel for the mission! We have ${fuelLevel.value}L. We need at least 10,000L!`;
         launchStatus.style.setProperty("color","red");
         launchStatus.innerText = "Shuttle not ready for launch!";
         fuelReady = false;
         return;  // get out of this event
      }
      else{
         fuelReady = true;
      }
      if(Number(cargoMass.value) > 10000){
         // We are no go for launch. Something needs to be left behind.
         faultyItems.style.setProperty("visibility","visible");
         faultyItems.innerHTML = `There is too much mass for the shuttle to take off! We have ${cargoMass.value}kg. We can not carry more than 10,000kg!`;
         launchStatus.style.setProperty("color","red");
         launchStatus.innerText = "Shuttle not ready for launch!";
         cargoReady = false;
         return;  // get out of this event
      }
      else{
         cargoReady = true;
      }

      // lets do an every instead of a &&
      if([fuelReady,cargoReady,fieldCheck].every(ready => ready === true)){
         // We are go for launch!
         launchStatus.style.setProperty("color","green");
         launchStatus.innerText = "Shuttle is ready for launch!";
      }

   });
   // status box should not update unless all the fields are filled
   // and meet the requirements

   /*
   // TODO: We will need to add some focus features to reset some stuff
   let pilotName   = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel   = document.querySelector("input[name=fuelLevel]");
   let cargoMass   = document.querySelector("input[name=cargoMass]");

   function focusAction(field){
      // changes the styles
   }
   function blurAction(field){
      // changes the styles
   }

   pilotName.addEventListener("focus",(event) => {
      focusAction(this);
   });
   pilotName.addEventListener("click",(event) => {
      focusAction(this);
   });
   pilotName.addEventListener("blur",(event) => {
      blurAction(this);
   });

   copilotName.addEventListener("focus",(event) => {
      focusAction(this);
   });
   copilotName.addEventListener("click",(event) => {
      focusAction(this);
   });
   copilotName.addEventListener("blur",(event) => {
      blurAction(this);
   });

   fuelLevel.addEventListener("focus",(event) => {
      focusAction(this);
   });
   fuelLevel.addEventListener("click",(event) => {
      focusAction(this);
   });
   fuelLevel.addEventListener("blur",(event) => {
      blurAction(this);
   });

   cargoMass.addEventListener("focus",(event) = > {
      focusAction(this);
   });
   cargoMass.addEventListener("click",(event) = > {
      focusAction(this);
   });
   cargotMass.addEventListener("blur",(event) => {
      blurAction(this);
   });
   */
});
