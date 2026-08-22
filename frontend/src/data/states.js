export const states = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "delhi", label: "Delhi" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" }
];

const simpleDistricts = {
  "jharkhand": [
    "Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum",
    "Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara",
    "Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu",
    "Ramgarh","Ranchi","Sahibganj","Seraikela-Kharsawan","Simdega",
    "West Singhbhum"
  ],
  "bihar": [
    "Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur",
    "Bhojpur","Buxar","Darbhanga","Gaya","Gopalganj","Jamui",
    "Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj",
    "Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur",
    "Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa",
    "Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan",
    "Supaul","Vaishali"
  ],
  "uttar-pradesh": ["Agra","Aligarh","Ayodhya","Azamgarh","Bareilly","Ghaziabad","Gorakhpur","Jhansi","Kanpur Nagar","Lucknow","Mathura","Meerut","Prayagraj","Varanasi"],
  "west-bengal": ["Bankura","Birbhum","Cooch Behar","Darjeeling","Hooghly","Howrah","Jalpaiguri","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Purba Bardhaman","South 24 Parganas"],
  "odisha": ["Angul","Balangir","Balasore","Bargarh","Cuttack","Dhenkanal","Ganjam","Jagatsinghpur","Kalahandi","Khordha","Koraput","Mayurbhanj","Puri","Sambalpur"],
  "maharashtra": ["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Chandrapur","Dhule","Jalgaon","Kolhapur","Latur","Mumbai City","Nagpur","Nashik","Pune","Satara","Solapur","Thane"],
  "madhya-pradesh": ["Bhopal","Chhindwara","Dewas","Gwalior","Indore","Jabalpur","Mandsaur","Rewa","Sagar","Satna","Ujjain","Vidisha"],
  "rajasthan": ["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Chittorgarh","Jaipur","Jaisalmer","Jodhpur","Kota","Udaipur"],
  "punjab": ["Amritsar","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Firozpur","Gurdaspur","Hoshiarpur","Jalandhar","Ludhiana","Mansa","Moga","Patiala","Sangrur"],
  "haryana": ["Ambala","Bhiwani","Faridabad","Fatehabad","Gurugram","Hisar","Jind","Karnal","Kurukshetra","Panipat","Rewari","Rohtak","Sirsa","Sonipat"],
  "gujarat": ["Ahmedabad","Amreli","Anand","Bharuch","Bhavnagar","Gandhinagar","Jamnagar","Junagadh","Kutch","Mehsana","Rajkot","Surat","Vadodara","Valsad"],
  "karnataka": ["Bagalkot","Belagavi","Bengaluru Rural","Dharwad","Hassan","Haveri","Kalaburagi","Kodagu","Mandya","Mysuru","Raichur","Shivamogga","Tumakuru","Udupi"],
  "tamil-nadu": ["Chennai","Coimbatore","Cuddalore","Dindigul","Erode","Madurai","Namakkal","Salem","Thanjavur","Tiruchirappalli","Tirunelveli","Vellore"],
  "andhra-pradesh": ["Anantapur","Chittoor","East Godavari","Guntur","Krishna","Kurnool","Nellore","Prakasam","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"],
  "telangana": ["Adilabad","Hyderabad","Karimnagar","Khammam","Mahbubnagar","Medak","Nalgonda","Nizamabad","Rangareddy","Sangareddy","Warangal"],
  "chhattisgarh": ["Balod","Baloda Bazar","Bastar","Bilaspur","Durg","Janjgir-Champa","Jashpur","Korba","Mahasamund","Raigarh","Raipur","Rajnandgaon","Surguja"],
  "assam": ["Baksa","Barpeta","Cachar","Darrang","Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Jorhat","Kamrup","Lakhimpur","Nagaon","Sivasagar","Sonitpur"],
  "kerala": ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"],
  "delhi": ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"]
};

export function getDistricts(state) {
  return (simpleDistricts[state] || []).map((name) => ({
    value: name.toLowerCase().replaceAll(" ", "-"),
    label: name
  }));
}
