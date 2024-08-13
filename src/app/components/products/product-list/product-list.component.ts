import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: any[] = [];
  categories: any[] = [];
  totalProducts: number = 0;
  currentPage: number = 1;
  productsPerPage: number = 9;
  totalPages: number = 0;
  pageNumbers: any[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  sorting:string = 'asc'
  selectedCategoryCheckbox : string = 'all';
  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

    ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.productService.searchingProduct.subscribe((res:any)=>{
      this.searchQuery = res
      this.searchProducts();
    })
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.productsPerPage;
    this.productService.getProducts(this.productsPerPage, skip).subscribe((data: any) => {
      this.products = data.products;
      this.totalProducts = data.total;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.selectedCategoryCheckbox = 'all';
      this.generatePagination();
    });
  }


  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery).subscribe((data: any) => {
      this.products = data.products;
      this.totalProducts = data.total;
      this.productService.isSearching.next(false);
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.productService.filterProductsByCategory(category).subscribe((data: any) => {
      this.products = data.products;
      this.totalProducts = data.total;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.selectedCategoryCheckbox = category;
    });
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }


  generatePagination(): void {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const currentPage = this.currentPage;

      if (currentPage > 4) {
        pages.push(1, 2, '...');
      } else {
        pages.push(1, 2);
      }

      if (currentPage > 4 && currentPage < totalPages - 3) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      } else if (currentPage <= 4) {
        for (let i = 3; i <= 5; i++) {
          pages.push(i);
        }
      } else {
        pages.push(totalPages - 4, totalPages - 3);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...', totalPages - 1, totalPages);
      } else {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      }
    }

    this.pageNumbers = pages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadProducts();
  }



  sortProducts(sort:string){
    this.sorting = sort;
    this.productService.sortProducts(sort).subscribe((data: any) => {
      this.products = data.products;
      this.totalProducts = data.total;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }
}
