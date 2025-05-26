import sequelize from '../../config/database.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/product.js';
import AppError from '../errors/AppError.js';
import Client from '../models/client.js';
class OrdersRepository {
  static orders = [];

  static createOrder = async (body) => {
    try {
      await sequelize.transaction(async (t) => {
        const { products, clientId } = body;
        console.log(body);

        const newOrder = await Order.create(
          { clientId: clientId },
          { transaction: t },
        );

        const orderItems = products.map((product) => ({
          price: product.price,
          count: product.productCount,
          productId: product.id,
          orderId: newOrder.id,
        }));

        const newOrderItem = await OrderItem.bulkCreate(orderItems, { transaction: t });
        if (!newOrder || !newOrderItem) {
          throw new AppError('Failed to create order ! ', 400)
        }
      });
    } catch (error) {
      throw new AppError(error, 500)
    }

  };

  static getOrders = async () => {
    try {
      const ordersWithTotalPrice = await Order.findAll({
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
        group: [
          'Order.id',
          'order_items.orderId',
          'client.id',
          'order_items.id',
        ],
      });
      const orders = ordersWithTotalPrice.map((order) => ({
        id: order.id,
        totalPrice: order.dataValues.totalPrice,
        clientName: order.client.first_name,
        clientSurname: order.client.last_name,
        clientAddress: order.client.address,
        products: order.order_items.map((item) => ({
          productName: item.product.title,
          productPrice: item.price,
          productCount: item.count,
        })),
      }));
      if (!orders || orders.length === 0) {
        throw new AppError('Failed to fetch orders!', 404)
      }
      return orders;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };

  static showOrderDetails = async (orderId) => {
    try {
      const orderWithTotalPrice = await Order.findByPk(orderId, {
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
      });


      const order = {
        orderId: orderWithTotalPrice.id,
        totalPrice: orderWithTotalPrice.totalPrice,
        clientName: orderWithTotalPrice.client.first_name,
        clientSurname: orderWithTotalPrice.client.last_name,
        clientAddress: orderWithTotalPrice.client.address,
        products: orderWithTotalPrice.order_items.map((item) => ({
          productName: item.product.title,
          productPrice: item.price,
          productCount: item.count,
        })),
      };
      if (!order) {
        throw new AppError('Failed to fetch order !', 404)
      }
      return order;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };
}

export default OrdersRepository;
