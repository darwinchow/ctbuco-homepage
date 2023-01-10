<script>
  import Header from './components/Header.svelte';
  import Intro from './components/Intro.svelte';
</script>

<main class="w-full">
  <Header />
  <div class="content">
    <Intro />
  </div>
</main>

<style>
  main > .content {
    margin-top: 100vh;
  }
</style>
