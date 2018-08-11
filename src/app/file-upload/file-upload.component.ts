import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileDataUri = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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

  uploadFile(event: Event) {
    event.preventDefault();
    // get only the base64 file and post it
    if (this.fileDataUri.length > 0) {
      const base64File = this.fileDataUri.split(',')[1];
      const data = {
        image: base64File,
        fileName: `myFileName.${this.getFileType()}`
      };
      this.http.post(`${environment.apiUrl}/upload-photos`, data, this.httpOptions)
        .subscribe(
          res => {
            console.log(res);
            // handle success
            // reset file input
            this.fileDataUri = '';
            this.fileInput.nativeElement.value = '';
          },
          err => {
            console.log(err);
            this.errorMsg = 'Could not upload image.';
          }
        );
    }

  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
  }

}