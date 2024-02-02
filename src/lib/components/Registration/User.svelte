<script>
	export let consent;
	export let email;
	let step = 'password';
</script>

<header>
	<h1>Complete your registration</h1>
</header>

<form class="subject" method="post" action="?/user">
	{#if step === 'primary'}
		<h3>Primary information</h3>

		<div class="input-group">
			<label for="username">Username</label>
			<input type="text" name="username" id="username" />
			<small class="text-secondary">
				This username will be used reach your profile. You can always change your username later.
			</small>
		</div>

		<div class="input-group">
			<label for="display_name">Display name</label>
			<input type="text" name="display_name" id="display_name" />
		</div>

		<small class="text-secondary">
			<strong>{email}</strong> will be used as your email. If you want to use some other email,
			<a href="/register">please click here.</a>
		</small>
		<button
			type="button"
			class="btn btn-primary"
			on:click={() => {
				step = 'password';
			}}>Next</button
		>
	{:else if step === 'password'}
		<h3>Password</h3>
		<p>
			Please enter a strong password for your account. To ensure your safety, follow the guidelines.
		</p>

		<div class="input-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" />
			<div class="password-help text-secondary">
				<ul>
					<li>Your password can’t be too similar to your other personal information.</li>
					<li>Your password must contain at least 8 characters.</li>
					<li>Your password can’t be a commonly used password.</li>
					<li>Your password can’t be entirely numeric.</li>
				</ul>
			</div>
		</div>

		<div class="input-group">
			<label for="password1">Password (again)</label>
			<input type="password" name="password1" id="password1" />
		</div>

		<button
			type="button"
			class="btn btn-primary"
			on:click={() => {
				step = 'personal';
			}}>Next</button
		>
		<button
			type="button"
			class="btn secondary muted"
			on:click={() => {
				step = 'primary';
			}}>Back</button
		>
	{:else if step === 'personal'}
		<!--  "gender": "unspecified",-->
		<!--  "birth_date": "2019-08-24",-->
		<!--  "language": "en",-->
		<!--	terms and conditions-->
		<button type="submit" class="btn btn-primary">Register</button>
		<button
			type="button"
			class="btn secondary muted"
			on:click={() => {
				step = 'password';
			}}>Back</button
		>
	{/if}
</form>

<style>
	h3 {
		margin: 0;
	}

	.password-help ul {
		margin: 0;
		padding: 0;
		font-size: small;
		list-style-position: inside;
	}
</style>
