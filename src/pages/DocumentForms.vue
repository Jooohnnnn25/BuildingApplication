<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center justify-center stepper-container">
          <div class="stepper-item">
            <v-icon class="stepper-icon">mdi-numeric-1-circle</v-icon>
            <span class="stepper-text">Unified Application Form</span>
          </div>
          <div class="stepper-line"></div>
          <div class="stepper-item active">
            <v-icon class="stepper-icon">mdi-pencil-circle</v-icon>
            <span class="stepper-text">Document Forms</span>
          </div>
          <div class="stepper-line"></div>
          <div class="stepper-item">
            <v-icon class="stepper-icon">mdi-numeric-3-circle</v-icon>
            <span class="stepper-text">Uploading of Documents</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-card class="mb-8 pa-6" elevation="2">
      <v-card-title class="text-h6 mb-4">Select Required Documents</v-card-title>
      <v-card-text class="pa-0">
        <p class="mb-4">Please select the types of documents you will be submitting:</p>
        <v-row dense>
          <v-col cols="12" md="4" v-for="option in documentChecklistOptions" :key="option.value">
            <v-checkbox
              :label="option.label"
              :value="option.value"
              v-model="selectedDocuments"
              density="compact"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-form @submit.prevent="downloadForms">
      <v-card v-if="selectedDocuments.includes('architectural')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Architectural Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Architectural Project Type"
              v-model="architecturalProjectType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Architectural Scope Details"
              v-model="architecturalScopeDetails.value.value"
              density="compact"
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('civil_structural')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Civil/Structural Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Structural Type"
              v-model="structuralType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Civil/Structural Notes"
              v-model="civilStructuralNotes.value.value"
              density="compact"
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('electrical')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Electrical Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Electrical Load (kW)"
              v-model="electricalLoad.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Number of Outlets"
              v-model="numberOfOutlets.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('sanitary')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Sanitary Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Water Supply Source"
              v-model="waterSupplySource.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Waste Disposal Method"
              v-model="wasteDisposalMethod.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('plumbing')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Plumbing Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Number of Fixtures"
              v-model="numberOfFixtures.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Plumbing System Type"
              v-model="plumbingSystemType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('mechanical')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Mechanical Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="HVAC System Type"
              v-model="hvacSystemType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Elevator/Escalator Count"
              v-model="elevatorEscalatorCount.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('electronics')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Electronics Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="CCTV Camera Count"
              v-model="cctvCameraCount.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Fire Alarm System Type"
              v-model="fireAlarmSystemType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="selectedDocuments.includes('geodetic')" class="mb-8 pa-6" elevation="2">
        <v-card-title class="text-h6 mb-4">Geodetic Documents Form</v-card-title>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Applicant Name"
              v-model="prepopulatedData.applicantFullName"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Project Address"
              v-model="prepopulatedData.projectFullAddress"
              readonly
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Survey Type"
              v-model="surveyType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Boundary Descriptions"
              v-model="boundaryDescriptions.value.value"
              density="compact"
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>

      <v-row justify="end" class="mt-4">
        <v-col cols="auto">
          <v-btn color="grey-darken-1" @click="handleResetDocumentForms">Reset Forms</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" type="submit">Download Forms</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="grey-darken-1" @click="emit('previous-step')" to="/UnifiedAppliationForm">Previous Step</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="goToNextStep">Next Step</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, defineModel, onMounted, reactive } from 'vue';
import { useField } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter

const route = useRoute();
const router = useRouter(); // Initialize useRouter

// defineEmits is already correctly defined
const emit = defineEmits(['update:selected-documents', 'next-step', 'previous-step']);

// defineModel is perfect for two-way binding with the parent
const selectedDocuments = defineModel('selectedDocuments', { type: Array, required: true, default: () => [] });

const prepopulatedData = reactive({
  applicantFullName: '',
  projectFullAddress: '',
});

// --- NEW FIELDS for Document Forms (Stepper 2) ---
const architecturalProjectType = useField("architecturalProjectType");
const architecturalScopeDetails = useField("architecturalScopeDetails");
const structuralType = useField("structuralType");
const civilStructuralNotes = useField("civilStructuralNotes");
const electricalLoad = useField("electricalLoad");
const numberOfOutlets = useField("numberOfOutlets");
const waterSupplySource = useField("waterSupplySource");
const wasteDisposalMethod = useField("wasteDisposalMethod");
const numberOfFixtures = useField("numberOfFixtures");
const plumbingSystemType = useField("plumbingSystemType");
const hvacSystemType = useField("hvacSystemType");
const elevatorEscalatorCount = useField("elevatorEscalatorCount");
const cctvCameraCount = useField("cctvCameraCount");
const fireAlarmSystemType = useField("fireAlarmSystemType");
const surveyType = useField("surveyType");
const boundaryDescriptions = useField("boundaryDescriptions");

