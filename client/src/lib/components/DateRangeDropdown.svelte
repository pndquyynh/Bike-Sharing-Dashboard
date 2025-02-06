<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let labelFrom = "From (Month & Year)";
  export let labelTo = "To (Month & Year)";
  export let disabled = false;

  let months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" }
  ];

  // Manually defining available years (from 2020 to 2024)
  let years = [2020, 2021, 2022, 2023, 2024];
  
  let selectedFromMonth = null;
  let selectedFromYear = null;
  let selectedToMonth = null;
  let selectedToYear = null;

  const dispatch = createEventDispatcher();

  function validateAndDispatch() {
    if (selectedFromYear && selectedFromMonth && selectedToYear && selectedToMonth) {
      // Use ISO format for proper date parsing
      const fromDate = new Date(`${selectedFromYear}-${selectedFromMonth}-01`);
      const toDate = new Date(`${selectedToYear}-${selectedToMonth}-01`);

      if (toDate >= fromDate) {
        // Dispatch the event with the dates formatted as MM-YYYY
        dispatch("dateRangeSelected", {
          from: `${selectedFromMonth}-${selectedFromYear}`,
          to: `${selectedToMonth}-${selectedToYear}`
        });
      } else {
        alert("The Date Range is not valid, please try again");
        // Clear the "To" date fields
        selectedToMonth = null;
        selectedToYear = null;
      }
    }
  }
</script>

<div>
  <!-- From Dropdown -->
  <label for="from-month">{labelFrom}</label>
  <div class="dropdowns">
    <select id="from-month" bind:value={selectedFromMonth} on:change={validateAndDispatch} disabled={disabled || years.length === 0}>
      <option value={null}>Select Month</option>
      {#each months as month}
        <option value={month.value}>{month.name}</option>
      {/each}
    </select>

    <select id="from-year" bind:value={selectedFromYear} on:change={validateAndDispatch} disabled={disabled || years.length === 0}>
      <option value={null}>Select Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>

  <!-- To Dropdown -->
  <label for="to-month">{labelTo}</label>
  <div class="dropdowns">
    <select id="to-month" bind:value={selectedToMonth} on:change={validateAndDispatch} disabled={disabled || years.length === 0}>
      <option value={null}>Select Month</option>
      {#each months as month}
        <option value={month.value}>{month.name}</option>
      {/each}
    </select>

    <select id="to-year" bind:value={selectedToYear} on:change={validateAndDispatch} disabled={disabled || years.length === 0}>
      <option value={null}>Select Year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dropdowns {
    display: flex;
    gap: 10px;
  }

  select {
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
