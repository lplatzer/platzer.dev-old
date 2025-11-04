const targetConcentrate= {
    volume: 500,
    dose: 4
}


const thirdWaveClassic = {
    epsomSalt: 1.1,
    MgCl2: 0,
    CaCl2: 0,
    CaCitr: 0.3,
    NaCl: 0.1,
    NaHCO3: 0,
    KHCO3: 0,
    vol: 1, //in ml
    weight: 0.26 //in ml
}

const molecularData = {
    epsomSalt: {
        name: 'Epsom Salt',
        molar_weight: 246.47,
        chemical_formula: 'MgSO4•7H2O',
        charge: 0,
    },
    sulfates: {
        name: 'Sulfates',
        molar_weight: 96.06,
        chemical_formula: 'SO4',
        charge: -1,
    },
    magnesium: {
        name: 'Magnesium',
        molar_weight: 24.305,
        chemical_formula: 'Mg',
        charge: 2,
    },
    water: {
        name: 'Water',
        molar_weight: 18.01528,
        chemical_formula: 'H2O',
        charge: 0,
    },
    hydrousCaCl2: {
        name: 'Hydrous CaCl2',
        molar_weight: 147.008,
        chemical_formula: 'CaCl2•2H2O',
        charge: 0,
    },
    calcium: {
        name: 'Calcium',
        molar_weight: 40.078,
        chemical_formula: 'Ca',
        charge: 2,
    },
    chloride: {
        name: 'Chloride',
        molar_weight: 35.453,
        chemical_formula: 'Cl',
        charge: 1,
    },
    salt: {
        name: 'Salt',
        molar_weight: 58.44,
        chemical_formula: 'NaCl',
        charge: 0,
    },
    sodium: {
        name: 'Sodium',
        molar_weight: 22.989769,
        chemical_formula: 'Na',
        charge: 1,
    },
    hydrousMgCl2: {
        name: 'Hydrous MgCl2',
        molar_weight: 203.295,
        chemical_formula: 'MgCl2•6H2O',
        charge: 0,
    },
    potassiumBicarbonate: {
        name: 'Potassium Bicarbonate',
        molar_weight: 100.115,
        chemical_formula: 'KHCO3',
        charge: 0,
    },
    potassium: {
        name: 'Potassium',
        molar_weight: 39.098,
        chemical_formula: 'K',
        charge: 1,
    },
    bicarbonate: {
        name: 'Bicarbonate',
        molar_weight: 61.0168,
        chemical_formula: 'HCO3',
        charge: -1,
    },
    bakingSoda: {
        name: 'Baking Soda',
        molar_weight: 84.007,
        chemical_formula: 'NaHCO3',
        charge: 0,
    },
    calciumCitrate: {
        name: 'Calcium citrate',
        molar_weight: 498.46,
        chemical_formula: 'Ca3(C6H5O7)2',
        charge: 0,
    },
    citrate: {
        name: 'Citrate',
        molar_weight: 189.099,
        chemical_formula: 'C6H5O7',
        charge: -3,
    },
    calciumCarbonate: {
        name: 'Calcium carbonate',
        molar_weight: 100.0869,
        chemical_formula: 'CaCO3',
        charge: 0,
    },
    calciumChloride: {
        name: 'Calcium chloride',
        molar_weight: 110.98,
        chemical_formula: 'CaCl2',
        charge: 0,
    },
    magnesiumChloride: {
        name: 'Magnesium chloride',
        molar_weight: 95.211,
        chemical_formula: 'MgCl2',
        charge: 0,
    },
    magnesiumSulfite: {
        name: 'Magnesium sulfite',
        molar_weight: 120.366,
        chemical_formula: 'MgSO4',
        charge: 0,
    },
}

const iV_VC_VB: intermediateVariableType = {
    name: 'VC_VB',
    value: targetConcentrate.dose/1000,
    unit: '',
}
const iV_VT_VC: intermediateVariableType = {
    name: 'VT_VC',
    value: 1/iV_VC_VB.value-1,
    unit: ''
}
