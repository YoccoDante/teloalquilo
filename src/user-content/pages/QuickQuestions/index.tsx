import { Container } from "@mui/material"
import { list_of_questions } from "../../../assets/QuestionsData/questions"
import "./index.css"
import QuestionCard from "../../../components/QuestionCard"

function QuickQuestions() {
  return (
    <Container>
      <article className="QuestionContainer">
          {list_of_questions.map((question) => (
              <QuestionCard key={question.question} question={question}/>
          ))}
      </article>
    </Container>
  )
}

export default QuickQuestions