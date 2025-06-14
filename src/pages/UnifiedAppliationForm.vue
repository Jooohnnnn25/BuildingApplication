<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center justify-center stepper-container">
          <div class="stepper-item active">
            <v-icon class="stepper-icon">mdi-numeric-1-circle</v-icon>
            <span class="stepper-text">Unified Application Form</span>
          </div>
          <div class="stepper-line"></div>
          <div class="stepper-item">
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
      <v-card-title class="text-h5 text-center text-blue-darken-2 mb-4">BUILDING PERMIT APPLICATION</v-card-title>

      <v-form @submit.prevent="submitUnifiedApplication">
        <v-row dense>
          <v-col cols="12">
            <v-row dense class="mb-4">
              <v-col cols="12" md="6">
                <v-card flat border>
                  <v-card-title class="text-subtitle-1 pb-0 text-grey-darken-1">Application Type</v-card-title>
                  <v-card-text>
                    <v-radio-group
                      v-model="applicationType.value.value"
                      density="compact"
                      hide-details="auto"
                      row
                    >
                      <v-radio label="Simple" value="Simple"></v-radio>
                      <v-radio label="Complex" value="Complex"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card flat border>
                  <v-card-title class="text-subtitle-1 pb-0 text-grey-darken-1">Application Status</v-card-title>
                  <v-card-text>
                    <v-radio-group
                      v-model="applicationStatus.value.value"
                      density="compact"
                      hide-details="auto"
                      row
                    >
                      <v-radio label="New" value="NEW"></v-radio>
                      <v-radio label="Renew" value="RENEWAL"></v-radio>
                      <v-radio label="Amendatory" value="AMENDED"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">Owner/Applicant Information</v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Last Name"
              v-model="lastName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="First Name"
              v-model="firstName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="M.I."
              v-model="middleName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="TIN"
              v-model="tin.value.value"
              placeholder="e.g., 123-456-789-000"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="For Construction Owned by an Enterprise"
              v-model="enterpriseOwner.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Form of Ownership"
              v-model="formOwnership.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              label="No."
              v-model="ownerAddressNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              label="Street"
              :items="streetOptions"
              v-model="ownerAddressStreet.value.value"
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Barangay"
              :items="barangayOptions"
              v-model="ownerAddressBarangay.value.value"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="City/Municipal"
              v-model="ownerAddressMunicipal.value.value"
              density="compact"
              variant="outlined"
              placeholder="Naga City"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Zip Code"
              v-model="ownerAddressZipCode.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Contact Number"
              v-model="contactNumber.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">Location of Construction</v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Lot No."
              v-model="lotNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Blk No."
              v-model="blkNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="TCT No."
              v-model="tctNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Current Tax Dec No."
              v-model="taxDecNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              label="Street"
              :items="streetOptions"
              v-model="constructionStreet.value.value"
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              label="Barangay"
              :items="barangayOptions"
              v-model="constructionBarangay.value.value"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="City/Municipal"
              v-model="constructionMunicipal.value.value"
              density="compact"
              variant="outlined"
              placeholder="Naga City"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">Scope of Work</v-col>
          <v-col cols="12">
            <v-select
              label="Select Scope of Work"
              :items="scopeOfWorkOptions"
              v-model="scopeOfWork.value.value"
              density="compact"
              variant="outlined"
              multiple
              chips
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            v-if="scopeOfWork.value.value && scopeOfWork.value.value.includes('Others')"
          >
            <v-text-field
              label="Specify other Scope of Work"
              v-model="otherScopeOfWork.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">Use or Character of Occupancy</v-col>
          <v-col cols="12" md="6">
            <v-select
              label="Select Occupancy Group"
              :items="occupancyGroupOptions"
              v-model="occupancyGroup.value.value"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              label="Select Occupancy Type"
              :items="currentOccupancyTypeOptions"
              v-model="occupancyType.value.value"
              density="compact"
              variant="outlined"
              :disabled="!occupancyGroup.value.value"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="occupancyType.value.value === 'Others'">
            <v-text-field
              label="Specify other Occupancy Type"
              v-model="otherOccupancyType.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Occupancy Classified"
              v-model="occupancyClassified.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Number of Units"
              v-model="numberOfUnits.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Number of Storey"
              v-model="numberOfStorey.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Total Floor Area (sq.m.)"
              v-model="totalFloorArea.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Lot Area (sq.m.)"
              v-model="lotArea.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">TOTAL ESTIMATED COST (₱)</v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Building"
              v-model="costBuilding.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Electrical"
              v-model="costElectrical.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Mechanical"
              v-model="costMechanical.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Electronics"
              v-model="costElectronics.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Plumbing"
              v-model="costPlumbing.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">COST OF EQUIPMENT INSTALLED (₱)</v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="P (Equipment)"
              v-model="costEquipment.value.value"
              type="number"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2">Project Timeline</v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Proposed Date of Construction"
              v-model="proposedDate.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Expected Date of Completion"
              v-model="expectedDate.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-h6 mb-2 text-center">AFFIDAVIT OF FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION WORKS</v-col>
          <v-col cols="12" class="text-subtitle-1 mb-2">BOX 2: FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION WORKS (REPRESENTING THE OWNER)</v-col>
          <v-col cols="12">
            <v-text-field
              label="Address (Inspector/Supervisor)"
              v-model="inspectorAddress.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              label="Architect or Civil Engineer (Printed Name)"
              v-model="architectCivilEngineerName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Date (of Signature)"
              v-model="architectEngineerSignatureDate.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Signature Over Printed Name"
              density="compact"
              variant="outlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="PRC No."
              v-model="prcNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Validity"
              v-model="prcValidity.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="PTR No."
              v-model="ptrNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Date Issued (PTR)"
              v-model="ptrDateIssued.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Issued at (PTR)"
              v-model="ptrIssuedAt.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="TIN (Inspector/Supervisor)"
              v-model="inspectorTin.value.value"
              placeholder="e.g., 123-456-789-000 or 123456789"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-subtitle-1 mb-2">BOX 3: APPLICANT</v-col>
          <v-col cols="12" md="9">
            <v-text-field
              label="Applicant Name (Printed Name)"
              v-model="box3ApplicantName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Date (Applicant Signature)"
              v-model="box3ApplicantSignatureDate.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Signature Over Printed Name"
              density="compact"
              variant="outlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Address (Applicant)"
              v-model="box3ApplicantAddress.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Gov't ID No."
              v-model="box3ApplicantGovtIdNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Date Issued"
              v-model="box3ApplicantIdDateIssued.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Place Issued"
              v-model="box3ApplicantIdPlaceIssued.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-subtitle-1 mb-2">BOX 4: WITH MY CONSENT: LOT OWNER / AUTHORIZED REPRESENTATIVE</v-col>
          <v-col cols="12" md="9">
            <v-text-field
              label="Lot Owner / Authorized Representative (Printed Name)"
              v-model="box4LotOwnerRepName.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="Date (Lot Owner/Rep Signature)"
              v-model="box4LotOwnerRepSignatureDate.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Signature Over Printed Name"
              density="compact"
              variant="outlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Address (Lot Owner/Rep)"
              v-model="box4LotOwnerRepAddress.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Gov't ID No."
              v-model="box4LotOwnerRepGovtIdNo.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Date Issued"
              v-model="box4LotOwnerRepIdDateIssued.value.value"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Place Issued"
              v-model="box4LotOwnerRepIdPlaceIssued.value.value"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="text-subtitle-1 mb-2">BOX 5: ACKNOWLEDGMENT / NOTARY PUBLIC</v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            <span class="font-weight-bold">REPUBLIC OF THE PHILIPPINES</span><br>
            CITY/MUNICIPALITY OF <span class="acknowledgment-line"></span> S.S.
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            BEFORE ME, at the City/Municipality of <span class="acknowledgment-line"></span> on <span class="acknowledgment-line-short"></span> personally appeared the following:
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            <span class="font-weight-bold">APPLICANT (Signature Over Printed Name)</span><br>
            Full Name: <span class="acknowledgment-line-long"></span><br>
            Gov't ID No.: <span class="acknowledgment-line"></span>
            Date Issued: <span class="acknowledgment-line"></span>
            Place Issued: <span class="acknowledgment-line"></span>
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            <span class="font-weight-bold">LICENSED ARCHITECT OR CIVIL ENGINEER (Full-Time Inspector and Supervisor of Construction Works)</span><br>
            Full Name: <span class="acknowledgment-line-long"></span><br>
            Gov't ID No.: <span class="acknowledgment-line"></span>
            Date Issued: <span class="acknowledgment-line"></span>
            Place Issued: <span class="acknowledgment-line"></span>
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            whose signatures appear hereinabove, known to me to be the same persons who executed this standard prescribed form and acknowledged to me that the same is their free and voluntary act and deed.
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            WITNESS MY HAND AND SEAL, on the date and place above written.
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            Doc. No.: <span class="acknowledgment-line-short"></span>
            Page No.: <span class="acknowledgment-line-short"></span>
            Book No.: <span class="acknowledgment-line-short"></span>
            Series of: <span class="acknowledgment-line-short"></span>
          </v-col>
          <v-col cols="12" class="text-body-2 mb-2">
            NOTARY PUBLIC (Until December <span class="acknowledgment-line-short"></span>)
          </v-col>

        </v-row>

        <v-row justify="end" class="mt-4">
          <v-col cols="auto">
            <v-btn color="grey-darken-1" @click="handleReset">Reset Form</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" type="submit">Submit Application</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-dialog
        v-model="showCompletionDialog"
        max-width="500px"
        persistent
      >
        <v-card class="pa-6 text-center">
          <v-card-title class="text-h5 text-blue-darken-2 mb-4">Application Complete!</v-card-title>
          <v-card-text>
            <p class="text-h6 mb-2">Your Application Number is</p>
            <p class="text-h4 font-weight-bold text-blue-darken-2 mb-6">{{ generatedApplicationNumber }}</p>

            <p class="text-body-1 mb-4">To proceed with your application, please sign in in your Account</p>
            <p class="text-body-1 mb-2">User Name: {{ generatedApplicationNumber }}</p>
            <p class="text-body-1 mb-6">Password: {{ generatedPassword }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="continueToDocumentForms" class="mr-2">Continue to Document Forms</v-btn>
            <v-btn color="secondary" @click="handleDownload">Download Form</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const router = useRouter();

// Controls the visibility of the completion dialog
const showCompletionDialog = ref(false);
const generatedApplicationNumber = ref('');
const generatedPassword = ref('');

// --- Form Fields (no validation rules for simplicity, but can be added with VeeValidate) ---
// Destructure 'values' from useForm to easily access all form data
const { handleSubmit, handleReset, values: formValues } = useForm({
  validationSchema: {}, // Define validation rules here if needed, e.g., using Yup
});

// --- UseField for all form models ---
// These will automatically map to `formValues`
const applicationType = useField("applicationType");
const applicationStatus = useField("applicationStatus");

const scopeOfWork = useField("scopeOfWork", undefined, { initialValue: [] });
const otherScopeOfWork = useField("otherScopeOfWork");
const occupancyGroup = useField("occupancyGroup");
const occupancyType = useField("occupancyType");
const otherOccupancyType = useField("otherOccupancyType");

const firstName = useField("firstName");
const middleName = useField("middleName");
const lastName = useField("lastName");
const tin = useField("tin");
const enterpriseOwner = useField("enterpriseOwner");
const formOwnership = useField("formOwnership");
const ownerAddressNo = useField("ownerAddressNo");
const ownerAddressStreet = useField("ownerAddressStreet");
const ownerAddressBarangay = useField("ownerAddressBarangay");
const ownerAddressMunicipal = useField("ownerAddressMunicipal", undefined, { initialValue: "Naga City" });
const ownerAddressZipCode = useField("ownerAddressZipCode");
const contactNumber = useField("contactNumber");

const lotNo = useField("lotNo");
const blkNo = useField("blkNo");
const tctNo = useField("tctNo");
const taxDecNo = useField("taxDecNo");
const constructionStreet = useField("constructionStreet");
const constructionBarangay = useField("constructionBarangay");
const constructionMunicipal = useField("constructionMunicipal", undefined, { initialValue: "Naga City" });

const occupancyClassified = useField("occupancyClassified");
const numberOfUnits = useField("numberOfUnits");
const numberOfStorey = useField("numberOfStorey");
const totalFloorArea = useField("totalFloorArea");
const lotArea = useField("lotArea");

const costBuilding = useField("costBuilding");
const costElectrical = useField("costElectrical");
const costMechanical = useField("costMechanical");
const costElectronics = useField("costElectronics");
const costPlumbing = useField("costPlumbing");
const costEquipment = useField("costEquipment");

const proposedDate = useField("proposedDate");
const expectedDate = useField("expectedDate");

const inspectorAddress = useField("inspectorAddress");
const architectCivilEngineerName = useField("architectCivilEngineerName");
const architectEngineerSignatureDate = useField("architectEngineerSignatureDate");
const prcNo = useField("prcNo");
const prcValidity = useField("prcValidity");
const ptrNo = useField("ptrNo");
const ptrDateIssued = useField("ptrDateIssued");
const ptrIssuedAt = useField("ptrIssuedAt");
const inspectorTin = useField("inspectorTin");

const box3ApplicantName = useField("box3ApplicantName");
const box3ApplicantSignatureDate = useField("box3ApplicantSignatureDate");
const box3ApplicantAddress = useField("box3ApplicantAddress");
const box3ApplicantGovtIdNo = useField("box3ApplicantGovtIdNo");
const box3ApplicantIdDateIssued = useField("box3ApplicantIdDateIssued");
const box3ApplicantIdPlaceIssued = useField("box3ApplicantIdPlaceIssued");

const box4LotOwnerRepName = useField("box4LotOwnerRepName");
const box4LotOwnerRepSignatureDate = useField("box4LotOwnerRepSignatureDate");
const box4LotOwnerRepAddress = useField("box4LotOwnerRepAddress");
const box4LotOwnerRepGovtIdNo = useField("box4LotOwnerRepGovtIdNo");
const box4LotOwnerRepIdDateIssued = useField("box4LotOwnerRepIdDateIssued");
const box4LotOwnerRepIdPlaceIssued = useField("box4LotOwnerRepIdPlaceIssued");

// --- Options for Combo Boxes (from your original code) ---
const scopeOfWorkOptions = [
  "NEW CONSTRUCTION", "RENOVATION", "RAISING", "ERECTION", "CONVERSION",
  "ACCESSORY BUILDING/STRUCTURE", "ADDITION", "REPAIR", "LEGALIZATION OF EXISTING BUILDING",
  "ALTERATION", "MOVING", "DEMOLITION", "Others",
];

const occupancyTypesByGroup = {
  "GROUP A: RESIDENTIAL (DWELLINGS)": ["Single", "Duplex", "Residential R-1, R-2", "Others"],
  "GROUP B: RESIDENTIAL": ["Hotel", "Motel", "Dormitory", "Townhouse", "Boardinghouse", "Lodging House", "Residential R-3, R-4, R-5", "Others"],
  "GROUP C: EDUCATIONAL & RECREATIONAL": ["School Building", "School Auditorium", "Civic Center", "Gymnasium", "Clubhouse", "Church, Mosque, Temple, Chapel", "Others"],
  "GROUP D: INSTITUTIONAL": ["Hospital or Similar Structure", "Home for the Aged", "Government Office", "Others"],
  "GROUP E: COMMERCIAL": ["Bank", "Store", "Shopping Center/Mall", "Drinking/Dining Establishment", "Shop (i.e. Dress Shop, Tailoring, Barbershop, etc.)", "Others"],
  "GROUP F: LIGHT INDUSTRIAL": ["Factory/Plant (Using Incombustible/Non-Explosive Materials)", "Others"],
  "GROUP G: MEDIUM INDUSTRIAL": ["Storage/Warehouse (For Hazardous/Highly Flammable Materials)", "Factory (For Hazardous/Highly Flammable Materials)", "Others"],
  "GROUP H: ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)": ["Theater, Auditorium, Convention Hall", "Grandstand/Bleacher", "Others"],
  "GROUP I: ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)": ["Coliseum, Sports Complex", "Convention Center and Similar Structure", "Others"],
  "GROUP J: (J-1) AGRICULTURAL": ["Barn, Granary, Poultry House", "Piggery, Grain Mill, Grain Silo", "Others"],
  "GROUP J: (J-2) ACCESSORIES": ["Private Carport/Garage, Tower", "Swimming Pool, Fence Over 1.80m", "Steel/Concrete Tank", "Others"],
};

const currentOccupancyTypeOptions = computed(() => {
  return occupancyGroup.value.value
    ? occupancyTypesByGroup[occupancyGroup.value.value]
    : [];
});

watch(
  () => occupancyGroup.value.value,
  (newGroup, oldGroup) => {
    if (newGroup !== oldGroup) {
      occupancyType.value.value = null;
      otherOccupancyType.value.value = "";
    }
  }
);
watch(
  () => occupancyType.value.value,
  (newType) => {
    if (newType !== "Others") {
      otherOccupancyType.value.value = "";
    }
  }
);

const barangayOptions = [
  "Abella (CBD I)", "Bagumbayan Norte", "Bagumbayan Sur", "Balatas", "Calauag",
  "Cararayan", "Carolina", "Concepcion Grande", "Concepcion Pequeña", "Dayangdang",
  "Del Rosario", "Dinaga (CBD I)", "Igualdad Interior(CBD I)", "Lerma (CBD II)",
  "Liboton", "Mabolo", "Pacol", "Panicuason", "Sabang (CBD I)", "San Agustin I",
  "San Agustin II", "San Agustin Norte", "San Bartolome Norte", "San Bartolome Sur",
  "Sta. Cruz", "San Felipe", "San Francisco (CBD II)", "San Isidro", "Tabuco (CBD I)",
  "Tinago", "Triangulo (CBD II)", "Queborac", "Zamora (CBD I)",
];

const rawStreetOptions = [
  "Magsaysay Highway (3)", "Riverside Street", "Maharlika Hiway (1)", "Rosal",
  "Maharlika Hiway (3)", "Rotonda Street (2)", "Main Ave", "Rotunda",
  "Main Avenue", "Ruby", "Main Gate of Villakarangahan Subdivision calauag/san felipe Naga City, Cam SUR (1)",
  "S. Ola St", "Mangga", "Sabila", "Maria Concepcion", "Sacred Heart",
  "Maria Cristina", "sacred heart street (1)", "Maria Peñafrancia", "Saint Jude",
  "Mart", "Saint Jude Drive", "Mayflower (1)", "Sampaloc", "Mayon Avenue (3)",
  "San Antonio", "Mayon Avenue Extension", "San Felipe, Naga City, Bicol, Philippines (1)",
  "Mercedes", "San Felipe-Pacol-Carolina-Panicuason Road (1)", "Metro Homes",
  "San Isidro-Carolina Road", "Michael", "San Jose", "Miguel", "San Jose",
  "Minneapolis St", "San Juan", "Molave", "San Juan", "Molave Road", "San Leandro City",
  "Molave St", "San Martin", "Mother Francisca", "San Martin", "Naga Central Road",
  "Naga City Peoples mall (1)", "San Mateo", "Naga Rotonda", "San Miguel", "Naples St",
  "San Quintin", "Narra", "San Rafael Cararayan, Naga City (1)", "Narra Road", "San Sebastian (1)",
  "Nicolasa", "Santa Cruz", "Ninoy & Cory Avenue", "Santa Cruz Poro", "Ocampo",
  "Santiago I Road", "Ocampo 2", "Santiago II Road", "Ojeda", "Santo Niño", "Onyx",
  "Santol", "Onyx Street", "Santol (1)", "Opal (1)", "Sapphire", "P. Santos (1)",
  "Sapphire Drive", "P. Santos St.", "Sapphire St", "pacol naga city (2)", "Sierra Madre",
  "Padre Gracia Street (1)", "Sigma", "Pandan", "SM Access Road", "Panganiban Avenue",
  "Socorro", "Panganiban Drive (8)", "Solid", "Panicuason Road (1)", "Soriano Avenue",
  "Parañaque City", "Taal Avenue (2)", "Taculod Road", "Pearl", "Tanlad",
  "Pearl Dr", "tapaz (1)", "Pedro Santos Avenue (2)", "Temporo Dy", "Penafrancia Ave. Ext (1)",
  "Tindalo", "Peniafrancia Av. (1)", "Topaz", "Peninsula", "V. Belarmino St",
  "Perpetual Help", "V. Lukban St", "Peñafrancia Avenue (4)", "Victoria",
  "Peñafrancia Avenue", "Villa Francia", "Villacorazon Subd. II (1)", "Pisces", "Virgo",
  "PNR Road (1)", "Waling-waling", "Polo", "Yakal", "Princeton",
];

const streetOptions = computed(() => {
  const uniqueStreets = new Set();
  rawStreetOptions.forEach(street => {
    const cleanedStreet = street.replace(/\s*\(\d+\)$/, '').trim();
    uniqueStreets.add(cleanedStreet);
  });
  return Array.from(uniqueStreets).sort();
});

// Function to generate a random alphanumeric string for app number and password
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Handle form submission
const submitUnifiedApplication = handleSubmit(async (values) => {
  // Simulate API call or form processing
  console.log('Unified Application Form Submitted:', values);

  // Generate application number and password
  generatedApplicationNumber.value = generateRandomString(10).toUpperCase();
  generatedPassword.value = generateRandomString(8);

  // Show the completion dialog
  showCompletionDialog.value = true;
});

// Function to handle downloading the main form data (optional, but good for completeness)
const handleDownload = () => {
  const dataToDownload = {
    applicationDetails: {
      applicationType: applicationType.value.value,
      applicationStatus: applicationStatus.value.value,
      scopeOfWork: scopeOfWork.value.value,
      otherScopeOfWork: otherScopeOfWork.value.value,
      occupancyGroup: occupancyGroup.value.value,
      occupancyType: occupancyType.value.value,
      otherOccupancyType: otherOccupancyType.value.value,
    },
    ownerApplicantInfo: {
      firstName: firstName.value.value,
      middleName: middleName.value.value,
      lastName: lastName.value.value,
      tin: tin.value.value,
      enterpriseOwner: enterpriseOwner.value.value,
      formOwnership: formOwnership.value.value,
      ownerAddressNo: ownerAddressNo.value.value,
      ownerAddressStreet: ownerAddressStreet.value.value,
      ownerAddressBarangay: ownerAddressBarangay.value.value,
      ownerAddressMunicipal: ownerAddressMunicipal.value.value,
      ownerAddressZipCode: ownerAddressZipCode.value.value,
      contactNumber: contactNumber.value.value,
    },
    constructionLocation: {
      lotNo: lotNo.value.value,
      blkNo: blkNo.value.value,
      tctNo: tctNo.value.value,
      taxDecNo: taxDecNo.value.value,
      constructionStreet: constructionStreet.value.value,
      constructionBarangay: constructionBarangay.value.value,
      constructionMunicipal: constructionMunicipal.value.value,
    },
    occupancyDetails: {
      occupancyClassified: occupancyClassified.value.value,
      numberOfUnits: numberOfUnits.value.value,
      numberOfStorey: numberOfStorey.value.value,
      totalFloorArea: totalFloorArea.value.value,
      lotArea: lotArea.value.value,
    },
    estimatedCosts: {
      costBuilding: costBuilding.value.value,
      costElectrical: costElectrical.value.value,
      costMechanical: costMechanical.value.value,
      costElectronics: costElectronics.value.value,
      costPlumbing: costPlumbing.value.value,
      costEquipment: costEquipment.value.value,
    },
    projectTimeline: {
      proposedDate: proposedDate.value.value,
      expectedDate: expectedDate.value.value,
    },
    inspectorSupervisor: {
      inspectorAddress: inspectorAddress.value.value,
      architectCivilEngineerName: architectCivilEngineerName.value.value,
      architectEngineerSignatureDate: architectEngineerSignatureDate.value.value,
      prcNo: prcNo.value.value,
      prcValidity: prcValidity.value.value,
      ptrNo: ptrNo.value.value,
      ptrDateIssued: ptrDateIssued.value.value,
      ptrIssuedAt: ptrIssuedAt.value.value,
      inspectorTin: inspectorTin.value.value,
    },
    applicantBox3: {
      applicantName: box3ApplicantName.value.value,
      applicantSignatureDate: box3ApplicantSignatureDate.value.value,
      applicantAddress: box3ApplicantAddress.value.value,
      applicantGovtIdNo: box3ApplicantGovtIdNo.value.value,
      applicantIdDateIssued: box3ApplicantIdDateIssued.value.value,
      applicantIdPlaceIssued: box3ApplicantIdPlaceIssued.value.value,
    },
    lotOwnerRepresentativeBox4: {
      lotOwnerRepName: box4LotOwnerRepName.value.value,
      lotOwnerRepSignatureDate: box4LotOwnerRepSignatureDate.value.value,
      lotOwnerRepAddress: box4LotOwnerRepAddress.value.value,
      lotOwnerRepGovtIdNo: box4LotOwnerRepGovtIdNo.value.value,
      lotOwnerRepIdDateIssued: box4LotOwnerRepIdDateIssued.value.value,
      lotOwnerRepIdPlaceIssued: box4LotOwnerRepIdPlaceIssued.value.value,
    },
  };

  const filename = `Unified_Application_Data_${generatedApplicationNumber.value}.json`;
  const jsonStr = JSON.stringify(dataToDownload, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert("Unified Application Form data downloaded successfully as JSON!");
};

// Function to navigate to DocumentForms and pass data
const continueToDocumentForms = () => {
  showCompletionDialog.value = false; // Close the current dialog

  // Construct the applicant full name and project full address from the current form data
  const applicantFullName = `${lastName.value.value || ''}, ${firstName.value.value || ''} ${middleName.value.value || ''}`.trim();
  const projectFullAddress = `${lotNo.value.value ? 'Lot No. ' + lotNo.value.value + ', ' : ''}` +
                             `${blkNo.value.value ? 'Blk No. ' + blkNo.value.value + ', ' : ''}` +
                             `${constructionStreet.value.value || ''}, ` +
                             `${constructionBarangay.value.value || ''}, ` +
                             `${constructionMunicipal.value.value || ''}`.trim().replace(/,\s*$/, ''); // Remove trailing comma if any

  router.push({
    name: 'DocumentForms', // Ensure this matches the 'name' in your router/index.js
    query: {
      applicantFullName: applicantFullName,
      projectFullAddress: projectFullAddress,
    }
  });
};
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

/* Your existing styles for acknowledgment lines */
.acknowledgment-line {
  display: inline-block;
  min-width: 150px;
  border-bottom: 1px solid #000;
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: bottom;
}

.acknowledgment-line-short {
  display: inline-block;
  min-width: 80px;
  border-bottom: 1px solid #000;
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: bottom;
}

.acknowledgment-line-long {
  display: inline-block;
  min-width: 250px;
  border-bottom: 1px solid #000;
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: bottom;
}
</style>