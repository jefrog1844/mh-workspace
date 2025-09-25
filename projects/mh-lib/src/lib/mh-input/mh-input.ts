import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-mh-input',
  imports: [],
  templateUrl: './mh-input.html',
  styleUrl: './mh-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MhInput),
      multi: true,
    },
  ],
})
export class MhInput implements AfterViewInit, ControlValueAccessor {
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() placeholder?: string;

  @Input() id?: any;

  @Input() size?: string;

  @Input() label?: string;

  @Input() maxlength?: string;

  @Input() minlength?: string;

  @Input() required?: boolean = false;

  @Input() type?: 'number' | 'text' | 'password' | 'email' = 'text';

  input = viewChild.required<ElementRef>('input');

  constructor(private renderer: Renderer2, private wrapper: ElementRef) {}

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLInputElement = this.input().nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(inputEl).focus();
    }

    // set attributes
    ['id', 'minlength', 'maxlength', 'placeholder', 'required', 'type'].forEach((attrName) => {
      const attrVal = (this as any)[attrName];
      if (attrVal) {
        this.renderer.setAttribute(inputEl, attrName, attrVal);
      }
    });

    // set size
    ['size'].forEach((attrName) => {
      const attrVal = (this as any)[attrName];
      if (attrVal) {
        this.renderer.addClass(inputEl, 'form-control-' + attrVal);
      }
    });

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'minlength');
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
    this.renderer.removeAttribute(wrapperEl, 'id');
  }

  /**
   * This code listens for updates from the component and
   * writes them to the native <input> element
   *
   * NOTE: writeValue gets called before ngOnInit Angular issue #29218
   * Side effect of the issue is that trying to access the inputEl
   * cached in ngOnInit will result in undefined error in writeValue.
   * This also requires ViewChild({static: true}) in order for input to
   * be available before onChanges is called.
   * @param value - value from <mui-input>
   */
  writeValue(value: any): void {
    // update input field with value received from outer component
    this.renderer.setProperty(this.input().nativeElement, 'value', value);
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
