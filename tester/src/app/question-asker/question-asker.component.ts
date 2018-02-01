import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-asker',
  templateUrl: './question-asker.component.html',
  styleUrls: ['./question-asker.component.css']
})
export class QuestionAskerComponent implements OnInit {

  @Input() public question: any;
  @Output() nextQuestion = new EventEmitter<number>();
  public clicked = false;
  clickedOption;
  good: number = 0;

  constructor(
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  selected(option) {
    if (option[1]) {
      // good
      this.good = 1;
    } else {
      this.good = -1;
    }
    this.clicked = true;
    this.clickedOption = option;
    this.cdRef.detectChanges();
  }

  continued() {
    var oldGood = this.good;
    this.good = 0;
    this.nextQuestion.emit(oldGood);
  }

}
