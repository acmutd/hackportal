import Faq from './Faq';

export default function HomeFaq(props: { answeredQuestion: AnsweredQuestion[] }) {
  return (
    props.answeredQuestion.length != 0 && (
      <section className="md:p-12 p-6">
        <Faq fetchedFaqs={props.answeredQuestion}></Faq>
      </section>
    )
  );
}
