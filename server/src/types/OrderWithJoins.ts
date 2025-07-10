import { ClientModel } from '../models/Client';
import { OrderModel } from '../models/Order';
import { OrderItemModel } from '../models/OrderItem';
import { ProductModel } from '../models/Product';

export interface OrderWithJoins extends OrderModel {
  client: ClientModel;
  order_items: Array<
    OrderItemModel & {
      product: ProductModel;
    }
  >;
  totalPrice: number;
}
