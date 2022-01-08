import SpeakerCard from '../components/SpeakerCard';

export default function speakers() {
  return (
    <div className="speakersPage">
      <div className="speakersMainPage flex flex-col items-center max-w-6xl mx-auto">
        <h4 className="speakersTitle">Speakers</h4>
        <div id="SpeakerCards" className="flex flex-wrap justify-center md:w-5/6 w-screen">
          {/* general path -  /assets/speakerImages/{speaker file}*/}
          <SpeakerCard
            path="/assets/speakerImages/PaulBailo.svg"
            name="Paul Bailo"
            company="PIP Consulting Group"
            role="CEO"
            description="Paul Bailo is widely recognized by industry thought leaders for his C-level executive skills in Digital Transformation, Marketing and Business Operations. 
            He has earned deep career success in multiple fields, along with an outstanding industry reputation and important executive roles as Digital Innovator, Strategic Thinker, 
            Change Agent, Customer Champion, Industry Author and Creative Entrepreneur. He has built and led top performing teams, start-up entities and world-class organizations. 
            His background in digital transformation, digital communications, emerging payments, operational excellence, data-driven decision-making and ongoing product innovation is unparalleled. 
            His blue-chip background encompasses Google, Apple, ATT, Bank of America, 
            Goldman Sachs, MasterCard, American Express, GE, Citibank, Federal Reserve Bank of New York, NYC Transit Authority and US Department of Transportation."
            website="https://www.linkedin.com/in/paulbailo"
          />
          <SpeakerCard
            path="/assets/speakerImages/SureshThumma-GS.png"
            name="Suresh Thumma"
            company="Goldman Sachs"
            role="Managing Director"
            description="Suresh Thumma is a Managing Director and Tech Fellow at Goldman Sachs. 
            He manages software engineering for cloud enablement, which enables business application deployments on public cloud.
             Before rejoining Goldman Sachs, Suresh was co-founder and chief executive officer of StackLynx, 
             an online platform for deploying and managing micro services on public cloud. Prior to that, 
             he was a vice president and global head of Cloud Platforms and Platform Automation at Visa. 
             Earlier in his career, Suresh held a variety of roles, including director of Software Engineering 
             for the Investment Research Division at Merrill Lynch and development manager at IBM. 
             He first joined Goldman Sachs in 2008."
            website="https://www.linkedin.com/in/suresh-thumma-9a67086/"
          />
        </div>
      </div>
    </div>
  );
}
