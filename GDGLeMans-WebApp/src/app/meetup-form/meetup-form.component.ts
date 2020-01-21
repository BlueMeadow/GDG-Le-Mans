import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetupsService} from '../services/meetups.service';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Meetup} from '../models/meetup';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {GDGMeetup} from '../models/gdg-meetup';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Tag} from '../models/tag';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {TagsService} from '../services/tags.service';


import * as ClassicEditor from '../ckeditor5-build-classic';

@Component({
  selector: 'app-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.css']
})
export class MeetupFormComponent implements OnInit {

  meetup$: Observable<Meetup>;
  id: number;

  // Meetup Form
  meetupForm: FormGroup;
  tagCtrl: FormControl;
  filteredTagList: Observable<string[]>;
  autocompleteTagList: string[];
  tags: string[];
  public Editor = ClassicEditor;

  private imageUploadConfig = {
    types: [ 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff' ]
  };

  // Tag options list
  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private meetupsService: MeetupsService,
               private tagsService: TagsService,
               private location: Location,
               private formBuilder: FormBuilder) {
    console.log('MeetupForm Initialised');

    this.id = +this.route.snapshot.paramMap.get('id');
    //
    // this.Editor = ClassicEditor.create( document.querySelector( '#editor'), editorConfig)
    //                            .then(editor => {  console.log('Editor initialized', editor); })
    //                            .catch(error => { console.error( error.stack); });

    // FORM
    this.meetupForm = this.formBuilder.group({
      content: [],
      speakerName: ['', Validators.required],
    });

    this.meetup$ = this.meetupsService.getMeetup(this.id).pipe(
      tap(meetup => this.meetupForm.patchValue(
        {speakerName: meetup.gdgMeetup.speakerName,
          content: meetup.gdgMeetup.content}))
    );

    // TAGS
    this.tagCtrl = new FormControl();
    this.tags = [];
    this.autocompleteTagList = [];

    // Getting all the tags for the meetup
    this.meetup$.subscribe(
      (data) => {
        if (data.tags) {
          data.tags.forEach(t => this.tags.push(t.tagString));
        }
      },
      (error) => {
        console.log('err', error);
      });

    // Adding all tags to the autocomplete list
    this.tagsService.getTags().subscribe(tags =>
      tags.forEach(tag => this.autocompleteTagList.push(tag.tagString))
    );

    this.filteredTagList = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.autocompleteTagList.slice())
    );

  }

  async ngOnInit() {  }

  onSubmit(meetupData): void {

    const tags = [];
    this.tags.forEach(tagString => tags.push(new Tag(0, tagString)));

    const meetup = new Meetup(
      new GDGMeetup(this.id,
                    meetupData.speakerName,
                    meetupData.content),
                    null,
                    tags);
    console.warn(meetup);
    this.meetupsService.updateMeetup(meetup).subscribe(
      (data) => {
        // TODO: Reload the page or send back to administration page
        this.router.navigateByUrl('/meetups/' + this.id);
      },
      (error) => {
        console.log('err', error);
      });
  }

  OnDelete(): void {
    this.meetupsService.deleteMeetup(this.id).subscribe(
      (data) => {
        // TODO: Reload the page or send back to administration page
        this.router.navigateByUrl('/meetups/' + this.id);
      },
      (error) => {
        console.log('err', error);
      });
  }

  addTag(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent) {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.autocompleteTagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
