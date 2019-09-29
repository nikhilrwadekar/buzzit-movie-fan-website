<template>
  <div>
    <div v-if="!$store.getters.fullName" class="jumbotron mx-auto col-md-auto col-sm-9 col-md-6">
      <h1>Hello, {{fullName ? `${fullName}` : "Movie Fan"}}</h1>
      <p
        class="lead"
      >Fill in your information to get started. Following fields will appear as you keep on filling them.</p>
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
      shortBioLimit: 100
    };
  },
  computed: {
    fullName: function() {
      if (this.firstName && this.lastName)
        return `${this.firstName} ${this.lastName}`;
    },
    bioLength: function() {
      if (this.shortBio) return this.shortBio.length;
      else return 0;
    }
  },
  methods: {
    saveInfo() {
      this.$store.commit("setName", this.fullName);
      this.$store.commit("setShortBio", this.shortBio);
    }
  }
};
</script>

<style>
</style>
