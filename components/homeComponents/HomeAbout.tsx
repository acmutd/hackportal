export default function HomeAbout() {
  return (
    <section className="text-[#111A31] lg:mt-24 sm:mt-16 mt-12">
      <h1 className="lg:text-5xl md:text-3xl text-2xl font-medium lg:mb-8 md:mb-6 mb-3 text-center">
        About HackUTD
      </h1>
      {/* !change */}
      <div className="lg:text-2xl md:text-xl text-base 2xl:w-3/5 w-4/5 mx-auto text-center hoefler-text">
        HackUTD, the largest university hackathon in Texas, is a weekend-long event where students
        build apps, hardware, and more. HackUTD provides a venue for self-expression and creativity
        through technology. People with varying technical backgrounds from universities all over the
        US come together, form teams around a problem or idea, and collaboratively build a unique
        solution from scratch. Whether you&apos;re a frequent hackathon attendee or just getting
        started, we&apos;d love to see what you can make!
      </div>
      <div className="flex justify-between 2xl:w-3/5 w-4/5 mx-auto xl:text-2xl lg:text-lg md:text-base sm:text-sm text-xs font-bold lg:my-20 md:my-16 my-12">
        <div className="text-center">24 Hours</div>
        <div className="text-center">1200 Hackers</div>
        <div className="text-center">200 Projects</div>
        <div className="text-center">$300,000 In Prizes</div>
      </div>
    </section>
  );
}
