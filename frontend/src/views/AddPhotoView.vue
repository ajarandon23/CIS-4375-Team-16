<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Add a title for the new view -->
      <h3 class="text-center">Add Photo</h3>
      
      <!-- Buttons from the front of the image -->
      <form @submit.prevent="submitPhotos">
        <div class="text-center mt-3">
        <!-- Use hidden file input for image capture -->
        <input
        ref="fileInputFL"
        type="file"
        accept="image/*"
        capture
        style="display: none"
        @change="handleImageCapture('FL')"
      >
        <button class="circle-button" @click="openImageCapture('FL')">FL</button>
        <input
          ref="fileInputFront"
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('Front')"
        >
        <button class="circle-button" @click="openImageCapture('Front')">Front</button>
        <input
        ref="fileInputFR"
        type="file"
        accept="image/*"
        capture
        style="display: none"
        @change="handleImageCapture('FR')"
      >
        <button class="circle-button" @click="openImageCapture('FR')">FR</button>
      </div>
      
      <!-- Add upload image buttons around the image with circle shapes -->
      <div class="d-flex justify-content-center mt-3">
        <!-- Buttons on the left of the image -->
        <input
        ref="fileInputLeft"
        type="file"
        accept="image/*"
        capture
        style="display: none"
        @change="handleImageCapture('Left')"
      >
        <button class="circle-button side-button" @click="openImageCapture('Left')">Left side</button>
        
        <!-- Image in the center -->
        <img src="../assets/carimage.png" alt="Vehicle Image" class="img-fluid mx-2" style="width: 200px; height: 200px; border-radius: 50%;">
        
        <!-- Buttons on the right of the image -->
        <input
        ref="fileInputRight"
        type="file"
        accept="image/*"
        capture
        style="display: none"
        @change="handleImageCapture('Right')"
      >
        <button class="circle-button side-button" @click="openImageCapture('Right')">Right Side</button>
      </div>
      
      <!-- Buttons from the back of the image with circle shapes -->
      <div class="text-center mt-3">
        <!-- Use hidden file input for image capture -->
        <input
          ref="fileInputRL"
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('RL')"
        >
        <button class="circle-button" @click="openImageCapture('RL')">RL</button>
        <input
          ref="fileInputRear"
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('Rear')"
        >
        <button class="circle-button mx-2" @click="openImageCapture('Rear')">Rear</button>
        
        <!-- Button to upload an image from the device -->
        <input
          ref="fileInputRR"
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('RR')"
        >
        <button class="circle-button" @click="openImageCapture('RR')">RR</button>
        
      </div>
      <div class="text-center mt-3">
        <!-- ... existing buttons ... -->

        <!-- New Button for Additional Photos -->
        <input
          ref="fileInputAdditional"
          type="file"
          accept="image/*"
          capture
          style="display: none"
          @change="handleImageCapture('Additional')"
        >
        <button class="btn btn-primary" @click="openImageCapture('Additional')">Additional Photos</button>
      </div>
      <div>
        <button type="submit" class="btn btn-primary mt-3">Upload Photos</button>
      </div>
      </form>

      <!-- Add a notes section -->
      
    </div>
    <div class="col-md-6">
      <!-- First Box -->
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header"> Vehicle Photos</div>
            <div class="card-body">
              <!-- content for box 1 -->
              <div  class="row">
                <template v-for="(position, index) in positions" :key="index">
                  <div class="col-md-3 mb-3">
                    <h5 class="thumbnail-title"> {{ thumbnailNames[position]}}</h5>
                    <div class="thumbnail-box">
                      
                      <div class="thumbnail-content">
                        <!-- Placeholder for future thumbnail photo -->
                        <div v-for="image in imageUrls[position]" :key="image.filename">
                          <img :src="image.imageUrl" :alt="image.filename" class="img-thumbnail">
                          <div class="thumbnail-actions">
                          <button class="btn btn-danger btn-sm" @click="deleteImage(position, image.filename)">Delete</button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mt-3">
          <div class="card">
            <div class="card-header"> Additional Photos</div>
            <div class="card-body">
              <!-- content for box 2 -->
            </div>

          </div>
        </div>
      </div>
    </div>
    

    <!-- Finish and Submit Button -->
    <div class="text-right mt-4 col-md-12">
      <button class="btn btn-success" @click="submit">Finish and Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Store files in memory as Buffer


