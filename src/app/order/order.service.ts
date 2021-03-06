import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'
import {Http,Headers,RequestOptions, Response} from '@angular/http'
import {Order, OrderItem} from './order.model'
import {MEAT_API} from '../app.api'

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: Http){}

    itemsValue(): number{
        return this.cartService.total()
    }

    carItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
            this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<Order>{
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return  this.http.post(`${MEAT_API}/orders`,
                                 JSON.stringify(order),
                                new RequestOptions({headers: headers}))
                        .map(response => response.json())
    }   
}