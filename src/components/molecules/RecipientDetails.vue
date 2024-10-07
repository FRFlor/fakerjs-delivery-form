<script setup lang="ts">
import TextInput from "@/components/atoms/TextInput.vue";
import MagicButton from "@/components/atoms/MagicButton.vue";
import DropdownInput from "@/components/atoms/DropdownInput.vue";
import TextAreaInput from "@/components/atoms/TextAreaInput.vue";
import { useMagicMode } from "@/composables/useMagicMode";
import { useDeliveryDetailsState } from "@/composables/useDeliveryDetailsState";
import SETTINGS from "@/settings";

const deliveryDetails = useDeliveryDetailsState();
const isUsingMagicMode = useMagicMode();

function populateWithFakeValues() {
  deliveryDetails.recipientInformation.name = "Homer Simpson";
  deliveryDetails.recipientInformation.email = "h.simpson@doh.test";
  deliveryDetails.recipientInformation.country = "United States";
  deliveryDetails.recipientInformation.stateProvince = "Oregon";
  deliveryDetails.recipientInformation.city = "Springfield";
  deliveryDetails.recipientInformation.streetAddress = "742 Evergreen Terrace";
  deliveryDetails.recipientInformation.zipPostalCode = "49007";
  deliveryDetails.additionalNotes = "For best results, avoid letting Bart handle the box.";
}
</script>

<template>
  <section>
    <header class="flex justify-between min-h-14">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Delivering To:</h2>
      <magic-button v-if="isUsingMagicMode" @click="populateWithFakeValues">Fill it out for me</magic-button>
    </header>

    <p class="mt-1 text-sm leading-6 text-gray-600">Please provide details of the recipient below.</p>

    <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-4">
      <div class="sm:col-span-3">
        <text-input v-model="deliveryDetails.recipientInformation.name" label="Name" />
      </div>

      <div class="sm:col-span-3">
        <text-input v-model="deliveryDetails.recipientInformation.email" label="Email" type="email" />
      </div>

      <div class="sm:col-span-3">
        <dropdown-input
          v-model="deliveryDetails.recipientInformation.country"
          :options="SETTINGS.COUNTRIES"
          label="Country"
        />
      </div>

      <div class="col-span-full">
        <text-input v-model="deliveryDetails.recipientInformation.streetAddress" label="Street Address" />
      </div>

      <div class="sm:col-span-2 sm:col-start-1">
        <text-input v-model="deliveryDetails.recipientInformation.city" label="City" />
      </div>

      <div class="sm:col-span-2">
        <text-input v-model="deliveryDetails.recipientInformation.stateProvince" label="State/Province" />
      </div>

      <div class="sm:col-span-2">
        <text-input v-model="deliveryDetails.recipientInformation.zipPostalCode" label="ZIP/Postal Code" />
      </div>
    </div>

    <text-area-input v-model="deliveryDetails.additionalNotes" class="mt-6" label="Delivery Note" />
  </section>
</template>
