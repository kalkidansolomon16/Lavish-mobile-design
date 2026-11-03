// Mock data + navigation for the mobile design prototype.
// Mirrors lavish_front/src/store.js so screens show the same doctors, products and services.
// The Flutter app will replace all of this with calls to the Laravel API.
import { reactive } from 'vue'

const DAY = 864e5
export const day = (n) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10)
export const today = day(0)
export const etb = (n) => `ETB ${n.toLocaleString()}`
export const fmtDate = (d, o = { weekday: 'short', day: 'numeric', month: 'short' }) => new Date(d + 'T00:00').toLocaleDateString('en-GB', o)
export const slug = (s) => String(s).toLowerCase().replace(/\s+/g, '-')

export const BRANCHES = ['Addis Ababa – Bole', 'Addis Ababa – Kazanchis', 'Hawassa']
export const DELIVERY_FEE = 150
// Students enrol in person or by calling the CEO's office — there's no student sign-up in the app.
export const ACADEMY_PHONE = '+251 911 00 11 22'

export const SERVICES = [
  { name: 'Signature HydraFacial', price: 4500, mins: 60, icon: 'spa' },
  { name: 'PRP Skin Rejuvenation', price: 9000, mins: 75, icon: 'water_drop' },
  { name: 'Morpheus8 & Microneedling', price: 12000, mins: 90, icon: 'auto_awesome' },
  { name: 'Advanced Dermatology Treatments', price: 3500, mins: 45, icon: 'healing' },
  { name: 'Botox & Dermal Fillers', price: 18500, mins: 45, icon: 'vaccines' },
  { name: 'HIFU Face & Neck Lift', price: 15000, mins: 90, icon: 'face_retouching_natural' },
  { name: 'Hair Restoration Solutions', price: 45000, mins: 240, icon: 'face' },
  { name: 'Body Contouring & Skin Tightening', price: 20000, mins: 120, icon: 'accessibility_new' },
]
export const service = (n) => SERVICES.find((s) => s.name === n) ?? { name: n, price: 0, mins: 60, icon: 'spa' }

