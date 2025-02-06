// +page.js
export async function load({ url }) {
    const params = {
      orgId: 1,
      from: url.searchParams.get('from') || '2025-01-27T13:13:08.692Z',
      to: url.searchParams.get('to') || '2025-01-27T19:13:08.693Z',
      timezone: 'browser',
      "var-from": url.searchParams.get('var-from') || '28-11-2020 13:50:06',
      "var-to": url.searchParams.get('var-to') || '29-11-2020 17:26:48',
    };
  
    return {
      props: {
        params, // Pass the params to the Svelte component
      },
    };
  }
  