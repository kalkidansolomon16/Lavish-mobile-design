// Screen registry: every route in the mobile app + the notes shown beside the prototype.
import { state, course, SUCCESS } from '../store'
import Splash from './Splash.vue'
import Welcome from './Welcome.vue'
import Register from './Register.vue'
import Otp from './Otp.vue'
import Login from './Login.vue'
import SetPassword from './SetPassword.vue'
import Home from './Home.vue'
import Doctors from './Doctors.vue'
import DoctorDetail from './DoctorDetail.vue'
import Book from './Book.vue'
import BookReview from './BookReview.vue'
import Appointments from './Appointments.vue'
import AppointmentDetail from './AppointmentDetail.vue'
import Pay from './Pay.vue'
import Payments from './Payments.vue'
import Success from './Success.vue'
import Chats from './Chats.vue'
import ChatRoom from './ChatRoom.vue'
import Shop from './Shop.vue'
import ProductDetail from './ProductDetail.vue'
import Cart from './Cart.vue'
import Checkout from './Checkout.vue'
import Orders from './Orders.vue'
import OrderDetail from './OrderDetail.vue'
import Prescriptions from './Prescriptions.vue'
import PrescriptionDetail from './PrescriptionDetail.vue'
import Complaints from './Complaints.vue'
import NewComplaint from './NewComplaint.vue'
import ComplaintDetail from './ComplaintDetail.vue'
import Profile from './Profile.vue'
import Notifications from './Notifications.vue'
import StudentHome from './StudentHome.vue'
import Courses from './Courses.vue'
import CourseDetail from './CourseDetail.vue'
import MyCourse from './MyCourse.vue'
import StudentProfile from './StudentProfile.vue'
import NewsItem from './NewsItem.vue'
import Lesson from './Lesson.vue'
import Certificate from './Certificate.vue'

// tab: which bottom-tab is highlighted (screens with a tab are tab roots). light: white status bar over a teal header.
export const SCREENS = {
  splash: { c: Splash, light: true, dark: true },
  welcome: { c: Welcome, light: true },
  register: { c: Register },
  otp: { c: Otp },
  login: { c: Login },
  'set-password': { c: SetPassword },

  home: { c: Home, role: 'client', tab: 'home', light: true },
  doctors: { c: Doctors, role: 'client', tab: 'doctors' },
  chats: { c: Chats, role: 'client', tab: 'chats' },
  shop: { c: Shop, role: 'client', tab: 'shop' },
  profile: { c: Profile, role: 'client', tab: 'profile', light: true },
  doctor: { c: DoctorDetail, role: 'client', light: true },
  book: { c: Book, role: 'client' },
  'book-review': { c: BookReview, role: 'client' },
  appointments: { c: Appointments, role: 'client' },
  appointment: { c: AppointmentDetail, role: 'client' },
  pay: { c: Pay, role: 'client' },
  payments: { c: Payments, role: 'client' },
  chat: { c: ChatRoom, role: 'client' },
  product: { c: ProductDetail, role: 'client' },
  cart: { c: Cart, role: 'client' },
  checkout: { c: Checkout, role: 'client' },
  orders: { c: Orders, role: 'client' },
  order: { c: OrderDetail, role: 'client' },
  prescriptions: { c: Prescriptions, role: 'client' },
  prescription: { c: PrescriptionDetail, role: 'client' },
  complaints: { c: Complaints, role: 'client' },
  'new-complaint': { c: NewComplaint, role: 'client' },
  complaint: { c: ComplaintDetail, role: 'client' },
  notifications: { c: Notifications, role: 'client' },
  news: { c: NewsItem, role: 'client', light: true },
  success: { c: Success },

  's-home': { c: StudentHome, role: 'student', tab: 's-home', light: true },
  's-courses': { c: Courses, role: 'student', tab: 's-courses' },
  's-chat': { c: ChatRoom, role: 'student', tab: 's-chat' },
  's-profile': { c: StudentProfile, role: 'student', tab: 's-profile', light: true },
  course: { c: CourseDetail, role: 'student', light: true },
  'my-course': { c: MyCourse, role: 'student' },
  lesson: { c: Lesson, role: 'student', light: true },
  certificate: { c: Certificate, role: 'student' },
}

export const TABS = {
  client: [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'doctors', icon: 'stethoscope', label: 'Doctors' },
    { key: 'shop', icon: 'storefront', label: 'Shop' },
    { key: 'chats', icon: 'forum', label: 'Chat' },
    { key: 'profile', icon: 'person', label: 'Profile' },
  ],
  student: [
    { key: 's-home', icon: 'home', label: 'Home' },
    { key: 's-courses', icon: 'school', label: 'Courses' },
    { key: 's-chat', icon: 'forum', label: 'Teacher' },
    { key: 's-profile', icon: 'person', label: 'Profile' },
  ],
}

