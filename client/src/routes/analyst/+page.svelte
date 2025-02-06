<script>
  import DateRangeDropdown from "$lib/components/DateRangeDropdown.svelte";
  import RegionDropdown from "$lib/components/RegionDropdown.svelte";
  import { onMount } from "svelte";

  let grafanaBaseUrl =
    "http://localhost:3003/d-solo/eec2t6fedsrnka/user-behavior-and-trends";

  let selectedDateRange = null;
  let selectedRegion = null;

  const setDefaultDateRange = () => {
    selectedDateRange = { from: "07-2020", to: "11-2020" };
    console.log("Default Date Range:", selectedDateRange);
  };

  onMount(() => {
    setDefaultDateRange();
  });

  function handleRegionSelected(regionId) {
    selectedRegion = regionId;
    console.log("Selected Region:", selectedRegion);
  }

  function handleDateRangeSelected(dateRange) {
    selectedDateRange = dateRange;
    console.log("Selected Date Range:", selectedDateRange);
  }
  function getIframeUrl(panelId) {
    const params = new URLSearchParams({
      orgId: "1",
      timezone: "America/New_York",
      ...(selectedDateRange && {
        "var-from": selectedDateRange.from,
        "var-to": selectedDateRange.to,
      }),
      ...(selectedRegion && { "var-region_id": selectedRegion }),
      refresh: "auto",
      panelId: panelId,
    });
    return `${grafanaBaseUrl}?${params.toString()}`;
  }
</script>

<main>
  <h1 style="color: #11003b; text-align: center; font-weight: bold">
    User Behavior and Trends
  </h1>

  <div class="dashboard">
    <div class="selection">
      <DateRangeDropdown
        on:dateRangeSelected={(event) => handleDateRangeSelected(event.detail)}
      />
      <RegionDropdown
        on:regionSelected={(event) => handleRegionSelected(event.detail)}
      />
    </div>

    <div class="grafana">
      <!-- Overview -->
      <div class="overview">
        <p
          style="color: #11003b; text-align: center; font-weight: bold; font-size:large"
        >
          Overview
        </p>
        <div style="display: flex; flex-direction: row; gap: 20px">
          <iframe
            title="Total Trips Taken"
            src={getIframeUrl(36)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            title="Number of Trips Taken on different Plan"
            src={getIframeUrl(38)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <hr />
      <!-- User behavior -->
      <div class="userbehavior">
        <p
          style="color: #11003b; text-align: center; font-weight: bold; font-size:large"
        >
          User Behavior
        </p>
        <div style="display: flex; flex-direction: row; gap: 20px">
          <iframe
            title="Average Ride of All Plan (Minutes)"
            src={getIframeUrl(29)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            title="Average Ride Length on different Plan (Minutes)"
            src={getIframeUrl(33)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <hr />
      <!-- Usage Trends -->
      <div class="usagetrend">
        <p
          style="color: #11003b; text-align: center; font-weight: bold; font-size:large"
        >
          Usage Trend
        </p>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <iframe
            title="Average Trip Per Day"
            src={getIframeUrl(37)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            title="Average Trip Per Hour"
            src={getIframeUrl(39)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            title="Usage During Weekday and Weekend"
            src={getIframeUrl(41)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <hr />
      <!-- Preferences -->
      <div class="preferences">
        <p
          style="color: #11003b; text-align: center; font-weight: bold; font-size:large"
        >
          User Preferences
        </p>
        <!-- Vehicle Types -->
        <div style="display: flex; flex-direction: row; gap: 20px">
          <iframe
            title="Vehicle Choice"
            src={getIframeUrl(34)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
          <iframe
            title="Vehicle Choice on different Plan"
            src={getIframeUrl(35)}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2rem;
    color: #333;
  }

  .dashboard {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    width: 100%;
  }

  .selection {
    display: flex;
    flex-direction: column;
    width: 300px;
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: fit-content;
    justify-content: flex-start;
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
    max-width: 1100px;
    min-width: 700px;
    min-height: 400px;
    margin: 0 !important;
  }

  .grafana iframe {
    background: white;
    width: 100%;
    min-height: 300px;
    border-radius: 10px;
    border: none;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(128, 128, 128, 0.5);
    margin: 20px 0;
  }
</style>
