<template>
  <div>
    <div v-if="!$store.getters.fullName" class="jumbotron mx-auto col-md-auto col-sm-9 col-md-6">
      <!-- Hello, Movie Fan or Full Name -->
      <h1>Hello, {{fullName ? `${fullName}` : "Movie Fan"}}</h1>

      <p class="lead">Please provide your details to get started.</p>

      <!-- Form Validation Message(s) -->
      <p
        v-if="formValidationMessage"
        class="alert"
        :class="alertClass"
        role="alert"
        v-html="formValidationMessage"
      ></p>
      <form class>
        <div class="form-row">
          <!-- First Name -->
          <div class="form-group col-md-6">
            <label for="firstName">First Name</label>
            <input
              v-model="firstName"
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
            >
          </div>

          <!-- Last Name -->
          <div class="form-group col-md-6">
            <label for="lastName">Last Name</label>
            <input
              :disabled="!firstName"
              v-model="lastName"
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
            >
          </div>
        </div>
        <!-- Short Bio -->
        <div class="form-group">
          <label for="shortBio">Short Bio ({{bioLength}}/100)</label>
          <textarea
            :disabled="!fullName"
            v-model="shortBio"
            class="form-control"
            id="shortBio"
            rows="3"
            :maxlength="shortBioLimit"
          ></textarea>
        </div>

        <!-- Save Profile Info -->
        <button
          :disabled="!shortBio"
          class="btn btn-primary my-2 my-sm-0"
          type="submit"
          v-on:click.prevent="saveInfo"
        >Save Profile Info</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "Form",

  data: function() {
    return {
      firstName: "",
      lastName: "",
      shortBio: "",
      shortBioLimit: 100,
      alertClass: "alert-primary",
      formValidationMessage: `<ul><li>First name should be atleast of 2 characters.</li><li>Your Full Name should not contain numbers</li><li>Short Bio has a character limit.</li>`
    };
  },
  computed: {
    // Computed Full Name
    fullName: function() {
      if (this.firstName && this.lastName)
        return `${this.firstName} ${this.lastName}`;
    },
    // Short Bio Length
    bioLength: function() {
      if (this.shortBio) return this.shortBio.length;
      else return 0;
    }
  },
  methods: {
    // Save Info Button Handler
    saveInfo() {
      // If Full Name is validated, store it
      if (
        this.firstName.length >= 2 &&
        this.lastName.length !== 0 &&
        this.fullName.match(/^[a-z ,.'-]+$/i)
      ) {
        this.$store.commit("setName", this.fullName);
        this.$store.commit("setShortBio", this.shortBio);
        this.formValidationMessage = null;
      } else if (this.firstName.length < 2) {
        // If first name isn't long enough
        this.formValidationMessage =
          "First name should be more than 1 character long!";
        this.alertClass = "alert-danger";
      } else if (!this.fullName.match(/^[a-z ,.'-]+$/i)) {
        // If full name isn't in correct format
        this.formValidationMessage = "Invalid Name Format!";
        this.alertClass = "alert-danger";
      }
    }
  }
};
</script>

<style>
</style>
