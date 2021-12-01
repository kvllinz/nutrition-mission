import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import GLogout from "../../GoogleLogout";
import './Home.css';

const Home = () => {

  const location = useLocation();
  const [liveRight, setLiveRight] = useState(true);
  const [eatRight, setEatRight] = useState(false);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [calories, setCalories] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [userHeight, setUserHeight] = useState(null);
  const [userWeight, setUserWeight] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [recipes, setRecipes] = useState({});
  const [milesRun, setMilesRun] = useState(0);
  const [pushUps, setPushUps] = useState(0);
  const [jumpingJacks, setJumpingJacks] = useState(0);
  const [sitUps, setSitups]= useState(0);
  const [data, setData]= useState({});
  const milesRef = useRef();
  const pushRef = useRef();
  const jumpingRef = useRef();
  const sitUpRef = useRef();

  console.log(recipes)

  const handleMiles=()=>{
      let newItem = parseInt(milesRef.current.value);
      const newMiles = milesRun + newItem;
      console.log(newMiles)
      setMilesRun(newMiles)
      milesRef.current.value = " ";
    }

    const handlePushUps=()=>{
      let newItem = parseInt(pushRef.current.value);
      const newPushUps = pushUps + newItem;
      console.log(newPushUps)
      setPushUps(newPushUps)
      pushRef.current.value = " ";
    }

    const handleJumpingJacks=()=>{
      let newItem = parseInt(jumpingRef.current.value);
      const newJacks = jumpingJacks + newItem;
      console.log(newJacks)
      setJumpingJacks(newJacks)
      jumpingRef.current.value = " ";
    }

    const handleSitups=()=>{
      let newItem = parseInt(sitUpRef.current.value);
      const newSitUps = sitUps + newItem;
      console.log(newSitUps)
      setSitups(newSitUps)
      sitUpRef.current.value = " ";
    }
  

  const saveInfo = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "name": location.state.name, "email": location.state.email, "age": age.toString(), "gender": gender.toString(), "weight": weight, "height": height.toString() }),
    }).then(response => response.json()).then(data => {
      console.log(data);
      setAge(" ");
      setHeight(" ");
      setWeight(" ");
      setGender(" ")
      getUserInfo();
    });
  }

  const saveWorkoutInfo = () => {
    fetch('/workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email": location.state.email, "milesRun": milesRun, "pushUps": pushUps, "jumpingJacks": jumpingJacks, "sitUps": sitUps }),
    }).then(response => response.json()).then(data => {
      console.log(data);
      setMilesRun(0);
      setPushUps(0);
      setJumpingJacks(0);
      setSitups(0)
      getWorkoutInfo();
    });
  }

  const getWorkoutInfo = () => {
    fetch('/workoutinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": location.state.email }),
    }).then(response => response.json()).then(data => {
      console.log("hello")
      setData(data.data)
    })
  }


  const getUserInfo = () => {
    console.log("Its Me")
    fetch('/getuserinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": location.state.email }),
    }).then(response => response.json()).then(data => {
      setUserHeight(data.data.height);
      setUserAge(data.data.age);
      setUserGender(data.data.gender);
      setUserWeight(data.data.weight);
      setCalories(data.data.calories);
      setRecipes(data.data.recipes);
    })
  }

  const navigateToL = () => {
    setEatRight(false);
    setLiveRight(true);
  }

  const navigateToE = () => {
    setEatRight(true);
    setLiveRight(false);
  }
  useEffect(() => {
    getUserInfo();
    getWorkoutInfo();
  }, [])

  return (
    <>
      {/* <!-- Intro Display --> */}
      <div class="introDisplayContainer">
        <div class="headerContainer">
          {/* <!-- Title --> */}
          <div class="titleContainer">
            <div class="titleL">
              <div class="titleLIn">
              </div>
            </div>
            <div class="titleC">
              Nutrition Mission
            </div>
            <div class="titleR">
              <div class="titleRIn">
              </div>
            </div>
          </div>
          {/* <!-- Tabs --> */}
          <div class="tabsContainer">
            <div class="tabBox" id="tabBoxL">
              <div class="tabL">
                <div class="tabLIn" id="tabLLIn">
                </div>
              </div>
              <div class="tabC">
                <div class="tabCIn">
                  <button id="tabLCIn" class="home" onClick={() => navigateToL()}>Live Right</button>
                </div>
              </div>
              <div class="tabR">
                <div class="tabRIn" id="tabLRIn">
                </div>
              </div>
            </div>
            <div class="tabBox" id="tabBoxR">
              <div class="tabL">
                <div class="tabLIn" id="tabRLIn">
                </div>
              </div>
              <div class="tabC">
                <div class="tabCIn">
                  <button id="tabRCIn" class="home" onClick={() => navigateToE()}>Eat Right</button>
                </div>
              </div>
              <div class="tabR">
                <div class="tabRIn" id="tabRRIn">
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Logout --> */}
          <div class="googleButton">
            < GLogout />
          </div>
        </div>
        {/* <!-- Intro --> */}
        <div class="introContainer">
          <div class="introBoxL">
            <div class="introBoxLIn">
            </div>
          </div>
          {/* <!-- Intro Interior --> */}
          <div class="introBoxC">
            <div class="introBoxCIn">
              <div class="introImageContainer">
                {/* <!-- APPLICATION CONTENT: Gmail Profile --> */}
                <div class="introImageBox">
                  <img src={location.state.profilePhoto} />
                </div>
              </div>
              <div class="introContentContainer">
                {/* <!-- APPLICATION CONTENT: Gmail Name --> */}
                <div class="introWelcome">
                  Welcome back, {location.state.name}!
                </div>
                {/* <!-- APPLICATION CONTENT: Tab Data --> */}
                {/* <!-- Recipes --> */}
                {eatRight &&
                  <div class="introFeature" id="introFeature">
                    <div class="entryContainer">
                      <div class="entryBox">
                        <div class="userImageArea">
                          <div class="userImage">
                            <img src={recipes["results"][0]["image"]} alt="Recipe1"></img>
                          </div>
                          <div class="userImage">
                            <img src={recipes["results"][1]["image"]} alt="Recipe1"></img>
                          </div>
                          <div class="userImage">
                            <img src={recipes["results"][2]["image"]} alt="Recipe1"></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {/* <!-- Exercise --> */}
                {liveRight &&
                  <div class="introFeature">
                      <div class="entryBox">
                        <div class="userInputArea">
                          Height: {userHeight}in Weight: {userWeight}lbs Age: {userAge} Gender: {userGender}<br />
                          Height(in): <input type="number" value={height} onChange={(e) => setHeight(e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2))} style={{ width: "50px" }} />{" "}
                          Weight(lbs): <input type="number" value={weight} onChange={(e) => setWeight(e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3))} style={{ width: "50px" }} /><br />
                          Age(y): <input type="number" value={age} onChange={(e) => setAge(e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3))} style={{ width: "50px" }} />{" "}
                          Gender(M/F): <input type="text" maxLength={1} value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: "50px" }} />{" "}<br />
                          <button class="userInfoCalories" onClick={() => saveInfo()}>Update</button>{" "}<br />
                          To maintain your weight, you need:<br />
                          {calories} cal<br />
                        </div>
                      </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="introBoxR">
            <div class="introBoxRIn">
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Body --> */}
      <div class="bodyContainer">
        {/* <!-- Body Top --> */}
        <div class="bodyContainerTop">
          <div class="bodyTopL">
            <div class="bodyTopLIn">
            </div>
          </div>
          <div class="bodyTopC">
            <div class="bodyTopCIn">
            </div>
          </div>
          <div class="bodyTopR">
            <div class="bodyTopRIn">
            </div>
          </div>
        </div>
        {/* <!-- Body Content --> */}
        <div class="bodyContainerCenter">
          <div class="bodyContentContainer">
            <div class="bodyContentBox">
              {/* <!-- APPLICATION CONTENT --> */}
              {eatRight &&
                <div class="bodyContent" id="bodyContent">
                  <div class="bodyTitle">
                    <h1>Eat Right</h1>
                  </div>
                  <div class="recipeContainer">
                    <div class="recipeImageContainer">
                      <a href={recipes["results"][0]["sourceUrl"]} target="_blank">
                        <div class="recipeImage">
                          <img src={recipes["results"][0]["image"]} alt="Recipe1"></img>
                        </div>
                      </a>
                    </div>
                    <div class="recipeDescription">
                      <u><b> {recipes["results"][0]["title"]}</b></u><br />
                      Max Preparation Time: {recipes["results"][0]["readyInMinutes"]} minutes<br />
                      Calories: {recipes["results"][0]["nutrition"]["nutrients"][0]["amount"]}<br />
                      Servings: {recipes["results"][0]["servings"]}
                      <a href={recipes["results"][0]["sourceUrl"]} target="_blank"><span class="recipeButton">Recipe</span></a>
                    </div>
                  </div>
                  <div class="recipeContainer">
                    <div class="recipeImageContainer">
                      <a href={recipes["results"][1]["sourceUrl"]} target="_blank">
                        <div class="recipeImage">
                          <img src={recipes["results"][1]["image"]} alt="Recipe1"></img>
                        </div>
                      </a>
                    </div>
                    <div class="recipeDescription">
                      <u><b>{recipes["results"][1]["title"]}</b></u><br />
                      Max Preparation Time: {recipes["results"][1]["readyInMinutes"]} minutes<br />
                      Calories: {recipes["results"][1]["nutrition"]["nutrients"][0]["amount"]}<br />
                      Servings: {recipes["results"][1]["servings"]}
                      <a href={recipes["results"][1]["sourceUrl"]} target="_blank"><span class="recipeButton">Recipe</span></a>
                    </div>
                  </div>
                  <div class="recipeContainer">
                    <div class="recipeImageContainer">
                      <a href={recipes["results"][2]["sourceUrl"]} target="_blank">
                        <div class="recipeImage">
                          <img src={recipes["results"][2]["image"]} alt="Recipe1"></img>
                        </div>
                      </a>
                    </div>
                    <div class="recipeDescription">
                      <u><b>{recipes["results"][2]["title"]}</b></u><br />
                      Max Preparation Time: {recipes["results"][2]["readyInMinutes"]} minutes<br />
                      Calories: {recipes["results"][2]["nutrition"]["nutrients"][0]["amount"]}<br />
                      Servings: {recipes["results"][2]["servings"]}
                      <a href={recipes["results"][2]["sourceUrl"]} target="_blank"><span class="recipeButton">Recipe</span></a>
                    </div>
                  </div>
                </div>
              }
              {liveRight &&
                <div class="bodyContent" id="bodyContent">
                  Miles Run: {milesRun} Pushups: {pushUps} Jumping Jacks: {jumpingJacks} Sit Ups: {sitUps}<br />
                  Miles Run: <input type="number" ref={milesRef} style={{ width: "50px" }} /> <button class="userInfoCalories" onClick={()=> handleMiles()}>Add</button>{" "}
                  Pushups: <input type="number" ref={pushRef} style={{ width: "50px" }} /> <button class="userInfoCalories" onClick={()=> handlePushUps()} >Add</button>{" "}
                  Jumping Jacks: <input type="number" ref={jumpingRef} style={{ width: "50px" }} /> <button class="userInfoCalories" onClick={()=> handleJumpingJacks()}>Add</button>{" "}
                  Sit Ups: <input type="number" ref={sitUpRef} style={{ width: "50px" }} /> <button class="userInfoCalories" onClick={()=> handleSitups()}>Add</button>{" "}<br />
                  {/* <button class="userInfoCalories">Add</button>{" "} */}
                  <button class="userInfoCalories" onClick={() => saveWorkoutInfo()}>Update</button><br />
                <div>
                  You have ran a total of {data.totalMiles}  Miles<br />
                  You have done a total of {data.totalPushUps}  Push Ups<br />
                  You have done a total of {data.totalJumpingJacks}  Sit Ups<br />
                  You have done a total of {data.totalSitUps}  Jumping Jacks<br />
                  Horray!!!
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        {/* <!-- Body Bottom --> */}
        <div class="bodyContainerBottom">
          <div class="bodyBottomL">
            <div class="bodyBottomLIn">
            </div>
          </div>
          <div class="bodyBottomC">
            <div class="bodyBottomCIn">
            </div>
          </div>
          <div class="bodyBottomR">
            <div class="bodyBottomRIn">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;