import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AnsweredQuestion from '../../components/dashboardComponents/AnsweredQuestion';
import ErrorList from '../../components/ErrorList';
import PendingQuestion from '../../components/dashboardComponents/PendingQuestion';
import { RequestHelper } from '../../lib/request-helper';
import { useAuthContext } from '../../lib/user/AuthContext';
import { QAReqBody } from '../api/questions';
import DashboardHeader from '../../components/dashboardComponents/DashboardHeader';
/**
 * The Question and Answers page.
 *
 * This page is where Hackers can submit questions and then organizers can answer them.
 *
 * Route: /dashboard/questions
 */
export default function QuestionsPage() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [pendingQuestions, setPendingQuestions] = useState<PendingQuestion[]>([]);
  const [answeredQuestionDisclosureStatus, setAnsweredDisclosureStatus] = useState<boolean[]>([]);
  const { user, isSignedIn, hasProfile } = useAuthContext();

  /**
   *
   * Fetch all answered questions that are asked by current user
   * @returns a list of questions and answers if user is signed in, otherwise an empty list will be returned
   *
   */
  const getMyAnsweredQuestions = async (): Promise<AnsweredQuestion[]> => {
    if (!user) {
      return [];
    }
    const { data } = await RequestHelper.get<AnsweredQuestion[]>(
      `/api/questions/${user.id}/answered`,
      {},
    );
    return data;
  };

  /**
   *
   * Fetch all unanswered questions that are asked by current user
   * @returns a list of questions if user is signed in, otherwise an empty list will be returned
   *
   */
  const getMyPendingQuestions = async () => {
    if (!user) {
      return [];
    }
    const { data } = await RequestHelper.get<PendingQuestion[]>(
      `/api/questions/${user.id}/pending`,
      {},
    );
    return data;
  };

  /**
   *
   * Add a new error message to the error list
   * @param errMsg error message
   *
   */
  const addError = (errMsg: string) => {
    setErrors((prev) => [...prev, errMsg]);
  };

  /**
   *
   * Process a question submitted by user
   * If user is not sign in, an alert will pop up telling user to sign in
   * Otherwise, question will be sent to organizers
   *
   */
  const submitQuestion = async () => {
    if (user === null) {
      addError('You must log in to be able to ask question');
      return;
    }
    try {
      await RequestHelper.post<QAReqBody, {}>(
        '/api/questions/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          userId: user.id,
          question: currentQuestion,
        },
      );
      setCurrentQuestion('');
    } catch (error) {
      addError('Failed to send question. Please try again later.');
      console.error(error);
    }
  };

  /**
   * Merge list of answered questions and unanswered questions into 1 object
   * @returns an object containing all questions asked by user
   */
  const getAllQuestions = async () => {
    const answeredQuestions = await getMyAnsweredQuestions();
    const pendingQuestions = await getMyPendingQuestions();
    return {
      answeredQuestions,
      pendingQuestions,
    };
  };

  useEffect(() => {
    setLoading(true);
    getAllQuestions().then(({ answeredQuestions, pendingQuestions }) => {
      setAnsweredQuestions(answeredQuestions);
      setPendingQuestions(pendingQuestions);
      setAnsweredDisclosureStatus(new Array(answeredQuestions.length).fill(true));
      setLoading(false);
    });
  }, [user]);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#9CA6FF',
    },
    {
      light: '#D8F8FF',
      dark: '#00E0FF',
    },
    {
      dark: '#F8ACFF',
      light: '#FDECFF',
    },
  ];

  if (loading)
    return (
      <div className="mx-auto text-secondary text-3xl mt-4">
        <h1>Loading...</h1>
      </div>
    );

  if (!isSignedIn)
    return (
      <div className="text-2xl font-black text-center">
        Please sign-in to ask organizers questions
      </div>
    );

  return (
    <div className="2xl:px-32 md:px-16 px-6 flex flex-col flex-grow bg-[url('/assets/hero-bg.png')]">
      <Head>
        <title>HackUTD X - Questions</title> {/* !change */}
        <meta name="description" content="HackUTD X's Quesiton and Answer Page " /> {/* !change */}
      </Head>
      <DashboardHeader />
      <ErrorList
        errors={errors}
        onClose={(idx: number) => {
          const newErrorList = [...errors];
          newErrorList.splice(idx, 1);
          setErrors(newErrorList);
        }}
      />
      <div className="lg:mt-12 mt-8 flex flex-col gap-y-3">
        <h4 className="font-bold text-3xl text-[#FFFCF9]">Ask the organizers a question!</h4>
        <div>
          <textarea
            className="w-full rounded-xl p-4 bg-secondary border-transparent focus:border-primaryDark caret-primaryDark"
            rows={5}
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Type your question here"
          ></textarea>
          <div className="flex flex-row justify-end my-4">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-secondary bg-primaryDark text-secondary hover:text-primaryDark border-[1px] border-transparent hover:border-primaryDark transition duration-300 ease-in-out"
              onClick={() => {
                submitQuestion();
              }}
            >
              Submit Question
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-2xl text-[#FFFCF9]">My Pending Questions</h4>
          {user ? (
            pendingQuestions.map(({ question }, idx) => (
              <PendingQuestion key={idx} question={question} />
            ))
          ) : (
            <h1 className="p-3">Sign in to see your questions</h1>
          )}
        </div>

        <div className="my-4">
          <h4 className="font-bold text-2xl text-[#FFFCF9]">My Answered Questions</h4>
          {user ? (
            answeredQuestions.map(({ question, answer }, idx) => (
              <AnsweredQuestion
                key={idx}
                question={question}
                answer={answer}
                colorCode={colorSchemes[idx % 3].light}
                iconColorCode={'#F6CC82'}
                isOpen={answeredQuestionDisclosureStatus[idx]}
                toggleDisclosure={() => {
                  let currStatus = [...answeredQuestionDisclosureStatus];
                  currStatus[idx] = !currStatus[idx];
                  setAnsweredDisclosureStatus(currStatus);
                }}
              />
            ))
          ) : (
            <h1 className="p-3">Sign in to see your questions</h1>
          )}
        </div>
      </div>
    </div>
  );
}
