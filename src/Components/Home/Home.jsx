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

  const [MilesRun, setMilesRun] = useState(null);
  const [Swimming, setSwimming] = useState(null);
  const [Pushups, setPushups] = useState(null);
  const [Jumpingjacks, setJumpingjacks] = useState(null);
  const [Jogging, setJogging] = useState(null);
  const [Bicycling, setBicycling] = useState(null);
  const [Ropeclimb, setRopeclimb] = useState(null);
  const [Toereaches, setToereaches] = useState(null);
  const [Crunches, setCrunches] = useState(null);


  console.log(location.state)

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
    })

    const saveInfoWorkout = () => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "MilesRun": MilesRun.toString(), "Swimming": Swimming.toString(), "Pushups": Pushups.toString(), "Jumpingjacks": Jumpingjacks.toString(), "Jogging": Jogging.toString(), "Bicycling": Bicycling.toString(), "Ropeclimb": Ropeclimb.toString(), "Toereaches": Toereaches.toString(), "Crunches": Crunches.toString() }),
      }).then(response => response.json()).then(data => {
        console.log(data);
        setMilesRun(" ");
        setSwimming(" ");
        setPushups(" ");
        setJumpingjacks(" ");
        setJogging(" ");
        setBicycling(" ");
        setRopeclimb(" ");
        setToereaches(" ");
        setCrunches(" ");
      });

      getUserInfoWorkout();
    }


    const getUserInfoWorkout = () => {
      fetch('/getuserinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": location.state.email }),
      }).then(response => response.json()).then(data => {
        setMilesRun(data.data.MilesRun);
        setSwimming(data.data.Swimming);
        setPushups(data.data.Pushups);
        setJumpingjacks(data.data.Jumpingjacks);
        setJogging(data.data.Jogging);
        setBicycling(data.data.Bicycling);
        setRopeclimb(data.data.Ropeclimb);
        setToereaches(data.data.Toereaches);
        setCrunches(data.data.Crunches)
      
      });
  }
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
  }

  getUserInfo();

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
                            <img src={location.state.profilePhoto} />
                          </div>
                          <div class="userImage">
                            <img src={location.state.profilePhoto} />
                          </div>
                          <div class="userImage">
                            <img src={location.state.profilePhoto} />
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
                  Miles Run: Pushups: Swimming: jumpingjacks: Jogging: Bicycling: Ropeclimb: Toereaches: Crunches: <br />

                  MilesRun: <input type="number" style={{ width: "50px" }} />{" "}
                  Swimming: <input type="text" style={{ width: "50px" }} />{" "}<br />
                  Pushups: <input type="number" style={{ width: "50px" }} />{" "}
                  Jumpingjacks: <input type="number" style={{ width: "50px" }} />{" "}
                  Jogging: <input type="number" style={{ width: "50px" }} />{" "}
                  Bicycling: <input type="text" style={{ width: "50px" }} />{" "}
                  Ropeclimb: <input type="number" style={{ width: "50px" }} />{" "}
                  Toereaches: <input type="number" style={{ width: "50px" }} />{" "}
                  Crunches: <input type="number" style={{ width: "50px" }} />{" "}

                  {/* <button class="userInfoCalories">Add</button>{" "} */}
                  <button class="userInfoCalories" onClick={() => saveInfo}>Update</button>{" "}<br />

                  {/* <button class="userInfoCalories" onClick={() => saveInfoWorkout}>Update</button>{" "}<br /> */}
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