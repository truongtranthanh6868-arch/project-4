import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  HelpCircle,
  Ticket,
  Clock,
  Truck,
  Gift,
  CheckCircle2,
  Home,
  Grid,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

// Vouchers list matching the layout and labels from the HTML mockup
const VOUCHERS = [
  {
    id: 1,
    type: 'voucher',
    title: 'Giảm 50k',
    desc: 'Cho đơn hàng từ 500k khi mua sữa bột Enfamil',
    expiry: '30/11/2024',
    badge: 'Sắp hết',
    badgeBg: Colors.babyPink,
    badgeColor: Colors.onErrorContainer,
    accentBg: Colors.primaryContainer,
    accentText: 'GIẢM',
    icon: Ticket,
    details: '• Giảm trực tiếp 50.000đ cho đơn hàng từ 500.000đ trở lên.\n• Áp dụng khi mua sữa bột Enfamil.\n• Hạn sử dụng: 30/11/2024.\n• Mỗi tài khoản được sử dụng tối đa 1 lần.',
  },
  {
    id: 2,
    type: 'freeship',
    title: 'Miễn phí vận chuyển',
    desc: 'Tối đa 25k cho đơn hàng từ 250k',
    expiry: '15/12/2024',
    badge: '',
    badgeBg: '',
    badgeColor: '',
    accentBg: Colors.tertiaryContainer,
    accentText: 'FREESHIP',
    icon: Truck,
    details: '• Miễn phí vận chuyển tối đa 25.000đ.\n• Áp dụng cho đơn hàng từ 250.000đ trở lên.\n• Hạn sử dụng: 15/12/2024.\n• Áp dụng cho mọi phương thức vận chuyển.',
  },
  {
    id: 3,
    type: 'voucher',
    title: 'Combo Tiết Kiệm',
    desc: 'Giảm 15% khi mua combo tã dán và khăn ướt',
    expiry: '31/12/2024',
    badge: 'Mới',
    badgeBg: Colors.skyBlue + '60', // sky-blue/30 equivalent
    badgeColor: Colors.onTertiaryFixedVariant,
    accentBg: Colors.sunYellow + '66', // sun-yellow/40 equivalent
    accentText: 'GIẢM 15%',
    icon: Gift,
    details: '• Giảm 15% trên tổng giá trị combo.\n• Áp dụng khi mua combo tã dán và khăn ướt của các hãng Huggies, Bobby, Pampers.\n• Hạn sử dụng: 31/12/2024.',
  },
  {
    id: 4,
    type: 'voucher',
    title: 'Giảm 20k đơn từ 200k',
    desc: 'Cho đơn hàng từ 200k khi mua hàng bất kỳ',
    expiry: '31/12/2024',
    badge: '',
    badgeBg: '',
    badgeColor: '',
    accentBg: Colors.primaryContainer,
    accentText: 'GIẢM',
    icon: Ticket,
    details: '• Giảm ngay 20.000đ cho đơn hàng từ 200.000đ trở lên.\n• Áp dụng cho mọi nhóm hàng của Con Khỏe.\n• Hạn sử dụng: 31/12/2024.',
  },
  {
    id: 5,
    type: 'voucher',
    title: 'Voucher Độc Quyền Ví',
    desc: 'Giảm 30k khi thanh toán qua Ví MoMo',
    expiry: '30/12/2024',
    badge: 'Hot',
    badgeBg: Colors.babyPink,
    badgeColor: Colors.onErrorContainer,
    accentBg: Colors.primaryContainer,
    accentText: 'MOMO',
    icon: Ticket,
    details: '• Giảm ngay 30.000đ khi lựa chọn thanh toán bằng Ví điện tử MoMo.\n• Không yêu cầu đơn tối thiểu.\n• Hạn sử dụng: 30/12/2024.',
  },
  {
    id: 6,
    type: 'freeship',
    title: 'Freeship Hỏa Tốc',
    desc: 'Giảm 40k phí giao hàng hỏa tốc cho đơn từ 450k',
    expiry: '25/12/2024',
    badge: 'Hot',
    badgeBg: Colors.babyPink,
    badgeColor: Colors.onErrorContainer,
    accentBg: Colors.tertiaryContainer,
    accentText: 'HỎA TỐC',
    icon: Truck,
    details: '• Giảm tối đa 40.000đ phí vận chuyển hỏa tốc.\n• Chỉ áp dụng tại khu vực Hà Nội và TP.HCM cho đơn từ 450.000đ trở lên.\n• Hạn sử dụng: 25/12/2024.',
  },
  {
    id: 7,
    type: 'freeship',
    title: 'Freeship Extra',
    desc: 'Miễn phí vận chuyển tối đa 15k cho đơn từ 150k',
    expiry: '31/12/2024',
    badge: 'Mới',
    badgeBg: Colors.skyBlue + '60',
    badgeColor: Colors.onTertiaryFixedVariant,
    accentBg: Colors.tertiaryContainer,
    accentText: 'EXTRA',
    icon: Truck,
    details: '• Miễn phí vận chuyển tối đa 15.000đ.\n• Áp dụng cho đơn từ 150.000đ trở lên.\n• Hạn sử dụng: 31/12/2024.',
  },
];

