import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-report-page',
  templateUrl: './detail-report-page.component.html',
  styleUrls: ['./detail-report-page.component.scss'],
})
export class DetailReportPageComponent implements OnInit {
  public reportId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reportId = Number(this.activatedRoute.snapshot.paramMap.get('reportId'));
  }

  public cancel(): void {
    this.router.navigate(['/reports/' + '/list-reports']);
  }
}
