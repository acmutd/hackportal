import Head from 'next/head';
import React from 'react';
import AboutHeader from '../../components/AboutHeader';
import MemberCard from '../../components/MemberCard';
import { colorSchemes } from '../../utilities/colorScheme';

/**
 * The about page.
 *
 * Landing: /about
 */

interface TeamMember {
  name: string;
  description: string;
}

export default function About() {
  const members: TeamMember[] = [
    {
      name: 'Stefflon Don',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quidem, molestiae
      amet laboriosam doloribus adipisci aut necessitatibus itaque aspernatur quisquam quo
      delectus. Saepe, ducimus voluptatum. Sed quidem deleniti ullam eaque hic. Rerum, quia ad
      deleniti sed saepe fuga? Necessitatibus aliquam ratione modi dolorem repellendus! Saepe
      nobis quaerat dicta error. Velit.`,
    },
    {
      name: 'Stefflon Don',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quidem, molestiae
      amet laboriosam doloribus adipisci aut necessitatibus itaque aspernatur quisquam quo
      delectus. Saepe, ducimus voluptatum. Sed quidem deleniti ullam eaque hic. Rerum, quia ad
      deleniti sed saepe fuga? Necessitatibus aliquam ratione modi dolorem repellendus! Saepe
      nobis quaerat dicta error. Velit.`,
    },
  ];
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
        <div className="flex flex-col gap-y-4">
          {members.map(({ name, description }, idx) => (
            <MemberCard
              key={idx}
              name={name}
              description={description}
              cardColor={colorSchemes[idx % 3]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
