import { GetServerSideProps } from 'next';
import { useState } from 'react';
import ErrorList from '../../../components/ErrorList';
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
  const [errors, setErrors] = useState<string[]>([]);

  const addError = (errMsg: string) => {
    setErrors((prev) => [...prev, errMsg]);
  };

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
      addError('Failed to submit answer. Please try again later');
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <ErrorList
        errors={errors}
        onClose={(idx: number) => {
          const newErrorList = [...errors];
          newErrorList.splice(idx, 1);
          setErrors(newErrorList);
        }}
      />
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
