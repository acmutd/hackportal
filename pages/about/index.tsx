import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';

/**
 * The about page.
 *
 * Landing: /about
 */
export default function About() {
  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <section id="subheader" className="p-4">
        <AboutHeader active="/about" />
      </section>
      <div className="top-6 p-6 flex flex-col gap-y-4">
        <h4 className="font-bold text-3xl">About HackUTD VIII</h4>
        <h5>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo natus eum obcaecati. Quo
          ratione quibusdam quae provident illo sapiente facere, debitis quod quidem ad voluptatem
          nisi dicta velit consequatur commodi itaque voluptatum corporis at qui fugit dolore.
          Labore quis, perspiciatis voluptates officiis similique quia deleniti nesciunt repellat
          non, aliquam asperiores numquam. Sequi cum dolorum maiores laboriosam suscipit tenetur
          iste expedita unde praesentium amet. Quos fugiat ullam quam hic, debitis ipsum sapiente
          cupiditate, officia quasi animi nulla sequi exercitationem, earum et modi illum iusto
          maiores quia maxime repudiandae. Amet assumenda corrupti esse magni, velit a quod. Tempore
          nemo asperiores ad saepe!
        </h5>
        <h5>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, quibusdam ipsum.
          Accusamus ipsa consequatur veniam eaque error expedita earum nobis sed dolor ea doloribus
          a, nesciunt sit dolores ipsum labore! Laudantium, maxime recusandae! Optio quidem minus
          itaque ipsam excepturi magni totam quia inventore iure voluptas similique nobis, suscipit
          officia voluptatibus odit dolore et asperiores voluptate reiciendis error quasi aspernatur
          modi hic? Voluptatum fugit porro nam iure tempore, numquam consectetur temporibus. Qui
          commodi expedita blanditiis, magnam delectus debitis vel obcaecati ipsum fugit vero id
          nulla provident iure ad, sequi aut, adipisci officiis minima. Sed, nulla. Cumque deserunt
          possimus error tenetur? Labore!
        </h5>
      </div>

      <div className="top-6 p-6 flex flex-col gap-y-4">
        <h4 className="font-bold text-3xl">Meet Our Team :)</h4>
      </div>
    </div>
  );
}
