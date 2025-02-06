<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Station {
    short_name: number;
    name: string;
  }

  export let regionId: string | null = null; // regionId to filter stations
  let stations: Station[] = [];
  let selectedStation: number | null = null;
  let loading: boolean = false;
  const dispatch = createEventDispatcher();

  // Fetch stations for the given region
  $: regionId, fetchStations(regionId);

  async function fetchStations(regionId: string | null): Promise<void> {
    if (regionId) {
      loading = true;
      const response = await fetch(`http://localhost:8000/api/stations-list/${regionId}`);
      if (response.ok) {
        stations = await response.json();
        loading = false;
      } else {
        console.error('Failed to fetch stations');
      }
    } else {
      stations = [];
    }
  }

  function handleStationChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    selectedStation = target.value ? Number(target.value) : null;
    dispatch('stationSelected', selectedStation); 
  }
</script>

<div>
  <label for="station">Station</label>
  <div style="margin-top: 5px;">
    <select
    id="station"
    bind:value={selectedStation}
    on:change={handleStationChange}
    disabled={loading || !regionId}
    >
      <option value={null}>Select a station</option>
      {#if loading}
        <option>Loading stations...</option>
      {:else}
        {#each stations as station}
          <option value={station.short_name}>{station.name}</option>
        {/each}
      {/if}
    </select>
  </div>
</div>

<style>
    
  #station {
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
