import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() profilePic!: string
  @Output() selectedProfilePicture: EventEmitter<string> = new EventEmitter<string>();

  profileImage: any;
  constructor() {}
  ngOnInit() {
    this.profileImage = this.profilePic
  }

  onSubmit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.readFile(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    this.readFile(file);
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.profileImage = e.target.result;
      this.selectedProfilePicture.emit(this.profileImage)
    };
    reader.readAsDataURL(file);
  }
}
