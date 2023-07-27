import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isAuthorized } from '..';
import ErrorList from '../../../components/ErrorList';
import PendingQuestion from '../../../components/dashboardComponents/PendingQuestion';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { QADocument } from '../../api/questions';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="py-6 2xl:px-32 md:px-16 px-6">
      <Link href="/admin" passHref>
        <div className="cursor-pointer items-center inline-flex text-primaryDark font-bold md:text-lg text-base">
          <ChevronLeftIcon />
          return to event dashboard
        </div>
      </Link>
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
        className="w-full rounded-xl p-4 bg-secondary border-transparent focus:border-primaryDark caret-primaryDark"
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here"
      ></textarea>
      <div className="flex flex-row justify-end my-4">
        <button
          type="button"
          className="p-2 rounded-lg font-medium hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
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
