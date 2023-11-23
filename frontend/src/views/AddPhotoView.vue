<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Add a title for the new view -->
      <h3 class="text-center">Add Photo</h3>
      
      <!-- Buttons from the front of the image -->
      <div class="text-center mt-3">
        <!-- Use hidden file input for image capture -->
        <input
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('Front')"
        >
        <button class="circle-button" @click="openImageCapture">FL</button>
        <button class="circle-button" @click="openImageCapture">Front</button>
        <button class="circle-button" @click="openImageCapture">FR</button>
      </div>
      
      <!-- Add upload image buttons around the image with circle shapes -->
      <div class="d-flex justify-content-center mt-3">
        <!-- Buttons on the left of the image -->
        <button class="circle-button side-button" @click="openImageCapture('Left')">Left side</button>
        
        <!-- Image in the center -->
        <img src="../assets/carimage.png" alt="Vehicle Image" class="img-fluid mx-2" style="width: 200px; height: 200px; border-radius: 50%;">
        
        <!-- Buttons on the right of the image -->
        <button class="circle-button side-button" @click="openImageCapture('Right')">Right Side</button>
      </div>
      
      <!-- Buttons from the back of the image with circle shapes -->
      <div class="text-center mt-3">
        <!-- Use hidden file input for image capture -->
        <input
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('Rear')"
        >
        <button class="circle-button" @click="openImageCapture">RL</button>
        <button class="circle-button mx-2" @click="openImageCapture">Rear</button>
        
        <!-- Button to upload an image from the device -->
        <button class="circle-button" @click="openFileUpload('Rear right')">RR</button>
      </div>

      <!-- Add a notes section -->
      <div class="mt-3">
        <label for="notes">Notes:</label>
        <textarea id="notes" v-model="photoNotes" class="form-control" rows="4"></textarea>
      </div>
    </div>

    <!-- Additional Photos Area -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Additional Photos</div>
        <div class="card-body">
          <!-- Use hidden file input for uploading additional images -->
          <input
            ref="additionalInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleAdditionalUpload"
          >
          <button class="btn btn-primary" @click="openAdditionalUpload">Upload Additional</button>
          <div v-for="(image, index) in uploadedImages" :key="index" class="mt-2">
            <h5>{{ image.title }}</h5>
            <img :src="image.src" alt="Uploaded Image" class="img-fluid">
          </div>
        </div>
      </div>
    </div>

    <!-- Finish and Submit Button -->
    <div class="text-center mt-4 col-md-12">
      <button class="btn btn-success" @click="submit">Finish and Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoNotes: '',
      uploadedImages: []
    }
  },
  methods: {
    openImageCapture(title) {
      this.currentTitle = title;
      this.$el.querySelector('input[type="file"][capture]').click();
    },
    handleImageCapture(event) {
      const file = event.target.files[0];
      this.uploadImage(file, this.currentTitle);
    },
    openAdditionalUpload() {
      this.$refs.additionalInput.click();
    },
    handleAdditionalUpload(event) {
      const file = event.target.files[0];
      this.uploadImage(file, 'Additional');
    },
    openFileUpload(title) {
      this.currentTitle = title;
      this.$refs.additionalInput.click();
    },
    uploadImage(file, title) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadedImages.push({ src: reader.result, title: title });
      };
      reader.onerror = error => {
        console.error('Error reading the image', error);
      };
    },
    submit() {
      this.$router.push('/');  // Redirect to home page
    }
  }
}
</script>
<style>
.circle-button {
  display: inline-block; /* Aligns the button correctly */
  width: 50px;  /* Diameter of the circle */
  height: 50px; /* Diameter of the circle */
  border-radius: 50%; /* Makes the button circular */
  text-align: center; /* Centers the text/icon inside the button */
  padding: 0; /* Removes default padding */
  line-height: 50px; /* Centers the text vertically */
  font-size: 16px; /* Adjust the font size as needed */
  margin: 5px; /* Adds some space around the button */
  border: none; /* Removes border */
  color: white; /* Text/icon color */
  background-color: #007bff; /* Background color of the button */
  cursor: pointer; /* Changes cursor to pointer on hover */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.circle-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

/* Optional: If you want to add specific styles for disabled state */
.circle-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.align-center {
  display: flex; /* Enables flexbox */
  justify-content: center; /* Horizontally centers the items */
  align-items: center; /* Vertically centers the items */
}
.side-button {
  margin-top: 50px; /* Adjust this value to center the button with the image */
}

</style>