import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { IStreamChat } from '../../../core/interfaces/stream-chat.interface';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { RegisterStreamService } from '../../../core/services/register-stream.service';
import { UserConnection } from '../../../core/models/user-connection.model';

@Component({
  selector: 'app-stream-chat',
  templateUrl: './stream-chat.component.html',
  styleUrls: ['./stream-chat.component.css']
})
export class StreamChatComponent implements OnInit {
  @Input('streamId') streamId : string;

  public messageForm : FormGroup;
  public chat : IStreamChat[] = [];
  private connection : UserConnection;

  constructor(private store : Store<AppState>,
              private fb : FormBuilder,
              private authService : AuthenticationService,
              private registerService: RegisterStreamService,
              ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['', [ Validators.required ]]
    });

    setTimeout(() => {
      this.registerService.registerStream(this.streamId);

      setTimeout(() => {
        this.connection = new UserConnection(this.authService.currentUser.username, this.streamId, (event) => {
          this.chat.push(JSON.parse(event.data));
        });
      }, 250);
    }, 250);
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      this.connection.send(message);

      this.messageForm.reset();
    }
  }
}
