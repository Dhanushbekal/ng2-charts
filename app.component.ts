declare var require: any;
// import data from 'src/assets/data/Total Cost By Month.csv';
import { AfterViewInit, Component } from '@angular/core';
import ExportingModule from 'highcharts/modules/exporting';
import SunsetTheme from 'highcharts/themes/sunset.js';
import * as Highcharts from "highcharts";
 
// import * as CSV from 'highcharts/modules/data';
// import data from "highcharts/modules/data"
// import { data as CSV } from 'highcharts/modules/data';
import * as CSV from 'highcharts/modules/data';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartData, ChartOptions } from 'chart.js';



// The modules will work for all charts.
ExportingModule(Highcharts);
SunsetTheme(Highcharts);
// async function readCSVFile(file: File) {
//   const result = await new Promise<Array<any>>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = () => {
//       const csv = reader.result as string;
//       const data = CSV.parse(csv) as Array<Array<any>>;
//       const keys = data.shift();
//       const arrayOfObjects = data.map(row => {
//         return row.reduce((obj, value, index) => {
//           obj[keys[index]] = value;
//           return obj;
//         }, {});
//       });
//       resolve(arrayOfObjects);
//     };
//     reader.onerror = () => {
//       reject(reader.error);
//     };
//   });
//   return result;
// }

// Highcharts.setOptions({
//   title: {
//     style: {
//       color: 'tomato'
//     },
//   },
//   legend: {
//     enabled: false
//   }

// });

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  chart: any;
  public data: any;
  dataPoints: any = [];
  showChart: Boolean = false;
  finaldata:any[]=[];

  public barChartLegend = true;
  public barChartPlugins = [];

   public barChart1Options: ChartOptions = {
    plugins:{
      title:{
        display:true,
        text:'Total Cost by Month',
        font:{
          size:15
        },
      },
    },
    responsive:true,
  };

  constructor(private http: HttpClient) {

  }

  chartOptions = {
    animationEnabled: true,
    theme: 'light1', //"light2", "dark1", "dark2"
    title: {
      text: 'Angular Chart with CSV Data',
    },
    axisX: {
      reversed: true,
    },
    axisY: {
      title: 'Marks Scored (Out of 100)',
      includeZero: true,
    },
    data: [
      {
        dataPoints: this.dataPoints,
      },
    ],
  };
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  ngAfterViewInit() {
    this.http
      .get('assets/data/Total_Cost_By_Month.csv', {
        responseType: 'text',
      })
      .subscribe((response: any) => {
        let csvRowData = response.split(/[\r?\n|\r|\n]+/);
        csvRowData.forEach((rowData: any, index: number) => {
          if (index === 0) return;
          var data = rowData.split(',');
          this.dataPoints.push({ label: data[0], y: parseInt(data[1]) });
          // console.log(data)
          this.finaldata.push(data)
          
        });
        console.log(this.finaldata)
        // this.finaldata=csvRowData;
        // this.showChart = true;
        let parseddata;
        let temp=this.finaldata[0][0];
        let sum=0;
        for(let i of this.finaldata){
          
          if(temp==i[0]){
            if(i[2]==""){
              continue; 
            }
            sum+=parseInt(i[2]); 
            console.log(i[2])
          }
          if(temp!=i[0]){
            // console.log(sum)
            console.log("-----")
            if(i[2]==""){
              continue; 
            }
            sum=parseInt(i[2]);
          }
          temp=i[0]
        }
      });
  }
}
