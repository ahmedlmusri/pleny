import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { selectAuthState } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogedIn:boolean = false;
  carCount:number = 0;
  isSearching:boolean = false;
  searchInput: string = '';
  constructor(private store: Store<AuthState>,private cartService: CartService,private productServ: ProductsService){

  }
  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe((authState) => {
      if (authState.user) {
        this.isLogedIn = true
      }
    });
    this.productServ.isSearching.subscribe((res)=>{
      this.isSearching = false

    })
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  searchProduct(event:any){
    if(this.searchInput.length > 0){
      this.isSearching = true
    }
    this.productServ.searchingProduct.next(event.target.value);
  }
}
