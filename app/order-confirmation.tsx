import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, ShoppingBag, MapPin } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Checkmark */}
        <Animated.View
          style={[
            styles.checkmarkWrapper,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.checkmarkCircle}>
            <CheckCircle size={64} color={Colors.onPrimary} fill={Colors.primary} />
          </View>
          <View style={styles.decorIcon1}>
            <Text style={styles.decorText}>❤️</Text>
          </View>
          <View style={styles.decorIcon2}>
            <Text style={styles.decorText}>👶</Text>
          </View>
        </Animated.View>

        {/* Success Text */}
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.subtitle}>
          Cảm ơn bạn đã tin tưởng Con Khỏe. Đơn hàng của bạn đang được xử lý nhanh chóng.
        </Text>

        {/* Order Info Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Mã đơn hàng</Text>
            <Text style={styles.orderId}>#CKH-8829410</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.orderDetail}>
            <View style={[styles.detailIcon, { backgroundColor: Colors.secondaryContainer + '30' }]}>
              <ShoppingBag size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Thời gian dự kiến</Text>
              <Text style={styles.detailValue}>Thứ 4, ngày 25 tháng 10</Text>
            </View>
          </View>
          <View style={styles.orderDetail}>
            <View style={[styles.detailIcon, { backgroundColor: Colors.tertiaryContainer + '20' }]}>
              <MapPin size={20} color={Colors.tertiary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailLabel}>Địa chỉ giao hàng</Text>
              <Text style={styles.detailValueSmall} numberOfLines={1}>
                123 Đường Láng, Đống Đa, Hà Nội
              </Text>
            </View>
          </View>
        </View>

        {/* Illustration */}
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ts6oyPPuh6CayzB7CLjwnzftkk08Sw-TtdhKJ0fEEQUUGT-OApB5mpaI6ArXHUCjGYHgm5w1NwH2denEct2qBHzXiXETJzMZjvdK9TB23rEOkH1vXHwweuFZchFm8FuwPlrIaaTHq5EDB5rJnZh96S2G7NZDUPnpPUQ8N1TBlnpeE1_dudfB3509F4fdUCYDmcvuCfTCeh6UGLFxMoCIRjwceFOg1hkgrv2HI08uXVlcYjf4_skwsDGnnxqVm_CWYbjKceTbqw5y' }}
          style={styles.illustrationImage}
          resizeMode="cover"
        />

        {/* Action Buttons */}
        <TouchableOpacity style={styles.trackBtn} activeOpacity={0.85}>
          <Text style={styles.trackBtnText}>Theo dõi đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: 'center',
  },
  checkmarkWrapper: {
    width: 160,
    height: 160,
    marginBottom: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  decorIcon1: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.babyPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorIcon2: {
    position: 'absolute',
    bottom: 8,
    left: -16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorText: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  orderCard: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  orderLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  orderId: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    backgroundColor: Colors.softGrey,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '20',
    marginVertical: 12,
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 2,
    fontFamily: 'NunitoSans-Bold',
  },
  detailValueSmall: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    fontFamily: 'NunitoSans-Regular',
  },
  illustrationImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 24,
  },
  trackBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  trackBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  continueBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
});
