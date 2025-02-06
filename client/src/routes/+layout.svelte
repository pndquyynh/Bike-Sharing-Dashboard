<script>
    import Header from './Header.svelte';
    import '../app.css';

    /** @type {{children: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="app">
    <Header />

    <main>
        {@render children()}
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		box-sizing: border-box;
	}

    @media (max-width: 1024px) {
        main {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
