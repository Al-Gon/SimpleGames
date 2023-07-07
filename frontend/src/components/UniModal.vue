<template>
  <div
    :id="ownId"
    class="modal fade"
    data-bs-keyboard="false"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content px-6">
        <div class="modal-header justify-content-end">
          <button
            @click="hideWindow"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-header justify-content-center">
          <h3>{{ header }}</h3>
        </div>
        <div class="modal-body justify-content-center">
          <form>
            <div
              v-for="(_, name, ind) in formFields"
              :key="name"
              class="row mb-3"
            >
              <label :for="name" class="col-sm-3 col-form-label">{{
                formFieldsNames[ind]
              }}</label>
              <div class="col-sm-9">
                <input
                  v-model="formFields[name]"
                  class="form-control"
                  :type="formFieldsTypes[ind]"
                  :id="name"
                />
              </div>
              <div id="usernameHelpBlock" class="form-text help-block">
                {{ fieldHelper(name) }}
              </div>
            </div>
            <div class="row mb-3">
              <div id="mainHelpBlock" class="form-text help-block">
                {{ mainHelper }}
              </div>
            </div>
          </form>
          <div class="modal-footer justify-content-center">
            <slot name="signInWindow" :signInUser="signInUser" />
            <slot
              name="registrationWindow"
              :registerNewUser="registerNewUser"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'UniModal',
  currentUniModalController: null,
  props: {
    ownId: String,
    header: String,
    fieldsSettings: Object,
  },
  data: () => ({
    formFields: {},
    formFieldsNames: [],
    formFieldsTypes: [],
    masseges: {},
    modal: null,
  }),
  computed: {
    isUserAuthorized() {
      return this.$store.getters.isUserAuthorized;
    },
    mainHelper() {
      if (Object.keys(this.masseges).length) {
        let allMessage = '';
        // for (const key in this.masseges) {
        //   if (key !== 'username' && key !== 'password') {
        //     allMessage += `${key}: ${this.masseges[key]}`;
        //   }
        // }
        Object.keys(this.masseges).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(this.masseges, key)) {
            if (key !== 'username' && key !== 'password') {
              allMessage += `${key}: ${this.masseges[key]}`;
            }
          }
        });
        return allMessage;
      }
      return '';
    },
  },
  mounted() {
    this.fieldsSettings.fields.forEach((name) => {
      this.formFields[name] = '';
    });
    this.formFieldsNames = this.fieldsSettings.names;
    this.formFieldsTypes = this.fieldsSettings.types;

    this.modal = new Modal(document.getElementById(this.ownId));
  },
  methods: {
    showWindow() {
      this.modal.show();
    },
    hideWindow() {
      this.resetData();
      this.modal.hide();
    },
    fieldHelper(name) {
      return this.masseges[name] ? this.masseges[name].join(';') : '';
    },
    // ******************************************
    checkRegistration() {
      const errors = this.$store.getters.getErrors;
      if (Object.keys(errors).length) {
        this.masseges = errors;
      } else {
        this.hideWindow();
      }
    },
    registerNewUser() {
      this.$store
        .dispatch('registerUser', this.formFields)
        .then(this.checkRegistration);
    },

    // ***************************************
    checkUserAuthorized() {
      if (this.isUserAuthorized) {
        this.hideWindow();
      } else {
        this.masseges = this.$store.getters.getErrors;
      }
    },
    resetData() {
      // eslint-disable-next-line no-restricted-syntax
      // for (const key in this.formFields) {
      //   if (Object.prototype.hasOwnProperty.call(this.formFields, key)) {
      //     this.formFields[key] = '';
      //   }
      // }
      Object.keys(this.formFields).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this.formFields, key)) {
          this.formFields[key] = '';
        }
      });

      this.masseges = {};
    },
    signInUser() {
      this.$store
        .dispatch('loginUser', this.formFields)
        .then(this.checkUserAuthorized);
    },
  },
};
</script>

<style lang="scss" scoped>
.help-block {
  color: red;
}
</style>
