import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Plus, Briefcase, Navigation, MapPin, Calendar, Clock, 
  Search, Sparkles, SlidersHorizontal, Sun, Moon, CheckCircle2,
  ChevronRight, Apple, Eye, RefreshCw, User, Store, UserCheck, Shield, Check, Phone, ArrowRight,
  Bell, Filter, Star, Landmark, Wallet, CreditCard, ChevronLeft, LogOut, CheckCircle, AlertCircle,
  Users, ClipboardList, BarChart3, TrendingUp, Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShiftJob } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Chip } from './Chip';
import { Badge } from './Badge';
import { BottomSheet } from './BottomSheet';
import { InstantNearbyCandidateRadar } from './InstantNearbyCandidateRadar';
import { InstantShiftClaiming } from './InstantShiftClaiming';

type SimulatorScreen = 'splash' | 'onboarding' | 'login' | 'otp' | 'accountType' | 'dashboard' | 'radar';
type TabType = 'trangchu' | 'vieclam' | 'lichlam' | 'vi' | 'taikhoan';

interface ViecLabShift extends ShiftJob {
  distance: string;
  rating: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  image: string;
}

const DEFAULT_VIECLAB_SHIFTS: ViecLabShift[] = [
  {
    id: 'vl-1',
    title: 'Nhân viên Phục vụ Ca Chiều',
    restaurantName: 'Pizza 4P\'s Bến Thành',
    logo: '🍕',
    date: 'Hôm nay, 09/07',
    time: '14:00 - 18:00 (4 tiếng)',
    hourlyRate: 55000,
    totalEarnings: 220000,
    location: '8 Thủ Khoa Huân, Quận 1, TP. HCM',
    requiredSkills: ['Phục vụ khách hàng', 'Tiếng Anh cơ bản', 'Ghi order'],
    status: 'available',
    slotsTotal: 3,
    slotsFilled: 1,
    distance: 'Cách 1.2 km',
    rating: '4.9',
    category: 'Phục vụ',
    description: 'Chào đón khách hàng, giới thiệu thực đơn pizza đặc sắc, ghi nhận order và phối hợp cùng bếp để phục vụ món ăn nóng hổi đến bàn ăn. Đảm bảo khu vực bàn ăn luôn sạch sẽ, gọn gàng.',
    requirements: 'Tác phong nhanh nhẹn, gương mặt thân thiện, ưu tiên ứng viên giao tiếp được tiếng Anh cơ bản. Có kinh nghiệm làm việc tại nhà hàng là một lợi thế lớn.',
    benefits: 'Được hỗ trợ cơm ca tối chất lượng cao, chia sẻ tiền tips hàng tuần, đào tạo quy trình dịch vụ chuẩn Nhật Bản.',
    image: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  {
    id: 'vl-2',
    title: 'Nghệ nhân Pha chế (Barista)',
    restaurantName: 'The Coffee House Pasteur',
    logo: '☕',
    date: 'Hôm nay, 09/07',
    time: '08:00 - 12:00 (4 tiếng)',
    hourlyRate: 50000,
    totalEarnings: 200000,
    location: '180 Pasteur, Bến Nghé, Quận 1',
    requiredSkills: ['Espresso Art', 'Cashier', 'Dọn dẹp quầy'],
    status: 'available',
    slotsTotal: 2,
    slotsFilled: 0,
    distance: 'Cách 0.8 km',
    rating: '4.8',
    category: 'Pha chế',
    description: 'Pha chế các dòng cà phê truyền thống, trà trái cây và cà phê máy theo công thức chuẩn chỉnh của hệ thống. Quản lý vệ sinh quầy pha chế và hỗ trợ tính tiền khi khách đông.',
    requirements: 'Thao tác máy pha cà phê chuyên nghiệp, cẩn thận, tỉ mỉ. Có khả năng tạo hình Latte Art cơ bản là điểm cộng.',
    benefits: 'Trải nghiệm môi trường làm việc trẻ trung, thưởng vượt doanh số ca trực, phục vụ miễn phí 1 ly nước tự chọn mỗi ca.',
    image: 'linear-gradient(135deg, #8D6E63 0%, #4E342E 100%)'
  },
  {
    id: 'vl-3',
    title: 'Thu ngân & Soát hóa đơn ca trưa',
    restaurantName: 'Phúc Long Hàm Nghi',
    logo: '🍹',
    date: 'Ngày mai, 10/07',
    time: '11:00 - 16:00 (5 tiếng)',
    hourlyRate: 48000,
    totalEarnings: 240000,
    location: '29 Hàm Nghi, Nguyễn Thái Bình, Quận 1',
    requiredSkills: ['Thao tác POS', 'Trung thực', 'Đóng gói sản phẩm'],
    status: 'available',
    slotsTotal: 1,
    slotsFilled: 0,
    distance: 'Cách 1.5 km',
    rating: '4.7',
    category: 'Thu ngân',
    description: 'Thực hiện thao tác order trên máy POS, hướng dẫn khách hàng quét mã thanh toán ví điện tử, đối chiếu bill và bàn giao đồ uống đã đóng gói chuẩn xác cho đối tác giao hàng.',
    requirements: 'Ngoại hình sáng, giọng nói dễ nghe, trung thực và chính xác trong việc kiểm soát tài chính.',
    benefits: 'Đồng phục miễn phí, giảm giá 30% cho tất cả sản phẩm Phúc Long trên toàn hệ thống.',
    image: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
  },
  {
    id: 'vl-4',
    title: 'Phụ bếp chế biến món Âu',
    restaurantName: 'Saigon Bistro & Grill',
    logo: '🥩',
    date: 'Hôm nay, 09/07',
    time: '17:00 - 22:00 (5 tiếng)',
    hourlyRate: 60000,
    totalEarnings: 300000,
    location: '15 Ngô Văn Năm, Bến Nghé, Quận 1',
    requiredSkills: ['Sơ chế thực phẩm', 'An toàn vệ sinh', 'Dao kéo cơ bản'],
    status: 'confirmed',
    slotsTotal: 2,
    slotsFilled: 2,
    distance: 'Cách 2.4 km',
    rating: '4.9',
    category: 'Bếp',
    description: 'Hỗ trợ Bếp trưởng sơ chế nguyên liệu (rau củ, thịt, cá), sắp xếp đĩa thức ăn trang trí, vệ sinh sạch sẽ dụng cụ bếp sau khi kết thúc giờ phục vụ cao điểm.',
    requirements: 'Sức khỏe tốt, chịu được nhiệt độ và áp lực cao trong không gian bếp nóng. Cam kết tuân thủ nghiêm ngặt quy định vệ sinh an toàn thực phẩm.',
    benefits: 'Học hỏi trực tiếp từ bếp trưởng 5 sao, phụ cấp độc hại ca đêm 15%, cơm ca thịnh soạn.',
    image: 'linear-gradient(135deg, #E65100 0%, #F57C00 100%)'
  },
  {
    id: 'vl-5',
    title: 'Nhân viên Tạp vụ rửa bát máy',
    restaurantName: 'Katinat Saigon Kafe',
    logo: '🧹',
    date: 'Hôm nay, 09/07',
    time: '18:00 - 23:00 (5 tiếng)',
    hourlyRate: 45000,
    totalEarnings: 225000,
    location: '210 Pasteur, Quận 3',
    requiredSkills: ['Chăm chỉ', 'Sức khỏe tốt', 'Nhanh nhẹn'],
    status: 'completed',
    slotsTotal: 1,
    slotsFilled: 1,
    distance: 'Cách 1.8 km',
    rating: '4.6',
    category: 'Tạp vụ',
    description: 'Thu gom cốc thủy tinh, đĩa bánh từ khu vực phục vụ của khách, phân loại và xếp vào máy rửa bát công nghiệp. Lau chùi sàn nhà định kỳ giữ không gian sạch mát.',
    requirements: 'Chịu khó, cẩn thận tránh làm đổ vỡ cốc đĩa, có tinh thần tự giác cao.',
    benefits: 'Trang bị đồ bảo hộ cao cấp, phụ cấp nước uống mát lạnh suốt ca trực.',
    image: 'linear-gradient(135deg, #00ACC1 0%, #00838F 100%)'
  },
  {
    id: 'vl-6',
    title: 'Quản lý Ca Trực linh hoạt',
    restaurantName: 'Highlands Coffee Nhà Thờ',
    logo: '👑',
    date: 'Ngày mai, 10/07',
    time: '14:00 - 22:00 (8 tiếng)',
    hourlyRate: 85000,
    totalEarnings: 680000,
    location: '26 Công Xã Paris, Quận 1',
    requiredSkills: ['Quản lý nhân sự', 'Giải quyết khiếu nại', 'Kiểm kho'],
    status: 'available',
    slotsTotal: 1,
    slotsFilled: 0,
    distance: 'Cách 1.1 km',
    rating: '5.0',
    category: 'Quản lý',
    description: 'Chịu trách nhiệm phân ca, giám sát chất lượng vận hành của nhân viên trong ca, hỗ trợ khách hàng giải quyết các khiếu nại phát sinh, lập báo cáo doanh thu nộp về công ty.',
    requirements: 'Tối thiểu 1 năm kinh nghiệm làm Trưởng ca hoặc Quản lý tại chuỗi F&B lớn. Kỹ năng giao tiếp và xử lý tình huống xuất sắc.',
    benefits: 'Mức thu nhập hấp dẫn, thưởng KPI ca trực cao, chế độ bảo hiểm tai nạn 24/7.',
    image: 'linear-gradient(135deg, #D84315 0%, #BF360C 100%)'
  },
  {
    id: 'vl-7',
    title: 'Giám sát Vệ sinh An toàn',
    restaurantName: 'Tous Les Jours Nguyễn Du',
    logo: '🍞',
    date: 'Ngày mai, 10/07',
    time: '06:00 - 12:00 (6 tiếng)',
    hourlyRate: 70000,
    totalEarnings: 420000,
    location: '59 Nguyễn Du, Quận 1',
    requiredSkills: ['Kiểm định chất lượng', 'Báo cáo', 'Chú ý chi tiết'],
    status: 'available',
    slotsTotal: 1,
    slotsFilled: 0,
    distance: 'Cách 1.9 km',
    rating: '4.8',
    category: 'Giám sát',
    description: 'Thực hiện kiểm tra ngẫu nhiên chất lượng bánh mì và nguyên liệu đầu vào tại các kệ trưng bày. Đánh giá xếp hạng tiêu chuẩn vệ sinh tủ mát và quy trình vệ sinh cá nhân của nhân viên.',
    requirements: 'Hiểu rõ tiêu chuẩn HACCP / ATVSTP quốc gia. Cẩn thận, chi tiết, nghiêm túc trong công việc.',
    benefits: 'Được đóng góp ý kiến trực tiếp cải thiện vận hành chuỗi, thưởng nóng khi phát hiện rủi ro nghiêm trọng sớm.',
    image: 'linear-gradient(135deg, #1A237E 0%, #311B92 100%)'
  }
];

export const MobileSimulator: React.FC = () => {
  // Navigation & Controls
  const [currentScreen, setCurrentScreen] = useState<SimulatorScreen>('splash');
  const [simDarkMode, setSimDarkMode] = useState<boolean>(true);

  // Active Bottom Tab State
  const [activeTab, setActiveTab] = useState<TabType>('trangchu');

  // Job Data States
  const [shifts, setShifts] = useState<ViecLabShift[]>(DEFAULT_VIECLAB_SHIFTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Job Detail Screen State
  const [selectedJob, setSelectedJob] = useState<ViecLabShift | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'mota' | 'yeucau' | 'phucloi'>('mota');
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [detailScrollTop, setDetailScrollTop] = useState(0);

  // Cash Wallet States
  const [walletBalance, setWalletBalance] = useState<number>(1850000);
  const [isCashOutLoading, setIsCashOutLoading] = useState<boolean>(false);

  // Selected Day in Calendar state (July 2026)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(9); // 9th is Today

  // Bottom Sheet Filter State
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(40000);
  const [maxDistanceFilter, setMaxDistanceFilter] = useState<number>(5);

  // Notification states
  const [isNotifSheetOpen, setIsNotifSheetOpen] = useState(false);
  const [notifActiveTab, setNotifActiveTab] = useState<'viecmoi' | 'lichlam' | 'thanhtoan' | 'hethong'>('viecmoi');
  const [notifications, setNotifications] = useState([
    // Việc mới
    { id: 1, title: '🔥 Khớp ca cực nhanh', desc: 'Có 3 ca làm "Pha chế" mới tại Highlands Coffee cách bạn dưới 1.5 km.', time: '2 giờ trước', unread: true, category: 'viecmoi' },
    { id: 2, title: '🍕 Pizza 4P\'s tuyển Phục vụ', desc: 'Pizza 4P\'s Bến Thành đăng tuyển ca gãy tối nay 55k/h.', time: '3 giờ trước', unread: true, category: 'viecmoi' },
    
    // Lịch làm
    { id: 3, title: '🗓️ Nhắc nhở ca làm', desc: 'Ca làm Barista của bạn tại The Coffee House Pasteur sẽ bắt đầu sau 30 phút. Chuẩn bị Check-in!', time: '30 phút trước', unread: true, category: 'lichlam' },
    { id: 4, title: '✓ Check-in được phê duyệt', desc: 'Yêu cầu check-in lúc 08:00 của bạn tại Katinat đã được quản lý phê duyệt.', time: '1 ngày trước', unread: false, category: 'lichlam' },
    
    // Thanh toán
    { id: 5, title: '💰 Thanh toán hoàn tất', desc: 'Hệ thống đã đối soát lương ca làm Katinat Saigon: +225.000đ.', time: '2 giờ trước', unread: true, category: 'thanhtoan' },
    { id: 6, title: '💸 Rút tiền thành công', desc: 'Giao dịch rút 450.000đ về Techcombank đã hoàn tất tức thì.', time: 'Hôm qua', unread: false, category: 'thanhtoan' },
    
    // Hệ thống
    { id: 7, title: '👑 Chúc mừng thăng hạng', desc: 'Tài khoản của bạn đã đạt thứ hạng Vàng (99 điểm uy tín)! Nhận ngay các ca ưu tiên.', time: '1 ngày trước', unread: false, category: 'hethong' },
    { id: 8, title: '🎉 Chào mừng đến với VIECLAB', desc: 'Hoàn tất hồ sơ cá nhân để nhận ca nhanh chóng trong vài giây.', time: '3 ngày trước', unread: false, category: 'hethong' }
  ]);

  // Realtime Chat states
  const [activeChatUser, setActiveChatUser] = useState<{ id: string; name: string; role: string; avatar: string } | null>(null);
  const [chatInputValue, setChatInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<{
    [userId: string]: {
      id: string;
      senderId: 'me' | 'them';
      text: string;
      timestamp: string;
      status: 'sending' | 'received' | 'read';
      type?: 'text' | 'image' | 'pdf' | 'audio';
      mediaUrl?: string;
      fileSize?: string;
    }[]
  }>({
    'st-1': [
      { id: 'm1', senderId: 'me', text: 'Em đã đến quán và chuẩn bị check-in chưa Nam?', timestamp: '07:50', status: 'read' },
      { id: 'm2', senderId: 'them', text: 'Dạ em đang gửi xe dưới hầm rồi ạ, 2 phút nữa em check-in nhé anh!', timestamp: '07:52', status: 'read' },
      { id: 'm3', senderId: 'me', text: 'Ok em, hôm nay đông khách pha chế cẩn thiện giúp anh nhé!', timestamp: '07:53', status: 'read' },
      { id: 'm4', senderId: 'them', text: 'Dạ em gửi ảnh quầy pha chế đã chuẩn bị xong.', timestamp: '07:54', status: 'read', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80' },
    ],
    'st-3': [
      { id: 'm1', senderId: 'me', text: 'Đức ơi, hôm nay vào ca muộn 15 phút à em? Có việc bận gì bận hả?', timestamp: '08:20', status: 'read' },
      { id: 'm2', senderId: 'them', text: 'Dạ anh ơi em xin lỗi, sáng nay xe bị hỏng xích dọc đường em phải dắt bộ sửa ạ.', timestamp: '08:22', status: 'read' },
      { id: 'm3', senderId: 'me', text: 'Ok em bận gì cứ báo sớm nhé. Anh gửi em file quy trình đối soát thu ngân mới.', timestamp: '08:25', status: 'read' },
      { id: 'm4', senderId: 'me', text: 'Quy trình thu ngân & két tiền', timestamp: '08:26', status: 'read', type: 'pdf', mediaUrl: 'Quy-trinh-thu-ngan-ViecLab.pdf', fileSize: '1.4 MB' },
      { id: 'm5', senderId: 'them', text: 'Dạ em cảm ơn anh, em đã nhận được file PDF hướng dẫn rồi, để em đọc kĩ ca trưa.', timestamp: '08:28', status: 'read' },
    ],
    'st-worker-katinat': [
      { id: 'm1', senderId: 'them', text: 'Chào Thạch, cảm ơn em đã hỗ trợ ca rửa bát tối qua tại Katinat nhé!', timestamp: 'Hôm qua, 23:15', status: 'read' },
      { id: 'm2', senderId: 'me', text: 'Dạ vâng ca tối qua đông khách nhưng máy rửa bát công nghiệp chạy mượt lắm anh.', timestamp: 'Hôm qua, 23:20', status: 'read' },
      { id: 'm3', senderId: 'them', text: 'Đây là ghi âm feedback của anh cho quản lý vùng về tinh thần của em.', timestamp: 'Hôm qua, 23:22', status: 'read', type: 'audio', mediaUrl: 'feedback_katinat.wav' },
    ]
  });

  // Rating states
  const [isRatingSheetOpen, setIsRatingSheetOpen] = useState(false);
  const [ratingJob, setRatingJob] = useState<{ id: string; title: string; restaurantName: string } | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [ratingSliderVal, setRatingSliderVal] = useState<number>(4.8);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Đúng giờ', 'Chuyên nghiệp']);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  // Onboarding States
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  // Login States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+84');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Account selector
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>('worker');

  // Merchant / Employer States
  const [isPostingFormOpen, setIsPostingFormOpen] = useState<boolean>(false);
  const [postingFormStep, setPostingFormStep] = useState<number>(1);
  const [postShopName, setPostShopName] = useState<string>('The Coffee House Bến Thành');
  const [postShopAddress, setPostShopAddress] = useState<string>('180 Pasteur, Bến Nghé, Quận 1');
  const [postRole, setPostRole] = useState<string>('Pha chế (Barista)');
  const [postHourlyRate, setPostHourlyRate] = useState<number>(45000);
  const [postHours, setPostHours] = useState<number>(5);
  const [postStaffCount, setPostStaffCount] = useState<number>(2);
  const [postDate, setPostDate] = useState<string>('Ngày mai, 10/07/2026');
  const [postTimeRange, setPostTimeRange] = useState<string>('08:00 - 13:00');
  const [postRequirements, setPostRequirements] = useState<string>('Có chứng chỉ Barista hoặc kinh nghiệm pha chế tối thiểu 6 tháng, nhanh nhẹn.');

  // AI Matching Card States
  const [hasAiMatch, setHasAiMatch] = useState<boolean>(true);
  
  // Merchant HR Staff List state
  const [merchantStaff, setMerchantStaff] = useState([
    { id: 'st-1', name: 'Nguyễn Hoàng Nam', role: 'Pha chế (Barista)', avatar: '🧑‍🍳', status: 'active', checkIn: '08:00' },
    { id: 'st-2', name: 'Trần Thị Mai', role: 'Phục vụ ca sáng', avatar: '👩‍💼', status: 'absent', checkIn: '--:--' },
    { id: 'st-3', name: 'Lê Minh Đức', role: 'Thu ngân quầy chính', avatar: '👨‍💻', status: 'late', checkIn: '08:15 (Muộn 15p)' },
    { id: 'st-4', name: 'Phạm Quốc Bảo', role: 'Phụ bếp ca sáng', avatar: '👨‍🍳', status: 'active', checkIn: '07:55' },
  ]);

  // Merchant Job Postings list state
  const [merchantJobs, setMerchantJobs] = useState([
    { id: 'mj-1', title: 'Nghệ nhân Pha chế (Barista)', status: 'available', filled: 0, total: 2, hourlyRate: 50000, date: 'Ngày mai, 10/07' },
    { id: 'mj-2', title: 'Thu ngân & Soát hóa đơn', status: 'available', filled: 1, total: 1, hourlyRate: 48000, date: 'Hôm nay, 09/07' },
  ]);

  // Dynamic metrics
  const [numStaffMetric, setNumStaffMetric] = useState<number>(12);
  const [shiftsTodayMetric, setShiftsTodayMetric] = useState<number>(5);
  const [hrCostMetric, setHrCostMetric] = useState<number>(2450000);

  // Trigger Toast Notification on the simulator
  const [simToast, setSimToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const triggerSimToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setSimToast({ message, type });
    setTimeout(() => setSimToast(null), 3000);
  };

  // Auto transition Splash to Onboarding
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Handle Apply / Nhận ca ngay
  const handleApplyJob = (jobId: string) => {
    setShifts(prev => prev.map(item => {
      if (item.id === jobId) {
        return { ...item, status: 'confirmed', slotsFilled: Math.min(item.slotsTotal, item.slotsFilled + 1) };
      }
      return item;
    }));

    // Update selected job state if open
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, status: 'confirmed', slotsFilled: Math.min(prev.slotsTotal, prev.slotsFilled + 1) } : null);
    }

    triggerSimToast('Nhận việc thành công! Ca làm đã được lưu vào Lịch.', 'success');

    // Automatically push a notification
    setNotifications(prev => [
      {
        id: Date.now(),
        title: 'Ca làm đã được xác nhận',
        desc: `Bạn đã nhận ca "${selectedJob?.title || 'Phục vụ'}" tại ${selectedJob?.restaurantName || 'nhà hàng'}.`,
        time: 'Vừa xong',
        unread: true
      },
      ...prev
    ]);
  };

  // OTP focus change
  const handleOtpChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Filter Shifts
  const filteredShifts = shifts.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchesSalary = item.hourlyRate >= minSalaryFilter;
    
    const distNum = parseFloat(item.distance.replace(/[^\d.]/g, ''));
    const matchesDistance = isNaN(distNum) || distNum <= maxDistanceFilter;

    return matchesSearch && matchesCategory && matchesSalary && matchesDistance;
  });

  // Calendar Weekly Strip Configuration (July 2026)
  const CALENDAR_DAYS = [
    { dayNum: 6, label: 'T2', status: 'completed', color: '#00C853', name: 'Thứ 2' },
    { dayNum: 7, label: 'T3', status: 'completed', color: '#00C853', name: 'Thứ 3' },
    { dayNum: 8, label: 'T4', status: 'confirmed', color: '#1565C0', name: 'Thứ 4' },
    { dayNum: 9, label: 'T5', status: 'today', color: '#FF9800', name: 'Thứ 5' }, // Today
    { dayNum: 10, label: 'T6', status: 'upcoming', color: '#FF9800', name: 'Thứ 6' },
    { dayNum: 11, label: 'T7', status: 'none', color: '', name: 'Thứ 7' },
    { dayNum: 12, label: 'CN', status: 'completed', color: '#00C853', name: 'Chủ Nhật' },
  ];

  // Calendar Day Click Handler
  const handleDaySelect = (dayNum: number) => {
    setSelectedCalendarDay(dayNum);
  };

  // Wallet Instant Cash Out Simulation
  const handleCashOut = () => {
    if (walletBalance <= 0) {
      triggerSimToast('Ví của bạn đang có số dư bằng 0đ!', 'error');
      return;
    }
    setIsCashOutLoading(true);
    setTimeout(() => {
      setIsCashOutLoading(false);
      const formattedBalance = walletBalance.toLocaleString('vi-VN') + 'đ';
      setWalletBalance(0);
      triggerSimToast(`Rút tiền thành công! ${formattedBalance} đã được chuyển về tài khoản ngân hàng liên kết.`, 'success');
      
      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          title: 'Yêu cầu rút tiền thành công',
          desc: `Số tiền ${formattedBalance} đã chuyển khoản về Techcombank *8868 của bạn.`,
          time: 'Vừa xong',
          unread: true
        },
        ...prev
      ]);
    }, 1500);
  };

  // Helper categories
  const CATEGORIES = ['Tất cả', 'Phục vụ', 'Pha chế', 'Thu ngân', 'Bếp', 'Tạp vụ', 'Quản lý', 'Giám sát'];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      
      {/* Interactive Simulator Screen Controller Header */}
      <div className="w-full flex flex-col gap-3 bg-slate-100 dark:bg-slate-900 p-4 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Smartphone className="w-4 h-4 text-primary animate-pulse" />
            <span>VIECLAB Simulator Studio</span>
          </div>

          <button
            id="sim-dark-mode-toggle"
            onClick={() => setSimDarkMode(!simDarkMode)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-xs border border-slate-200/50 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {simDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Chế độ Sáng</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Chế độ Tối</span>
              </>
            )}
          </button>
        </div>

        {/* Rapid Navigation Jump Pill Row */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chọn Quy trình/Màn hình:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'splash', label: '1. Splash' },
              { id: 'onboarding', label: '2. Onboard' },
              { id: 'login', label: '3. Đăng nhập' },
              { id: 'otp', label: '4. Nhập OTP' },
              { id: 'accountType', label: '5. Vai trò' },
              { id: 'dashboard', label: '6. Trang chính' }
            ].map(screen => (
              <button
                key={screen.id}
                id={`jump-${screen.id}`}
                onClick={() => {
                  setCurrentScreen(screen.id as SimulatorScreen);
                  if (screen.id === 'dashboard') {
                    setSelectedJob(null);
                  }
                }}
                className={`px-2 py-1.5 text-[10px] font-bold rounded-lg transition-all duration-200 text-center ${
                  currentScreen === screen.id && !selectedJob
                    ? 'bg-primary text-white shadow-xs' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-850'
                }`}
              >
                {screen.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* iPhone Device Frame */}
      <div 
        className={`
          relative w-full max-w-[375px] h-[780px] rounded-[52px] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col transition-all duration-500
          ${simDarkMode ? 'bg-[#0A0E17] text-white border-slate-850' : 'bg-[#F4F6F9] text-slate-800 border-slate-900'}
        `}
        style={{
          boxShadow: simDarkMode 
            ? '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 50px rgba(21, 101, 192, 0.15)' 
            : '0 25px 50px -12px rgba(21, 101, 192, 0.15)',
        }}
      >
        {/* iPhone Notch / Island */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-30 flex items-center justify-between px-4">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <div className="w-10 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Clock & Carrier Status Bar */}
        <div className={`px-6 pt-3.5 pb-2 flex justify-between items-center text-[11px] font-bold z-20 select-none ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <span>09:30</span>
          <div className="flex items-center gap-1.5">
            <span className="opacity-90">5G</span>
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-current rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Dynamic Toast feedback within device */}
        <AnimatePresence>
          {simToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-12 left-4 right-4 z-40"
            >
              <div className={`p-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
                simToast.type === 'success' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 backdrop-blur-md'
                  : simToast.type === 'error'
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 backdrop-blur-md'
                  : 'bg-blue-500/10 text-blue-500 border-blue-500/20 backdrop-blur-md'
              }`}>
                {simToast.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
                {simToast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{simToast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCREENS CONTAINER WITH ANIMATE PRESENCE */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* 1. Splash Screen */}
            {currentScreen === 'splash' && (
              <motion.div
                key="splash-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[#1565C0] flex flex-col justify-between p-8 z-20 text-white"
              >
                <div className="absolute inset-0 bg-linear-to-b from-blue-400/10 to-transparent pointer-events-none" />

                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  {/* Glassmorphic Brand Container */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                    className="backdrop-blur-md bg-white/10 border border-white/20 px-8 py-5 rounded-[24px] shadow-2xl flex items-center justify-center"
                  >
                    <span className="text-3.5xl font-black tracking-widest text-white">VIECLAB</span>
                  </motion.div>
                  
                  {/* Vietnamese-focused Slogan */}
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.85 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-xs font-semibold tracking-tight text-center max-w-[240px] text-blue-100"
                  >
                    Nền tảng Tuyển dụng & Khớp ca làm F&B tức thì tại Việt Nam
                  </motion.p>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-center">
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  </div>
                  <button
                    id="skip-splash"
                    onClick={() => setCurrentScreen('onboarding')}
                    className="w-full py-3.5 bg-white text-[#1565C0] font-bold rounded-[16px] text-xs hover:bg-slate-100 active:scale-[0.98] transition-all duration-200"
                  >
                    Bỏ qua Splash & Tiếp tục →
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. Onboarding Screen */}
            {currentScreen === 'onboarding' && (
              <motion.div
                key="onboarding-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-6 z-10"
              >
                {/* Top Skip row */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-primary tracking-widest">VIECLAB</span>
                  <button 
                    id="onboard-skip"
                    onClick={() => setCurrentScreen('login')}
                    className={`text-xs font-semibold ${simDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Bỏ qua
                  </button>
                </div>

                {/* Horizontal carousel content placeholder */}
                <div className="flex-1 flex flex-col justify-center space-y-6 my-4">
                  
                  {/* High-End vector mockups */}
                  <div className="relative h-48 w-full rounded-[24px] overflow-hidden bg-slate-100 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 flex items-center justify-center">
                    
                    {onboardingStep === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 text-center space-y-3 flex flex-col items-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shadow-inner animate-bounce">
                          ☕
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Cinematic staff matching</span>
                        <div className="h-1.5 w-24 bg-primary/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-2/3 rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    )}

                    {onboardingStep === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 text-center space-y-3 flex flex-col items-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-2xl shadow-inner">
                          📊
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Merchant Dashboard</span>
                        <div className="flex gap-1 items-end h-8">
                          <span className="w-3 h-4 bg-sky-500/40 rounded-xs" />
                          <span className="w-3 h-7 bg-sky-500 rounded-xs" />
                          <span className="w-3 h-5 bg-sky-500/60 rounded-xs" />
                        </div>
                      </motion.div>
                    )}

                    {onboardingStep === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 text-center space-y-3 flex flex-col items-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl shadow-inner">
                          🤝
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Unified Operations</span>
                        <div className="flex gap-[-6px]">
                          <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs">🧑</div>
                          <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs">👩</div>
                        </div>
                      </motion.div>
                    )}

                  </div>

                  {/* Heading & Paragraph Text based on active step */}
                  <div className="text-center px-4 space-y-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={onboardingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2"
                      >
                        <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">
                          {onboardingStep === 0 && "Tìm ca làm gần nhất ngay tức thì"}
                          {onboardingStep === 1 && "Thu nhập minh bạch, nhận lương nhanh"}
                          {onboardingStep === 2 && "Bảo hiểm ca làm & Đánh giá uy tín"}
                        </h3>
                        <p className={`text-[11px] ${simDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                          {onboardingStep === 0 && "Hệ thống tự động sắp xếp hàng trăm ca làm phục vụ, pha chế, bếp ngay tại khu vực của bạn chỉ trong vài nút bấm."}
                          {onboardingStep === 1 && "Theo dõi giờ làm chuẩn xác bằng QR code, kiểm soát thu nhập ngay trên ví thông minh và rút tiền trực tiếp về ngân hàng."}
                          {onboardingStep === 2 && "Tích lũy điểm uy tín sau mỗi ca làm hoàn thành để được tự động nhận các ca lương cao, độc quyền từ thương hiệu lớn."}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Navigation Indicators & Carousel controls */}
                <div className="space-y-6 pb-4">
                  {/* Morphing Pill Indicator */}
                  <div className="flex justify-center gap-1.5 items-center">
                    {[0, 1, 2].map((step) => (
                      <button
                        key={step}
                        onClick={() => setOnboardingStep(step)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          onboardingStep === step 
                            ? 'w-6 bg-primary' 
                            : 'w-2 bg-slate-300 dark:bg-slate-750'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Onboarding Action Buttons */}
                  <div className="space-y-2.5">
                    {onboardingStep === 2 ? (
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="primary" 
                          className="w-full"
                          id="onboard-start"
                          onClick={() => setCurrentScreen('login')}
                        >
                          Bắt đầu ngay
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="w-full text-xs font-bold"
                          id="onboard-login"
                          onClick={() => setCurrentScreen('login')}
                        >
                          Đăng nhập số điện thoại
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="primary" 
                        className="w-full"
                        id="onboard-next"
                        onClick={() => setOnboardingStep(prev => prev + 1)}
                      >
                        Tiếp tục
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Login Screen */}
            {currentScreen === 'login' && (
              <motion.div
                key="login-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-6 z-10"
              >
                <div className="space-y-6">
                  {/* Top Bar back button */}
                  <div className="flex items-center gap-2">
                    <button 
                      id="back-to-onboard"
                      onClick={() => setCurrentScreen('onboarding')}
                      className={`text-xs font-bold flex items-center gap-1 ${simDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      ← Trở lại
                    </button>
                  </div>

                  {/* Heading Intro */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight">Chào mừng bạn!</h2>
                    <p className={`text-xs ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nhập số điện thoại để đăng ký hoặc đăng nhập tài khoản VIECLAB</p>
                  </div>

                  {/* Phone input with country picker */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-400">Số điện thoại</span>
                      
                      <div className="flex gap-2">
                        {/* Country picker */}
                        <div className={`flex items-center gap-1.5 px-3 border rounded-[12px] text-xs font-bold select-none ${
                          simDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                          <span>🇻🇳</span>
                          <select 
                            value={countryCode} 
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="bg-transparent focus:outline-none cursor-pointer text-xs"
                          >
                            <option value="+84" className="text-slate-800">+84</option>
                            <option value="+1" className="text-slate-800">+1</option>
                            <option value="+65" className="text-slate-800">+65</option>
                          </select>
                        </div>

                        {/* Custom Input */}
                        <div className="flex-1">
                          <Input
                            placeholder="Nhập số điện thoại e.g. 090123456"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            darkMode={simDarkMode}
                            id="login-phone-number"
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full text-xs font-bold"
                      disabled={!phoneNumber}
                      id="login-phone-submit"
                      onClick={() => setCurrentScreen('otp')}
                    >
                      Tiếp tục nhận mã OTP
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {/* Social Login options */}
                <div className="space-y-5 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đăng nhập nhanh</span>
                    <span className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                  </div>

                  <div className="flex justify-center gap-4">
                    <button 
                      id="login-apple"
                      onClick={() => {
                        setPhoneNumber('0987654321');
                        setCurrentScreen('otp');
                      }}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 ${
                        simDarkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <Apple className="w-4.5 h-4.5 fill-current" />
                    </button>

                    <button 
                      id="login-google"
                      onClick={() => {
                        setPhoneNumber('0912345678');
                        setCurrentScreen('otp');
                      }}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 ${
                        simDarkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="font-black text-sm">G</span>
                    </button>

                    <button 
                      id="login-quick-demo"
                      onClick={() => {
                        setPhoneNumber('0909090909');
                        setCurrentScreen('otp');
                      }}
                      className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-tight flex items-center justify-center transition-all duration-200 active:scale-95 ${
                        simDarkMode ? 'border-primary/40 bg-primary/10 text-accent' : 'border-primary/20 bg-primary/5 text-primary'
                      }`}
                    >
                      <span>Vào Thử (Demo)</span>
                    </button>
                  </div>

                  <p className="text-[9px] text-center text-slate-400 leading-relaxed px-4">
                    Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật dữ liệu của VIECLAB.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 4. OTP Verification Screen */}
            {currentScreen === 'otp' && (
              <motion.div
                key="otp-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-6 z-10"
              >
                <div className="space-y-6">
                  {/* Back button */}
                  <div className="flex items-center gap-2">
                    <button 
                      id="back-to-phone"
                      onClick={() => setCurrentScreen('login')}
                      className={`text-xs font-bold flex items-center gap-1 ${simDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      ← Đổi số điện thoại
                    </button>
                  </div>

                  {/* Heading */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight">Xác thực mã OTP</h2>
                    <p className={`text-xs ${simDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                      Mã OTP gồm 6 chữ số đã được gửi tới số <span className="font-bold text-primary">{countryCode} {phoneNumber || '090123456'}</span>
                    </p>
                  </div>

                  {/* 6-digit OTP verification grids with focus glow */}
                  <div className="space-y-4">
                    <div className="flex justify-between gap-1.5">
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={otpRefs[index]}
                          type="text"
                          maxLength={1}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`
                            w-11 h-12 text-center text-base font-bold rounded-[12px] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                            ${simDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-850'}
                          `}
                        />
                      ))}
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full text-xs font-bold"
                      id="otp-submit"
                      onClick={() => setCurrentScreen('accountType')}
                    >
                      Xác nhận mã OTP
                    </Button>
                  </div>
                </div>

                {/* Simulated numerical keyboard at the bottom or resend action */}
                <div className="space-y-4 pb-4">
                  <div className="flex justify-between text-[11px] font-semibold px-1">
                    <span className="text-slate-400">Không nhận được mã?</span>
                    <button 
                      id="resend-otp-mock"
                      onClick={() => setOtpDigits(['6', '8', '6', '8', '6', '8'])}
                      className="text-primary font-bold hover:underline"
                    >
                      Gửi lại (Mã mẫu: 686868)
                    </button>
                  </div>

                  {/* Virtual keyboard replica */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded-[24px] bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          const emptyIndex = otpDigits.findIndex(d => d === '');
                          if (emptyIndex !== -1) {
                            handleOtpChange(emptyIndex, num.toString());
                          }
                        }}
                        className={`py-2 text-xs font-bold rounded-xl active:scale-95 transition-all ${
                          simDarkMode ? 'bg-slate-800 text-white hover:bg-slate-750' : 'bg-white text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button 
                      onClick={() => setOtpDigits(['', '', '', '', '', ''])}
                      className={`py-2 text-[10px] font-bold rounded-xl ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
                    >
                      Xoá hết
                    </button>
                    <button
                      onClick={() => {
                        const emptyIndex = otpDigits.findIndex(d => d === '');
                        if (emptyIndex !== -1) {
                          handleOtpChange(emptyIndex, '0');
                        }
                      }}
                      className={`py-2 text-xs font-bold rounded-xl ${
                        simDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'
                      }`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => {
                        const filledIndex = [...otpDigits].reverse().findIndex(d => d !== '');
                        if (filledIndex !== -1) {
                          const realIndex = 5 - filledIndex;
                          const newOtp = [...otpDigits];
                          newOtp[realIndex] = '';
                          setOtpDigits(newOtp);
                          otpRefs[realIndex].current?.focus();
                        }
                      }}
                      className="py-2 text-xs font-bold text-rose-500 rounded-xl"
                    >
                      ←
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. Account Type Selection Screen */}
            {currentScreen === 'accountType' && (
              <motion.div
                key="account-type-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-6 z-10"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">BƯỚC CUỐI CÙNG</span>
                    <h2 className="text-lg font-black tracking-tight text-slate-800 dark:text-white">Chọn loại tài khoản</h2>
                    <p className={`text-xs ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Chọn vai trò để tiếp tục trải nghiệm giao diện được cá nhân hóa
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Người tìm việc */}
                    <button
                      id="account-worker"
                      onClick={() => setSelectedAccountType('worker')}
                      className={`relative flex flex-col items-start p-4 rounded-[20px] border-2 text-left transition-all duration-300 ${
                        selectedAccountType === 'worker'
                          ? 'border-primary bg-primary/5'
                          : simDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-[14px] bg-blue-500/10 flex items-center justify-center text-primary mb-3">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">VIECLAB GIG</span>
                      <span className="text-xs font-extrabold mt-1 text-slate-800 dark:text-white">Người tìm việc</span>
                      <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">Tìm ca làm nhanh, nhận lương ngay</p>

                      {selectedAccountType === 'worker' && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>

                    {/* Chủ doanh nghiệp */}
                    <button
                      id="account-owner"
                      onClick={() => setSelectedAccountType('owner')}
                      className={`relative flex flex-col items-start p-4 rounded-[20px] border-2 text-left transition-all duration-300 ${
                        selectedAccountType === 'owner'
                          ? 'border-primary bg-primary/5'
                          : simDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                        <Store className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">MERCHANT</span>
                      <span className="text-xs font-extrabold mt-1 text-slate-800 dark:text-white">Doanh nghiệp</span>
                      <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">Tuyển dụng ca, chấm công tự động</p>

                      {selectedAccountType === 'owner' && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pb-4">
                  <Button
                    variant="primary"
                    className="w-full text-xs font-bold"
                    disabled={!selectedAccountType}
                    id="account-submit"
                    onClick={() => {
                      setActiveTab('trangchu');
                      setCurrentScreen('dashboard');
                      if (selectedAccountType === 'owner') {
                        triggerSimToast(`Chào mừng bạn đến với giao diện Quản lý Doanh nghiệp!`, 'success');
                      } else {
                        triggerSimToast(`Chào mừng bạn quay lại với vai trò Người tìm việc!`, 'info');
                      }
                    }}
                  >
                    Xác nhận và tiếp tục
                  </Button>
                  <p className="text-[9px] text-center text-slate-500">
                    Bạn luôn có thể chuyển đổi hoặc nâng cấp vai trò tài khoản bất cứ lúc nào tại phần Cá nhân.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 6. Main Shift Recruiter & Employee Dashboard */}
            {currentScreen === 'dashboard' && !selectedJob && (
              <motion.div
                key="dashboard-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col z-10"
              >
                {/* STICKY HEADER FOR VIECLAB CONSOLE */}
                <div className={`sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b transition-colors duration-300 ${
                  simDarkMode ? 'border-slate-900 bg-[#0A0E17]/90' : 'border-slate-100 bg-white/90'
                } backdrop-blur-md`}>
                  {selectedAccountType === 'owner' ? (
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        {/* Merchant Avatar container */}
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center font-black text-emerald-500 border border-emerald-500/30 text-lg overflow-hidden select-none">
                          ☕
                        </div>
                        {/* Green online indicator badge */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0A0E17]" style={{ borderColor: simDarkMode ? '#0A0E17' : '#FFFFFF' }} />
                      </div>
                      <div>
                        <p className={`text-[9px] leading-none ${simDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Quản trị viên 🏢</p>
                        <h2 className="text-xs font-black tracking-tight mt-0.5 text-slate-800 dark:text-white">TCH Pasteur</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-10 h-10">
                        {/* pulsing green radar rings */}
                        {isOnline && (
                          <>
                            <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping scale-150" />
                            <span className="absolute -inset-1 rounded-full border border-emerald-500/25 animate-pulse" />
                          </>
                        )}
                        {/* Avatar container */}
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary border border-primary/30 text-sm overflow-hidden select-none relative z-10">
                          <span className="font-extrabold tracking-tight">T</span>
                        </div>
                        {/* Green online indicator badge */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0A0E17] z-20" style={{ borderColor: simDarkMode ? '#0A0E17' : '#FFFFFF' }} />
                      </div>
                      <div>
                        <p className={`text-[9px] leading-none ${simDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Xin chào, 👋</p>
                        <h2 className="text-xs font-black tracking-tight mt-0.5 text-slate-800 dark:text-white">Thạch (thachsv2006)</h2>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    {/* Notification bell icon with a red unread badge */}
                    <button
                      id="bell-notif-btn"
                      onClick={() => setIsNotifSheetOpen(true)}
                      className={`relative p-2 rounded-xl border transition-all duration-200 active:scale-95 ${
                        simDarkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                      {notifications.some(n => n.unread) && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </button>
                  </div>
                </div>

                {/* MAIN SCROLLABLE WRAPPER */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
                  
                  {selectedAccountType === 'owner' ? (
                    <>
                      {/* MERCHANT TAB 1: TRANG CHỦ */}
                      {activeTab === 'trangchu' && (
                        <div className="space-y-4">
                          {/* Metric Summary Cards with soft semantic fills */}
                          <div className="grid grid-cols-3 gap-2">
                            {/* Số nhân viên */}
                            <div className="p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 border border-indigo-500/10 flex flex-col justify-between h-22">
                              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Số Nhân Viên</span>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-xl font-black">{numStaffMetric}</span>
                                <span className="text-[9px] font-bold text-indigo-500">đang trực</span>
                              </div>
                            </div>

                            {/* Ca hôm nay */}
                            <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/10 flex flex-col justify-between h-22">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Ca Hôm Nay</span>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-xl font-black">{shiftsTodayMetric}</span>
                                <span className="text-[9px] font-bold text-emerald-500 font-sans">active</span>
                              </div>
                            </div>

                            {/* Chi phí nhân sự */}
                            <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/10 flex flex-col justify-between h-22 overflow-hidden">
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">Chi Phí</span>
                              <div className="mt-1 flex flex-col">
                                <span className="text-xs font-black truncate">{hrCostMetric.toLocaleString('vi-VN')}đ</span>
                                <span className="text-[8px] font-bold text-amber-500">ước tính ca trọn</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="grid grid-cols-4 gap-1.5">
                            <button
                              id="btn-post-shift-quick"
                              onClick={() => {
                                setIsPostingFormOpen(true);
                                setPostingFormStep(1);
                              }}
                              className={`p-2 py-3 rounded-xl border flex flex-col items-center gap-1.5 justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                                simDarkMode ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <Plus className="w-4 h-4 text-primary" />
                              <span className="text-[9px] font-black tracking-tight text-center leading-none">Thuê ca</span>
                            </button>

                            <button
                              id="btn-radar-quick"
                              onClick={() => {
                                setCurrentScreen('radar');
                                triggerSimToast('Đang khởi động Rada tìm ứng viên tức thì...', 'info');
                              }}
                              className="p-2 py-3 rounded-xl border border-blue-500/30 bg-blue-500/10 flex flex-col items-center gap-1.5 justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
                            >
                              <span className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                              <Navigation className="w-4 h-4 text-blue-500 animate-bounce" />
                              <span className="text-[9px] font-black tracking-tight text-blue-500 text-center leading-none">Quét Rada 📡</span>
                            </button>

                            <button
                              id="btn-manage-staff-quick"
                              onClick={() => setActiveTab('vieclam')}
                              className={`p-2 py-3 rounded-xl border flex flex-col items-center gap-1.5 justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                                simDarkMode ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <Users className="w-4 h-4 text-emerald-500" />
                              <span className="text-[9px] font-black tracking-tight text-center leading-none">Nhân sự</span>
                            </button>

                            <button
                              id="btn-reports-quick"
                              onClick={() => setActiveTab('vi')}
                              className={`p-2 py-3 rounded-xl border flex flex-col items-center gap-1.5 justify-center transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                                simDarkMode ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <BarChart3 className="w-4 h-4 text-amber-500" />
                              <span className="text-[9px] font-black tracking-tight text-center leading-none">Báo cáo</span>
                            </button>
                          </div>

                          {/* Banner for candidate radar */}
                          <div 
                            id="btn-radar-banner-promo"
                            onClick={() => {
                              setCurrentScreen('radar');
                              triggerSimToast('Đang khởi động Rada tìm ứng viên...', 'info');
                            }}
                            className="relative rounded-2xl overflow-hidden cursor-pointer border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 p-4 flex justify-between items-center group hover:border-blue-500/40 transition-all duration-300 shadow-md"
                          >
                            <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
                            
                            <div className="space-y-1 z-10">
                              <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Rada tức thì</span>
                              </div>
                              <h4 className="text-xs font-black text-white">Quét Ứng Viên Quanh Đây 📡</h4>
                              <p className="text-[9px] text-slate-400 max-w-[210px] leading-tight">
                                Bản đồ tìm kiếm & gửi lời mời trực tiếp tới ứng viên sẵn sàng đi làm ngay trong bán kính 2km - 5km.
                              </p>
                            </div>
                            
                            <div className="w-11 h-11 rounded-full bg-blue-550/15 border border-blue-500/20 flex items-center justify-center text-xl z-10 shrink-0 group-hover:scale-110 transition-transform relative overflow-hidden">
                              <span className="animate-ping absolute inset-0 bg-blue-550/10 rounded-full" />
                              🧭
                            </div>
                          </div>

                          {/* Premium AI Matching Card Component */}
                          <AnimatePresence>
                            {hasAiMatch && (
                              <motion.div
                                key="ai-matching-card"
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="relative p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-r from-violet-650 via-fuchsia-500 to-indigo-600 shadow-md"
                              >
                                {/* Active pulsing gradient glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 opacity-25 animate-pulse" />
                                
                                <div className={`relative p-4 rounded-[14px] flex flex-col gap-3 z-10 ${
                                  simDarkMode ? 'bg-[#0E1321]' : 'bg-white'
                                }`}>
                                  {/* Header title */}
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-black text-white px-2 py-0.5 rounded-full bg-violet-600 animate-pulse tracking-wide select-none">
                                        ✨ AI MATCH 96%
                                      </span>
                                      <h4 className="text-xs font-black text-slate-800 dark:text-white">Ứng viên sáng giá</h4>
                                    </div>
                                    <span className="text-[9px] font-extrabold text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-md">Vàng 👑</span>
                                  </div>

                                  {/* Candidate profile bio row */}
                                  <div className="flex gap-2.5 items-center pb-2.5 border-b border-slate-100 dark:border-slate-800/60">
                                    <div className="w-9 h-9 rounded-full bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-lg">
                                      🙋‍♂️
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-black text-slate-850 dark:text-white leading-none">Lâm Minh Khang</h5>
                                      <p className="text-[9px] text-violet-400 font-bold mt-1">Barista chuyên nghiệp • 23 tuổi</p>
                                    </div>
                                  </div>

                                  {/* Match points bullet list */}
                                  <div className="space-y-1.5">
                                    <div className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="text-emerald-500 shrink-0">📍</span>
                                      <p className={simDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                                        <strong>Khoảng cách:</strong> Cách quán của bạn chỉ <strong className="text-emerald-400">0.6 km</strong>
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="text-emerald-500 shrink-0">⭐</span>
                                      <p className={simDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                                        <strong>Kinh nghiệm:</strong> <strong className="text-amber-500">4.95/5.0★</strong> từ 18 ca làm Barista Phúc Long & Highlands
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="text-emerald-500 shrink-0">📉</span>
                                      <p className={simDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                                        <strong>Tỉ lệ huỷ ca:</strong> Cực thấp (<strong className="text-emerald-400">&lt; 2%</strong> trong 3 tháng gần nhất)
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-1.5 text-[9.5px]">
                                      <span className="text-emerald-500 shrink-0">⚡</span>
                                      <p className={simDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                                        <strong>Thói quen:</strong> Luôn Check-In sớm trước trung bình <strong className="text-emerald-400">10 phút</strong>
                                      </p>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2 justify-end pt-1">
                                    <button
                                      id="btn-ai-reject"
                                      onClick={() => {
                                        setHasAiMatch(false);
                                        triggerSimToast('Đã bỏ qua ứng viên. Hệ thống đang tìm kiếm hồ sơ khác.', 'info');
                                      }}
                                      className="px-3 py-1.5 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-300 transition-all active:scale-95"
                                    >
                                      Từ chối
                                    </button>
                                    <button
                                      id="btn-ai-approve"
                                      onClick={() => {
                                        setHasAiMatch(false);
                                        setNumStaffMetric(prev => prev + 1);
                                        setShiftsTodayMetric(prev => prev + 1);
                                        setHrCostMetric(prev => prev + 250000);
                                        
                                        // Prepend new staff member to the merchantStaff state list
                                        setMerchantStaff(prev => [
                                          { id: 'st-temp', name: 'Lâm Minh Khang', role: 'Pha chế (Barista)', avatar: '🙋‍♂️', status: 'active', checkIn: '09:42' },
                                          ...prev
                                        ]);

                                        triggerSimToast('Duyệt thành công! Đã tự động thêm Lâm Minh Khang vào ca làm.', 'success');
                                      }}
                                      className="px-3.5 py-1.5 rounded-xl text-[9px] font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10 transition-all active:scale-95"
                                    >
                                      Duyệt ngay
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Premium Data Visualizer Block: Expenditure Analytics */}
                          <div className={`p-4 rounded-[20px] border space-y-4 ${
                            simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                          }`}>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">CHI PHÍ VẬN HÀNH</span>
                                <h4 className="text-xs font-black text-slate-800 dark:text-white mt-0.5">Phân bổ ngân sách theo tuần</h4>
                              </div>
                              <span className="text-[9px] text-emerald-400 font-extrabold flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> +12% tháng này
                              </span>
                            </div>

                            {/* Custom CSS Bar Charts showing weekly cost distribution */}
                            <div className="h-28 flex items-end justify-between gap-1 pt-4 px-1">
                              {[
                                { day: 'T2', cost: '350K', height: '35%' },
                                { day: 'T3', cost: '420K', height: '42%' },
                                { day: 'T4', cost: '510K', height: '51%' },
                                { day: 'T5', cost: '2.45M', height: '95%', active: true },
                                { day: 'T6', cost: '750K', height: '65%' },
                                { day: 'T7', cost: '900K', height: '80%' },
                                { day: 'CN', cost: '850K', height: '75%' }
                              ].map((bar, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                                  {/* Cost bubble shown on hover */}
                                  <span className={`text-[8px] font-mono font-black scale-90 opacity-70 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ${
                                    bar.active ? 'text-emerald-500' : 'text-slate-400'
                                  }`}>
                                    {bar.cost}
                                  </span>
                                  
                                  {/* Bar */}
                                  <div className="w-full relative h-full flex items-end justify-center">
                                    <div 
                                      className={`w-3.5 rounded-t-md transition-all duration-500 ease-out ${
                                        bar.active 
                                          ? 'bg-emerald-500 shadow-md shadow-emerald-500/20' 
                                          : 'bg-primary/20 hover:bg-primary/40'
                                      }`} 
                                      style={{ height: bar.height }}
                                    />
                                  </div>

                                  <span className={`text-[9px] font-bold ${
                                    bar.active ? 'text-emerald-500 font-extrabold' : 'text-slate-400'
                                  }`}>
                                    {bar.day}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Fill rate statistics and progress ring */}
                          <div className={`p-4 rounded-[20px] border flex gap-4 items-center justify-between ${
                            simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                          }`}>
                            <div className="space-y-1.5 max-w-[170px]">
                              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block">CHỈ SỐ HIỆU SUẤT</span>
                              <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">Tỷ lệ lấp đầy ca làm đạt tối ưu</h4>
                              <p className="text-[9.5px] text-slate-400 leading-normal">
                                Cao hơn <strong className="text-emerald-400">4.2%</strong> so với mặt bằng chung các chuỗi Cafe Quận 1.
                              </p>
                            </div>

                            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                              {/* SVG Progress Circle Ring */}
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                  className="text-slate-200 dark:text-slate-800"
                                  strokeWidth="3.5"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="text-violet-500"
                                  strokeDasharray="86, 100"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                <span className="text-xs font-black text-slate-800 dark:text-white leading-none">86%</span>
                                <span className="text-[7px] font-bold text-violet-400 mt-0.5 uppercase">Filled</span>
                              </div>
                            </div>
                          </div>

                          {/* Dynamic FAB trigger in viewport */}
                          <div className="pt-1">
                            <Button
                              variant="primary"
                              id="btn-trigger-posting-form"
                              onClick={() => {
                                setIsPostingFormOpen(true);
                                setPostingFormStep(1);
                              }}
                              className="w-full py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 h-11 rounded-[16px]"
                            >
                              <Plus className="w-4 h-4" /> Đăng Tuyển Ca Mới
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* MERCHANT TAB 2: NHÂN SỰ */}
                      {activeTab === 'vieclam' && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Quản lý Nhân sự Ca trực</h3>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Theo dõi check-in GPS thời gian thực & duyệt bảng chấm công nhân sự
                            </p>
                          </div>

                          {/* Staff rows */}
                          <div className="space-y-3">
                            {merchantStaff.map((staff) => (
                              <div
                                key={staff.id}
                                className={`p-3.5 rounded-[20px] border flex flex-col gap-3 transition-all duration-200 ${
                                  simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex gap-2.5 items-center">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900/10 border border-slate-800/20 flex items-center justify-center text-xl select-none">
                                      {staff.avatar}
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">{staff.name}</h4>
                                      <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{staff.role}</p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-1">
                                    {staff.status === 'active' && (
                                      <span className="px-2.5 py-0.5 text-[9px] font-black rounded-full bg-emerald-500/15 text-emerald-450 border border-emerald-500/25">
                                        Đang trong ca
                                      </span>
                                    )}
                                    {staff.status === 'absent' && (
                                      <span className="px-2.5 py-0.5 text-[9px] font-black rounded-full bg-slate-500/15 text-slate-405 border border-slate-500/25">
                                        Nghỉ ca
                                      </span>
                                    )}
                                    {staff.status === 'late' && (
                                      <span className="px-2.5 py-0.5 text-[9px] font-black rounded-full bg-amber-500/15 text-amber-505 border border-amber-500/25">
                                        Vào muộn
                                      </span>
                                    )}
                                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">Check-in: {staff.checkIn}</span>
                                  </div>
                                </div>

                                {/* Action and status dropdown toggles */}
                                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-slate-500 font-bold">Trạng thái:</span>
                                    <select
                                      value={staff.status}
                                      onChange={(e) => {
                                        const newStatus = e.target.value;
                                        setMerchantStaff(prev => prev.map(s => s.id === staff.id ? { ...s, status: newStatus } : s));
                                        
                                        if (newStatus === 'active') {
                                          setNumStaffMetric(prev => prev + 1);
                                          triggerSimToast(`Đã chuyển trạng thái ${staff.name} thành Đang trong ca!`, 'success');
                                        } else {
                                          setNumStaffMetric(prev => Math.max(0, prev - 1));
                                          triggerSimToast(`Đã chuyển trạng thái ${staff.name} thành ${newStatus === 'absent' ? 'Nghỉ ca' : 'Vào muộn'}!`, 'info');
                                        }
                                      }}
                                      className={`text-[9.5px] font-bold rounded-lg px-2 py-0.5 focus:outline-none border ${
                                        simDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-750'
                                      }`}
                                    >
                                      <option value="active">Đang làm</option>
                                      <option value="late">Vào muộn</option>
                                      <option value="absent">Nghỉ ca</option>
                                    </select>
                                  </div>

                                  <div className="flex gap-1.5">
                                    <button
                                      onClick={() => {
                                        setActiveChatUser({
                                          id: staff.id,
                                          name: staff.name,
                                          role: staff.role,
                                          avatar: staff.avatar,
                                          online: true
                                        });
                                      }}
                                      className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-primary text-white hover:bg-primary/95 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                    >
                                      💬 Nhắn tin
                                    </button>
                                    <button
                                      onClick={() => {
                                        triggerSimToast(`Phê duyệt bảng công ca của ${staff.name} thành công. Lương đã quyết toán!`, 'success');
                                        setMerchantStaff(prev => prev.map(s => s.id === staff.id ? { ...s, status: 'absent', checkIn: '--:--' } : s));
                                        setNumStaffMetric(prev => Math.max(0, prev - 1));
                                      }}
                                      className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                                    >
                                      ✓ Chấm công
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MERCHANT TAB 3: TIN TUYỂN */}
                      {activeTab === 'lichlam' && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Tin tuyển dụng ca làm</h3>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Theo dõi tỷ lệ lấp đầy ca trực F&B đang phát sóng trực tuyến
                            </p>
                          </div>

                          <div className="space-y-3">
                            {merchantJobs.map((job) => (
                              <div
                                key={job.id}
                                className={`p-3.5 rounded-[20px] border flex flex-col gap-3 transition-all duration-200 ${
                                  simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex gap-2 items-center">
                                    <span className="text-xl">☕</span>
                                    <div>
                                      <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">{job.title}</h4>
                                      <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">TCH Pasteur • {job.date}</p>
                                    </div>
                                  </div>
                                  <span className="px-2 py-0.5 text-[9px] font-black rounded-md bg-amber-500/10 text-amber-550 uppercase tracking-wider">
                                    Đang Tuyển
                                  </span>
                                </div>

                                {/* Progress bar showing fill rate */}
                                <div className="space-y-1 pt-1">
                                  <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                    <span>Tỉ lệ ứng tuyển:</span>
                                    <span className="text-primary">{job.filled}/{job.total} ứng viên</span>
                                  </div>
                                  <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full transition-all duration-500" 
                                      style={{ width: `${(job.filled / job.total) * 100}%` }}
                                    />
                                  </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800 rounded-xl p-2.5 flex justify-between text-[10px] font-mono items-center">
                                  <span className="text-slate-400 font-bold">Lương ca: {job.hourlyRate.toLocaleString('vi-VN')}đ/h</span>
                                  <span className="text-emerald-500 font-black">Ước tính: {((job.hourlyRate || 45000) * 5 * job.total).toLocaleString('vi-VN')}đ</span>
                                </div>

                                <div className="flex gap-2 justify-end pt-1">
                                  <button
                                    onClick={() => {
                                      setMerchantJobs(prev => prev.filter(j => j.id !== job.id));
                                      triggerSimToast('Đã đóng tin tuyển dụng ca làm này.', 'info');
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                                      simDarkMode ? 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }`}
                                  >
                                    Dừng tuyển
                                  </button>
                                  <button
                                    onClick={() => triggerSimToast('Đã đẩy tin đăng lên đầu bảng tìm kiếm thành công!', 'success')}
                                    className="px-3.5 py-1.5 rounded-lg text-[10px] font-black bg-primary hover:bg-primary/95 text-white shadow-md shadow-primary/10 transition-all active:scale-95"
                                  >
                                    ⚡ Đẩy tin
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MERCHANT TAB 4: BÁO CÁO */}
                      {activeTab === 'vi' && (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Báo cáo chi phí vận hành</h3>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Tổng hợp dữ liệu chi tiêu, kết toán lương và tối ưu hóa ngân sách F&B
                            </p>
                          </div>

                          {/* General Financial card */}
                          <div 
                            className="relative w-full rounded-[24px] p-5 text-white overflow-hidden flex flex-col justify-between"
                            style={{
                              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.85) 100%)',
                              boxShadow: '0 12px 30px rgba(16, 185, 129, 0.25)',
                            }}
                          >
                            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                            
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100 block">TỔNG CHI TIÊU THÁNG 07</span>
                                <span className="text-[9px] font-bold text-emerald-200 block mt-0.5">THE COFFEE HOUSE</span>
                              </div>
                              <div className="flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded-lg backdrop-blur-md text-[8px] font-black uppercase">
                                Realtime Stats
                              </div>
                            </div>

                            <div className="mt-4">
                              <span className="text-[9px] font-bold text-emerald-100/90 block uppercase tracking-wider">Tổng ngân sách lương đã thanh toán:</span>
                              <span className="text-xl font-black text-white tracking-wide">
                                14.580.000đ
                              </span>
                            </div>

                            <div className="flex justify-between items-end mt-4 text-[9px] text-emerald-100/80 font-bold">
                              <span>Tiết kiệm 8% nhờ ca gãy linh hoạt</span>
                              <span>Mới nhất: 09:40</span>
                            </div>
                          </div>

                          {/* Expense distribution list */}
                          <div className="space-y-3 pt-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Phân bổ chi phí theo vị trí:</span>
                            
                            <div className={`p-4 rounded-[20px] border space-y-3.5 ${
                              simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                            }`}>
                              {/* Row 1: Pha chế */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                  <span className="text-slate-700 dark:text-slate-300">Pha chế (Barista)</span>
                                  <span>45% (6.560.000đ)</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }} />
                                </div>
                              </div>

                              {/* Row 2: Phục vụ */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                  <span className="text-slate-700 dark:text-slate-300">Phục vụ khách hàng</span>
                                  <span>35% (5.103.000đ)</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '35%' }} />
                                </div>
                              </div>

                              {/* Row 3: Thu ngân */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                  <span className="text-slate-700 dark:text-slate-300">Thu ngân & POS</span>
                                  <span>20% (2.917.000đ)</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Payment History */}
                          <div className="space-y-2.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Giao dịch ví doanh nghiệp:</span>
                            
                            <div className="space-y-2">
                              <div className={`p-3 rounded-xl flex justify-between items-center ${simDarkMode ? 'bg-slate-900/40 border border-slate-800' : 'bg-white border border-slate-150'}`}>
                                <div className="flex gap-2.5 items-center">
                                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-black">✓</span>
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Thanh toán lương ca trưa (Lâm Minh Khang)</h4>
                                    <p className="text-[9px] text-slate-400">Đã quyết toán lúc 09:40 Hôm nay</p>
                                  </div>
                                </div>
                                <span className="text-xs font-black text-rose-550 shrink-0">-225.000đ</span>
                              </div>

                              <div className={`p-3 rounded-xl flex justify-between items-center ${simDarkMode ? 'bg-slate-900/40 border border-slate-800' : 'bg-white border border-slate-150'}`}>
                                <div className="flex gap-2.5 items-center">
                                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-black">✓</span>
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Thanh toán lương ca sáng (Nguyễn Hoàng Nam)</h4>
                                    <p className="text-[9px] text-slate-400">Quyết toán hôm qua</p>
                                  </div>
                                </div>
                                <span className="text-xs font-black text-rose-550 shrink-0">-200.000đ</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* MERCHANT TAB 5: CÁ NHÂN */}
                      {activeTab === 'taikhoan' && (
                        <div className="space-y-4">
                          {/* Store profile */}
                          <div className={`p-4 rounded-[20px] border flex flex-col items-center text-center space-y-3 ${
                            simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                          }`}>
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl font-black text-emerald-500 select-none">
                              ☕
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-black text-slate-800 dark:text-white">The Coffee House - Pasteur</h3>
                              <p className="text-[10px] text-slate-400 mt-0.5">partner-id: TCH-8868</p>
                              <p className="text-[10px] text-emerald-500 font-bold mt-1.5 flex items-center gap-1 justify-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Tài khoản Merchant: Doanh nghiệp Vàng 💎
                              </p>
                            </div>
                          </div>

                          {/* System toggles */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Cấu hình hệ thống:</span>
                            
                            <div className={`rounded-xl border divide-y overflow-hidden ${
                              simDarkMode ? 'bg-slate-900/40 border-slate-800 divide-slate-800' : 'bg-white border-slate-150 divide-slate-150'
                            }`}>
                              <button
                                id="btn-switch-to-owner"
                                onClick={() => {
                                  setSelectedAccountType('owner');
                                  triggerSimToast('Bạn đang ở giao diện Doanh nghiệp.', 'info');
                                }}
                                className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-800/10"
                              >
                                <div className="flex items-center gap-2">
                                  <Store className="w-4 h-4 text-emerald-500" />
                                  <span>Giao diện Doanh nghiệp (Active)</span>
                                </div>
                                <Check className="w-4 h-4 text-emerald-500" />
                              </button>

                              <button
                                id="btn-switch-to-worker"
                                onClick={() => {
                                  setSelectedAccountType('worker');
                                  setActiveTab('trangchu');
                                  triggerSimToast('Đã đổi sang giao diện Người tìm việc!', 'info');
                                }}
                                className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-800/10"
                              >
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary" />
                                  <span>Chuyển sang vai trò Người tìm việc</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </button>

                              <button
                                id="btn-logout-sim"
                                onClick={() => {
                                  setCurrentScreen('login');
                                  setSelectedJob(null);
                                  triggerSimToast('Đã đăng xuất tài khoản.', 'info');
                                }}
                                className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-rose-500 hover:bg-rose-500/5"
                              >
                                <div className="flex items-center gap-2">
                                  <LogOut className="w-4 h-4" />
                                  <span>Đăng xuất tài khoản</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-rose-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* TAB 1: TRANG CHỦ */}
                      {activeTab === 'trangchu' && (
                    <>
                      {/* Nhận Ca Tức Thì (Instant Shift Claiming) Module */}
                      <InstantShiftClaiming 
                        isOnline={isOnline}
                        setIsOnline={setIsOnline}
                        triggerSimToast={triggerSimToast}
                        simDarkMode={simDarkMode}
                      />

                      {/* Search & Filter bar: Rounded 16px input field with integrated sliding sheet filter button. */}
                      <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                          <Input
                            placeholder="Tìm kiếm Phúc Long, Highland, Pizza..."
                            darkMode={simDarkMode}
                            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            id="search-input"
                            className="rounded-[16px]"
                          />
                        </div>
                        {/* Integrated sliding sheet filter button */}
                        <button
                          id="home-filter-btn"
                          onClick={() => setIsFilterSheetOpen(true)}
                          className={`p-3.5 rounded-[16px] border transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 ${
                            simDarkMode 
                              ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white' 
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Filter className="w-4 h-4 text-primary" />
                        </button>
                      </div>

                      {/* Horizontal Scroll Category Chips: (Phục vụ, Pha chế, Thu ngân, Bếp, Tạp vụ, Quản lý, Giám sát) with elegant thin borders. */}
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${simDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Danh mục công việc:</span>
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              id={`cat-chip-${cat}`}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-300 shrink-0 border select-none ${
                                selectedCategory === cat
                                  ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20'
                                  : simDarkMode
                                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:text-slate-800'
                              }`}
                            >
                              {cat === 'Tất cả' ? '🎯 Tất cả' : cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* "Việc gần bạn" Feed: Vertical list of cards (Radius 20px, Padding 16px) */}
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black tracking-wider uppercase ${simDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Việc gần bạn ({filteredShifts.length})
                          </span>
                          <span className="text-[10px] text-primary font-bold">Lọc GPS 📍</span>
                        </div>

                        {filteredShifts.length === 0 ? (
                          <div className="py-12 text-center bg-slate-900/10 rounded-2xl border border-dashed border-slate-800">
                            <p className="text-slate-400 text-xs font-semibold">Không tìm thấy ca làm phù hợp</p>
                            <p className="text-slate-500 text-[10px] mt-1">Hãy thử hạ bớt bộ lọc lương hoặc đổi danh mục</p>
                            <button 
                              onClick={() => {
                                setSelectedCategory('Tất cả');
                                setMinSalaryFilter(40000);
                                setMaxDistanceFilter(5);
                                setSearchQuery('');
                              }}
                              className="text-xs text-primary font-bold mt-3 underline"
                            >
                              Đặt lại bộ lọc
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredShifts.map((shift) => (
                              <div
                                key={shift.id}
                                id={`job-card-${shift.id}`}
                                onClick={() => {
                                  setSelectedJob(shift);
                                  setDetailScrollTop(0);
                                }}
                                className={`group relative block p-4 rounded-[20px] border cursor-pointer transition-all duration-300 hover:scale-[0.99] hover:border-primary/50 select-none ${
                                  simDarkMode 
                                    ? 'bg-[#0E1321] border-slate-850 hover:bg-[#12192A] text-white shadow-md' 
                                    : 'bg-white border-slate-150/80 hover:bg-slate-50 text-slate-800 shadow-sm'
                                }`}
                              >
                                <div className="flex gap-3 items-start">
                                  {/* Restaurant Logo */}
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shadow-inner shrink-0 select-none">
                                    {shift.logo}
                                  </div>
                                  
                                  {/* Shift Content */}
                                  <div className="flex-1 space-y-1.5 overflow-hidden">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate max-w-[130px]">
                                        {shift.restaurantName}
                                      </span>
                                      {/* Distance Tag: Cách 1.2 km in Accent Blue */}
                                      <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-blue-500/10 text-blue-400">
                                        📍 {shift.distance}
                                      </span>
                                    </div>

                                    <h4 className="text-xs font-black leading-snug tracking-tight text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-200">
                                      {shift.title}
                                    </h4>

                                    {/* Shift timing details */}
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>{shift.time}</span>
                                    </div>
                                  </div>

                                  {/* Star Rating & Salary */}
                                  <div className="text-right shrink-0 flex flex-col justify-between items-end h-11">
                                    {/* Star Rating: 4.9⭐ */}
                                    <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                                      {shift.rating} <Star className="w-3 h-3 fill-current inline" />
                                    </span>

                                    {/* Salary: 50.000đ/giờ bold in Success Green */}
                                    <span className="text-xs font-extrabold text-emerald-500">
                                      {shift.hourlyRate.toLocaleString('vi-VN')}đ/giờ
                                    </span>
                                  </div>
                                </div>

                                {/* Bottom info bar & Mini Action Button "Nhận việc" */}
                                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80">
                                  <div className="flex items-center gap-1.5 text-[10px]">
                                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                                      shift.status === 'available' ? 'bg-amber-500/10 text-amber-500' :
                                      shift.status === 'confirmed' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                      {shift.status === 'available' ? 'ĐANG TUYỂN' :
                                       shift.status === 'confirmed' ? 'ĐÃ NHẬN' : 'HOÀN THÀNH'}
                                    </span>
                                    <span className="text-slate-400 font-semibold">
                                      Cần: {shift.slotsFilled}/{shift.slotsTotal} ứng viên
                                    </span>
                                  </div>

                                  {/* Mini primary action button "Nhận việc" */}
                                  <button
                                    id={`apply-btn-mini-${shift.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (shift.status === 'available') {
                                        handleApplyJob(shift.id);
                                      } else {
                                        triggerSimToast('Bạn đã ứng tuyển hoặc ca làm đã đóng.', 'info');
                                      }
                                    }}
                                    disabled={shift.status !== 'available'}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all duration-200 hover:scale-105 active:scale-95 ${
                                      shift.status === 'available'
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    }`}
                                  >
                                    Nhận việc
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* TAB 2: VIỆC LÀM */}
                  {activeTab === 'vieclam' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Bản Đồ Ca Làm & Tìm Kiếm</h3>
                        <p className={`text-[10px] ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tất cả các ca làm F&B đã được sắp xếp thông minh theo bán kính của bạn</p>
                      </div>

                      {/* Embedded Maps on Search view */}
                      <div className="relative h-44 w-full rounded-[20px] overflow-hidden bg-sky-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                        {/* Map Lines and grid lines */}
                        <div className="absolute inset-0 bg-radial-gradient from-blue-400/10 to-transparent pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/40 dark:bg-slate-700/50" />
                        <div className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-white/40 dark:bg-slate-700/50 rotate-6" />
                        <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-white/40 dark:bg-slate-700/50" />
                        <div className="absolute left-2/3 top-0 bottom-0 w-[1.5px] bg-white/40 dark:bg-slate-700/50 -rotate-12" />

                        {/* Pulse circle for user location */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-500/20 animate-ping" />
                          <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-blue-600 border-2 border-white dark:border-slate-900" />
                        </div>

                        {/* Job markers on map */}
                        {shifts.map((s, i) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedJob(s);
                            }}
                            className="absolute flex items-center gap-1 px-1.5 py-0.5 bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-[8px] font-extrabold rounded-md shadow-md border border-slate-700/20 active:scale-95 transition-all"
                            style={{
                              top: `${20 + i * 22}%`,
                              left: `${15 + (i * 12) % 70}%`,
                            }}
                          >
                            <span>{s.logo}</span>
                            <span>{s.hourlyRate / 1000}k/h</span>
                          </button>
                        ))}
                      </div>

                      <Input
                        placeholder="Lọc nhanh tên cửa hàng, địa chỉ..."
                        darkMode={simDarkMode}
                        leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="search-input-map"
                      />

                      <div className="space-y-2.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Danh sách tìm kiếm:</span>
                        {filteredShifts.map(shift => (
                          <div
                            key={shift.id}
                            onClick={() => setSelectedJob(shift)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:border-primary ${
                              simDarkMode ? 'bg-[#0E1321] border-slate-850 hover:bg-[#12192A]' : 'bg-white border-slate-150 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex gap-2 items-center min-w-0">
                              <span className="text-xl">{shift.logo}</span>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{shift.title}</h4>
                                <p className="text-[10px] text-slate-400 truncate">{shift.restaurantName}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-emerald-500">{(shift.hourlyRate).toLocaleString('vi-VN')}đ</span>
                              <p className="text-[9px] text-blue-400">{shift.distance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LỊCH LÀM */}
                  {activeTab === 'lichlam' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Lịch Làm Việc Tháng 7</h3>
                        <p className={`text-[10px] ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Các ca làm được đồng bộ hóa tức thì từ hệ thống đối soát QR Code</p>
                      </div>

                      {/* Horizontal weekly calendar strip where active shift days are marked with color-coded dots: Royal Blue (Đã nhận), Green (Hoàn thành), Orange (Sắp tới) */}
                      <div className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-[20px] border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1 pb-2">
                          <span>Tháng 7, 2026</span>
                          <span>Tuần này 🗓️</span>
                        </div>

                        {/* Calendar weekly strip */}
                        <div className="grid grid-cols-7 gap-1.5">
                          {CALENDAR_DAYS.map((day) => {
                            const isSelected = selectedCalendarDay === day.dayNum;
                            return (
                              <button
                                key={day.dayNum}
                                id={`cal-day-${day.dayNum}`}
                                onClick={() => handleDaySelect(day.dayNum)}
                                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 relative select-none ${
                                  isSelected
                                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                                    : simDarkMode
                                    ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                                }`}
                              >
                                <span className="text-[9px] font-bold opacity-80 uppercase block">{day.label}</span>
                                <span className="text-xs font-black block mt-0.5">{day.dayNum}</span>

                                {/* Dot Indicator Badge - Color coded dots representing active days */}
                                {day.status !== 'none' && (
                                  <span 
                                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full" 
                                    style={{ 
                                      backgroundColor: day.color,
                                      boxShadow: `0 0 4px ${day.color}`
                                    }} 
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Color-coded Legends block */}
                        <div className="flex justify-center items-center gap-3.5 pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800/80 text-[9px] font-bold">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span className="text-slate-500">Đã nhận</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-slate-500">Hoàn thành</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-slate-500">Sắp tới</span>
                          </div>
                        </div>
                      </div>

                      {/* Shifts matching selected day */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                          <span>Chi tiết ngày {selectedCalendarDay} tháng 7</span>
                          <span>
                            {selectedCalendarDay === 9 ? 'Hôm nay' : CALENDAR_DAYS.find(d => d.dayNum === selectedCalendarDay)?.name || ''}
                          </span>
                        </div>

                        {shifts.filter(s => {
                          const dateNum = parseInt(s.date.replace(/[^\d]/g, ''));
                          return dateNum === selectedCalendarDay || (selectedCalendarDay === 9 && s.date.includes('Hôm nay')) || (selectedCalendarDay === 10 && s.date.includes('Ngày mai'));
                        }).length === 0 ? (
                          <div className="py-8 text-center bg-slate-900/10 rounded-2xl border border-dashed border-slate-800">
                            <p className="text-slate-400 text-xs font-semibold">Trống lịch làm</p>
                            <p className="text-slate-500 text-[10px] mt-1">Không có ca làm việc nào được xếp lịch vào ngày này.</p>
                          </div>
                        ) : (
                          shifts.filter(s => {
                            const dateNum = parseInt(s.date.replace(/[^\d]/g, ''));
                            return dateNum === selectedCalendarDay || (selectedCalendarDay === 9 && s.date.includes('Hôm nay')) || (selectedCalendarDay === 10 && s.date.includes('Ngày mai'));
                          }).map(shift => (
                            <Card key={shift.id} darkMode={simDarkMode} variant="floating" className="p-3.5 space-y-3 border-l-4 border-l-primary">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-2">
                                  <span className="text-xl">{shift.logo}</span>
                                  <div>
                                    <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">{shift.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-semibold">{shift.restaurantName}</p>
                                  </div>
                                </div>
                                <Badge status={
                                  shift.status === 'completed' ? 'success' :
                                  shift.status === 'confirmed' ? 'primary' : 'warning'
                                }>
                                  {shift.status === 'completed' ? 'ĐÃ HOÀN THÀNH' :
                                   shift.status === 'confirmed' ? 'ĐÃ NHẬN' : 'CHỜ DUYỆT'}
                                </Badge>
                              </div>

                              <div className="bg-slate-950/20 dark:bg-slate-900/50 rounded-xl p-2.5 flex justify-between text-[10px] font-mono">
                                <span className="text-slate-400 font-bold">Lương ca: {shift.hourlyRate.toLocaleString('vi-VN')}đ/h</span>
                                <span className="text-emerald-500 font-black">Ước tính: {shift.totalEarnings.toLocaleString('vi-VN')}đ</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span className="truncate">{shift.location}</span>
                              </div>

                              {shift.status === 'completed' && (
                                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/10">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setRatingJob({
                                        id: shift.id,
                                        title: shift.title,
                                        restaurantName: shift.restaurantName
                                      });
                                      setSelectedStars(5);
                                      setRatingSliderVal(4.8);
                                      setSelectedTags(['Đúng giờ', 'Chuyên nghiệp']);
                                      setUploadedPhotos([]);
                                      setIsRatingSheetOpen(true);
                                    }}
                                    className="px-3 py-1.5 rounded-xl text-[9px] font-black bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm shadow-amber-500/15 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                  >
                                    ⭐ Đánh giá ca làm
                                  </button>
                                </div>
                              )}
                            </Card>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: VÍ TIỀN */}
                  {activeTab === 'vi' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Ví Thu Nhập ViecLab</h3>
                        <p className={`text-[10px] ${simDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ví liên kết thanh toán tức thì sau mỗi ca làm hoàn thành</p>
                      </div>

                      {/* Earnings Wallet: A glassmorphic debit card layout displaying dynamic balance in large typography */}
                      <div 
                        className="relative w-full h-48 rounded-[24px] p-6 text-white overflow-hidden flex flex-col justify-between"
                        style={{
                          background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.95) 0%, rgba(33, 150, 243, 0.85) 100%)',
                          boxShadow: '0 12px 30px rgba(21, 101, 192, 0.25)',
                        }}
                      >
                        {/* Specular highlights overlay */}
                        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-sky-400/25 blur-3xl pointer-events-none" />

                        {/* Card top bar */}
                        <div className="flex justify-between items-start z-10">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-100 block">VIECLAB DEBIT CARD</span>
                            <span className="text-[9px] font-bold text-sky-200 block mt-0.5">PLATINUM PARTNER</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded-lg backdrop-blur-md">
                            <span className="text-xs font-black">VL</span>
                            <span className="text-[9px] font-bold text-sky-200">PAY</span>
                          </div>
                        </div>

                        {/* Card Chip Icon */}
                        <div className="w-8 h-6.5 rounded-xs bg-amber-400/80 border border-amber-300 flex flex-col gap-0.5 p-1 select-none opacity-80 mt-2">
                          <div className="h-full w-full border border-amber-500/30 rounded-2xs" />
                        </div>

                        {/* Displaying dynamic balance in large typography */}
                        <div className="mt-3 z-10">
                          <span className="text-[10px] font-bold text-sky-100 block uppercase tracking-wider">Số dư khả dụng:</span>
                          <span className="text-2.5xl font-black text-white tracking-wide">
                            {walletBalance.toLocaleString('vi-VN')}đ
                          </span>
                        </div>

                        {/* Card number representation */}
                        <div className="flex justify-between items-end mt-2 text-[10px] font-mono tracking-widest text-sky-100/80 z-10">
                          <span>••••  ••••  ••••  8868</span>
                          <span className="text-[9px] font-sans">THACH SV</span>
                        </div>
                      </div>

                      {/* Instant cash-out button ("Rút tiền") triggering a spinning loading state. */}
                      <div className="space-y-3">
                        <Button
                          variant="primary"
                          id="cash-out-btn"
                          disabled={isCashOutLoading || walletBalance <= 0}
                          onClick={handleCashOut}
                          className="w-full text-xs font-black h-11 relative"
                        >
                          {isCashOutLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-4.5 h-4.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                              <span>Đang đối soát ngân hàng...</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1.5">
                              <Landmark className="w-4 h-4" />
                              <span>Rút tiền về Ngân Hàng (Tức thì)</span>
                            </span>
                          )}
                        </Button>
                        
                        <p className="text-[9px] text-center text-slate-500 leading-relaxed">
                          VIECLAB áp dụng hình thức chuyển tiền tức thì 24/7. Miễn phí rút tiền cho 3 giao dịch đầu tiên của tháng.
                        </p>
                      </div>

                      {/* Recent history list */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Lịch sử thu nhập ca làm:</span>
                        
                        <div className="space-y-2">
                          <div className={`p-3 rounded-xl flex justify-between items-center ${simDarkMode ? 'bg-slate-900/40 border border-slate-800' : 'bg-white border border-slate-150'}`}>
                            <div className="flex gap-2.5 items-center">
                              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">✓</span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Tous Les Jours Nguyễn Du</h4>
                                <p className="text-[9px] text-slate-400">Hoàn thành ngày 09/07</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-emerald-500">+225.000đ</span>
                          </div>

                          <div className={`p-3 rounded-xl flex justify-between items-center ${simDarkMode ? 'bg-slate-900/40 border border-slate-800' : 'bg-white border border-slate-150'}`}>
                            <div className="flex gap-2.5 items-center">
                              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">✓</span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Pizza 4P\'s - tips chia</h4>
                                <p className="text-[9px] text-slate-400">Nhận thưởng ngày 08/07</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-emerald-500">+45.000đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: TÀI KHOẢN */}
                  {activeTab === 'taikhoan' && (
                    <div className="space-y-4">
                      {/* User Profile Info card */}
                      <div className={`p-4 rounded-[20px] border flex flex-col items-center text-center space-y-3 ${
                        simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-white border-slate-150'
                      }`}>
                        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl font-black text-primary">
                          T
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white">Thạch SV</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">thachsv2006@gmail.com</p>
                          <p className="text-[10px] text-emerald-500 font-bold mt-1.5 flex items-center gap-1 justify-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Uy tín: 99 điểm (Hạng Vàng)
                          </p>
                        </div>
                      </div>

                      {/* Settings grid */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Cấu hình hệ thống:</span>
                        
                        <div className={`rounded-xl border divide-y overflow-hidden ${
                          simDarkMode ? 'bg-slate-900/40 border-slate-800 divide-slate-800' : 'bg-white border-slate-150 divide-slate-150'
                        }`}>
                          <button
                            id="btn-switch-to-owner"
                            onClick={() => {
                              setSelectedAccountType('owner');
                              triggerSimToast('Đã đổi sang giao diện Merchant cho Doanh nghiệp!', 'info');
                            }}
                            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-800/10"
                          >
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4 text-emerald-500" />
                              <span>Chuyển sang vai trò Doanh nghiệp</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>

                          <button
                            id="btn-switch-to-worker"
                            onClick={() => {
                              setSelectedAccountType('worker');
                              triggerSimToast('Bạn đang ở giao diện Người tìm việc.', 'info');
                            }}
                            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-800/10"
                          >
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              <span>Giao diện Người tìm việc (Active)</span>
                            </div>
                            <Check className="w-4 h-4 text-emerald-500" />
                          </button>

                          <button
                            id="btn-logout-sim"
                            onClick={() => {
                              setCurrentScreen('login');
                              setSelectedJob(null);
                              triggerSimToast('Đã đăng xuất tài khoản.', 'info');
                            }}
                            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-left text-rose-500 hover:bg-rose-500/5"
                          >
                            <div className="flex items-center gap-2">
                              <LogOut className="w-4 h-4" />
                              <span>Đăng xuất tài khoản</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-rose-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                    </>
                  )}

                </div>

                {/* PERSISTENT BOTTOM NAVIGATION BAR */}
                {/* 5 items (Trang chủ, Việc làm, Lịch làm, Ví, Tài khoản) using rounded active indicator states */}
                <div className={`px-2 py-2 border-t flex justify-around items-center z-20 ${
                  simDarkMode ? 'border-slate-900 bg-[#0C121E]' : 'border-slate-100 bg-white'
                }`}>
                  {(selectedAccountType === 'owner' 
                    ? [
                        { id: 'trangchu', label: 'Trang chủ', icon: HomeIcon },
                        { id: 'vieclam', label: 'Nhân sự', icon: Users },
                        { id: 'lichlam', label: 'Tin tuyển', icon: ClipboardList },
                        { id: 'vi', label: 'Báo cáo', icon: BarChart3 },
                        { id: 'taikhoan', label: 'Cá nhân', icon: UserIcon }
                      ]
                    : [
                        { id: 'trangchu', label: 'Trang chủ', icon: HomeIcon },
                        { id: 'vieclam', label: 'Việc làm', icon: BriefcaseIcon },
                        { id: 'lichlam', label: 'Lịch làm', icon: CalendarIcon },
                        { id: 'vi', label: 'Ví', icon: WalletIcon },
                        { id: 'taikhoan', label: 'Tài khoản', icon: UserIcon }
                      ]
                  ).map((tab) => {
                    const isActive = activeTab === tab.id;
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        id={`bottom-tab-${tab.id}`}
                        onClick={() => {
                          setActiveTab(tab.id as TabType);
                          setSelectedJob(null);
                        }}
                        className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all duration-300 select-none ${
                          isActive 
                            ? 'bg-primary/10 text-primary scale-105 font-bold' 
                            : 'text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        <IconComponent className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        <span className="text-[9px] mt-1 font-bold">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Multi-step Job Posting Form Overlay */}
                <AnimatePresence>
                  {isPostingFormOpen && (
                    <motion.div
                      key="multi-step-posting-form"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className={`absolute inset-0 z-40 flex flex-col ${
                        simDarkMode ? 'bg-[#0A0E17]' : 'bg-[#F5F7FA]'
                      }`}
                    >
                      {/* Header bar */}
                      <div className={`px-4 py-3.5 flex items-center justify-between border-b ${
                        simDarkMode ? 'border-slate-850 bg-slate-900/60' : 'border-slate-200 bg-white'
                      }`}>
                        <button
                          id="btn-close-post-form"
                          onClick={() => setIsPostingFormOpen(false)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-300"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs font-black text-slate-850 dark:text-white">Đăng Tuyển Ca Làm</span>
                        <div className="w-5 h-5" /> {/* spacer */}
                      </div>

                      {/* Top Step-Progress Bar */}
                      <div className={`px-4 py-3 border-b ${
                        simDarkMode ? 'border-slate-900 bg-[#0C121E]' : 'border-slate-100 bg-white'
                      }`}>
                        <div className="flex justify-between items-center relative">
                          {/* Progress track line */}
                          <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-850 -z-0">
                            <div 
                              className="bg-primary h-full transition-all duration-300" 
                              style={{ width: `${((postingFormStep - 1) / 3) * 100}%` }}
                            />
                          </div>

                          {[
                            { step: 1, label: 'Thông tin' },
                            { step: 2, label: 'Vị trí & Lương' },
                            { step: 3, label: 'Thời gian' },
                            { step: 4, label: 'Xem trước' }
                          ].map((item) => {
                            const isCompleted = postingFormStep > item.step;
                            const isActive = postingFormStep === item.step;
                            return (
                              <div key={item.step} className="flex flex-col items-center z-10">
                                <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-300 ${
                                  isCompleted 
                                    ? 'bg-primary border-primary text-white' 
                                    : isActive 
                                      ? 'bg-[#0A0E17] border-primary text-primary ring-4 ring-primary/15' 
                                      : 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-500'
                                }`}>
                                  {isCompleted ? '✓' : item.step}
                                </div>
                                <span className={`text-[8px] font-bold mt-1 tracking-tight ${
                                  isActive ? 'text-primary' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                                }`}>
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Form Step Content */}
                      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-none">
                        <AnimatePresence mode="wait">
                          {postingFormStep === 1 && (
                            <motion.div
                              key="step-1-form"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-4"
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">BƯỚC 1</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white">Thông tin Quán & Doanh nghiệp</h3>
                                <p className="text-[10px] text-slate-400 leading-normal">Nhập địa điểm check-in chuẩn GPS cho nhân sự nhận ca trực của bạn.</p>
                              </div>

                              <div className="space-y-3.5 pt-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Tên Cửa Hàng / Thương hiệu:</label>
                                  <input
                                    placeholder="Ví dụ: The Coffee House Bến Thành"
                                    value={postShopName}
                                    onChange={(e) => setPostShopName(e.target.value)}
                                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all ${
                                      simDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-650' : 'bg-white border-slate-200 text-slate-800'
                                    }`}
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Địa chỉ GPS chính xác:</label>
                                  <input
                                    placeholder="Ví dụ: 180 Pasteur, Bến Nghé, Quận 1"
                                    value={postShopAddress}
                                    onChange={(e) => setPostShopAddress(e.target.value)}
                                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all ${
                                      simDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-650' : 'bg-white border-slate-200 text-slate-800'
                                    }`}
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Yêu cầu kinh nghiệm khác:</label>
                                  <textarea
                                    placeholder="Ví dụ: Cần nhanh nhẹn, trung thực, có kinh nghiệm phục vụ hoặc pha chế là lợi thế..."
                                    value={postRequirements}
                                    onChange={(e) => setPostRequirements(e.target.value)}
                                    rows={3}
                                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all ${
                                      simDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-650 focus:border-primary' : 'bg-white border-slate-200 text-slate-800 focus:border-primary'
                                    }`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {postingFormStep === 2 && (
                            <motion.div
                              key="step-2-form"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-4"
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">BƯỚC 2</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white">Vị trí ứng tuyển & Lương</h3>
                                <p className="text-[10px] text-slate-400 leading-normal">Chọn vị trí F&B cần tuyển và điều chỉnh mức lương theo giờ.</p>
                              </div>

                              <div className="space-y-4 pt-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Chọn Vị Trí:</label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {['Pha chế (Barista)', 'Phục vụ khách hàng', 'Thu ngân & POS', 'Phụ bếp / Bếp chính'].map((role) => (
                                      <button
                                        key={role}
                                        onClick={() => setPostRole(role)}
                                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all duration-200 select-none ${
                                          postRole === role
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : simDarkMode
                                              ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                      >
                                        {role}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Hourly Rate Slider */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Mức lương (đ/giờ):</label>
                                    <span className="text-emerald-500 dark:text-emerald-400 text-xs font-black">{postHourlyRate.toLocaleString('vi-VN')}đ/giờ</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="35000"
                                    max="90000"
                                    step="5000"
                                    value={postHourlyRate}
                                    onChange={(e) => setPostHourlyRate(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full outline-none cursor-pointer"
                                  />
                                  <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                                    <span>35.000đ</span>
                                    <span>60.000đ</span>
                                    <span>90.000đ</span>
                                  </div>
                                </div>

                                {/* Staff Count Selector */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Số lượng nhân viên cần thuê:</label>
                                    <span className="text-primary text-xs font-black">{postStaffCount} người</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => setPostStaffCount(prev => Math.max(1, prev - 1))}
                                      className={`w-9 h-9 rounded-xl border font-black text-base flex items-center justify-center transition-all ${
                                        simDarkMode ? 'border-slate-800 bg-slate-900 text-white hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-850 hover:bg-slate-50'
                                      }`}
                                    >
                                      -
                                    </button>
                                    <span className="text-sm font-black text-slate-800 dark:text-white w-8 text-center">{postStaffCount}</span>
                                    <button
                                      onClick={() => setPostStaffCount(prev => Math.min(10, prev + 1))}
                                      className={`w-9 h-9 rounded-xl border font-black text-base flex items-center justify-center transition-all ${
                                        simDarkMode ? 'border-slate-800 bg-slate-900 text-white hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-850 hover:bg-slate-50'
                                      }`}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {postingFormStep === 3 && (
                            <motion.div
                              key="step-3-form"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-4"
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">BƯỚC 3</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white">Thời gian ca làm việc</h3>
                                <p className="text-[10px] text-slate-400 leading-normal">Chọn ngày làm và khung giờ làm của ca trực để tính toán chi phí.</p>
                              </div>

                              <div className="space-y-4 pt-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Chọn Ngày làm:</label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {['Hôm nay, 09/07/2026', 'Ngày mai, 10/07/2026', 'Cuối tuần, 12/07', 'Chọn ngày khác'].map((dt) => (
                                      <button
                                        key={dt}
                                        onClick={() => setPostDate(dt)}
                                        className={`p-2 rounded-xl border text-center text-xs font-bold transition-all duration-200 select-none ${
                                          postDate === dt
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : simDarkMode
                                              ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                      >
                                        {dt.split(',')[0]}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Khung Giờ Ca:</label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {[
                                      { label: 'Sáng (4h)', val: '08:00 - 12:00', h: 4 },
                                      { label: 'Trưa (5h)', val: '11:00 - 16:00', h: 5 },
                                      { label: 'Tối (5h)', val: '18:00 - 23:00', h: 5 }
                                    ].map((timeOption) => (
                                      <button
                                        key={timeOption.val}
                                        onClick={() => {
                                          setPostTimeRange(timeOption.val);
                                          setPostHours(timeOption.h);
                                        }}
                                        className={`p-2 rounded-xl border text-center text-xs transition-all duration-200 select-none flex flex-col items-center justify-center gap-0.5 ${
                                          postTimeRange === timeOption.val
                                            ? 'border-primary bg-primary/10 text-primary font-black'
                                            : simDarkMode
                                              ? 'border-slate-800 bg-slate-900/40 text-slate-400 font-bold hover:border-slate-700'
                                              : 'border-slate-200 bg-white text-slate-500 font-bold hover:bg-slate-50'
                                        }`}
                                      >
                                        <span className="text-[8px] uppercase tracking-wider block opacity-70">{timeOption.label}</span>
                                        <span className="text-[10px] tracking-tight">{timeOption.val}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Hours Slider */}
                                <div className="space-y-2 pt-1">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Thời lượng ca (tiếng):</label>
                                    <span className="text-primary text-xs font-black">{postHours} tiếng</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="2"
                                    max="10"
                                    step="1"
                                    value={postHours}
                                    onChange={(e) => setPostHours(parseInt(e.target.value))}
                                    className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full outline-none cursor-pointer"
                                  />
                                  <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                                    <span>2 tiếng (Ca gãy)</span>
                                    <span>6 tiếng</span>
                                    <span>10 tiếng (Full-time)</span>
                                  </div>
                                </div>

                                {/* Real-time budget card */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-emerald-500/5 to-transparent border border-indigo-500/10 space-y-2 pt-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">DỰ TOÁN NGÂN SÁCH LINH HOẠT</span>
                                    <span className="text-[9px] text-emerald-400 font-extrabold">Realtime Calculator ⚡</span>
                                  </div>
                                  <div className="flex justify-between items-baseline pt-1">
                                    <span className="text-[10px] text-slate-400 font-bold">Công thức:</span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {postHourlyRate.toLocaleString('vi-VN')}đ × {postHours}h × {postStaffCount}NV
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-end border-t border-slate-800/60 pt-2.5 mt-1.5">
                                    <span className="text-xs font-black text-slate-300">TỔNG CHI PHÍ CA:</span>
                                    <span className="text-base font-black text-emerald-400">
                                      {((postHourlyRate || 45000) * postHours * postStaffCount).toLocaleString('vi-VN')}đ
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {postingFormStep === 4 && (
                            <motion.div
                              key="step-4-form"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-4"
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">BƯỚC 4</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white">Xem trước & Xác nhận tin đăng</h3>
                                <p className="text-[10px] text-slate-400 leading-normal">Kiểm tra lại toàn bộ nội dung tin đăng tuyển trước khi phát hành lên hệ thống.</p>
                              </div>

                              {/* Preview Card */}
                              <div className={`p-4 rounded-[20px] border space-y-3.5 shadow-md ${
                                simDarkMode ? 'bg-[#0E1321] border-slate-800' : 'bg-white border-slate-200'
                              }`}>
                                <div className="flex gap-3 items-start">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0 select-none">
                                    ☕
                                  </div>
                                  <div className="flex-1 space-y-1 overflow-hidden">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block truncate">
                                        {postShopName}
                                      </span>
                                      <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-blue-500/10 text-blue-400 whitespace-nowrap">
                                        📍 0.0 km
                                      </span>
                                    </div>
                                    <h4 className="text-xs font-black text-slate-800 dark:text-white leading-snug">
                                      {postRole}
                                    </h4>
                                    <div className="flex items-center gap-1 text-[9px] text-slate-450">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>{postTimeRange} ({postHours} tiếng) • {postDate.split(',')[0]}</span>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-[8px] font-bold text-amber-500 flex items-center gap-0.5 justify-end">
                                      Mới ✨
                                    </span>
                                    <span className="text-xs font-black text-emerald-500 block mt-1">
                                      {postHourlyRate.toLocaleString('vi-VN')}đ/h
                                    </span>
                                  </div>
                                </div>

                                <div className={`p-3 rounded-xl text-[10px] leading-relaxed border ${
                                  simDarkMode ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-150 text-slate-600'
                                }`}>
                                  <strong className="text-slate-400 dark:text-slate-300 block pb-0.5 font-bold">Yêu cầu ca trực:</strong>
                                  {postRequirements}
                                </div>

                                <div className="pt-3 border-t border-slate-800/60 flex justify-between text-[10px] font-bold">
                                  <span className="text-slate-400">Số lượng cần tuyển:</span>
                                  <span className="text-primary">{postStaffCount} ứng viên</span>
                                </div>

                                <div className="flex justify-between text-[10px] font-bold">
                                  <span className="text-slate-400">Ngân sách dự chi:</span>
                                  <span className="text-emerald-400 font-extrabold">
                                    {((postHourlyRate || 45000) * postHours * postStaffCount).toLocaleString('vi-VN')}đ
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 pt-2">
                                <span className="w-4 h-4 rounded border border-primary/50 bg-primary/10 flex items-center justify-center text-[10px] text-white select-none shrink-0 mt-0.5">✓</span>
                                <p className="text-[9px] text-slate-500 leading-normal">
                                  Tôi cam kết thanh toán tức thì sau khi nhân sự check-out hoàn thành đúng giờ và đúng thỏa thuận của ca làm.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer Navigation */}
                      <div className={`px-4 py-3 flex justify-between items-center border-t ${
                        simDarkMode ? 'border-slate-950 bg-[#0C121E]' : 'border-slate-100 bg-white'
                      }`}>
                        <button
                          id="btn-posting-back"
                          onClick={() => {
                            if (postingFormStep > 1) {
                              setPostingFormStep(prev => prev - 1);
                            } else {
                              setIsPostingFormOpen(false);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                            simDarkMode 
                              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800' 
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {postingFormStep === 1 ? 'Hủy' : 'Quay lại'}
                        </button>

                        <button
                          id="btn-posting-next"
                          onClick={() => {
                            if (postingFormStep < 4) {
                              setPostingFormStep(prev => prev + 1);
                            } else {
                              // Hoàn tất: Add to active postings, show toast, close
                              const newJobId = `mj-posted-${Date.now()}`;
                              const newJob = {
                                id: newJobId,
                                title: postRole,
                                status: 'available',
                                filled: 0,
                                total: postStaffCount,
                                hourlyRate: postHourlyRate,
                                date: postDate.split(',')[0],
                              };

                              setMerchantJobs(prev => [newJob, ...prev]);
                              setIsPostingFormOpen(false);
                              triggerSimToast('Đăng tuyển ca mới thành công! Ca làm đã trực tuyến.', 'success');
                              setActiveTab('lichlam'); // redirect to active postings tab
                            }
                          }}
                          className="px-5 py-2 rounded-xl text-xs font-black bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/25"
                        >
                          {postingFormStep === 4 ? 'Đăng ca ngay ✨' : 'Tiếp tục'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 7. JOB DETAIL SCREEN: Full screen overlay for single selected job */}
            {/* Slide in with exit animation, custom hero scroll interactions */}
            {selectedJob && (
              <motion.div
                key="job-detail-screen"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="absolute inset-0 bg-slate-950 flex flex-col z-30"
                style={{ backgroundColor: simDarkMode ? '#0A0E17' : '#F5F7FA' }}
              >
                {/* Fixed Top Close Button floating above hero */}
                <div className="absolute top-12 left-4 z-40">
                  <button
                    id="close-job-detail"
                    onClick={() => setSelectedJob(null)}
                    className="w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* Hero image header (35% screen height) that blurs and shrinks smoothly on scroll up. */}
                <div 
                  className="absolute top-0 left-0 right-0 overflow-hidden z-25 pointer-events-none transition-all duration-150 select-none"
                  style={{
                    height: `${Math.max(64, 273 - detailScrollTop)}px`, // 35% of 780px is ~273px
                    background: selectedJob.image,
                    filter: `blur(${Math.min(12, detailScrollTop / 15)}px)`,
                    opacity: Math.max(0.3, 1 - detailScrollTop / 300),
                  }}
                >
                  {/* Backdrop glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                  
                  {/* Floating Giant Logo on hero */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="text-4xl p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl select-none">
                      {selectedJob.logo}
                    </span>
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-white/80 block uppercase">
                        {selectedJob.restaurantName}
                      </span>
                      <h1 className="text-base font-black text-white mt-1">
                        {selectedJob.title}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Placeholder offset to push content below the 35% height hero when uncollapsed */}
                <div 
                  className="w-full shrink-0 select-none pointer-events-none" 
                  style={{ height: '273px' }} 
                />

                {/* Main Scrollable Content Area */}
                <div
                  ref={detailScrollRef}
                  onScroll={(e) => setDetailScrollTop(e.currentTarget.scrollTop)}
                  className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none z-20 relative -mt-4 bg-slate-950 rounded-t-[24px]"
                  style={{ 
                    backgroundColor: simDarkMode ? '#0A0E17' : '#F4F6F9',
                    boxShadow: '0 -10px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Job Metadata Header detail */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between items-center flex-wrap gap-1">
                      <span className="text-2xl font-black text-emerald-500">
                        {selectedJob.hourlyRate.toLocaleString('vi-VN')}đ<span className="text-xs font-normal">/giờ</span>
                      </span>
                      
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-500/10 text-blue-400">
                        📍 {selectedJob.distance}
                      </span>
                    </div>

                    <p className={`text-xs font-bold ${simDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Địa chỉ: <span className="font-medium text-slate-500">{selectedJob.location}</span>
                    </p>
                  </div>

                  {/* Embedded mini Google Maps view (Radius 16px) */}
                  <div className="space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${simDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Vị trí ca làm (Google Maps):
                    </span>
                    
                    <div className="relative h-28 w-full rounded-[16px] overflow-hidden bg-sky-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 select-none">
                      {/* Grid representation */}
                      <div className="absolute inset-0 bg-radial-gradient from-blue-400/5 to-transparent pointer-events-none" />
                      <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/40 dark:bg-slate-700/50" />
                      <div className="absolute left-1/3 top-0 bottom-0 w-[1.5px] bg-white/40 dark:bg-slate-700/50" />
                      
                      {/* Radar signal circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="absolute inline-flex h-14 w-14 rounded-full bg-blue-500/15 animate-pulse" />
                        <span className="absolute inline-flex h-8 w-8 rounded-full bg-blue-500/10" />
                      </div>

                      {/* Map Location Pins */}
                      <div className="absolute top-1/2 left-1/3">
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 block" />
                        <span className="text-[8px] font-bold text-blue-500 absolute top-4 -left-3 whitespace-nowrap bg-white/80 dark:bg-slate-900 px-1 rounded-sm shadow-xs">
                          Bạn (Gần)
                        </span>
                      </div>

                      <div className="absolute top-1/3 left-1/2">
                        <span className="text-xl animate-bounce">📍</span>
                        <span className="text-[8px] font-extrabold text-slate-800 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded-md shadow-xs absolute -top-4 -left-12 whitespace-nowrap">
                          {selectedJob.restaurantName}
                        </span>
                      </div>

                      {/* Floating zoom indicator */}
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                        Google Maps 3D
                      </span>
                    </div>
                  </div>

                  {/* Tab sections for "Mô tả", "Yêu cầu", "Phúc lợi" */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-3 gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-1">
                      {[
                        { id: 'mota', label: 'Mô tả' },
                        { id: 'yeucau', label: 'Yêu cầu' },
                        { id: 'phucloi', label: 'Phúc lợi' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          id={`detail-tab-${tab.id}`}
                          onClick={() => setActiveDetailTab(tab.id as 'mota' | 'yeucau' | 'phucloi')}
                          className={`py-2 text-xs font-black text-center border-b-2 transition-all duration-300 ${
                            activeDetailTab === tab.id
                              ? 'border-primary text-primary'
                              : 'border-transparent text-slate-400 hover:text-slate-350'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab panels */}
                    <div className={`text-xs leading-relaxed min-h-[100px] ${simDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {activeDetailTab === 'mota' && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                          <p>{selectedJob.description}</p>
                          <div className="pt-2">
                            <span className="font-bold text-slate-400 block pb-1">Thời gian làm việc:</span>
                            <span className="font-semibold block text-slate-500">• {selectedJob.time}</span>
                            <span className="font-semibold block text-slate-500">• {selectedJob.date}</span>
                          </div>
                        </motion.div>
                      )}

                      {activeDetailTab === 'yeucau' && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                          <p>{selectedJob.requirements}</p>
                          <div className="pt-2">
                            <span className="font-bold text-slate-400 block pb-1">Kỹ năng yêu cầu:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {selectedJob.requiredSkills.map(skill => (
                                <span key={skill} className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-primary/10 text-primary uppercase">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeDetailTab === 'phucloi' && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                          <p>{selectedJob.benefits}</p>
                          <p className="mt-1.5">• Bảo hiểm tai nạn ca làm của VIECLAB tài trợ.</p>
                          <p>• Nhận lương liền tay ngay sau khi quét QR Code đối soát hoàn tất ca trực.</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fixed bottom bar containing a prominent primary button: "NHẬN CA NGAY" */}
                <div className={`p-4 border-t z-20 ${
                  simDarkMode ? 'border-slate-900 bg-[#0C121E]' : 'border-slate-100 bg-white'
                }`}>
                  {selectedJob.status === 'available' ? (
                    <Button
                      id="accept-job-main-btn"
                      onClick={() => handleApplyJob(selectedJob.id)}
                      variant="primary"
                      className="w-full h-12 text-xs font-black shadow-lg shadow-primary/25 tracking-wider"
                    >
                      NHẬN CA NGAY
                    </Button>
                  ) : (
                    <div className="space-y-2 text-center py-1">
                      <div className="flex items-center justify-center gap-1 text-emerald-500 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG CA LÀM NÀY</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Vui lòng đến địa chỉ đúng giờ và dùng QR Code của ứng dụng để Check-In nhận ca.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 8. REALTIME CHAT SCREEN OVERLAY */}
            {activeChatUser && (
              <motion.div
                key="realtime-chat-screen"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="absolute inset-0 z-40 flex flex-col"
                style={{ backgroundColor: simDarkMode ? '#0A0E17' : '#F5F7FA' }}
              >
                {/* Chat Header */}
                <div className={`px-4 py-3 flex items-center justify-between border-b shrink-0 ${
                  simDarkMode ? 'border-slate-900 bg-[#0C121E]/95' : 'border-slate-150 bg-white/95'
                } backdrop-blur-md`}>
                  <div className="flex items-center gap-2">
                    <button
                      id="close-chat-btn"
                      onClick={() => setActiveChatUser(null)}
                      className={`p-1.5 rounded-lg transition-all ${
                        simDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <span className="text-xl">{activeChatUser.avatar}</span>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2" style={{ borderColor: simDarkMode ? '#0C121E' : '#FFFFFF' }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-850 dark:text-white leading-tight">
                        {activeChatUser.name}
                      </h4>
                      <p className={`text-[9px] font-semibold ${simDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                        {activeChatUser.role} • Trực tuyến
                      </p>
                    </div>
                  </div>

                  {/* Top Right Actions */}
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20 animate-pulse">
                      Chat Live
                    </span>
                  </div>
                </div>

                {/* Message Scroll Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-none flex flex-col">
                  {/* Notice Box */}
                  <div className={`p-2.5 rounded-xl border text-center text-[9px] font-semibold leading-normal mx-2 shrink-0 ${
                    simDarkMode ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    🛡️ Tin nhắn được mã hóa đầu cuối bởi VIECLAB. Mọi cuộc gọi, giao kết ca làm việc đều được ghi nhận tự động để bảo đảm quyền lợi.
                  </div>

                  <div className="flex-1 space-y-3.5">
                    {(chatHistory[activeChatUser.id] || []).map((msg) => {
                      const isMe = msg.senderId === 'me';
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-end gap-1.5 max-w-[85%]">
                            {!isMe && (
                              <span className="text-base select-none shrink-0 mb-1">{activeChatUser.avatar}</span>
                            )}
                            <div className="flex flex-col">
                              {/* Bubble */}
                              <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                isMe
                                  ? 'bg-primary text-white rounded-br-xs font-medium shadow-sm shadow-primary/15'
                                  : simDarkMode
                                  ? 'bg-slate-850 text-white rounded-bl-xs border border-slate-800'
                                  : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200'
                              }`}>
                                {msg.type === 'image' ? (
                                  <div className="space-y-1.5 max-w-[200px]">
                                    <img src={msg.mediaUrl} referrerPolicy="no-referrer" alt="espresso" className="rounded-xl object-cover h-32 w-48 shadow-inner border border-white/10" />
                                    <p className="text-[11px] font-semibold">{msg.text}</p>
                                  </div>
                                ) : msg.type === 'pdf' ? (
                                  <div className="flex items-center gap-2.5 bg-slate-900/40 dark:bg-slate-950/40 p-2 rounded-xl border border-white/10 select-none cursor-pointer">
                                    <div className="w-8.5 h-8.5 rounded-lg bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-500 shrink-0 font-black text-xs uppercase">
                                      PDF
                                    </div>
                                    <div className="min-w-0 text-left">
                                      <p className="font-bold truncate text-[11px] text-white underline">{msg.text}</p>
                                      <p className="text-[9px] text-slate-400 font-semibold">{msg.fileSize || '1.2 MB'}</p>
                                    </div>
                                  </div>
                                ) : msg.type === 'audio' ? (
                                  <div className="flex items-center gap-2 max-w-[200px]">
                                    <button className="w-7 h-7 rounded-full bg-primary/25 text-primary flex items-center justify-center font-bold text-xs shrink-0 hover:bg-primary/35 active:scale-95 animate-pulse">
                                      ▶
                                    </button>
                                    <div className="flex flex-col gap-0.5">
                                      {/* Waveform graphic representation */}
                                      <div className="flex items-end gap-[1.5px] h-4.5 px-0.5">
                                        {[2, 4, 3, 5, 2, 6, 7, 3, 5, 4, 6, 2, 5, 3, 2, 4, 1].map((h, idx) => (
                                          <span key={idx} className="w-[1.5px] bg-slate-400 dark:bg-slate-400/85 rounded-full" style={{ height: `${h * 15}%` }} />
                                        ))}
                                      </div>
                                      <span className="text-[9px] font-bold text-slate-400 opacity-80 leading-none">0:14 • {msg.text}</span>
                                    </div>
                                  </div>
                                ) : (
                                  <p>{msg.text}</p>
                                )}
                              </div>

                              {/* Time + Status */}
                              <div className="flex items-center gap-1 mt-1 px-1 justify-end">
                                <span className={`text-[8.5px] font-semibold ${simDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
                                  {msg.timestamp}
                                </span>
                                {isMe && (
                                  <span className="text-[9px] font-bold flex items-center gap-0.5 text-slate-450">
                                    {msg.status === 'sending' && (
                                      <span className="w-2.5 h-2.5 rounded-full border-2 border-t-transparent border-slate-400 animate-spin" />
                                    )}
                                    {msg.status === 'received' && (
                                      <span className="text-slate-550">✓✓</span>
                                    )}
                                    {msg.status === 'read' && (
                                      <span className="text-emerald-500 font-extrabold text-[10px]">✓✓</span>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chat Input Bar */}
                <div className={`p-3 border-t shrink-0 ${
                  simDarkMode ? 'border-slate-900 bg-[#0C121E]' : 'border-slate-100 bg-white'
                }`}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!chatInputValue.trim()) return;

                      const textToSend = chatInputValue;
                      setChatInputValue('');

                      const newMsgId = 'msg-' + Date.now();
                      const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                      // Add as sending
                      const myNewMessage = {
                        id: newMsgId,
                        senderId: 'me' as const,
                        text: textToSend,
                        timestamp: timeNow,
                        status: 'sending' as const,
                      };

                      setChatHistory(prev => ({
                        ...prev,
                        [activeChatUser.id]: [...(prev[activeChatUser.id] || []), myNewMessage]
                      }));

                      // Transition status: sending -> received -> read
                      setTimeout(() => {
                        setChatHistory(prev => ({
                          ...prev,
                          [activeChatUser.id]: (prev[activeChatUser.id] || []).map(m => m.id === newMsgId ? { ...m, status: 'received' } : m)
                        }));
                      }, 500);

                      setTimeout(() => {
                        setChatHistory(prev => ({
                          ...prev,
                          [activeChatUser.id]: (prev[activeChatUser.id] || []).map(m => m.id === newMsgId ? { ...m, status: 'read' } : m)
                        }));
                      }, 1000);

                      // Automated Response Simulation
                      setTimeout(() => {
                        const responses = [
                          'Dạ vâng anh, em nắm rõ quy trình rồi ạ!',
                          'Vâng anh, lát xong việc em báo anh check-out nhé.',
                          'Dạ em đang tập trung làm ca trực rồi ạ, cảm ơn anh đã nhắc nhở!',
                          'Em cảm ơn anh, VIECLAB tiện thật sự ạ!'
                        ];
                        const botReply = responses[Math.floor(Math.random() * responses.length)];
                        const replyMsg = {
                          id: 'reply-' + Date.now(),
                          senderId: 'them' as const,
                          text: botReply,
                          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                          status: 'read' as const,
                        };

                        setChatHistory(prev => ({
                          ...prev,
                          [activeChatUser.id]: [...(prev[activeChatUser.id] || []), replyMsg]
                        }));
                        triggerSimToast(`Tin nhắn mới từ ${activeChatUser.name}!`, 'info');
                      }, 2000);

                    }}
                    className="flex gap-2 items-center"
                  >
                    {/* Attach attachments icons */}
                    <div className="flex gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          // Insert a mock photo
                          const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                          const photoMsg = {
                            id: 'p-' + Date.now(),
                            senderId: 'me' as const,
                            text: 'Đã đính kèm ảnh chấm công',
                            timestamp: timeNow,
                            status: 'read' as const,
                            type: 'image' as const,
                            mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
                          };
                          setChatHistory(prev => ({
                            ...prev,
                            [activeChatUser.id]: [...(prev[activeChatUser.id] || []), photoMsg]
                          }));
                          triggerSimToast('Đã đính kèm ảnh thành công!', 'success');
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm ${
                          simDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                        }`}
                        title="Đính kèm ảnh"
                      >
                        📸
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          // Insert a mock PDF
                          const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                          const pdfMsg = {
                            id: 'pdf-' + Date.now(),
                            senderId: 'me' as const,
                            text: 'Bao-cao-ca-truc-TCH.pdf',
                            timestamp: timeNow,
                            status: 'read' as const,
                            type: 'pdf' as const,
                            mediaUrl: 'Bao-cao-ca-truc-TCH.pdf',
                            fileSize: '820 KB'
                          };
                          setChatHistory(prev => ({
                            ...prev,
                            [activeChatUser.id]: [...(prev[activeChatUser.id] || []), pdfMsg]
                          }));
                          triggerSimToast('Đã gửi tệp tài liệu PDF!', 'success');
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm ${
                          simDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                        }`}
                        title="Đính kèm tài liệu PDF"
                      >
                        📄
                      </button>
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Nhập nội dung tin nhắn..."
                        value={chatInputValue}
                        onChange={(e) => setChatInputValue(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all ${
                          simDarkMode ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border border-slate-200 text-slate-850 placeholder-slate-400 focus:border-primary'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-9 h-9 rounded-xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-md shadow-primary/25"
                    >
                      <ArrowRight className="w-4.5 h-4.5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {currentScreen === 'radar' && (
              <motion.div
                key="radar-screen"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="absolute inset-0 z-30 flex flex-col overflow-hidden"
              >
                <InstantNearbyCandidateRadar
                  simDarkMode={simDarkMode}
                  onBack={() => setCurrentScreen('dashboard')}
                  triggerSimToast={triggerSimToast}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* iPhone Bottom Bar Indicator */}
        <div className="h-5 flex items-center justify-center bg-transparent z-20 select-none pointer-events-none">
          <div className="w-32 h-1 bg-slate-500 rounded-full opacity-45" />
        </div>

        {/* Home Filter Bottom Sheet */}
        <BottomSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          title="Bộ Lọc Ca Làm Linh Hoạt"
          darkMode={simDarkMode}
        >
          <div className="space-y-5">
            {/* Salary slider range */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400">Lương tối thiểu/giờ:</span>
                <span className="text-primary text-sm font-black">{minSalaryFilter.toLocaleString('vi-VN')}đ</span>
              </div>
              <input
                id="salary-slider"
                type="range"
                min="40000"
                max="80000"
                step="5000"
                value={minSalaryFilter}
                onChange={(e) => setMinSalaryFilter(parseInt(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full outline-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                <span>40.000đ</span>
                <span>60.000đ</span>
                <span>80.000đ</span>
              </div>
            </div>

            {/* Distance range */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400">Bán kính tìm kiếm (km):</span>
                <span className="text-primary text-sm font-black">Dưới {maxDistanceFilter} km</span>
              </div>
              <input
                id="distance-slider"
                type="range"
                min="1"
                max="10"
                step="1"
                value={maxDistanceFilter}
                onChange={(e) => setMaxDistanceFilter(parseInt(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full outline-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
              </div>
            </div>

            <Button
              variant="primary"
              id="apply-filter-sheet-btn"
              onClick={() => {
                setIsFilterSheetOpen(false);
                triggerSimToast('Đã cập nhật các ca làm theo tiêu chí lọc mới!', 'info');
              }}
              className="w-full text-xs font-bold"
            >
              Áp dụng bộ lọc
            </Button>
          </div>
        </BottomSheet>

        {/* Notifications Sheet */}
        <BottomSheet
          isOpen={isNotifSheetOpen}
          onClose={() => setIsNotifSheetOpen(false)}
          title="Thông Báo Hộp Thư"
          darkMode={simDarkMode}
        >
          <div className="space-y-4">
            {/* Horizontal Scroll Tab Header */}
            <div className="flex gap-1 overflow-x-auto pb-1.5 border-b border-slate-150 dark:border-slate-800/80 scrollbar-none">
              {[
                { id: 'viecmoi', label: 'Việc mới', icon: Sparkles },
                { id: 'lichlam', label: 'Lịch làm', icon: Calendar },
                { id: 'thanhtoan', label: 'Thanh toán', icon: Wallet },
                { id: 'hethong', label: 'Hệ thống', icon: Shield }
              ].map((tab) => {
                const isActive = notifActiveTab === tab.id;
                const Icon = tab.icon;
                const count = notifications.filter(n => n.category === tab.id && n.unread).length;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setNotifActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all duration-300 shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-white shadow-sm shadow-primary/25'
                        : simDarkMode
                        ? 'bg-slate-900 hover:bg-slate-850 text-slate-400'
                        : 'bg-slate-100 hover:bg-slate-150 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-500 text-[8px] font-black text-white flex items-center justify-center animate-pulse">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Hộp thư: {notifActiveTab === 'viecmoi' ? 'Việc mới tuyển' : notifActiveTab === 'lichlam' ? 'Lịch làm việc' : notifActiveTab === 'thanhtoan' ? 'Thanh toán & Ví' : 'Hệ thống'}
              </span>
              <button
                id="mark-all-read-btn"
                onClick={() => {
                  setNotifications(prev => prev.map(n => n.category === notifActiveTab ? { ...n, unread: false } : n));
                  triggerSimToast('Đã đánh dấu đọc tất cả thông báo tab này.', 'info');
                }}
                className="text-[10px] text-primary font-bold hover:underline"
              >
                Đọc tất cả tab này
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-850/80 min-h-[160px] max-h-[300px] overflow-y-auto scrollbar-none">
              {notifications.filter(n => n.category === notifActiveTab).length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1.5 opacity-60">✉️</span>
                  <p className="text-slate-400 text-xs font-bold">Không có thông báo mới</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">Các thông tin cập nhật sẽ được hiển thị tại đây.</p>
                </div>
              ) : (
                notifications
                  .filter(n => n.category === notifActiveTab)
                  .map((notif) => (
                    <div key={notif.id} className="py-3 flex gap-3 items-start">
                      {notif.category === 'thanhtoan' ? (
                        <div className="w-8 h-8 rounded-xl bg-amber-450/15 border border-amber-550/20 flex items-center justify-center text-amber-500 shrink-0 shadow-xs shadow-amber-500/10">
                          <Wallet className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20" />
                        </div>
                      ) : (
                        <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${notif.unread ? 'bg-primary' : 'bg-transparent'}`} />
                      )}
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className={`text-xs font-bold ${notif.unread ? 'text-slate-850 dark:text-white' : 'text-slate-450 dark:text-slate-500'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-bold shrink-0">{notif.time}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${notif.unread ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500 dark:text-slate-500'}`}>
                          {notif.desc}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </BottomSheet>

        {/* Post-Shift Rating Bottom Sheet */}
        <BottomSheet
          isOpen={isRatingSheetOpen}
          onClose={() => setIsRatingSheetOpen(false)}
          title="Đánh Giá Ca Làm Việc"
          darkMode={simDarkMode}
        >
          {ratingJob && (
            <div className="space-y-4">
              {/* Job Info card summary */}
              <div className={`p-3.5 rounded-[20px] border flex items-center gap-3 ${
                simDarkMode ? 'bg-[#0E1321] border-slate-850' : 'bg-slate-50 border-slate-150'
              }`}>
                <span className="text-2.5xl">🏆</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-850 dark:text-white truncate leading-tight">
                    {ratingJob.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold truncate mt-1">
                    {ratingJob.restaurantName}
                  </p>
                </div>
              </div>

              {/* 5 Interactive Stars with bounce animation */}
              <div className="text-center space-y-2 py-1.5 bg-slate-100/30 dark:bg-slate-900/40 rounded-[20px] p-3 border border-slate-200/40 dark:border-slate-800/60">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Bạn đánh giá quản lý & cửa hàng:</span>
                <div className="flex justify-center items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isLit = star <= selectedStars;
                    return (
                      <motion.button
                        key={star}
                        whileTap={{ scale: 1.4, rotate: 10 }}
                        onClick={() => {
                          setSelectedStars(star);
                          if (star === 5) setRatingSliderVal(4.9);
                          else if (star === 4) setRatingSliderVal(4.1);
                          else if (star === 3) setRatingSliderVal(3.2);
                          else if (star === 2) setRatingSliderVal(2.1);
                          else setRatingSliderVal(1.0);
                        }}
                        className="text-3.5xl focus:outline-none transition-all active:scale-125 select-none text-amber-450 hover:scale-110"
                      >
                        {isLit ? '★' : '☆'}
                      </motion.button>
                    );
                  })}
                </div>
                <p className="text-xs font-black text-amber-500 tracking-tight mt-0.5">
                  {selectedStars === 5 ? 'Tuyệt vời • 5.0/5.0' :
                   selectedStars === 4 ? 'Khá tốt • 4.0/5.0' :
                   selectedStars === 3 ? 'Bình thường • 3.0/5.0' :
                   selectedStars === 2 ? 'Kém • 2.0/5.0' : 'Rất kém • 1.0/5.0'}
                </p>
              </div>

              {/* Slider for precision performance index */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <span>Chỉ số hài lòng chi tiết:</span>
                  <span className="text-primary font-black text-xs">{ratingSliderVal.toFixed(1)}/5.0</span>
                </div>
                <input
                  id="rating-precision-slider"
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={ratingSliderVal}
                  onChange={(e) => setRatingSliderVal(parseFloat(e.target.value))}
                  className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full outline-none cursor-pointer"
                />
              </div>

              {/* Multi-select Quick Review Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nhãn phản hồi nhanh:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Đúng giờ', 'Chuyên nghiệp', 'Hỗ trợ tốt', 'Lương sòng phẳng', 'Môi trường tốt', 'Đúng mô tả', 'Bảo hộ đầy đủ'].map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTags(prev => prev.filter(t => t !== tag));
                          } else {
                            setSelectedTags(prev => [...prev, tag]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-200 active:scale-95 ${
                          isSelected
                            ? 'bg-primary text-white shadow-xs'
                            : simDarkMode
                            ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Attachment Grid with support for drag-and-drop or manual click upload */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Ảnh bằng chứng hoàn thành & ca trực:</span>
                
                <div className="grid grid-cols-4 gap-2">
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800 group shadow-xs">
                      <img src={photo} referrerPolicy="no-referrer" alt="proof" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setUploadedPhotos(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center font-black text-[11px] shadow-sm active:scale-90 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {uploadedPhotos.length < 4 && (
                    <button
                      onClick={() => {
                        const samplePhotos = [
                          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80'
                        ];
                        // Select next mock photo
                        const nextPhoto = samplePhotos[uploadedPhotos.length % samplePhotos.length];
                        setUploadedPhotos(prev => [...prev, nextPhoto]);
                        triggerSimToast('Đã đính kèm ảnh chấm công!', 'success');
                      }}
                      className={`aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center text-[10px] font-bold gap-1 transition-all hover:bg-slate-900/10 active:scale-95 ${
                        simDarkMode ? 'border-slate-800 text-slate-500 bg-[#0A0F1D]/60' : 'border-slate-200 text-slate-400 bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">📸</span>
                      <span>Thêm ảnh</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Rating notes textarea */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Ghi chú bổ sung (Tùy chọn):</span>
                <textarea
                  placeholder="Chia sẻ trải nghiệm ca trực của bạn tại cửa hàng này..."
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/45 h-16 resize-none transition-all ${
                    simDarkMode ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border border-slate-200 text-slate-850 placeholder-slate-400 focus:border-primary'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                id="submit-rating-btn"
                onClick={() => {
                  setIsRatingSheetOpen(false);
                  triggerSimToast('Gửi đánh giá ca trực thành công! +2 Điểm Uy Tín.', 'success');
                  // Update score in local state if desired
                }}
                className="w-full text-xs font-black h-11 shadow-md shadow-primary/25"
              >
                Gửi Đánh Giá Ca Làm
              </Button>
            </div>
          )}
        </BottomSheet>

      </div>
    </div>
  );
};

// Simple icon mocks to prevent package issues
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2z"/>
    <rect width="20" height="14" x="2" y="6" rx="2"/>
    <path d="M12 11h.01"/>
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2v4"/><path d="M16 2v4"/>
    <rect width="18" height="18" x="3" y="4" rx="2"/>
    <path d="M3 10h18"/>
  </svg>
);

const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

