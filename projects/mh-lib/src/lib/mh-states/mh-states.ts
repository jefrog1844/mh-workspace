import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  Renderer2,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { State } from './state';
import { StatesService } from './states-service';

@Component({
  selector: 'lib-mh-states',
  imports: [CommonModule],
  templateUrl: './mh-states.html',
  styleUrl: './mh-states.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MhStates),
      multi: true,
    },
  ],
})
export class MhStates implements AfterViewInit, ControlValueAccessor {
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() id?: any;

  @Input() size?: string;

  @Input() label?: string;

  @Input() required?: boolean = false;

  select = viewChild.required<ElementRef>('select');
  #statesService = inject(StatesService);

  constructor(private renderer: Renderer2, private wrapper: ElementRef) {}

  statesResource: HttpResourceRef<State[]> = this.#statesService.getStatesResource();

  ngAfterViewInit(): void {
    // cache references to select and wrapper
    const selectEl: HTMLInputElement = this.select().nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(selectEl).focus();
    }

    // set attributes
    ['id', 'placeholder', 'required'].forEach((attrName) => {
      const attrVal = (this as any)[attrName];
      if (attrVal) {
        this.renderer.setAttribute(selectEl, attrName, attrVal);
      }
    });

    // set size
    ['size'].forEach((attrName) => {
      const attrVal = (this as any)[attrName];
      if (attrVal) {
        this.renderer.addClass(selectEl, 'form-control-' + attrVal);
      }
    });

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'id');

    // set the selected index
    const index = this.statesResource
      .value()
      .findIndex((option) => option.title === this.select().nativeElement.value);
    this.renderer.setProperty(this.select().nativeElement, 'selectedIndex', index);
  }

  /**
   * This code listens for updates from the component and
   * writes them to the native <select> element
   *
   * NOTE: writeValue gets called before ngOnInit Angular issue #29218
   * Side effect of the issue is that trying to access the selectEl
   * cached in ngOnInit will result in undefined error in writeValue.
   * This also requires ViewChild({static: true}) in order for select to
   * be available before onChange is called.
   * @param value - value from <mui-select>
   */
  writeValue(value: any): void {
    // update select field with value received from outer component
    this.renderer.setProperty(this.select().nativeElement, 'value', value);
  }

  /**
   * Code below this point is all boilerplate - DO NOT CHANGE
   */
  onTouched = () => {};
  onChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}
