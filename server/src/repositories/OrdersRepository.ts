import sequelize from '../../config/database';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';
import AppError from '../errors/AppError';
import Client from '../models/Client';
import CreateOrderDTO from '../types/CreateOrderDTO';
import { OrderWithJoins } from '../types/OrderWithJoins';
import OrderDTO from '../types/OrderDTO';
class OrdersRepository {
  static orders = [];

  static createOrder = async (body: CreateOrderDTO): Promise<void> => {
    try {
      await sequelize.transaction(async (t) => {
        const { products, clientId } = body;

        const newOrder = await Order.create(
          { clientId: clientId },
          { transaction: t },
        );

        const orderItems = products.map((product) => ({
          price: product.productPrice,
          count: product.productCount,
          productId: product.id,
          orderId: newOrder.id,
        }));

        const newOrderItem = await OrderItem.bulkCreate(orderItems, {
          transaction: t,
        });
        if (!newOrder || !newOrderItem) {
          throw new AppError('Failed to create order ! ', 400);
        }
      });
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static getOrders = async (): Promise<OrderDTO[]> => {
    try {
      const ordersWithTotalPrice = (await Order.findAll({
        attributes: [
          'id',
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '`order_items`.`count` * `order_items`.`price`',
              ),
            ),
            'totalPrice',
          ],
        ],
        include: [
          {
            model: OrderItem,
            as: 'order_items',
            attributes: ['price', 'count'],
            include: [
              {
                model: Product,
                attributes: ['title', 'id'],
              },
            ],
          },
          {
            model: Client,
            attributes: ['first_name', 'last_name', 'address'],
          },
        ],
        group: [
          'Order.id',
          'order_items.orderId',
          'client.id',
          'order_items.id',
        ],
      })) as unknown as OrderWithJoins[];

      const orders = ordersWithTotalPrice.map((order) => ({
        orderId: order.id,
        totalPrice: order.dataValues.totalPrice,
        clientName: order.client.first_name,
        clientSurname: order.client.last_name,
        clientAddress: order.client.address,
        products: order.order_items.map((item) => ({
          productId: item.product.id,
          productName: item.product.title,
          productPrice: item.price,
          productCount: item.count,
        })),
      }));
      if (!orders || orders.length === 0) {
        throw new AppError('Failed to fetch orders!', 404);
      }
      return orders;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static showOrderDetails = async (orderId: string): Promise<OrderDTO> => {
    try {
      const orderWithTotalPrice = (await Order.findByPk(orderId, {
        attributes: [
          'id',
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '`order_items`.`count` * `order_items`.`price`',
              ),
            ),
            'totalPrice',
          ],
        ],
        include: [
          {
            model: OrderItem,
            as: 'order_items',
            attributes: ['price', 'count'],
            include: [
              {
                model: Product,
                attributes: ['title'],
              },
            ],
          },
          {
            model: Client,
            attributes: ['first_name', 'last_name', 'address'],
          },
        ],
      })) as unknown as OrderWithJoins;

      if (!orderWithTotalPrice) {
        throw new AppError('Failed to find a product', 404);
      }

      const order = {
        orderId: orderWithTotalPrice.id,
        totalPrice: orderWithTotalPrice.totalPrice,
        clientName: orderWithTotalPrice.client.first_name,
        clientSurname: orderWithTotalPrice.client.last_name,
        clientAddress: orderWithTotalPrice.client.address,
        products: orderWithTotalPrice.order_items.map((item) => ({
          productId: item.product.id,
          productName: item.product.title,
          productPrice: item.price,
          productCount: item.count,
        })),
      };
      if (!order) {
        throw new AppError('Failed to fetch order !', 404);
      }

      return order;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };
}

export default OrdersRepository;
