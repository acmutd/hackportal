import Faq from './Faq';

export default function HomeFaq(props: { answeredQuestion: AnsweredQuestion[] }) {
  return (
    props.answeredQuestion.length != 0 && (
      <section id="faq-section" className="z-0 relative py-[5rem] md:py-[7rem]">
        <Faq fetchedFaqs={props.answeredQuestion}></Faq>
      </section>
    )
  );
}
