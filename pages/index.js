import Head from "next/head";
import { useState } from "react";
import { Fragment } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [modifier, setModifier] = useState("");
  const [bmname, setBMname] = useState("");
  const [bridename, setBridename] = useState("");
  const [groomname, setGroomname] = useState("");
  const [duration, setDuration] = useState("");
  const [modifier2, setModifier2] = useState("");
  const [modifier3, setModifier3] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          modifier: modifier,
          bmname: bmname,
          bridename: bridename,
          groomname: groomname,
          duration: duration,
          modifier2: modifier2,
          modifier3: modifier3
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setModifier("");
      setBMname("");
      setBridename("");
      setGroomname("");
      setDuration("");
      setModifier2("");
      setModifier3("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Wedding Speech Generator - Best Man</title>
        <link rel="icon" href="\AI_SPEECHES.png" />
      </Head>

      <main className={styles.main}>
        <img src="\AI_SPEECHES.png" className={styles.icon} />
        <h3>Generate a Best Man's Speech!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="modifier"
            placeholder="What is the Style of this Speech?"
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
          />
          <input
            type="text"
            name="bmname"
            placeholder="What is the Best Man's Name?"
            value={bmname}
            onChange={(e) => setBMname(e.target.value)}
          />
          <input
            type="text"
            name="bridename"
            placeholder="What is the Bride's Name?"
            value={bridename}
            onChange={(e) => setBridename(e.target.value)}
          />
          <input
            type="text"
            name="groomname"
            placeholder="What is the Groom's Name?"
            value={groomname}
            onChange={(e) => setGroomname(e.target.value)}
          />
          <input
            type="text"
            name="duration"
            placeholder="How long have they known the couple?"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
           <input
            type="text"
            name="modifier2"
            placeholder="What something general the Best man can talk about?"
            value={modifier2}
            onChange={(e) => setModifier2(e.target.value)}
          />
           <input
            type="text"
            name="modifier3"
            placeholder="What is something really funny/embarassing that the best man can mention?"
            value={modifier3}
            onChange={(e) => setModifier3(e.target.value)}
          />
          <input type="submit" value="Generate Speech" />
        </form>
        <div className={styles.result}>
        {result ? result.split('.').map((sentence, index) => (
        <Fragment key={index}>
        {sentence}.
        {index !== result.split('.').length - 1 && <br />}
        </Fragment>
        )) : 'No result to display'}
        </div>
      </main>
    </div>
  );
}
