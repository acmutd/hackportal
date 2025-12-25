import Faq from './Faq';

export default function HomeFaq(props: { answeredQuestion: AnsweredQuestion[] }) {
  return (
    props.answeredQuestion.length != 0 && (
      <section
        id="faq-section"
        className="bg-9 z-0 relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[700px] py-[5rem] md:py-[7rem] mb-16"
      >
        <Faq fetchedFaqs={props.answeredQuestion}></Faq>
      </section>
    )
  );
}
