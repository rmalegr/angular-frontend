import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this._productService.getProducts().subscribe(
      (data: any) => {
        console.log(data);
      })
  }

}
