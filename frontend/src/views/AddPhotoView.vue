<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Add a title for the new view -->
        <h3 class="text-center">View Vehicle with Image</h3>
        
        <!-- Display the image in the center -->
        <div class="text-center">
          <img src="/path/to/your/image.jpg" alt="Vehicle Image" class="img-fluid">
        </div>
        
        <!-- Add upload image buttons around the image -->
        <div class="d-flex justify-content-center mt-3">
          <!-- Buttons on the left of the image -->
          <button class="btn btn-primary mx-2">Upload Left</button>
          
          <!-- Image in the center -->
          <img src="/path/to/your/image.jpg" alt="Vehicle Image" class="img-fluid mx-2">
          
          <!-- Buttons on the right of the image -->
          <button class="btn btn-primary mx-2">Upload Right</button>
        </div>
        
        <!-- Buttons from the back of the image -->
        <div class="text-center mt-3">
          <button class="btn btn-primary">Upload Back</button>
          <button class="btn btn-primary mx-2">Upload Back</button>
          <button class="btn btn-primary">Upload Back</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Your component logic here
  }
  </script>
  