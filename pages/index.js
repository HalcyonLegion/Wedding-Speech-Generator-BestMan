import Head from "next/head";
import { useState } from "react";
import { Fragment } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [tone, setTone] = useState("");
  const [bmname, setBMname] = useState("");
  const [intro, setIntro] = useState("");
  const [reason, setReason] = useState("");
  const [bridename, setBridename] = useState("");
  const [groomname, setGroomname] = useState("");
  const [duration, setDuration] = useState("");
  const [modifier2, setModifier2] = useState("");
  const [howmet, setHowmet] = useState("");
  const [modifier3, setModifier3] = useState("");
  const [wishes, setWishes] = useState("");
  const [advice, setAdvice] = useState("");
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
          tone: tone,
          bmname: bmname,
          intro: intro,
          reason: reason,
          bridename: bridename,
          groomname: groomname,
          duration: duration,
          howmet: howmet,
          modifier2: modifier2,
          modifier3: modifier3,
          wishes: wishes,
          advice: advice,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTone("");
      setBMname("");
      setIntro("");
      setReason("");
      setBridename("");
      setGroomname("");
      setDuration("");
      setHowmet("");
      setModifier2("");
      setModifier3("");
      setWishes("");
      setAdvice("");
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
            name="tone"
            placeholder="What is the Tone of this Speech?"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
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
            name="reason"
            placeholder="Why were you chosen to be Best Man?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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
            placeholder="How long have you known the couple?"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
           <input
            type="text"
            name="modifier2"
            placeholder="What's something general the Best man can talk about?"
            value={modifier2}
            onChange={(e) => setModifier2(e.target.value)}
          />
           <input
            type="text"
            name="howmet"
            placeholder="How did the Bride and Groom meet?"
            value={howmet}
            onChange={(e) => setHowmet(e.target.value)}
          />
           <input
            type="text"
            name="modifier3"
            placeholder="What is something really funny/embarassing that the best man can mention?"
            value={modifier3}
            onChange={(e) => setModifier3(e.target.value)}
          />
           <input
            type="text"
            name="wishes"
            placeholder="Please enter any well wishes you have here"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
           <input
            type="text"
            name="advice"
            placeholder="Please enter any advice you have here"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
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
