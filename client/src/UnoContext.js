import { createContext, useState, useReducer } from "react";
import { io } from "socket.io-client";
import {firestore } from './firebase/config';
// import { allCards } from "./allCards";

export const UnoContext = createContext();
const socket = io("http://localhost:8080");

const UnoProvider = ({children}) => {

  const [username, setUsername] = useState();
  const [showModal, setShowModal] = useState(false);
  const [turn, setTurn] = useState();
  const [userDataList, setUserDataList] = useState([]);
  const [user, setUser] = useState([]);
  const [deck, setDeck] = useState();
  const [scores, setScores] = useState();
  const [scoreBoard, setScoreBoard] = useState();
  const [room, setRoom] = useState('');
  const [svgCards, setSvgCards] = useState([]);
  const [playingDeck, setPlayingDeck] = useState([]);
  const [activePlayer, setActivePlayer] = useState();
  const [backgroundColor, setBackgroundColor] = useState();

  const fetchSVGCards = async () => {
    const req = await firestore.collection('svg').get();
    const tempSVGCards = req.docs.map(card => ({...card.data(), id:card.id}));
    setSvgCards(tempSVGCards)
  }
  const fetchScoreboardsFb = async () => {
    const req = await firestore.collection('scoreboard').get();
    const scoreboard = req.docs.map(score => ({...score.data()}))
    setScoreBoard(scoreboard)
  };
  console.log(scoreBoard)

  const sendScoresToDB = async (winnerData) => {
    const req = await firestore.collection('scoreboard').doc('allScores').update({scores: winnerData})
    return req;
  }

  return (
    <UnoContext.Provider value={{ username, setUsername, user, setUser, socket, deck, setDeck, room, setRoom, fetchSVGCards, svgCards, userDataList, setUserDataList, playingDeck, setPlayingDeck, turn, setTurn, activePlayer, setActivePlayer, backgroundColor, setBackgroundColor, scores, setScores, sendScoresToDB, showModal, setShowModal, fetchScoreboardsFb, scoreBoard, setScoreBoard }}>
      {children}
    </UnoContext.Provider>
  )
}

export default UnoProvider;