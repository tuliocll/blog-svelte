<script>
  export let blogName;
  export let blogSubtitle;
  export let newsletterText;

  function handleSubscribe(event) {
    event.preventDefault();
    const email = event.target[0].value;
  }
</script>

<section class="cta-section theme-bg-light py-5">
  <div class="container text-center">
    <h2 class="heading">{blogName} - {blogSubtitle}</h2>
    <div class="intro">
      {newsletterText}
    </div>
    <form
      class="signup-form form-inline justify-content-center pt-3"
      on:submit={handleSubscribe}
    >
      <div class="form-group">
        <label class="sr-only" for="semail">Seu email</label>
        <input
          type="email"
          id="semail"
          name="semail1"
          class="form-control mr-md-1 semail"
          placeholder="Digite seu email"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Assinar Grátis</button>
    </form>
  </div>
</section>
