import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URI = process.env.MONGO_URI

// ── Inline schemas (no need to import models) ──
const enquirySchema = new mongoose.Schema({
  name: String, email: String, phone: String,
  roomType: String, checkIn: Date, checkOut: Date,
  guests: Number, message: String,
  status: { type: String, default: "new" },
}, { timestamps: true })

const reviewSchema = new mongoose.Schema({
  guestName: String, rating: Number, comment: String,
  roomType: String, avatar: String, featured: Boolean,
}, { timestamps: true })

const Enquiry = mongoose.model("Enquiry", enquirySchema)
const Review  = mongoose.model("Review",  reviewSchema)

const enquiries = [
  { name: "Arjun Hegde",       email: "arjun.hegde@gmail.com",    phone: "9845123456", roomType: "Deluxe AC",      checkIn: "2025-04-02", checkOut: "2025-04-05", guests: 2, message: "Please arrange early check-in if possible.",          status: "new"       },
  { name: "Priya Sharma",      email: "priya.sharma@gmail.com",   phone: "9876543210", roomType: "Suite",          checkIn: "2025-04-10", checkOut: "2025-04-14", guests: 3, message: "Anniversary trip — can we get room decoration?",       status: "contacted" },
  { name: "Rahul Nair",        email: "rahul.nair@gmail.com",     phone: "9900112233", roomType: "Executive AC",   checkIn: "2025-04-06", checkOut: "2025-04-08", guests: 1, message: "Business trip. Need conference room access.",           status: "resolved"  },
  { name: "Sneha Kulkarni",    email: "sneha.k@yahoo.com",        phone: "9812345678", roomType: "Deluxe Twin",    checkIn: "2025-04-15", checkOut: "2025-04-18", guests: 2, message: "",                                                       status: "new"       },
  { name: "Vikram Shetty",     email: "vikram.shetty@gmail.com",  phone: "9967890123", roomType: "Deluxe Non-AC",  checkIn: "2025-04-20", checkOut: "2025-04-22", guests: 2, message: "Travelling with elderly parents, need ground floor.",   status: "new"       },
  { name: "Deepa Rao",         email: "deepa.rao@gmail.com",      phone: "9745678901", roomType: "Deluxe AC",      checkIn: "2025-03-28", checkOut: "2025-03-30", guests: 4, message: "Family vacation — kids 7 and 10 years old.",            status: "contacted" },
  { name: "Kiran Patil",       email: "kiran.patil@gmail.com",    phone: "9823456789", roomType: "Suite",          checkIn: "2025-04-25", checkOut: "2025-04-28", guests: 2, message: "Honeymoon stay. Any special packages available?",       status: "new"       },
  { name: "Meera Bhat",        email: "meera.bhat@gmail.com",     phone: "9901234567", roomType: "Executive AC",   checkIn: "2025-05-01", checkOut: "2025-05-04", guests: 1, message: "",                                                       status: "resolved"  },
  { name: "Suresh Gowda",      email: "suresh.gowda@gmail.com",   phone: "9856789012", roomType: "Non-AC",         checkIn: "2025-04-12", checkOut: "2025-04-13", guests: 1, message: "Just one night stopover.",                              status: "resolved"  },
  { name: "Anita Joshi",       email: "anita.joshi@gmail.com",    phone: "9789012345", roomType: "Deluxe AC",      checkIn: "2025-05-05", checkOut: "2025-05-09", guests: 3, message: "Need vegetarian meals only please.",                    status: "new"       },
  { name: "Ravi Krishnamurthy",email: "ravi.k@gmail.com",         phone: "9834567890", roomType: "Suite",          checkIn: "2025-05-10", checkOut: "2025-05-15", guests: 4, message: "Corporate team outing — need 2 connecting rooms.",      status: "contacted" },
  { name: "Lakshmi Iyer",      email: "lakshmi.iyer@gmail.com",   phone: "9712345678", roomType: "Deluxe Twin",    checkIn: "2025-04-18", checkOut: "2025-04-20", guests: 2, message: "Visiting Sahasralinga — can hotel arrange transport?",  status: "new"       },
  { name: "Mohan Das",         email: "mohan.das@gmail.com",      phone: "9890123456", roomType: "Deluxe AC",      checkIn: "2025-04-30", checkOut: "2025-05-02", guests: 2, message: "",                                                       status: "contacted" },
  { name: "Pooja Desai",       email: "pooja.desai@gmail.com",    phone: "9867890123", roomType: "Executive AC",   checkIn: "2025-05-12", checkOut: "2025-05-14", guests: 2, message: "Celebrating birthday — any cake arrangement?",          status: "new"       },
  { name: "Anil Naik",         email: "anil.naik@gmail.com",      phone: "9945678901", roomType: "Non-AC",         checkIn: "2025-04-08", checkOut: "2025-04-09", guests: 1, message: "Early morning check-out needed by 5am.",                status: "resolved"  },
]

