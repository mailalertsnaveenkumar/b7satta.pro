import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FAQ from "./assets/components/faq";
import Readmore from "./assets/components/Readmore";
import Clock from "./pages/clock";
import api from "./utils/api";
import LiveGameResult from "./pages/LiveGameResult";
import GroupTable from "./pages/GroupTable";
import MonthlyGroupTable from "./pages/MonthlyGroupTable";
import CustomAds from "./pages/CustomAds";
import BottomAds from "./pages/BottomPromotion";

import Luckynumber from "./assets/components/Luckynumber";
import MiddleAdsSection from "./pages/MiddleAdsSection";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
	  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  // Fetch games from backend
  useEffect(() => {
    let cancelled = false;
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        if (cancelled) return;
        setGames(res.data);
        if (res.data.length > 0) setSelectedGame(res.data[0].name);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchGames();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCheck = () => {
  if (!selectedGame || !selectedYear) return;

  const gameSlug = selectedGame
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

navigate(`/chart-${selectedYear}/${gameSlug}-satta-king-result`);
};  

const UpcomingResults = ({ loadingInitial }) => {
  const [cards, setCards] = useState(
    new Array(3).fill(null).map(() => ({
      name: "",
      resultTime: "--",
      latestResult: null,
      minutesUntil: null,
      loading: true
    }))
  );

  const mountedRef = useRef(false);
  const intervalRef = useRef(null);
  const controllerRef = useRef(null);

  // Convert "18:30" -> "6:30 PM"
  const to12Hour = (timeStr) => {
    if (!timeStr || timeStr === "--") return "--";
    const [h, m] = timeStr.split(":");
    let hour = parseInt(h, 10);
    const minutes = parseInt(m, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const fetchOnce = async () => {
    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const r = await api.get("/upcoming?limit=5", {
        signal: controllerRef.current.signal
      });

      const data = r.data;
      if (!mountedRef.current) return;

      if (Array.isArray(data.cards)) {
        const mapped = data.cards.map((c) => ({
          name: c.name || "—",
          resultTime: c.resultTime ? to12Hour(c.resultTime) : "--",
          latestResult: c.latestResult ?? null,
          minutesUntil: c.minutesUntil ?? null,
          loading: false
        }));

        while (mapped.length < 3)
          mapped.push({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          });

        setCards(mapped.slice(0, 3));
      } else {
        setCards(
          new Array(3).fill(null).map(() => ({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          }))
        );
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.warn("Upcoming fetch failed", err);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchOnce();
    intervalRef.current = setInterval(fetchOnce, 30000);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const Card = ({ card }) => {
    const showWaiting = !card.latestResult;

    return (
      <section className="circlebox2">
        <div>
          <div className="sattaname">
            <p style={{ margin: 0 }}>{card.name}</p>
          </div>

          <div className="sattaresult">
            <p style={{ margin: 0, padding: 0 }}>
              <span style={{ letterSpacing: 4 }}>
                {card.loading ? (
                  "--"
                ) : showWaiting ? (
                  <img
                    src="images/d.gif"
                    alt="wait icon"
                    height={50}
                    width={50}
                  />
                ) : (
                  card.latestResult
                )}
              </span>
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                marginTop: 5,
                fontWeight: "bold"
              }}
            >
              <small style={{ color: "white" }}>{card.resultTime}</small>
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Card card={cards[2]} />
      <Card card={cards[0]} />
      <Card card={cards[1]} />
    </div>
  );
};
  return (
    <div>
      <section className="circlebox">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult">
                <div id="clockbox">
                  <Clock />
                </div>
                <p className="hintext" style={{ padding: 0 }}>
                  हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- REPLACED GALI BLOCK ---------- */}
      <UpcomingResults games={games} loading={loading} />
      {/* ---------- end replaced block ---------- */}

      <LiveGameResult
        gameName="disawar"
        imgArrow="images/arrow.gif"
        imgWait="images/d.gif"
      />

      {/* <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }} className="lucky-number-section"
      >
        <div className="rows">
          <div
            className="card-body notification munda"
            style={{
              display: "block",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div><h2><b>आज की पकड़ जोड़ी</b></h2></div>
				<Luckynumber />		
            
            
          </div>
        </div>
      </div> */}
{/*       
      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}
      >
        <div className="rows">
          <div
            className="card-body notification munda "
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            <h2><b>मुंडा 01 से 100 नम्बरो तक की राशि/फैमिली</b></h2>
            <Link className="btnlink header_btn blck" to="/01-100-ki-family">
                    Check <span class="arw">→</span>
                </Link>
            
            
          </div>
        </div>
      </div> */}
      <CustomAds />

      <GroupTable groupName="gr1" />

      <GroupTable groupName="gr2" />
      <MiddleAdsSection/>  

      
		{/*<div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}

        className="card-body notification munda blv-section"
      >
        <div className="rows" style={{width: "100%",}}>
          <div
            className="card-body notification"
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#ffd800",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
             <h2>
              जिस व्यक्ति को तेज़ और विश्वसनीय परिणाम चाहिए, वे हमारे{" "}
              <Link to="https://whatsapp.com/channel/0029Vb6z44e17Ems4yyjTj0y">
                <strong> WhatsApp</strong>
              </Link>{" "} चैनल से जुड़ सकते हैं।
            </h2> 
          </div>
        </div>
      </div>*/}

      
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>SATTA RECORD CHART {new Date().getFullYear()}</h5>
            </div>
          </div>
        </div>
      </section>

      <div className="Select_selectMainDiv__QD2cf">
        <select
          aria-label="satta game name"
          className="Select_selectTag__IzyVd"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          {games.map((game) => (
            <option key={game._id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
        <select
          aria-label="year"
          className="Select_selectTag__IzyVd Select_secondTag__Q9uV_"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => startYear + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button className="header_btn" type="button" onClick={handleCheck}>
          Check <span className="arw">→</span>
        </button>
      </div>
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>
                <b>
                  SATTA RESULT CHART{" "}
                  {new Date()
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  {new Date().getFullYear()}
                </b>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <MonthlyGroupTable groupName="gr1" />
      <MonthlyGroupTable groupName="gr2" />

            <BottomAds />

		<section className="game-detail">
        <div className="containers">
          <div className="rowr">
            <div className="col-left">
              <div className="text-left2">
                <h1>
                  Presenting the most well-known gaming culture in India, Satta King, and its societal effects
                </h1>
              </div>
            </div>
            <div className="col-right">
              <div className="content">
                <p>
                  B7 Satta, the most informative website about SATTA KING, is now available! With the help of this guide, you will fully comprehend the Satta King game, including its origins, how to play it, which markets are the finest, and how crucial it is for players to be cautious.
                </p>
                <h2>What is it, Satta King?</h2>
                <p>
                  You can use online betting to win the Satta King game. It resembles a lottery, a game of numbers, or placing bets on the final two to four numbers at various time intervals. "King" implies head (winner), while "Satta" is typically associated with gambling or betting.

                </p>

  

                <Readmore>
                  <p>
                    Despite having its origins in the previous lottery systems, Satta King is currently the most popular game because of its various forms and regional pockets. It offers the thrill of gambling and the possibility of enormous wins, but if you don't want to place big bets, you can't lose much, if anything—all on a screen.

                  </p>

                  <h2>The Historical Background of Satta King</h2>

                  <p>
                    The Satta King game was created in the middle of the 20th century. It started with a game called "Matka," in which players would place bets depending on the opening and closing prices of cotton that was sent from New York to the Bombay Cotton Exchange. Overview of the Indian Subcontinent Numerous regional variations of the game brought it to India. Matka became as well-known as Delhi and Mumbai.

                  </p>

                  <p>
                    The game was previously played offline since the late 1960s, but with the advent of the internet in 2000, everything went online, and it is now possible to play it digitally under the Cyber Law known as "Satta" King Possible. Eventually, the game spread to neighboring towns and was connected to numerous markets, or "bazaars," each of which had its own set of winning times and numbers.
                  </p>

                  <p>
                    Despite the ban, Satta King is very well-liked, and gamers consistently wait for the winners to be announced every day. Since then, it has expanded to the internet in many places, which is probably why you've been able to play faster or have better outcomes.

                  </p>

                  <h2>How Do I Play Satta King?</h2>
                  <p>
                    Although Satta King is quite simple to play, you must exercise caution. Here's a little explanation:
                  </p>

                  <h3>Choosing Numbers</h3>
                  <p>                   
					Every player selects one number between 00 and 99. PANNA Jodi duo Anak pannas are numbers that are taken in pairs inside a system, such as tira/panna (A,B) 121, etc. They can be played separately, for instance. However, a few wagers have rather uniform odds or payouts.
   
                  </p>

                  <h3>Placing Bets</h3>
                  <p>
                    How to play: Using applications, operators, or their agents, players can wager on numbers online. "If it succeeds, one makes many times the money," even though there isn't much betting involved—in this case, 10 or 50.
                  </p>

                  <h3>Declaring Results</h3>
                  <p>
                    Every Satta market has a unique opening time result that is released on a daily or weekly basis at a predetermined time. Delhi Bazar results are announced at a specific time, while Disawar and Faridabad results are announced on a specific timeline.

                  </p>

                  <h3>Gains and Payouts</h3>
                  <p>
                    If the chosen number matches the winning number specified for that specific draw, the player wins. Payouts might vary from 90 to 960 times the initial stake or more, depending on the market and type of wager.

                  </p>
				  
				  <h3>Well-known Satta King Marketplaces Several well-known Satta King Markets</h3>
				  <p>The Indian subcontinent has numerous gambling markets, and Satta King is not just one game. Different drawings, timetables, regulations, and outcomes will be used in each market. Here are a few of the most well-liked markets:</p>

       

                  <p><b>Delhi Bazar Satta:</b> One of the most well-known and established markets with daily results.</p>

					<p><b>Disawar Satta:</b> It has a large player base and is well-known for its daily draws.</p>

					<p><b>Faridabad Satta:</b> A recently developed market that is becoming more and more well-known.</p>

					<p><b>Ghaziabad Satta:</b> Well-liked for player engagement and current outcomes.</p>

					<p><b>Gali Satta:</b> It is well known that this market has its unique draw timing.</p>

                  <p>
                    Each of these markets allows players to view Togel results via their own website or portal. For real-time results, they can also follow websites or apps like B7 Satta.
                  </p>

                  <h3>Understanding the Risks and Cautions</h3>
                  <p>
                    Although Satta King is risky, it can also be enjoyable and fulfilling:
                  </p>
				  
                  <p><b>Risk of loss:</b> Players who take chances lose money since the house always wins. However, your bottom line should be what you can afford to lose if you risk. </p>

<p><b>Addictive:</b> The fast-paced nature of games and the potential for large prizes can cause addiction.</p>

<p><b>Legal FAQs:</b> Since Satta King is still prohibited in the majority of India, playing the game could have serious legal repercussions.</p>

<p><b>Trust issues:</b> Since DPL is mostly played covertly or illegally, players should be on the lookout for scammers and fraudsters. </p>

                  <p>
                    Tweet At B7 Satta, we don't support or advise playing challenges; instead, we offer tried-and-true fruits and lessons.
                  </p>

                  <h3>Platforms like B7 Satta's Function</h3>
                  <p>B7 Satta, and the like are vital because there.visitInsn This is a digital give-and-take.</p>
                  
				  <p><b>Verified Results:</b> All lottery draw results are posted immediately following each announcement in an effort to minimize misleading information. </p>

					<p><b>Historical Information:</b> The Secret Powerball Technique's Past Additionally, this method displays the regular drawing trend that has been occurring for eight years and provides you with a historical past by reusing all of the previous winning outcomes during a thirteen-year period.</p>

					<p><b>Live Push alerts:</b> With real-time push alerts, you never have to worry about missing a tennis point, game, or set.</p>

					<p><b>Player education:</b> Providing advice, tactics, and materials regarding responsible gaming to enable gamers to make informed choices.</p>

					<p><b>Safety and Privacy Guaranteed:</b> All user information is kept confidential and shielded from abuse. </p>

                  <h3>Advice for Conscientious Participation</h3>
                  <p>
                    You should never wager more than you can afford.
                  </p>
                  <p>Never try to fill a vacuum.</p>
                  <p>
                    <b>Breaks:</b> Taking occasional breaks from the game can be beneficial.

                  </p>
                  <p>Seek assistance if you think you may have a gambling addiction.</p>
                  <p>
                    Recognize and abide by the local gambling regulations.
                  </p>

                  <h3>To SumUp</h3>
                  <p>
                    Satta King for the average Indian. It might be enjoyable and even profitable, but always play sensibly, quietly, and responsibly. Concerning Us B7 Satta has been the top satta company in India for forty years.
                  </p>

                  <p>
                    To be clear, gaming cannot be your primary source of income or employment. In conclusion, always be cautious, keep yourself informed, and only visit reliable websites for Satta King.

                  </p>
                </Readmore>
              </div>
            </div>
          </div>
        </div>
      </section>       
<br/>
		<FAQ />
    </div>
  );
};

export default Home;













