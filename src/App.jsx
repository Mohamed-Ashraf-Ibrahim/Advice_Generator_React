import React, { useEffect, useState } from "react";
import logo from "../src/images/icon-dice.svg";
import "../src/App.css";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState("");

  useEffect(() =>{
    getAdvice()
  },[])


  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
      
    } catch (err) {
      console.error("Error fetching advice:", err);
    }
  }

  return (
    <div>
      <main className="container">
        <AdviceNumber adviceId={adviceId} />
        <Advice advice={advice} />
        <DiceButton getAdvice={getAdvice} />
      </main>
    </div>
  );
}


function AdviceNumber(props) {
  return (
    <div>
      <p className="advice-number">
        Advice # <span className="advice-id">{props.adviceId}</span>
      </p>
    </div>
  );
}

function Advice(props) {
  return <q className="advice">{props.advice}</q>;
}

function DiceButton(props) {
  return (
    <div>
      <div onClick={props.getAdvice} className="dice-btn">
        <div className="dice-img">
          {/* Render the imported logo image */}
          <img src={logo} alt="dice icon" />
        </div>
      </div>
    </div>
  );
}
