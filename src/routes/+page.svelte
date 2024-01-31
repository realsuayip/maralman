<script>
	export let data;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="subject">
	<pre style="overflow: scroll">{JSON.stringify(data.user, undefined, 4)}</pre>
	<a href="/login" class="btn btn-primary">Sign in</a>
	<a href="/register" class="btn secondary btn-primary muted">Create a new account</a>
</div>
