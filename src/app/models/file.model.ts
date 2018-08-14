import { SafeResourceUrl } from "@angular/platform-browser";

export interface FileModel {
  fileName: string;
  description: string;
  uri: SafeResourceUrl;
}
