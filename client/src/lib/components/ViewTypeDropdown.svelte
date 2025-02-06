<!-- src/lib/components/ViewTypeDropdown.svelte -->
<script>
    export let value = 'whole'; // Default value
    export let onViewTypeSelected = () => {}; // Callback function to handle selection
    
    const handleChange = (event) => {
      onViewTypeSelected(event.target.value); // Call the callback with the selected value
    };
  </script>
  <div>
      <label for="viewType">View Type</label>
        <div style="margin-top: 5px;">
          <select id="viewType" bind:value on:change={handleChange}>
            <option value="whole">Whole Station Distribution</option>
            <option value="region">Region-Based View</option>
            <option value="station">Station-Based View</option>
          </select>
        </div>
  </div>
  <style>
    #viewType {
    width: 250px;
    min-width: 250px;
    max-width: 250px; 
    height: 40px;
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    
  }
  </style>
