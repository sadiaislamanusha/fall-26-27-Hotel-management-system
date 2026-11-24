/* =====================================================
   HOTEL MANAGEMENT SYSTEM - CUSTOMER DATA
   Ei file e shob page er shared data ar helper function ache.
   NOTE: Ekhane localStorage use kora hoy ni. Data shudhu
   browser er memory (RAM) te thake, tai page reload dile
   (ba onno page e gele) data abar default obosthay fire ashe.
===================================================== */

// Data gulo kon key er nam e rakha hobe seta ekhane thik kora
const STORAGE_KEYS = {
    bookings: "hotelCustomerBookings",
    feedback: "hotelCustomerFeedback",
    complaints: "hotelCustomerComplaints",
    lostFound: "hotelCustomerLostFound",
    payments: "hotelCustomerPayments"
};

// Ei object ta amader "memory database". Page reload hole eta khali hoye jay.
const memoryStore = {};

// Shuru te dekhano default booking gulo
const defaultBookings = [
    {
        id: "B001",
        roomCategory: "Deluxe Room",
        checkIn: "2026-12-10",
        checkOut: "2026-12-12",
        guests: 2,
        status: "Confirmed"
    },
    {
        id: "B002",
        roomCategory: "Single Room",
        checkIn: "2026-12-20",
        checkOut: "2026-12-22",
        guests: 1,
        status: "Pending"
    },
    {
        id: "B003",
        roomCategory: "Suite Room",
        checkIn: "2026-12-20",
        checkOut: "2026-12-30",
        guests: 2,
        status: "Confirmed"
    }
];

// Shuru te dekhano default payment history
const defaultPayments = [
    { id: "P101", bookingId: "B001", amount: 200, method: "Mobile Banking", status: "Paid" },
    { id: "P102", bookingId: "B002", amount: 80, method: "Credit Card", status: "Pending" },
    { id: "P103", bookingId: "B003", amount: 120, method: "Cash on Arrival", status: "Paid" }
];

// Shuru te dekhano default lost and found report
const defaultLostFound = [
    { id: "LF-001", itemName: "Mobile Phone", location: "Room", date: "02 Nov 2026", status: "Pending" },
    { id: "LF-002", itemName: "Wallet", location: "Restaurant", date: "28 Oct 2026", status: "Found" },
    { id: "LF-003", itemName: "Watch", location: "Lobby", date: "20 Oct 2026", status: "Not Found" }
];

// Memory theke data nao. Jodi ager data na thake tahole default data memory te boshiye dao.
function getData(key, defaultValue) {

    if (!(key in memoryStore)) {

        // JSON diye copy kora hoy jate default array ta kokhono change na hoy
        memoryStore[key] = JSON.parse(JSON.stringify(defaultValue));

    }

    return memoryStore[key];
}

// Memory te data save koro (reload dile ei data haray jabe)
function saveData(key, data) {

    memoryStore[key] = data;

    return true;
}

// ---------- Booking ----------
function getBookings() {
    return getData(STORAGE_KEYS.bookings, defaultBookings);
}

function saveBookings(bookings) {
    return saveData(STORAGE_KEYS.bookings, bookings);
}

// ---------- Feedback ----------
function getFeedback() {
    return getData(STORAGE_KEYS.feedback, []);
}

function saveFeedback(data) {
    return saveData(STORAGE_KEYS.feedback, data);
}

// ---------- Complaint ----------
function getComplaints() {
    return getData(STORAGE_KEYS.complaints, []);
}

function saveComplaints(data) {
    return saveData(STORAGE_KEYS.complaints, data);
}

// ---------- Lost and Found ----------
function getLostFound() {
    return getData(STORAGE_KEYS.lostFound, defaultLostFound);
}

function saveLostFound(data) {
    return saveData(STORAGE_KEYS.lostFound, data);
}

// ---------- Payment ----------
function getPayments() {
    return getData(STORAGE_KEYS.payments, defaultPayments);
}

function savePayments(data) {
    return saveData(STORAGE_KEYS.payments, data);
}

// Ajker date ke YYYY-MM-DD format e dey (jemon 2026-11-24)
function todayDate() {
    const date = new Date();

    return date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");
}

// Notun ID banay. Ager shob ID er moddhe sobcheye boro number khuje tar sathe 1 jog kore.
// Jemon B003 thakle notun ID hobe B004
function generateID(items, prefix) {
    let highest = 0;

    items.forEach(function (item) {

        // ID theke shudhu number ta ber kora (B003 -> 3)
        let number = parseInt(String(item.id).replace(/\D/g, ""));

        if (number > highest) {
            highest = number;
        }
    });

    return prefix + String(highest + 1).padStart(3, "0");
}
