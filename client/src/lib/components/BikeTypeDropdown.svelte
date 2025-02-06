<script>
  export let value = 'all_types';
  export let onViewTypeSelected = () => {};

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'all_types') {
      onViewTypeSelected(['electric_bike', 'classic_bike']);
    } else {
      onViewTypeSelected(selectedValue);
    }
  };
</script>

<label for="vehicleType">Vehicle Type</label>
<select id="vehicleType" bind:value on:change={handleChange}>
  <option value="all_types">All Types</option>
  <option value="electric_bike">Electric Bike</option>
  <option value="classic_bike">Classic Bike</option>
</select>

<style>
  #vehicleType {
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
