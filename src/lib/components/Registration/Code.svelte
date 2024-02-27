<script>
  export let email;
</script>

<header>
  <h1>Enter verification code</h1>
</header>

<form class="subject" method="post" action="?/code">
  <p>
    Please enter the six-digit confirmation code we just sent you via the
    following email:
  </p>
  <strong style="font-size: 2rem">{email}</strong>
  <small><a target="_self" href="/register">Use different email</a></small>
  <div class="input-group">
    <label for="code">Code</label>
    <input
      id="code"
      type="number"
      name="code"
      min="100000"
      max="999999"
      required
    />
    <input type="hidden" name="email" value={email} />
  </div>
  <button type="submit" class="btn btn-primary">Continue</button>

  <form method="post" action="?/email">
    <input type="hidden" name="email" value={email} />
    <!--todo: add alert after doing this-->
    <button class="btn secondary muted" formaction="?/email"
      >Resend confirmation code</button
    >
  </form>
</form>
