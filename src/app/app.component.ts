import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
}

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

  ngOnInit(): void {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    //transforming the data from the web service into a useable format 
    this.quizzes = quizzes.map(x => ({
      quizName: x.name
      , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name  
      }))
    }));

    console.log(this.quizzes);
  }

  quizzes: QuizDisplay[] = [];

  // selectedQuiz need to have type undefined in order to be assignable as the base state
  selectedQuiz: QuizDisplay | undefined = undefined

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };
}
