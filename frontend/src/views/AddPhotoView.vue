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
        <button class="btn btn-primary rounded-circle" @click="openImageCapture">Front left</button>
        <button class="btn btn-primary rounded-circle mx-2" @click="openImageCapture">Front</button>
        <button class="btn btn-primary rounded-circle" @click="openImageCapture">Front right</button>
      </div>
      
      <!-- Add upload image buttons around the image with circle shapes -->
      <div class="d-flex justify-content-center mt-3">
        <!-- Buttons on the left of the image -->
        <button class="btn btn-primary rounded-circle mx-2" @click="openImageCapture('Left')">Left side</button>
        
        <!-- Image in the center -->
        <img src="../assets/carimage.png" alt="Vehicle Image" class="img-fluid mx-2" style="width: 200px; height: 200px; border-radius: 50%;">
        
        <!-- Buttons on the right of the image -->
        <button class="btn btn-primary rounded-circle mx-2" @click="openImageCapture('Right')">Right Side</button>
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
        <button class="btn btn-primary rounded-circle" @click="openImageCapture">Rear left</button>
        <button class="btn btn-primary rounded-circle mx-2" @click="openImageCapture">Rear</button>
        
        <!-- Button to upload an image from the device -->
        <button class="btn btn-primary rounded-circle" @click="openFileUpload('Rear right')">Rear right</button>
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
