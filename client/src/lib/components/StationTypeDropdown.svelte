<script>
    export let value = 'both';
    export let onViewTypeSelected = () => {}; 
    
    const handleChange = (event) => {
      onViewTypeSelected(event.target.value);
    };
  </script>
  
  <label for="stationType">Station Type</label>
  <select id="stationType" bind:value on:change={handleChange}>
    <option value="both">Pick-up/Drop-off</option>
    <option value="pick_up">Pick-up</option>
    <option value="drop_off">Drop-off</option>
  </select>
  
  <style>
    #stationType {
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
