import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import Questions from './pytania';

const BAD_CHANCE = 0.2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public question: any = {'prompt':'', 'options':[]}
  public randId: number;
  public questionsAsked: number = 0;
  public questionsCorrect: number = 0;
  public questionsLeft: number;
  @ViewChild('askerRef') asker;

  constructor(
    private cdRef:ChangeDetectorRef
  ){}

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  ngOnInit() {
    this.nextQuestion([0, 0]);
  }

  nextQuestion(scores) {
    console.log(scores);
    if ((scores[0] === scores[1]) && !(scores[1] === 0)) {
      Questions.QUESTIONS.splice(this.randId, 1);
    }
    this.questionsCorrect += scores[0];
    this.questionsAsked += scores[1];
    this.asker.clicked = false;
    this.randId = this.rand(0, Questions.QUESTIONS.length-1);
    this.question = JSON.parse(JSON.stringify(Questions.QUESTIONS[this.randId]));
    for (var i = 0; i < this.question.options.length; i++) {
      this.question.options[i].push(false);
    }
    this.questionsLeft = Questions.QUESTIONS.length;
    console.log(Questions.QUESTIONS);
    this.cdRef.detectChanges();
  }

  reset() {
    window.location.reload();
  }
}
