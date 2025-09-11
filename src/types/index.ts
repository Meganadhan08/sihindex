export interface User {
  id: string;
  email: string;
  role: 'farmer' | 'lab' | 'processor' | 'admin';
  name: string;
  organization?: string;
  licenseNumber?: string;
  location?: string;
  createdAt: string;
}

export interface HerbCollection {
  id: string;
  farmerId: string;
  herbName: string;
  scientificName: string;
  collectionDate: string;
  collectionTime: string;
  gpsCoordinates: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  location: {
    village: string;
    district: string;
    state: string;
    country: string;
  };
  soilType: string;
  weatherConditions: {
    temperature: number;
    humidity: number;
    rainfall: string;
  };
  harvestingMethod: string;
  quantityCollected: number;
  unit: string;
  plantAge: string;
  plantPart: string;
  organicCertification: boolean;
  photos: string[];
  blockchainHash: string;
  qrCode: string;
  status: 'collected' | 'in_transit' | 'received' | 'processed';
}

export interface LabTest {
  id: string;
  collectionId: string;
  labId: string;
  testDate: string;
  testType: string;
  parameters: {
    moisture: number;
    ash: number;
    acidInsoluble: number;
    waterSoluble: number;
    alcoholSoluble: number;
    heavyMetals: {
      lead: number;
      mercury: number;
      arsenic: number;
      cadmium: number;
    };
    microbialLoad: {
      totalBacterialCount: number;
      yeastMold: number;
      ecoli: string;
      salmonella: string;
    };
    activeCompounds: {
      [key: string]: number;
    };
    pesticides: string;
    aflatoxins: number;
  };
  ayushCompliance: boolean;
  certificateNumber: string;
  testResult: 'passed' | 'failed' | 'conditional';
  remarks: string;
  blockchainHash: string;
}

export interface ProcessingRecord {
  id: string;
  collectionId: string;
  processorId: string;
  processType: string;
  processDate: string;
  inputQuantity: number;
  outputQuantity: number;
  processingMethod: string;
  temperature: number;
  duration: string;
  equipment: string;
  batchNumber: string;
  expiryDate: string;
  storageConditions: string;
  qualityGrade: string;
  packaging: string;
  blockchainHash: string;
}

export interface TraceabilityRecord {
  collection: HerbCollection;
  labTests: LabTest[];
  processing: ProcessingRecord[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  type: 'collection' | 'transport' | 'testing' | 'processing' | 'packaging' | 'distribution';
  timestamp: string;
  location: string;
  actor: string;
  description: string;
  data: any;
  blockchainHash: string;
}