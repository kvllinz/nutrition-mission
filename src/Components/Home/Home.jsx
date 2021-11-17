import React, { useState } from "react";
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
  const [recipes, setRecipes] = useState(null);

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
    });
    getUserInfo();
  }

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
      console.log(data.data.recipes);
      setRecipes(data.data.recipes);
    })
  }

  const navigateToL = () => {
    setEatRight(false);
    setLiveRight(true);
    getUserInfo();
  }

  const navigateToE = () => {
    setEatRight(true);
    setLiveRight(false);
    getUserInfo();
    console.log(recipes.results);
  }

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
                  Welcome back, {location.state.name}
                </div>
                {/* <!-- APPLICATION CONTENT: Tab Data --> */}
                {/* <!-- Recipes --> */}
                {eatRight &&
                  <div class="introFeature" id="introFeature">
                    <div class="entryContainer">
                      <div class="entryBox">
                        <div class="userImageArea">
                          <div class="userImage">
                          </div>
                          <div class="userImage">
                          </div>
                          <div class="userImage">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {/* <!-- Exercise --> */}
                {liveRight &&
                  <div class="introFeature">
                    <div class="entryContainer">
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
                  Test
                </div>
              }
              {liveRight &&
                <div class="bodyContent" id="bodyContent">
                  Miles Run: Pushups: Jumping Jacks:<br />
                  Miles Run: <input type="text" style={{ width: "50px" }} />{" "}
                  Pushups: <input type="text" style={{ width: "50px" }} />{" "}
                  Jumping Jacks: <input type="text" style={{ width: "50px" }} />{" "}<br />
                  <button class="userInfoCalories">Add</button>{" "}
                  <button class="userInfoCalories">Update</button><br />
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