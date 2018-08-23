import { Action } from '@ngrx/store';

export const GET_ALL_STREAMS = '[STREAMS] Get All';
export const REMOVE_STREAM = '[STREAM] Remove';

export class GetStreams implements Action {
  readonly type = GET_ALL_STREAMS;

  constructor(public payload : Object[]) {}
}

export class RemoveStream implements Action {
  readonly type = REMOVE_STREAM;

  constructor(public payload : number) {}
}

export type Actions = GetStreams | RemoveStream;
