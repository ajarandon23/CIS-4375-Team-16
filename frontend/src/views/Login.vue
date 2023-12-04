<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4" align="center">
        <h2>Login</h2>
        <div class="mb-4">
          <img src="../assets/DPB-LOGO.jpeg" alt="Placeholder Image" class="img-fluid">
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      // Temporary hardcoded validation
      if (this.username === "admin" && this.password === "password") {
        this.$router.push({ name: 'home' });
        localStorage.setItem('isAuthenticated', true)// TODO: Replace with navigation to the dashboard or main screen
        alert('Logged in successfully');
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
</script>
