import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import { buttonDatas, stats } from '../lib/data';

export default function Home() {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="Jumbotron">
        <div className="TitleScreen">
          <h2 className="ACMname">ACM presents</h2>
          <h1 className="Eventname">HACKUTD</h1>
          <h3 className="subTitle">BLAST FROM THE PAST</h3>
        </div>

        <div className="joinButtons">
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="HackerButton font-display bg-black mb-16"
          >
            BECOME A HACKER
          </button>
        </div>
      </div>
      <div className="mt-16">
        <button
          type="button"
          onClick={() => router.push('/mentor')}
          className="MentorButton font-display bg-black"
        >
          BECOME A MENTOR
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => router.push('/volunteer')}
          className="SponserButton font-display bg-black"
        >
          VOLUNTEER
        </button>
      </div>
      <div className="date">JOIN US ON NOVEMBER&nbsp;13&nbsp;&amp;&nbsp;14</div>

      <div className="Stats">
        <div className="Statsright">
          <div className="p-5 HackerButton sm:text-2xl text-lg">
            <h5 className="Info text-3xl">750+</h5>
            <h6 className="Info">participants</h6>
          </div>
          <div className="row">
            <div className="HackerButton sm:text-2xl text-lg">
              <h5 className="Info text-3xl">24</h5>
              <h6 className="Info">hours</h6>
            </div>
            <div className="p-10  HackerButton sm:text-2xl text-lg">
              <h5 className="Info text-3xl">34</h5>
              <h6 className="Info">events</h6>
            </div>
          </div>
        </div>
        <iframe
          className="video z-0"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/niFBblrblqo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="AboutHackUTD p-4">
        <h4 className="Subtitle p-8 pt-8">About HackUTD</h4>

        <p className="paragraph">
          HackUTD, the largest university hackathon in North Texas, is a weekend long event where
          students build apps, hardware, and more. HackUTD provides a venue for self-expression and
          creativity through technology. People with varying technical backgrounds come together,
          form teams around a problem or idea, and collaboratively code a unique solution from
          scratch. Whether you&apos;re a frequent hackathon attendee or just getting started,
          we&apos;d love to see what you can make.
        </p>
        <br />
        <br />
      </div>
      <footer className="footer">
        <meta charSet="UTF-8" />
        <a href="https://acmutd.co/" target="_blank" rel="noopener noreferrer">
          Made with &#x1F303; by ACM Development
        </a>
      </footer>
    </div>
  );
}
