import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="containers">
        <div className="wrapper">
          <div className="text-center">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => toggleFAQ(0)}
              >
                <span className="sr">01.</span> What is Satta King consist of, and who founded it?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 0 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Satta King is a type of lottery game that falls under "Gambling" and is based on the numbers 00 to 99. This game is actually called Satta Matka, which is a type of "Satta" or gambling where a number is chosen from a pot. After being outlawed by the government, it sporadically developed over several decades into Satta, a type of lottery where participants attempt to guess the correct numbers. It is a patchwork that divides India into discrete regional markets, such as Delhi, Disawar, Gali, and others, each with unique histories and seasons (some of which make sense in terms of mental banking).
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => toggleFAQ(1)}
              >
                <span className="sr">02.</span> In the Satta King game, who is B7 Satta?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 1 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  One of the greatest websites for real Satta King results, records charts, online wagers, and safe platforms for Satta betting is B7 Satta. It offers services and assistance to players, including user data protection, new draw alerts, safe gaming guidelines, and real-time results, among other things. Both novice and seasoned gamblers looking for a website they can rely on to provide openness are drawn to its strong reputation.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => toggleFAQ(2)}
              >
                <span className="sr">03.</span> How can I use B7 Satta to play Satta King?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 2 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
In order to participate, a player must create an account on B7 Satta or the app, select a market, and then select a number between 00 and 99. From there, he can put bets on a variety of bet types, including Single, Jodi, and Panna. if the chosen sum corresponds to the announcement made on that market and lands following the draw.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => toggleFAQ(3)}
              >
                <span className="sr">04.</span> What are Satta King bets' primary payoff rates?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 3 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
					Typical types of bets consist of:<br/>
				
                <b>Ank (Single):</b> Place a wager on just one number from 0 to 9.      <br/>
<b>Jodi (Pair):</b> A bet with two numbers high or low (00-99) is referred to as a pair, and it is even most frequently employed for a good reward.   <br/>
<b>Panna (Treble):</b> Place a wager on multiples of three digits.

				Pay tables and side bets are available, but I've only included the most well-liked ones. Depending on the market and wager, payouts could reach 90 to 960 times the wager.
				
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => toggleFAQ(4)}
              >
                <span className="sr">05.</span> How can a player of Satta King stay current with Satta King Bazaar while monitoring the Satta outcome?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 4 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  B7 Satta instantly sponsored push alerts and posted the official draw results on their website. There will be an online results page and exact scheduling for each market. In order to choose their wager, gamblers can use algorithms and historical results, but they must get news from reliable sources to prevent being duped.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 5 ? "active" : ""}`}
                onClick={() => toggleFAQ(5)}
              >
                <span className="sr">06.</span> What are Satta King India's laws and regulations?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 5 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  In the states where lotteries are forbidden, it is regarded as unlawful and a criminal offense. If Satta betting was done through authorized organizations or lotteries, there would be fines or maybe jail time. However, just because playing Satta online is dangerous doesn't mean you can't do it; in fact, it's still legal. Before engaging in the activity, users or visitors should make sure that playing Satta online is permitted in their area.

                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 6 ? "active" : ""}`}
                onClick={() => toggleFAQ(6)}
              >
                <span className="sr">07.</span> What risks come with playing Satta King offline or online?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 6 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Significant risks include:<br/>
					<b>Money lost:</b> There is a good chance of the house.<br/>
<b>Addiction:</b> Fast-paced games with large payouts may exacerbate gambling addiction. <br/>
<b>Liability:</b> Gambling in excess is prohibited. <br/>
<b>Cybersecurity or fraud:</b> Some websites show up on fraudulent websites and offer no assurances regarding the security of data or payments. When playing on websites like B7 Satta, users must have faith in their safety and privacy.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 7 ? "active" : ""}`}
                onClick={() => toggleFAQ(7)}
              >
                <span className="sr">08.</span> What are some strategies for winning Satta King?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 7 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
Although no method is perfect, players attempt to forecast patterns of the numbers that will be drawn using historical charts and trends in previous outcomes tracking provided by B7 Satta of "Secret Powerball Technique." These methods have no bearing on the odds, but they can make your betting more enjoyable. Leading providers emphasize the need of playing for fun rather than profit, and Gasportal provides some crucial recommendations for those making ethical wagers.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 8 ? "active" : ""}`}
                onClick={() => toggleFAQ(8)}
              >
                <span className="sr">09.</span>  How does B7 Satta guarantee user safety and ethical gaming?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 8 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
B7 Satta prioritizes user privacy by using encryption techniques to manage personal data in a more private manner and to secretly authenticate registered users. The website frequently offers guidance on how to set limits, recognize risk indicators, take breaks, and get assistance if there's a chance of developing a gambling addiction. Additionally, they offer legal risk education and, if necessary, referrals to support resources.


                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 9 ? "active" : ""}`}
                onClick={() => toggleFAQ(9)}
              >
                <span className="sr">10.</span> What distinguishes B7 Satta from other business partners such as A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, A8 Satta, A9 Satta, and Lucky Satta?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 9 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, A8 Satta, A9 Satta, and Lucky Satta share their verified results, data analysis, and player support with B7 Satta as a dependable, trustworthy smart business in the betting model. Together, they open up a lot of markets, make draw results more transparent, and encourage a responsible betting culture. When they work together, they build cross-platform trust, opening up new markets and competitors.


                </div>
              </div>
            </div>


            {/* Add more FAQs below as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}


