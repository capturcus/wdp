import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import Questions from './pytania';
import { HttpClient } from '@angular/common/http';
declare let ClientJS: any;
import 'clientjs';

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
    private cdRef:ChangeDetectorRef,
    private http: HttpClient
  ){}

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  ngOnInit() {
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
    // this.http.post('https://wifi.sobiecki.pl/harbinger/', data).subscribe(x => console.log(x));
    this.nextQuestion(0);
  }

  nextQuestion(good) {
    if (good === 1) {
      this.questionsCorrect++;
      this.questionsAsked++;
      Questions.QUESTIONS.splice(this.randId, 1);
    } else if (good === -1) {
      this.questionsAsked++;
    }
    this.asker.clicked = false;
    this.randId = this.rand(0, Questions.QUESTIONS.length-1);
    this.question = Questions.QUESTIONS[this.randId];
    this.questionsLeft = Questions.QUESTIONS.length;
    this.cdRef.detectChanges();
  }

  reset() {
    window.location.reload();
  }
}