const documentChecklistOptions = [
  { label: "Architectural Document", value: "architectural" },
  { label: "Civil/Structural Documents", value: "civil_structural" },
  { label: "Electrical Documents", value: "electrical" },
  { label: "Sanitary Documents", value: "sanitary" },
  { label: "Plumbing Documents", "value": "plumbing" },
  { label: "Mechanical Documents", value: "mechanical" },
  { label: "Electronics Documents", value: "electronics" },
  { label: "Geodetic Documents", value: "geodetic" },
];

const handleResetDocumentForms = () => {
  architecturalProjectType.value.value = "";
  architecturalScopeDetails.value.value = "";
  structuralType.value.value = "";
  civilStructuralNotes.value.value = "";
  electricalLoad.value.value = null;
  numberOfOutlets.value.value = null;
  waterSupplySource.value.value = "";
  wasteDisposalMethod.value.value = "";
  numberOfFixtures.value.value = null;
  plumbingSystemType.value.value = "";
  hvacSystemType.value.value = "";
  elevatorEscalatorCount.value.value = null;
  cctvCameraCount.value.value = null;
  fireAlarmSystemType.value.value = "";
  surveyType.value.value = "";
  boundaryDescriptions.value.value = "";
  selectedDocuments.value = []; // This will update the parent due to defineModel
};

const downloadForms = () => {
  if (selectedDocuments.value.length === 0) {
    alert("Please select at least one document type to download forms.");
    return;
  }

  const formData = {
    ancillaryDocuments: {},
  };

  for (const docType of selectedDocuments.value) {
    let docData = {
      applicantName: prepopulatedData.applicantFullName,
      projectAddress: prepopulatedData.projectFullAddress,
    };

    switch (docType) {
      case "architectural":
        docData.projectType = architecturalProjectType.value.value;
        docData.scopeDetails = architecturalScopeDetails.value.value;
        break;
      case "civil_structural":
        docData.structuralType = structuralType.value.value;
        docData.notes = civilStructuralNotes.value.value;
        break;
      case "electrical":
        docData.electricalLoad = electricalLoad.value.value;
        docData.numberOfOutlets = numberOfOutlets.value.value;
        break;
      case "sanitary":
        docData.waterSupplySource = waterSupplySource.value.value;
        docData.wasteDisposalMethod = wasteDisposalMethod.value.value;
        break;
      case "plumbing":
        docData.numberOfFixtures = numberOfFixtures.value.value;
        docData.systemType = plumbingSystemType.value.value;
        break;
      case "mechanical":
        docData.hvacSystemType = hvacSystemType.value.value;
        docData.elevatorEscalatorCount = elevatorEscalatorCount.value.value;
        break;
      case "electronics":
        docData.cctvCameraCount = cctvCameraCount.value.value;
        docData.fireAlarmSystemType = fireAlarmSystemType.value.value;
        break;
      case "geodetic":
        docData.surveyType = surveyType.value.value;
        docData.boundaryDescriptions = boundaryDescriptions.value.value;
        break;
    }
    formData.ancillaryDocuments[docType] = docData;
  }

  const filename = `Ancillary_Documents_Data_${Date.now()}.json`;
  const jsonStr = JSON.stringify(formData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert("Selected forms data downloaded successfully as JSON!");
};

const goToNextStep = () => {
  // Pass selectedDocuments as a JSON string in query parameters
  router.push({
    path: '/UploadDocuments',
    query: {
      selectedDocuments: JSON.stringify(selectedDocuments.value),
      applicantFullName: prepopulatedData.applicantFullName,
      projectFullAddress: prepopulatedData.projectFullAddress,
    }
  });
};

// IMPORTANT: Lifecycle hook to read query parameters when the component is mounted
onMounted(() => {
  if (route.query.applicantFullName) {
    prepopulatedData.applicantFullName = route.query.applicantFullName;
  }
  if (route.query.projectFullAddress) {
    prepopulatedData.projectFullAddress = route.query.projectFullAddress;
  }
});
</script>

<style scoped>
/* Add these new styles for the stepper */
.stepper-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  flex-shrink: 0; /* Prevent shrinking */
  padding: 0 10px; /* Add some padding */
}

.stepper-icon {
  font-size: 40px; /* Adjust icon size */
  color: grey;
}

.stepper-text {
  font-size: 0.9em;
  color: grey;
  margin-top: 5px;
  white-space: nowrap; /* Keep text on one line */
}

.stepper-item.active .stepper-icon {
  color: #1976D2; /* Primary color for active icon */
}

.stepper-item.active .stepper-text {
  color: #000; /* Darker text for active step */
  font-weight: bold;
}

.stepper-line {
  flex-grow: 1;
  height: 2px;
  background-color: grey;
  margin: 0 10px;
}
</style>