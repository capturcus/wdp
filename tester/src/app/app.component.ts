import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import Associations from './associations';
import { HttpClient } from '@angular/common/http';
declare let ClientJS: any;
import 'clientjs';

const BAD_CHANCE = 0.2;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

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
  public badQuestions = [];
  @ViewChild('askerRef') asker;

  constructor(
    private cdRef:ChangeDetectorRef,
    private http: HttpClient
  ){}

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  ngOnInit() {
    // hollyhock's spy shit
    const client = new ClientJS();
    let data = {
      'fingerprint': client.getFingerprint(),
      'agent': client.getUserAgent(),
      'browser': client.getBrowser(),
      'browserversion': client.getBrowserVersion(),
      'os': client.getOS(),
      'osversion': client.getOSVersion(),
      'device': client.getDeviceType(),
      'resolution': client.getCurrentResolution(),
      'lang': client.getLanguage()
    };
    this.http.post('https://wifi.sobiecki.pl/harbinger/', data).subscribe(x => console.log(x));
    this.nextQuestion(0);
  }

  makeQuestion() {
    this.randId = -1;
    let goodRand = this.rand(0, Associations.ASSOCIATIONS.length-1);
    let goodAss = Associations.ASSOCIATIONS[goodRand];
    let goodAnsId = this.rand(0, goodAss.associated.length-1);
    let goodAns = goodAss.associated[goodAnsId];
    let options = [];
    while (options.length !== 3) {
      let badRandId = this.rand(0, Associations.ASSOCIATIONS.length-1);
      if (badRandId === goodRand) {
        continue;
      }
      let badAss = Associations.ASSOCIATIONS[badRandId];
      let badAnsId = this.rand(0, badAss.associated.length-1);
      let badAns = badAss.associated[badAnsId];
      options.push([badAns, false]);
    }
    options.push([goodAns, true]);
    shuffle(options);
    let question = {
      'prompt': goodAss.main,
      'options': options
    };
    return question;
  }

  badChance() {
    return (1.-(1./(this.badQuestions.length/5)))
  }

  nextQuestion(good) {
    if (good === 1) {
      this.questionsCorrect++;
      this.questionsAsked++;
      if (this.randId >= 0) {
        this.badQuestions.splice(this.randId, 1);
      }
    } else if (good === -1) {
      this.badQuestions.push(this.question);
      this.questionsAsked++;
    }
    this.asker.clicked = false;
    this.questionsLeft = this.badQuestions.length;
    console.log(this.badChance());
    if (this.badQuestions.length !== 0 && Math.random() < this.badChance()) {
      this.randId = this.rand(0, this.badQuestions.length-1)
      this.question = this.badQuestions[this.randId];
    } else {
      this.question = this.makeQuestion();
    }
    this.cdRef.detectChanges();
  }

  reset() {
    window.location.reload();
  }
}