export default {
  data() {
    return {
      photoNotes: '',
      uploadedImages: [],
      imageUrls:[],
      vehicleRO: '',
      customerID: '',
      positions: ['FL', 'Front', 'FR', 'Left', 'Right', 'RL', 'Rear', 'RR'],
      thumbnailNames: {
        FL: 'Front Left',
        Front: 'Front',
        FR: 'Front Right',
        Left: 'Left',
        Right: 'Right',
        RL: 'Rear Left',
        Rear: 'Rear',
        RR: 'Rear Right',
      }, // Object to store static names for each position
      imageUrls: {
        FL: '',
        Front: '',
        FR: '',
        Left: '',
        Right: '',
        RL: '',
        Rear: '',
        RR: '',
      }, // Object to store image URLs for each position with placeholder
    }
  },
  mounted() {
    this.vehicleRO = this.$route.params.id;
    this.customerID = this.$route.params.customerID;
    console.log('VehicleRO passed to add photo page:', this.vehicleRO)
    console.log('CustomerID passed to photo page:', this.customerID)
    for (const position of this.positions) {
    this.fetchImageUrls(this.vehicleRO, this.customerID, position);
    this.fetchImageUrls(this.vehicleRO, this.customerID, 'Additional');
    }
  },
  methods: {
    openImageCapture(position) {
      let fileinputRef='';
      switch (position) {
        case 'FL':
          fileinputRef='fileInputFL';
          break;
        case 'Front':
          fileinputRef='fileInputFront';
          break;
        case 'FR':
          fileinputRef='fileInputFR';
          break;
        case 'Left':
          fileinputRef='fileInputLeft';
          break;
        case 'Right':
          fileinputRef='fileInputRight';
          break;
        case 'RL':
          fileinputRef='fileInputRL';
          break;
        case 'Rear':
          fileinputRef='fileInputRear';
          break;
        case 'RR':
          fileinputRef='fileInputRR';
          break;
        case 'Additional':
          fileinputRef='fileInputAdditional';
          break;
        
      }
      if (fileinputRef && this.$refs[fileinputRef]) {
        this.$refs[fileinputRef].click();
      }
    },
    handleImageCapture(position) {
      let fileInputRef = this.$refs[`fileInput${position}`];
      if (fileInputRef && fileInputRef.files.length > 0) {
        const file = fileInputRef.files[0];

        // Construct the file name with the position
      
        console.log('File selected:',file)
        this.uploadedImages.push({ 
          file, 
          position, // Add position to the data
          customerID: this.customerID, 
          vehicleRO: this.vehicleRO 
        });
      }
    },
    async submitPhotos() {
      for (const image of this.uploadedImages) {
        let formData = new FormData();
        formData.append('file', image.file);
        formData.append('customerID', this.customerID);
        formData.append('vehicleRO', this.vehicleRO);
        formData.append('position',image.position)

        try {
          const response = await axios.post('http://localhost:3000/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
        } catch (error) {
          console.error('Upload error:', error);
        }
      }
    },
    async fetchImageUrls(vehicleRO, clientID, position) {
      try {
        const response = await axios.get(`http://localhost:3000/api/fetch-image-urls/${clientID}/${vehicleRO}/${position}`);
        
        const imageUrlsArray = response.data;
        console.log('Fetched image URLs:', imageUrlsArray);

        // Update the imageUrls object for the given position
        this.imageUrls[position] = imageUrlsArray;
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    },
    async deleteImage(position, filename) {
      try {
        // Send a request to the backend to delete the image
        await axios.delete(`http://localhost:3000/api/delete-image/${this.customerID}/${this.vehicleRO}/${position}/${filename}`);

        // Remove the image from the imageUrls array
        this.imageUrls[position] = this.imageUrls[position].filter(image => image.filename !== filename);
      } catch (error) {
        console.error('Error deleting image:', error);
        // Handle error (e.g., show a message to the user)
      }
    },
  },
  

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
/* Style the "Vehicle Photos" box */
.card-header {
  background-color: #007bff; /* Background color for the header */
  color: white; /* Text color for the header */
  font-size: 20px; /* Font size for the header */
  padding: 10px; /* Padding for the header */
}

.card-body {
  padding: 20px; /* Increase the padding to make the card body larger */
  min-height: 400px; /* Set a minimum height for the card body */
  display: flex; /* Use flexbox to center vertically and horizontally */
  flex-direction: column; /* Vertically align content */
  justify-content: center; /* Horizontally align content */
  align-items: center; /* Vertically and horizontally center content */
}

.thumbnail-box {
  border: 1px solid #ddd; /* Border for the box */
  padding: 10px; /* Padding inside the box */
  text-align: center; /* Center the content */
  background-color: #f9f9f9; /* Light background color */
  width: 125px; /* Set a fixed width for all thumbnail boxes */
  height: 125px; /* Set a fixed height for all thumbnail boxes to make them square */
  display: flex; /* Use flexbox to center vertically and horizontally */
  flex-direction: column; /* Vertically align content */
  justify-content: center; /* Horizontally align content */
  align-items: center; /* Vertically and horizontally center content */
}

/* Style the thumbnail titles */
.thumbnail-title {
  margin: 10px 0; /* Space around the title */
  font-size: 16px; /* Adjust the font size as needed */
  font-weight: bold; /* Make the title bold */
}

/* Style the thumbnail images */
.thumbnail-content img {
  max-width: 100%; /* Ensure the image fits in the box */
  max-height: 100px; /* Limit the image height */
  height: auto; /* Maintain aspect ratio */
}


</style>