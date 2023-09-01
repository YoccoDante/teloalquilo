import { QuestionInterface } from '../../assets/QuestionsData/questions'
import './index.css'

function QuestionCard( {question}:{question:QuestionInterface} ) {
  return (
    <div className="super-box">
        <div className="container">
            <div className="box" content={question.answer}>
            <div className="icon_bg"></div>
        </div>
        <div className="icon">
            {question.icon}
        </div>
    </div>
    <div className="text">
        <p className="title">
            {question.question}
        </p>
    </div>
    </div>
  )
}

export default QuestionCard