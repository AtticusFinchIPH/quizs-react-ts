import React from 'react';
import {Wrapper, ButtonWrapper} from './QuestionCard.styled';
import {AnswerObject} from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionN: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, answers, callback, userAnswer, questionN, totalQuestions
}) => {
    return (
        <Wrapper>
        <div>
            <p className="number">
                Question: {questionN} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question}} />
            <div>
                {answers.map(answer => (
                    <ButtonWrapper 
                    key={answer} 
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </div>
        </Wrapper>
    )
}

export default QuestionCard;