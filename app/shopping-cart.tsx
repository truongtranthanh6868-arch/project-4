import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Menu,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Ticket,
  ChevronRight,
  ArrowRight,
  Home,
  Grid,
  ShoppingCart as CartIcon,
  User,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const INITIAL_CART_ITEMS = [
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
  const params = useLocalSearchParams();
  
  // Extract applied discount from route params if navigated from coupon screen
  const appliedDiscount = params.discount ? parseInt(params.discount as string, 10) : 0;
  const voucherTitle = params.voucherTitle as string || '';

  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  // Update item quantity
  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    Alert.alert(
      'Xóa sản phẩm',
      'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setCartItems(cartItems.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 0; // As per the HTML markup
  const total = Math.max(0, subtotal + shippingFee - appliedDiscount);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Navigate to checkout screen
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng chọn mua sản phẩm trước khi thanh toán.');
      return;
    }
    router.push('/checkout');
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => Alert.alert('Menu', 'Chức năng Menu đang được phát triển.')}
        >
          <Menu size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => Alert.alert('Giỏ hàng', 'Giỏ hàng của bạn đang có ' + totalItemsCount + ' sản phẩm.')}
        >
          <ShoppingBag size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Header */}
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>Giỏ hàng</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.cartBadge}>{totalItemsCount} sản phẩm</Text>
          </View>
        </View>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png' }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            <TouchableOpacity 
              style={styles.shopBtn}
              onPress={() => router.push('/(tabs)/store')}
            >
              <Text style={styles.shopBtnText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                {/* Product Image */}
                <View style={styles.itemImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                </View>
                
                {/* Content */}
                <View style={styles.itemContent}>
                  <View>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                  </View>
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </Text>
                    
                    {/* Quantity Selector */}
                    <View style={styles.quantityControl}>
                      <TouchableOpacity 
                        style={styles.qtyBtnMinus}
                        onPress={() => updateQuantity(item.id, -1)}
                        activeOpacity={0.7}
                      >
                        <Minus size={14} color={Colors.primary} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.qtyBtnPlus}
                        onPress={() => updateQuantity(item.id, 1)}
                        activeOpacity={0.7}
                      >
                        <Plus size={14} color={Colors.onPrimary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Delete Button */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => removeItem(item.id)}
                  activeOpacity={0.7}
                >
                  <Trash2 size={18} color={Colors.outline} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Coupon Section */}
        <TouchableOpacity 
          style={styles.couponBox} 
          activeOpacity={0.9}
          onPress={() => router.push('/coupon-code')}
        >
          <View style={styles.couponLeft}>
            <View style={styles.couponIconWrapper}>
              <Ticket size={20} color={Colors.onSecondaryContainer} />
            </View>
            <View>
              <Text style={styles.couponLabel}>
                {appliedDiscount > 0 ? `Đã chọn: ${voucherTitle}` : 'Chọn mã giảm giá'}
              </Text>
              <Text style={styles.couponDesc}>
                {appliedDiscount > 0 ? `Được giảm -${appliedDiscount.toLocaleString('vi-VN')}đ` : 'Giảm đến 50k cho mẹ mới'}
              </Text>
            </View>
          </View>
          <View style={styles.couponRight}>
            <Text style={styles.couponLink}>{appliedDiscount > 0 ? 'Thay đổi' : 'Chọn'}</Text>
            <ChevronRight size={16} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Summary Details */}
        {cartItems.length > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính</Text>
              <Text style={styles.summaryValue}>{subtotal.toLocaleString('vi-VN')}đ</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={styles.summaryValue}>{shippingFee === 0 ? '0đ' : `${shippingFee.toLocaleString('vi-VN')}đ`}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giảm giá</Text>
              <Text style={[styles.summaryValue, styles.discountText]}>
                -{appliedDiscount.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          </View>
        )}

        {/* Space for bottom fixed sections */}
        <View style={{ height: 180 }} />
      </ScrollView>

      {/* Sticky Bottom Checkout & Nav Container */}
      <View style={styles.bottomStickyContainer}>
        {/* Checkout Bar */}
        <View style={styles.checkoutBar}>
          <View style={styles.totalWrapper}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>{total.toLocaleString('vi-VN')}đ</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutBtn} 
            activeOpacity={0.9}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutBtnText}>Thanh toán ngay</Text>
            <ArrowRight size={18} color={Colors.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/home')}>
            <Home size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navText}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/store')}>
            <Grid size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navText}>Danh mục</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemActive} onPress={() => {}}>
            <CartIcon size={20} color={Colors.onSecondaryContainer} />
            <Text style={styles.navTextActive}>Giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/profile')}>
            <User size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navText}>Tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softGrey },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.surface,
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 50,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cartTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  badgeContainer: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  cartBadge: {
    color: Colors.onPrimaryContainer,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  itemsList: {
    gap: 16,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    position: 'relative',
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 3,
    overflow: 'hidden',
  },
  itemImageWrapper: {
    width: 96,
    height: 96,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    paddingRight: 24,
  },
  itemDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 20,
    padding: 4,
    gap: 10,
  },
  qtyBtnMinus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyBtnPlus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    width: 16,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  couponBox: {
    marginTop: 24,
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 3,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  couponIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  couponDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    marginTop: 2,
  },
  couponRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  couponLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  summaryContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  discountText: {
    color: Colors.tertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 16,
  },
  emptyImage: {
    width: 120,
    height: 120,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  shopBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  shopBtnText: {
    color: Colors.onPrimary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
  },
  bottomStickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  checkoutBar: {
    backgroundColor: Colors.surface,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerHigh,
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    gap: 16,
  },
  totalWrapper: {
    flexDirection: 'col',
  },
  totalLabel: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
    marginTop: 2,
  },
  checkoutBtn: {
    flex: 1,
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  bottomNav: {
    height: 64,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '30',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
});

