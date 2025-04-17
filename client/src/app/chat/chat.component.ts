import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  userMessage = '';
  botReply = '';
  welcomeMessage = '';

  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    this.welcomeMessage = 'Welcome, Nidhi! Ask me anything. 😊';
  }

  sendMessage(): void {
    this.chatService.sendToBackend(this.userMessage).subscribe({
      next: (res) => this.botReply = res.reply,
      error: () => this.botReply = 'Oops, something went wrong!'
    });

  }

}
