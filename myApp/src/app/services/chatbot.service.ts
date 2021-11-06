import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare const RiveScript;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  bot:any;

  constructor() { }

  init(){
    this.bot = new RiveScript({utf8: true});
    this.bot.loadFile("assets/brain.rive").then(() => this.beginChat()).catch(error => console.log(error));
  }

  beginChat(){
    this.bot.sortReplies();
  }

  async askBot(question:string, user="user"){
   return await this.bot.reply(user,question);
  }

}
