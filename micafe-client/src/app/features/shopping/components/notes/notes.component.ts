/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Output() onAddNote = new EventEmitter<string>();
  note: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content, { centered: true });
	}

  addNote(){
    this.onAddNote.emit(this.note);
  }
}
