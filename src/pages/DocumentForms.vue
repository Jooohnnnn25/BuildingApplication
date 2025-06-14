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
        <p class="mb-4">Click on a document type to fill out its specific form:</p>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="option in documentChecklistOptions" :key="option.label">
            <v-card
              class="document-card pa-4 d-flex flex-column align-center justify-center text-center"
              @click="navigateToDocumentForm(option.value)"
              outlined
              hover
              :class="{ 'completed-card': isDocumentCompleted(option.value), 'not-completed-card': !isDocumentCompleted(option.value) && selectedDocuments.includes(option.value) }"
            >
              <v-icon size="48" :color="getIconColor(option.value)">{{ option.icon }}</v-icon>
              <div class="text-subtitle-1 mt-2">{{ option.label }}</div>
              <v-chip
                v-if="isDocumentCompleted(option.value)"
                color="success"
                variant="flat"
                size="small"
                class="mt-2"
              >
                <v-icon start icon="mdi-check-circle"></v-icon>
                Completed
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row justify="end" class="mt-4">
      <v-col cols="auto">
        <v-btn color="grey-darken-1" @click="emit('previous-step')" to="/UnifiedAppliationForm">Previous Step</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="goToNextStep">Next Step</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineEmits, defineModel, onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const emit = defineEmits(['update:selected-documents', 'next-step', 'previous-step']);

// `selectedDocuments` will track which forms have been accessed or 'completed'
const selectedDocuments = defineModel('selectedDocuments', { type: Array, required: true, default: () => [] });

// New reactive state to track truly completed documents
// Using a Set for efficient add/check operations
const completedDocuments = ref(new Set());

const prepopulatedData = reactive({
  applicantFullName: '',
  projectFullAddress: '',
});

const documentChecklistOptions = [
  { label: "Architectural Document", value: "architectural", icon: "mdi-pencil" },
  { label: "Civil/Structural Documents", value: "structural", icon: "mdi-hammer-wrench" },
  { label: "Electrical Documents", value: "electrical", icon: "mdi-lightning-bolt" },
  { label: "Sanitary Documents", value: "sanitary", icon: "mdi-faucet" },
  // *** MODIFICATION HERE: "Plumbing Documents" now has value "sanitary" ***
  { label: "Plumbing Documents", value: "sanitary", icon: "mdi-pipe-wrench" },
  { label: "Mechanical Documents", value: "mechanical", icon: "mdi-fan" },
  { label: "Electronics Documents", value: "electronics", icon: "mdi-television-classic" },

];

// Determine if a document is completed
const isDocumentCompleted = (docValue) => {
  return completedDocuments.value.has(docValue);
};

// Function to determine the icon color based on completion status
const getIconColor = (docValue) => {
  if (isDocumentCompleted(docValue)) {
    return 'success'; // Green for completed
  } else if (selectedDocuments.value.includes(docValue)) {
    return 'primary'; // Blue for selected/visited (but not yet completed)
  }
  return 'grey'; // Grey for unvisited
};

// Function to navigate to the specific document form page
const navigateToDocumentForm = (docType) => {
  // Add the document type to selectedDocuments if not already present.
  // Both 'sanitary' and 'plumbing' cards will push 'sanitary' to selectedDocuments
  if (!selectedDocuments.value.includes(docType)) {
    selectedDocuments.value.push(docType);
  }

  // Use the exact `docType` as the path.
  // If docType is 'sanitary' (from either sanitary or plumbing card), it routes to /sanitary
  router.push({
    path: `/${docType}`,
    query: {
      applicantFullName: prepopulatedData.applicantFullName,
      projectFullAddress: prepopulatedData.projectFullAddress,
      selectedDocuments: JSON.stringify(selectedDocuments.value),
      completedDocuments: JSON.stringify(Array.from(completedDocuments.value)),
    }
  });
};

const goToNextStep = () => {
  router.push({
    path: '/UploadDocuments',
    query: {
      selectedDocuments: JSON.stringify(selectedDocuments.value),
      completedDocuments: JSON.stringify(Array.from(completedDocuments.value)),
      applicantFullName: prepopulatedData.applicantFullName,
      projectFullAddress: prepopulatedData.projectFullAddress,
    }
  });
};

// This function would be called by the individual document forms upon successful submission
const markDocumentAsCompleted = (docType) => {
  completedDocuments.value.add(docType);
};

