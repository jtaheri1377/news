import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorComponent } from '@tinymce/tinymce-angular';
@Component({
  selector: 'app-news-editor',
  standalone: false,

  templateUrl: './news-editor.component.html',
  styleUrl: './news-editor.component.scss',
})
export class NewsEditorComponent {
  @Output() EditorChange = new EventEmitter<string>();
  editorContent: string = '';
  // init: EditorComponent['init'] = {
  //   plugins:
  //     'preview quickbars media image fullscreen link lists advlist searchreplace nonbreaking emoticons autolink autosave save directionality visualblocks visualchars fullscreen link table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons accordion',
  //   toolbar:
  //     'undo redo fontfamily blocks fontsizeinput alignleft aligncenter alignright alignjustify bold italic underline strikethrough forecolor backcolor media image removeformat removeformat lineheight outdent link numlist bullist subscript superscript blockquote accordion visualblocks table visualchars searchreplace preview anchor fullscreen autoresize emoticons pagebreak ltr rtl nonbreaking paste pastetext',
  //   // style_formats: [
  //   //   { title: 'Align Left', block: 'div', styles: { textAlign: 'left' } },
  //   //   { title: 'Align Center', block: 'div', styles: { textAlign: 'center' } },
  //   //   { title: 'Align Right', block: 'div', styles: { textAlign: 'right' } },
  //   // ],

  //   style_formats_merge: true,
  //   quickbars_image_toolbar: false,
  //   quickbars_insert_toolbar: false,
  //   placeholder: 'محتوای خبری را وارد کنید...',
  //   // a11y_advanced_options: true
  // };


//   init: EditorComponent['init'] = {
//   base_url: '/tinymce',  // مسیر به فایل‌های لوکال
//   suffix: '.min',        // فایل‌های minified رو استفاده کن
//   plugins: '...',
//   toolbar: '...',
//   // بقیه تنظیمات مثل قبل
// };

init: EditorComponent['init'] = {
  base_url: '/packages/tinymce', // ✅ اضافه کن
  suffix: '.min',         // ✅ اضافه کن
  plugins:
    'preview quickbars media image fullscreen link lists advlist searchreplace nonbreaking emoticons autolink autosave save directionality visualblocks visualchars fullscreen link table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons accordion',
  toolbar:
    'undo redo fontfamily blocks fontsizeinput alignleft aligncenter alignright alignjustify bold italic underline strikethrough forecolor backcolor media image removeformat removeformat lineheight outdent link numlist bullist subscript superscript blockquote accordion visualblocks table visualchars searchreplace preview anchor fullscreen autoresize emoticons pagebreak ltr rtl nonbreaking paste pastetext',
  style_formats_merge: true,
  readonly: false,
  quickbars_image_toolbar: false,
  quickbars_insert_toolbar: false,
  placeholder: 'محتوای خبری را وارد کنید...',
};


  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.editorContent!);
  }

  clearEditor() {
    this.editorContent = '';
    this.onEditorChange('');
  }

  // get sanitizedHtml

  onEditorChange(content: string) {
    this.editorContent = content;
    this.EditorChange.next(content);
  }
}
