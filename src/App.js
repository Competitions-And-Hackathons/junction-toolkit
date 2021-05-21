// basic react system
import React, { useEffect, useState}  from 'react';
import './App.css';

// AWS 
import Amplify, {API, graphqlOperation}from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react';

// AWS APIs
import {listGameSettings} from './graphql/queries'
import {createGameSetting} from './graphql/mutations'

//uuid
import {v4 as uuid} from 'uuid'

//UIs
import { TextField } from '@material-ui/core';

Amplify.configure(awsconfig);

function App() {
  //variables
  const [lastestGameData, setLastestGameData] = useState([]);
  const [newGameData, setNewGameData] = useState([]);

  const [testGameData, setTestGameData] = useState([]);
  const [estimatedResult, setEstimatedResult] = useState(false);
  const [showButton, setShowButton] = useState(true);

  //game data를 패치한다. 다시 불러오는 것이다.
  const fetchGameData = async() => {
    try{
      const gameData = await API.graphql(graphqlOperation(listGameSettings))
      let gameDataList =  gameData.data.listGameSettings.items;
      console.log('gameDataList', gameDataList)

      gameDataList.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
      setLastestGameData(gameDataList[0]);
      console.log('lastestGameData', lastestGameData)
 
     }
    catch (error) {
      console.log('error on fetching game data', error);
    }
  }

  useEffect(() => {
    fetchGameData();
  }, []);

  //새로운 game data를 Create한다.
  const createNewGameData = async() => {
    const newGameDataInput = {
      "id": uuid(),
      "version":newGameData.version,
      "speed":newGameData.speed,
      "tanos":newGameData.tanos,
      "backdoor":newGameData.backdoor,
      "infinite":newGameData.infinite,
      "shoot":newGameData.shoot,
      "doom":newGameData.doom
    }

    await API.graphql(graphqlOperation(createGameSetting, {input: newGameDataInput}));
    fetchGameData();
  }

  var callAPI = ()=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"data":`${testGameData.boss_health},${testGameData.warrior_attack}`});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://1dxvyo4vik.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())    
    .then(result => (setEstimatedResult(JSON.parse(JSON.parse(result).body))))
    .catch(error => console.log('error', error))
    .finally(()=> {setShowButton(false)});

    
    //fetchGameData();
  }


  
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Current Game Player Settings</h1>
          <div className="text_field"> version : {lastestGameData.version} </div>
          <div className="text_field"> Player Speed : {lastestGameData.speed} </div>
          <div className="text_field"> [Skill Event Percentage] I LOVE YOU 1500  : {lastestGameData.tanos} % </div>
          <div className="text_field"> [Skill Event Percentage] WhereEver Door : {lastestGameData.backdoor} % </div>
          <div className="text_field"> [Skill Event Percentage] MooYaHo : {lastestGameData.infinite} % </div>
          <div className="text_field"> [Skill Event Percentage] Just Shoot : {lastestGameData.shoot} % </div>
          <div className="text_field"> [Skill Event Percentage] Let`s Boom : {lastestGameData.doom} % </div>


          <h1>Edit Game Player Settings</h1>
          <div className="text_field"> version : 
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, version:e.target.value})} 
            /> 
          </div>

          <div className="text_field"> Player Speed :
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, speed:e.target.value})} 
            />
          </div>

          <div className="text_field"> [Skill Event Percentage] I LOVE YOU 1500  : 
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, tanos:e.target.value})} 
            /> %
          </div>

          <div className="text_field"> [Skill Event Percentage] WhereEver Door :
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, backdoor:e.target.value})} 
            /> %
          </div>

          <div className="text_field"> [Skill Event Percentage] MooYaHo :
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, infinite:e.target.value})} 
            /> %
          </div>

          <div className="text_field"> [Skill Event Percentage] Just Shoot :
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, shoot:e.target.value})} 
            /> %
          </div>

          <div className="text_field"> [Skill Event Percentage] Let`s Boom :
            <TextField value={newGameData.version} 
              onChange={e => setNewGameData({...newGameData, doom:e.target.value})} 
            /> %
          </div>


          <div className="custom_button" onClick={()=> createNewGameData()}> Apply Setting Above </div>

          <h1>Movement Estimation</h1>
          <div className="text_field"> 전사 체력 :
            <TextField value={testGameData.warrior_attack} 
              onChange={e => setTestGameData({...testGameData, warrior_attack:e.target.value})} 
            /> 
          </div>
          <div className="text_field"> 보스 체력 : 
            <TextField value={testGameData.boss_health} 
              onChange={e => setTestGameData({...testGameData, boss_health:e.target.value})} 
            /> 
          </div>


          {showButton ? <div className="custom_button" onClick={()=> callAPI()}> 예측하기 </div> :
            estimatedResult ? <div> 레이드 성공 예상! </div> : <div> 레이드 실패 예상 </div>
          }

          {estimatedResult}

          

          
          <h1> Go to AI Studio </h1>
          <div className="custom_button"> Go! </div>
  
          <h1>Settings</h1>
          <AmplifySignOut/>
        </header>
      </div>
    );
  
  
}

export default withAuthenticator(App);