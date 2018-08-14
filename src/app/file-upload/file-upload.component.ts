import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FileUploadService } from './services/file-upload.service';
import { FileModel } from '../models/file.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public fileUploadForm: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;
  public carouselPhotos: FileModel[];
  fileDataUri = '';
  errorMsg = '';
  selectedTab = 0;
  isLoading = true;
  disabled = true;

  constructor(
    private fileUploadService: FileUploadService,
    private formatBuilder: FormBuilder,
    private storageService: StorageService
  ) {
    this.createForm();
  }

  createForm() {
    this.fileUploadForm = this.formatBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit() {
    this.fileUploadService.getFiles().subscribe((files) => {
      this.isLoading = false;
      this.carouselPhotos = files
      if (files.length === 0) {
        this.selectedTab = 1;
      } else {
        this.disabled = false;
      }
    });
  }

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  private fileExtension = {
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

  private getFile(): any {
    return this.fileInput.nativeElement.files[0];
  }

  private getFileType(): any {
    return this.fileExtension[this.getFile().type];
  }

  openInput(): void { 
    this.clearForm();
    this.fileInput.nativeElement.click();
  }

  previewFile() {
    const file = this.getFile();
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      }
    } else {
      this.errorMsg = 'File must be jpg, png, or gif and cannot be exceed 500 KB in size'
    }
  }

  private clearForm() {
    this.fileDataUri = '';
    this.fileInput.nativeElement.value = '';
    this.errorMsg = '';
    this.fileUploadForm.reset();
  }

  uploadFile(event: Event) {
    event.preventDefault();
    // get only the base64 file and post it
    if (this.fileDataUri.length > 0) {
      const base64File = this.fileDataUri.split(',')[1];
      const data = {
        image: base64File,
        fileName: `${this.storageService.getUserId()}/${Date.now()}.${this.getFileType()}`
      };

      this.fileUploadService.uploadFile(data)
        .subscribe(
          res => {
            const newFile = <FileModel>{
              fileName: data.fileName,
              description: this.fileUploadForm.get('description').value
            };

            this.fileUploadService.saveFile(newFile).subscribe(res => {
              this.selectedTab = 0;
              this.disabled = false;
              this.carouselPhotos.push(this.fileUploadService.mapFileUri(newFile));
              this.clearForm();
            }, err => {
              this.errorMsg = 'Could not upload image.';
            });
          },
          err => {
            this.errorMsg = 'Could not upload image.';
          }
        );
    }

  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
  }

}