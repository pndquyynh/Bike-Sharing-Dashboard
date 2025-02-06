<script>
	import RegionDropdown from '$lib/components/RegionDropdown.svelte';
	import StationDropdown from '$lib/components/StationDropdown.svelte';
	import ViewTypeDropdown from '$lib/components/ViewTypeDropdown.svelte';
	import { onMount } from 'svelte';

	let selectedRegion = null;
	let selectedStation = null;
	let viewType = 'whole'; 
	let grafanaBaseUrl = "http://localhost:3003/d-solo/aealjqomxo6ioa/inventory";

	async function handleRegionSelected(regionId) {
	  selectedRegion = regionId;
	  selectedStation = null;
	}

	async function handleStationSelected(stationId) {
	  selectedStation = stationId;
	}

	function getIframeUrl(panelId) {
	  const params = new URLSearchParams({
		orgId: '1',
		timezone: 'America/New_York',
		...(selectedRegion && { 'var-region_id': selectedRegion }),
		...(selectedStation && { 'var-station_id': selectedStation }),
		refresh: 'auto',
		panelId: panelId
	  });

	  return `${grafanaBaseUrl}?${params.toString()}`;
	}

	function handleViewTypeChange(newViewType) {
	  viewType = newViewType;
	  if (viewType === 'station') {
		selectedRegion = null;
	  }
	  selectedStation = null;
	}
</script>
  
<main>

	<h1>Inventory Management</h1>

	<div class="dashboard">
		<div class="sidebar">	
			<div class="lastupdated">
				<p style="color: black; text-align: center">Last Updated</p>
				<p style="color: black; text-align: center; font-weight: bold; font-size:large"> {new Date().toLocaleString()}</p>
			</div>
			<div class="selection">
				<ViewTypeDropdown value={viewType} onViewTypeSelected={handleViewTypeChange} />
		
				{#if viewType == 'region'}
				  <RegionDropdown on:regionSelected={event => handleRegionSelected(event.detail)} />
				{/if}
		
				{#if viewType === 'station'}
				  <RegionDropdown on:regionSelected={event => handleRegionSelected(event.detail)} />
				  <StationDropdown regionId={selectedRegion} on:stationSelected={event => handleStationSelected(event.detail)} />
				{/if}
			</div>

		</div>
		
	
		<div class="grafana">
			{#if viewType === 'whole'}
			<div class ="whole">
					<div class="map">
						<iframe title="Station Distribution" src={getIframeUrl(29)} width="100%" height="100%" frameborder="0"></iframe>
					</div>
					<div class="availability">
						<iframe title="Bike Inventory" src={getIframeUrl(14)} width="450" height="200" frameborder="0"></iframe>
						<iframe title="Docks Inventory" src={getIframeUrl(15)} width="100px" height="200" frameborder="0"></iframe>
					</div>
					<div class ="assist">
						<div class ="maintenance">
							<iframe class="stat" title="Total Maintenance" src={getIframeUrl(38)} width="450" height="200" frameborder="0"></iframe>
							<iframe title="Maintenance Detail" src={getIframeUrl(52)} width="450" height="200" frameborder="0"></iframe>
						</div>
						<div class ="maintenance">
							<iframe class="stat" title="Total Low Inventory" src={getIframeUrl(39)} width="450" height="200" frameborder="0"></iframe>
						<iframe title="Low Inventory Detail" src={getIframeUrl(51)} width="450" height="200" frameborder="0"></iframe>
						</div>
					</div>
			</div>
			{/if}
	
			{#if viewType === 'region'}
			<div class ="whole">
				<div class="map">
			    	<iframe title="Station Distribution" src={getIframeUrl(49)} width="450" height="200" frameborder="0"></iframe>
				</div>
				<div class="availability">
					<iframe title="Bike Inventory" src={getIframeUrl(14)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Docks Inventory" src={getIframeUrl(15)} width="450" height="200" frameborder="0"></iframe>
				</div>
				
				<div class ="assist">
					<div class ="maintenance">
						<iframe class="stat" title="Total Maintenance" src={getIframeUrl(54)} width="450" height="200" frameborder="0"></iframe>
						<iframe title="Maintenance Detail" src={getIframeUrl(30)} width="450" height="200" frameborder="0"></iframe>
					</div>
					<div class ="maintenance">
						<iframe class="stat" title="Total Low Inventory" src={getIframeUrl(53)} width="450" height="200" frameborder="0"></iframe>
						<iframe title="Low Inventory" src={getIframeUrl(33)} width="450" height="200" frameborder="0"></iframe>
					</div>
				</div>
			</div>
			{/if}
	
			<!-- {#if viewType === 'station'}
			<div class ="whole">
				<div class="map">
					<iframe title="Location" src={getIframeUrl(36)} width="450" height="200" frameborder="0"></iframe>
				</div>
				<div class="availability">
					<iframe title="" src="http://localhost:3003/d-solo/aealjqomxo6ioa/inventory?orgId=1&from=1737919885078&to=1739129485078&timezone=browser&var-station_id=32001&var-region_id=44&panelId=56&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
					<iframe title="Fleet Health" src={getIframeUrl(55)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Last Updated" src={getIframeUrl(56)} width="450" height="200" frameborder="0"></iframe>
				</div>
				
				<div class ="status">
					<iframe title="Station Capacity" src={getIframeUrl(40)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Dock Availability" src={getIframeUrl(45)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Dock Disabled" src={getIframeUrl(43)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Bike Disabled" src={getIframeUrl(42)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Ebike Availability" src={getIframeUrl(46)} width="450" height="200" frameborder="0"></iframe>
					<iframe title="Bike Availability" src={getIframeUrl(44)} width="450" height="200" frameborder="0"></iframe>
				</div>
			</div>
		{/if} -->
		</div>
	</div>
</main>  

<style>
main {
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 1400px;
    margin: 0;
}

h1 {
    font-size: 2rem;
    color: #333;
}

.dashboard {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    gap: 20px;
}

.selection {
    display: flex;
    flex-direction: column;
    /* width: 30%; */
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: fit-content;
    justify-content: space-around;
	/* align-content: center; */
    gap: 16px;
}

.grafana {
    flex-grow: 1;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.whole {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.map {
    width: 100%;
}

.assist {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.availability {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.maintenance {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.grafana iframe {
    background: white;
    width: 100%;
    min-height: 300px;
    border-radius: 10px;
    border: none;
}

.stat{
	width: 30% !important;
}

.sidebar{
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: auto;
	justify-self: center;
}
.lastupdated{
	background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: fit-content;
    justify-content: space-around;
}

</style>
