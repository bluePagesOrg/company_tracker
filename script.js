// Sample data - في الواقع سيتم تحميل البيانات من ملف JSON
const companiesData = {
    "Goo.gl Links": [
        {
            id: 1,
            name_en: "Tech Solutions Inc",
            name_ar: "حلول تقنية",
            email: "info@techsolutions.com",
            phone: "+966501234567",
            website: "https://techsolutions.com",
            location_link: "https://maps.app.goo.gl/XZutgH2i4ciaBZDQ9",
            latitude: "21.510839",
            longitude: "39.1808593",
            subscription_plan_id: 2,
            package_id: 1,
            verified: false
        },
        {
            id: 2,
            name_en: "Digital Marketing Pro",
            name_ar: "التسويق الرقمي المحترف",
            email: "contact@digitalpro.com",
            phone: "+966502345678",
            website: "https://digitalpro.com",
            location_link: "https://maps.app.goo.gl/ABC123DEF456",
            latitude: "24.7136",
            longitude: "46.6753",
            subscription_plan_id: 3,
            package_id: 2,
            verified: true
        }
    ],
    "Google Maps Embed": [
        {
            id: 3,
            name_en: "Restaurant Al-Madinah",
            name_ar: "مطعم المدينة",
            email: "info@almadinah.com",
            phone: "+966503456789",
            website: "https://almadinah.com",
            location_link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.123456789!2d39.1808593!3d21.510839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21a1234567890%3A0x1234567890abcdef!2sAl-Madinah%20Restaurant!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa",
            latitude: "21.510839",
            longitude: "39.1808593",
            subscription_plan_id: 2,
            package_id: 1,
            verified: false
        }
    ],
    "Google Maps Other": [
        {
            id: 4,
            name_en: "Construction Company",
            name_ar: "شركة البناء",
            email: "info@construction.com",
            phone: "+966504567890",
            website: "https://construction.com",
            location_link: "https://www.google.com/maps/place/Construction+Company/@21.510839,39.1808593,15z/data=!4m5!3m4!1s0x15c21a1234567890:0x1234567890abcdef!8m2!3d21.510839!4d39.1808593",
            latitude: "21.510839",
            longitude: "39.1808593",
            subscription_plan_id: 4,
            package_id: 3,
            verified: true
        }
    ],
    "Other Maps": [
        {
            id: 5,
            name_en: "Fashion Store",
            name_ar: "متجر الأزياء",
            email: "info@fashionstore.com",
            phone: "+966505678901",
            website: "https://fashionstore.com",
            location_link: "https://www.openstreetmap.org/?mlat=21.510839&mlon=39.1808593#map=15/21.510839/39.1808593",
            latitude: "21.510839",
            longitude: "39.1808593",
            subscription_plan_id: 2,
            package_id: 1,
            verified: false
        }
    ],
    "No Links": [
        {
            id: 6,
            name_en: "Consulting Services",
            name_ar: "خدمات استشارية",
            email: "info@consulting.com",
            phone: "+966506789012",
            website: "https://consulting.com",
            location_link: "",
            latitude: "",
            longitude: "",
            subscription_plan_id: 3,
            package_id: 2,
            verified: true
        }
    ]
};

let currentCategory = null;
let filteredCompanies = [];
let convertedCompanies = new Set();

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    loadConvertedCompanies();
    loadCategories();
    updateStats();
    setupSearch();
});

// Load converted companies from localStorage
function loadConvertedCompanies() {
    const saved = localStorage.getItem('convertedCompanies');
    if (saved) {
        const convertedArray = JSON.parse(saved);
        convertedCompanies = new Set(convertedArray);
    }
}

// Save converted companies to localStorage
function saveConvertedCompanies() {
    const convertedArray = Array.from(convertedCompanies);
    localStorage.setItem('convertedCompanies', JSON.stringify(convertedArray));
}

// Mark company as converted
function markCompanyAsConverted(companyId) {
    convertedCompanies.add(companyId);
    saveConvertedCompanies();
    updateStats();
}

// Check if company is converted
function isCompanyConverted(companyId) {
    return convertedCompanies.has(companyId);
}