export const state = reactive({
  role: 'client',
  stack: [{ name: 'splash', params: {} }],
  toast: '',
  typing: false,

  client: { name: 'Tigist Worku', phone: '+251 911 22 33 44', email: 'tigist.w@gmail.com', branch: 'Addis Ababa – Bole', joined: '2026-08-14' },
  student: { name: 'Eden Fikru', phone: '+251 912 45 67 89', email: 'eden.fikru@gmail.com', joined: '2026-09-01' },

  doctors: [
    { id: 1, name: 'Dr. Meron Alemu', specialty: 'Dermatology', skills: ['Signature HydraFacial', 'PRP Skin Rejuvenation', 'Morpheus8 & Microneedling', 'Advanced Dermatology Treatments'], branch: 'Addis Ababa – Bole', status: 'Available', years: 9, rating: 4.9, reviews: 212, hue: 185,
      bio: 'Board-certified dermatologist focused on skin health, acne scarring and non-surgical rejuvenation.', days: 'Mon – Sat' },
    { id: 2, name: 'Dr. Yonas Tesfaye', specialty: 'Aesthetic Medicine', skills: ['Botox & Dermal Fillers', 'HIFU Face & Neck Lift', 'Signature HydraFacial'], branch: 'Addis Ababa – Bole', status: 'Available', years: 7, rating: 4.8, reviews: 164, hue: 25,
      bio: 'Aesthetic physician known for natural-looking injectables and lifting treatments.', days: 'Tue – Sun' },
    { id: 3, name: 'Dr. Liya Getachew', specialty: 'Hair Transplant', skills: ['Hair Restoration Solutions'], branch: 'Addis Ababa – Kazanchis', status: 'In surgery', years: 11, rating: 4.9, reviews: 98, hue: 340,
      bio: 'Hair restoration surgeon specialising in FUE transplants and PRP scalp therapy.', days: 'Mon – Fri' },
    { id: 4, name: 'Dr. Biruk Mengistu', specialty: 'Body Transformation', skills: ['Body Contouring & Skin Tightening'], branch: 'Hawassa', status: 'Off today', years: 6, rating: 4.7, reviews: 73, hue: 140,
      bio: 'Body contouring specialist using non-invasive fat reduction and skin tightening.', days: 'Mon – Sat' },
  ],

  // The signed-in client's appointments. Reception approves "pending" ones in the web app.
  appointments: [
    { id: 202, doctorId: 1, service: 'Morpheus8 & Microneedling', date: day(2), time: '11:30', branch: 'Addis Ababa – Bole', status: 'approved', note: 'Acne scars on cheeks.', payment: { amount: 12000, status: 'unpaid' } },
    { id: 203, doctorId: 2, service: 'HIFU Face & Neck Lift', date: day(5), time: '10:00', branch: 'Addis Ababa – Bole', status: 'pending', note: '', payment: { amount: 15000, status: 'unpaid' } },
    { id: 201, doctorId: 1, service: 'Signature HydraFacial', date: day(-20), time: '09:00', branch: 'Addis Ababa – Bole', status: 'completed', note: 'Dull, dry skin before a wedding.', payment: { amount: 4500, status: 'paid', method: 'Telebirr', txRef: 'CHP-7K2M9QX1', paidOn: day(-20) } },
    { id: 204, doctorId: 3, service: 'Hair Restoration Solutions', date: day(-6), time: '14:30', branch: 'Addis Ababa – Kazanchis', status: 'declined', note: 'Consultation only.', payment: { amount: 45000, status: 'unpaid' } },
  ],

  products: [
    { id: 1, name: 'Vitamin C Brightening Serum', category: 'Skincare', price: 2800, stock: 34, size: '30 ml', hue: 32, desc: 'A lightweight 15% vitamin C serum that fades dark spots and evens skin tone.', use: 'Apply 3–4 drops every morning before moisturiser and sunscreen.' },
    { id: 2, name: 'Hyaluronic Hydra Cream', category: 'Skincare', price: 3200, stock: 21, size: '50 ml', hue: 190, desc: 'Deeply hydrating cream with three weights of hyaluronic acid for plump, calm skin.', use: 'Massage onto clean skin morning and night.' },
    { id: 3, name: 'SPF 50 Mineral Sunscreen', category: 'Sun care', price: 1900, stock: 5, size: '50 ml', hue: 45, desc: 'Broad-spectrum mineral protection with no white cast. Safe after treatments.', use: 'Apply generously every morning; reapply every 3 hours outdoors.' },
    { id: 4, name: 'Post-Treatment Recovery Balm', category: 'Aftercare', price: 2400, stock: 18, size: '40 ml', hue: 160, desc: 'Soothes redness and supports the skin barrier after peels, lasers and microneedling.', use: 'Thin layer on treated area twice daily for 5 days.' },
    { id: 5, name: 'Scalp Revive Hair Tonic', category: 'Hair', price: 2100, stock: 0, size: '100 ml', hue: 280, desc: 'Peptide tonic that supports hair density between PRP sessions.', use: 'Spray onto dry scalp each evening and massage in.' },
    { id: 6, name: 'Gentle Foam Cleanser', category: 'Skincare', price: 1600, stock: 40, size: '150 ml', hue: 200, desc: 'pH-balanced cleanser that removes makeup and sunscreen without stripping.', use: 'Lather with water, massage for 30 seconds, rinse.' },
    { id: 7, name: 'Retinol Night Repair', category: 'Skincare', price: 3600, stock: 12, size: '30 ml', hue: 260, desc: 'Encapsulated retinol for smoother texture and fewer fine lines.', use: 'Use 2–3 nights a week, then nightly. Always wear SPF.' },
    { id: 8, name: 'Soothing Aloe Gel', category: 'Aftercare', price: 1200, stock: 25, size: '100 ml', hue: 120, desc: 'Cooling aloe gel for sun exposure and post-treatment warmth.', use: 'Apply as needed to calm the skin.' },
  ],

  cart: [{ productId: 4, qty: 1 }, { productId: 3, qty: 1 }],

  // Admin confirms delivery of "placed" orders in the web app.
  orders: [
    { id: 9001, lines: [{ productId: 1, qty: 1 }, { productId: 3, qty: 2 }], total: 6750, fee: 150, address: 'Bole, around Edna Mall, Addis Ababa', method: 'Pay on delivery', status: 'placed', date: today },
    { id: 9003, lines: [{ productId: 2, qty: 2 }], total: 6550, fee: 150, address: 'Bole, around Edna Mall, Addis Ababa', method: 'Telebirr', status: 'delivered', date: day(-12) },
  ],

  prescriptions: [
    { id: 1, doctorId: 1, date: day(-1), status: 'sent', note: 'Mild dryness after HydraFacial — keep skin hydrated, avoid exfoliants for a week.',
      items: [{ productId: 2, qty: 1, instructions: 'Apply twice daily, morning and night' }, { productId: 3, qty: 2, instructions: 'Every morning, reapply after 3 hours outdoors' }] },
  ],

  // The General Manager tracks these in the web app.
  complaints: [
    { id: 702, category: 'Appointment', subject: 'Long waiting time', message: 'I waited 40 minutes past my appointment time at Bole.', priority: 'medium', status: 'in-review', date: day(-4), ref: 'Appointment #201',
      reply: 'Sorry for the wait, Tigist. We are reviewing scheduling at Bole and will update you within 2 days.' },
    { id: 703, category: 'Order', subject: 'Wrong item delivered', message: 'I ordered the Hydra Cream but received the serum.', priority: 'low', status: 'resolved', date: day(-9), ref: 'Order #9003',
      reply: 'Replacement delivered. Apologies for the mix-up!' },
  ],

  // Keyed by doctorId, plus "teacher" for the student ↔ teacher-doctor thread.
  chats: {
    1: [
      { from: 'them', text: 'Hello Tigist, how is your skin feeling after the HydraFacial?', time: 'Mon 10:02' },
      { from: 'me', text: 'Hi Doctor, it feels a bit dry since the facial. Is that normal?', time: 'Mon 10:15' },
      { from: 'them', text: 'Mild dryness is normal for 48h. I sent you a prescription — use the Hydra Cream twice daily.', time: 'Mon 10:20' },
    ],
    teacher: [
      { from: 'them', text: 'Welcome to Foundations, Eden! I’m Dr. Meron, your teacher for this course.', time: 'Sep 1' },
      { from: 'me', text: 'Thank you! Can I reschedule Friday’s practical?', time: 'Yesterday' },
      { from: 'them', text: 'Yes — I moved you to Saturday 10:00, Bole training room.', time: 'Yesterday' },
    ],
  },

  notifications: [
    { id: 1, icon: 'event_available', title: 'Appointment approved', text: 'Morpheus8 on ' + fmtDate(day(2)) + ' at 11:30 is confirmed. Dr. Meron Alemu has been notified.', time: '2h ago', unread: true, to: 'appointment', params: { id: 202 } },
    { id: 2, icon: 'medication', title: 'New prescription', text: 'Dr. Meron Alemu sent you 2 products for your skin routine.', time: 'Yesterday', unread: true, to: 'prescription', params: { id: 1 } },
    { id: 3, icon: 'chat', title: 'Dr. Meron Alemu', text: 'Mild dryness is normal for 48h…', time: 'Mon', unread: false, to: 'chat', params: { key: 1 } },
    { id: 4, icon: 'support_agent', title: 'Reply to your complaint', text: 'Client care replied to “Long waiting time”.', time: '3d ago', unread: false, to: 'complaint', params: { id: 702 } },
    { id: 5, icon: 'local_shipping', title: 'Order delivered', text: 'Order #9003 was delivered. Enjoy!', time: '12d ago', unread: false, to: 'order', params: { id: 9003 } },
  ],

  courses: [
    { id: 1, teacherIds: [1], title: 'Medical Aesthetics Foundations', weeks: 8, price: 35000, level: 'Beginner', mode: 'In person · Bole', start: day(28), hue: 185,
      about: 'The essential start for a career in medical aesthetics: skin science, hygiene, consultations and core treatments.',
      modules: ['Skin anatomy & types', 'Hygiene & infection control', 'Client consultation', 'Facials & extractions', 'Chemical peels', 'Microdermabrasion', 'Aftercare & product advice', 'Final practical exam'] },
    { id: 2, teacherIds: [1, 2], title: 'HydraFacial & Skin Analysis', weeks: 4, price: 18000, level: 'Intermediate', mode: 'In person · Bole', start: day(14), hue: 200,
      about: 'Hands-on training on HydraFacial systems and digital skin analysis.',
      modules: ['Skin analysis devices', 'HydraFacial protocol', 'Boosters & add-ons', 'Practical assessment'] },
    { id: 3, teacherIds: [2], title: 'Injectables: Botox & Fillers', weeks: 6, price: 52000, level: 'Advanced', mode: 'In person · Bole', start: day(45), hue: 25, requirement: 'For licensed doctors and nurses only',
      about: 'Advanced injection techniques with live-model practice under supervision.',
      modules: ['Facial anatomy', 'Neurotoxins', 'Hyaluronic fillers', 'Complications', 'Live-model practice', 'Certification'] },
    { id: 4, teacherIds: [3], title: 'Laser Hair Removal Technician', weeks: 5, price: 28000, level: 'Beginner', mode: 'In person · Kazanchis', start: day(21), hue: 160,
      about: 'Learn laser physics, safety and treatment for all skin types.',
      modules: ['Laser physics & safety', 'Skin typing', 'Treatment protocols', 'Practical sessions', 'Certification'] },
  ],

  // Created by the CEO in the web app when the student enrols; the General Manager issues certificates.
  enrollments: [
    { courseId: 1, status: 'active', progress: 62, week: 5, paid: true },
    { courseId: 4, status: 'completed', progress: 100, paid: true, certificate: { no: 'LA-2026-0001', date: day(-40), by: 'Dawit Haile' } },
  ],

  // Lessons for Medical Aesthetics Foundations, added by the teacher doctor in the web app.
  lessons: {
    1: [
      { week: 1, video: { title: 'Layers of the skin', mins: 18 }, exercise: { title: 'Label the skin layers', due: day(-28), status: 'graded', grade: '18/20' } },
      { week: 2, video: { title: 'Clinic sterilisation walkthrough', mins: 22 }, exercise: { title: 'Hygiene checklist quiz', due: day(-21), status: 'graded', grade: '9/10' } },
      { week: 3, video: { title: 'Running a consultation', mins: 25 }, exercise: { title: 'Role-play recording', due: day(-14), status: 'graded', grade: 'Pass' } },
      { week: 4, video: { title: 'Extraction technique', mins: 31 }, exercise: { title: 'Practical log — 3 facials', due: day(-7), status: 'submitted' } },
      { week: 5, video: { title: 'Peel depth & selection', mins: 27 }, exercise: { title: 'Peel case study (500 words)', due: day(3), status: 'todo' } },
    ],
  },

  // Posted by the CEO or General Manager in the web app; shown on the client Home screen.
  news: [
    { id: 1, title: 'New: Morpheus8 now at Kazanchis', body: 'Our most requested skin-tightening treatment is now available at the Kazanchis branch. Book it from the app with Dr. Meron or Dr. Yonas.', tag: 'New treatment', date: day(-1), hue: 185, icon: 'auto_awesome' },
    { id: 2, title: '20% off aftercare this week', body: 'All Aftercare products are 20% off in the Lavish shop until Sunday. The discount is applied automatically at checkout.', tag: 'Offer', date: day(-3), hue: 25, icon: 'sell' },
    { id: 3, title: 'Lavish Academy: December intake', body: 'Enrolment for the December Medical Aesthetics Foundations intake is open. Visit the academy or call us to register — we’ll give you your student login.', tag: 'Academy', date: day(-6), hue: 160, icon: 'school' },
  ],
})

