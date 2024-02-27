<header>
  <h1>Create a new account</h1>
</header>

<form class="subject" method="post" action="?/email">
  <div class="input-group">
    <label for="registration-email">Email address</label>
    <input
      id="registration-email"
      type="email"
      name="email"
      autocapitalize="none"
      autocomplete="email"
      maxlength="254"
      required
    />
  </div>
  <button type="submit" class="btn btn-primary">Continue</button>
</form>
