import { Component } from '@angular/core';
import { RuleService } from '../../services/rule.service';
import { Subscription } from 'rxjs';
import { Rule } from '../../model/rule.model';

@Component({
  selector: 'app-pdf-viewer',
  standalone: false,

  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  subs: Subscription[] = [];
  item: Rule | null = null;
  isLoading: boolean = false;
  
  constructor(private service: RuleService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    var sub = this.service.get().subscribe((result: Rule) => {
      this.item=result
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
