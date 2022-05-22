import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/external/http.service";
import {IMessage, IRate} from "../../models/models";
import {MessageService} from "primeng/api";
import {debounceTime, distinctUntilChanged, finalize, takeUntil} from "rxjs/operators";
import {Table} from "primeng/table";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit, OnDestroy {
  exchangeRates: IRate[] = [];
  loading: boolean = true;
  messages: IMessage[] = [
    {severity:'success', summary:'Success', detail:'Exchange rates have been successfully received'},
    {severity:'info', summary:'Info', detail:'Enter the correct date formate YYYY-MM-DD'},
    {severity:'error', summary:'Error', detail:'Error receiving currency rates. Please try again...'},
  ];


  dateField = new FormControl()

  destroy$ = new Subject();

  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllRates()

    this.dateField.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(date => {
        if (date) {
          const parsedDate = new Date(date).toISOString().slice(0, 10)
          this.httpService.getRatesByDate(parsedDate)
            .pipe(
              finalize(() => this.loading = false)
            )
            .subscribe(i => {
                i.forEach(el => this.exchangeRates = [...el.rates])
                console.log(i)
                this.showViaService(this.messages[0])
              },
              () => this.showViaService(this.messages[2]))
        }
      })
  }

  getAllRates() {
    this.httpService.getRates()
      .pipe(
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe(
        i => {
          i.forEach(el => this.exchangeRates = [...el.rates]);
          this.showViaService(this.messages[0]);
        },
        () => this.showViaService(this.messages[2])
      )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear(table: Table) {
    table.clear();
    this.dateField.setValue('')
    this.getAllRates()
  }

  showViaService(message: IMessage) {
    this.messageService.add(message);
    setTimeout(() => {
      this.messageService.clear()
    }, 4000)
  }

}
