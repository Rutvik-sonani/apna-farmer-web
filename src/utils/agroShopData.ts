export interface Subcategory {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    _id?: string;
    name: string;
    subcategories: Subcategory[];
}

export const AgroshopCategory: Category[] = [
    {
        id: '1',
        _id: '1',
        name: '🌾 Crop Inputs',
        subcategories: [
            { id: '1-1', name: '🌱 Seeds' },
            { id: '1-2', name: '🧪 Fertilizers' },
            { id: '1-3', name: '🧫 Water Soluble Fertilizer (WSF)' },
            { id: '1-4', name: '🐛 Pesticides' },
            { id: '1-5', name: '🌱 Bio-Pesticides' },
            { id: '1-6', name: '🍀 Herbicides' },
            { id: '1-7', name: '🦠 Fungicides' },
            { id: '1-8', name: '💧 Plant Growth Regulators (PGR)' },
            { id: '1-9', name: '🌿 Bio-Fertilizers' },
            { id: '1-10', name: '🧂 Soil Amendments' },
            { id: '1-11', name: '🧴 Micro Nutrients' },
            { id: '1-12', name: '🪴 Plant Tonic' },
            { id: '1-13', name: '🌱 Organic Products' },
            { id: '1-14', name: '📦 Others' },
        ],
    },
    {
        id: '2',
        _id: '2',
        name: '🚜 Tractors & Farm Vehicles',
        subcategories: [
            { id: '2-1', name: '🚜 Tractors (Small / Large HP)' },
            { id: '2-2', name: '🔋🚜 EV Tractors' },
            { id: '2-3', name: '🔥🚜 Power Tiller' },
            { id: '2-4', name: '🚚 Farm Utility Vehicle' },
            { id: '2-5', name: '🔗⚙ Attachments' },
        ],
    },
    {
        id: '3',
        _id: '3',
        name: '⚙ Implements, Tools & Machinery',
        subcategories: [
            { id: '3-1', name: '⚙🌱 Plough / Cultivator' },
            { id: '3-2', name: '🔄🛠 Rotavator' },
            { id: '3-3', name: '🌾📤 Seeder / Planter' },
            { id: '3-4', name: '🌾📡 Spreader' },
            { id: '3-5', name: '🌾✂ Reaper / Baler' },
            { id: '3-6', name: '🚜🟡 Combine Harvester' },
            { id: '3-7', name: '⚙🌾 Thresher' },
            { id: '3-8', name: '✂🌽 Crop Cutter' },
            { id: '3-9', name: '🔧🚜 Mini Tractor Tools' },
            { id: '3-10', name: '🌬🌾 Grain Dryer' },
            { id: '3-11', name: '🏭🌾 Rice / Flour Mill' },
            { id: '3-12', name: '📦🏗 Post Harvest Machines' },
            { id: '3-13', name: '🪓🔧 Hand Tools' },
            { id: '3-14', name: '🕸🌿 Crop Protection Nets' },
        ],
    },
    {
        id: '4',
        _id: '5',
        name: '💧 Irrigation Systems',
        subcategories: [
            { id: '4-1', name: '💧🌱 Drip Irrigation' },
            { id: '4-2', name: '💦🔄 Sprinkler System' },
            { id: '4-3', name: '💦⚪ Micro Sprinkler' },
            { id: '4-4', name: '🔗🟦 Pipes & Fittings' },
            { id: '4-5', name: '🔌💧 Water Pump (Solar / Diesel)' },
            { id: '4-6', name: '🕳⚙ Borewell Equipment' },
            { id: '4-7', name: '🔍⚡ Filters & Gauges' },
        ],
    },
    {
        id: '5',
        _id: '6',
        name: '🌿 Organic & Bio Products',
        subcategories: [
            { id: '5-1', name: '♻🌿 Organic Fertilizer' },
            { id: '5-2', name: '🪱🟢 Vermicompost' },
            { id: '5-3', name: '🐄🌼 Panchagavya' },
            { id: '5-4', name: '🌳🧪 Neem Based Products' },
            { id: '5-5', name: '🌿💚 Organic Growth Promoter' },
        ],
    },
    {
        id: '6',
        _id: '7',
        name: '🌱 Nursery & Gardening',
        subcategories: [
            { id: '6-1', name: '🌱🪴 Seeds & Saplings' },
            { id: '6-2', name: '🍋🌳 Fruit Plants' },
            { id: '6-3', name: '🪣🪴 Pots / Grow Bags' },
            { id: '6-4', name: '🏺🟤 Soil Mix' },
            { id: '6-5', name: '☘🌼 Plant Packs' },
            { id: '6-6', name: '🧤🪛 Garden Tools' },
            { id: '6-7', name: '💧🧬 Hydroponic Kits' },
        ],
    },
    {
        id: '7',
        _id: '65e484ce33f8ea7e230d4d22',
        name: '🐄 Animal Feed & Veterinary',
        subcategories: [
            { id: '7-1', name: '🐄🥣 Cattle Feed' },
            { id: '7-2', name: '🐓🍽 Poultry Feed' },
            { id: '7-3', name: '🐐🐟 Goat / Fish Feed' },
            { id: '7-4', name: '⚗🟡 Mineral Mixture' },
            { id: '7-5', name: '💊🐄 Veterinary Medicines' },
            { id: '7-6', name: '💉🐃 Vaccination' },
            { id: '7-7', name: '🥛⚙ Milking Machine' },
        ],
    },
    {
        id: '8',
        _id: '9',
        name: '🔧 Spare Parts, Repair & Lubricants',
        subcategories: [
            { id: '8-1', name: '⚙🚜 Tractor Parts' },
            { id: '8-2', name: '🛠🌾 Harvester Parts' },
            { id: '8-3', name: '🔩💧 Pump Parts' },
            { id: '8-4', name: '⛓⚙ Belt / Bearing / Filter' },
            { id: '8-5', name: '🛢🧴 Oil & Lubricants' },
            { id: '8-6', name: '🔧🔨 Workshop Tools' },
        ],
    },
    {
        id: '9',
        _id: '10',
        name: '🧑‍🌾 Agri Services & Advisory',
        subcategories: [
            { id: '9-1', name: '🧪🟫 Soil Testing' },
            { id: '9-2', name: '📘🌾 Crop Advisory' },
            { id: '9-3', name: '👨‍🌾🗂 Consultancy' },
            { id: '9-4', name: '🌦📡 Weather Report' },
            { id: '9-5', name: '🗺✍ Farm Mapping' },
            { id: '9-6', name: '🛡📄 Insurance Support' },
        ],
    },
    {
        id: '10',
        _id: '11',
        name: '♻ Used Tractors & Machinery',
        subcategories: [
            { id: '10-1', name: '🚜 Used Tractors' },
            { id: '10-2', name: '⚙ Used Implements & Tools' },
            { id: '10-3', name: '🏗 Used Machines' },
            { id: '10-4', name: '📋💬 Listing Feature' },
            { id: '10-5', name: '💬⚖ Bargain / Chat' },
            { id: '10-6', name: '🔍✔ Inspection Verify' },
            { id: '10-7', name: 'Other' },
        ],
    },
    {
        id: '11',
        _id: '65e484ce33f8ea7e230d4d25',
        name: '🛠 General & Utility Items',
        subcategories: [
            { id: '11-1', name: '🟦🪢 Tarpaulin' },
            { id: '11-2', name: '🧵🟩 Plastic Ropes' },
            { id: '11-3', name: '🧤😷 Safety Kit' },
            { id: '11-4', name: '🏷💰 Offers / General Items' },
        ],
    },
    {
        id: '12',
        _id: '65e484ce33f8ea7e230d4d25',
        name: 'Others',
        subcategories: [
            { id: '12-1', name: 'Offers/General Items' },
            { id: '12-2', name: 'Plastic Ropes' },
            { id: '12-3', name: 'Safety Kit' },
            { id: '12-4', name: 'Tarpaulin' },
        ],
    },
];

export const getSubcategoriesById = (categoryId: string): Subcategory[] => {
    const category = AgroshopCategory.find((item) => item.id === categoryId);
    return category ? category.subcategories : [];
};

