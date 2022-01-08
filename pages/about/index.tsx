import MobileHeader from '../../components/MobileHeader';
import MobileLinks from '../../components/MobileLinks';
import FAQComponent from '../../components/FAQComponent';
import FAQDropdownItem from '../../components/FAQDropdownItem';
import AboutHeader from '../../components/AboutHeader';

export default function faq() {
  return (
    <div>
      <div className="mainFAQSContent">
        <AboutHeader active="/about" />

        <h4 className="faqTitle">FREQUENTLY ASKED QUESTIONS</h4>
        <h4 className="faqTitle-mobile">FAQ</h4>
        <div className="faqs">
          <div className="leftFacts">
            <FAQComponent faqquestion="What is a hackathon?">
              <FAQDropdownItem>
                A hackathon is a 24-hour competition where you and up to 3 teammates build a
                software project from scratch and compete against other groups for prizes. Sponsors
                will also provide workshops, events, and activities throughout the weekend to help
                you learn more about the field of technology!
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>
            <FAQComponent faqquestion="Can I participate if I have never hacked?">
              <FAQDropdownItem>
                Everyone is welcome to come, and no experience is necessary to attend! We will even
                be hosting workshops to introduce new hackers to industry programs and technologies.
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>
            <FAQComponent faqquestion="What if I don’t have a team?">
              <FAQDropdownItem>
                We will have a teambuilding session at the start of the hackathon for those who need
                help finding one! You can also choose to work on projects by yourself!
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>
            <FAQComponent faqquestion="What do I need to bring?">
              <FAQDropdownItem>
                You just need to bring a laptop, charger, and a hacking spirit to participate! We
                will be providing internet connectivity, and we also recommend having a compiler,
                packages, or any packaging tools ready beforehand.
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>
            <FAQComponent faqquestion="When is HackUTD VIII?">
              <FAQDropdownItem>November 13th and 14th!</FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="When is registration?">
              <FAQDropdownItem>Registration began August 12th!</FAQDropdownItem>
            </FAQComponent>
          </div>
          <div className="rightFacts">
            <FAQComponent faqquestion="How much does it cost?">
              <FAQDropdownItem>HackUTD VIII will be completely free to hackers!</FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="Where will it be?">
              <FAQDropdownItem>HackUTD will be hosted at... You guessed it: UTD!</FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="What are the general rules?">
              <FAQDropdownItem>
                Your project must be built entirely over the course of the weekend. No previous
                projects or code may be used. Have fun!
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="What should I build?">
              <FAQDropdownItem>
                Anything you want! You can try to solve a sponsor challenge or submit a project for
                the HackUTD awards!
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="Can I volunteer?">
              <FAQDropdownItem>
                Mentor and volunteer applications are open now! Check the home page for the sign-up
                links!
              </FAQDropdownItem>
            </FAQComponent>
            <div>
              <br />
            </div>

            <FAQComponent faqquestion="Free swag? pls?">
              <FAQDropdownItem>
                We will have custom HackUTD VIII swag for all participants along with gear provided
                by our sponsors! And free food!
              </FAQDropdownItem>
            </FAQComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
