<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> Stashed changes
import { useLocation } from "react-router";
import GLogout from "../../GoogleLogout";
import './Home.css';

const Home = () => {

  const location = useLocation();
  const [liveRight, setLiveRight]=useState(false);
  const [eatRight, setEatRight]=useState(false);
  const [height, setHeight]=useState("");
  const [weight, setWeight]=useState("")
  console.log(location.state)

  // useEffect(()=>{
  //   fetch('/')
  // })

  const saveInfo =()=>{
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({"name": location.state.name, "email": location.state.email, "age": "24", "gender": "Male", "weight": "215", "height": "6'0"}),
    }).then(response => response.json()).then(data => {
      console.log(data);
    });
  }

<<<<<<< Updated upstream
  const getInfo=()=>{
    fetch('/info').then(response => response.json()).then(data => {
      console.log(data.data.a);
  })
}
=======
  const getUserInfo = () => {
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
    getUserInfo();
  }
>>>>>>> Stashed changes

  const navigateToE=()=>{
    setEatRight(true);
    setLiveRight(false);
<<<<<<< Updated upstream
  }
  const navigateToL=()=>{
    setEatRight(false);
    setLiveRight(true);
=======
    getUserInfo();
>>>>>>> Stashed changes
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    // <form>
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
              <div class="titleCIn">
                Nutrition Mission
              </div>
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
                  {/* <input type="submit" value="Eat Right" id="tabLCIn" class="home" /> */}
                  <button id="tabLCIn" class="home" onClick={()=> saveInfo()}>Eat Right</button>
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
                  {/* <input type="submit" value="Live Right" id="tabRCIn" class="home" /> */}
                  <button id="tabRCIn" class="home" onClick={()=> getInfo()}> Live Right</button>
                </div>
              </div>
              <div class="tabR">
                <div class="tabRIn" id="tabRRIn">
                </div>
              </div>
            </div>
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
                {/* <!-- APPLICATION CONTENT --> */}
                <div class="introImageBox" id="introImageBox">
                  <img src = {location.state.profilePhoto} />
                </div>
              </div>
              <div class="introContentContainer">
                {/* <!-- APPLICATION CONTENT --> */}
                <div class="introWelcome" id="introWelcome">
                  Welcome back, {location.state.name}
                </div>
                {/* <!-- APPLICATION CONTENT --> */}
                {eatRight &&
<<<<<<< Updated upstream
                <div class="introFeature" id="introFeature">
                  <div> 
                    Height: <input type="text" value={height} onChange={(e)=> setHeight(e.target.value)} color="inherit"/>
                    weight: <input type="text" value={weight} onChange={(e)=> setWeight(e.target.value)} color="inherit"/>
=======
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
>>>>>>> Stashed changes
                  </div>
                  Hello
                </div>
                }
                {liveRight && 
                 <div class="introFeature" id="introFeature">
                   Welcome
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
<<<<<<< Updated upstream
              <div class="bodyContent" id="bodyContent">
              </div>
=======
              {eatRight &&
                <div class="bodyContent" id="bodyContent">
                  <div class="recipeContainer">
                    <div class="recipeImage">
                      <img src={recipes["results"][0]["image"]} alt="Recipe1"></img>
                    </div>
                    <div class="recipeDescription">
                      <h1>{recipes["results"][0]["title"]}</h1>
                      <a href={recipes["results"][0]["sourceUrl"]}>Recipe Instructions</a>
                      <h2>Calories: {recipes["results"][0]["nutrition"]["nutrients"][0]["amount"]}</h2>
                    </div>
                  </div>
                  <div class="recipeContainer">
                    <div class="recipeImage">
                      <img src={recipes["results"][1]["image"]} alt="Recipe1"></img>
                    </div>
                    <div class="recipeDescription">
                      <h1>{recipes["results"][1]["title"]}</h1>
                      <a href={recipes["results"][1]["sourceUrl"]}>Recipe Instructions</a>
                      <h2>Calories: {recipes["results"][1]["nutrition"]["nutrients"][0]["amount"]}</h2>
                    </div>
                  </div>
                  <div class="recipeContainer">
                    <div class="recipeImage">
                      <img src={recipes["results"][2]["image"]} alt="Recipe1"></img>
                    </div>
                    <div class="recipeDescription">
                      <h1>{recipes["results"][2]["title"]}</h1>
                      <a href={recipes["results"][2]["sourceUrl"]}>Recipe Instructions</a>
                      <h2>Calories: {recipes["results"][2]["nutrition"]["nutrients"][0]["amount"]}</h2>
                    </div>
                  </div>
                </div>
              }
              {/* {liveRight &&
                <div class="bodyContent" id="bodyContent">
                  Miles Run: Pushups: Jumping Jacks:<br />
                  Miles Run: <input type="text" style={{ width: "50px" }} />{" "}
                  Pushups: <input type="text" style={{ width: "50px" }} />{" "}
                  Jumping Jacks: <input type="text" style={{ width: "50px" }} />{" "}<br />
                  <button class="userInfoCalories">Add</button>{" "}
                  <button class="userInfoCalories">Update</button><br />
                </div>
              } */}
>>>>>>> Stashed changes
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
      < GLogout />
    {/* </form> */}
    </>
  )
}

export default Home;