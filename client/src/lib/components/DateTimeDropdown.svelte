<script>
  import { onMount } from "svelte";

  export let label;
  export let options = []; // This should be populated from API
  export let value = null;
  export let disabled = false;

  async function fetchDateOptions() {
    try {
      const response = await fetch("/api/station-date"); // Call your API
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log("Fetched Dates:", data); // Debugging
      options = data.map(item => item.last_updated); // Extract date values
    } catch (error) {
      console.error("Error fetching date options:", error);
    }
  }

  onMount(fetchDateOptions); // Fetch on component load

  function handleSelectionChange(event) {
    const target = event.target;
    value = target.value;
  }
</script>

<div>
  <label>{label}</label>
  <div style="margin-top: 5px;">
    <select bind:value={value} on:change={handleSelectionChange} disabled={disabled}>
      <option value={null}>Select DateTime</option>
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
</div>