export const doctor = (id) => state.doctors.find((d) => d.id === id)
export const product = (id) => state.products.find((p) => p.id === id)
export const course = (id) => state.courses.find((c) => c.id === id)
export const enrollment = (courseId) => state.enrollments.find((e) => e.courseId === courseId)
export const canChat = (doctorId) => state.appointments.some((a) => a.doctorId === doctorId && a.status === 'completed')
export const cartCount = () => state.cart.reduce((n, l) => n + l.qty, 0)
export const linesTotal = (lines) => lines.reduce((t, l) => t + product(l.productId).price * l.qty, 0)
export const homeOf = () => (state.role === 'student' ? 's-home' : 'home')

// ---- navigation (a simple stack, like Flutter's Navigator) ----
export const go = (name, params = {}) => state.stack.push({ name, params })
export const back = () => { if (state.stack.length > 1) state.stack.pop() }
export const reset = (name, params = {}) => { state.stack = [{ name, params }] }

export function notify(msg) {
  state.toast = msg
  clearTimeout(notify.t)
  notify.t = setTimeout(() => (state.toast = ''), 2400)
}

const txRef = () => 'CHP-' + Math.random().toString(36).slice(2, 10).toUpperCase()
const REPLIES = {
  doctor: ['Thanks for the update. Keep following the routine and send me a photo in 3 days.', 'That is normal after treatment. If the redness lasts more than 48 hours, let me know.'],
  teacher: ['Good question, Eden — we will cover that in Saturday’s practical.', 'Noted. Upload your exercise when ready and I will grade it this week.'],
}

