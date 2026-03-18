// ── Staff Data ──
export const staffMembers = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    regNo: "STF2020001",
    department: "Computer Science & Engineering",
    designation: "Professor & HOD",
    phone: "+91 94567 12301",
    email: "ramesh.k@college.edu",
    dob: "1978-05-12",
    gender: "Male",
    joiningDate: "2010-06-15",
    qualification: "Ph.D. Computer Science",
    experience: "16 years",
    subjects: ["Artificial Intelligence", "Machine Learning"],
    status: "active",
    salary: {
      basic: 85000,
      hra: 25500,
      da: 17000,
      medical: 5000,
      pfDeduction: 10200,
      taxDeduction: 8500,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 113800,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-001",
      },
      {
        month: "January 2026",
        amount: 113800,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-001",
      },
      {
        month: "December 2025",
        amount: 113800,
        date: "2025-12-31",
        status: "paid",
        txnId: "SAL-2025-12-001",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 2,
    name: "Prof. Shalini Devi",
    regNo: "STF2019002",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    phone: "+91 94567 12302",
    email: "shalini.d@college.edu",
    dob: "1982-09-20",
    gender: "Female",
    joiningDate: "2012-07-01",
    qualification: "M.Tech Computer Science",
    experience: "14 years",
    subjects: ["Database Management", "Web Technologies"],
    status: "active",
    salary: {
      basic: 72000,
      hra: 21600,
      da: 14400,
      medical: 5000,
      pfDeduction: 8640,
      taxDeduction: 6200,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 98160,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-002",
      },
      {
        month: "January 2026",
        amount: 98160,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-002",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "A" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "L" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 3,
    name: "Dr. Vijay Anand",
    regNo: "STF2018003",
    department: "Electronics & Communication",
    designation: "Professor & HOD",
    phone: "+91 94567 12303",
    email: "vijay.a@college.edu",
    dob: "1976-03-15",
    gender: "Male",
    joiningDate: "2008-08-10",
    qualification: "Ph.D. Electronics",
    experience: "18 years",
    subjects: ["Digital Signal Processing", "VLSI Design"],
    status: "active",
    salary: {
      basic: 90000,
      hra: 27000,
      da: 18000,
      medical: 5000,
      pfDeduction: 10800,
      taxDeduction: 9500,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 119700,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-003",
      },
      {
        month: "January 2026",
        amount: 119700,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-003",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "L" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 4,
    name: "Prof. Meenakshi R",
    regNo: "STF2021004",
    department: "Electronics & Communication",
    designation: "Assistant Professor",
    phone: "+91 94567 12304",
    email: "meenakshi.r@college.edu",
    dob: "1988-12-05",
    gender: "Female",
    joiningDate: "2015-06-20",
    qualification: "M.Tech Communication Systems",
    experience: "11 years",
    subjects: ["Communication Systems", "Microprocessors"],
    status: "active",
    salary: {
      basic: 60000,
      hra: 18000,
      da: 12000,
      medical: 5000,
      pfDeduction: 7200,
      taxDeduction: 4800,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 83000,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-004",
      },
      {
        month: "January 2026",
        amount: 83000,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-004",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "A" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 5,
    name: "Dr. Senthil Kumar",
    regNo: "STF2017005",
    department: "Mechanical Engineering",
    designation: "Professor & HOD",
    phone: "+91 94567 12305",
    email: "senthil.k@college.edu",
    dob: "1975-07-22",
    gender: "Male",
    joiningDate: "2007-01-10",
    qualification: "Ph.D. Mechanical Engineering",
    experience: "19 years",
    subjects: ["Thermodynamics", "Fluid Mechanics"],
    status: "active",
    salary: {
      basic: 92000,
      hra: 27600,
      da: 18400,
      medical: 5000,
      pfDeduction: 11040,
      taxDeduction: 10000,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 121960,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-005",
      },
      {
        month: "January 2026",
        amount: 121960,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-005",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "A" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 6,
    name: "Prof. Kavitha Priya",
    regNo: "STF2022006",
    department: "Mechanical Engineering",
    designation: "Assistant Professor",
    phone: "+91 94567 12306",
    email: "kavitha.p@college.edu",
    dob: "1990-04-18",
    gender: "Female",
    joiningDate: "2018-07-01",
    qualification: "M.E. Manufacturing Engineering",
    experience: "8 years",
    subjects: ["Manufacturing Technology", "Engineering Drawing"],
    status: "active",
    salary: {
      basic: 55000,
      hra: 16500,
      da: 11000,
      medical: 5000,
      pfDeduction: 6600,
      taxDeduction: 3800,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 77100,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-006",
      },
      {
        month: "January 2026",
        amount: 77100,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-006",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "L" },
    ],
  },
  {
    id: 7,
    name: "Dr. Balaji Narayanan",
    regNo: "STF2016007",
    department: "Civil Engineering",
    designation: "Professor & HOD",
    phone: "+91 94567 12307",
    email: "balaji.n@college.edu",
    dob: "1974-11-30",
    gender: "Male",
    joiningDate: "2006-03-15",
    qualification: "Ph.D. Structural Engineering",
    experience: "20 years",
    subjects: ["Structural Analysis", "Concrete Technology"],
    status: "active",
    salary: {
      basic: 95000,
      hra: 28500,
      da: 19000,
      medical: 5000,
      pfDeduction: 11400,
      taxDeduction: 10500,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 125600,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-007",
      },
      {
        month: "January 2026",
        amount: 125600,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-007",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "P" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "P" },
    ],
  },
  {
    id: 8,
    name: "Prof. Anitha Kumari",
    regNo: "STF2023008",
    department: "Civil Engineering",
    designation: "Assistant Professor",
    phone: "+91 94567 12308",
    email: "anitha.k@college.edu",
    dob: "1992-08-25",
    gender: "Female",
    joiningDate: "2020-01-10",
    qualification: "M.E. Environmental Engineering",
    experience: "6 years",
    subjects: ["Environmental Engineering", "Surveying"],
    status: "active",
    salary: {
      basic: 50000,
      hra: 15000,
      da: 10000,
      medical: 5000,
      pfDeduction: 6000,
      taxDeduction: 3200,
      get gross() {
        return this.basic + this.hra + this.da + this.medical;
      },
      get totalDeductions() {
        return this.pfDeduction + this.taxDeduction;
      },
      get netPay() {
        return this.gross - this.totalDeductions;
      },
    },
    paymentHistory: [
      {
        month: "February 2026",
        amount: 70800,
        date: "2026-02-28",
        status: "paid",
        txnId: "SAL-2026-02-008",
      },
      {
        month: "January 2026",
        amount: 70800,
        date: "2026-01-31",
        status: "paid",
        txnId: "SAL-2026-01-008",
      },
    ],
    attendanceHistory: [
      { date: "2026-02-24", status: "A" },
      { date: "2026-02-25", status: "P" },
      { date: "2026-02-26", status: "P" },
      { date: "2026-02-27", status: "P" },
      { date: "2026-02-28", status: "P" },
      { date: "2026-03-01", status: "P" },
    ],
  },
];

// Staff salary data for the logged-in staff member (used in staff dashboard)
export const currentStaffSalary = {
  basic: 85000,
  hra: 25500,
  da: 17000,
  medical: 5000,
  pfDeduction: 10200,
  taxDeduction: 8500,
  get gross() {
    return this.basic + this.hra + this.da + this.medical;
  },
  get totalDeductions() {
    return this.pfDeduction + this.taxDeduction;
  },
  get netPay() {
    return this.gross - this.totalDeductions;
  },
  paymentHistory: [
    {
      month: "February 2026",
      amount: 113800,
      date: "2026-02-28",
      status: "paid",
      txnId: "SAL-2026-02-001",
    },
    {
      month: "January 2026",
      amount: 113800,
      date: "2026-01-31",
      status: "paid",
      txnId: "SAL-2026-01-001",
    },
    {
      month: "December 2025",
      amount: 113800,
      date: "2025-12-31",
      status: "paid",
      txnId: "SAL-2025-12-001",
    },
    {
      month: "November 2025",
      amount: 113800,
      date: "2025-11-30",
      status: "paid",
      txnId: "SAL-2025-11-001",
    },
    {
      month: "October 2025",
      amount: 113800,
      date: "2025-10-31",
      status: "paid",
      txnId: "SAL-2025-10-001",
    },
  ],
};

// Staff attendance data for the logged-in staff member
export const currentStaffAttendance = {
  overall: 94,
  monthly: [
    { month: "Aug 2025", present: 22, total: 23, percentage: 96 },
    { month: "Sep 2025", present: 20, total: 22, percentage: 91 },
    { month: "Oct 2025", present: 22, total: 23, percentage: 96 },
    { month: "Nov 2025", present: 19, total: 21, percentage: 90 },
    { month: "Dec 2025", present: 20, total: 21, percentage: 95 },
    { month: "Jan 2026", present: 21, total: 22, percentage: 95 },
    { month: "Feb 2026", present: 19, total: 20, percentage: 95 },
  ],
  days: [
    { date: "2026-02-01", day: "Saturday", status: "H" },
    { date: "2026-02-02", day: "Sunday", status: "H" },
    { date: "2026-02-03", day: "Monday", status: "P" },
    { date: "2026-02-04", day: "Tuesday", status: "P" },
    { date: "2026-02-05", day: "Wednesday", status: "P" },
    { date: "2026-02-06", day: "Thursday", status: "P" },
    { date: "2026-02-07", day: "Friday", status: "P" },
    { date: "2026-02-08", day: "Saturday", status: "H" },
    { date: "2026-02-09", day: "Sunday", status: "H" },
    { date: "2026-02-10", day: "Monday", status: "P" },
    { date: "2026-02-11", day: "Tuesday", status: "P" },
    { date: "2026-02-12", day: "Wednesday", status: "A" },
    { date: "2026-02-13", day: "Thursday", status: "P" },
    { date: "2026-02-14", day: "Friday", status: "P" },
    { date: "2026-02-15", day: "Saturday", status: "H" },
    { date: "2026-02-16", day: "Sunday", status: "H" },
    { date: "2026-02-17", day: "Monday", status: "P" },
    { date: "2026-02-18", day: "Tuesday", status: "P" },
    { date: "2026-02-19", day: "Wednesday", status: "P" },
    { date: "2026-02-20", day: "Thursday", status: "L" },
    { date: "2026-02-21", day: "Friday", status: "P" },
    { date: "2026-02-22", day: "Saturday", status: "H" },
    { date: "2026-02-23", day: "Sunday", status: "H" },
    { date: "2026-02-24", day: "Monday", status: "P" },
    { date: "2026-02-25", day: "Tuesday", status: "P" },
    { date: "2026-02-26", day: "Wednesday", status: "P" },
    { date: "2026-02-27", day: "Thursday", status: "P" },
    { date: "2026-02-28", day: "Friday", status: "P" },
  ],
};
