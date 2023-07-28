import Faq from './Faq';

export default function HomeFaq(props: { answeredQuestion: AnsweredQuestion[] }) {
  return (
    props.answeredQuestion.length != 0 && (
      <section className="mt-20 mb-24">
        <Faq fetchedFaqs={props.answeredQuestion}></Faq>
      </section>
    )
  );
}
