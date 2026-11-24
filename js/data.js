let rooms = [
  { id: "R-001", number: "101", category: "Single", price: 2000, capacity: 1, status: "Available" },
  { id: "R-002", number: "105", category: "Double", price: 3500, capacity: 2, status: "Booked" },
  { id: "R-003", number: "204", category: "Deluxe", price: 5000, capacity: 2, status: "Booked" },
  { id: "R-004", number: "301", category: "Suite",  price: 8000, capacity: 4, status: "Available" }
];

let staffList = [
  { id: "S-001", name: "Admin",        email: "admin@hotel.com",  phone: "01711000001", position: "Manager",      salary: 50000, status: "Active" },
  { id: "S-002", name: "Rahim Ahmed",  email: "rahim@hotel.com",  phone: "01711000002", position: "Receptionist", salary: 25000, status: "Active" },
  { id: "S-003", name: "Karim Hasan",  email: "karim@hotel.com",  phone: "01711000003", position: "Room Service", salary: 18000, status: "Active" },
  { id: "S-004", name: "Hasan Ali",    email: "hasan@hotel.com",  phone: "01711000004", position: "Housekeeping", salary: 16000, status: "On Leave" }
];

let complaintsList = [
  { id: "C-001", customer: "Rahim Ahmed", room: "204", issue: "AC not working properly", date: "2026-11-18", type: "Maintenance", status: "Pending",     action: "" },
  { id: "C-002", customer: "Karim Hasan", room: "105", issue: "Bathroom towel missing",  date: "2026-11-19", type: "Cleanliness", status: "Resolved",    action: "Provided fresh towels immediately." },
  { id: "C-003", customer: "Nadia Islam", room: "301", issue: "Room service delayed",    date: "2026-11-20", type: "Service",     status: "In Progress", action: "Assigned senior staff to monitor." }
];

let maintenanceList = [
  { id: "M-001", item: "Air Conditioner", room: "204", reportedBy: "Room Service", date: "2026-11-18", desc: "Cooling stopped suddenly", status: "Pending",     action: "" },
  { id: "M-002", item: "Water Tap",       room: "105", reportedBy: "Housekeeping", date: "2026-11-19", desc: "Tap leaking in washroom",  status: "In Progress", action: "Plumber assigned." },
  { id: "M-003", item: "Door Lock",       room: "101", reportedBy: "Receptionist", date: "2026-11-15", desc: "Key card sensor loose",    status: "Completed",   action: "Sensor replaced and tested." }
];

let reviewsList = [
  { id: "REV-001", staffId: "S-002", name: "Rahim Ahmed", feedback: "Very helpful and polite at reception.", rating: 5, type: "Positive" },
  { id: "REV-002", staffId: "S-003", name: "Karim Hasan", feedback: "Room service delivery was late.",        rating: 2, type: "Negative" },
  { id: "REV-003", staffId: "S-004", name: "Hasan Ali",   feedback: "Room was spotless and clean.",           rating: 5, type: "Positive" }
];

let investigationsList = [
  { id: "I-001", staffId: "S-003", name: "Karim Hasan", issue: "Room service delivery was late.", status: "Pending", decision: "" }
];

let monthlySalesData = [
  { month: "2026-09", label: "September 2026", roomRev: 550000, otherRev: 90000,  expense: 280000, bookings: 125 },
  { month: "2026-10", label: "October 2026",   roomRev: 620000, otherRev: 110000, expense: 310000, bookings: 140 },
  { month: "2026-11", label: "November 2026",  roomRev: 700000, otherRev: 150000, expense: 320000, bookings: 150 }
];