// Lifecycle hook to read query parameters when the component is mounted
onMounted(() => {
  if (route.query.applicantFullName) {
    prepopulatedData.applicantFullName = route.query.applicantFullName;
  }
  if (route.query.projectFullAddress) {
    prepopulatedData.projectFullAddress = route.query.projectFullAddress;
  }

  // Restore selectedDocuments from query
  if (route.query.selectedDocuments) {
    try {
      selectedDocuments.value = JSON.parse(route.query.selectedDocuments);
    } catch (e) {
      console.error("Error parsing selectedDocuments from query:", e);
    }
  }

  // Restore completedDocuments from query (coming back from a form)
  if (route.query.completedDocuments) {
    try {
      const storedCompleted = JSON.parse(route.query.completedDocuments);
      completedDocuments.value = new Set(storedCompleted);
    } catch (e) {
      console.error("Error parsing completedDocuments from query:", e);
      completedDocuments.value = new Set();
    }
  }

  // --- Simulate completion for demonstration purposes ---
  // If we just came from an individual form, mark it as completed after a delay.
  // In a real app, this logic belongs inside the individual document form's submission handler.
  const allPossibleDocValues = documentChecklistOptions.map(option => option.value);
  const currentRouteDocType = allPossibleDocValues.find(docValue => route.path === `/${docValue}`);

  if (currentRouteDocType && !isDocumentCompleted(currentRouteDocType)) {
    // A small hack to check if the route.path matches any of the document values.
    // This is because the route.path will be `/sanitary` for both sanitary and plumbing cards.
    // We only want to mark 'sanitary' as completed here, not both, unless your logic
    // intends for both to be separately tracked as 'completed'.
    // Given 'Plumbing' routes to 'Sanitary', only 'sanitary' will be marked.
    setTimeout(() => {
      markDocumentAsCompleted(currentRouteDocType);
      console.log(`Document form for ${currentRouteDocType} simulated as completed.`);
    }, 500); // Simulate completion after 0.5 seconds
  }
});
</script>

<style scoped>
/* Stepper Styles (unchanged) */
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
  flex-shrink: 0;
  padding: 0 10px;
}

.stepper-icon {
  font-size: 40px;
  color: grey;
}

.stepper-text {
  font-size: 0.9em;
  color: grey;
  margin-top: 5px;
  white-space: nowrap;
}

.stepper-item.active .stepper-icon {
  color: #1976D2;
}

.stepper-item.active .stepper-text {
  color: #000;
  font-weight: bold;
}

.stepper-line {
  flex-grow: 1;
  height: 2px;
  background-color: grey;
  margin: 0 10px;
}

/* New styles for document cards */
.document-card {
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px; /* Ensure a consistent height for cards */
  /* This is key for outlined cards - ensure a border is always there */
  border: 2px solid var(--v-theme-surface-variant) !important; /* Use a Vuetify color variable for consistency, or a neutral grey */
}

.document-card:hover {
  background-color: #e3f2fd !important; /* Light blue on hover */
  border-color: #90caf9 !important; /* Lighter primary border */
}

.document-card .v-icon {
  transition: color 0.3s ease;
}

.document-card:hover .v-icon {
  color: #1976D2 !important; /* Ensure icon color changes on hover */
}

/* Status-specific styles for the entire card */
.completed-card {
  border-color: #4CAF50 !important; /* Green border for completed */
  background-color: #E8F5E9 !important; /* Light green background for completed */
}

/* This targets cards that have been visited but not completed */
.not-completed-card {
  border-color: #FF5252 !important; /* Red border for not completed (but visited) */
  background-color: #FFEBEE !important; /* Light red background for not completed */
}

/* Override hover effect for completed cards to maintain green appearance */
.completed-card:hover {
  background-color: #C8E6C9 !important; /* Slightly darker green on hover for completed */
  border-color: #4CAF50 !important;
}

/* Override hover effect for not-completed cards to maintain red appearance */
.not-completed-card:hover {
  background-color: #FFCDD2 !important; /* Slightly darker red on hover for not completed */
  border-color: #FF5252 !important;
}

/* Ensure default hover on non-selected/non-completed cards is also visually distinct */
.document-card:not(.completed-card):not(.not-completed-card):hover {
  border-color: #90CAF9 !important; /* Default blue hover for unvisited cards */
  background-color: #E3F2FD !important;
}

</style>