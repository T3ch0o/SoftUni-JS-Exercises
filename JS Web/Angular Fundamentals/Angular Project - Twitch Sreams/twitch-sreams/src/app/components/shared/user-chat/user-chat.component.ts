import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChatService } from '../../../core/services/chat.service';
import { IStreamChat } from '../../../core/interfaces/stream-chat.interface';

@Component({
selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  @Input('username') username : string;
  public messageForm : FormGroup;
  public chat : IStreamChat[] = [];

  constructor(private fb : FormBuilder,
              private chatService : ChatService) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['', [ Validators.required ]]
    });
  }

  sendMessage() {
    this.chat.push({
      sender: 'gosho',
      content: this.messageForm.value.message
    });
    this.messageForm.reset();
  }

  onClose() {
    this.chatService.toggleForm(false, 'chat', '')
  }
}
