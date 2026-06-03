import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart as CartIcon, Plus, Minus, Trash2, Ticket } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const CART_ITEMS = [
  {
    id: 1,
    name: 'Bình Sữa Pigeon PPSU Plus',
    desc: 'Dung tích 240ml • Màu Xanh',
    price: 376000,
    image: 'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    desc: 'Đa năng • Hẹn giờ 24h',
    price: 980000,
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    quantity: 1,
  },
];

export default function ShoppingCartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <CartIcon size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cart Header */}
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>Giỏ hàng</Text>
          <Text style={styles.cartBadge}>{cartItems.length} sản phẩm</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                      <Minus size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                      <Plus size={18} color={Colors.onPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeItem(item.id)}
              >
                <Trash2 size={18} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Coupon Section */}
        <TouchableOpacity style={styles.couponBox}>
          <View style={styles.couponIcon}>
            <Ticket size={20} color={Colors.onSecondaryContainer} />
          </View>
          <View style={styles.couponContent}>
            <Text style={styles.couponLabel}>Chọn mã giảm giá</Text>
            <Text style={styles.couponDesc}>Giảm đến 50k cho mẹ mới</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.couponLink}>Chọn</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>
              {total.toLocaleString('vi-VN')}đ
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>0đ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={styles.summaryValue}>-0đ</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalPrice}>{total.toLocaleString('vi-VN')}đ</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  cartBadge: {
    backgroundColor: Colors.primaryContainer,
    color: Colors.onPrimaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  itemsList: {
    gap: 12,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  itemDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    width: 20,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  couponBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  couponIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.secondaryContainer + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponContent: {
    flex: 1,
  },
  couponLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  couponDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  couponLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  summary: {
    gap: 8,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  checkoutBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
