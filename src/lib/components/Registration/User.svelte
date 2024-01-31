<script>
	export let consent;
	export let email;
</script>

<header>
	<h1>Register</h1>
</header>

<form class="subject" method="post" action="?/user">
	Ready to go
	<strong>email->{email}</strong>
	<strong>consent->{consent}</strong>
	<button type="submit" class="btn btn-primary">Continue</button>
</form>
