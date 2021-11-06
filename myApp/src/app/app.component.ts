import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './services/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myApp';

  constructor(
    private readonly chatbot: ChatbotService
  ) {};

  ngOnInit() {
    this.chatbot.init();
  }
}

