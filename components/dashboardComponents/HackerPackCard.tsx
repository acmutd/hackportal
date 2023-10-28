import Image from 'next/image';

export default function HackerPackCard(props: { link: string; name: string; redirect: string }) {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="border-secondary border-2 px-4 py-8 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition ease-in-out duration-300 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center space-x-6 > * + *">
        <Image src="/assets/notion.png" alt="notion" width={50} height={50} />
        <div className="text-secondary font-bold xl:text-4xl md:text-3xl text-2xl">
          {props.name}
        </div>
      </div>
      <div className="text-center md:mt-6 mt-4 text-secondary md:text-base text-sm">
        {props.redirect}
      </div>
    </a>
  );
}
