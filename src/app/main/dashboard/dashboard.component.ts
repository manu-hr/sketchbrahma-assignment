import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentDate = new Date();
  incomeReportError = '';
  earningReportError = '';

  multi:any[] = [
    {
      name: "2020",
      series :[
        {
          name : "grossProfit",
          value :31
        },
        {
          name : "grossProfit1",
          value :31
        },
        {
          name : "grossProfit2",
          value :31
        },
      ]
    } ,

    {
      name: "2021",
      series :[
        {
          name : "grossProfit",
          value :21
        },
        {
          name : "grossProfit1",
          value :22
        },
        {
          name : "grossProfit2",
          value :23
        },
      ]
    } 
    
  ]

  multiLinechart : any[] | undefined;
  finalAnnualIncomeBarChartData : any[] | undefined;
  finalquaterlyIncomeBarChart : any [] | undefined;


  view:[number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Years';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Million USD';
  animations: boolean = true;
  //
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  xAxisLabelLineChart:string = 'fiscalDateEnding';
  yAxisLabelLineChart: string = 'reportedEPS';

  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService) { 
    
  }

  ngOnInit(): void {

        /** spinner starts on init */
    this.spinner.show();
    this.dashboardService.getIncomeReport().subscribe(data => {
      let AnnualIncomeBarChartData : any[] = [];
      let quaterlyIncomeBarChart : any [] = [];
      if(data.annualReports.length > 0){
        data.annualReports.forEach((element:any) => {
          AnnualIncomeBarChartData.push({
            "name" : element?.fiscalDateEnding,
            "series":[
              {
                "name":"netIncome",
                "value":element?.netIncome/1000000
              },
              {
                "name":"costOfRevenue",
                "value":element?.costOfRevenue/1000000
              },
              {
                "name":"grossProfit",
                "value":element?.grossProfit/1000000
              },
              {
                "name":"totalRevenue",
                "value":element?.totalRevenue/1000000
              },

            ]
          })
          
        });
       
        
      }
      if(data.quarterlyReports.length > 0){
        data.quarterlyReports?.forEach((element:any) => {
          quaterlyIncomeBarChart.push({
            "name" : element?.fiscalDateEnding,
            "series":[
              {
                "name":"netIncome",
                "value":element?.netIncome/1000000
              },
              {
                "name":"costOfRevenue",
                "value":element?.costOfRevenue/1000000
              },
              {
                "name":"grossProfit",
                "value":element?.grossProfit/1000000
              },
              {
                "name":"totalRevenue",
                "value":element?.totalRevenue/1000000
              },

            ]
          })
        });

      }
      this.finalAnnualIncomeBarChartData = AnnualIncomeBarChartData;
      this.finalquaterlyIncomeBarChart = quaterlyIncomeBarChart;  
      this.spinner.hide();

    }, (err) =>{
      console.log(err);
      this.incomeReportError = err?.message;
      this.spinner.hide();

    });


    this.dashboardService.getEarningsReport().subscribe(data => {
      console.log(data.annualEarnings);
      let multiLinechartData : any[] = [
        {
          "name": "AnnualEarnings",
          "series": []
        },
      ];
      if(data.annualEarnings.length > 0 ){
        data.annualEarnings.forEach((element: any) => {
          multiLinechartData[0].series.push({"name": element?.fiscalDateEnding, "value": element?.reportedEPS})
        });

      }
      this.multiLinechart = multiLinechartData;
      this.spinner.hide();
    },(err) =>{
      console.log(err);
      this.earningReportError = err?.message;
      this.spinner.hide();

    });

  }

  onSelect(event:Event) {
    console.log(event);
  }

  

}
