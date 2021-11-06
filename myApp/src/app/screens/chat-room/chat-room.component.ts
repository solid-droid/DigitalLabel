import { Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';
declare const $;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  convForm:any;
  constructor(
    private readonly chatbot : ChatbotService
  ) { }

  async ngOnInit(){
		this.convForm = $('#chat').convform({
      typeInputUi: 'input',
      selectInputStyle: 'disable',
      selectInputDisabledText:'Pick an answer.',
      eventList: {
                  onInputSubmit: async (convState, ready) => {
                          if(convState.current.input.type == 'input'){
                            const answer = await this.chatbot.askBot(convState.current.answer.text);
                            getResponce(convState, {ques: answer});
                          }
                         
                          if(convState.current.input.type == 'select'){
                            const selection = convState.current.input.selected;
                            if( selection == '_product'){
                              getResponce(convState, {ques: 'Please type your product related issue.'});
                            } else if( selection == '_order'){
                              getResponce(convState, {ques: 'Please type your order related issue.'});
                            } else if ( selection == 'other') {
                              getResponce(convState, {ques: 'Please type your issue.'});
                            }
                          }
                          
                          setTimeout(ready, Math.random()*100);
                  }
      }
		});		        

		const getResponce = (convState, options:any = {}) => {
      const type = options.type || 'input';
      const ques = options.ques || 'Sorry, I cant find anything for that';
      const answers = options.answers || [];
			convState.current.next = convState.newState({
						type,
						questions: [ques],
						answers,
				});
		}

    await new Promise(r => setTimeout(r, 100));
    $('div.conv-form-wrapper div.wrapper-messages').css({'max-height': 'unset'});
    $('.spinLoader').hide();
    $('.submit').hide();
    if(window.innerWidth<=600){  
      $('#convForm').css({width: '100%' , margin: '0', padding: '0'});
      $('#userInput').css({'max-width':'100%' , width:'90%', margin:'5px'}); 
      $("#userInput").keyup(event => {
        if (event.keyCode === 13) {
          $("#userInput").blur();
        }
      });
    } else {
      $('#convForm').css({width: '90%' , margin: '0', padding: '0'});
      $('#userInput').css({'max-width':'100%' , width:'97%', margin:'5px'});
    }
  }
}