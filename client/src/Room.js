import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnoContext } from "./UnoContext";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";
import Table from "./components/Table";
import { Modal } from "./components/Modal";
import played_card from "./assets/played_card.mp3";
import "./Room.css";
import { unoBack } from "./utils/unoBack";
import { unoBtn } from "./utils/UnoBtn";
import WaitingRoom from "./components/WaitingRoom";
import { animated, useSpring } from 'react-spring'
import { EndBtn } from "./utils/EndBtn";
import { v4 as uuidv4 } from "uuid";
import { UnoModal } from "./components/UnoModal";

const Room = () => {
  const navigate = useNavigate();
  const {
    deck,
    setDeck,
    socket,
    username,
    room,
    playingDeck,
    setPlayingDeck,
    userDataList,
    turn,
    setTurn,
    backgroundColor,
    setBackgroundColor,
    setScores,
    showModal,
    setShowModal,
    announcedUno, 
    setAnnouncedUno,
    unoModal,
    setUnoModal,
  } = useContext(UnoContext);

  const [current, setCurrent] = useState("");
  const playedSound = () => {
    return new Audio(played_card).play();
  };

  useEffect(() => {
    socket.on("initialDeck", (cards) => {
      setDeck(cards);
    });
    socket.on("playingDeck", (tableCards) => {
      setPlayingDeck(tableCards);
    });
    socket.on("initialColor", (bgColor) => {
      setBackgroundColor(bgColor);
    });
  }, [userDataList, setBackgroundColor, setDeck, setPlayingDeck, socket]);

  useEffect(() => {
    socket.on("currentTurn", (currentTurn) => {
      setCurrent(currentTurn);
    });
  }, [userDataList, socket]);

  useEffect(() => {
    socket.on("changeTurn", (turn) => {
      setTurn(turn);
    });
    socket.on("newBackColor", (bgColor) => {
      setBackgroundColor(bgColor);
    });
  }, [userDataList, setBackgroundColor, setTurn, socket]);

  const handleQuit = (e) => {
    e.preventDefault();
    navigate("/");
    socket.emit("quitGame", room)
  };

  useEffect(() => {
    socket.on('showUnoModal', (playerAnnounced) => {
      setAnnouncedUno(playerAnnounced);
    })
    setTimeout(() => {
      setUnoModal(false)
    }, 2000)
  }, [userDataList, setAnnouncedUno, setUnoModal, socket])

  useEffect(() => {
    if(announcedUno) {
      setUnoModal(true)
    }
  }, [announcedUno, setUnoModal])

  const handleUnoClick = (user) => {
    let userDataListCopy = [...userDataList];
    const filteredUno = userDataListCopy.filter((user) => user.cards.length === 1);
    const playerHasUno = filteredUno.find((player) => player.id === user.id);
    const notClickedUno = filteredUno.filter((player) => !player.clickedUno);
    const otherPlayers = userDataListCopy?.find(
      (player) => player.id === user.id
    );

    if (playerHasUno && !playerHasUno.clickedUno) {
      const userOnUnoIndex = userDataListCopy?.findIndex(
        (player) => player.id === user.id
      );
      playerHasUno.clickedUno = true;
      userDataList.splice(userOnUnoIndex, 1, playerHasUno);
      socket.emit("announceUno", playerHasUno);
      socket.emit("setUnoStatus", userDataList);
    } else if (otherPlayers && notClickedUno) {
      const copyDeck = [...deck];
      notClickedUno.forEach((player) => {
        const indexPlayer = userDataList.findIndex(
          (user) => user.id === player.id
        );
        const unoPenalty = copyDeck[0].splice(0, 3);
        player.isUno = false;
        player.cards.push(...unoPenalty);
        userDataList.splice(indexPlayer, 1, player);
        socket.emit("unoCall", userDataList, copyDeck);
      });
    }
  };
  console.log(userDataList, 'user data list')
console.log(deck, 'here is deck')
console.log(playingDeck, 'here is playing deck')
  useEffect(() => {
    const winner = userDataList.find((cards) => cards.cards.length === 0);
    setShowModal(false);
    if (winner) {
      const winnerData = { user: winner.player, score: 1 };
      setScores(winnerData);
      setShowModal(true);
    }
  }, [userDataList, setShowModal, setScores]);

  const handlePlayCard = (cards) => {
    let remaindingTurn;

    if (turn > 4) {
      remaindingTurn = turn % 4;
      if (remaindingTurn === 0) {
        remaindingTurn = 4;
      }
    } else {
      remaindingTurn = turn;
    }
    if(username.order === remaindingTurn) {

      const wildCard = cards.action;
      if (!!wildCard) {
        if (cards.color === playingDeck[0].color || wildCard === playingDeck[0].action) {

          const currentPlayer = userDataList.find((user) => user.id === username.id);
          const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
          const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
          const nextPlayer = userDataList?.find((user) => user.order === (remaindingTurn % 4) + 1);

          currentPlayer.cards.splice(cardIndex, 1);
          playingDeck.unshift(cards);
          let nextTurn = turn + 1;
          const bgColor = cards.color;

          if (wildCard === "skip") {
            nextTurn = turn + 2;
            const newTurn = (remaindingTurn + 2) % 4 === 0 ? 4 : (remaindingTurn + 2) % 4;
            const nextPlayerDrawTwo = userDataList?.find((user) => user.order === newTurn)
            socket.emit("currentPlayer", nextPlayerDrawTwo);
          } else if (wildCard === "draw two") {
            const copyDeck = [...deck];
            const drawTwo = copyDeck[0].splice(0, 2);
            nextTurn = turn + 2;
            nextPlayer.cards.push(...drawTwo);
            const indexNextPlayer = userDataList.findIndex((user) => user.id === nextPlayer.id);
            userDataList.splice(indexNextPlayer, 1, nextPlayer);
            const newTurn =(remaindingTurn + 2) % 4 === 0 ? 4 : (remaindingTurn + 2) % 4;
            const nextPlayerDrawTwo = userDataList?.find((user) => user.order === newTurn);
            socket.emit("currentPlayer", nextPlayerDrawTwo);
            socket.emit("powerCards", copyDeck);
          }

          if(currentPlayer.cards.length === 1) {
            currentPlayer.isUno = true
            currentPlayer.clickedUno = false;

          } else {
            currentPlayer.isUno = false;
            currentPlayer.clickedUno = false;
          }
          userDataList.splice(indexPlayer, 1, currentPlayer);
          socket.emit("playCard", userDataList, playingDeck);
          socket.emit("turnBaseGame", nextTurn, bgColor);
          socket.emit("updateUser", username);
          playedSound();
        }
      } else if (cards.color === playingDeck[0].color || cards.digit === playingDeck[0].digit) {
        const currentPlayer = userDataList.find((user) => user.id === username.id);
        const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
        const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
        const nextPlayer = userDataList?.find((user) => user.order === (remaindingTurn % 4) + 1);
        const bgColor = cards.color;
        currentPlayer.cards.splice(cardIndex, 1);
        playingDeck.unshift(cards);
        let nextTurn;
        nextTurn = turn + 1;
        if(currentPlayer.cards.length === 1) {
          currentPlayer.isUno = true
          currentPlayer.clickedUno = false;

        } else {
          currentPlayer.isUno = false;
          currentPlayer.clickedUno = false;
        }
        userDataList.splice(indexPlayer, 1, currentPlayer);
        socket.emit("playCard", userDataList, playingDeck);
        socket.emit("turnBaseGame", nextTurn, bgColor);
        socket.emit("updateUser", username);
        socket.emit("currentPlayer", nextPlayer);
        playedSound();
      }} else {
      console.log("Not same order");
    }
  };

  const firstPlayer = userDataList?.find((player) => player.order === 1)

  const styles = useSpring({
    from: { marginTop: -500 },
    to: { marginTop: 0 }
  });

  if (userDataList.length !== 4) {
    return (
      <WaitingRoom />
    )  
  } else {

    return (
      <animated.div style={styles}>
      <>
        <main className ={`main ${backgroundColor}`}>
          <div className="container">
            <h2 className="current__player">
              Current player is:{" "}
              { current ? current?.player : firstPlayer.player }
            </h2>
            <div onClick={() => handleUnoClick(username)} className="unoBtn">
              {unoBtn}
            </div>
            {userDataList?.map((data) => {
              return (
                <div
                  key={data.id}
                  className={
                    data.id === username.id ? "card__hand--active" : "players"
                  }
                >
                  <h3 className="player__name">{data.player}</h3>
                  <section
                    className={
                      data.id === username.id
                        ? "card__hand--container"
                        : "player__hand--container"
                    }
                  >
                    {data.cards.map((cards) => {
                      if (data.id === username.id) {
                        return (
                          <article
                            key={cards.id}
                            id={cards.id}
                            onClick={() => handlePlayCard(cards)}
                            className="card__hand"
                            style={{ color: cards.color }}
                          >
                            {parse(cards.code)}
                          </article>
                        );
                      } else {
                        const newId = uuidv4();
                        return (
                          <div key={newId} className="upper__cards">
                            <article className="card__hand__top">
                              <div className="uno-back">{unoBack}</div>
                            </article>
                          </div>
                        );
                      }
                    })}
                  </section>
                </div>
              );
            })}
            {unoModal ? <UnoModal /> : null}
            {showModal ? <Modal handleQuit={handleQuit} /> : null}
            <div className="center__table">
              <section className="section__deck">
                <PickUpDeck />
              </section>
              <section className="section__table">
                <Table />
              </section>
            </div>
            <div className="leave__btn__room" onClick={handleQuit}>
              {EndBtn}             
            </div>
          </div>
       
        </main>
      </>
      </animated.div>
    );
  }
};

export default Room;
