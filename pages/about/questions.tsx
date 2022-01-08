import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AboutHeader from '../../components/AboutHeader';
import AnsweredQuestion from '../../components/AnsweredQuestion';
import ErrorList from '../../components/ErrorList';
import PendingQuestion from '../../components/PendingQuestion';
import { RequestHelper } from '../../lib/request-helper';
import { useAuthContext } from '../../lib/user/AuthContext';
import { QAReqBody } from '../api/questions';

/**
 * The Question and Answers page.
 *
 * This page is where Hackers can submit questions and then organizers can answer them.
 *
 * Route: /about/questions
 */
export default function QuestionsPage() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [pendingQuestions, setPendingQuestions] = useState<PendingQuestion[]>([]);
  const [answeredQuestionDisclosureStatus, setAnsweredDisclosureStatus] = useState<boolean[]>([]);
  const { user, isSignedIn } = useAuthContext();

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
      addError('You must login to be able to ask question');
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

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <Head>
          <title>HackUTD VIII - Questions and Answers</title>
          <meta
            name="description"
            content="Ask a question and get a response from an organizer for HackUTD VIII!"
          />
        </Head>
        <AboutHeader active="/about/questions" />
        <div>
          <ErrorList
            errors={errors}
            onClose={(idx: number) => {
              const newErrorList = [...errors];
              newErrorList.splice(idx, 1);
              setErrors(newErrorList);
            }}
          />
          <section className="py-4">
            <div className="font-bold text-3xl py-2">
              {!isSignedIn ? 'Sign in to ask a question.' : 'Ask a question'}
            </div>
            <div>
              <textarea
                className="w-full rounded-xl p-4 bg-[#3d423b]"
                rows={5}
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Type your question here"
                disabled={!isSignedIn}
              />
              <div className="flex flex-row justify-end my-4">
                <button
                  type="button"
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: 'black', color: '#66e900' }}
                  onClick={() => {
                    if (!isSignedIn) {
                      addError('Please sign in to ask a question.');
                      return;
                    }
                    if (currentQuestion === '') {
                      addError('Question cannot be empty.');
                      return;
                    }
                    submitQuestion();
                  }}
                >
                  Submit Question
                </button>
              </div>
            </div>
          </section>

          {isSignedIn && (
            <div>
              <div className="font-bold text-2xl">Your unanswered questions</div>
              {pendingQuestions.map(({ question }, idx) => (
                <PendingQuestion key={idx} question={question} />
              ))}
            </div>
          )}

          <div className="my-4">
            <h4 className="font-bold text-2xl">Answered questions</h4>
            {user ? (
              answeredQuestions.map(({ question, answer }, idx) => (
                <AnsweredQuestion
                  key={idx}
                  question={question}
                  answer={answer}
                  colorCode={colorSchemes[idx % 3].light}
                  iconColorCode={colorSchemes[idx % 3].dark}
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
    </div>
  );
}
