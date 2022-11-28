import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

//Object that shapes data needed to display quizzes
interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
}

//Object that shapes data needed to display quiz questions
interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  // Dependency Injection occurs in constructor parameter 
  constructor(  
    public quizSvc:  QuizService
  ) {

  }
  //Load dummy quizzes from service
  ngOnInit(): void {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    //transforming the data from the web service into a useable object format
    this.quizzes = quizzes.map(x => ({
      quizName: x.name
      , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name  
      }))
    }));

    console.log(this.quizzes);
  }

 
  quizzes: QuizDisplay[] = [];

  // selectedQuiz need to have type undefined in order to be assignable as the base state?
  selectedQuiz: QuizDisplay | undefined = undefined

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };


  // Create quiz object, Add new quiz to copied array of quizzes 
  addQuiz = () => {
    const quiz = {
      quizName: "Untitled Quiz"
      , quizQuestions: []
    };
    console.log(quiz);

    // Use spread operator to clone quiz array, add new quiz to array
    this.quizzes = [
      ...this.quizzes 
      , quiz
    ];
  };

}
