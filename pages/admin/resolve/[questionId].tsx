import { GetServerSideProps } from 'next';
import { useState } from 'react';
import PendingQuestion from '../../../components/PendingQuestion';
import { RequestHelper } from '../../../lib/request-helper';
import { QADocument } from '../../api/questions';

export default function ResolveQuestion({
  question,
  questionId,
}: {
  question: QADocument;
  questionId: string;
}) {
  const [answer, setAnswer] = useState('');

  const submitAnswer = async () => {
    try {
      await RequestHelper.post<QADocument, void>(
        `/api/questions/pending/${questionId}`,
        {},
        {
          ...question,
          answer,
        },
      );
      setAnswer('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <PendingQuestion question={question.question} />
      <textarea
        className="w-full rounded-xl p-4"
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ backgroundColor: '#F2F3FF' }}
        placeholder="Type your answer here"
      ></textarea>
      <div className="flex flex-row justify-end my-4">
        <button
          type="button"
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#9CA6FF', color: 'black' }}
          onClick={() => {
            submitAnswer();
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer.split('://')[0];
  const question = await RequestHelper.get<QADocument>(
    `${protocol}://${context.req.headers.host}/api/questions/pending/${context.params.questionId}`,
    {},
  );
  return {
    props: {
      question,
      questionId: context.params.questionId,
    },
  };
};
