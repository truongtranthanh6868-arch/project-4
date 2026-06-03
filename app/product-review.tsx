import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Star, Upload } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function ProductReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Viết Đánh Giá</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Context */}
        <View style={styles.productCard}>
          <Image
            source={{ uri: 'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Bình Sữa Pigeon</Text>
            <Text style={styles.productDesc}>Hàng chính hãng • 240ml</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Mức độ hài lòng của bạn?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starBtn}>
                <Star
                  size={48}
                  color={star <= rating ? Colors.babyPink : Colors.outlineVariant}
                  fill={star <= rating ? Colors.babyPink : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingLabel}>
              {['', 'Rất tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời!'][rating]}
            </Text>
          )}
        </View>

        {/* Image Upload */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Hình ảnh & Video thực tế</Text>
          <View style={styles.uploadGrid}>
            <TouchableOpacity style={[styles.uploadSlot, styles.videoSlot]}>
              <Upload size={24} color={Colors.primary} />
              <Text style={styles.uploadText}>Thêm Video</Text>
            </TouchableOpacity>
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity key={i} style={styles.uploadSlot}>
                <Upload size={20} color={Colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Chia sẻ trải nghiệm của bạn</Text>
            <Text style={styles.charCount}>Tối thiểu 20 ký tự</Text>
          </View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Hãy kể về chất lượng sản phẩm, dịch vụ giao hàng để giúp người mua sau nhé..."
            placeholderTextColor={Colors.outlineVariant}
            multiline
            value={review}
            onChangeText={setReview}
          />
        </View>

        {/* Anonymous Toggle */}
        <View style={styles.anonymousBox}>
          <Text style={styles.anonymousLabel}>Đánh giá ẩn danh</Text>
          <Text style={styles.anonymousDesc}>Tên của bạn sẽ hiển thị là B***</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>Gửi Đánh Giá</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  productDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'NunitoSans-Bold',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starBtn: {
    paddingVertical: 8,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  uploadSlot: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.outlineVariant + '30',
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoSlot: {
    width: '48%',
    borderColor: Colors.primary + '20',
    backgroundColor: Colors.primary + '05',
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  reviewSection: {
    marginBottom: 20,
    gap: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  reviewInput: {
    height: 160,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  anonymousBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 4,
  },
  anonymousLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  anonymousDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  submitBtn: {
    width: '100%',
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
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
