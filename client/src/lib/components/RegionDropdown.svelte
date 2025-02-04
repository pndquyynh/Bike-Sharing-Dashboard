<script>
  import { createEventDispatcher, onMount } from "svelte";
  let regions = []; // Array to hold region data
  let selectedRegion = null; // Initially no region is selected
  let loading = true;
  const dispatch = createEventDispatcher();

  // Fetch regions when component is mounted
  onMount(async () => {
    const response = await fetch("http://localhost:8000/api/regions");
    if (response.ok) {
      regions = await response.json();
      loading = false;
    } else {
      console.error("Failed to fetch regions");
    }
  });

  // Dispatch the selected region to the parent
  function handleRegionChange(event) {
    const target = event.target; 
    selectedRegion = Number(target.value); 
    dispatch("regionSelected", selectedRegion); 
  }
</script>

<div>
  <label for="region">Region</label>
  <div style="margin-top: 5px;">
    <select
    id="region"
    bind:value={selectedRegion}
    on:change={handleRegionChange}
    >
    <option value={null}>All</option>
    {#if loading}
      <option>Loading regions...</option>
    {:else}
      {#each regions as region}
        <option value={region.region_id}>{region.name}</option> 
      {/each}
    {/if}
  </select>
  </div>
  
</div>

<style>
    
  #region {
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
