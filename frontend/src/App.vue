<template>
<div>
    <!-- Nav bar -->
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand float-left" href="/">Productivty Management App</a>
        <ul class="nav navbar-nav mr1-auto" >
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customers">Add Vehicle</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create">Add Client</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view">Cars List</router-link>
          </li>
        </ul>
      </div>
      <div class="wrapper">
      <button class="btn-primary" @click="logout">Logout</button>
    </div>
      
    </nav>

 <!-- Router view -->
    <div class="container mt-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter(); // create router instance

    const logout = async () => {
      try {
        localStorage.removeItem('isAuthenticated'); // Remove the authentication flag
        router.push({name: 'Login'});
      } catch (error) {
        console.error('Logout failed:', error)
      }
    };
    return {logout};
  }
}

</script>
<style>
@import "./assets/base.css";


.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
.navbar {
  background: linear-gradient(to right, #001eff, #ffffff); /* Blue to white gradient */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
}
.nav-link {
  color: #007bff;
  font-weight: bold;
  font-size: 1.1em;
  margin-right: 15px;
  padding: 5px 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
  color: #0056b3;
  background-color: rgba(0, 123, 255, 0.2);
  text-decoration: underline;
  border-radius: 5px;
}
.navbar-brand {
  /* Example combining multiple styles */
  font-size: 1.5em;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(13, 13, 13, 0.5);
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
}

.navbar-brand:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
