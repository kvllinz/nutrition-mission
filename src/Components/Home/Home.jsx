import React, { useState } from "react";
import { useLocation } from "react-router";
import GLogout from "../../GoogleLogout";
import './Home.css';

const Home = () => {

  const location = useLocation();
  const [liveRight, setLiveRight] = useState(false);
  const [eatRight, setEatRight] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  console.log(location.state)

  // useEffect(()=>{
  //   fetch('/')
  // })

  const saveInfo = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "name": location.state.name, "email": location.state.email, "age": age, "gender": gender, "weight": weight, "height": height }),
    }).then(response => response.json()).then(data => {
      console.log(data);
    });
  }

  const getInfo = () => {
    fetch('/info').then(response => response.json()).then(data => {
      console.log(data.data.a);
    })
  }

  const navigateToE = () => {
    setEatRight(true);
    setLiveRight(false);
  }
  const navigateToL = () => {
    setEatRight(false);
    setLiveRight(true);
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
                  <button id="tabLCIn" class="home" onClick={() => navigateToL()}>Eat Right</button>
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
                  <button id="tabRCIn" class="home" onClick={() => navigateToE()}> Live Right</button>
                </div>
              </div>
              <div class="tabR">
                <div class="tabRIn" id="tabRRIn">
                </div>
              </div>
            </div>
          </div>
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
                {/* <!-- APPLICATION CONTENT --> */}
                <div class="introImageBox">
                  <img src={location.state.profilePhoto} />
                </div>
              </div>
              <div class="introContentContainer">
                {/* <!-- APPLICATION CONTENT --> */}
                <div class="introWelcome">
                  Welcome back, {location.state.name}
                </div>
                {/* <!-- APPLICATION CONTENT --> */}
                {eatRight &&
                  <div class="introFeature">
                    <div class="entryContainer">
                      <div class="entryBox">
                        <div class="userInputArea">
                          Calculate your daily calorie intake:<br />
                          Height: <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "50px" }} />{" "}
                          Weight: <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: "50px" }} />{" "}
                          Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "50px" }} />{" "}
                          Gender: <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: "50px" }} />{" "}<br />
                          <button class="userInfoCalories" onClick={() => saveInfo()}>Save</button><br />
                          To maintain your weight, you need:<br />
                          PLACEHOLDER cal
                        </div>
                      </div>
                    </div>
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
              <div class="bodyContent" id="bodyContent">
              </div>
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