<script>
	import Primary from '$lib/components/Registration/User/Primary.svelte';
	import Password from '$lib/components/Registration/User/Password.svelte';
	import Personal from '$lib/components/Registration/User/Personal.svelte';

	export let consent;
	export let email;

	let previousStep;
	let step = 'primary';

	function setStep(value) {
		previousStep = step;
		step = value;
	}
</script>

<header>
	<h1>Complete your registration</h1>
</header>

<form method="post" action="?/user">
	{#if step === 'primary'}
		<Primary {email} {consent} {setStep} />
	{:else if step === 'password'}
		<Password {setStep} {previousStep} />
	{:else if step === 'personal'}
		<Personal {setStep} />
	{/if}
</form>