// Load categories from data
function loadCategories() {
    const categoriesList = document.getElementById('categoriesList');
    categoriesList.innerHTML = '';

    // Add converted companies category first
    const convertedCount = convertedCompanies.size;
    if (convertedCount > 0) {
        const convertedItem = document.createElement('div');
        convertedItem.className = 'category-item converted-category';
        convertedItem.innerHTML = `
            <div class="category-name">✅ الشركات المحولة</div>
            <div class="category-count">${convertedCount} شركة</div>
        `;

        convertedItem.addEventListener('click', () => {
            selectConvertedCompanies();
        });

        categoriesList.appendChild(convertedItem);
    }

    Object.keys(companiesData).forEach(categoryName => {
        const companies = companiesData[categoryName];
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <div class="category-name">${categoryName}</div>
            <div class="category-count">${companies.length} شركة</div>
        `;

        categoryItem.addEventListener('click', () => {
            selectCategory(categoryName);
        });

        categoriesList.appendChild(categoryItem);
    });
}

// Select converted companies
function selectConvertedCompanies() {
    // Remove active class from all categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to selected category
    event.target.closest('.category-item').classList.add('active');

    currentCategory = 'converted';

    // Get all converted companies from all categories
    filteredCompanies = [];
    Object.values(companiesData).forEach(companies => {
        companies.forEach(company => {
            if (convertedCompanies.has(company.id)) {
                filteredCompanies.push(company);
            }
        });
    });

    updateCompaniesDisplay();
    updateSelectedCategoryTitle();
}

// Select a category
function selectCategory(categoryName) {
    // Remove active class from all categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to selected category
    event.target.closest('.category-item').classList.add('active');

    currentCategory = categoryName;
    filteredCompanies = companiesData[categoryName];

    updateCompaniesDisplay();
    updateSelectedCategoryTitle();
}

// Update companies display
function updateCompaniesDisplay() {
    const companiesGrid = document.getElementById('companiesGrid');

    if (!currentCategory || filteredCompanies.length === 0) {
        companiesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>لا توجد شركات في هذا التصنيف</p>
            </div>
        `;
        return;
    }

    companiesGrid.innerHTML = '';

    filteredCompanies.forEach(company => {
        const companyCard = createCompanyCard(company);
        companiesGrid.appendChild(companyCard);
    });
}

// Create company card
function createCompanyCard(company) {
    const card = document.createElement('div');
    card.className = 'company-card';

    const dashboardUrl = `https://bluepages-dashboard.vercel.app/companies/${company.id}/edit-info?referrer=/companies-admins`;
    const companyUrl = `https://bluepages.com.sa/companies/${company.id}`;
    const isConverted = isCompanyConverted(company.id);

    if (isConverted) {
        card.classList.add('converted');
    }

    card.innerHTML = `
        <div class="company-header">
            <div>
                <div class="company-name">${company.name_en}</div>
                <div class="company-name-ar">${company.name_ar}</div>
                ${isConverted ? '<div class="converted-badge"><i class="fas fa-check-circle"></i> تم تحويل الرابط</div>' : ''}
            </div>
            <div class="action-buttons">
                <a href="${companyUrl}" target="_blank" class="company-btn">
                    <i class="fas fa-eye"></i>
                    عرض الشركة
                </a>
                <a href="${dashboardUrl}" target="_blank" class="dashboard-btn">
                    <i class="fas fa-cog"></i>
                    لوحة التحكم
                </a>
                ${!isConverted ? `
                    <button onclick="markAsConverted(${company.id})" class="convert-btn">
                        <i class="fas fa-check"></i>
                        تم
                    </button>
                ` : `
                    <button onclick="unmarkAsConverted(${company.id})" class="unconvert-btn">
                        <i class="fas fa-undo"></i>
                        إلغاء
                    </button>
                `}
            </div>
        </div>
        
        <div class="company-details">
            <div class="detail-item">
                <i class="fas fa-envelope"></i>
                <span>${company.email || 'غير محدد'}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-phone"></i>
                <span>${company.phone || 'غير محدد'}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-globe"></i>
                <span>${company.website || 'غير محدد'}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-id-card"></i>
                <span>خطة الاشتراك: ${company.subscription_plan_id}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-check-circle"></i>
                <span>موثق: ${company.verified ? 'نعم' : 'لا'}</span>
            </div>
        </div>
        
        ${company.location_link ? `
            <div class="location-link">
                <strong>رابط الموقع:</strong><br>
                <a href="${company.location_link}" target="_blank" style="color: #3498db; text-decoration: none;">
                    ${company.location_link}
                </a>
            </div>
        ` : ''}
    `;

    return card;
}

// Update selected category title
function updateSelectedCategoryTitle() {
    const titleElement = document.getElementById('selectedCategory');
    if (currentCategory) {
        if (currentCategory === 'converted') {
            titleElement.textContent = `✅ الشركات المحولة (${filteredCompanies.length} شركة)`;
        } else {
            titleElement.textContent = `${currentCategory} (${filteredCompanies.length} شركة)`;
        }
    } else {
        titleElement.textContent = 'اختر تصنيف لعرض الشركات';
    }
}

// Update statistics
function updateStats() {
    const totalCompanies = Object.values(companiesData).reduce((sum, companies) => sum + companies.length, 0);
    const companiesWithLinks = Object.values(companiesData).reduce((sum, companies) => {
        return sum + companies.filter(company => company.location_link).length;
    }, 0);
    const convertedCount = convertedCompanies.size;

    document.getElementById('totalCompanies').textContent = totalCompanies;
    document.getElementById('companiesWithLinks').textContent = companiesWithLinks;

    // Update converted companies stat if element exists
    const convertedElement = document.getElementById('convertedCompanies');
    if (convertedElement) {
        convertedElement.textContent = convertedCount;
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        if (!currentCategory) {
            return;
        }

        if (searchTerm === '') {
            filteredCompanies = companiesData[currentCategory];
        } else {
            filteredCompanies = companiesData[currentCategory].filter(company => {
                return (
                    company.name_en.toLowerCase().includes(searchTerm) ||
                    company.name_ar.includes(searchTerm) ||
                    company.email.toLowerCase().includes(searchTerm) ||
                    (company.phone && company.phone.includes(searchTerm))
                );
            });
        }

        updateCompaniesDisplay();
        updateSelectedCategoryTitle();
    });
}

// Function to load data from JSON file (for real implementation)
async function loadDataFromFile() {
    try {
        const response = await fetch('companies-data.json');
        const data = await response.json();

        // Update companiesData with real data
        Object.assign(companiesData, data);

        // Reload categories and update stats
        loadCategories();
        updateStats();

    } catch (error) {
        console.error('Error loading data:', error);
        // Keep using sample data if file loading fails
    }
}

// Mark company as converted
function markAsConverted(companyId) {
    markCompanyAsConverted(companyId);
    loadCategories(); // Reload categories to update converted count
    updateCompaniesDisplay();
}

// Unmark company as converted
function unmarkAsConverted(companyId) {
    convertedCompanies.delete(companyId);
    saveConvertedCompanies();
    updateStats();
    loadCategories(); // Reload categories to update converted count
    updateCompaniesDisplay();
}

// Load real data if available
loadDataFromFile();