const RX = 'Doctor → Prescriptions'
export const FLOWS = [
  { group: 'Onboarding', icon: 'login', items: [
    { s: 'splash', label: 'Splash', note: 'Shown while the app checks for a saved login token. Auto-advances to Welcome (or Home if already logged in).' },
    { s: 'welcome', label: 'Welcome', note: 'First launch. Clients sign up; students go straight to login — they don’t register in the app.' },
    { s: 'register', label: 'Register · client', note: 'Client sign-up only. Phone number is the login. Branch preference helps reception schedule.', web: 'New clients appear in Reception → Clients.' },
    { s: 'otp', label: 'Verify phone (OTP)', params: { role: 'client' }, note: 'SMS one-time code verifies the phone number before the account is active.' },
    { s: 'login', label: 'Log in', note: 'Phone + password. The API returns the role (client or student) and the app opens the matching home.' },
    { s: 'login', label: 'Student login', params: { role: 'student' }, note: 'Students enrol in person or by calling the CEO, who creates their login and gives them a temporary password.', web: 'CEO → Academy → Students → Add student (also resets forgotten passwords).' },
    { s: 'set-password', label: 'Student · set password', note: 'First login: the student replaces the temporary password from the academy.' },
  ] },
  { group: 'Client · Book a doctor', icon: 'calendar_month', items: [
    { s: 'home', label: 'Home', note: 'Next confirmed appointment, pending requests, quick actions, new prescriptions, news from Lavish and featured treatments/products.', web: 'News is posted by the CEO or General Manager in Web → News.' },
    { s: 'news', label: 'News detail', params: { id: 1 }, note: 'Full news post with a shortcut (book / shop) depending on the tag.', web: 'CEO / General Manager → News → Post news.' },
    { s: 'doctors', label: 'Doctors list', note: 'All doctors with specialty, branch, rating and today’s status. Filter by specialty or treatment. “Not sure?” lets reception assign a doctor.', web: 'Only doctors with access appear. The CEO or General Manager gives access in Web → Staff; the CEO can ban a doctor.' },
    { s: 'doctor', label: 'Doctor profile', params: { id: 1 }, note: 'Bio, treatments with prices, location and hours. Chat button is locked until the client has had a treatment with this doctor.' },
    { s: 'book', label: 'Pick treatment, date & time', params: { doctorId: 1, time: '10:30' }, note: 'Treatment, 14-day date strip and time slots. Booked slots are crossed out (the API returns availability per doctor/day).' },
    { s: 'book', label: 'Book · reception chooses doctor', params: { doctorId: null }, note: 'Same form without a doctor — the client picks a branch and reception assigns the best match.', web: 'Shows as “Unassigned” in Reception → Appointments with doctor suggestions.' },
    { s: 'book-review', label: 'Review & send request', params: { doctorId: 1, service: 'Morpheus8 & Microneedling', time: '10:30' }, note: 'Summary + choose to pay now or at reception. Sending creates a PENDING appointment.', web: 'Appears in Reception → Appointments for approval.' },
    { s: 'success', label: 'Request sent', params: SUCCESS.booking(state.appointments[1]), note: 'Explains the approval flow: reception approves → doctor is notified → treatment.' },
    { s: 'appointments', label: 'My appointments', note: 'Tabs: Upcoming (approved), Requests (pending) and Past (completed / declined).' },
    { s: 'appointment', label: 'Appointment · pending', params: { id: 203 }, note: 'Waiting for reception. The client can cancel or pay early.' },
    { s: 'appointment', label: 'Appointment · approved', params: { id: 202 }, note: 'Approved by reception; the doctor has been notified (push notification to the client too).', web: 'Reception → Appointments → Approve. The doctor sees the client in their dashboard.' },
    { s: 'appointment', label: 'Appointment · completed', params: { id: 201 }, note: 'After treatment, chat with the doctor unlocks and “Book again” is offered.', web: 'Doctor marks the appointment complete in the web app.' },
    { s: 'appointment', label: 'Appointment · declined', params: { id: 204 }, note: 'Reception declined — client is prompted to pick another slot.' },
  ] },
  { group: 'Client · Payments', icon: 'payments', items: [
    { s: 'pay', label: 'Pay for appointment', params: { id: 202 }, note: 'Telebirr, CBE Birr or card via Chapa — or choose to pay cash at reception.', web: 'Appointment payments show in Reception → Payments; reception marks cash payments as paid.' },
    { s: 'success', label: 'Payment receipt', params: SUCCESS.payment(state.appointments[2]), note: 'Receipt with Chapa transaction reference.' },
    { s: 'payments', label: 'Payment history', note: 'Outstanding vs paid totals and all appointment payments.' },
  ] },
  { group: 'Client · Chat with doctor', icon: 'forum', items: [
    { s: 'chats', label: 'Messages', note: 'All doctors the client has booked. Only doctors who have treated the client are unlocked.' },
    { s: 'chat', label: 'Chat · unlocked', params: { key: 1 }, note: 'Real-time chat (text + photos) about results and aftercare.', web: 'Doctor replies from Doctor → Chat in the web app.' },
    { s: 'chat', label: 'Chat · locked', params: { key: 2 }, note: 'Before the first treatment the chat is locked, with a shortcut to book.' },
    { s: 'prescriptions', label: 'Prescriptions', note: 'Product recommendations sent by doctors.', web: RX },
    { s: 'prescription', label: 'Prescription detail', params: { id: 1 }, note: 'Products, quantities and how to use them. “Order all items” fills the cart.', web: RX },
  ] },
  { group: 'Client · Shop', icon: 'storefront', items: [
    { s: 'shop', label: 'Shop', note: 'Product catalogue by category. Out-of-stock items can’t be added.', web: 'Products and prices are posted by Lavish E-commerce → Products.' },
    { s: 'product', label: 'Product detail', params: { id: 1 }, note: 'Description, how to use, stock level, quantity and delivery info.' },
    { s: 'product', label: 'Product · out of stock', params: { id: 5 }, note: 'Out of stock — offers “Notify me”.' },
    { s: 'cart', label: 'Cart', note: 'Edit quantities, see delivery fee and total.' },
    { s: 'checkout', label: 'Checkout', note: 'Delivery address, courier phone and payment method.' },
    { s: 'success', label: 'Order placed', params: SUCCESS.order(state.orders[0]), note: 'Order confirmation.', web: 'New order appears in Lavish E-commerce → Orders.' },
    { s: 'orders', label: 'My orders', note: 'All orders with status.' },
    { s: 'order', label: 'Order tracking', params: { id: 9001 }, note: 'Placed → confirmed → delivered.', web: 'Lavish E-commerce confirms delivery and payment; the client gets a notification here.' },
  ] },
  { group: 'Client · Complaints & account', icon: 'support_agent', items: [
    { s: 'complaints', label: 'My complaints', note: 'Status of every complaint and the latest reply.', web: 'The General Manager tracks these in General Manager → Complaints.' },
    { s: 'new-complaint', label: 'New complaint', params: { category: 'Treatment' }, note: 'Category, related appointment/order, details, urgency and photos. High-urgency treatment issues show the emergency number.' },
    { s: 'success', label: 'Complaint received', params: SUCCESS.complaint(state.complaints[0]), note: 'Confirmation with review timeline.' },
    { s: 'complaint', label: 'Complaint detail', params: { id: 702 }, note: 'Timeline + conversation with client care. Resolved complaints ask for feedback.', web: 'The General Manager replies / changes status in the web app.' },
    { s: 'notifications', label: 'Notifications', note: 'Push notification inbox: approvals, prescriptions, chat, complaint replies, deliveries.' },
    { s: 'profile', label: 'Profile', note: 'Account summary and links to appointments, orders, prescriptions, payments and complaints.' },
  ] },
  { group: 'Student · Academy', icon: 'school', items: [
    { s: 's-home', label: 'Student home', note: 'Course progress, next session, certificate and the latest message from the teacher.' },
    { s: 's-courses', label: 'Courses', note: 'Academy catalogue filtered by level.', web: 'Learning paths are managed in General Manager → Academy.' },
    { s: 'course', label: 'Course detail', params: { id: 3 }, note: 'About, modules, schedule, fee and entry requirements. No in-app applications — “Call to enrol” phones the academy.', web: 'The CEO adds the course to the student in CEO → Academy → Students.' },
    { s: 'my-course', label: 'My course', params: { id: 1 }, note: 'Progress, schedule, modules with videos and exercises, and teachers.', web: 'Modules come from the GM’s learning path; the teacher adds videos, exercises and classes in Academy Teacher → Modules / Schedule.' },
    { s: 'lesson', label: 'Lesson · video & exercise', params: { course: 1, week: 5 }, note: 'Watch the module video, download notes and submit the exercise.', web: 'Teacher grades submissions in Academy Teacher → Students.' },
    { s: 'certificate', label: 'Certificate (PDF)', params: { id: 4 }, note: 'Soft-copy certificate the student can download or share.', web: 'Issued by the General Manager in Academy → Certificates (also printable).' },
    { s: 's-chat', label: 'Chat with teacher', note: 'Students chat with the doctors who teach their course.', web: 'Teachers answer from Academy Teacher → Students.' },
    { s: 's-profile', label: 'Student profile', note: 'Enrolled courses, certificates and fee status.' },
  ] },
]
