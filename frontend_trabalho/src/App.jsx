import { useEffect, useState } from 'react'
import './App.css'

import GameList from './components/GameList'
import gameAPI from './services/gameApi'


function App() {
  const [list,setList] = useState([])

  async function listGames() {
    try{
      const res = await gameAPI.get('/listGames');
      console.log(res.data);

      setList(res.data);

    }catch(error){
       console.log("Failed to load games:" + error);
    }
  }

  useEffect(() => {
    listGames()
  },[])

  return (
    <>
      <div>
          <GameList data={list}/>
      </div>
    </>
  )
}

export default App
