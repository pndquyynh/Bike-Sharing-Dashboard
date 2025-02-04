<script>
    export let value = 'all_types';
    export let onViewTypeSelected = () => {}; 
    
    const handleChange = (event) => {
      onViewTypeSelected(event.target.value); // Call the callback with the selected value
    };
  </script>
  
  <label for="memberType">Member Type</label>
  <select id="memberType" bind:value on:change={handleChange}>
    <option value="all_types">All Types</option>
    <option value="member">Member</option>
    <option value="casual">Casual</option>
  </select>
  
  <style>
    #memberType {
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
