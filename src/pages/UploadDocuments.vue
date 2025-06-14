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
          <div class="stepper-item">
            <v-icon class="stepper-icon">mdi-pencil-circle</v-icon>
            <span class="stepper-text">Document Forms</span>
          </div>
          <div class="stepper-line"></div>
          <div class="stepper-item active">
            <v-icon class="stepper-icon">mdi-numeric-3-circle</v-icon>
            <span class="stepper-text">Uploading of Documents</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-card class="mb-8 pa-6" elevation="2">
      <v-card-title class="text-h6 mb-4">Upload Documents</v-card-title>
      <v-card-text>
        <p class="mb-4">
          Please upload the required documents for your application.
          The fields below are dynamically generated based on your previous selections.
        </p>

        <v-file-input
          label="Upload Unified Application Form (PDF)"
          accept="application/pdf"
          v-model="unifiedApplicationPdf"
          multiple
          variant="outlined"
          prepend-icon="mdi-file-pdf-box"
          clearable
          class="mb-4"
        ></v-file-input>

        <v-file-input
          label="Upload General Clearances (PDF)"
          accept="application/pdf"
          v-model="generalClearancesPdf"
          multiple
          variant="outlined"
          prepend-icon="mdi-file-pdf-box"
          clearable
          class="mb-4"
        ></v-file-input>

        <div v-for="docType in selectedDocuments" :key="docType" class="mb-4">
          <v-file-input
            :label="`Upload ${formatDocumentTypeName(docType)} Documents (PDFs)`"
            accept="application/pdf"
            multiple
            variant="outlined"
            prepend-icon="mdi-paperclip"
            clearable
            v-model="uploadedAncillaryDocuments[docType]"
          ></v-file-input>
        </div>
      </v-card-text>
    </v-card>

    <v-row justify="end" class="mt-4">
      <v-col cols="auto">
        <v-btn color="grey-darken-1" @click="goToPreviousStep" to="/DocumentForms">Previous Step</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="success" @click="finalizeApplication">Finalize Application</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Reactive state for uploaded files
const unifiedApplicationPdf = ref([]);
const generalClearancesPdf = ref([]);
const uploadedAncillaryDocuments = reactive({}); // Use reactive object to store files for each ancillary document type

// selectedDocuments from query parameters
const selectedDocuments = ref([]);

// Function to format document type names for display
const formatDocumentTypeName = (docType) => {
  return docType
    .replace('_', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const goToPreviousStep = () => {
  // Navigate back to DocumentForms, preserving prepopulated data
  router.push({
    path: '/', // Assuming DocumentForms is at the root or a defined route like '/document-forms'
    query: {
      applicantFullName: route.query.applicantFullName,
      projectFullAddress: route.query.projectFullAddress,
      // You might want to pass back the selectedDocuments if the DocumentForms component
      // doesn't persist them or fetch them otherwise. For now, assume it handles its own state.
    }
  });
};

const finalizeApplication = () => {
  // Here you would typically handle the submission of all uploaded files.
  // This might involve:
  // 1. Creating FormData objects
  // 2. Sending files to a backend API (e.g., using Axios or Fetch)
  // 3. Displaying a success/error message
  // 4. Redirecting the user to a confirmation page

  console.log("Finalizing application...");
  console.log("Unified Application PDF:", unifiedApplicationPdf.value);
  console.log("General Clearances PDF:", generalClearancesPdf.value);
  console.log("Uploaded Ancillary Documents:", uploadedAncillaryDocuments);

  // Example: Basic alert for demonstration
  alert("Application finalized! (Files would be uploaded here)");
  // router.push('/application-success'); // Example redirection
};

onMounted(() => {
  // Parse the selectedDocuments from the query parameter
  if (route.query.selectedDocuments) {
    try {
      selectedDocuments.value = JSON.parse(route.query.selectedDocuments);
      // Initialize reactive properties for each selected document type
      selectedDocuments.value.forEach(docType => {
        uploadedAncillaryDocuments[docType] = [];
      });
    } catch (e) {
      console.error("Failed to parse selectedDocuments query parameter:", e);
      selectedDocuments.value = [];
    }
  }
});
</script>

<style scoped>
/* Stepper styles from DocumentForms for consistency */
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