import { Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'news';
  editorContent: string = '';
  init: EditorComponent['init'] = {
    plugins:
      'preview quickbars media image fullscreen link lists advlist searchreplace nonbreaking emoticons autolink autosave save directionality visualblocks visualchars fullscreen link table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons accordion',
    toolbar:
      'undo redo fontfamily blocks fontsizeinput alignleft aligncenter alignright alignjustify bold italic underline strikethrough forecolor backcolor media image removeformat removeformat lineheight outdent link numlist bullist subscript superscript blockquote accordion visualblocks table visualchars searchreplace preview anchor fullscreen autoresize emoticons pagebreak ltr rtl nonbreaking paste pastetext',
    style_formats: [
      { title: 'Align Left', block: 'div', styles: { textAlign: 'left' } },
      { title: 'Align Center', block: 'div', styles: { textAlign: 'center' } },
      { title: 'Align Right', block: 'div', styles: { textAlign: 'right' } },
    ],
    quickbars_image_toolbar: false,
    quickbars_insert_toolbar: false,
    placeholder: 'خبر خود را وارد کنید...',
    // a11y_advanced_options: true
  };

  // get sanitizedHtml

  onEditorChange(content: string) {
    this.editorContent = content;
    console.log('ویرایشگر تغییر کرد:', this.editorContent);
  }
}