export const actions = {
  book({ doctorId, service: s, date, time, branch, note }) {
    const a = { id: 300 + state.appointments.length, doctorId, service: s, date, time, branch, note, status: 'pending', payment: { amount: service(s).price, status: 'unpaid' } }
    state.appointments.unshift(a)
    return a
  },
  pay(a, method) { Object.assign(a.payment, { status: 'paid', method, txRef: txRef(), paidOn: today }) },
  cancel(a) { a.status = 'cancelled'; notify('Request cancelled') },
  addToCart(productId, qty = 1, quiet) {
    const l = state.cart.find((x) => x.productId === productId)
    if (l) l.qty += qty
    else state.cart.push({ productId, qty })
    if (!quiet) notify('Added to cart')
  },
  setQty(l, q) {
    l.qty = q
    if (q <= 0) state.cart = state.cart.filter((x) => x !== l)
  },
  placeOrder({ address, method }) {
    const lines = state.cart.map((l) => ({ ...l }))
    const o = { id: 9010 + state.orders.length, lines, total: linesTotal(lines) + DELIVERY_FEE, fee: DELIVERY_FEE, address, method, status: 'placed', date: today }
    state.orders.unshift(o)
    state.cart = []
    return o
  },
  orderPrescription(rx) {
    rx.items.forEach((i) => actions.addToCart(i.productId, i.qty, true))
    rx.status = 'ordered'
    notify('Prescription items added to cart')
  },
  addComplaint(c) {
    const x = { id: 710 + state.complaints.length, status: 'open', date: today, reply: '', ...c }
    state.complaints.unshift(x)
    return x
  },
  sendChat(key, text) {
    if (!state.chats[key]) state.chats[key] = []
    state.chats[key].push({ from: 'me', text, time: 'now' })
    state.typing = key
    const pool = key === 'teacher' ? REPLIES.teacher : REPLIES.doctor
    setTimeout(() => {
      state.typing = false
      state.chats[key].push({ from: 'them', text: pool[state.chats[key].length % pool.length], time: 'now' })
    }, 1600)
  },
  submitExercise(l) { l.exercise.status = 'submitted'; notify('Exercise sent to your teacher') },
}

