import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-asker',
  templateUrl: './question-asker.component.html',
  styleUrls: ['./question-asker.component.css']
})
export class QuestionAskerComponent implements OnInit {

  @Input() public question: any;
  @Output() nextQuestion = new EventEmitter<number[]>();
  public clicked = false;

  constructor(
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  checkAnswers() {
    this.clicked = true;
  }

  changeCheckbox(option) {
    option[2] = !option[2];
  }

  nextQ() {
    var score = 0;
    for (var i of this.question.options) {
      if (i[1] === i[2]){
        score++;
      }
    }
    this.nextQuestion.emit([score, this.question.options.length]);
  }
}