const reviews = [
  { guestName: "Priya Sharma",       rating: 5, roomType: "Suite",        featured: true,  comment: "The suite was absolutely breathtaking. Every detail was thought of — from the pristine rooms to the exceptional cuisine. We return every year without hesitation." },
  { guestName: "Arjun Hegde",        rating: 5, roomType: "Deluxe AC",    featured: true,  comment: "Stayed for our anniversary and it was magical. The staff went above and beyond to make us feel special. The room was immaculate and the food was outstanding." },
  { guestName: "Rahul Nair",         rating: 4, roomType: "Executive AC", featured: true,  comment: "Perfect for business travel. Fast WiFi, comfortable workspace, and the breakfast buffet is excellent. Will definitely book again for my next Sirsi trip." },
  { guestName: "Deepa Rao",          rating: 5, roomType: "Deluxe AC",    featured: true,  comment: "Brought the whole family and everyone loved it. Kids had a blast and parents were comfortable. The location is perfect for exploring Sirsi and nearby temples." },
  { guestName: "Kiran Patil",        rating: 5, roomType: "Suite",        featured: true,  comment: "Honeymoon made perfect by Hotel Supriya. The room decoration they arranged was stunning. Truly a five-star experience in the heart of Karnataka." },
  { guestName: "Meera Bhat",         rating: 4, roomType: "Executive AC", featured: false, comment: "Very comfortable stay. The staff is incredibly helpful and the restaurant food is delicious. The pool area could use some upgrading but overall a great experience." },
  { guestName: "Lakshmi Iyer",       rating: 5, roomType: "Deluxe Twin",  featured: true,  comment: "We came to visit Sahasralinga and this hotel was the highlight of our trip! The service is warm, the rooms are spotless, and the views are beautiful." },
  { guestName: "Suresh Gowda",       rating: 4, roomType: "Non-AC",       featured: false, comment: "Good value for money. Clean rooms, friendly staff, great location. The non-AC room was surprisingly comfortable even in April. Would recommend." },
  { guestName: "Vikram Shetty",      rating: 5, roomType: "Deluxe AC",    featured: true,  comment: "Travelled with elderly parents and the staff was so accommodating. They arranged a ground floor room without hesitation. Truly exceptional hospitality." },
  { guestName: "Ravi Krishnamurthy", rating: 4, roomType: "Suite",        featured: false, comment: "Organized a corporate team outing here and it was flawless. The banquet facilities are world class and the catering team is very professional." },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    await Enquiry.deleteMany({})
    await Review.deleteMany({})
    console.log("🗑  Cleared existing enquiries and reviews")

    // Spread enquiries across last 7 days for chart data
    const now = new Date()
    const seededEnquiries = enquiries.map((e, i) => ({
      ...e,
      createdAt: new Date(now - (i % 7) * 24 * 60 * 60 * 1000 - Math.random() * 3600000),
    }))

    await Enquiry.insertMany(seededEnquiries)
    console.log(`✅ Seeded ${seededEnquiries.length} enquiries`)

    await Review.insertMany(reviews)
    console.log(`✅ Seeded ${reviews.length} reviews`)

    console.log("\n🏨 Database seeded successfully!")
    console.log("   Open http://localhost:5173/admin to see your dashboard\n")
    process.exit(0)
  } catch (err) {
    console.error("❌ Seed error:", err.message)
    process.exit(1)
  }
}

seed()