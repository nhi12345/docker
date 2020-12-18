import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-report-emission-field-page',
  templateUrl: './detail-report-emission-field-page.component.html',
  styleUrls: ['./detail-report-emission-field-page.component.scss'],
})
export class DetailReportEmissionFieldPageComponent implements OnInit {
  public fieldId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fieldId = Number(this.activatedRoute.snapshot.paramMap.get('fieldId'));
  }

  public cancel(): void {
    this.router.navigate(['/reports/emission-by-fields' + '/list-reports']);
  }
}
