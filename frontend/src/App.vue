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
    </nav>

 <!-- Router view -->
    <div class="container mt-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>

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
</style>