// Content for the shared "success" screen after each flow.
export const SUCCESS = {
  booking: (a) => ({
    icon: 'event_available', title: 'Request sent!',
    text: `Your ${a.service} request was sent to reception. We'll notify you as soon as it's approved.`,
    steps: [
      { t: 'Request sent', d: 'Just now', done: true },
      { t: 'Reception approves', d: 'Usually within 2 hours', now: true },
      { t: 'Doctor is notified', d: a.doctorId ? doctor(a.doctorId).name : 'Reception assigns the best doctor' },
      { t: 'Your treatment', d: `${fmtDate(a.date)} · ${a.time}` },
    ],
    primary: { label: 'View appointment', to: 'appointment', params: { id: a.id } },
    secondary: { label: 'Back to home' },
  }),
  payment: (a) => ({
    icon: 'verified', title: 'Payment successful',
    text: 'Your receipt is saved under Payments. Reception can see this payment.',
    receipt: [['Amount', etb(a.payment.amount)], ['For', a.service], ['Method', a.payment.method], ['Reference', a.payment.txRef], ['Date', fmtDate(a.payment.paidOn)]],
    primary: { label: 'View appointment', to: 'appointment', params: { id: a.id } },
    secondary: { label: 'Back to home' },
  }),
  order: (o) => ({
    icon: 'shopping_bag', title: 'Order placed!',
    text: `Order #${o.id} is with our team. You'll be notified when it's confirmed and delivered.`,
    receipt: [['Order', '#' + o.id], ['Items', o.lines.reduce((n, l) => n + l.qty, 0) + ' items'], ['Total', etb(o.total)], ['Payment', o.method], ['Deliver to', o.address]],
    primary: { label: 'Track order', to: 'order', params: { id: o.id } },
    secondary: { label: 'Continue shopping', to: 'shop' },
  }),
  complaint: (c) => ({
    icon: 'support_agent', title: 'Complaint received',
    text: `Thank you for telling us. Our client care team will review “${c.subject}” and reply here.`,
    steps: [{ t: 'Submitted', d: 'Just now', done: true }, { t: 'In review by client care', d: 'Usually within 24 hours', now: true }, { t: 'Resolved', d: 'You’ll get a notification' }],
    primary: { label: 'View complaint', to: 'complaint', params: { id: c.id } },
    secondary: { label: 'Back to home' },
  }),
}
