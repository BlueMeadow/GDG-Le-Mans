
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Tag} from '../models/tag';
import {TagsService} from '../services/tags.service';
import {DialogData} from '../administration/administration.component';


@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css']
})
export class TagDialogComponent implements OnInit {

  oldTagString: string;

  constructor(private tagsService: TagsService,
              public dialogRef: MatDialogRef<TagDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if(this.data.edition) {
      this.oldTagString = this.data.tag.tagString;
    } else {
      this.data.tag = new Tag(0, "");
    }
  }

  ngOnInit(): void {
  }

  onConfirm() {
    if (this.data.edition) {
      console.warn('Edition du tag');
      this.tagsService.updateTag(this.data.tag).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
        });
    } else {
      console.warn("Creation du tag");
      this.tagsService.createTag(this.data.tag).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
        });
    }
  }

  onDelete() {
    // Not this.data.tag.tagString in case it has been modified.
    this.tagsService.deleteTag(this.data.tag.id).subscribe(
      (data) => {
      this.dialogRef.close();
    },
      (error) => {
        console.error("Tout a pété");
      });

  }

  onCancel() {
    this.dialogRef.close();
  }

}