export default function CouponCodeScreen() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'voucher' | 'freeship'>('voucher');

  // Handle voucher details popup
  const showVoucherDetails = (title: string, details: string) => {
    Alert.alert(title, details, [{ text: 'Đóng', style: 'cancel' }]);
  };

  // Handle coupon manual application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập mã giảm giá.');
      return;
    }

    const cleanedCode = couponCode.trim().toUpperCase();
    if (cleanedCode === 'CONKHOE2024') {
      setSelectedVoucher(1); // Auto select "Giảm 50k"
      Alert.alert('Thành công', 'Đã áp dụng mã CONKHOE2024 thành công! Bạn được giảm 50k.');
      setCouponCode('');
    } else if (cleanedCode === 'FREESHIP25') {
      setSelectedVoucher(2); // Auto select "Freeship"
      Alert.alert('Thành công', 'Đã áp dụng mã FREESHIP25 thành công! Bạn được miễn phí vận chuyển.');
      setCouponCode('');
    } else {
      Alert.alert('Lỗi', 'Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  // Confirm selection and navigate back
  const handleConfirmSelection = () => {
    if (selectedVoucher) {
      const selected = VOUCHERS.find(v => v.id === selectedVoucher);
      let discountVal = 0;
      if (selectedVoucher === 1) discountVal = 50000;
      else if (selectedVoucher === 2) discountVal = 25000;
      else if (selectedVoucher === 3) discountVal = 100000; // Mock combo discount
      else if (selectedVoucher === 4) discountVal = 20000;
      else if (selectedVoucher === 5) discountVal = 30000;
      else if (selectedVoucher === 6) discountVal = 40000;
      else if (selectedVoucher === 7) discountVal = 15000;

      Alert.alert('Xác nhận', `Đã áp dụng mã: ${selected?.title}`, [
        { 
          text: 'OK', 
          onPress: () => {
            router.replace({
              pathname: '/shopping-cart',
              params: {
                discount: discountVal,
                voucherTitle: selected?.title,
                selectedId: selectedVoucher,
              }
            });
          }
        }
      ]);
    } else {
      router.back();
    }
  };

  // Filter vouchers based on selected tab
  const filteredVouchers = VOUCHERS.filter(v => v.type === activeTab);
  
  // Count items for each category
  const voucherCount = VOUCHERS.filter(v => v.type === 'voucher').length;
  const freeshipCount = VOUCHERS.filter(v => v.type === 'freeship').length;

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Áp mã giảm giá</Text>
        </View>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => Alert.alert('Hướng dẫn', 'Chọn voucher khả dụng bên dưới hoặc nhập mã giảm giá thủ công để nhận ưu đãi cho đơn hàng.')}
        >
          <HelpCircle size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Manual Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Nhập mã ưu đãi</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ví dụ: CONKHOE2024"
              placeholderTextColor={Colors.outlineVariant}
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={handleApplyCoupon}
            />
            <TouchableOpacity style={styles.applyBtn} activeOpacity={0.85} onPress={handleApplyCoupon}>
              <Text style={styles.applyBtnText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'voucher' ? styles.tabBtnActive : styles.tabBtnInactive,
            ]}
            onPress={() => setActiveTab('voucher')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'voucher' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              Voucher ({voucherCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'freeship' ? styles.tabBtnActive : styles.tabBtnInactive,
            ]}
            onPress={() => setActiveTab('freeship')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'freeship' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              Freeship ({freeshipCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voucher List */}
        <View style={styles.voucherList}>
          {filteredVouchers.map((voucher) => {
            const isSelected = selectedVoucher === voucher.id;
            const IconComponent = voucher.icon;
            
            return (
              <TouchableOpacity
                key={voucher.id}
                style={[
                  styles.voucherCard,
                  isSelected && styles.voucherCardSelected,
                ]}
                onPress={() => setSelectedVoucher(isSelected ? null : voucher.id)}
                activeOpacity={0.9}
              >
                {/* Left Accent Side */}
                <View style={[styles.colorAccent, { backgroundColor: voucher.accentBg }]}>
                  <IconComponent size={28} color={voucher.type === 'voucher' ? Colors.onPrimaryContainer : Colors.onTertiaryContainer} />
                  <Text style={styles.discountLabel} numberOfLines={1}>{voucher.accentText}</Text>
                  
                  {/* Circle Cutouts */}
                  <View style={styles.cutsContainer}>
                    <View style={styles.cutCircle} />
                    <View style={styles.cutCircle} />
                    <View style={styles.cutCircle} />
                  </View>
                </View>

                {/* Voucher Content */}
                <View style={styles.voucherContent}>
                  <View style={styles.voucherHeader}>
                    <Text style={styles.discountText}>{voucher.title}</Text>
                    {voucher.badge ? (
                      <View style={[styles.statusBadge, { backgroundColor: voucher.badgeBg }]}>
                        <Text style={[styles.statusBadgeText, { color: voucher.badgeColor }]}>
                          {voucher.badge}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.descText} numberOfLines={2}>
                    {voucher.desc}
                  </Text>
                  <View style={styles.voucherFooter}>
                    <View style={styles.expiryRow}>
                      <Clock size={12} color={Colors.outline} />
                      <Text style={styles.expiryText}>HSD: {voucher.expiry}</Text>
                    </View>
                    <TouchableOpacity onPress={() => showVoucherDetails(voucher.title, voucher.details)}>
                      <Text style={styles.detailLink}>Chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Radio Button Selector */}
                <View style={styles.radioButtonContainer}>
                  <View style={[
                    styles.radioButton, 
                    isSelected && styles.radioButtonActive,
                    isSelected && { backgroundColor: voucher.type === 'voucher' ? Colors.primaryContainer + '20' : Colors.tertiaryContainer + '20' }
                  ]}>
                    {isSelected && (
                      <View style={[
                        styles.radioDot, 
                        { backgroundColor: voucher.type === 'voucher' ? Colors.primary : Colors.tertiary }
                      ]} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Banner Ad / Suggestion */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMaY-R6OS4M7G4Bpm6zZEVDpytIkQC8mLnP4fMWSk9X1XRqOQ5vh3PLvsdizJssgBt5qO6lx9MidIaSIX4V48z-PD4italVPZcem4fYl5srCRKvZLgO7Tlg8xBJP5GAIedCBbx8THh5Vdp6FISp6oyeuSdDo8ct7bzDuovt2iFCflQXbXmqY7dTtpjb2xeMiLgTs7oYRCA88N8QmSeYXGFC2UnWwoaKp0HfWBxvgAU7knPbQK0doVnRouo0ZT88iKJ_z3mmXxWfNpY' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0, 110, 32, 0.75)', 'rgba(0, 110, 32, 0.25)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.bannerOverlay}
          >
            <Text style={styles.bannerText}>Nhận thêm mã khi thanh toán qua Ví</Text>
            <TouchableOpacity 
              style={styles.bannerBtn} 
              activeOpacity={0.85}
              onPress={() => Alert.alert('Ví Điện Tử', 'Chức năng liên kết ví đang được phát triển.')}
            >
              <Text style={styles.bannerBtnText}>Liên kết ngay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Extra spacing to allow scrolling past bottom floating bar and navigation bar */}
        <View style={{ height: 180 }} />
      </ScrollView>

      {/* Fixed Action Button (Contextual for Selection) */}
      <View style={styles.floatingActionWrapper} pointerEvents="box-none">
        <TouchableOpacity 
          style={styles.confirmBtn} 
          activeOpacity={0.85} 
          onPress={handleConfirmSelection}
        >
          <Text style={styles.confirmBtnText}>Xác nhận áp mã</Text>
          <CheckCircle2 size={20} color={Colors.onPrimary} />
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
        <TouchableOpacity style={styles.navItemActive} onPress={() => router.push('/shopping-cart')}>
          <ShoppingCart size={20} color={Colors.onSecondaryContainer} />
          <Text style={styles.navTextActive}>Giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/profile')}>
          <User size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navText}>Tài khoản</Text>
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
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant + '30',
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.softGrey,
    paddingHorizontal: 20,
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  applyBtn: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  applyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabBtnInactive: {
    backgroundColor: 'transparent',
    borderColor: Colors.outlineVariant,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  tabTextActive: {
    color: Colors.onPrimary,
  },
  tabTextInactive: {
    color: Colors.onSurfaceVariant,
  },
  voucherList: {
    gap: 16,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceVariant + '30',
    shadowColor: '#01834e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  voucherCardSelected: {
    borderColor: Colors.primary + '80',
    backgroundColor: Colors.primary + '05',
  },
  colorAccent: {
    width: 96,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    position: 'relative',
  },
  discountLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.onSurface,
    textAlign: 'center',
    paddingHorizontal: 4,
    fontFamily: 'NunitoSans-ExtraBold',
    letterSpacing: 0.5,
  },
  cutsContainer: {
    position: 'absolute',
    right: -8,
    top: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 4,
    zIndex: 10,
  },
  cutCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  voucherContent: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 6,
  },
  voucherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  discountText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'NunitoSans-Bold',
    textTransform: 'uppercase',
  },
  descText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 16,
    fontFamily: 'NunitoSans-Regular',
  },
  voucherFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    fontSize: 11,
    color: Colors.outline,
    fontFamily: 'NunitoSans-Regular',
  },
  detailLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  bannerContainer: {
    marginTop: 32,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
    maxWidth: 180,
    lineHeight: 22,
  },
  bannerBtn: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  floatingActionWrapper: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    zIndex: 40,
  },
  confirmBtn: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    zIndex: 50,
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

