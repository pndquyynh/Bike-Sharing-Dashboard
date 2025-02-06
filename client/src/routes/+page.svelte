<svelte:head>
  <title>Welcome</title>
  <meta name="description" content="Select your role to access the dashboard" />
</svelte:head>

<script>
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
 
  let selectedRole = writable('');
  
  function handleRoleSelection() {
    if ($selectedRole) {
      goto(`/${$selectedRole}`);
    }
  }
</script>

<main>
  <h1 style="color: Navy; text-align: center; font-weight: bold; font-size:50px">Welcome to the Docked Bike Sharing Service Dashboard</h1>
  <p  style="color: Grey; text-align: center; font-weight: bold;  font-style: italic; font-size:large">Select the role above to continue</p>
</main>

<style>
  main {
    text-align: center;
    align-items: center;
  }
</style>
