import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isAuthorized } from '..';
import ErrorList from '../../../components/ErrorList';
import PendingQuestion from '../../../components/PendingQuestion';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { QADocument } from '../../api/questions';

/**
 * Resolve question page.
 *
 * This page allows admins and organizers to resolve a specific question asked by contestant
 *
 * Route: /admin/resolve/[questionId]
 */
export default function ResolveQuestionPage({
  question,
  questionId,
}: {
  question: QADocument;
  questionId: string;
}) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { user } = useAuthContext();

  const addError = (errMsg: string) => {
    setErrors((prev) => [...prev, errMsg]);
  };

  const submitAnswer = async () => {
    try {
      await RequestHelper.post<QADocument, void>(
        `/api/questions/pending/${questionId}`,
        {
          headers: {
            Authorization: user.token,
          },
        },
        {
          ...question,
          answer,
        },
      );
      setAnswer('');
      router.push('/admin');
    } catch (error) {
      addError('Failed to submit answer. Please try again later');
      console.log(error);
    }
  };

  if (!user || !isAuthorized(user))
    return (
      <div className="background h-screen">
        <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
          Unauthorized
        </div>
      </div>
    );

  return (
    <div className="p-6 background h-screen text-white">
      <div className="mt-[6rem]"></div>
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
        className="w-full rounded-xl p-4 input"
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here"
      ></textarea>
      <div className="flex flex-row justify-end my-4">
        <button
          type="button"
          className="p-2 rounded-lg font-semibold post hover:brightness-125"
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
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<QADocument>(
    `${protocol}://${context.req.headers.host}/api/questions/pending/${context.params.questionId}`,
    {},
  );
  return {
    props: {
      question: data,
      questionId: context.params.questionId,
    },
  };
};
